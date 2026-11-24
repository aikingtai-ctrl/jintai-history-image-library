import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = html.indexOf('function histPreview(id)');
const end = html.indexOf('let historyTunnelPromise;', start);
assert.ok(start >= 0 && end > start);

const opened = [];
const window = {
  JINTAI_PAGE20_IMAGES: { page20: { original: 'https://example.test/page20.png', preview: 'https://example.test/page20.jpg' } },
  JINTAI_PAGE19_IMAGES: { page19: { original: 'https://example.test/page19.png', preview: 'https://example.test/page19.jpg' } },
  JINTAI_QING_IMAGES: { qing: { filename: 'qing.png', preview: 'https://example.test/qing.jpg' } },
  JINTAI_GPT_IMAGES: { gpt: { filename: 'gpt.png', preview: 'https://example.test/gpt.jpg' } },
  JINTAI_YUANMING_IMAGES: { yuanming: { filename: 'yuanming.png', preview: 'https://example.test/yuanming.jpg' } },
  JINTAI_SONG_IMAGES: { song: { original: 'https://example.test/song.png', preview: 'https://example.test/song.jpg' } },
  JINTAI_AI_IMAGES: { saved: 'https://example.test/saved.jpg' },
  open(url) {
    const tab = { location: { replace(value) { tab.url = value; } } };
    opened.push({ url, tab });
    return tab;
  }
};
const context = { window, historyOriginalUrl: async info => `https://example.test/${info.filename}` };
vm.runInNewContext(html.slice(start, end) + '\nthis.openHistOriginal=openHistOriginal;', context);
for (const id of ['page20', 'page19', 'qing', 'gpt', 'yuanming', 'song', 'saved']) context.openHistOriginal({ id });
await new Promise(resolve => setImmediate(resolve));
assert.deepEqual(opened.map(x => x.tab.url || x.url), [
  'https://example.test/page20.png', 'https://example.test/page19.png', 'https://example.test/qing.png',
  'https://example.test/gpt.png', 'https://example.test/yuanming.png',
  'https://example.test/song.png', 'https://example.test/saved.jpg'
]);
assert.match(html, /previewButton\.onclick=.*openHistOriginal\(r\)/);
assert.match(html, /\$\('dHistZoom'\)\.onclick=\(\)=>openHistOriginal\(r\)/);
