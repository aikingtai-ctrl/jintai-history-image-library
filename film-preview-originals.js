/* FILM_PREVIEW_DIRECT_OPEN: keep preview clicks pointed at source images. */
(() => {
  function original(src) {
    const match = String(src || '').match(/^(.*?film-ai\/goal3377\/)([^/?#]+)\.jpg(?:[?#].*)?$/i);
    return match ? `${match[1]}originals/${match[2]}.png` : src;
  }
  function href(src) {
    return /^https:\/\/github\.com\/aikingtai-ctrl\/jintai-history-image-library\/releases\/download\//i.test(src)
      ? `film-image.html?src=${encodeURIComponent(src)}` : src;
  }
  window.addEventListener('click', event => {
    const target = event.target.closest?.('[data-zoom-wid],.film-ai-preview:not(.empty),.thumb,.mini,.vis,.dk-cover,.qcell');
    if (!target) return;
    const card = target.closest('.wc,.dbody,.fp,.dkhead');
    const wid = target.matches('[data-zoom-wid],.film-ai-preview')
      ? (target.getAttribute('data-zoom-wid') || card?.querySelector('[data-zoom-wid]')?.getAttribute('data-zoom-wid') || card?.querySelector('[data-wid]')?.getAttribute('data-wid') || '') : '';
    const img = target.querySelector('img') || card?.querySelector('.film-ai-preview img');
    if (!img && !wid) return;
    let src = wid && typeof getFilmAiSrc === 'function' ? getFilmAiSrc(wid) : '';
    if (!src && !wid && typeof BYID !== 'undefined' && typeof frOf === 'function' && typeof FRAME_DIR !== 'undefined') {
      const shot = BYID.get(target.closest('[data-open]')?.dataset.open);
      const frame = shot && frOf(shot);
      if (frame) src = `${FRAME_DIR}/${frame.f}`;
    }
    src ||= img?.currentSrc || img?.getAttribute('src') || img?.src;
    if (!src) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.open(href(original(src)), '_blank', 'noopener');
  }, true);
})();
