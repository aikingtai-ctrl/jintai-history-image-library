import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
for (const file of ['film.html', '影视参考图集.html']) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) if (match[1].trim()) new vm.Script(match[1]);
  const functions = html.slice(html.indexOf('function resolveFilmAiAsset('), html.indexOf('function fillSel('));
  for (const isGitHub of [true, false]) {
    const wid = 'verification-film';
    const context = { IS_GH_FILM: isGitHub, window: { FILM_AI_IMAGES: { [wid]: 'film-ai/verification-film.jpg' } }, FILM_AI_IMAGES: {}, FILM_AI_GENERATED_WIDS: new Set([wid]), WORK_BY_WID: new Map(), BYW: new Map() };
    vm.createContext(context);
    vm.runInContext(functions, context);
    const relative = 'film-ai/verification-film.jpg';
    const expected = isGitHub ? 'https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/' + relative : relative;
    assert.equal(context.getFilmAiSrc(wid), expected);
    context.window.FILM_SHOT_WORK_IMAGES = { [wid]: 'film-ai/shots/existing.webp' };
    assert.equal(context.getFilmAiSrc(wid), expected);
    context.FILM_AI_GENERATED_WIDS.clear();
    assert.equal(context.getFilmAiSrc(wid), context.resolveFilmAiAsset('film-ai/shots/existing.webp'));
    delete context.window.FILM_SHOT_WORK_IMAGES[wid];
    assert.equal(context.getFilmAiSrc(wid), expected);
    assert.equal(context.resolveFilmAiLegacyAsset('https://example.com/image.jpg'), 'https://example.com/image.jpg');
    assert.equal(context.resolveFilmAiLegacyAsset(''), '');
  }
  console.log(file + ': inline syntax and representative image paths passed');
}
