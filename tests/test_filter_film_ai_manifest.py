"""Deployment behavior for existing, new and replaced work-card JPEGs."""

from __future__ import annotations

import json
import hashlib
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from filter_film_ai_manifest import filter_site_manifest, jpeg_dimensions, parse_manifest


BASE_REVISION = "a" * 40
CURRENT_REVISION = "b" * 40


def jpeg_header(width: int, height: int) -> bytes:
    # Valid SOI, APP0 and Start of Frame segments; the gate reads the SOF
    # dimensions and does not need to decode the compressed image payload.
    return (b"\xff\xd8\xff\xe0\x00\x04JF"
            + b"\xff\xc0\x00\x07\x08"
            + height.to_bytes(2, "big") + width.to_bytes(2, "big")
            + b"\xff\xd9")


class FilmWorkCardJpegGateTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.site = Path(self.tmp.name) / "_site"
        (self.site / "film-ai").mkdir(parents=True)
        self.manifest = self.site / "film-ai" / "manifest.js"
        self.report_path = self.site / "film-ai" / "work-card-jpg-gate-report.json"
        for name in ("film.html", "影视参考图集.html"):
            (self.site / name).write_text(
                '<script src="film-ai/manifest.js?v=source-pin"></script>\n', encoding="utf-8",
            )

    def put_manifest(self, mapping: dict[str, str]) -> None:
        self.manifest.write_text(
            "window.FILM_AI_IMAGES=" + json.dumps(mapping, indent=2)
            + ";\nwindow.FILM_AI_GENERATED_WIDS=[\"new\"];\n",
            encoding="utf-8",
        )

    def put_jpeg(self, name: str, width: int, height: int) -> None:
        path = self.site / "film-ai" / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(jpeg_header(width, height))

    def read_mapping(self) -> dict[str, str]:
        return parse_manifest(self.manifest.read_text(encoding="utf-8"))[1]

    def test_keeps_existing_and_hd_but_rejects_new_and_restores_replacements(self) -> None:
        original = {
            "old": ["film-ai/old.jpg", "1" * 40],
            "replaced": ["film-ai/previous.jpg", "2" * 40],
            "same_path": ["film-ai/same-path.jpg", "3" * 40],
            "was_webp": ["film-ai/previous.webp", "4" * 40],
        }
        baseline = {"schema": 1, "source_revision": BASE_REVISION,
                    "mapping_count": len(original), "mappings": original}
        self.put_manifest({
            "old": "film-ai/old.jpg",
            "new": "film-ai/new.jpg",
            "replaced": "film-ai/replacement.jpg",
            "same_path": "film-ai/same-path.jpg",
            "was_webp": "film-ai/replacement-for-webp.jpg",
            "hd": "film-ai/hd.jpg",
            "new_webp": "film-ai/new.webp",
        })
        for name, size in {
            "old.jpg": (640, 360),
            "new.jpg": (640, 360),
            "replacement.jpg": (640, 360),
            "same-path.jpg": (640, 360),
            "replacement-for-webp.jpg": (640, 360),
            "hd.jpg": (1672, 941),
        }.items():
            self.put_jpeg(name, *size)
        blobs = {
            "film-ai/old.jpg": "1" * 40,
            "film-ai/new.jpg": "5" * 40,
            "film-ai/replacement.jpg": "6" * 40,
            "film-ai/same-path.jpg": "7" * 40,
            "film-ai/replacement-for-webp.jpg": "8" * 40,
            "film-ai/hd.jpg": "9" * 40,
        }

        report = filter_site_manifest(self.site, baseline, blobs, CURRENT_REVISION, self.report_path)
        mapping = self.read_mapping()
        prefix = f"https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/{BASE_REVISION}/"
        self.assertEqual(mapping["old"], "film-ai/old.jpg")
        self.assertNotIn("new", mapping)
        self.assertEqual(mapping["replaced"], prefix + "film-ai/previous.jpg")
        self.assertEqual(mapping["same_path"], prefix + "film-ai/same-path.jpg")
        self.assertEqual(mapping["was_webp"], prefix + "film-ai/previous.webp")
        self.assertEqual(mapping["hd"], "film-ai/hd.jpg")
        self.assertEqual(mapping["new_webp"], "film-ai/new.webp")
        self.assertEqual(report["grandfathered_jpg"], 1)
        self.assertEqual(report["accepted_changed_jpg"], 1)
        self.assertEqual(report["rejected_count"], 4)
        self.assertEqual({entry["reason"] for entry in report["rejected"]}, {"below_1280x720"})
        self.assertIn('window.FILM_AI_GENERATED_WIDS=["new"]', self.manifest.read_text(encoding="utf-8"))
        self.assertTrue((self.site / "film-ai" / "old.jpg").exists())
        self.assertEqual(json.loads(self.report_path.read_text(encoding="utf-8"))["rejected_count"], 4)
        pin = hashlib.sha256(self.manifest.read_bytes()).hexdigest()[:16]
        self.assertEqual(report["deployed_manifest_pin"], pin)
        for name in ("film.html", "影视参考图集.html"):
            self.assertIn(f'film-ai/manifest.js?v={pin}',
                          (self.site / name).read_text(encoding="utf-8"))
            self.assertNotIn("source-pin", (self.site / name).read_text(encoding="utf-8"))

    def test_missing_invalid_and_external_jpegs_do_not_enter_manifest(self) -> None:
        self.put_manifest({
            "missing": "film-ai/missing.jpg",
            "invalid": "film-ai/invalid.jpg",
            "external": "https://example.com/image.jpg",
        })
        (self.site / "film-ai" / "invalid.jpg").write_bytes(b"not a JPEG")
        baseline = {"schema": 1, "source_revision": BASE_REVISION,
                    "mapping_count": 0, "mappings": {}}
        report = filter_site_manifest(
            self.site, baseline,
            {"film-ai/missing.jpg": "1" * 40, "film-ai/invalid.jpg": "2" * 40},
            CURRENT_REVISION, self.report_path,
        )
        self.assertEqual(self.read_mapping(), {})
        self.assertEqual(report["rejected_count"], 3)
        self.assertEqual({entry["reason"] for entry in report["rejected"]},
                         {"missing_staged_jpeg", "invalid_jpeg", "unverifiable_jpeg_reference"})

    def test_jpeg_dimensions_and_exact_threshold(self) -> None:
        self.put_jpeg("threshold.jpg", 1280, 720)
        self.assertEqual(jpeg_dimensions(self.site / "film-ai" / "threshold.jpg"), (1280, 720))
        self.put_manifest({"threshold": "film-ai/threshold.jpg"})
        report = filter_site_manifest(
            self.site, {"schema": 1, "source_revision": BASE_REVISION,
                        "mapping_count": 0, "mappings": {}},
            {"film-ai/threshold.jpg": "1" * 40}, CURRENT_REVISION, self.report_path,
        )
        self.assertEqual(self.read_mapping()["threshold"], "film-ai/threshold.jpg")
        self.assertEqual(report["rejected_count"], 0)
        self.assertEqual(report["deployed_manifest_pin"],
                         hashlib.sha256(self.manifest.read_bytes()).hexdigest()[:16])

    def test_verified_hd_cache_accepts_matching_oid_and_records_new_hd(self) -> None:
        self.put_jpeg("fresh_hd.jpg", 1536, 864)
        self.put_manifest({
            "cached_hd": "film-ai/cached_hd.jpg",
            "stale_oid": "film-ai/stale_oid.jpg",
            "fresh_hd": "film-ai/fresh_hd.jpg",
        })
        hd_cache = {
            "film-ai/cached_hd.jpg": ["a" * 40, 1600, 900],
            "film-ai/stale_oid.jpg": ["b" * 40, 1600, 900],
        }
        report = filter_site_manifest(
            self.site,
            {"schema": 1, "source_revision": BASE_REVISION, "mapping_count": 0, "mappings": {}},
            {
                "film-ai/cached_hd.jpg": "a" * 40,
                "film-ai/stale_oid.jpg": "c" * 40,
                "film-ai/fresh_hd.jpg": "d" * 40,
            },
            CURRENT_REVISION,
            self.report_path,
            verified_hd_cache=hd_cache,
        )
        mapping = self.read_mapping()
        self.assertEqual(mapping["cached_hd"], "film-ai/cached_hd.jpg")
        self.assertEqual(mapping["fresh_hd"], "film-ai/fresh_hd.jpg")
        self.assertNotIn("stale_oid", mapping)
        self.assertEqual(report["accepted_changed_jpg"], 2)
        self.assertEqual(report["verified_from_cache_jpg"], 1)
        self.assertEqual(report["rejected_count"], 1)
        self.assertEqual(hd_cache["film-ai/fresh_hd.jpg"], ["d" * 40, 1536, 864])


if __name__ == "__main__":
    unittest.main()
