/* Display-only qualifications. Frozen source shards and original images are unchanged. */
(()=>{
  const specs={"HL-SHANG-SC-0022":{"title":"商代甲骨整治钻凿（影视复原）","level":"B/C（甲骨整治、钻凿有实物依据；此处工坊和人物组合为推拟）","note":"史料核对：殷墟卜甲与甲骨研究支持龟甲、兽骨在占卜前整治、钻凿，卜甲背面的钻凿痕是可见物证；画中的三名工匠、作坊布局、器具摆放与同一时刻的工序组合无同场直证，属于影视复原。此图表现整治阶段，不能当成具体遗址原貌或已发生灼烧占卜的实录。当前仅一张主图已生成，其余视角未生成。","source":"中国国家博物馆《证古泽今——甲骨文文化展》：https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/；故宫博物院《殷墟卜甲钻凿研究》：https://www.dpm.org.cn/research_talk/252345.html；故宫博物院《武丁贞问妇婡患疾刻辞卜甲》：https://www.dpm.org.cn/collection/impres/234490.html；本地 HL-SHANG-SC-0022-source-audit.md。","qualification":"整治与钻凿有实物依据；工坊人物为影视复原","prompt":"Create exactly one 16:9 horizontal macro documentary film reconstruction of late Shang oracle-bone preparation, ID HL-SHANG-SC-0022. Frame tightly within a plain shaded timber-and-earth workshop so no outdoor buildings or fortifications are visible. On a low earthen table, an adult craft worker uses a small stone abrasive to smooth a large realistic flat bovine shoulder blade. Beside them, a second adult carefully makes shallow round drilled depressions on the INNER reverse surface of a broad flat turtle plastron with a simple hand-held tool; the plate is unmistakably a flattened turtle belly shell, not a domed back shell. A third worker places a few clean uninscribed plastrons in an unglazed clay tray. Natural single-side daylight, close 35 mm view emphasizing hands, bone texture and shallow drilling pits, modest plain undyed clothing. Source objects attest bone/shell cleaning and drilling before heating; workshop and workers are film reconstruction. No heat cracks or burning in this preparation stage, no drilled through holes, no fake writing, no tower, wall, palace, banners, richly patterned trim, modern drill, captions, diagram, border or collage."}};
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)record=previous(record)||record;
    const spec=record&&specs[record.id];if(!spec)return record;
    record.title=spec.title;record.anchor=spec.note;record.brief=spec.note;
    record.src=spec.source;record.level=spec.level;
    record.review_status='考古依据与影视复原范围已标明';
    record.qualification=spec.qualification;record._sourceWarning=spec.note;
    (record.variants||[]).forEach((view,index)=>{
      if(view._shangSc22Applied)return;
      if(index===0){view.label='主机位（已生成）';view.prompt=spec.note+'\n\n实际生成提示词：\n'+spec.prompt;}
      else if(typeof view.prompt==='string'){view.prompt=spec.note+'\n\n未生成视角原稿提示词：\n'+view.prompt;}
      view._shangSc22Applied=true;
    });return record;
  };
})();
