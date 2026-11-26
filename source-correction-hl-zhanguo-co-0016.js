/* Display-only correction for a frozen draft with mixed period/place claims. */
(()=>{
  const id='HL-ZHANGUO-CO-0016';
  const note='史料核对：冻结初稿把战国铸铜工匠置于“晋国新田”，年代与地点混配，且来源栏仍为待考证。河南博物院记述战国韩国大吴楼铸铜遗址的熔铜炉、陶范与铜渣；画面仅是依据战国铸铜生产的影视概念推证，衣饰、人物及作坊组合不等于出土复原。';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!==id)return record;
    record.title='战国铸铜工匠（概念推证；原初稿年代混配）';
    record.anchor=note;
    record.brief=note;
    record.src='河南博物院《郑韩故城韩文化考古的主要收获》：战国韩国大吴楼铸铜遗址见熔铜炉、陶范与铜渣。https://www.chnmus.net/ch/scientific/achievement/academic_papers/details.html?id=615165302596493152';
    record.review_status='原文来源纠错：具体工匠造型与器具组合为概念推证';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._co0016WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._co0016WarningApplied=true;
    }
    return record;
  };
})();
