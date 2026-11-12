import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const TARGETS = path.join(ROOT, 'film-ai', 'shot-targets-20261112.json');
const OUT = path.join(ROOT, 'film-ai', 'shots');
const MANIFEST = path.join(ROOT, 'film-ai', 'shots-manifest.js');
const LEDGER = path.join(ROOT, 'film-ai', 'shots-ledger-26.jsonl');
const MODEL = 'gpt-image-2.6-sunburst';

function argument(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index < 0 ? fallback : process.argv[index + 1];
}
const start = Number(argument('start-index', '1'));
const count = Number(argument('count', '1'));
const concurrency = Number(argument('concurrency', '1'));
const dryRun = process.argv.includes('--dry-run');
if (!Number.isInteger(start) || start < 1 || !Number.isInteger(count) || count < 1 || count > 100 ||
    !Number.isInteger(concurrency) || concurrency < 1 || concurrency > 4) {
  throw new Error('Use --start-index >= 1, --count 1..100, and --concurrency 1..4.');
}
if (!dryRun && !process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY Actions secret.');

const targets = JSON.parse(fs.readFileSync(TARGETS, 'utf8'));
const selected = targets.slice(start - 1, start - 1 + count);
if (selected.length !== count) throw new Error('Requested range extends beyond target list.');
fs.mkdirSync(OUT, { recursive: true });
const previous = fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, 'utf8').split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line)) : [];
const accepted = new Map(previous.filter(row => row.model === MODEL).map(row => [row.id, row]));
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const relative = id => `film-ai/shots/${id}.webp`;

function isWebp(bytes) {
  return bytes.length > 2048 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
}
function imageSize(ratio) {
  const r = Number.parseFloat(ratio) || 1.7778;
  if (r < 1.4) return r < 1.35 ? '1280x960' : '1312x960';
  if (r > 2.2) return '1536x640';
  if (r > 1.8) return '1488x800';
  return '1536x864';
}
function promptFor(target) {
  return [
    'Create one original, finished cinematic reference image for the gallery card below.',
    'Use the shot description as the visual specification: preserve its subject, action, composition, camera perspective, lighting, period, medium, palette, and mood.',
    'Use the named work only as context. Do not put its title, credits, subtitles, logos, watermarks, borders, or any readable text in the image.',
    'Avoid copying an existing frame pixel for pixel; make a new visual interpretation of the described shot.',
    `Work: ${target.title}. Aspect ratio: ${target.aspect_ratio}.`,
    `Shot description: ${target.prompt}`,
  ].join('\n');
}
function validAccepted(target) {
  const row = accepted.get(target.id);
  if (!row || row.model !== MODEL) return false;
  const file = path.join(ROOT, relative(target.id));
  if (!fs.existsSync(file)) return false;
  const bytes = fs.readFileSync(file);
  return isWebp(bytes) && sha256(bytes) === row.sha256;
}
function saveManifest() {
  const entries = [];
  for (const target of targets) if (accepted.has(target.id)) entries.push([target.id, relative(target.id)]);
  const tmp = `${MANIFEST}.tmp`;
  fs.writeFileSync(tmp, `window.FILM_SHOT_IMAGES=${JSON.stringify(Object.fromEntries(entries))};\n`, 'utf8');
  fs.renameSync(tmp, MANIFEST);
  return entries.length;
}
const initiallyValid = dryRun ? accepted.size : saveManifest();
console.log(`model=${MODEL} range=${start}-${start + count - 1} concurrency=${concurrency} already_valid=${initiallyValid} dry_run=${dryRun}`);
if (dryRun) {
  for (const [i, target] of selected.entries()) console.log(`${start + i}\t${target.id}\t${target.title}\t${imageSize(target.aspect_ratio)}`);
  process.exit(0);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function requestImage(target, prompt) {
  const size = imageSize(target.aspect_ratio);
  const body = { model: MODEL, prompt, size, quality: 'medium', complexity: 'medium', output_format: 'webp', output_compression: 78, background: 'opaque', n: 1 };
  for (let attempt = 0; attempt < 5; attempt++) {
    let response;
    try {
      response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(600000),
      });
    } catch (error) {
      if (attempt === 4) throw error;
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      const encoded = result?.data?.[0]?.b64_json;
      if (!encoded) throw new Error(`No image bytes for ${target.id}`);
      return { bytes: Buffer.from(encoded, 'base64'), size: result.size || size, usage: result.usage || null, requestId: response.headers.get('x-request-id') || null };
    }
    const message = result?.error?.message || `HTTP ${response.status}`;
    if (response.status !== 429 && response.status < 500) throw new Error(`${target.id}: HTTP ${response.status}: ${message}`);
    if (attempt === 4) throw new Error(`${target.id}: HTTP ${response.status}: ${message}`);
    await sleep(3000 * 2 ** attempt);
  }
}

let cursor = 0;
const failures = [];
const worker = async () => {
  while (cursor < selected.length) {
    const localIndex = cursor++;
    const target = selected[localIndex];
    if (validAccepted(target)) {
      console.log(`[${start + localIndex}/${targets.length}] kept ${target.id}`);
      continue;
    }
    const prompt = promptFor(target);
    try {
      const generated = await requestImage(target, prompt);
      if (!isWebp(generated.bytes)) throw new Error(`${target.id}: unexpected/invalid WebP output`);
      const file = path.join(ROOT, relative(target.id));
      const tmp = `${file}.${process.pid}.tmp`;
      fs.writeFileSync(tmp, generated.bytes);
      fs.renameSync(tmp, file);
      const row = {
        id: target.id, position: start + localIndex, title: target.title, model: MODEL,
        endpoint: '/v1/images/generations', size: generated.size, quality: 'medium', complexity: 'medium',
        prompt_sha256: sha256(Buffer.from(prompt)), sha256: sha256(generated.bytes),
        bytes: generated.bytes.length, request_id: generated.requestId, usage: generated.usage,
        created_at: new Date().toISOString(),
      };
      fs.appendFileSync(LEDGER, `${JSON.stringify(row)}\n`, 'utf8');
      accepted.set(target.id, row);
      const mapped = saveManifest();
      console.log(`[${start + localIndex}/${targets.length}] accepted ${target.id} ${generated.bytes.length} bytes mapped=${mapped}`);
    } catch (error) {
      failures.push(target.id);
      console.error(`[failed] ${target.id}: ${error.message}`);
    }
  }
};
await Promise.all(Array.from({ length: Math.min(concurrency, selected.length) }, worker));
if (failures.length) {
  console.error(`Failed ${failures.length} shot(s): ${failures.join(', ')}`);
  process.exitCode = 1;
}
