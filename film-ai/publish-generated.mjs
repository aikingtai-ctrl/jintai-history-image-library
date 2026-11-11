import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const destination = process.argv[2];
const parse = text => JSON.parse(text.match(/window\.FILM_AI_IMAGES\s*=\s*(\{[\s\S]*\})\s*;?\s*$/)[1]);
const before = parse(execFileSync('git', ['show', 'HEAD:film-ai/manifest.js'], { encoding: 'utf8' }));
const generated = parse(fs.readFileSync('film-ai/manifest.js', 'utf8'));
const destManifest = path.join(destination, 'film-ai/manifest.js');
const latest = parse(fs.readFileSync(destManifest, 'utf8'));
let copied = 0;

for (const [wid, rel] of Object.entries(generated)) {
  if (before[wid] === rel) continue;
  if (!rel.startsWith('film-ai/') || rel.includes('..')) throw new Error(`Invalid image path for ${wid}`);
  fs.copyFileSync(rel, path.join(destination, rel));
  latest[wid] = rel;
  copied++;
}

if (copied) {
  fs.writeFileSync(destManifest, `window.FILM_AI_IMAGES=${JSON.stringify(latest, null, 2)};\n`);
  const htmlFile = path.join(destination, 'film.html');
  const html = fs.readFileSync(htmlFile, 'utf8');
  if (!/film-ai\/manifest\.js\?v=/.test(html)) throw new Error('Manifest script tag not found');
  const updated = html.replace(/film-ai\/manifest\.js\?v=[^"']+/, `film-ai/manifest.js?v=run-${process.env.GITHUB_RUN_ID}`);
  fs.writeFileSync(htmlFile, updated);
}
console.log(`Published image mappings prepared: ${copied}`);
