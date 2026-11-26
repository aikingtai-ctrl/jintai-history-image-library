import assert from 'node:assert/strict';
import { createFilmShotQuota, updateShotManifestText } from './film-shot-quota.mjs';

const oldManifest = 'window.FILM_SHOT_IMAGES={"old":"old.webp"};\nwindow.FILM_SHOT_WORK_IMAGES={"film-a":"cover.webp"};\n';
const newManifest = updateShotManifestText(oldManifest, { fresh: 'new.webp' });
assert.match(newManifest, /FILM_SHOT_IMAGES=\{"fresh":"new.webp"\}/);
assert.match(newManifest, /FILM_SHOT_WORK_IMAGES=\{"film-a":"cover.webp"\}/);

const targets = Array.from({ length: 8 }, (_, i) => ({ id: `film-a-${i}`, wid: 'film-a' }));
targets.push({ id: 'film-b-0', wid: 'film-b' });
const mapped = { 'film-a-0': 'film-ai/shots/a.webp', 'film-a-1': 'film-ai/shots/a.webp' };
const quota = createFilmShotQuota(targets, mapped, [{ id: 'film-a-0', sha256: 'hash-a' }], 5);
assert.equal(quota.uniqueCount('film-a'), 1, 'same asset path counts once');
assert.equal(quota.reserve(targets[2]), true);
assert.equal(quota.reserve(targets[3]), true);
assert.equal(quota.reserve(targets[4]), true);
assert.equal(quota.reserve(targets[5]), true);
assert.equal(quota.reserve(targets[6]), false, 'concurrent reservations respect the cap');
quota.commit(targets[2], 'film-ai/shots/b.webp', 'hash-b');
assert.equal(quota.isDuplicate(targets[3], 'hash-b'), true, 'same bytes are rejected');
quota.release(targets[3]);
assert.equal(quota.reserve(targets[6]), true, 'failed generation releases its slot');
assert.equal(quota.reserve(targets[8]), true, 'another film has its own budget');
console.log('film shot quota: PASS');
