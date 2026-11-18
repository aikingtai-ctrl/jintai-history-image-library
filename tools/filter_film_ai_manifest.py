"""Keep new low-resolution work-card JPEGs out of the Pages manifest.

The fixed baseline preserves the images that were already visible when this
gate was introduced. A rejected replacement uses its original image from the
immutable baseline commit; a rejected new mapping remains an empty preview.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path, PurePosixPath
from urllib.parse import quote, urlsplit


REPO_SLUG = "aikingtai-ctrl/jintai-history-image-library"
BASELINE_REL = "film-ai/work-card-image-baseline.json"
MANIFEST_REL = "film-ai/manifest.js"
MIN_WIDTH = 1280
MIN_HEIGHT = 720
MANIFEST_RE = re.compile(r"(window\.FILM_AI_IMAGES\s*=\s*)(\{.*?\})(\s*;)", re.S)
SCRIPT_PIN_RE = re.compile(
    r"(<script\b[^>]*\bsrc\s*=\s*['\"])film-ai/manifest\.js\?v=[^'\"]+(['\"][^>]*>)",
    re.I,
)
SOF_MARKERS = {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
               0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}


def git_bytes(repo: Path, *args: str) -> bytes:
    return subprocess.check_output(["git", "-C", str(repo), *args])


def git_blobs(repo: Path, revision: str) -> dict[str, str]:
    result = {}
    raw = git_bytes(repo, "ls-tree", "-r", "-z", revision, "--", "film-ai")
    for row in raw.split(b"\0"):
        if not row:
            continue
        metadata, separator, path = row.partition(b"\t")
        if not separator:
            raise ValueError("Malformed git ls-tree output")
        mode, kind, oid = metadata.decode("ascii").split()
        if kind == "blob":
            result[path.decode("utf-8")] = oid
    return result


def parse_manifest(source: str) -> tuple[re.Match[str], dict[str, str]]:
    match = MANIFEST_RE.search(source)
    if not match:
        raise ValueError("FILM_AI_IMAGES assignment is missing")
    mapping = json.loads(match.group(2))
    if not isinstance(mapping, dict) or not all(
        isinstance(wid, str) and isinstance(path, str)
        for wid, path in mapping.items()
    ):
        raise ValueError("FILM_AI_IMAGES must map work IDs to paths")
    return match, mapping


def write_baseline(repo: Path, revision: str, output: Path) -> dict:
    full_revision = git_bytes(repo, "rev-parse", revision).decode("ascii").strip()
    source = git_bytes(repo, "show", f"{full_revision}:{MANIFEST_REL}").decode("utf-8")
    mapping = parse_manifest(source)[1]
    blobs = git_blobs(repo, full_revision)
    missing = [(wid, path) for wid, path in mapping.items() if path not in blobs]
    if missing:
        raise ValueError(f"Baseline references {len(missing)} missing images: {missing[:3]}")
    baseline = {
        "schema": 1,
        "source_revision": full_revision,
        "mapping_count": len(mapping),
        "mappings": {wid: [path, blobs[path]] for wid, path in sorted(mapping.items())},
    }
    # One mapping per line makes additions and changes reviewable in Git.
    lines = ["{", '  "schema": 1,',
             f'  "source_revision": {json.dumps(full_revision)},',
             f'  "mapping_count": {len(mapping)},',
             '  "mappings": {']
    items = list(baseline["mappings"].items())
    for index, (wid, value) in enumerate(items):
        suffix = "," if index + 1 < len(items) else ""
        lines.append(f"    {json.dumps(wid)}: {json.dumps(value)}{suffix}")
    lines.extend(["  }", "}"])
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    return baseline


def jpeg_dimensions(path: Path) -> tuple[int, int]:
    """Read JPEG dimensions from a Start of Frame marker without Pillow."""
    with path.open("rb") as image:
        if image.read(2) != b"\xff\xd8":
            raise ValueError("Not a JPEG")
        while True:
            prefix = image.read(1)
            if prefix != b"\xff":
                raise ValueError("JPEG marker is missing")
            marker = image.read(1)
            while marker == b"\xff":
                marker = image.read(1)
            if not marker or marker == b"\x00":
                raise ValueError("Invalid JPEG marker")
            code = marker[0]
            if code in (0xD8, 0x01) or 0xD0 <= code <= 0xD7:
                continue
            if code in (0xD9, 0xDA):
                raise ValueError("JPEG has no Start of Frame marker")
            length_bytes = image.read(2)
            if len(length_bytes) != 2:
                raise ValueError("Truncated JPEG marker")
            length = int.from_bytes(length_bytes, "big")
            if length < 2:
                raise ValueError("Invalid JPEG segment length")
            if code in SOF_MARKERS:
                data = image.read(5)
                if length < 7 or len(data) != 5:
                    raise ValueError("Truncated JPEG dimensions")
                height = int.from_bytes(data[1:3], "big")
                width = int.from_bytes(data[3:5], "big")
                if not width or not height:
                    raise ValueError("Invalid JPEG dimensions")
                return width, height
            image.seek(length - 2, 1)


def is_jpeg_reference(reference: str) -> bool:
    return urlsplit(reference).path.lower().endswith((".jpg", ".jpeg"))


def is_safe_local_jpeg(reference: str) -> bool:
    parts = PurePosixPath(reference).parts
    return (not urlsplit(reference).scheme and not urlsplit(reference).query
            and not urlsplit(reference).fragment and "\\" not in reference
            and len(parts) >= 2 and parts[0] == "film-ai"
            and ".." not in parts and str(PurePosixPath(reference)) == reference)


def filter_site_manifest(site: Path, baseline: dict, current_blobs: dict[str, str],
                         source_revision: str, report_path: Path) -> dict:
    if baseline.get("schema") != 1 or not re.fullmatch(r"[0-9a-f]{40}", baseline.get("source_revision", "")):
        raise ValueError("Invalid fixed baseline metadata")
    original = baseline.get("mappings")
    if not isinstance(original, dict) or baseline.get("mapping_count") != len(original):
        raise ValueError("Fixed baseline mappings are missing")
    if any(not isinstance(wid, str) or not isinstance(entry, list) or len(entry) != 2
           or not isinstance(entry[0], str) or not entry[0].startswith("film-ai/")
           or not isinstance(entry[1], str) or not re.fullmatch(r"[0-9a-f]{40}", entry[1])
           for wid, entry in original.items()):
        raise ValueError("Fixed baseline contains an invalid image record")
    manifest_path = site / MANIFEST_REL
    source = manifest_path.read_text(encoding="utf-8")
    match, mapping = parse_manifest(source)
    report = {
        "schema": 1,
        "baseline_revision": baseline["source_revision"],
        "source_revision": source_revision,
        "minimum_jpeg_dimensions": [MIN_WIDTH, MIN_HEIGHT],
        "grandfathered_jpg": 0,
        "accepted_changed_jpg": 0,
        "rejected_count": 0,
        "rejected": [],
    }
    for wid, reference in list(mapping.items()):
        if not is_jpeg_reference(reference):
            continue
        prior = original.get(wid)
        oid = current_blobs.get(reference)
        if prior == [reference, oid]:
            report["grandfathered_jpg"] += 1
            continue

        dimensions = None
        if not is_safe_local_jpeg(reference):
            reason = "unverifiable_jpeg_reference"
        elif not oid or not (site / reference).is_file():
            reason = "missing_staged_jpeg"
        else:
            try:
                dimensions = jpeg_dimensions(site / reference)
                reason = "below_1280x720" if dimensions[0] < MIN_WIDTH or dimensions[1] < MIN_HEIGHT else None
            except (OSError, ValueError):
                reason = "invalid_jpeg"
        if reason is None:
            report["accepted_changed_jpg"] += 1
            continue

        if prior:
            old_path, old_oid = prior
            if not isinstance(old_path, str) or not isinstance(old_oid, str):
                raise ValueError(f"Invalid baseline entry for {wid}")
            deployed = (f"https://raw.githubusercontent.com/{REPO_SLUG}/"
                        f"{baseline['source_revision']}/{quote(old_path, safe='/')}")
            mapping[wid] = deployed
            action = "restored_immutable_baseline_image"
        else:
            del mapping[wid]
            deployed = None
            action = "awaiting_ai_image"
        report["rejected"].append({
            "wid": wid,
            "requested_path": reference,
            "dimensions": list(dimensions) if dimensions else None,
            "reason": reason,
            "action": action,
            "deployed_path": deployed,
        })

    report["rejected_count"] = len(report["rejected"])
    if report["rejected_count"]:
        serialized = json.dumps(mapping, ensure_ascii=False, indent=2)
        manifest_path.write_text(source[:match.start(2)] + serialized + source[match.end(2):],
                                 encoding="utf-8", newline="\n")
    digest = hashlib.sha256(manifest_path.read_bytes()).hexdigest()
    pin = digest[:16]
    for name in ("film.html", "影视参考图集.html"):
        page = site / name
        html = page.read_text(encoding="utf-8")
        pinned, count = SCRIPT_PIN_RE.subn(
            lambda found: found.group(1) + f"film-ai/manifest.js?v={pin}" + found.group(2),
            html, count=1,
        )
        if count != 1:
            raise ValueError(f"Film AI manifest script tag missing in {name}")
        if pinned != html:
            page.write_text(pinned, encoding="utf-8", newline="\n")
    report["deployed_manifest_sha256"] = digest
    report["deployed_manifest_pin"] = pin
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n",
                           encoding="utf-8", newline="\n")
    print("Film JPG gate:"
          f" {report['grandfathered_jpg']} existing,"
          f" {report['accepted_changed_jpg']} new/replaced HD,"
          f" {report['rejected_count']} rejected; report={report_path}")
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    snapshot = commands.add_parser("snapshot", help="Write a fixed, reviewable image baseline")
    snapshot.add_argument("--repo", required=True, type=Path)
    snapshot.add_argument("--revision", required=True)
    snapshot.add_argument("--output", required=True, type=Path)
    deployment = commands.add_parser("filter", help="Filter a staged Pages manifest")
    deployment.add_argument("--repo", required=True, type=Path)
    deployment.add_argument("--site", required=True, type=Path)
    deployment.add_argument("--report", required=True, type=Path)
    args = parser.parse_args()
    if args.command == "snapshot":
        baseline = write_baseline(args.repo, args.revision, args.output)
        print(f"Baseline: {len(baseline['mappings'])} work-card mappings at {baseline['source_revision']}")
    else:
        baseline = json.loads(git_bytes(args.repo, "show", f"HEAD:{BASELINE_REL}"))
        source_revision = git_bytes(args.repo, "rev-parse", "HEAD").decode("ascii").strip()
        filter_site_manifest(args.site, baseline, git_blobs(args.repo, "HEAD"),
                             source_revision, args.report)


if __name__ == "__main__":
    main()
