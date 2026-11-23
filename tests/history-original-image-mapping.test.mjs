import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = {};
for (const file of ['history-ai/manifest.js', 'history-ai/gpt-image-manifest.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), { window: manifest });
}
const originals = manifest.JINTAI_AI_IMAGES;
const ids = Object.keys(originals);
assert.equal(ids.length, 1998);
const gpt = manifest.JINTAI_GPT_IMAGES;
assert.ok(Object.keys(gpt).length >= 2);
for (const id of ['HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) assert.ok(gpt[id], id);
for (const item of Object.values(gpt)) {
  assert.equal(item.model, 'GPT Image');
  assert.equal(item.original_dir, 'history_2000_gpt_image');
  assert.ok(item.preview.includes('/gpt-image-previews/'));
}
assert.ok(originals['HF-20261015-0101'] && gpt['HF-20261015-0101']);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.doesNotMatch(index, /JINTAI_REGENERATED_IMAGES|regenerated-manifest\.js/);
const histPreviewCode = index.match(/^function histPreview\(id\)\{[^\n]+/m)?.[0];
assert.ok(histPreviewCode);
const histPreview = vm.runInNewContext(`${histPreviewCode}; histPreview`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histPreview(id), originals[id] || gpt[id]?.preview, `homepage: ${id}`);
}
const histThumbCode = index.match(/^function histThumb\(id\)\{[^\n]+/m)?.[0];
assert.ok(histThumbCode);
const histThumb = vm.runInNewContext(`${histPreviewCode}; ${histThumbCode}; histThumb`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histThumb(id), originals[id] || gpt[id]?.preview, `homepage thumb: ${id}`);
}
assert.match(index, /const gpt=window\.JINTAI_AI_IMAGES\?\.\[r\.id\]\?null:window\.JINTAI_GPT_IMAGES\?\.\[r\.id\]/);

const checkedIds = new Set();
for (const [file, dataFile] of [
  ['history-batch.html', 'history-ai/gallery-data.js'],
  ['history-batch-1001-2000.html', 'history-ai/gallery-data-batch2.js'],
]) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.doesNotMatch(html, /JINTAI_REGENERATED_IMAGES|regenerated-manifest\.js/, file);
  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, dataFile), 'utf8'), { window: data });
  assert.match(html, /gpt-image-manifest\.js/);
  assert.match(html, /download=1/);
  const gptCode = html.match(/^function gpt\(r\)\{[^\n]+/m)?.[0];
  const previewSrcCode = html.match(/^function previewSrc\(r\)\{[^\n]+/m)?.[0];
  assert.ok(gptCode && previewSrcCode, file);
  const previewSrc = vm.runInNewContext(`${gptCode}; ${previewSrcCode}; previewSrc`, {
    window: manifest,
    histImgSrc: p => `https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/${p}`,
  });
  for (const row of data.HISTORY_BATCH.filter(row => row.status === 'done' || gpt[row.id])) {
    if (row.status === 'done') assert.equal(row.original, row.thumbnail, `${file}: stored original ${row.id}`);
    assert.equal(previewSrc(row), originals[row.id] || gpt[row.id]?.preview, `${file}: ${row.id}`);
    checkedIds.add(row.id);
  }
}
assert.equal(checkedIds.size, 2000);
console.log(`Verified ${ids.length} saved JPEGs and ${Object.keys(gpt).length} GPT Image PNGs across three pages.`);
