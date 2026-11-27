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
assert.equal(count, 120);
assert.ok(index.includes(`page24-originals-manifest.js?v=20261126-page24-${count}`));
const urlCode = index.match(/^function buildUrls\([^\n]+/m)?.[0];
assert.ok(urlCode);
const buildUrls = vm.runInNewContext(`${urlCode};buildUrls`, {
  IS_GH_HOST: true,
  CDN_BASES: ['https://gcore.jsdelivr.net/gh/aikingtai-ctrl/jintai-history-image-library@main/'],
});
const indexUrls = buildUrls('d1/nightly_20261016_001.js', 'd1/nightly_20261016_001.js');
assert.match(indexUrls[0], /\/main\/d1\/nightly_20261016_001\.js\?v=\d+$/);
assert.match(indexUrls[1], /\/90d6a7d673ebfd18560d62265cde449994555c30\/d1\/nightly_20261016_001\.js$/);
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

const currentChunks = JSON.parse(index.match(/const IDX_CHUNKS=(\[[^;]+\]);/)?.[1] || '[]');
for (const dir of ['d1', 'd2', 'd1_idx', 'd2_idx']) {
  const files = dir.endsWith('_idx')
    ? currentChunks.map(name => path.join(root, dir, name)).filter(file => fs.existsSync(file))
    : [path.join(root, dir, 'nightly_20261016_001.js')];
  assert.ok(files.length);
  const data = files.map(file => fs.readFileSync(file, 'utf8')).join('\n');
  assert.match(data, /【历史名人】士会（范武子）/);
  assert.match(data, /【历史名人】士燮（范文子）/);
  assert.doesNotMatch(data, /士会（范文子）|士燮（范宣子）/);
}
