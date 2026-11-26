import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const manifest = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'history-ai/page24-originals-manifest.js'), 'utf8'), manifest);
const images = manifest.window.JINTAI_PAGE24_IMAGES;
const count = Object.keys(images).length;
assert.ok(count >= 1 && count <= 120);
assert.ok(index.includes(`page24-originals-manifest.js?v=20261126-page24-${count}`));
const infoCode = index.match(/^function histOriginalInfo\(id\)\{[^\n]+/m)?.[0];
const previewCode = index.match(/^function histPreview\(id\)\{[^\n]+/m)?.[0];
assert.ok(infoCode && previewCode);
assert.match(index, /const native=histOriginalInfo\(r\.id\)/);
const originalInfo = vm.runInNewContext(`${infoCode};histOriginalInfo`, manifest);
const preview = vm.runInNewContext(`${infoCode};${previewCode};histPreview`, manifest);
for (const [id, item] of Object.entries(images)) {
  assert.match(item.original, /\/page24\/images\/.*\.png$/);
  assert.match(item.preview, /\/page24\/previews\/.*\.jpg$/);
  assert.match(item.source_deviation_note, /艺术|概念/);
  assert.equal(originalInfo(id), item);
  assert.equal(preview(id), item.preview);
}
