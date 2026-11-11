import fs from 'node:fs';

const output = process.env.GITHUB_OUTPUT;
if (!process.env.OPENAI_API_KEY) {
  fs.appendFileSync(output, 'run=false\n');
  console.log('OPENAI_API_KEY is not configured; waiting for the next scheduled run.');
  process.exit(0);
}

const targets = fs.readFileSync('film-ai/target-3000.txt', 'utf8').trim().split(/\r?\n/);
const source = fs.readFileSync('film-ai/manifest.js', 'utf8');
const manifest = JSON.parse(source.match(/window\.FILM_AI_IMAGES\s*=\s*(\{[\s\S]*\})\s*;?\s*$/)[1]);

for (let start = 1; start <= targets.length; start += 500) {
  const end = Math.min(start + 499, targets.length);
  const pending = targets.slice(start - 1, end).some(wid => !manifest[wid] || !fs.existsSync(manifest[wid]));
  if (!pending) continue;
  fs.appendFileSync(output, `run=true\nstart_index=${start}\nend_index=${end}\n`);
  console.log(`Next film image range: ${start}-${end}`);
  process.exit(0);
}

fs.appendFileSync(output, 'run=false\n');
console.log('All 3000 target film images are mapped.');
