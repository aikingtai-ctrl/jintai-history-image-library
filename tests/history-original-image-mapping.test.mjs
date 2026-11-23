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
for (const id of [
  'JT-HF-XIANQIN-OFF-22003', 'HL-XIA-AC-0001', 'HL-XIA-AC-0002',
  'HL-XIA-AC-0003', 'HL-XIA-AC-0004', 'HL-XIA-AC-0005',
  'HL-XIA-AC-0011', 'HL-XIA-AC-0006', 'HL-XIA-AC-0008',
  'HL-XIA-AC-0009', 'HL-XIA-AC-0010',
  'HL-XIA-CO-0006', 'HL-XIA-CO-0007', 'HL-XIA-CO-0010',
  'HL-XIA-CO-0011', 'HL-XIA-CO-0012',
]) {
  assert.ok(gpt[id] && gpt[id].height > gpt[id].width, `portrait original: ${id}`);
}
assert.ok(originals['HF-20261015-0101'] && gpt['HF-20261015-0101']);
const gptAndJpg = 'HF-20261015-0101';
const jpgOnly = ids.find(id => !gpt[id]);
assert.ok(jpgOnly, 'Need a saved JPEG without an accepted GPT Image');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.doesNotMatch(index, /JINTAI_REGENERATED_IMAGES|regenerated-manifest\.js/);
const histPreviewCode = index.match(/^function histPreview\(id\)\{[^\n]+/m)?.[0];
assert.ok(histPreviewCode);
const histPreview = vm.runInNewContext(`${histPreviewCode}; histPreview`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histPreview(id), gpt[id]?.preview || originals[id], `homepage: ${id}`);
}
const histThumbCode = index.match(/^function histThumb\(id\)\{[^\n]+/m)?.[0];
assert.ok(histThumbCode);
const histThumb = vm.runInNewContext(`${histPreviewCode}; ${histThumbCode}; histThumb`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histThumb(id), gpt[id]?.preview || originals[id], `homepage thumb: ${id}`);
}
const lightboxSelect = index.match(/^\s*const gpt=window\.JINTAI_GPT_IMAGES\?\.\[r\.id\];/m)?.[0];
assert.ok(lightboxSelect, 'Homepage lightbox must select accepted GPT Image');
const lightboxGpt = vm.runInNewContext(`(r)=>{${lightboxSelect}return gpt;}`, { window: manifest });
assert.equal(lightboxGpt({ id: gptAndJpg }), gpt[gptAndJpg]);
assert.equal(lightboxGpt({ id: jpgOnly }), undefined);
const originalCode = index.match(/^async function historyOriginalUrl\(info\)\{[\s\S]*?^\}/m)?.[0];
assert.ok(originalCode, 'Homepage original PNG route missing');
const originalUrl = vm.runInNewContext(`${originalCode};historyOriginalUrl`, {
  historyGalleryBase: () => Promise.resolve('https://test.trycloudflare.com'), encodeURIComponent,
});
assert.equal(await originalUrl(lightboxGpt({ id: gptAndJpg })),
  `https://test.trycloudflare.com/original-pngs/${gpt[gptAndJpg].original_dir}/${gpt[gptAndJpg].filename}`);
