/* Native-original viewer for the 87,386-entry prompt browser.
 * Preview images are labeled as previews; the original action always opens a
 * PNG URL from a provenance manifest. Missing IDs never receive that action.
 */
(() => {
  'use strict';
  const DIRECT_FILES = [
    'browser-originals-manifest.js', 'three-manifest.js',
    'architecture-gpt-manifest.js', 'architecture-manifest.js',
    'people-manifest.js', 'southern-song-manifest.js',
    'southern-song-gpt-manifest.js', 'minguo-folk16-manifest.js',
    'xiongnu-manifest.js', 'specials-400-manifest.js',
    'shanhaijing-gpt-manifest.js', 'shanhaijing-originals-manifest.js',
    'myth-originals-manifest.js',
    'page23-originals-manifest.js', 'page22-originals-manifest.js',
    'page21-originals-manifest.js', 'page20-originals-manifest.js',
    'page19-originals-manifest.js', 'qing-manifest.js',
    'gpt-image-manifest.js', 'yuanming-manifest.js'
  ];
  const MAPS = [
    'JINTAI_BROWSER_IMAGES', 'JINTAI_THREE_IMAGES',
    'JINTAI_ARCH_GPT_IMAGES', 'JINTAI_ARCH_IMAGES',
    'JINTAI_PEOPLE_IMAGES', 'JINTAI_SHANHAIJING_GPT_IMAGES',
    'JINTAI_SOUTHERN_SONG_IMAGES', 'JINTAI_MINGUO_FOLK16_IMAGES',
    'JINTAI_XIONGNU_IMAGES', 'JINTAI_SPECIAL_IMAGES',
    'JINTAI_SHANHAIJING_IMAGES', 'JINTAI_MYTH_IMAGES',
    'JINTAI_PAGE23_IMAGES', 'JINTAI_PAGE22_IMAGES',
    'JINTAI_PAGE21_IMAGES', 'JINTAI_PAGE20_IMAGES',
    'JINTAI_PAGE19_IMAGES', 'JINTAI_QING_IMAGES',
    'JINTAI_GPT_IMAGES', 'JINTAI_YUANMING_IMAGES',
    'JINTAI_SONG_IMAGES'
  ];
  const DIR_RE = /^[A-Za-z0-9_-]+$/;
  const PNG_RE = /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*\.png$/i;
  const style = document.createElement('style');
  style.textContent = `
    .jt-original-preview{display:block;max-width:100%;max-height:280px;object-fit:contain;border-radius:7px;background:#f7f5f0}
    .jt-original-tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap;color:#59645e;font-size:12.5pt}
    .jt-original-tools button,.jt-original-tools a{font:inherit;cursor:pointer;border:1px solid #176148;color:#176148;background:#fff;border-radius:7px;padding:5px 10px;text-decoration:none}
    .jt-original-tools button:hover,.jt-original-tools a:hover{background:#e6f1ec}
    .jt-original-missing{color:#756b5e;font-size:12.5pt}
    .jt-modal-original{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;border:1px solid #e2ded3;padding:10px;border-radius:9px;margin:8px 0 14px}
    .jt-modal-original img{max-width:220px;max-height:180px;object-fit:contain;border-radius:5px;background:#f7f5f0}
  `;
  document.head.appendChild(style);

  let tunnelPromise;
  function galleryBase() {
    if (location.hostname.endsWith('.trycloudflare.com') ||
        (location.port === '18890' && ['127.0.0.1', 'localhost', '172.16.0.32'].includes(location.hostname))) {
      return Promise.resolve(location.origin);
    }
    if (!tunnelPromise) {
      tunnelPromise = fetch('https://aikingtai-ctrl.github.io/jintai-domestic-portal/tunnel.json?t=' + Date.now(), {cache:'no-store'})
        .then(r => { if (!r.ok) throw Error('原图网关不可用'); return r.json(); })
        .then(data => {
          if (!/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/i.test(data.tunnel_url || '')) throw Error('原图网关地址无效');
          return data.tunnel_url;
        });
    }
    return tunnelPromise;
  }

  function originalInfo(id) {
    for (const name of MAPS) {
      const info = window[name]?.[id];
      if (!info || !/^[a-f0-9]{64}$/i.test(info.sha256 || '')) continue;
      const trustedPngUrl = /^https:\/\/raw\.githubusercontent\.com\//i.test(info.original || '') ||
        /^https:\/\/[a-z0-9-]+\.trycloudflare\.com\//i.test(info.original || '') ||
        /^https:\/\/aikingtai-ctrl\.github\.io\/jintai-history-image-library\/history-ai\/page21-museum-originals\//i.test(info.original || '');
      if (trustedPngUrl && /\.png(?:[?#]|$)/i.test(info.original)) return info;
      if (DIR_RE.test(info.original_dir || '') && PNG_RE.test(info.filename || '')) return info;
    }
    return null;
  }
  function museumJpegInfo(id) {
    for (const name of MAPS) {
      const info = window[name]?.[id];
      if (info?.method === 'museum_open_access_original' &&
          /^[a-f0-9]{64}$/i.test(info.sha256 || '') &&
          /^https:\/\/raw\.githubusercontent\.com\//i.test(info.original || '') &&
          /\.jpe?g(?:[?#]|$)/i.test(info.original)) return info;
    }
    return null;
  }
  async function originalUrl(info) {
    if (info.original) return info.original;
    return (await galleryBase()) + '/original-pngs/' + encodeURIComponent(info.original_dir) + '/' + encodeURIComponent(info.filename);
  }
  async function previewUrl(info) {
    if (info.preview && /^https:\/\//i.test(info.preview)) return info.preview;
    if (info.preview && /^data:image\//i.test(info.preview)) return info.preview;
    if (info.preview_filename && DIR_RE.test(info.original_dir || '')) {
      return (await galleryBase()) + '/gallery-previews/' + encodeURIComponent(info.original_dir) + '/' + encodeURIComponent(info.preview_filename);
    }
    return '';
  }
  function openOriginal(event, id) {
    event.stopPropagation();
    const info = originalInfo(id);
    if (!info) return;
    const tab = window.open('about:blank', '_blank');
    if (!tab) return;
    tab.opener = null;
    tab.document.body.textContent = '正在打开原生 PNG…';
    originalUrl(info).then(url => tab.location.replace(url))
      .catch(() => { tab.document.body.textContent = '原图入口暂不可用，请稍后重试。'; });
  }
  window.browserOriginalInfo = originalInfo;
  window.browserOriginalUrl = originalUrl;

  function addPreview(container, info, alt) {
    const image = document.createElement('img');
    image.className = 'jt-original-preview';
    image.loading = 'lazy';
    image.alt = alt + '的网页预览图';
    image.onerror = () => { image.hidden = true; };
    previewUrl(info).then(url => { if (url) image.src = url; else image.hidden = true; })
      .catch(() => { image.hidden = true; });
    container.appendChild(image);
  }
  function addControls(container, id, info) {
    const line = document.createElement('div');
    line.className = 'jt-original-tools';
    const groupMain = info.coverage_scope === 'group_main_only_not_all_ten_variants';
    const label = document.createElement('span');
    label.textContent = (groupMain ? '十态组主图预览 · 原生 PNG ' : '网页预览 · 原生 PNG ') + (info.width || '?') + '×' + (info.height || '?');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = groupMain ? '查看十态组主图原生 PNG' : '查看或下载原图 PNG';
    button.addEventListener('click', event => openOriginal(event, id));
    line.append(label, button);
    container.appendChild(line);
  }
  function addMuseumControls(container, info) {
    const line = document.createElement('div');
    line.className = 'jt-original-tools';
    const label = document.createElement('span');
    label.textContent = '馆藏高清 JPEG 浏览版 · ' + (info.width || '?') + '×' + (info.height || '?');
    const view = document.createElement('a');
    view.href = info.original;
    view.target = '_blank';
    view.rel = 'noopener';
    view.textContent = '查看 JPEG 浏览版';
    line.append(label, view);
    if (/^https:\/\/(?:www\.)?clevelandart\.org\/art\//i.test(info.source || '')) {
      const source = document.createElement('a');
      source.href = info.source;
      source.target = '_blank';
      source.rel = 'noopener';
      source.textContent = '查看馆藏原件来源';
      line.appendChild(source);
    }
    container.appendChild(line);
  }
  function updateCards() {
    if (typeof filtered === 'undefined' || typeof state === 'undefined') return;
    const slice = filtered.slice((state.page - 1) * PAGE, state.page * PAGE);
    document.querySelectorAll('#grid .card').forEach((card, i) => {
      const row = slice[i];
      if (!row) return;
      const info = originalInfo(row.id);
      const block = document.createElement('div');
      block.className = 'jt-card-original';
      block.addEventListener('click', event => event.stopPropagation());
      if (info) {
        addPreview(block, info, row.title);
        addControls(block, row.id, info);
      } else if (museumJpegInfo(row.id)) {
        const museum = museumJpegInfo(row.id);
        block.classList.add('jt-original-museum');
        addPreview(block, museum, row.title);
        addMuseumControls(block, museum);
      } else {
        const missing = document.createElement('span');
        missing.className = 'jt-original-missing';
        missing.textContent = '主图未生成';
        block.appendChild(missing);
      }
      const desc = card.querySelector('.desc');
      card.insertBefore(block, desc);
    });
  }
  function updateModal() {
    const body = document.querySelector('#modal .modal-body');
    if (!body || typeof curItem === 'undefined' || !curItem) return;
    body.querySelector('.jt-modal-original')?.remove();
    const info = originalInfo(curItem.id);
    const block = document.createElement('div');
    block.className = 'jt-modal-original';
    if (info) {
      addPreview(block, info, curItem.title);
      addControls(block, curItem.id, info);
    } else if (museumJpegInfo(curItem.id)) {
      const museum = museumJpegInfo(curItem.id);
      block.classList.add('jt-original-museum');
      addPreview(block, museum, curItem.title);
      addMuseumControls(block, museum);
    } else {
      block.textContent = '该条目尚无已验收的主图 PNG。';
    }
    body.insertBefore(block, document.getElementById('mTabs'));
  }

  const priorRender = render;
  render = function() { priorRender(); updateCards(); };
  const priorOpenModal = openModal;
  openModal = async function(i) { await priorOpenModal(i); updateModal(); };
  updateCards();

  function loadManifest(file) {
    const script = document.createElement('script');
    script.src = 'history-ai/' + file + '?v=20261126';
    script.onload = () => {
      if (file === 'southern-song-manifest.js' || file === 'southern-song-gpt-manifest.js') {
        const incoming = window.JINTAI_SOUTHERN_SONG_IMAGES || {};
        const merged = window.__JT_BROWSER_SONG_IMAGES || {};
        const ranks = window.__JT_BROWSER_SONG_RANKS || {};
        const rank = file === 'southern-song-gpt-manifest.js' ? 2 : 1;
        for (const [id, info] of Object.entries(incoming)) {
          if ((ranks[id] || 0) <= rank) { merged[id] = info; ranks[id] = rank; }
        }
        window.__JT_BROWSER_SONG_IMAGES = merged;
        window.__JT_BROWSER_SONG_RANKS = ranks;
        window.JINTAI_SOUTHERN_SONG_IMAGES = merged;
      }
      if (typeof render === 'function') render();
      if (document.querySelector('#modal.open')) updateModal();
    };
    script.onerror = () => {
      galleryBase().then(base => {
        const fallback = document.createElement('script');
        fallback.src = base + '/jintai-history-image-library/history-ai/' + encodeURIComponent(file) + '?v=20261126';
        fallback.onload = script.onload;
        document.head.appendChild(fallback);
      }).catch(() => {});
    };
    document.head.appendChild(script);
  }
  DIRECT_FILES.forEach(loadManifest);
  fetch('https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/codex/song-originals-png-20261123/manifest.json', {cache:'no-store'})
    .then(r => { if (!r.ok) throw Error('Song manifest unavailable'); return r.json(); })
    .then(data => {
      if (data.era !== '宋辽金西夏' || data.target !== 11163 || !data.images) throw Error('Song manifest invalid');
      window.JINTAI_SONG_IMAGES = data.images;
      render();
    }).catch(() => {});
})();
