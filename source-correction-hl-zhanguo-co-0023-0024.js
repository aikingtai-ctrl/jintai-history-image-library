/* Display-only source corrections; the frozen prompt shard is not modified. */
(()=>{
  const corrections={
    'HL-ZHANGUO-CO-0023':{
      title:'战国墨家守城工匠（艺术推证）',
      note:'史料核对：《墨子·备城门》论守城门器械，《法仪》以规、矩、绳论百工法度；原稿所写的宋地工师个人、草绳衣装和整袋工具并非可据这两篇直接复原的一套实物。此图只作墨家守城工匠概念推证。',
      src:'《墨子·备城门》与《墨子·法仪》；人物、衣装和工具组合为艺术推证。https://ctext.org/mozi/fortification-of-the-city-gate/zhs https://ctext.org/mozi/fa-yi/zhs'
    },
    'HL-ZHANGUO-CO-0024':{
      title:'战国齐地商贾（艺术推证）',
      note:'史料核对：《管子·轻重》讨论货币与交换，齐刀币有馆藏实物；原稿的商贾衣装、铜权佩饰、竹简账册及持币姿态并非文献或一件出土组合所能证实。此图为齐地商贾影视概念，不是已知个人的考古复原。',
      src:'《管子·轻重》与河南博物院齐刀币馆藏介绍；具体人物、衣装与账册为艺术推证。https://ctext.org/guanzi/qing-zhong-ii https://www.chnmus.net/ch/collection/appraise/details.html?id=512159106791891431'
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
    record.review_status='原文来源纠错：人物、衣装和器物组合为艺术推证';
    record._sourceWarning=correction.note;
    for(const view of record.variants||[]){
      if(view._co0023_0024WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=correction.note+'\n\n'+view.prompt;
      view._co0023_0024WarningApplied=true;
    }
    return record;
  };
})();
