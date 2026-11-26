/* Display-only G034 source correction; frozen source prompts remain traceable. */
(()=>{
  const id='ZG-20261028-G034';
  const title='《幽明录》《钟繇遇美妇及墓中遗迹（拟题）》（角色/场景/道具十态全套）';
  const note='史料核对：《幽明录》卷二记钟繇与美妇相见，因僚友疑其为鬼而起杀意；妇人停于户外问其故，钟繇不忍仅微伤，次日循血迹至大冢，见棺中女子穿白练衫、丹绣裲襠，一髀有伤。冻结提示词里的颍川旧宅月夜、青年魏太傅、错金环首剑、玉蝉与斗法幻境未见所核原文，具体服饰建筑只可作影视推想。';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!==id)return record;
    record.title=title;
    record.story='钟繇遇美妇及墓中遗迹（拟题）';
    record.anchor='钟繇遇美妇、妇人轻伤离去，次日循血迹见墓中女子；具体居所和用器为影视推想。';
    record.brief=record.anchor;
    record.src='《幽明录》卷二钟繇段：妇人止户外、钟繇微伤之、循血迹至大冢。https://zh.wikisource.org/zh-hant/幽明錄';
    record.review_status='原文核对更正：年代身份、宅址、兵器与幻境细节未获原典证明';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._g034WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._g034WarningApplied=true;
    }
    return record;
  };
})();
