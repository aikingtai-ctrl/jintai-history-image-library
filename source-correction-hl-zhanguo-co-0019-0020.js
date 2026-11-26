/* Display-only source corrections for two frozen Warring States concept drafts. */
(()=>{
  const corrections={
    'HL-ZHANGUO-CO-0019':{
      title:'战国燕地游士（艺术推证）',
      note:'史料核对：此图仅为战国燕地游士概念形象。冻结初稿的“前400—前300燕下都”定位未获充分证据；高冠、书箧、鸟首带钩及佩剑组合不是出土整套实物。',
      src:'《战国策·燕策》游说记载及河北省文物局燕下都考古资料；具体冠服、装备组合为艺术推证。https://wenwu.hebei.gov.cn/system/2023/11/01/030261130.shtml'
    },
    'HL-ZHANGUO-CO-0020':{
      title:'战国中山国表演者（艺术推证）',
      note:'史料核对：银首人俑铜灯的人物身着右衽宽袖锦袍，不能据此认定为“胡人舞者”或推出尖帽、短衣、长裤与靴的整套服装。此图的表演者身份、舞姿、服装与族属均属艺术推证。',
      src:'河北省民族事务委员会中山国文物介绍；银首人俑铜灯为宽袖袍人物，表演形象另作概念推证。https://mw.hebei.gov.cn/system/2024/10/11/030308915.shtml'
    }
  };
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||!Object.prototype.hasOwnProperty.call(corrections,record.id))return record;
    const correction=corrections[record.id];
    record.title=correction.title;
    record.anchor=correction.note;
    record.brief=correction.note;
    record.src=correction.src;
    record.review_status='原文来源纠错：具体人物、衣饰与动作均为概念推证';
    record._sourceWarning=correction.note;
    for(const view of record.variants||[]){
      if(view._co0019_0020WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=correction.note+'\n\n'+view.prompt;
      view._co0019_0020WarningApplied=true;
    }
    return record;
  };
})();
