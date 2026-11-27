/* Display-only qualification for HL-SHANG-SC-0002. Frozen source and image bytes remain intact. */
(()=>{
  const note='史料核对：殷墟出土龟甲、兽骨与甲骨刻辞，灼热使骨甲开裂以占问的做法有馆方资料支持；殷墟宫殿宗庙区亦有建筑地基。图中具体房间、炉具、服饰、两人身份与位置及仪式调度属于影视复原，不是一次出土现场的原样记录。冻结旧稿中的商王、契刻史官和卜骨架并未在这张主图中出现，也无证据证明其同场排位。当前仅生成本条一张主图，其余视角仍是未出图的提示词。';
  const source='联合国教科文组织殷墟资料：https://whc.unesco.org/en/list/1114/；大英博物馆《British Museum Magazine》2020 年秋季刊（商代骨甲灼卜）：https://www.britishmuseum.org/sites/default/files/2020-11/British_Museum_Magazine_Autumn2020_reducedsize.pdf；大都会艺术博物馆商代甲骨藏品：https://www.metmuseum.org/art/collection/search/60695';
  const generatedPrompt='Use case: historical-scene. ID HL-SHANG-SC-0002. Output exactly one 16:9 horizontal image. A late Shang oracle-bone divination scene inspired by excavated Yinxu turtle plastrons and ox scapulae: inside a restrained rammed-earth and timber setting, an adult specialist carefully applies a heated implement to a prepared turtle-shell plate, and another participant watches for the resulting cracks. A few already used bone pieces rest to one side. Show the shell, heat tool and focused human action clearly; do not create legible invented oracle-bone writing. The existence of late Shang divination, heat-induced cracks, inscribed shells and bones, and Yinxu rammed-earth timber structures is supported by archaeological collections; exact room layout, people, rank, clothing and ceremony staging are film reconstruction. Low warm light from a small heat source, grounded scale, tactile shell and earth, no huge bonfire, fantasy magic, later imperial hall, royal portrait, fictional named king, text or caption.';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!=='HL-SHANG-SC-0002')return record;
    record.title='商代甲骨灼卜（影视复原）';
    record.anchor=note;
    record.brief=note;
    record.src=source;
    record.level='C（骨甲灼卜有据；场景细部推拟）';
    record.review_status='考古依据与影视复原范围已标明';
    record.qualification='骨甲灼卜及殷墟建筑遗迹可证；本图人物、炉具、服饰和排位为影视复原';
    record._sourceWarning=note;
    (record.variants||[]).forEach((view,index)=>{
      if(view._shangSc0002WarningApplied)return;
      if(index===0){view.label='主机位（已生成）';view.prompt=note+'\n\n实际生成提示词：\n'+generatedPrompt;}
      else if(typeof view.prompt==='string'){view.prompt=note+'\n\n未生成视角原稿提示词：\n'+view.prompt;}
      view._shangSc0002WarningApplied=true;
    });
    return record;
  };
})();
