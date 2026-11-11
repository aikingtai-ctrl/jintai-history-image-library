import fs from 'node:fs';
import vm from 'node:vm';

const output = process.env.GITHUB_OUTPUT;
if (!process.env.OPENAI_API_KEY) {
  fs.appendFileSync(output, 'run=false\n');
  console.log('OPENAI_API_KEY is not configured; waiting for the next scheduled run.');
  process.exit(0);
}

let works = [];
const sandbox = { window: { __VISUAL_WORKS__: records => { works = records; } } };
vm.runInNewContext(fs.readFileSync('d3/vworks.js', 'utf8'), sandbox);
works.sort((a, b) => Number(b.y || 0) - Number(a.y || 0) || Number(b.n || 0) - Number(a.n || 0));
const source = fs.readFileSync('film-ai/manifest.js', 'utf8');
const manifest = JSON.parse(source.match(/window\.FILM_AI_IMAGES\s*=\s*(\{[\s\S]*\})\s*;?\s*$/)[1]);

for (let start = 301; start <= 3329; start += 500) {
  const end = Math.min(start + 499, 3329);
  const pending = works.slice(start - 1, end).some(work => !manifest[work.wid] || !fs.existsSync(manifest[work.wid]));
  if (!pending) continue;
  fs.appendFileSync(output, `run=true\nstart_index=${start}\nend_index=${end}\n`);
  console.log(`Next film image range: ${start}-${end}`);
  process.exit(0);
}

fs.appendFileSync(output, 'run=false\n');
console.log('All 3000 target film images are mapped.');
