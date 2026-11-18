import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const paths = ['film.html', '影视参考图集.html'];
const manifest = fs.readFileSync(new URL('../film-ai/manifest.js', import.meta.url), 'utf8');
const generatedMatch = manifest.match(/window\.FILM_AI_GENERATED_WIDS\s*=\s*(\[[\s\S]*?\])\s*;/);
assert.ok(generatedMatch, 'source manifest has no generated-WID ledger');
const realGenerated = new Set(JSON.parse(generatedMatch[1]));
assert.ok(realGenerated.has('src-bb0dffae67d2efdb'));

function classifier(html) {
  const works = html.indexOf('function renderWorks()');
  const start = html.indexOf('  const aiHires=', works);
  const end = html.indexOf('  const aiPreview=', start);
  assert.ok(works >= 0 && start > works && end > start, 'work-card badge block is missing');
  const block = html.slice(start, end);
  return (wid, aiSrc, generated = false, direct = false) => vm.runInNewContext(
    `(function(){${block}\nreturn aiBadge;})()`,
    {
      w: { wid },
      aiSrc,
      window: { FILM_SHOT_WORK_IMAGES: direct ? { [wid]: aiSrc } : {} },
      FILM_AI_GENERATED_WIDS: generated ? new Set([wid]) : new Set(),
    },
  );
}

for (const name of paths) {
  const html = fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
  assert.ok(html.includes('FILM_AI_GENERATED_WIDS=new Set(window.FILM_AI_GENERATED_WIDS||[])'),
    `${name} must load the generated-WID ledger`);
  const badge = classifier(html);

  assert.equal(badge('src-bb0dffae67d2efdb', 'film-ai/src-bb0dffae67d2efdb.jpg', true),
    'AI 小图·待升级', `${name}: real relative generated JPG`);
  assert.equal(badge('made-up', 'https://raw.githubusercontent.com/owner/repo/main/film-ai/slug.JPG?v=2#zoom', true),
    'AI 小图·待升级', `${name}: absolute generated JPG with query/hash`);
  assert.equal(badge('made-up', 'film-ai/slug.jpeg#zoom', true),
    'AI 小图·待升级', `${name}: relative JPEG with fragment`);
  assert.equal(badge('legacy', 'film-ai/src-legacy.jpg'),
    '旧版小图·待替换', `${name}: genuine legacy JPG`);
  assert.equal(badge('legacy', 'https://example.com/film-ai/src-legacy.jpg?x=1'),
    '旧版小图·待替换', `${name}: absolute genuine legacy JPG`);
  assert.equal(badge('generated', 'film-ai/shots/WORKCONCEPT-20261118-generated.webp?rev=x#zoom', true, true),
    '原创概念图·高清', `${name}: new-date work concept supersedes old generated JPG`);
  assert.equal(badge('generated', 'https://raw.githubusercontent.com/owner/repo/main/film-ai/shots/WORKCONCEPT-20301231-generated.webp#zoom', true, true),
    '原创概念图·高清', `${name}: absolute future-date work concept`);
  assert.equal(badge('deck', 'film-ai/decks/film-deck.webp?v=1'),
    '原创概念图·高清', `${name}: relative single-film deck cover`);
  assert.equal(badge('shot', 'film-ai/shots/other-shot.webp#zoom'),
    '高清 AI 参考图', `${name}: relative non-concept shot`);
  assert.equal(badge('generated-webp', 'film-ai/src-generated-webp.webp?v=1', true),
    'AI 代表图', `${name}: existing generated WebP label`);
  assert.equal(badge('generated', 'film-ai/shots/low-res.jpg', true),
    '旧版小图·待替换', `${name}: nested shot JPG is not a generated legacy preview`);
}
console.log('PASS both film pages classify generated JPG, legacy JPG, work concepts and other images');