assert.match(index, /download\.href=url\+'\?download=1'/);
assert.match(index, /saved\.hidden=!\(gpt&&window\.JINTAI_AI_IMAGES\?\.\[r\.id\]\)/);

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
  assert.match(html, /\.stage #full\{[^}]*object-fit:contain/, `${file}: keep portrait aspect ratio`);
  const promotionCode = html.match(/^for\(const row of rows\)\{if\(row\.status==='deferred'[^\n]+/m)?.[0];
  assert.ok(promotionCode, `${file}: missing GPT upgrade for deferred entries`);
  const deferredRows = [
    { id: 'HL-SHANG-FA-0008', status: 'deferred' },
    { id: 'HL-ZHOU-CO-0023', status: 'deferred' },
    { id: jpgOnly, status: 'deferred' },
  ];
  vm.runInNewContext(promotionCode, { rows: deferredRows, window: manifest });
  assert.deepEqual(deferredRows.map(row => row.status), ['done', 'done', 'deferred'],
    `${file}: accepted GPT images must be clickable even when the old JPEG was deferred`);
  const sizeLabelCode = html.match(/^function imageQualityLabel\(w,h,info\)\{[^\n]+/m)?.[0];
  assert.ok(sizeLabelCode, `${file}: missing resolution label`);
  assert.match(html, /img\.onload=[^\n]+imageQualityLabel\(w,h,info\)/);
  const imageQualityLabel = vm.runInNewContext(`${sizeLabelCode};imageQualityLabel`, {});
  const portrait = gpt['HL-XIA-AC-0001'];
  assert.equal(imageQualityLabel(portrait.width, portrait.height, portrait), 'GPT Image PNG');
  assert.equal(imageQualityLabel(658, 720, portrait), 'GPT Image 预览');
  const fullBody = gpt['HL-XIA-CO-0006'];
  assert.equal(imageQualityLabel(fullBody.width, fullBody.height, fullBody), 'GPT Image PNG');
  assert.equal(imageQualityLabel(480, 720, fullBody), 'GPT Image 预览');
  const gptCode = html.match(/^function gpt\(r\)\{[^\n]+/m)?.[0];
  const previewSrcCode = html.match(/^function previewSrc\(r\)\{[^\n]+/m)?.[0];
  assert.ok(gptCode && previewSrcCode, file);
  const selectGpt = vm.runInNewContext(`${gptCode};gpt`, { window: manifest });
  assert.equal(selectGpt({ id: gptAndJpg }), gpt[gptAndJpg], `${file}: GPT with saved JPG`);
  assert.equal(selectGpt({ id: jpgOnly }), undefined, `${file}: saved JPG without GPT`);
  const previewSrc = vm.runInNewContext(`${gptCode}; ${previewSrcCode}; previewSrc`, {
    window: manifest,
    histImgSrc: p => `https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/${p}`,
  });
  for (const row of data.HISTORY_BATCH.filter(row => row.status === 'done' || gpt[row.id])) {
    if (row.status === 'done') assert.equal(row.original, row.thumbnail, `${file}: stored original ${row.id}`);
    assert.equal(previewSrc(row), gpt[row.id]?.preview || originals[row.id], `${file}: ${row.id}`);
    checkedIds.add(row.id);
  }
  assert.equal(previewSrc({ id: gptAndJpg, thumbnail: `history-ai/thumbnails/000001-HF-20261015-0101.jpg` }),
    gpt[gptAndJpg].preview, `${file}: accepted GPT preview takes priority`);
  assert.equal(previewSrc({ id: jpgOnly, thumbnail: originals[jpgOnly].split('/main/').at(-1) }),
    originals[jpgOnly], `${file}: unaccepted entry keeps saved JPEG`);
  const batchUrlCode = html.match(/^async function gptOriginalUrl\(info\)\{[\s\S]*?^\}/m)?.[0];
  assert.ok(batchUrlCode, `${file}: original PNG route missing`);
  const batchOriginalUrl = vm.runInNewContext(`${batchUrlCode};gptOriginalUrl`, {
    location: { origin: 'https://test.trycloudflare.com', hostname: 'test.trycloudflare.com', port: '' },
    encodeURIComponent,
  });
  assert.equal(await batchOriginalUrl(selectGpt({ id: gptAndJpg })),
    `https://test.trycloudflare.com/original-pngs/${gpt[gptAndJpg].original_dir}/${gpt[gptAndJpg].filename}`);
  assert.match(html, /q\('downloadPng'\)\.href=url\+'\?download=1'/);
  assert.match(html, /q\('savedJpg'\)\.hidden=!\(info&&oldJpg\)/);
}
assert.equal(checkedIds.size, 2000);
console.log(`Verified ${ids.length} saved JPEGs and ${Object.keys(gpt).length} GPT Image PNGs across three pages.`);
