import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../film.html', import.meta.url), 'utf8');
const routing = html.slice(
  html.indexOf('function resolveFilmAiAsset('),
  html.indexOf('function fillSel(', html.indexOf('function resolveFilmAiAsset(')),
);
assert.ok(routing.includes('function getFilmAiSrc('));

const context = {
  IS_GH_FILM: true,
  window: {
    FILM_AI_IMAGES: {
      old: 'film-ai/old.jpg',
      restored: 'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/film-ai/old.jpg',
    },
    FILM_SHOT_WORK_IMAGES: { shot: 'film-ai/shots/shot.webp' },
    FILM_DECK_COVERS: { 'film:deck': 'film-ai/decks/film-deck.webp' },
  },
  WORK_BY_WID: new Map(),
  BYW: new Map(),
  shotImageSrc: () => '',
};
context.FILM_AI_IMAGES = context.window.FILM_AI_IMAGES;
vm.runInNewContext(routing, context);
assert.equal(context.getFilmAiSrc('old'), 'film-ai/old.jpg');
assert.equal(context.getFilmAiSrc('restored'), context.window.FILM_AI_IMAGES.restored);
assert.equal(context.getFilmAiSrc('new_rejected'), '');
assert.equal(
  context.getFilmAiSrc('shot'),
  'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/film-ai/shots/shot.webp',
);
assert.equal(
  context.getFilmAiSrc('deck'),
  'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/film-ai/decks/film-deck.webp',
);

const refresh = html.slice(
  html.indexOf('async function updateLiveFilmAiManifest()'),
  html.indexOf('async function updateLiveShotManifest()', html.indexOf('async function updateLiveFilmAiManifest()')),
);
assert.ok(refresh.startsWith('async function updateLiveFilmAiManifest()'));
let requestedUrl;
const refreshContext = {
  IS_GH_FILM: true,
  location: { href: 'https://aikingtai-ctrl.github.io/jintai-history-image-library/film.html' },
  URL,
  Date,
  AbortController,
  setTimeout,
  clearTimeout,
  window: { FILM_AI_IMAGES: { old: 'film-ai/old.jpg', rejected: 'film-ai/new-640.jpg' } },
  fetch: async (url) => {
    requestedUrl = new URL(url);
    return { ok: true, text: async () => 'window.FILM_AI_IMAGES={"old":"film-ai/old.jpg"};\nwindow.FILM_AI_GENERATED_WIDS=[];\n' };
  },
};
await vm.runInNewContext(refresh + '\nupdateLiveFilmAiManifest()', refreshContext);
assert.equal(requestedUrl.origin, 'https://aikingtai-ctrl.github.io');
assert.equal(requestedUrl.pathname, '/jintai-history-image-library/film-ai/manifest.js');
assert.deepEqual(Object.keys(refreshContext.window.FILM_AI_IMAGES), ['old']);
for (const name of ['film.html', '影视参考图集.html']) {
  const page = fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
  assert.ok(page.includes('function resolveFilmAiLegacyAsset('), `${name} lacks local JPG routing`);
  assert.ok(page.includes("new URL('film-ai/manifest.js',location.href)"), `${name} still loads raw main manifest`);
  const init = page.indexOf('const liveShots=Promise.all([updateLiveShotManifest(),updateLiveFilmAiManifest()]);');
  assert.ok(init >= 0, `${name} does not start manifest refresh`);
  const awaitRefresh = page.indexOf('await liveShots;', init);
  const firstRender = page.indexOf('refreshLoaded(', init);
  assert.ok(awaitRefresh >= 0 && firstRender > awaitRefresh,
    `${name} renders cards before the same-origin manifest refresh completes`);
  const pageRouting = page.slice(
    page.indexOf('function resolveFilmAiAsset('),
    page.indexOf('function fillSel(', page.indexOf('function resolveFilmAiAsset(')),
  );
  const pageRefresh = page.slice(
    page.indexOf('async function updateLiveFilmAiManifest()'),
    page.indexOf('async function updateLiveShotManifest()', page.indexOf('async function updateLiveFilmAiManifest()')),
  );
  assert.equal(pageRouting, routing, `${name} has different work-card fallback logic`);
  assert.equal(pageRefresh, refresh, `${name} has different manifest refresh logic`);
}
console.log('PASS film card JPEG asset routing and same-origin manifest refresh');
