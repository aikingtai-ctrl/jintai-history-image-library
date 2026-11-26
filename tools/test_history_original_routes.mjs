import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.argv[2] || '.';
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));

function functionSource(html, name) {
  const start = html.indexOf(`function ${name}(`);
  assert(start >= 0, `${name} missing`);
  const body = html.indexOf('{', start);
  let depth = 0;
  for (let i = body; i < html.length; i++) {
    if (html[i] === '{') depth++;
    if (html[i] === '}' && --depth === 0) return html.slice(start, i + 1);
  }
  throw new Error(`${name} unclosed`);
}

async function checkPopup(html, name, isBatch) {
  const source = functionSource(html, name);
  assert(source.includes('probe.onload'), `${name}: image load gate missing`);
  assert(source.includes('probe.naturalWidth') && source.includes('probe.naturalHeight'), `${name}: dimension gate missing`);
  assert(source.indexOf('tab.location.replace(url)') > source.indexOf('probe.onload'), `${name}: navigation precedes image check`);
  assert(source.includes('probe.onerror'), `${name}: image failure gate missing`);

  async function scenario({ original = true, width = 1536, height = 1024, fail = false } = {}) {
    const nav = [], probes = [], opens = [];
    let lightbox = 0;
    const info = original ? { width: 1536, height: 1024, original_dir: 'verified', filename: 'verified.png' } : null;
    const tab = { opener: {}, document: { body: { textContent: '' }, title: '' }, location: { replace: url => nav.push(url) } };
    class Probe {
      set src(url) { this.url = url; probes.push(this); }
    }
    const context = {
      Image: Probe,
      window: { open: url => { opens.push(url); return tab; } },
      alert: () => { throw Error('Unexpected popup block'); },
      histOriginalInfo: () => info,
      historyOriginalUrl: async () => 'https://example.test/original-pngs/verified/verified.png',
      openHistLightbox: () => lightbox++,
      gpt: () => info,
      previewSrc: () => 'https://example.test/gallery-previews/verified/verified.webp',
      gptOriginalUrl: async () => 'https://example.test/original-pngs/verified/verified.png',
    };
    vm.runInNewContext(source, context);
    context[name]({ id: 'verified' });
    await tick();
    if (!original) {
      assert.equal(probes.length, 0);
      assert.equal(nav.length, 0);
      if (isBatch) assert.equal(opens[0], 'https://example.test/gallery-previews/verified/verified.webp');
      else assert.equal(lightbox, 1);
      return;
    }
    assert.equal(probes.length, 1, `${name}: probe did not start`);
    assert.equal(nav.length, 0, `${name}: navigated before probe.onload`);
    const probe = probes[0];
    if (fail) probe.onerror();
    else { probe.naturalWidth = width; probe.naturalHeight = height; probe.onload(); }
    await tick();
    if (fail || width !== info.width || height !== info.height) {
      assert.equal(nav.length, 0, `${name}: invalid image navigated`);
      assert.match(tab.document.body.textContent, /暂不可用/);
    } else assert.deepEqual(nav, ['https://example.test/original-pngs/verified/verified.png']);
  }

  await scenario();
  await scenario({ width: 100 });
  await scenario({ fail: true });
  await scenario({ original: false });
}

const index = read('index.html');
assert(index.includes('JINTAI_MYTH_IMAGES?.[id]'), 'Myth original mapping missing');
assert(!index.includes("histOriginalInfo(r.id)?'查看原图'"), 'Unqualified original label in main gallery');
assert(!index.includes('aria-label="打开原图：'), 'Unqualified detail label in main gallery');
assert(index.includes('full.onload') && index.includes('download.hidden=false'), 'Lightbox download gate missing');
assert(index.indexOf('download.hidden=false') > index.indexOf('full.onload'), 'Lightbox download shown before image load');
assert(index.includes('full.onerror') && index.includes('download.hidden=true'), 'Lightbox download failure fallback missing');
const labelSource = functionSource(index, 'histOriginalLabel');
let mapped = null;
const labels = { histOriginalInfo: () => mapped };
vm.runInNewContext(labelSource, labels);
assert.equal(labels.histOriginalLabel('old-jpeg'), '查看预览');
mapped = { filename: 'accepted.png' };
assert.equal(labels.histOriginalLabel('accepted'), '查看原图');
mapped = { filename: 'museum.jpg', method: 'museum_open_access_original' };
assert.equal(labels.histOriginalLabel('museum'), '馆藏高清 JPEG 浏览版');
await checkPopup(index, 'openHistOriginal', false);

for (const name of ['history-batch.html', 'history-batch-1001-2000.html']) {
  const html = read(name);
  assert(html.includes('content:"↗ 查看预览"'), `${name}: old JPEG wrongly labeled as original`);
  assert(html.includes('.has-gpt::after{content:"↗ GPT Image 原图"}'), `${name}: accepted PNG label missing`);
  assert(html.includes("q('downloadPng').hidden=true"), `${name}: download initial hide missing`);
  assert(html.indexOf("q('downloadPng').hidden=false") > html.indexOf('full.onload'), `${name}: download shown before image load`);
  await checkPopup(html, 'openOriginal', true);
}

console.log('History original route and label checks passed: main + 2 batch pages; valid, wrong-size, failed, and preview-only cases.');
