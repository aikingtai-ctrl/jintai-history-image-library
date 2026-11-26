/* Display-only corrections for G031/G032. Frozen source shards stay intact. */
(()=>{
  const id='ZG-20261028-G031';
  const title='《幽明录》《卖胡粉女／买粉复生（拟题）》（角色/场景/道具十态全套）';
  const note='史料核对：本次所核《幽明录》记载富家子日买胡粉、卖粉女子临尸恸哭、男子复生；未见白氍毹、画眉或卖粉女子施法。冻结的影视概念提示词保留，白毯、铜镜、粉铺造型等细节不可当作古籍明文。';
  const source='《幽明录》买胡粉故事：富家子日往市买粉，女子临尸抚之恸哭，男子豁然更生。https://zh.wikisource.org/zh-hant/%E5%B9%BD%E6%98%8E%E9%8C%84';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(record?.id==='ZG-20261028-G032'){
      const note32='史料核对：《幽明录》卷二记黄原见青犬，随犬入山穴，遇太真夫人之女妙音。冻结提示词中的黑犬、白獭化形、连理白玉佩、珍珠螺钿漆盒未见所核原文，服饰与器形均属影视诠释。';
      record.title='《幽明录》《黄原与青犬入妙音宅（拟题）》（角色/场景/道具十态全套）';
      record.story='黄原与青犬入妙音宅（拟题）';
      record.anchor='黄原随青犬入山穴，遇太真夫人之女妙音，结为夫妇后解佩别离。具体造型为影视诠释。';
      record.brief=record.anchor;
      record.src='《幽明录》卷二黄原段：青犬引路，太真夫人之女妙音与黄原成婚。https://zh.wikisource.org/zh/%E5%B9%BD%E6%98%8E%E9%8C%84';
      record.review_status='原文核对更正：青犬与人物身份已厘清，具体影视道具待证';
      record._sourceWarning=note32;
      for(const view of record.variants||[]){
        if(view._g032WarningApplied)continue;
        if(typeof view.prompt==='string')view.prompt=note32+'\n\n'+view.prompt;
        view._g032WarningApplied=true;
      }
      return record;
    }
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
