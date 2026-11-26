/* Display-only G033 source correction; frozen source prompts remain traceable. */
(()=>{
  const id='ZG-20261028-G033';
  const title='《幽明录》《新鬼推磨舂谷求食（拟题）》（角色/场景/道具十态全套）';
  const note='史料核对：《太平广记》卷三百二十一引《幽明录》记新鬼形疲瘦，遇死已二十年的肥健旧友；新鬼先在奉佛人家西厢推磨、后在奉道人家门旁舂谷并由婢簸筛，均未获食。冻结提示词里的韦驮神像、青石磨自转、偷吃生面、幽冥仙境和具体衣饰器形未见所核原文，均不可作史实复原。';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!==id)return record;
    record.title=title;
    record.story='新鬼推磨舂谷求食（拟题）';
    record.anchor='新鬼遇旧友求教觅食，先推磨、后舂谷，皆只得劳作；服饰、磨碓器形和住宅陈设为影视推想。';
    record.brief=record.anchor;
    record.src='《太平广记》卷三百二十一〈新鬼〉引《幽明录》：新鬼推磨、舂谷、未获食。https://zh.wikisource.org/zh-hant/太平廣記/卷第321';
    record.review_status='原文核对更正：影视服饰、器形与幻境细节未获原典证明';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._g033WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._g033WarningApplied=true;
    }
    return record;
  };
})();
