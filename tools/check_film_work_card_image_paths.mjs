import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

for (const file of ['film.html', '影视参考图集.html']) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if (match[1].trim()) new vm.Script(match[1]);
  }
  const functions = html.slice(html.indexOf('function resolveFilmAiAsset('), html.indexOf('function fillSel('));
  for (const isGitHub of [true, false]) {
    const wid = 'verification-film';
    const relativeJpg = 'film-ai/verification-film.jpg';
    const relativeShot = 'film-ai/shots/existing.webp';
    const relativeDeck = 'film-ai/decks/film-verification.webp';
    const shotIdUrl = 'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/film-ai/shots/shot-1.webp';
    const context = {
      IS_GH_FILM: isGitHub,
      window: {
        FILM_AI_IMAGES: { [wid]: relativeJpg },
        FILM_DECK_COVERS: { [`film:${wid}`]: relativeDeck },
        FILM_SHOT_WORK_IMAGES: { [wid]: relativeShot },
      },
      FILM_AI_IMAGES: {},
      FILM_AI_GENERATED_WIDS: new Set([wid]),
      WORK_BY_WID: new Map([[wid, { i: 0 }]]),
      BYW: new Map([[0, [{ id: 's1' }]]]),
      shotImageSrc: id => (id === 's1' ? shotIdUrl : ''),
    };
    vm.createContext(context);
    vm.runInContext(functions, context);

    const expectedJpg = isGitHub
      ? 'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/' + relativeJpg
      : relativeJpg;

    // Tier 1: direct HD work-concept / shot mapping wins
    assert.equal(context.getFilmAiSrc(wid), context.resolveFilmAiAsset(relativeShot));

    // Tier 2: verified shot image wins when direct mapping is absent
    delete context.window.FILM_SHOT_WORK_IMAGES[wid];
    assert.equal(context.getFilmAiSrc(wid), shotIdUrl);

    // Tier 3: single-film HD WebP deck cover wins over legacy/generated JPG
    context.BYW.set(0, []);
    assert.equal(context.getFilmAiSrc(wid), context.resolveFilmAiAsset(relativeDeck));

    // Tier 4: representative JPG fallback resolves to Raw on GitHub Pages and relative locally
    delete context.window.FILM_DECK_COVERS[`film:${wid}`];
    assert.equal(context.getFilmAiSrc(wid), expectedJpg);
    assert.equal(context.resolveFilmAiLegacyAsset('https://example.com/image.jpg'), 'https://example.com/image.jpg');
    assert.equal(context.resolveFilmAiLegacyAsset(''), '');
  }
  console.log(file + ': inline syntax and 4-tier HD representative image cascade passed');
}
