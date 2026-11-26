// Keep the image budget per film independent of how a batch is sliced or run concurrently.
export function updateShotManifestText(existing, imageMapping) {
  const assignment = `window.FILM_SHOT_IMAGES=${JSON.stringify(imageMapping)};`;
  const pattern = /window\.FILM_SHOT_IMAGES\s*=\s*\{[\s\S]*?\}\s*;/;
  return pattern.test(existing) ? existing.replace(pattern, assignment) : `${assignment}\n${existing}`;
}

export function createFilmShotQuota(targets, imageMapping, ledgerRows, limit = 5) {
  if (!Number.isInteger(limit) || limit < 1) throw new Error('Invalid film shot limit');
  const workById = new Map(targets.map(target => [target.id, target.wid]));
  const latestRow = new Map(ledgerRows.filter(row => row.id).map(row => [row.id, row]));
  const committed = new Map();
  const pending = new Map();

  function shotsFor(wid) {
    if (!committed.has(wid)) committed.set(wid, new Map());
    return committed.get(wid);
  }
  for (const [id, rel] of Object.entries(imageMapping)) {
    const wid = workById.get(id) || latestRow.get(id)?.wid;
    if (wid) shotsFor(wid).set(id, { rel, sha256: latestRow.get(id)?.sha256 || '' });
  }
  function uniqueCount(wid) {
    const paths = new Set(), hashes = new Set();
    let n = 0;
    for (const { rel, sha256 } of shotsFor(wid).values()) {
      if (paths.has(rel) || (sha256 && hashes.has(sha256))) continue;
      paths.add(rel);
      if (sha256) hashes.add(sha256);
      n++;
    }
    return n;
  }
  function reservedCount(wid) {
    let n = 0;
    for (const value of pending.values()) if (value === wid) n++;
    return n;
  }
  function reserve(target) {
    if (!target?.id || !target?.wid || pending.has(target.id)) return false;
    const replacing = shotsFor(target.wid).has(target.id);
    if (!replacing && uniqueCount(target.wid) + reservedCount(target.wid) >= limit) return false;
    pending.set(target.id, target.wid);
    return true;
  }
  function isDuplicate(target, sha256) {
    for (const [id, row] of shotsFor(target.wid)) {
      if (id !== target.id && row.sha256 && row.sha256 === sha256) return true;
    }
    return false;
  }
  function commit(target, rel, sha256) {
    if (pending.get(target.id) !== target.wid) throw new Error(`Unreserved shot: ${target.id}`);
    if (isDuplicate(target, sha256)) throw new Error(`Duplicate image bytes for ${target.wid}`);
    pending.delete(target.id);
    shotsFor(target.wid).set(target.id, { rel, sha256 });
  }
  function release(target) { pending.delete(target.id); }
  return { reserve, isDuplicate, commit, release, uniqueCount };
}
