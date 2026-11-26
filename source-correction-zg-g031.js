/* Display-only correction for ZG-20261028-G031. Frozen source shards stay intact. */
(()=>{
  const id='ZG-20261028-G031';
  const title='《幽明录》《卖胡粉女／买粉复生（拟题）》（角色/场景/道具十态全套）';
  const note='史料核对：本次所核《幽明录》记载富家子日买胡粉、卖粉女子临尸恸哭、男子复生；未见白氍毹、画眉或卖粉女子施法。冻结的影视概念提示词保留，白毯、铜镜、粉铺造型等细节不可当作古籍明文。';
  const source='《幽明录》买胡粉故事：富家子日往市买粉，女子临尸抚之恸哭，男子豁然更生。https://zh.wikisource.org/zh-hant/%E5%B9%BD%E6%98%8E%E9%8C%84';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!==id)return record;
    record.title=title;
    record.story='卖胡粉女／买粉复生（拟题）';
    record.anchor='富家子日往市买胡粉；卖粉女子临尸恸哭，男子复生。服饰、粉铺及白毯为影视概念诠释。';
    record.brief=record.anchor;
    record.src=source;
    record.review_status='原文核对更正：具体影视道具与造型待证';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._g031WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._g031WarningApplied=true;
    }
    return record;
  };
})();
