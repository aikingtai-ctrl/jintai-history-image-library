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
  const route = isBatch ? 'gptOriginalUrl' : 'historyOriginalUrl';
  assert(source.includes(`${route}(info).then(url=>tab.location.replace(url))`), `${name}: direct navigation missing`);
  assert(!source.includes('probe.onload') && !source.includes('new Image()'), `${name}: full-image preload returned`);

  async function scenario({ original = true, fail = false } = {}) {
    const nav = [], opens = [];
    let lightbox = 0;
    const url = 'https://example.test/original-pngs/verified/verified.png';
    const preview = 'https://example.test/gallery-previews/verified/verified.webp';
    const info = original ? { width: 1536, height: 1024, original_dir: 'verified', filename: 'verified.png' } : null;
    const tab = { opener: {}, document: { body: { textContent: '' }, title: '' }, location: { replace: value => nav.push(value) } };
    const resolveUrl = () => fail ? Promise.reject(new Error('offline')) : Promise.resolve(url);
    const context = {
      Image: class { constructor() { throw Error('Unexpected image preload'); } },
      window: { open: value => { opens.push(value); return tab; } },
      alert: () => { throw Error('Unexpected popup block'); },
      histOriginalInfo: () => info,
      historyOriginalUrl: resolveUrl,
      openHistLightbox: () => lightbox++,
      gpt: () => info,
      original: () => info,
      previewSrc: () => preview,
      gptOriginalUrl: resolveUrl,
    };
    vm.runInNewContext(source, context);
    context[name]({ id: 'verified' });
    await tick();
    if (!original) {
      assert.deepEqual(nav, []);
      if (isBatch) assert.equal(opens[0], preview);
      else assert.equal(lightbox, 1);
      return;
    }
    assert.equal(opens[0], 'about:blank');
    if (fail) {
      assert.deepEqual(nav, []);
      assert.match(tab.document.body.textContent, /暂不可用/);
    } else assert.deepEqual(nav, [url]);
  }

  await scenario();
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
const labels = {
  histOriginalInfo: () => mapped,
  histMuseumCopy: () => mapped?.method === 'museum_open_access_original' ? mapped : null,
};
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

console.log('History original route and label checks passed: main + 2 batch pages; direct navigation, URL failure, and preview-only cases.');
