import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'history-ai/page25-originals-manifest.js'), 'utf8'), context);
const images = context.window.JINTAI_PAGE25_IMAGES;
assert.equal(Object.keys(images).length, 20);
assert.ok(html.includes('page25-originals-manifest.js?v=20261126-page25-20'));
assert.ok(fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8').includes('"page25-originals-manifest.js"'));
assert.match(html, /window\.JINTAI_PAGE25_IMAGES\?\.\[id\]\|\|window\.JINTAI_PAGE24_IMAGES/);
assert.match(html, /previewButton\.onclick=ev=>\{ev\.stopPropagation\(\);openHistOriginal\(r\);\}/);
assert.match(html, /\$\('dHistZoom'\)\.onclick=\(\)=>openHistOriginal\(r\)/);
for (const [id, image] of Object.entries(images)) {
  assert.match(image.original, new RegExp(`/page25/images/${id}\\.png$`));
  assert.match(image.preview, new RegExp(`/page25/previews/${id}\\.jpg$`));
  assert.match(image.source_deviation_note, /概念艺术复原/);
}
