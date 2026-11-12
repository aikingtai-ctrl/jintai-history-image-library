"""Regression check: publishing a batch preserves earlier images and is idempotent."""

import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
MERGER = ROOT / "tools" / "merge_film_shot_batch_26.py"


class MergeFilmShotsTest(unittest.TestCase):
    def test_preserves_existing_mapping_and_repeated_publish(self):
        target = json.loads((ROOT / "film-ai" / "shot-targets-20261112.json").read_text(encoding="utf-8"))[0]
        shot_id = target["id"]
        payload = (ROOT / "film-ai" / "shots" / f"{shot_id}.webp").read_bytes()
        row = {
            "id": shot_id,
            "position": 1,
            "model": "gpt-image-2.6-sunburst",
            "sha256": hashlib.sha256(payload).hexdigest(),
        }
        with tempfile.TemporaryDirectory(prefix="film-merge-", dir=ROOT / "tools") as folder:
            self.assertTrue(Path(folder).resolve().is_relative_to((ROOT / "tools").resolve()))
            source, dest = Path(folder) / "source", Path(folder) / "dest"
            for base in (source, dest):
                (base / "film-ai" / "shots").mkdir(parents=True)
            (source / "film-ai" / "shots" / f"{shot_id}.webp").write_bytes(payload)
            (source / "film-ai" / "generated-shots-26.json").write_text(json.dumps([shot_id]), encoding="utf-8")
            (source / "film-ai" / "shots-ledger-26.jsonl").write_text(json.dumps(row) + "\n", encoding="utf-8")
            earlier = {"id": "earlier-shot", "model_family": "Images 2.6", "sha256": "earlier-hash"}
            (dest / "film-ai" / "shots-ledger-26.jsonl").write_text(json.dumps(earlier) + "\n", encoding="utf-8")
            manifest = dest / "film-ai" / "shots-manifest.js"
            manifest.write_text('window.FILM_SHOT_IMAGES={"earlier-shot":"film-ai/shots/earlier-shot.webp"};\n', encoding="utf-8")

            command = [sys.executable, str(MERGER), "--source", str(source), "--dest", str(dest)]
            first = subprocess.run(command, capture_output=True, text=True, check=True)
            self.assertEqual(json.loads(first.stdout)["added"], 1)
            self.assertIn('"earlier-shot"', manifest.read_text(encoding="utf-8"))
            self.assertIn(shot_id, manifest.read_text(encoding="utf-8"))
            self.assertEqual((dest / "film-ai" / "shots" / f"{shot_id}.webp").read_bytes(), payload)

            second = subprocess.run(command, capture_output=True, text=True, check=True)
            self.assertEqual(json.loads(second.stdout)["added"], 0)
            self.assertEqual(len((dest / "film-ai" / "shots-ledger-26.jsonl").read_text(encoding="utf-8").splitlines()), 2)


if __name__ == "__main__":
    unittest.main()
