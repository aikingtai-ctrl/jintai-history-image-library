import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'history-ai/page26-originals-manifest.js'), 'utf8'), context);
const images = context.window.JINTAI_PAGE26_IMAGES;
assert.equal(Object.keys(images).length, 12);
assert.ok(html.includes('page26-originals-manifest.js?v=20261127-page26-12'));
assert.ok(fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8').includes('"page26-originals-manifest.js"'));
assert.match(html, /window\.JINTAI_PAGE26_IMAGES\?\.\[id\]\|\|window\.JINTAI_PAGE25_IMAGES/);
assert.match(html, /previewButton\.onclick=ev=>\{ev\.stopPropagation\(\);openHistOriginal\(r\);\}/);
for (const [id, image] of Object.entries(images)) {
  assert.match(image.original, new RegExp(`/page26/images/${id}\\.png$`));
  assert.match(image.preview, new RegExp(`/page26/previews/${id}\\.jpg$`));
  assert.match(image.source_deviation_note, /概念艺术复原/);
}
