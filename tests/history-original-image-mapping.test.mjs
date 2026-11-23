import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = {};
for (const file of ['history-ai/manifest.js', 'history-ai/regenerated-manifest.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), { window: manifest });
}
const originals = manifest.JINTAI_AI_IMAGES;
const ids = Object.keys(originals);
assert.equal(ids.length, 1998);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const histPreviewCode = index.match(/^function histPreview\(id\)\{[^\n]+/m)?.[0];
assert.ok(histPreviewCode);
const histPreview = vm.runInNewContext(`${histPreviewCode}; histPreview`, { window: manifest });
for (const id of ids) assert.equal(histPreview(id), originals[id], `homepage: ${id}`);

const checkedIds = new Set();
for (const [file, dataFile] of [
  ['history-batch.html', 'history-ai/gallery-data.js'],
  ['history-batch-1001-2000.html', 'history-ai/gallery-data-batch2.js'],
]) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, dataFile), 'utf8'), { window: data });
  const previewSrcCode = html.match(/^function previewSrc\(r\)\{[^\n]+/m)?.[0];
  assert.ok(previewSrcCode, file);
  const previewSrc = vm.runInNewContext(`${previewSrcCode}; previewSrc`, {
    histImgSrc: p => `https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/${p}`,
  });
  for (const row of data.HISTORY_BATCH.filter(row => row.status === 'done')) {
    assert.equal(row.original, row.thumbnail, `${file}: stored original ${row.id}`);
    assert.equal(previewSrc(row), originals[row.id], `${file}: ${row.id}`);
    checkedIds.add(row.id);
  }
}
assert.equal(checkedIds.size, ids.length);
console.log(`Verified original image mapping for ${ids.length} items across three pages.`);
