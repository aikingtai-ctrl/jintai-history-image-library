/* Display corrections for 29 pending GPT Image items. Frozen prompts and shards remain evidence. */
(()=>{
  const corrections=Object.create(null);
  function add(id,title,note,sourceUrls){
    corrections[id]={action:'metadata_hold',title,note,sourceUrls};
  }

  const sanxingdui='https://www.sckg.com/dynamics/2898.html';
  const sanxingduiReport='https://www.sckg.com/uploads/soft/20240924/2-240924145943M8.pdf';
  add('HT-N20261104-G008',
      '三星堆铜顶尊跪坐人像（八号坑题名与拼对器号待核）',
      '史实待校正：原题将器物定为八号坑独立铜顶尊跪坐人像。相关构件存在跨坑拼对，需对照发掘器号核定与三号坑条目的关系；旧图与冻结提示词不能作为器物形制证据。',
      [sanxingduiReport,sanxingdui]);
  add('HT-N20261104-G009',
      '三星堆三号坑铜顶尊跪坐人像（拼对器号待核）',
      '史实待校正：原题“顶觚形尊”及其与八号坑条目的独立性待核。应先逐一核对三、八、二号坑出土构件和拼对器号，再确定器形与是否重复；旧图仅为存档预览。',
      [sanxingduiReport,sanxingdui]);
  add('HT-N20261106-G005',
      '三星堆一号青铜神树（金沙太阳神鸟金饰另属金沙遗址）',
      '史实待校正：原题把三星堆青铜神树与金沙遗址出土的太阳神鸟金饰并作三星堆馆藏，出土地与器物归属混淆。两件文物须分开考证；旧图仅为存档预览。',
      ['https://www.sxd.cn/relics/','https://www.jinshasitemuseum.com/info/4256']);
  add('HT-N20261108-G005',
      '三星堆跨坑拼合青铜神坛（研究性复原）',
      '史实待校正：原题称青铜神坛整体出土于三号坑。现有展陈涉及多个祭祀坑构件的跨坑拼合，层次、器号与复原范围须据发掘资料复核；旧图不是实物原貌。',
      [sanxingdui,sanxingduiReport]);

  const yanshi='https://www.ecsponline.com/yz/B62FF98C046A14E21BC352866B118A736000.pdf';
  const yanshiBase='偃师商城宫城一号基址（东厨解释）';
  const yanshiSuffix=['','·新建落成态','·岁月苍古态','·营造木作态','·殿堂内景态','·春晓烟雨态','·盛夏林荫态','·金秋霜林态','·瑞雪霁月态','·盛典仪仗态','·月夜灯火态'];
  for(let i=0;i<yanshiSuffix.length;i++){
    add(`AR-20261020-${String(45+i).padStart(4,'0')}`,
        yanshiBase+yanshiSuffix[i],
        '史实待校正：考古研究将一号基址解释为宫城附属东厨，原题“宫殿四合院与石砌排水渠”不能直接归于该基址。屋顶、室内陈设及季节仪仗场景均属待证复原；旧图仅为存档预览。',
        [yanshi]);
  }

  const zhengzhou='https://ytsc.rootinhenan.gov.cn/sitesources/ytsc/page_pc/hnly/fjms/article19a0ee466c5c4b03911887c824ace1cd.html';
  const zhengzhouBase='郑州商城内城大型夯土建筑基址（原题 C8G1 编号待核）';
  const zhengzhouSuffix=['','·新建落成态','·岁月苍古态','·营造木作态','·殿堂内景态','·春晓烟雨态','·盛夏林荫态','·金秋霜林态'];
  for(let i=0;i<zhengzhouSuffix.length;i++){
    add(`AR-20261020-${String(56+i).padStart(4,'0')}`,
        zhengzhouBase+zhengzhouSuffix[i],
        '史实待校正：原题“C8G1”与正文所述逾六十米、双排柱槽的大型基址编号未核实；公开资料论及十五号建筑及“四阿重屋”复原，但不能据此直接断言 C8G1 与 C8F15/C8G15 同号。斗拱、瓦脊与室内陈设亦须另证；旧图仅为存档预览。',
        [zhengzhou]);
  }

  const yinBenji='https://zh.wikisource.org/zh-hant/%E5%8F%B2%E8%A8%98/%E5%8D%B7003';
  const zuYiMuseum='https://www.dpm.org.cn/lemmas/241084.html';
  for(const [id,title] of [
    ['JT-HF-XIANQIN-EMP-12004','祖乙·商朝（迁都地望与世系待核）'],
    ['JT-HF-XIANQIN-EMP-15001','祖乙（另一条目）·商朝（迁都地望与世系待核）']
  ]){
    add(id,title,
        '史实待校正：冻结提示词将祖乙迁都于耿及亲属世系写成定论；传世文献有迁邢、迁耿等不同记载，卜辞世系研究亦须另核。旧 JPEG 宫阙造型仅为存档预览，不能用作商代参考。',
        [yinBenji,zuYiMuseum]);
  }
  add('JT-HF-XIANQIN-EMP-14015','雍己·商朝（冻结提示词私名待核）',
      '史实待校正：冻结提示词将雍己写作“名密”，与太戊私名混淆；应先校订私名与甲骨世系。旧 JPEG 仅为存档预览。',
      [yinBenji,'https://www11.ihp.sinica.edu.tw/storage/w2_file/4799kWFdPGv.pdf']);
  for(const [id,title] of [
    ['JT-HF-XIANQIN-EMP-15008','小辛（另一条目）·商朝（在位评价待核）'],
    ['JT-HF-XIANQIN-EMP-17002','商王小辛·商朝（在位评价待核）']
  ]){
    add(id,title,
        '史实待校正：冻结提示词称小辛在位时承平或盛世；《史记·殷本纪》记“殷复衰”，不应把太平朝会当作可证场景。旧 JPEG 仅为存档预览。',
        [yinBenji]);
  }
  add('JT-HF-XIANQIN-EMP-15012','祖甲（另一条目）·商朝（史传评价分歧待核）',
      '史实待校正：冻结提示词将祖甲的祭制改革与“盛王”评价并作定论；《史记》与卜辞研究的评价路径不同，应标明史料分歧后再生成。旧 JPEG 仅为存档预览。',
      [yinBenji,'https://www11.ihp.sinica.edu.tw/storage/w2_file/2840jzRVfUI.pdf']);

  function apply(record){
    const correction=record&&corrections[record.id];
    if(!correction)return record;
    if(!record._gpt2000FrozenTitle)record._gpt2000FrozenTitle=record.title;
    if(!record._gpt2000FrozenBrief)record._gpt2000FrozenBrief=record.brief||'';
    record.title=correction.title;
    record.brief=correction.note;
    record.correction_note=correction.note;
    record.correction_sources=correction.sourceUrls;
    record.metadata_hold=true;
    record.hold='史实待校正；GPT Image 暂缓生成';
    record.src=correction.sourceUrls.join('；');
    return record;
  }
  window.JINTAI_GPT_2000_CORRECTIONS=corrections;
  window.applyJintaiGpt2000Correction=apply;
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)previous(record);
    return apply(record);
  };
})();
