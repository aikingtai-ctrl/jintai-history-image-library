/* Display-only source qualification; frozen prompt shards and images are separate. */
(()=>{
  const note='史料核对：殷墟位于洹河两岸，宫殿宗庙区有夯土木构遗迹。画中的屋顶、台高、人物与晨光为影视推证；原稿所述北岸作坊和独木舟的确切位置并无本条材料直证。此图不是遗址原状照片。';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!=='HL-SHANG-LS-0001')return record;
    record.title='商代殷都洹水风貌（考古复原）';
    record.anchor=note;
    record.brief=note;
    record.src='联合国教科文组织殷墟遗址说明与提名材料；具体建筑外观、作坊方位和人物为影视推证。https://whc.unesco.org/en/list/1114 https://whc.unesco.org/uploads/nominations/1114.pdf';
    record.level='C（遗址布局支持；地上外观为推证）';
    record.review_status='考古依据与影视复原范围已标明';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._shangLs0001WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._shangLs0001WarningApplied=true;
    }
    return record;
  };
})();
