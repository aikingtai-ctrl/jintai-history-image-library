import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const IMAGE_DIR = path.join(ROOT, 'film-ai');
const MANIFEST_PATH = path.join(IMAGE_DIR, 'manifest.js');
const WORKS_PATH = path.join(ROOT, 'd3', '00_works.js');
const VISUAL_WORKS_PATH = path.join(ROOT, 'd3', 'vworks.js');
const PROMPT_DIR = path.join(ROOT, 'd4');
const MODEL = 'gpt-image-2';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const page = Math.max(1, Number(arg('page', '1')) || 1);
const count = Math.max(1, Math.min(100, Number(arg('count', '100')) || 100));
const startIndex = Number(arg('start-index', '0'));
const endIndex = Number(arg('end-index', '0'));
const concurrency = Math.max(1, Math.min(8, Number(arg('concurrency', '3')) || 3));
const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');
if (startIndex && (!Number.isInteger(startIndex) || !Number.isInteger(endIndex) || endIndex < startIndex || endIndex - startIndex >= 500)) {
  throw new Error('Use a valid --start-index/--end-index range of at most 500 works.');
}

function parseWorks() {
  if (fs.existsSync(VISUAL_WORKS_PATH)) {
    let works = [];
    const sandbox = { window: { __VISUAL_WORKS__: records => { works = records; } } };
    vm.runInNewContext(fs.readFileSync(VISUAL_WORKS_PATH, 'utf8'), sandbox, { filename: VISUAL_WORKS_PATH });
    return works;
  }
  let works = [];
  const sandbox = { window: { __SHARD__: (_file, kind, records) => { if (kind === '__works__') works = records; } } };
  vm.runInNewContext(fs.readFileSync(WORKS_PATH, 'utf8'), sandbox, { filename: WORKS_PATH });
  return works;
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  const text = fs.readFileSync(MANIFEST_PATH, 'utf8');
  const match = text.match(/window\.FILM_AI_IMAGES\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
  return match ? JSON.parse(match[1]) : {};
}

function readFirstRecord(wid) {
  const file = path.join(PROMPT_DIR, `p_${wid}.js`);
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, 'utf8');
  const eq = text.indexOf('=');
  if (eq < 0) return null;
  try {
    const data = JSON.parse(text.slice(eq + 1).replace(/;\s*$/, ''));
    return data.records?.[0] || null;
  } catch {
    return null;
  }
}

function promptFor(work, record) {
  const shot = record?.prompt || record?.scene || record?.analysis || work.look || 'cinematic film still';
  return [
    'Create one original cinematic reference image in a 16:9 frame based on the first-shot description below.',
    'Preserve the described subject, setting, composition, lighting, color, camera angle, and mood.',
    'Do not reproduce any existing film frame, actor likeness, logo, title, credits, watermark, or readable text. Film names are metadata, not text to render.',
    `Film: ${work.t || ''} (${work.y || ''})${work.te ? ` / ${work.te}` : ''}`,
    `First-shot description: ${shot}`
  ].join('\n');
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function generate(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, size: '1536x864', quality: 'medium', output_format: 'webp', output_compression: 72, background: 'opaque' })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body?.error?.message || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const encoded = body?.data?.[0]?.b64_json;
  if (!encoded) throw new Error('Image API returned no image data');
  return Buffer.from(encoded, 'base64');
}

async function generateWithRetry(prompt) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try { return await generate(prompt); } catch (error) {
      const retryable = error.status === 429 || (error.status >= 500 && error.status < 600) || !error.status;
      if (!retryable || attempt === 3) throw error;
      await sleep(1500 * 2 ** attempt);
    }
  }
}

if (!dryRun && !process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Add it as a GitHub Actions secret before running this workflow.');
  process.exit(1);
}

const works = parseWorks().slice().sort((a, b) => Number(b.y || 0) - Number(a.y || 0) || Number(b.n || 0) - Number(a.n || 0));
const slice = startIndex ? works.slice(startIndex - 1, endIndex) : works.slice((page - 1) * 100, (page - 1) * 100 + count);
const manifest = readManifest();
fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!slice.length) throw new Error('No works found for the selected range.');
const newline = fs.existsSync(MANIFEST_PATH) && fs.readFileSync(MANIFEST_PATH, 'utf8').includes('\r\n') ? '\r\n' : '\n';
function saveManifest() {
  fs.writeFileSync(MANIFEST_PATH, `window.FILM_AI_IMAGES=${JSON.stringify(manifest, null, 2).replace(/\n/g, newline)};${newline}`, 'utf8');
}

console.log(`Selected ${slice.length} works for ${startIndex ? `positions ${startIndex}-${endIndex}` : `page ${page}`}; concurrency=${concurrency}; force=${force}; dryRun=${dryRun}`);
if (dryRun) {
  for (const work of slice) console.log(`${work.wid}\t${work.t}\t${readFirstRecord(work.wid)?.id || 'missing-first-shot'}`);
  process.exit(0);
}

let cursor = 0;
let completed = 0;
const worker = async () => {
  while (cursor < slice.length) {
    const work = slice[cursor++];
    const existing = manifest[work.wid] ? path.join(ROOT, manifest[work.wid]) : null;
    const target = path.join(IMAGE_DIR, `${work.wid}.webp`);
    if (!force && existing && fs.existsSync(existing)) { completed++; continue; }
    if (!force && fs.existsSync(target)) {
      manifest[work.wid] = `film-ai/${work.wid}.webp`;
      saveManifest();
      completed++;
      continue;
    }
    const record = readFirstRecord(work.wid);
    const bytes = await generateWithRetry(promptFor(work, record));
    fs.writeFileSync(target, bytes);
    manifest[work.wid] = `film-ai/${work.wid}.webp`;
    saveManifest();
    completed++;
    console.log(`[${completed}/${slice.length}] ${work.t} -> ${path.basename(target)}`);
  }
};
await Promise.all(Array.from({ length: Math.min(concurrency, slice.length) }, worker));
console.log(`Generated/kept ${completed} images. Manifest updated: ${MANIFEST_PATH}`);
