/* Display-only source corrections; frozen prompt shards and images remain separate. */
(()=>{
  const corrections={
    'HL-ZHANGUO-CO-0025':{
      title:'战国越地舟人（艺术推证）',
      note:'史料核对：《汉书·地理志下》记越地断发文身，《严助传》载越人便于用舟；文献没有这位船师的年龄、纹身图案、无袖葛布衣、木桨竹篙及铜箍的整套实证。此图为越地舟人影视概念，不是出土服装复原。',
      src:'《汉书·地理志下》《汉书·严助传》；具体舟人、衣装和工具为艺术推证。https://zh.wikisource.org/zh-hant/%E6%BC%A2%E6%9B%B8/%E5%8D%B7028%E4%B8%8B https://zh.wikisource.org/zh-hant/%E6%BC%A2%E6%9B%B8/%E5%8D%B7064%E4%B8%8A'
    },
    'HL-ZHANGUO-CO-0026':{
      title:'战国燕地求仙方士（艺术推证）',
      note:'史料核对：《史记·封禅书》记燕齐海上方士与求仙传说，燕下都出土陶器不能证实某位方士的药匣、陶瓶、衣冠或年龄。原稿的战国中期具体日期和整套个人造型均非一手材料所能锁定；此图只作燕地求仙者概念推证。',
      src:'《史记·封禅书》；河北省文物局燕下都遗址介绍；人物、衣冠、岸景为艺术推证。https://zh.wikisource.org/wiki/%E5%B0%81%E7%A6%85%E4%B9%A6 https://wenwu.hebei.gov.cn/system/2023/10/16/030257948.shtml'
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
    record.review_status='原文来源纠错：人物、衣装和道具细节为艺术推证';
    record._sourceWarning=correction.note;
    for(const view of record.variants||[]){
      if(view._co0025_0026WarningApplied)continue;
      if(typeof view.prompt==='string')view.prompt=correction.note+'\n\n'+view.prompt;
      view._co0025_0026WarningApplied=true;
    }
    return record;
  };
})();
