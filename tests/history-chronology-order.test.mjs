import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const ERA_BASE='), html.indexOf('function computeBatchRank(')), context);
const rank = vm.runInContext('computeChronoRank', context);
assert.equal(rank({ era: '先秦', dyn: '先秦·战国', title: '虞卿·《虞氏春秋》著者' }), 150);
assert.equal(rank({ era: '先秦', dyn: '先秦·春秋', title: '春秋鲁国人物' }), 140);
