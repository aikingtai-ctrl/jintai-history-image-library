"""Merge one Images 2.6 API batch into the newest main checkout without losing other shots."""

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path

from PIL import Image


MODEL = "gpt-image-2.6-sunburst"


def rows(path):
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def latest_accepted(items):
    result = {}
    for item in items:
        if item.get("model") == MODEL or item.get("model_family") == "Images 2.6":
            result[item["id"]] = item
    return result


def manifest(path):
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.FILM_SHOT_IMAGES\s*=\s*(\{.*?\})\s*;", text, re.DOTALL)
    if not match:
        raise ValueError(f"Cannot parse existing manifest: {path}")
    return json.loads(match.group(1))


def image_file(root, shot_id):
    return root / "film-ai" / "shots" / f"{shot_id}.webp"


def verify(file, row):
    payload = file.read_bytes()
    if hashlib.sha256(payload).hexdigest() != row["sha256"]:
        raise ValueError(f"SHA mismatch: {file.name}")
    with Image.open(file) as image:
        image.load()
        if image.format != "WEBP" or min(image.size) < 100:
            raise ValueError(f"Invalid WebP: {file.name}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--dest", type=Path, required=True)
    args = parser.parse_args()
    source, dest = args.source, args.dest
    generated = json.loads((source / "film-ai" / "generated-shots-26.json").read_text(encoding="utf-8"))
    source_rows = latest_accepted(rows(source / "film-ai" / "shots-ledger-26.jsonl"))
    dest_ledger = dest / "film-ai" / "shots-ledger-26.jsonl"
    dest_rows = rows(dest_ledger)
    existing = latest_accepted(dest_rows)
    dest_manifest = dest / "film-ai" / "shots-manifest.js"
    mapping = manifest(dest_manifest)
    added = []
    mapping_changed = False

    for shot_id in generated:
        row = source_rows.get(shot_id)
        if not row or row.get("model") != MODEL:
            raise ValueError(f"Missing explicit {MODEL} ledger row for {shot_id}")
        src = image_file(source, shot_id)
        verify(src, row)
        prior = existing.get(shot_id)
        dst = image_file(dest, shot_id)
        if prior and dst.exists():
            try:
                verify(dst, prior)
                # The newest main already owns this shot. Keep its image and record.
                rel = f"film-ai/shots/{shot_id}.webp"
                mapping_changed |= mapping.get(shot_id) != rel
                mapping[shot_id] = rel
                continue
            except (OSError, KeyError, ValueError):
                pass
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dst)
        dest_rows.append(row)
        existing[shot_id] = row
        mapping[shot_id] = f"film-ai/shots/{shot_id}.webp"
        mapping_changed = True
        added.append(shot_id)

    if added:
        dest_ledger.write_text("".join(json.dumps(item, ensure_ascii=False) + "\n" for item in dest_rows), encoding="utf-8")
    if mapping_changed:
        dest_manifest.write_text("window.FILM_SHOT_IMAGES=" + json.dumps(mapping, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(json.dumps({"generated": len(generated), "added": len(added), "kept_from_latest": len(generated) - len(added)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
