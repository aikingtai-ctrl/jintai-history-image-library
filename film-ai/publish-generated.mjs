import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const destination = process.argv[2];
const parseImages = text => {
  const match = text.match(/window\.FILM_AI_IMAGES\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (!match) throw new Error('FILM_AI_IMAGES manifest not found');
  return JSON.parse(match[1]);
};
const parseGeneratedWids = text => {
  const match = text.match(/window\.FILM_AI_GENERATED_WIDS\s*=\s*(\[[\s\S]*?\])\s*;/);
  return match ? JSON.parse(match[1]) : [];
};
const before = parseImages(execFileSync('git', ['show', 'HEAD:film-ai/manifest.js'], { encoding: 'utf8' }));
const generatedText = fs.readFileSync('film-ai/manifest.js', 'utf8');
const generated = parseImages(generatedText);
const generatedWids = new Set(parseGeneratedWids(generatedText));
const destManifest = path.join(destination, 'film-ai/manifest.js');
const latestText = fs.readFileSync(destManifest, 'utf8');
const latest = parseImages(latestText);
const latestGeneratedWids = parseGeneratedWids(latestText);
const latestGeneratedSet = new Set(latestGeneratedWids);
let copied = 0;

for (const [wid, rel] of Object.entries(generated)) {
  if (before[wid] === rel) continue;
  if (!rel.startsWith('film-ai/') || rel.includes('..')) throw new Error(`Invalid image path for ${wid}`);
  fs.mkdirSync(path.dirname(path.join(destination, rel)), { recursive: true });
  fs.copyFileSync(rel, path.join(destination, rel));
  latest[wid] = rel;
  if (generatedWids.has(wid) && !latestGeneratedSet.has(wid)) {
    latestGeneratedSet.add(wid);
    latestGeneratedWids.push(wid);
  }
  copied++;
}

if (copied) {
  fs.writeFileSync(destManifest, `window.FILM_AI_IMAGES=${JSON.stringify(latest, null, 2)};\nwindow.FILM_AI_GENERATED_WIDS=${JSON.stringify(latestGeneratedWids)};\n`);
  const htmlFile = path.join(destination, 'film.html');
  const html = fs.readFileSync(htmlFile, 'utf8');
  if (!/film-ai\/manifest\.js\?v=/.test(html)) throw new Error('Manifest script tag not found');
  const updated = html.replace(/film-ai\/manifest\.js\?v=[^"']+/, `film-ai/manifest.js?v=run-${process.env.GITHUB_RUN_ID}`);
  fs.writeFileSync(htmlFile, updated);
}
console.log(`Published image mappings prepared: ${copied}`);
