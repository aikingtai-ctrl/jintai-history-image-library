import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const file of ['index.html', 'history-batch.html', 'history-batch-1001-2000.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  let checked = 0;
  for (const [, script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
    if (!script.trim()) continue;
    new vm.Script(script, { filename: file });
    checked++;
  }
  assert.ok(checked > 0, `No inline script checked in ${file}`);
  console.log(`${file}: ${checked} inline scripts parse`);
}
