import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = {};
for (const file of ['history-ai/manifest.js', 'history-ai/gpt-image-manifest.js', 'history-ai/qing-manifest.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), { window: manifest });
}
const originals = manifest.JINTAI_AI_IMAGES;
const ids = Object.keys(originals);
assert.equal(ids.length, 1998);
const gpt = manifest.JINTAI_GPT_IMAGES;
assert.equal(Object.keys(gpt).length, 406);
const taosiPanorama = gpt['AR-20261020-0025'];
assert.ok(originals['AR-20261020-0025'] && taosiPanorama,
  'saved Taosi JPEG and accepted GPT Image panorama both remain mapped');
assert.equal(taosiPanorama.method, 'reference_edit');
assert.deepEqual([taosiPanorama.width, taosiPanorama.height], [1921, 819]);
assert.ok(taosiPanorama.width * taosiPanorama.height >= 1_500_000);
assert.ok(Math.min(taosiPanorama.width, taosiPanorama.height) >= 800);
assert.ok(Math.abs(taosiPanorama.width / taosiPanorama.height - 720 / 307) < 0.06);
const taosiInterior = gpt['AR-20261020-0027'];
assert.ok(originals['AR-20261020-0027'] && taosiInterior,
  'saved Taosi interior JPEG and accepted GPT Image both remain mapped');
assert.equal(taosiInterior.method, 'reference_edit');
assert.deepEqual([taosiInterior.width, taosiInterior.height], [1672, 941]);
for (const [id, width, height] of [
  ['AR-20261020-0028', 1774, 887],
  ['AR-20261020-0029', 1774, 887],
  ['AR-20261020-0030', 1752, 897],
]) {
  assert.ok(originals[id] && gpt[id], `saved Taosi JPEG and accepted redraw: ${id}`);
  assert.equal(gpt[id].method, 'reference_edit');
  assert.deepEqual([gpt[id].width, gpt[id].height], [width, height]);
}
for (const [id, width, height] of [
  ['AR-20261020-0031', 1672, 941],
  ['AR-20261020-0032', 1774, 887],
  ['AR-20261020-0033', 1672, 941],
  ['AR-20261020-0034', 1672, 941],
  ['AR-20261020-0035', 1672, 941],
]) {
  assert.ok(originals[id] && gpt[id], `saved architectural JPEG and accepted redraw: ${id}`);
  assert.equal(gpt[id].method, 'reference_edit');
  assert.deepEqual([gpt[id].width, gpt[id].height], [width, height]);
}
for (const id of ['AR-20261020-0031', 'AR-20261020-0033', 'AR-20261020-0035']) {
  assert.ok(gpt[id].source_deviation_note, `reference/prompt difference disclosed: ${id}`);
}
for (const [id, width, height] of [
  ['AR-20261020-0036', 1672, 941],
  ['AR-20261020-0037', 1672, 941],
  ['AR-20261020-0038', 1672, 941],
  ['AR-20261020-0039', 1774, 887],
  ['AR-20261020-0040', 1672, 941],
  ['AR-20261020-0041', 1672, 941],
  ['AR-20261020-0042', 1672, 941],
  ['AR-20261020-0044', 1672, 941],
]) {
  assert.ok(originals[id] && gpt[id], `saved Xinzhai JPEG and accepted redraw: ${id}`);
  assert.equal(gpt[id].method, 'reference_edit');
  assert.deepEqual([gpt[id].width, gpt[id].height], [width, height]);
}
assert.ok(gpt['AR-20261020-0040'].source_deviation_note,
  'oblique JPEG versus frontal text difference disclosed');
for (const [id, width, height] of [
  ['AR-20261020-0043', 1672, 941],
  ['AR-20261020-0724', 1672, 941],
  ['AR-20261020-0726', 1774, 887],
  ['AR-20261020-0727', 1672, 941],
  ['AR-20261020-0728', 1672, 941],
  ['AR-20261020-0729', 1672, 941],
]) {
  assert.ok(originals[id] && gpt[id], `saved Erlitou JPEG and accepted redraw: ${id}`);
  assert.equal(gpt[id].method, 'reference_edit');
  assert.deepEqual([gpt[id].width, gpt[id].height], [width, height]);
}
for (const id of ['AR-20261020-0726', 'AR-20261020-0727']) {
  assert.ok(gpt[id].source_deviation_note, `saved JPEG/prompt difference disclosed: ${id}`);
}
assert.ok(!gpt['AR-20261020-0725'], 'unaccepted #416 remains outside the manifest');
for (const [id, width, height] of [
  ['AR-20261020-0730', 1672, 941],
  ['AR-20261020-0731', 1774, 887],
  ['AR-20261020-0732', 1672, 941],
  ['AR-20261020-0778', 1774, 887],
  ['AR-20261020-0780', 1672, 941],
  ['AR-20261020-0781', 1774, 887],
  ['AR-20261020-0782', 2172, 724],
  ['AR-20261020-0783', 1774, 887],
  ['AR-20261020-0784', 1774, 887],
]) {
  assert.ok(originals[id] && gpt[id], `saved Erlitou JPEG and accepted redraw: ${id}`);
  assert.equal(gpt[id].method, 'reference_edit');
  assert.deepEqual([gpt[id].width, gpt[id].height], [width, height]);
}
const ultraWide = gpt['AR-20261020-0782'];
assert.equal(ultraWide.width / ultraWide.height, 3);
assert.ok(ultraWide.width * ultraWide.height >= 1_500_000);
assert.ok(ultraWide.height >= 700);
assert.ok(!gpt['AR-20261020-0779'], 'unaccepted #425 remains outside the manifest');
const qing = manifest.JINTAI_QING_IMAGES;
assert.ok(Object.keys(qing).length >= 1 && Object.keys(qing).length <= 4573);
for (const id of ['HF-20261015-0093', 'HF-20261015-0094', 'HF-20261015-0095']) {
  assert.ok(qing[id], `Qing first-page image must map by source ID: ${id}`);
}
for (const item of Object.values(qing)) {
  assert.equal(item.source, 'Codex GPT Image original PNG');
  assert.equal(item.original_dir, 'history_qing_4573_codex_gpt_image_20261124');
  item.preview = `https://test.trycloudflare.com/gallery-previews/${item.original_dir}/${item.preview_filename}`;
}
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
const batch151to170 = [
  'HL-XIA-CO-0035', 'HL-XIA-CO-0036', 'HL-XIA-CO-0037',
  'HL-XIA-CO-0041', 'HL-XIA-CO-0050', 'HL-XIA-CO-0053',
  'HL-XIA-CO-0054', 'HL-XIA-CO-0061', 'HL-XIA-CO-0062',
  'HL-XIA-CO-0065', 'HL-XIA-CO-0066', 'HL-XIA-CO-0069',
  'HL-XIA-CO-0070', 'HL-XIA-CO-0071', 'HL-XIA-CO-0072',
  'HL-XIA-CO-0073', 'HL-XIA-CO-0074', 'HL-XIA-CO-0075',
  'HL-XIA-CO-0078', 'HL-XIA-CO-0079',
];
assert.equal(batch151to170.length, 20);
for (const id of batch151to170) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  const expected = id === 'HL-XIA-CO-0062' ? [1254, 1254] : [1024, 1536];
  assert.deepEqual([image.width, image.height], expected, `native PNG framing: ${id}`);
}
const batch171to176 = [
  'HL-XIA-CO-0085', 'HL-XIA-CO-0087', 'HL-XIA-CO-0091',
  'HL-XIA-CO-0092', 'HL-XIA-CO-0094', 'HL-XIA-CO-0097',
];
assert.equal(batch171to176.length, 6);
for (const id of batch171to176) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [1024, 1536], `winter portrait native PNG: ${id}`);
}
const batch177to200 = [
  ['HL-XIA-FA-0001', 1312, 1199], ['HL-XIA-FA-0002', 1312, 1199],
  ['HL-XIA-FA-0003', 1254, 1254], ['HL-XIA-FA-0004', 1312, 1199],
  ['HL-XIA-FA-0005', 1254, 1254], ['HL-XIA-FA-0006', 1284, 1225],
  ['HL-XIA-FA-0007', 1254, 1254], ['HL-XIA-FA-0008', 1254, 1254],
  ['HL-XIA-FA-0009', 1254, 1254], ['HL-XIA-FA-0010', 1312, 1199],
  ['HL-XIA-FA-0011', 1254, 1254], ['HL-XIA-FA-0012', 1278, 1230],
  ['HL-XIA-FA-0013', 1311, 1200], ['HL-XIA-FA-0014', 1312, 1199],
  ['HL-XIA-FA-0015', 1254, 1254], ['HL-XIA-FA-0016', 1278, 1230],
  ['HL-XIA-FA-0017', 1290, 1219], ['HL-XIA-FA-0018', 1310, 1200],
  ['HL-XIA-FA-0019', 1311, 1200], ['HL-XIA-FA-0022', 1254, 1254],
  ['HL-XIA-FA-0023', 1312, 1199], ['HL-XIA-FA-0029', 1254, 1254],
  ['HL-XIA-FA-0031', 1312, 1199], ['HL-XIA-FA-0035', 1254, 1254],
];
assert.equal(batch177to200.length, 24);
for (const [id, width, height] of batch177to200) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [width, height], `native near-square PNG: ${id}`);
}
const batch201to223 = [
  ['HL-XIA-FA-0036', 1312, 1199], ['HL-XIA-FA-0038', 1305, 1206],
  ['HL-XIA-FA-0041', 1305, 1206], ['HL-XIA-FA-0042', 1254, 1254],
  ['HL-XIA-FA-0043', 1305, 1205], ['HL-XIA-FA-0044', 1254, 1254],
  ['HL-XIA-FA-0045', 1293, 1217], ['HL-XIA-FA-0046', 1287, 1222],
  ['HL-XIA-FA-0047', 1312, 1199], ['HL-XIA-FA-0048', 1254, 1254],
  ['HL-XIA-FA-0049', 1312, 1199], ['HL-XIA-FA-0050', 1312, 1199],
  ['HL-XIA-FA-0051', 1283, 1226], ['HL-XIA-FA-0055', 1295, 1214],
  ['HL-XIA-FA-0064', 1312, 1199], ['HL-XIA-FA-0067', 1290, 1219],
  ['HL-XIA-FA-0068', 1312, 1199], ['HL-XIA-FA-0075', 1292, 1218],
  ['HL-XIA-FA-0076', 1312, 1199], ['HL-XIA-FA-0079', 1312, 1199],
  ['HL-XIA-FA-0080', 1312, 1199], ['HL-XIA-FA-0083', 1312, 1199],
  ['HL-XIA-FA-0084', 1313, 1198],
];
assert.equal(batch201to223.length, 23);
for (const [id, width, height] of batch201to223) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [width, height], `native near-square PNG: ${id}`);
}
const batch224to250 = [
  'HL-XIA-SC-0001', 'HL-XIA-SC-0006', 'HL-XIA-SC-0025',
  'HL-XIA-SC-0026', 'HL-XIA-SC-0027', 'HL-XIA-SC-0028',
  'HL-XIA-SC-0045', 'HL-XIA-SC-0046', 'HL-XIA-SC-0047',
  'HL-XIA-SC-0048', 'HL-XIA-LS-0001', 'HL-XIA-LS-0002',
  'HL-XIA-LS-0009', 'HL-XIA-LS-0010', 'HL-XIA-LS-0011',
  'HL-XIA-LS-0012', 'HL-XIA-LS-0013', 'HL-XIA-LS-0014',
  'HL-XIA-LS-0015', 'HL-XIA-LS-0016',
];
assert.equal(batch224to250.length, 20);
for (const id of batch224to250) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [1672, 941], `native widescreen PNG: ${id}`);
}
for (const [id, width, height] of [
  ['HL-XIA-SC-0002', 1774, 887], ['HL-XIA-SC-0003', 1679, 937],
  ['HL-XIA-SC-0004', 1774, 887], ['HL-XIA-SC-0005', 1672, 941],
  ['HL-XIA-SC-0007', 1774, 887], ['HL-XIA-SC-0008', 1774, 887],
  ['HL-XIA-SC-0009', 1774, 887],
]) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.deepEqual([image.width, image.height], [width, height], `native landscape PNG: ${id}`);
}
const batch251to280 = [
  'HL-XIA-SC-0010', 'HL-XIA-SC-0012', 'HL-XIA-SC-0013',
  'HL-XIA-SC-0014', 'HL-XIA-SC-0015', 'HL-XIA-SC-0016',
  'HL-XIA-SC-0017', 'HL-XIA-SC-0021', 'HL-XIA-SC-0022',
  'HL-XIA-SC-0029', 'HL-XIA-SC-0030', 'HL-XIA-SC-0031',
  'HL-XIA-SC-0032', 'HL-XIA-SC-0033', 'HL-XIA-SC-0034',
  'HL-XIA-SC-0035', 'HL-XIA-SC-0036', 'HL-XIA-SC-0037',
  'HL-XIA-SC-0038', 'HL-XIA-SC-0039', 'HL-XIA-SC-0040',
  'HL-XIA-SC-0041', 'HL-XIA-SC-0042', 'HL-XIA-SC-0043',
  'HL-XIA-SC-0044', 'HL-XIA-SC-0049', 'HL-XIA-SC-0050',
  'HL-XIA-SC-0051', 'HL-XIA-SC-0052', 'HL-XIA-SC-0053',
];
assert.equal(batch251to280.length, 30);
for (const id of batch251to280) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.ok(image.width * image.height >= 1_500_000, `native megapixels: ${id}`);
  assert.ok(image.height >= 850, `native short edge: ${id}`);
  assert.ok(image.width / image.height > 1.7 && image.width / image.height < 2.2,
    `landscape source framing: ${id}`);
}
const batch281to300 = [
  'HL-XIA-SC-0054', 'HL-XIA-SC-0055', 'HL-XIA-SC-0056',
  'HL-XIA-SC-0057', 'HL-XIA-SC-0058', 'HL-XIA-SC-0059',
  'HL-XIA-SC-0060', 'HL-XIA-SC-0061', 'HL-XIA-SC-0062',
  'HL-XIA-SC-0063', 'HL-XIA-SC-0064', 'HL-XIA-SC-0069',
  'HL-XIA-SC-0070', 'HL-XIA-SC-0071', 'HL-XIA-SC-0072',
  'HL-XIA-SC-0073', 'HL-XIA-SC-0074', 'HL-XIA-SC-0075',
  'HL-XIA-SC-0076', 'HL-XIA-SC-0077',
];
assert.equal(batch281to300.length, 20);
for (const id of batch281to300) {
  const image = gpt[id];
  assert.ok(originals[id] && image, `saved JPEG and accepted GPT image: ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.ok(image.width * image.height >= 1_500_000 && image.height >= 850,
    `native PNG dimensions: ${id}`);
}
for (const id of ['HL-XIA-SC-0063', 'HL-XIA-SC-0072']) {
  assert.deepEqual([gpt[id].width, gpt[id].height], [1672, 941],
    `corrected 16:9 source framing: ${id}`);
}
for (const id of ['HL-XIA-SC-0058', 'HL-XIA-SC-0059', 'HL-XIA-SC-0060']) {
  assert.match(gpt[id].source_deviation_note, /原有小图可见遗体.*合棺葬仪.*画面与原小图不同/,
    `public visual deviation disclosure: ${id}`);
}
for (let index = 301; index <= 330; index++) {
  const rows = Object.entries(gpt).filter(([, image]) => image.index === index);
  assert.equal(rows.length, 1, `accepted native image at index ${index}`);
  const [id, image] = rows[0];
  assert.ok(originals[id], `frozen JPEG preserved for ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.ok(image.width * image.height >= 1_500_000 && image.height >= 850,
    `native PNG dimensions: ${id}`);
  assert.match(image.preview, new RegExp(`/gpt-image-previews/${String(index).padStart(6, '0')}-`));
}
assert.equal(gpt['HL-XIA-SC-0083'].sha256,
  '33ba776bf6b7d15d66d1c75aec6838d44ab7ade34cd102b8d228a7f0fde2469a',
  'index 306 must use the accepted pseudo-mark correction');
assert.deepEqual([gpt['HL-XIA-SC-0089'].width, gpt['HL-XIA-SC-0089'].height], [1837, 856],
  'index 312 retains the wide source framing');
assert.equal(gpt['HT-W20261028B-G022'].index, 330);
for (let index = 332; index <= 360; index++) {
  if (index === 359) continue;
  const rows = Object.entries(gpt).filter(([, image]) => image.index === index);
  assert.equal(rows.length, 1, `accepted native image at index ${index}`);
  const [id, image] = rows[0];
  assert.ok(originals[id], `frozen JPEG preserved for ${id}`);
  assert.equal(image.method, 'reference_edit', id);
  assert.ok(image.width * image.height >= 1_500_000 && image.height >= 850,
    `native PNG dimensions: ${id}`);
}
for (const index of [331, 359]) {
  assert.ok(!Object.values(gpt).some(image => image.index === index),
    `unaccepted or missing image ${index} must not appear in the public map`);
}
for (const [index, id] of [
  [361, 'HL-XIA-LS-0039'], [362, 'HL-XIA-LS-0040'],
  [364, 'HL-XIA-SC-0018'], [378, 'HL-XIA-SC-0098'],
  [1149, 'HL-SHANG-SC-0110'], [1696, 'HF-20261023-0036'],
]) {
  const image = gpt[id];
  assert.equal(image?.index, index, `native image index: ${id}`);
  assert.ok(originals[id], `current saved JPEG exists for ${id}`);
  assert.equal(image.method, 'reference_edit', `must use saved JPEG as reference: ${id}`);
  assert.ok(image.width * image.height >= 1_500_000 && image.height >= 850,
    `native PNG dimensions: ${id}`);
}
for (const id of ['HL-XIA-LS-0018', 'HL-XIA-LS-0022', 'HL-XIA-LS-0024', 'HL-XIA-LS-0029']) {
  assert.deepEqual([gpt[id].width, gpt[id].height], [1774, 887],
    `corrected 2:1 source framing: ${id}`);
}
assert.deepEqual([gpt['HL-XIA-LS-0030'].width, gpt['HL-XIA-LS-0030'].height], [1833, 858],
  'index 352 retains its 720×337 source framing');
assert.ok(originals['HF-20261015-0101'] && gpt['HF-20261015-0101']);
const gptAndJpg = 'HF-20261015-0101';
const jpgOnly = ids.find(id => !gpt[id]);
assert.ok(jpgOnly, 'Need a saved JPEG without an accepted GPT Image');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.doesNotMatch(index, /JINTAI_REGENERATED_IMAGES|regenerated-manifest\.js/);
assert.match(index, /gpt\.source_deviation_note/, 'homepage must disclose changed visual content');
const histPreviewCode = index.match(/^function histPreview\(id\)\{[^\n]+/m)?.[0];
assert.ok(histPreviewCode);
const histPreview = vm.runInNewContext(`${histPreviewCode}; histPreview`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histPreview(id), gpt[id]?.preview || originals[id], `homepage: ${id}`);
}
for (const id of ['HF-20261015-0093', 'HF-20261015-0094', 'HF-20261015-0095']) {
  assert.equal(histPreview(id), qing[id].preview, `Qing homepage: ${id}`);
}
const histThumbCode = index.match(/^function histThumb\(id\)\{[^\n]+/m)?.[0];
assert.ok(histThumbCode);
const histThumb = vm.runInNewContext(`${histPreviewCode}; ${histThumbCode}; histThumb`, { window: manifest });
for (const id of [...ids, 'HL-SHANG-FA-0008', 'HL-ZHOU-CO-0023']) {
  assert.equal(histThumb(id), gpt[id]?.preview || originals[id], `homepage thumb: ${id}`);
}
for (const id of ['HF-20261015-0093', 'HF-20261015-0094', 'HF-20261015-0095']) {
  assert.equal(histThumb(id), qing[id].preview, `Qing homepage thumb: ${id}`);
}
const lightboxSelect = index.match(/^\s*const gpt=window\.JINTAI_PAGE20_IMAGES\?\.\[r\.id\]\|\|window\.JINTAI_PAGE19_IMAGES\?\.\[r\.id\]\|\|window\.JINTAI_QING_IMAGES\?\.\[r\.id\]\|\|window\.JINTAI_GPT_IMAGES\?\.\[r\.id\];/m)?.[0];
assert.ok(lightboxSelect, 'Homepage lightbox must select accepted GPT Image');
const lightboxGpt = vm.runInNewContext(`(r)=>{${lightboxSelect}return gpt;}`, { window: manifest });
assert.equal(lightboxGpt({ id: gptAndJpg }), gpt[gptAndJpg]);
for (const id of ['HF-20261015-0093', 'HF-20261015-0094', 'HF-20261015-0095']) {
  assert.equal(lightboxGpt({ id }), qing[id]);
}
assert.equal(lightboxGpt({ id: jpgOnly }), undefined);
const originalCode = index.match(/^async function historyOriginalUrl\(info\)\{[\s\S]*?^\}/m)?.[0];
assert.ok(originalCode, 'Homepage original PNG route missing');
const originalUrl = vm.runInNewContext(`${originalCode};historyOriginalUrl`, {
  historyGalleryBase: () => Promise.resolve('https://test.trycloudflare.com'), encodeURIComponent,
});
assert.equal(await originalUrl(lightboxGpt({ id: gptAndJpg })),
  `https://test.trycloudflare.com/original-pngs/${gpt[gptAndJpg].original_dir}/${gpt[gptAndJpg].filename}`);
assert.equal(await originalUrl(lightboxGpt({ id: 'HF-20261015-0093' })),
  `https://test.trycloudflare.com/original-pngs/${qing['HF-20261015-0093'].original_dir}/${qing['HF-20261015-0093'].filename}`);
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
  assert.match(html, /info\.source_deviation_note/, `${file}: disclose changed visual content`);
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
  for (const id of batch151to170) {
    const image = gpt[id];
    const oldSize = id === 'HL-XIA-CO-0062' ? [720, 658] : [480, 720];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(...oldSize, image), 'GPT Image 预览', id);
  }
  for (const id of batch171to176) {
    const image = gpt[id];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(480, 720, image), 'GPT Image 预览', id);
  }
  for (const [id] of batch177to200) {
    const image = gpt[id];
    assert.equal(imageQualityLabel(image.width, image.height, image), 'GPT Image PNG', id);
    assert.equal(imageQualityLabel(720, 658, image), 'GPT Image 预览', id);
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
console.log(`Verified ${ids.length} saved JPEGs, ${Object.keys(gpt).length} existing GPT Image PNGs, and ${Object.keys(qing).length} Qing GPT Image mappings.`);
