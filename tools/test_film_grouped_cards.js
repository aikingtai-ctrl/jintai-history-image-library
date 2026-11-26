// Regression check for the two public film search pages. Run with: node test_film_grouped_cards.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function verify(file) {
  const html = fs.readFileSync(file, 'utf8');
  const between = (from, to) => {
    const start = html.indexOf(from);
    const end = html.indexOf(to, start);
    assert.ok(start >= 0 && end > start, `${path.basename(file)}: missing ${from}`);
    return html.slice(start, end);
  };
  const code = between('let FIND_FILM_GROUPS=new Map();', 'function bindCards(')
    + between('function renderGrid(){', '/* ---------- 详情 ---------- */');
  const a = {i: 1, wid: 'film-a', t: '甲片', y: 2019, look: '甲片总览'};
  const b = {i: 2, wid: 'film-b', t: '乙片', y: 2020, look: '乙片总览'};
  const row = (id, work) => ({id, w: work.i, W: work, sc: '镜头描述'});
  const rowsA = [row('a1', a), row('a2', a)];
  const rowsB = Array.from({length: 8}, (_, i) => row(`b${i + 1}`, b));
  const frames = {b1: {f: 'a.jpg'}, b2: {f: 'a.jpg'}, b3: {f: 'b.jpg'}};
  const shots = {
    b4: 'film-ai/shots/x.webp?rev=1',
    b5: 'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/film-ai/shots/x.webp?rev=2',
    b6: 'film-ai/shots/y.webp',
    b7: 'film-ai/shots/z.webp',
    b8: 'film-ai/shots/w.webp',
  };
  const elements = {count: {}, grid: {}}, lightbox = {items: [], idx: 0};
  const ctx = {
    URL, location: {href: 'https://example.com/film.html'},
    window: {FILM_SHOT_IMAGES: shots}, FRAME_DIR: '影视参考图集_截帧',
    BYW: new Map([[1, rowsA], [2, rowsB]]),
    frOf: r => frames[r.id], shotImageSrc: id => shots[id],
    getFilmAiSrc: wid => `film-ai/decks/${wid}.webp`,
    DECKS: {cur: null}, CMP: [], palHTML: () => '',
    esc: x => String(x ?? ''), list: [...rowsA, ...rowsB], page: 0, PS: 60,
    bindCards: () => {}, syncPager: (current, total) => {ctx.pager = [current, total];},
    $: id => elements[id], LB_STATE: lightbox,
    renderLightboxItem: () => {ctx.lightboxRenders = (ctx.lightboxRenders || 0) + 1;},
    openDetail: () => {throw new Error('Unexpected fallback to shot detail');},
  };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  vm.runInContext('renderGrid()', ctx);
  assert.equal((elements.grid.innerHTML.match(/class="card film-card"/g) || []).length, 2);
  assert.match(elements.count.innerHTML, /共 <b>2<\/b> 部作品/);
  assert.deepEqual(ctx.pager, [0, 1]);
  assert.equal(vm.runInContext('filmStillItems(FIND_FILM_GROUPS.get("film-a")).length', ctx), 1);
  shots.a1 = 'film-ai/shots/second.webp';
  assert.equal(vm.runInContext('filmStillItems(FIND_FILM_GROUPS.get("film-a")).length', ctx), 2, 'Distinct representative supplements a shot image');
  delete shots.a1;
  assert.equal(vm.runInContext('filmStillItems(FIND_FILM_GROUPS.get("film-b")).length', ctx), 5);
  assert.equal(vm.runInContext('filmStillItems(FIND_FILM_GROUPS.get("film-b"))[0].kind', ctx), '真实截帧');
  assert.equal(vm.runInContext('new Set(filmStillItems(FIND_FILM_GROUPS.get("film-b")).map(x=>filmImageKey(x.src))).size', ctx), 5);
  vm.runInContext('openFilmStillLightbox("film-a")', ctx);
  assert.equal(lightbox.items.length, 1, 'Repeated work representative must appear once');
  vm.runInContext('openFilmStillLightbox("film-b")', ctx);
  assert.equal(lightbox.items.length, 5, 'Same-film lightbox must cap at five distinct images');
  assert.match(lightbox.items[0].title, /真实截帧/);
  ctx.PS = 1;
  vm.runInContext('renderGrid()', ctx);
  assert.deepEqual(ctx.pager, [0, 2]);
  assert.equal((elements.grid.innerHTML.match(/class="card film-card"/g) || []).length, 1);
  console.log(`PASS ${path.basename(file)}: one card per film; unique images; frame priority; five-image cap; film pagination`);
}

const pages = ['film.html', '影视参考图集.html'];
for (const page of pages) verify(path.resolve(__dirname, '..', page));
