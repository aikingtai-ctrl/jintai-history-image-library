/* Display-only Yinxu source qualification. Frozen shards, PNG and WebP are untouched. */
(()=>{
  const note='史料核对：联合国教科文组织殷墟资料支持晚商宫殿宗庙区的夯土房基、木构遗迹、宗庙与祭坛；大英博物馆的商代青铜器资料支持以食酒礼器祭祖。画中的茅草屋顶、建筑高度、祭仪动作与列位、人物服饰、礼器组合及机位光线均为影视复原，并非某次祭祀的考古现场记录。冻稿所引《尚书》《礼记》不能直接证实这些具体视觉细节。';
  const source='联合国教科文组织殷墟世界遗产资料：https://whc.unesco.org/en/list/1114/；大英博物馆《中国艺术教师指南》青铜器章：https://www.britishmuseum.org/sites/default/files/2019-10/Chinese-Art-Teachers-guide.pdf；大英博物馆 Room 68 藏品指南（晚商簋与祭祖用途）：https://www.britishmuseum.org/sites/default/files/2021-05/Money_Gallery_LPG_2020_Room_68.pdf';
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    if(!record||record.id!=='HL-SHANG-SC-0001')return record;
    record.title='商代殷墟宗庙祭祀（影视复原）';
    record.anchor=note;
    record.brief=note;
    record.src=source;
    record.level='C（遗址与礼器有据；场景细部推拟）';
    record.review_status='考古依据与影视复原范围已标明';
    record.qualification='夯土木构宗庙区及青铜礼器可证；本图屋顶、服饰、仪式和排位为影视复原';
    record._sourceWarning=note;
    for(const view of record.variants||[]){
      if(view._shangSc0001WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=note+'\n\n'+view.prompt;
      view._shangSc0001WarningApplied=true;
    }
    return record;
  };
})();
