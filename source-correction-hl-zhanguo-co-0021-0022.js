/* Display-only source corrections for two Warring States military concepts. */
(()=>{
  const corrections={
    'HL-ZHANGUO-CO-0021':{
      title:'战国魏国武卒（文献启发的艺术推证）',
      note:'史料核对：《荀子·议兵》记魏氏武卒的胄、戈、弩、矢、剑与粮；冻结初稿的帻巾、长戟及具体髹漆皮甲套装没有同等证据。原稿年代范围跨越魏迁都大梁之前，此图不限定大梁的具体年份。',
      src:'《荀子·议兵》魏氏武卒记载；开封市政府公报记魏惠王前365年迁都大梁。具体兵甲造型为艺术推证。https://ctext.org/xunzi/yi-bing/zh'
    },
    'HL-ZHANGUO-CO-0022':{
      title:'战国韩国弩兵（文献启发的艺术推证）',
      note:'史料核对：《战国策·韩策一》未记该兵专属衣装。原稿把望山、悬刀放在弩臂前端，与弩机位于后部的结构不合；河南博物院所示鎏金弩机为东汉器。此图的服装与整弩造型为艺术推证。',
      src:'《战国策·韩策一》韩国劲弩语境；河南博物院弩机结构介绍。具体服装和整弩为艺术推证。https://www.chnmus.net/sitesources/hnsbwy/page_pc/bwzl/yyhxzzjd/cpsx/articleafb40e7c5b6d4c51b8d45528d53192db.html'
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
    record.review_status='原文来源纠错：具体人物、兵甲与装备组合为概念推证';
    record._sourceWarning=correction.note;
    for(const view of record.variants||[]){
      if(view._co0021_0022WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=correction.note+'\n\n'+view.prompt;
      view._co0021_0022WarningApplied=true;
    }
    return record;
  };
})();
