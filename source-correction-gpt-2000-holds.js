/* Display corrections for 29 pending items and 38 accepted historical reconstructions. Frozen prompts remain evidence. */
(()=>{
  const corrections=Object.create(null);
  const selectedExternalSha=Object.freeze({"HL-SHANG-AC-0001":"6f16b611f5a775f4ec709c646080fd97f9deb9b7566d6a6c7086557211f1d88f","HL-SHANG-AR-0001":"75d5591735f8e2935e61bf21f8a91c19db38e13f52d8a8209adfdaf3c0ca9791","HL-SHANG-AR-0002":"284ee694c829671eb994677ae31ee0ac99afd4a8c95843921ae66c665479a22c","HL-SHANG-AR-0003":"f1a6abb9635bd050f2464815d11b460cca613bc002f908382844bbf701772b66","HL-SHANG-AR-0006":"d4662b4e196b37b2177ae3eb08c509e4512ad141618c3301a6a2da23a4024f1f","HL-SHANG-AR-0007":"493f21539d53243b5da7385efacf72a22b3c3f0a3bbf0a45669a41f5cd3627b9","HL-SHANG-AR-0008":"45276d1de670510d5d6978d791c0f28d1057550e9d80af2364feb0a3e1e965af","HL-SHANG-CO-0001":"5f4f21bb5ce9d94c0b11083b94a435b8df258016f3528ad50b6c320a4e9a984f","HL-SHANG-CO-0002":"40e3d5f6a2712be97f84c73d784f9dad4fe26a61857eb44d36d903c5898de0c4","HL-SHANG-CO-0003":"433df9cf99479129746cbdcfb9f8cce3c98de98f051c7348bd3ad7484d8c0014","HL-SHANG-CO-0004":"e7f5c0e7ead5a9115cac27dae72a3efba5f1976ae748b07763959925bb70820a","HL-SHANG-CO-0005":"b2a48bf311a5747b16d0c09268830fdb4a37e4a74fd238ba6222edd2bc675b83","HL-SHANG-FA-0001":"d73b3f60365fadcb8073120d3736c389b35bfdd211d4b9288c94fac77c749f4b","HL-SHANG-LS-0001":"1eeced552eb9f971c3054ac52c4e1766c7d2a91944a3223e6fa160d9b0c55814","HL-SHANG-PR-0001":"523d07862a683a4bae8dabd386d39bd4fc203c969045288e8b9418d5df16b9dc","HL-SHANG-SC-0001":"7a7b11e4487c50008add7d9f6c8b02c4739da1d1ad7526636cbd7d7b78654b5a","HL-ZHOU-AC-0001":"1d1d5cc00286fa0b36306e4c69fb655b384f1a92f78a28406d7352000d74c9f1","HL-ZHOU-CO-0001":"74dbab65d02487a3d104800691be19bf8d6c772966c15af5b4186e2c0273c6d9","HL-ZHOU-CO-0002":"c761c9097d16a4309f7f96a0c233c4717c1a73026fde9f496e1e5a400e09d23e","HL-ZHOU-CO-0003":"d641742cc5ec8494efb6907f28b00056000f241fe884b2dd3a4a484cac64540c","HL-ZHOU-CO-0004":"3177990d8dcf672d0c49aae8b79ee7621edaa6699e39a4c59a753573e44738d2","HL-ZHOU-CO-0005":"604cfed4a48de7615261fc948a369f365e08707e69827d07e72265ae871a5354"});
  window.JINTAI_GPT_2000_SELECTED_EXTERNAL_SHA=selectedExternalSha;
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

  const acceptedCorrections=Object.create(null);
  function accepted(id,note,sourceUrls){acceptedCorrections[id]={note,sourceUrls};}
  accepted('JT-HF-XIANQIN-EMP-15017',
      '帝乙：人物容貌与庭院为推拟；旧 JPEG 的后世冠服、舆图和白石栏杆不能当作商代图像证据。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-EMP-16001',
      '武乙：人物容貌与陶器修补场面为推拟；《史记》所载“射天”属于传世叙事，画面没有将其当作可证事件。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-GEN-13028',
      '妇好：卜辞及墓葬资料证其为武丁配偶并参与祭祀、军事活动。冻结旧提示词误写胡须、长城和铁骑；旧 JPEG 画的是女性，但军装和边塞场景有后世成分。新图为推拟。',
      ['https://capitalmuseum.org.cn/exhibition/195433359fe24960be82c5fad40cd43d','https://www.chnmus.net/sitesources/hnsbwy/page_pc/dzjp/mzyp/fhxz/list1.html']);
  accepted('JT-HF-XIANQIN-GEN-13036',
      '姜尚：按《史记·齐太公世家》作西周建立后的推拟人物场面；渭水遇文王故事发生于西周前，不沿用旧图的长城、铁骑。',
      ['https://zh.wikisource.org/zh-hans/%E5%8F%B2%E8%A8%98/%E5%8D%B7032']);
  accepted('JT-HF-XIANQIN-GEN-20011',
      '雀：卜辞资料可证其名与商王活动相关；旧提示词指定“讨土方”、强弩等细节缺少本条确证，新图只作未指定战事的推拟。',
      ['https://www1.ihp.sinica.edu.tw/Publications/Bulletin/1001/Article/1947']);
  accepted('JT-HF-XIANQIN-OFF-12006',
      '傅说：《史记·殷本纪》载武丁于傅岩得版筑者傅说并举为相；旧提示词的“托孤”、尚书省和后世官服不沿用。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-12007',
      '微子启：《史记·宋微子世家》记其在商末向太师、少师求策，周公后来封其于宋；新图表现前者，旧提示词的后世官署不沿用。',
      ['https://zh.wikisource.org/zh-hans/%E5%8F%B2%E8%A8%98%E4%B8%89%E5%AE%B6%E8%A8%BB/%E5%AE%8B%E5%BE%AE%E5%AD%90%E4%B8%96%E5%AE%B6']);
  const songShiji='https://zh.wikisource.org/wiki/%E5%8F%B2%E8%A8%98/%E5%8D%B7038';
  accepted('JT-HF-XIANQIN-EMP-16002',
      '文丁：《史记·殷本纪》在此作帝太丁；人物与陶作场面为解释性推拟，旧图的后世宫殿、冠服和舆图不是商代证据。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-EMP-17001',
      '盘庚：据《史记·殷本纪》迁徙叙事作推拟场面；旧图的后世宫阙、舆图与冠服不作为商代图像依据。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-EMP-17003',
      '小乙：史传只简述其世系，画面是未指定事件的人物推拟；旧图的后世帝王形制与未证就学故事不沿用。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-13022',
      '伊尹：据《史记·殷本纪》辅政记载作推拟；冻结提示词误将阿衡写成谥号，并混入宣纸、后世官署与服制。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-13027',
      '傅说：据《史记·殷本纪》傅险版筑而被武丁举用的传世记载，作任后独立肖像；后世官署与服制不沿用。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-13031',
      '比干：据《史记》商末劝谏记载，作谏前推拟肖像；不将“谏三日”或具体容貌画成已证事实。',
      [yinBenji,songShiji]);
  accepted('JT-HF-XIANQIN-OFF-15018',
      '微子启：据《史记·宋微子世家》作周公平武庚之乱后受命于宋的解释性场面；冻结旧提示词暗示武王直接封宋不符记载。',
      [songShiji]);
  accepted('JT-HF-XIANQIN-OFF-15021',
      '比干（另一条目）：新图借同批 GPT Image 肖像保持人物一致；旧题“商纣王少”残缺，“少师”是另一人物，具体容貌仍为推拟。',
      [yinBenji,songShiji]);
  const mengziGao='https://zh.wikisource.org/wiki/%E5%AD%9F%E5%AD%90/%E5%91%8A%E5%AD%90%E4%B8%8B';
  const junShi='https://zh.wikisource.org/wiki/%E5%B0%9A%E6%9B%B8/%E5%90%9B%E5%A5%AD';
  const shuoMing='https://zh.wikisource.org/wiki/%E5%B0%9A%E6%9B%B8/%E8%AA%AA%E5%91%BD%E4%B8%8B';
  accepted('JT-HF-XIANQIN-OFF-16003',
      '微子启：据《史记·宋微子世家》作周公平乱后在宋接见殷遗民的推拟场面；旧题“商帝乙长”残缺，已补为“帝乙长子”。',
      [yinBenji,songShiji]);
  accepted('JT-HF-XIANQIN-OFF-16007',
      '胶鬲：依《孟子·告子下》“举于鱼盐之中”作鱼盐劳作场面；旧提示词“助周克商”缺少本条可靠一手依据。',
      [mengziGao]);
  accepted('JT-HF-XIANQIN-OFF-17009',
      '甘盘：《尚书·君奭》将甘盘置于武丁时期；人物及对话为推拟，不把具体授学场面称为考古事实。',
      [junShi]);
  accepted('JT-HF-XIANQIN-OFF-18003',
      '微子启：据《史记·宋微子世家》商末向太师、少师商议去留的叙事作解释性再现，区别宋国时期的另一条目。',
      [songShiji]);
  accepted('JT-HF-XIANQIN-OFF-18008',
      '甘盘：据《尚书·君奭》作武丁时期贤臣的推拟肖像；冻结题名“名相”不是所核原文职衔。',
      [junShi]);
  accepted('JT-HF-XIANQIN-OFF-20004',
      '伊尹：据《史记·殷本纪》“负鼎俎，以滋味说汤”作传世叙事场面；旧题“以鼎俎调”残缺，人物与菜肴均为推拟。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-20005',
      '仲虺：早商议事场面为推拟；《仲虺之诰》今本篇章有伪古文争议，不把当场撰写、左相头衔及具体生卒年当作确证。',
      [yinBenji,'https://zh.wikisource.org/wiki/%E5%B0%9A%E6%9B%B8/%E4%BB%B2%E8%99%BA%E4%B9%8B%E8%AA%A5']);
  accepted('JT-HF-XIANQIN-OFF-20006',
      '巫咸：据《史记·殷本纪》作太戊时期顾问推拟肖像；冻结提示词的神医及天算医药身份缺少所核史料依据。',
      [yinBenji,junShi]);
  accepted('JT-HF-XIANQIN-OFF-20007',
      '伊陟：据《史记·殷本纪》劝太戊修德的传世叙事作推拟；桑谷异象及伊尹父子关系不作为确证。',
      [yinBenji]);
  accepted('JT-HF-XIANQIN-OFF-20008',
      '巫贤：据《尚书·君奭》作祖乙时期人物推拟；旧题“勤政抚民”及“巫咸之子”未见所核文本直接支持。',
      [junShi]);
  accepted('JT-HF-XIANQIN-OFF-20010',
      '傅说：依据武丁举用傅说与《说命》的传世叙事作工地旁劝说场面；不把当场写出三篇文书画成确证。',
      [yinBenji,shuoMing]);
  accepted('JT-HF-XIANQIN-SCH-18005',
      '箕子：据《史记·宋微子世家》商末劝谏叙事作独处抚弦的推拟场面；不沿用后世官署及未核具体生卒年。',
      [songShiji]);
  accepted('JT-HF-XIANQIN-SCH-20009',
      '甘盘：据《尚书·君奭》作聚落事务的推拟场面；“敦德修政”是旧题的概括，不作为可证具体事件。',
      [junShi]);
  accepted('JT-HF-XIANQIN-SCH-22009',
      '箕子：借同批 GPT Image 肖像保持人物一致，作武王问《洪范》的传世叙事；旧题“大儒哲人”及朝鲜教化场面不沿用。',
      [songShiji,'https://zh.wikisource.org/wiki/%E5%B0%9A%E6%9B%B8/%E6%B4%AA%E7%AF%84']);

  accepted("HL-SHANG-AC-0002", "三星堆二号祭祀坑金面罩青铜人头像的解释性器物图；局部形貌据馆藏说明推拟，非该藏品实拍复制。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.hkpm.org.hk/sc/visit/audio-guide/g8-gazing-at-sanxingdui"]);
  accepted("HL-SHANG-AC-0003", "殷墟小屯 M18 多骨笄发式的解释性重建；人物容貌、具体笄数、服装与发式细节未获考古确证。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://img.dpm.org.cn/Uploads/file/2025/08/18/1755495600IcLMtESpe218986.pdf"]);
  accepted("HL-SHANG-AC-0004", "商代玉玦器物为主体；背景单侧佩戴仅示可能用法，不断言成对佩戴、缺口朝向和身份。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.dpm.org.cn/collection/jade/233848.html"]);
  accepted("HL-SHANG-AC-0005", "商代青铜胄形制的解释性器物图；不添考古未证的青铜身甲或红缨。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.dpm.org.cn/Uploads/pdf/3717/T00011_00.pdf"]);
  accepted("HL-SHANG-AC-0006", "据殷墟妇好墓玉人 M5:372 所见发式作人物推拟，不能沿用原题“商代男子髡发”；入库前须更正页面题名及说明。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://img.dpm.org.cn/Uploads/file/2025/08/18/1755495600IcLMtESpe218986.pdf"]);
  accepted("HL-SHANG-AC-0007", "玉柄形器与玉串饰分开展示，不断言二者原为一组、胸前佩戴或特定礼仪用途。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.dpm.org.cn/classify_detail/258152.html"]);
  accepted("HL-SHANG-AC-0008", "玉鸟与玉鱼为分开陈列的器物形制推拟，不断言原为一条项链或固定组合。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202112/t20211203_252532.shtml", "https://www.dpm.org.cn/collection/jade/233823.html"]);
  accepted("HL-SHANG-AC-0009", "海贝与蚌泡分开作材质、形制对照，不绘制无据的斜挎贝带。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/hb/202202/t20220228_253674.shtml", "https://www.dpm.org.cn/lacquerwares/talk/208597.html"]);
  accepted("HL-SHANG-AC-0012", "弦纹铜镜与骨笄作现代对照陈列，不断言由同一贵族女子同时使用或同墓成组出土。 图像是 GPT Image 根据文本新生成的解释性示意，非馆藏实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202203/t20220322_254498.shtml"]);

  const acceptedTitles=Object.freeze({
    'JT-HF-XIANQIN-OFF-15021':'比干（另一条目）·商朝',
    'JT-HF-XIANQIN-OFF-16003':'微子启（帝乙长子）·商末周初',
    'JT-HF-XIANQIN-OFF-18008':'甘盘（另一条目）·商朝',
    'JT-HF-XIANQIN-OFF-20004':'伊尹（负鼎俎说汤，传世叙事）·商朝',
    'JT-HF-XIANQIN-OFF-20008':'巫贤（祖乙时期）·商朝',
    'JT-HF-XIANQIN-OFF-20010':'傅说（《说命》传世叙事）·商朝',
    'JT-HF-XIANQIN-SCH-20009':'甘盘（聚落事务场景）·商朝',
    'JT-HF-XIANQIN-SCH-22009':'箕子·商末周初（《洪范》传世叙事）',
    'HL-SHANG-AC-0006':"殷墟玉人所见发式推拟"
  });

  function apply(record){
    if(record&&acceptedTitles[record.id]){
      if(!record._gpt2000FrozenTitle)record._gpt2000FrozenTitle=record.title;
      record.title=acceptedTitles[record.id];
    }
    if(record&&record.id==='JT-HF-XIANQIN-EMP-13026'){
      if(!record._gpt2000FrozenTitle)record._gpt2000FrozenTitle=record.title;
      record.title=(record.title||'').replaceAll('谥高宗','庙号高宗');
      record.brief=(record.brief||'').replaceAll('谥高宗','庙号高宗');
      record.sub=(record.sub||'').replaceAll('谥高宗','庙号高宗');
      record.correction_note='《史记·殷本纪》记武丁崩后尊为高宗；高宗是庙号，不是谥号。';
      record.correction_sources=[yinBenji];
    }
    const acceptedCorrection=record&&acceptedCorrections[record.id];
    if(acceptedCorrection){
      if(!record._gpt2000FrozenBrief)record._gpt2000FrozenBrief=record.brief||'';
      record.brief=acceptedCorrection.note;
      record.correction_note=acceptedCorrection.note;
      record.correction_sources=acceptedCorrection.sourceUrls;
      record.src=acceptedCorrection.sourceUrls.join('；');
    }
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
