(() => {
  const api='https://api.github.com/repos/aikingtai-ctrl/jintai-history-image-library/';
  const base='https://raw.githubusercontent.com/aikingtai-ctrl/jintai-history-image-library/main/history-ai/qinhan/';
  const release='https://github.com/aikingtai-ctrl/jintai-history-image-library/releases/download/';
  let revision='',loading=false;
  window.JINTAI_QINHAN_IMAGES={};
  async function syncQinhanImages(){
    if(loading||document.hidden)return;
    loading=true;
    try{
      const meta=await fetch(api+'contents/history-ai/qinhan/manifest.json?ref=main&t='+Date.now(),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('manifest');return r.json()});
      if(meta.sha===revision)return;
      if(!/^[0-9a-f]{40}$/.test(meta.sha))throw Error('invalid revision');
      const blob=meta.content?meta:await fetch(api+'git/blobs/'+meta.sha,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('blob');return r.json()});
      if(blob.encoding!=='base64')throw Error('invalid encoding');
      const data=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(blob.content.replace(/\s/g,'')),c=>c.charCodeAt(0))));
      if(data.era!=='秦汉'||data.target!==8693||!data.images)throw Error('invalid manifest');
      const images=Object.create(null);
      for(const [id,item] of Object.entries(data.images)){
        if(!/^[A-Z0-9-]+$/.test(id)||!item.preview?.startsWith(base)||!item.preview.endsWith('.jpg')||
           !(item.original?.startsWith(base)||item.original?.startsWith(release))||!item.original.endsWith('.png'))continue;
        images[id]=item;
      }
      if(Object.keys(images).length!==data.count)throw Error('count mismatch');
      window.JINTAI_QINHAN_IMAGES=images;
      revision=meta.sha;
      if(typeof render==='function'&&typeof list!=='undefined'&&list.length)render();
    }catch(e){console.warn('秦汉图片清单暂不可用',e)}
    finally{loading=false}
  }
  syncQinhanImages();
  setInterval(syncQinhanImages,90000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncQinhanImages()});
})();
