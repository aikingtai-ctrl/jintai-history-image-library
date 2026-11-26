/* Display-only G035 source correction; frozen source prompts remain traceable. */
(()=>{
  const id='ZG-20261028-G035';
  const title='《幽明录》《甄冲拒社公婚聘（拟题）》（角色/场景/道具十态全套）';
  const note='史料核对：《幽明录》卷五记甄冲字叔让、中山人、为云社令，自称年老且已有妻与成年子；社郎与社公在两岸以车马仪仗、四望车和锦步障求婚，甄冲拔刀横膝拒婚，至天明未屈。冻结提示词中的“中山县令”、南朝官袍、青衣迎妇、亡妻假形、白猪精与斩妻均未见此段，不能当作原典复原。';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!==id)return record;
    record.title=title;
    record.story='甄冲拒社公婚聘（拟题）';
    record.anchor='甄冲为云社令，已老有室家，拒社公女婚聘；社公车马仪仗至两岸，甄冲横刀于膝拒命。';
    record.brief=record.anchor;
    record.src='《幽明录》卷五甄冲段：社郎传婚聘、社公携女郎仪仗求婚、甄冲拔刀横膝而拒。https://zh.wikisource.org/zh-hant/幽明錄';
    record.review_status='原文核对更正：身份、拒婚动作与社公女形象；白猪变形非此段';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._g035WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._g035WarningApplied=true;
    }
    return record;
  };
})();
