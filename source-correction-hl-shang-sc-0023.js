/* Display-only qualifications. Frozen source shards and original images are unchanged. */
(()=>{
  const specs={"HL-SHANG-SC-0023":{"title":"商代聚落出入（影视复原）","level":"B/C（商代城址与出入口有考古依据；这处聚落门、人员及通行过程为推拟）","note":"史料核对：垣曲商城考古报告列有商代城址西城门、西南出口和道路，可证相关时期存在城址出入口；殷墟 UNESCO 资料支持晚商夯土木构建筑遗迹，但不能据此把画中门楼断定为殷墟发掘出的某一处城门。图中的简朴木土聚落门、可移动门障、守卫和行人出入的同场组合、门禁规则均为影视复原；不是殷墟城门实测复原。当前仅一张主图已生成，其余视角未生成。","source":"中国国家博物馆《垣曲商城（二），1988～2003年度考古发掘报告》目录：https://www.chnmuseum.cn/yj/xscg/xszz/201801/t20180102_5348.shtml；联合国教科文组织殷墟资料：https://whc.unesco.org/en/list/1114/；本地 HL-SHANG-SC-0023-source-audit.md。","qualification":"商代城址出入口有据；此处聚落门和人物活动为影视复原","prompt_version":"","prompt":"Use case: historical-scene. ID HL-SHANG-SC-0023. Generate exactly one 16:9 horizontal cinematic reconstruction of a modest late Shang clan settlement entrance in the Anyang region at early morning. From inside the settlement, look toward a simple timber-post passage in a low earth-and-wood enclosure. Two adult workers are lifting aside a lightweight removable wooden crossbar or hurdle while two farmers carrying plain ceramic vessels walk toward the entrance; an adult with a child waits at a safe distance. A guard with a simple bronze dagger-axe stands to one side. Low timber-and-thatch dwellings and packed-earth footpath, no imposing city gate. Camera at human height, dawn light streaming through the opening, restrained clay, timber and woven cloth colors. Excavated Shang fortified settlements elsewhere have earthen walls and gateways; Yin Xu itself has a palace area with a defensive ditch rather than a documented masonry city wall. The precise clan gate, opening routine, people and traffic are film reconstruction. No massive battlement, watchtower, stone arch, later tiled gate, ox-drawn vehicle, elaborate decorated uniform, text, captions, diagram, border or collage."}};
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)record=previous(record)||record;
    const spec=record&&specs[record.id];if(!spec)return record;
    record.title=spec.title;record.anchor=spec.note;record.brief=spec.note;
    record.src=spec.source;record.level=spec.level;
    record.review_status='考古依据与影视复原范围已标明';
    record.qualification=spec.qualification;record._sourceWarning=spec.note;
    (record.variants||[]).forEach((view,index)=>{
      if(view._shangSc23Applied)return;
      if(index===0){view.label='主机位（已生成）';view.prompt=spec.note+'\n\n实际生成提示词：\n'+spec.prompt;}
      else if(typeof view.prompt==='string'){view.prompt=spec.note+'\n\n未生成视角原稿提示词：\n'+view.prompt;}
      view._shangSc23Applied=true;
    });return record;
  };
})();
