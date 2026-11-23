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
assert.ok(Object.keys(gpt).length >= 152);
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
  'HL-XIA-CO-0013', 'HL-XIA-CO-0014', 'HL-XIA-CO-0016',
  'HL-XIA-CO-0018', 'HL-XIA-CO-0019',
  'HL-XIA-CO-0020', 'HL-XIA-CO-0023', 'HL-XIA-CO-0025',
  'HL-XIA-CO-0026', 'HL-XIA-CO-0038',
  'HL-XIA-CO-0039', 'HL-XIA-CO-0040', 'HL-XIA-CO-0042',
  'HL-XIA-CO-0043', 'HL-XIA-CO-0044',
  'HL-XIA-CO-0045', 'HL-XIA-CO-0046', 'HL-XIA-CO-0047',
  'HL-XIA-CO-0048', 'HL-XIA-CO-0049',
  'HL-XIA-CO-0051', 'HL-XIA-CO-0052', 'HL-XIA-CO-0055',
  'HL-XIA-CO-0056', 'HL-XIA-CO-0057', 'HL-XIA-CO-0058',
  'HL-XIA-CO-0059', 'HL-XIA-CO-0060', 'HL-XIA-CO-0063',
  'HL-XIA-CO-0064',
  'HL-XIA-CO-0067', 'HL-XIA-CO-0068', 'HL-XIA-CO-0076',
  'HL-XIA-CO-0077', 'HL-XIA-CO-0080',
  'HL-XIA-CO-0081', 'HL-XIA-CO-0082', 'HL-XIA-CO-0083',
  'HL-XIA-CO-0084', 'HL-XIA-CO-0086',
  'HL-XIA-CO-0088', 'HL-XIA-CO-0089', 'HL-XIA-CO-0090',
  'HL-XIA-CO-0093', 'HL-XIA-CO-0095', 'HL-XIA-CO-0096',
]) {
  assert.ok(gpt[id] && gpt[id].height > gpt[id].width, `portrait original: ${id}`);
}
for (const id of ['HL-XIA-FA-0020', 'HL-XIA-FA-0021', 'HL-XIA-FA-0024', 'HL-XIA-FA-0025']) {
  assert.equal(gpt[id]?.width, 1312, 'near-square original width: ' + id);
  assert.equal(gpt[id]?.height, 1199, 'near-square original height: ' + id);
}
const batch91to110 = [
  'HL-XIA-FA-0026', 'HL-XIA-FA-0027', 'HL-XIA-FA-0028', 'HL-XIA-FA-0030',
  'HL-XIA-FA-0032', 'HL-XIA-FA-0033', 'HL-XIA-FA-0034', 'HL-XIA-FA-0037',
  'HL-XIA-FA-0039', 'HL-XIA-FA-0040', 'HL-XIA-FA-0052', 'HL-XIA-FA-0053',
  'HL-XIA-FA-0054', 'HL-XIA-FA-0056', 'HL-XIA-FA-0057', 'HL-XIA-FA-0058',
  'HL-XIA-FA-0059', 'HL-XIA-FA-0060', 'HL-XIA-FA-0061', 'HL-XIA-FA-0062',
];
assert.equal(batch91to110.length, 20);
for (const id of batch91to110) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.ok(image.width >= 1200 && image.height >= 1100, `native PNG dimensions: ${id}`);
  assert.ok(Math.abs(image.width / image.height - 720 / 658) < 0.05,
    `near-square original framing: ${id}`);
}
const batch111to130 = [
  'HL-XIA-FA-0063', 'HL-XIA-FA-0065', 'HL-XIA-FA-0066',
  'HL-XIA-FA-0069', 'HL-XIA-FA-0070', 'HL-XIA-FA-0071',
  'HL-XIA-FA-0072', 'HL-XIA-FA-0073', 'HL-XIA-FA-0074',
  'HL-XIA-FA-0077', 'HL-XIA-FA-0078', 'HL-XIA-FA-0081',
  'HL-XIA-FA-0082',
  'HT-N20261028-G007', 'HT-W20261028B-G012',
  'HT-W20261028B-G016', 'HT-W20261028B-G018',
  'HT-W20261028B-G030', 'HL-XIA-AC-0007', 'HL-XIA-AC-0012',
];
assert.equal(batch111to130.length, 20);
for (const [i, id] of batch111to130.entries()) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  const expected = i < 13 ? [1315, 1196] : i < 18 ? [1672, 941] : [1254, 1254];
  assert.deepEqual([image.width, image.height], expected, `native PNG dimensions: ${id}`);
}
const batch131to150 = [
  'HL-XIA-CO-0001', 'HL-XIA-CO-0002', 'HL-XIA-CO-0003',
  'HL-XIA-CO-0004', 'HL-XIA-CO-0005', 'HL-XIA-CO-0008',
  'HL-XIA-CO-0009', 'HL-XIA-CO-0015', 'HL-XIA-CO-0017',
  'HL-XIA-CO-0021', 'HL-XIA-CO-0022', 'HL-XIA-CO-0024',
  'HL-XIA-CO-0027', 'HL-XIA-CO-0028', 'HL-XIA-CO-0029',
  'HL-XIA-CO-0030', 'HL-XIA-CO-0031', 'HL-XIA-CO-0032',
  'HL-XIA-CO-0033', 'HL-XIA-CO-0034',
];
assert.equal(batch131to150.length, 20);
for (const id of batch131to150) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [1024, 1536], `full-body native PNG: ${id}`);
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
  const nearSquare = gpt['HL-XIA-FA-0020'];
  assert.equal(imageQualityLabel(nearSquare.width, nearSquare.height, nearSquare), 'GPT Image PNG');
  assert.equal(imageQualityLabel(720, 658, nearSquare), 'GPT Image 预览');
  for (const id of batch91to110) {
    const image = gpt[id];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(720, 658, image), 'GPT Image 预览', id);
  }
  for (const [i, id] of batch111to130.entries()) {
    const image = gpt[id];
    const oldSize = i < 13 ? [720, 658] : i < 18 ? [720, 405] : [658, 720];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(...oldSize, image), 'GPT Image 预览', id);
  }
  for (const id of batch131to150) {
    const image = gpt[id];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(480, 720, image), 'GPT Image 预览', id);
  }
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
