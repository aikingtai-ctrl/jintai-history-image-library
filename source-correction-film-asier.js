/* One-film identity correction. Historical source shards remain frozen. */
(() => {
  const id = "film:src-fb238a11c00a6b57";
  const wid = "src-fb238a11c00a6b57";
  const source = "https://www.sansebastianfestival.com/2013/sections_and_films/zinemira/7/612400/in";
  const region = "Spain-Ecuador";
  const director = "Amaia Merino, Aitor Merino";
  const oldImdb = "https://www.imdb.com/title/tt1000764/mediaindex/";
  const imdb = "https://www.imdb.com/title/tt3183716/mediaindex/";
  const brief = "2013 年 · 电影 · Spain-Ecuador · 导演 Amaia Merino, Aitor Merino；影视参考图集收录 33 条镜头描述。";
  const badPromptIds = new Set([
    "VP-src-fb238a11c00a6b57-01",
    "VP-src-fb238a11c00a6b57-02",
    "VP-src-fb238a11c00a6b57-03"
  ]);
  const badFrameIds = new Set([
    "IM-src-fb238a11c00a6b57-rm640612864-01",
    "IM-src-fb238a11c00a6b57-rm1205721090-02",
    "IM-src-fb238a11c00a6b57-rm2852299266-03"
  ]);
  const previous = window.applyJintaiSourceCorrection;

  window.applyJintaiSourceCorrection = function (record) {
    if (previous) previous(record);
    if (!record || record.id !== id || record.src !== source) return record;
    record.sub = region;
    record.brief = brief;
    if (Object.prototype.hasOwnProperty.call(record, "anchor")) record.anchor = brief;
    if (record.film && record.film.wid === wid) {
      record.film.region = region;
      record.film.director = director;
      if (Array.isArray(record.film.sources)) {
        record.film.sources.forEach(item => {
          if (item.site === "IMDb" && item.url === oldImdb) item.url = imdb;
        });
      }
    }
    return record;
  };

  window.applyJintaiFilmWorkCorrection = function (work) {
    if (!work || work.wid !== wid || !String(work.src || "").includes(source)) return work;
    work.region = region;
    work.dir = director;
    work.src = work.src.replace(oldImdb, imdb);
    if (work.n === 36) work.n = 33;
    return work;
  };

  window.applyJintaiFilmCatalogueCorrection = function (work) {
    if (!work || work.id !== wid || !Array.isArray(work.sources) ||
        !work.sources.some(item => item.url === source)) return work;
    work.region = region;
    work.director = director;
    work.sources.forEach(item => {
      if (item.site === "IMDb" && item.url === oldImdb) item.url = imdb;
    });
    if (work.ref_count === 3) work.ref_count = 0;
    if (work.prompt_count === 36) work.prompt_count = 33;
    if (work.visual_prompt_count === 3) work.visual_prompt_count = 0;
    return work;
  };

  window.isJintaiFilmPromptQuarantined = function (record) {
    return !!record && badPromptIds.has(record.id);
  };
  window.filterJintaiFilmPrompts = function (workId, records) {
    return workId === wid && Array.isArray(records)
      ? records.filter(item => !badPromptIds.has(item.id))
      : records;
  };
  window.filterJintaiFilmFrames = function (workId, records) {
    return workId === wid && Array.isArray(records)
      ? records.filter(item => !badFrameIds.has(item[0]))
      : records;
  };

  window.JINTAI_FILM_ASIER_CORRECTION = Object.freeze({
    id, wid, source, region, director, brief, imdb,
    quarantinedPromptIds: Object.freeze([...badPromptIds]),
    quarantinedFrameIds: Object.freeze([...badFrameIds])
  });
})();
