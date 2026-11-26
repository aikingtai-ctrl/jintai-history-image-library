/* HLM/LZ per-view originals. Card covers remain in specials-400-manifest.js. */
(() => {
  const GROUP = /^(HLM-20261030|LZ-20261102)-G(\d{3})$/;
  let manifestLoaded = false;

  function viewId(groupId, viewIndex) {
    const match = GROUP.exec(groupId || '');
    if (!match || !Number.isInteger(viewIndex) || viewIndex < 0 || viewIndex > 9) return '';
    const serial = (Number(match[2]) - 1) * 10 + viewIndex + 1;
    return match[1] + '-' + String(serial).padStart(4, '0');
  }

  function viewInfo(groupId, viewIndex) {
    const id = viewId(groupId, viewIndex);
    return id ? window.JINTAI_SPECIAL_VIEW_IMAGES?.[id] || null : null;
  }

  function ensureDetailButton() {
    let button = document.getElementById('dHistZoom');
    if (button) return button;
    const meta = document.getElementById('dmeta');
    if (!meta) return null;
    button = document.createElement('button');
    button.type = 'button';
    button.id = 'dHistZoom';
    button.className = 'history-detail-preview-button';
    const img = document.createElement('img');
    img.className = 'history-detail-preview';
    button.appendChild(img);
    const heading = meta.querySelector('h2');
    if (heading) heading.insertAdjacentElement('afterend', button);
    else meta.appendChild(button);
    return button;
  }

  function ensureStatus() {
    let status = document.getElementById('specialViewStatus');
    if (status) return status;
    const meta = document.getElementById('dmeta');
    if (!meta) return null;
    status = document.createElement('p');
    status.id = 'specialViewStatus';
    status.style.cssText = 'color:#315c4c;font-size:14pt;margin:8px 0 12px;line-height:1.5';
    meta.appendChild(status);
    return status;
  }

  function openViewOriginal(info, status) {
    const tab = window.open('about:blank', '_blank');
    if (!tab) {
      if (status) status.textContent = '浏览器拦截了新窗口，请允许本站弹出窗口后重试。';
      return;
    }
    tab.opener = null;
    historyOriginalUrl(info).then(url => tab.location.replace(url)).catch(() => {
      tab.close();
      if (status) status.textContent = '原图入口暂不可用，请稍后重试。';
    });
  }

  function renderSelectedView() {
    if (typeof cur === 'undefined' || !cur || !GROUP.test(cur.id)) return;
    const button = ensureDetailButton();
    const status = ensureStatus();
    if (!button || !status) return;
    const index = typeof curIdx === 'number' ? curIdx : 0;
    const id = viewId(cur.id, index);
    const info = viewInfo(cur.id, index);
    const available = Array.from({length: 10}, (_, i) => Boolean(viewInfo(cur.id, i))).filter(Boolean).length;
    const tabs = document.querySelectorAll('#dtabs button');
    tabs.forEach((tab, i) => {
      const mapped = Boolean(viewInfo(cur.id, i));
      tab.dataset.original = mapped ? 'true' : 'false';
      tab.title = mapped ? '此视角已有原图' : '此视角尚未生成原图';
      if (!tab.dataset.baseLabel) tab.dataset.baseLabel = tab.textContent;
      tab.textContent = tab.dataset.baseLabel + (mapped ? ' ✓' : '');
    });
    if (!info || !info.preview) {
      button.hidden = true;
      button.onclick = null;
      status.textContent = manifestLoaded
        ? `视角 ${String(index + 1).padStart(2, '0')}（${id}）尚未生成原图；本卡已接 ${available}/10 张。`
        : '正在读取逐视角原图清单…';
      return;
    }
    const image = button.querySelector('img');
    image.src = info.preview;
    image.alt = `${cur.title || ''} · 视角 ${String(index + 1).padStart(2, '0')} 预览`;
    button.hidden = false;
    button.title = `新窗口查看视角 ${String(index + 1).padStart(2, '0')} 原图`;
    button.setAttribute('aria-label', button.title);
    button.onclick = event => {
      event.stopPropagation();
      openViewOriginal(info, status);
    };
    status.textContent = `视角 ${String(index + 1).padStart(2, '0')}（${id}）已接原图；本卡已接 ${available}/10 张。`;
  }

  const originalShow = window.show;
  if (typeof originalShow === 'function') {
    window.show = function(...args) {
      const result = originalShow.apply(this, args);
      renderSelectedView();
      return result;
    };
  }
  const originalOpenCard = window.openCard;
  if (typeof originalOpenCard === 'function') {
    window.openCard = async function(...args) {
      const result = await originalOpenCard.apply(this, args);
      renderSelectedView();
      return result;
    };
  }

  historyGalleryBase().then(base => {
    const script = document.createElement('script');
    script.src = base + '/jintai-history-image-library/history-ai/specials-4000-views-manifest.js?t=' + Date.now();
    script.onload = () => {
      for (const info of Object.values(window.JINTAI_SPECIAL_VIEW_IMAGES || {})) {
        if (!info.original_dir || !info.preview_filename) continue;
        info.preview = base + '/gallery-previews/' + encodeURIComponent(info.original_dir) + '/' + encodeURIComponent(info.preview_filename);
      }
      manifestLoaded = true;
      renderSelectedView();
    };
    script.onerror = () => {
      manifestLoaded = true;
      const status = ensureStatus();
      if (status) status.textContent = '逐视角原图清单暂不可用，请稍后重试。';
    };
    document.head.appendChild(script);
  }).catch(() => {
    manifestLoaded = true;
    const status = ensureStatus();
    if (status) status.textContent = '原图入口暂不可用，请稍后重试。';
  });

  window.JINTAI_SPECIAL_VIEW_UI = {viewId, viewInfo, renderSelectedView};
})();
