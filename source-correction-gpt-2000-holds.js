/* Display corrections for 29 pending items and 111 accepted historical reconstructions. Frozen prompts remain evidence. */
(()=>{
  const corrections=Object.create(null);
  const selectedExternalSha=Object.freeze({"HL-SHANG-AC-0001":"6f16b611f5a775f4ec709c646080fd97f9deb9b7566d6a6c7086557211f1d88f","HL-SHANG-AR-0001":"75d5591735f8e2935e61bf21f8a91c19db38e13f52d8a8209adfdaf3c0ca9791","HL-SHANG-AR-0002":"284ee694c829671eb994677ae31ee0ac99afd4a8c95843921ae66c665479a22c","HL-SHANG-AR-0003":"f1a6abb9635bd050f2464815d11b460cca613bc002f908382844bbf701772b66","HL-SHANG-AR-0005":"a9298d66ac829070d716bb9df810f2d9511bb314bc4d4f5fb4d46bbd8787b440","HL-SHANG-AR-0006":"d4662b4e196b37b2177ae3eb08c509e4512ad141618c3301a6a2da23a4024f1f","HL-SHANG-AR-0007":"493f21539d53243b5da7385efacf72a22b3c3f0a3bbf0a45669a41f5cd3627b9","HL-SHANG-AR-0008":"45276d1de670510d5d6978d791c0f28d1057550e9d80af2364feb0a3e1e965af","HL-SHANG-AR-0009":"3ac87315ddf8f2eee53ddb59b2891f6afb5af3c8e5cf7db0784cbec59f381919","HL-SHANG-AR-0010":"a815b5d146fe5dab4286aa6b3661b51b6b987167c51a0b63e18e3b41941fb47c","HL-SHANG-AR-0011":"d7183ffec583e829f89c380cd5c4c45f9b879c41c779f83694266617c3253a11","HL-SHANG-AR-0012":"04a1e7de9844e5472c211b8bedeb46583391c9001b0bc062b968c81da072a972","HL-SHANG-AR-0013":"79c1c5bf2b5b8b71d76b1caf95708e734842b7b0a3ba4436b472ac1e2f93b0c4","HL-SHANG-AR-0015":"3859549ddf2cd1745792011655b30284f7af549bac9d7aae1cc047a9312b1eba","HL-SHANG-AR-0016":"a449e96fef8d81a10341d45493621ef117932a954caab741444b72c34d285e94","HL-SHANG-AR-0017":"b9b75605014a5f664501c652644ccde981746c6ca39c1d7f3a508e2ef3f5ab78","HL-SHANG-CO-0001":"5f4f21bb5ce9d94c0b11083b94a435b8df258016f3528ad50b6c320a4e9a984f","HL-SHANG-CO-0002":"40e3d5f6a2712be97f84c73d784f9dad4fe26a61857eb44d36d903c5898de0c4","HL-SHANG-CO-0003":"433df9cf99479129746cbdcfb9f8cce3c98de98f051c7348bd3ad7484d8c0014","HL-SHANG-CO-0004":"e7f5c0e7ead5a9115cac27dae72a3efba5f1976ae748b07763959925bb70820a","HL-SHANG-CO-0005":"b2a48bf311a5747b16d0c09268830fdb4a37e4a74fd238ba6222edd2bc675b83","HL-SHANG-FA-0001":"d73b3f60365fadcb8073120d3736c389b35bfdd211d4b9288c94fac77c749f4b","HL-SHANG-LS-0001":"1eeced552eb9f971c3054ac52c4e1766c7d2a91944a3223e6fa160d9b0c55814","HL-SHANG-PR-0001":"523d07862a683a4bae8dabd386d39bd4fc203c969045288e8b9418d5df16b9dc","HL-SHANG-SC-0001":"7a7b11e4487c50008add7d9f6c8b02c4739da1d1ad7526636cbd7d7b78654b5a","HL-SHANG-SC-0002":"8506732d4bb2fb859a4bc99a79906cba2f42af9c7928f86781369a5adc471ad5","HL-SHANG-SC-0003":"0a1e98819ec98cd668b5c386c81f6a434386f5cd79f52319667b005cf1dadd93","HL-SHANG-SC-0004":"ca324625eb776dad1b08e3446cbbcef7b9b0c007df5ee6725093ebc85cb3014e","HL-SHANG-SC-0005":"0b0ac3b5138e24973e0fba1f1f27cedfbb03b40509ed68fe2d80b5e8083942e6","HL-SHANG-SC-0006":"7f88f50ff9351d6b7429be981c632c6a2213c927d56d15fd8ed555d33f60c6c1","HL-SHANG-SC-0007":"6345681971c47749f255513e1ae6c30cf7c9de573e3f94d6a2ebfa5210ad43ac","HL-SHANG-SC-0009":"145e03dbb0f49bbb0d6ea4caed90176fb22d1ae3b0021d0baf5d7f53cf9e0805","HL-SHANG-SC-0010":"33853e47692a74ef5c69b5651a07ebd97e1efb35c3385ee5ece9834e44d4d65d","HL-SHANG-SC-0011":"6813c53eae1fed7b77774f3291c8242808a8b3224e036b8a78b0606aaead72bd","HL-SHANG-SC-0013":"11ed26568c893820939d9293ebb2b31deae25fb817116fa5735a6f0c82752d8c","HL-SHANG-SC-0014":"4b127bd17a87d9dd24604554b96d37c3920dcca0a48ec07b53a089b76bd303a0","HL-SHANG-SC-0015":"9ccf834908dbf7c98550b73e52208916fee91ff33a65fb324e5e4ee3ef46c090","HL-SHANG-SC-0016":"e08d3f5d06f04c89af11fabd37fa1891a16e4ff518cd14a232d8e5bcb911e526","HL-SHANG-SC-0017":"cfb17fbec3222a85c008ff041daaf2294e8769932d90b0223ec75e795fdd3f5a","HL-SHANG-SC-0018":"c6baa0a5a38b34b2c7d20551b75abe7e0f0d243e0d57bbd05bb0702588fd34b9","HL-SHANG-SC-0019":"30952799d2582cd2f7a8220798dcb02c35aabff151010efb3f3e8e1ae7929656","HL-SHANG-SC-0020":"4580a94ff5fe87117b40f43ed9d0feb0e845017bd6a1447f21cdcf819cb862ba","HL-SHANG-SC-0022":"ae64c2d22fc58357a155a9ba1aaf5925952c8056c1744fa78120cd0a1827830a","HL-ZHOU-AC-0001":"1d1d5cc00286fa0b36306e4c69fb655b384f1a92f78a28406d7352000d74c9f1","HL-ZHOU-CO-0001":"74dbab65d02487a3d104800691be19bf8d6c772966c15af5b4186e2c0273c6d9","HL-ZHOU-CO-0002":"c761c9097d16a4309f7f96a0c233c4717c1a73026fde9f496e1e5a400e09d23e","HL-ZHOU-CO-0003":"d641742cc5ec8494efb6907f28b00056000f241fe884b2dd3a4a484cac64540c","HL-ZHOU-CO-0004":"3177990d8dcf672d0c49aae8b79ee7621edaa6699e39a4c59a753573e44738d2","HL-ZHOU-CO-0005":"604cfed4a48de7615261fc948a369f365e08707e69827d07e72265ae871a5354"});
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

  accepted("HL-SHANG-CO-0030", "据殷墟铜胄、戈和残存皮甲作商晚期守卫想象性复原；邑门戍卒职掌、服装与皮甲完整形制未经实证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/28/", "https://museum.sinica.edu.tw/collection/7/item/11/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4752TLtTVdi.pdf", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_33281.shtml"]);
  accepted("HL-SHANG-CO-0036", "据殷墟铜胄、戈及皮甲残件作青年武士想象性复原；盾牌绘色、年龄、容貌及衣装不是确定出土组合。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/28/", "https://museum.sinica.edu.tw/collection/7/item/11/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4752TLtTVdi.pdf", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_33281.shtml"]);
  accepted("HL-SHANG-CO-0037", "据殷墟铜胄、戈及皮甲残件作老年武士想象性复原；高龄武士与盾、甲完整形制不作史实断言。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/28/", "https://museum.sinica.edu.tw/collection/7/item/11/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4752TLtTVdi.pdf", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_33281.shtml"]);
  accepted("HL-SHANG-CO-0043", "据三星堆青铜大立人像造型作青年礼仪人物想象性复原；祭司身份、青年年龄、真人面容和织物色纹未获考古确证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.jinshasitemuseum.com/seardetail/3787"]);
  accepted("HL-SHANG-CO-0044", "据三星堆青铜大立人像造型作老年礼仪人物想象性复原；祭司身份、老年年龄、真人面容和织物色纹未获考古确证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.jinshasitemuseum.com/seardetail/3787"]);

  accepted("HL-SHANG-AC-0010", "殷墟 M1004 出土青铜胄，皮甲与盾已腐朽；旧提示词所述硬立领、成排铜泡与朱绦甲面未获本条商代证据。图中器物均为依据出土类型的解释性新作，分置铜泡不等于甲领原组合。 图像为 GPT Image 原生新作，非旧 JPEG 放大，也非馆藏实拍。", ["https://museum.ihp.sinica.edu.tw/exhibitions/28/", "https://museum.ihp.sinica.edu.tw/knowledge-base/item/55/"]);
  accepted("HL-SHANG-AC-0011", "国博妇好墓骨笄证实商晚期有骨制发饰，不能由此确定九岁童子的具体发式、骨环套髻或玉耳环。图中儿童与束发是想象性重建，骨笄另置作器物对照。 图像为 GPT Image 原生新作，非旧 JPEG 放大，也非馆藏实拍。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250893.shtml", "https://www.dpm.org.cn/journal/371023.html?_list=1"]);
  accepted("HL-SHANG-AC-0013", "商晚期骨笄实物可证，但这名老者的年龄、白发、发髻与笄插法均为画面推拟，不把旧提示词中的额带、服色和精确式样当作考古事实。 图像为 GPT Image 原生新作，非旧 JPEG 放大，也非馆藏实拍。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250893.shtml", "https://www.dpm.org.cn/journal/371023.html?_list=1"]);

  accepted("HL-SHANG-CO-0008", "据殷墟田猎刻辞与弓箭遗存作晚商田猎贵族想象性复原；具体服装、容貌和佩饰未经实证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/205/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4070EtRbrJN.pdf", "https://www.chnmuseum.cn/zp/zpml/csp/202112/t20211221_253289.shtml"]);
  accepted("HL-SHANG-CO-0012", "商代音乐与舞的存在有文字和器物线索，但该舞者姿态、衣装和性别均为示意；未沿用旧图中缺证的成套羽具及汉式装束。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.sta.edu.cn/_upload/article/files/89/12/8e41e7a8474f8cf0fa386d39a188/0fea4e22-9b5c-4edf-87f5-de7f6d1c3113.pdf"]);
  accepted("HL-SHANG-CO-0013", "小臣称谓见晚商青铜铭文，人物的形貌、服装与拱手姿态为想象性复原，不对应出土肖像。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00000370", "https://www.dpm.org.cn/collection/bronze/234508.html"]);
  accepted("HL-SHANG-CO-0014", "据妇好墓青铜钺与妇好军事活动作匿名女性军事贵族示意；不是妇好肖像，服装和持钺方式未获直接证实。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml", "https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250870.shtml"]);
  accepted("HL-SHANG-CO-0017", "据晚商协田卜辞与商代石耜作农人示意；耤田礼身份、工具装柄和人物衣装不作确证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250885.shtml", "https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250883.shtml"]);

  accepted("HL-SHANG-CO-0032", "据晚商人物玉雕、玉佩和织物线索作青年贵族男子示意；完整衣装、容貌与帽履形制未经考古确证。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml"]);
  accepted("HL-SHANG-CO-0033", "据晚商人物玉雕、玉佩和织物线索作老年贵族男子示意；年龄、完整衣装与帽履形制为推拟。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml"]);
  accepted("HL-SHANG-CO-0034", "贞人称谓和龟腹甲占卜有甲骨材料；青年形貌与衣装为示意，甲面不伪造可读卜辞。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/resources/item/61/", "https://museum.sinica.edu.tw/resources/item/59/", "https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/"]);
  accepted("HL-SHANG-CO-0035", "贞人称谓和龟腹甲占卜有甲骨材料；老年形貌与衣装为示意，甲面不伪造可读卜辞。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/resources/item/61/", "https://museum.sinica.edu.tw/resources/item/59/", "https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/"]);
  accepted("HL-SHANG-CO-0039", "据殷墟贵妇玉笄、玉头饰与人物玉雕作青年贵族妇女示意；发式与衣装组合未经直接证实。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/collection/7/item/652/", "https://museum.sinica.edu.tw/collection/7/item/650/", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992"]);
  accepted("HL-SHANG-CO-0040", "据殷墟贵妇玉笄、玉头饰与人物玉雕作老年贵族妇女示意；年龄、发式与衣装组合为推拟。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/collection/7/item/652/", "https://museum.sinica.edu.tw/collection/7/item/650/", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992"]);
  accepted("HL-SHANG-CO-0045", "据殷墟田猎刻辞与弓箭遗存作青年田猎贵族示意；容貌、服装和佩饰不是确定出土组合。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/205/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4070EtRbrJN.pdf", "https://www.chnmuseum.cn/zp/zpml/csp/202112/t20211221_253289.shtml"]);
  accepted("HL-SHANG-CO-0046", "据殷墟田猎刻辞与弓箭遗存作老年田猎贵族示意；高龄猎者身份、容貌和衣装为推拟。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://museum.sinica.edu.tw/exhibitions/205/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4070EtRbrJN.pdf", "https://www.chnmuseum.cn/zp/zpml/csp/202112/t20211221_253289.shtml"]);
  accepted("HL-SHANG-CO-0052", "商代音乐与舞有文物和文字线索；老年舞人年龄、舞姿与衣装均为示意，弃用旧图缺证的成对羽具。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.sta.edu.cn/_upload/article/files/89/12/8e41e7a8474f8cf0fa386d39a188/0fea4e22-9b5c-4edf-87f5-de7f6d1c3113.pdf"]);
  accepted("HL-SHANG-CO-0053", "小臣称谓见晚商青铜铭文；青年小臣的容貌、服装与拱手姿态为想象性复原，不对应出土肖像。 旧 JPG 未作为视觉输入；本图为 GPT Image 根据文字新生成的示意，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00000370", "https://www.dpm.org.cn/collection/bronze/234508.html"]);
  accepted("HL-SHANG-CO-0054", "小臣称谓有晚商铭文证据；老年面貌、素衣与拱手姿势为解释性推拟，非出土小臣衣装。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00000370", "https://www.dpm.org.cn/collection/bronze/234508.html"]);
  accepted("HL-SHANG-CO-0055", "妇好墓与卜辞证明有女性统兵者及钺的权威意义；本青年女子并非妇好肖像，衣装与持钺姿态为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml", "https://www.dpm.org.cn/classify_detail/258152.html"]);
  accepted("HL-SHANG-CO-0056", "妇好墓与卜辞证明有女性统兵者及钺的权威意义；老年女军事贵族为示意，非妇好晚年肖像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml", "https://www.dpm.org.cn/classify_detail/258152.html"]);
  accepted("HL-SHANG-CO-0061", "甲骨与农具材料支持商代耕作；青年农人的衣装及双齿木耒形态为谨慎重建，非出土完整组合。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36653.shtml", "https://www1.ihp.sinica.edu.tw/Publications/Bulletin/123/Article/571"]);
  accepted("HL-SHANG-CO-0062", "甲骨与农具材料支持商代耕作；老年农人年龄、衣装及木耒形态为谨慎重建。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36653.shtml", "https://www1.ihp.sinica.edu.tw/Publications/Bulletin/123/Article/571"]);
  accepted("HL-SHANG-CO-0069", "商周地域考古有陶网坠等捕鱼线索；洹水青年渔人的衣装及所持渔网为示意，非殷墟定名个体。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chinamuseum.org.cn/detail.html?contentId=3106&id=13", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36571.shtml"]);
  accepted("HL-SHANG-CO-0070", "商周地域考古有陶网坠等捕鱼线索；洹水老年渔人的年龄、衣装及渔网为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chinamuseum.org.cn/detail.html?contentId=3106&id=13", "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36571.shtml"]);
  accepted("HL-SHANG-CO-0071", "晚商玉器及磨削工艺有实物和馆方说明；青年玉工的服装、工具握法及具体工序为解释性重建。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.dpm.org.cn/classify_detail/258152.html", "https://www.dpm.org.cn/lemmas/239468.html"]);

  accepted("HL-SHANG-CO-0072", "晚商玉器及磨削工艺有实物与馆方说明；老年玉工年龄、服装及工具操作姿势为解释性推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.dpm.org.cn/classify_detail/258152.html", "https://www.dpm.org.cn/lemmas/239468.html"]);
  accepted("HL-SHANG-CO-0075", "安阳及他处商代漆器残片支持红黑漆木器；青年漆工形貌、衣装、笔刷和工作姿态为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250889.shtml", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0076", "安阳及他处商代漆器残片支持红黑漆木器；老年漆工年龄、衣装、笔刷和工作姿态为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250889.shtml", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0081", "鲁北商周制盐作坊与盔形陶器有考古调查依据；青年工人服装和搬运姿态为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.whycyjy.sdu.edu.cn/__local/4/D9/5C/AD879AE60CB1EF8A30961F2DE5B_22912360_1705B3.pdf"]);
  accepted("HL-SHANG-CO-0082", "鲁北商周制盐作坊与盔形陶器有考古调查依据；老年工人年龄、服装和搬运姿态为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.whycyjy.sdu.edu.cn/__local/4/D9/5C/AD879AE60CB1EF8A30961F2DE5B_22912360_1705B3.pdf"]);
  accepted("HL-SHANG-CO-0090", "晚商玉人和织物痕可参照；贵族男子冬季多层织物与简素皮边外搭为解释性推拟，不是出土全套冬装。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml"]);
  accepted("HL-SHANG-CO-0091", "贞人与龟腹甲有甲骨材料；冬季外层和人物形貌为解释性推拟，龟甲不伪造可读卜辞。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://museum.sinica.edu.tw/resources/item/61/", "https://museum.sinica.edu.tw/resources/item/59/", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0094", "晚商玉笄、玉饰与织物痕可参照；贵族妇女冬季外搭、年龄和发式组合为解释性推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml"]);
  accepted("HL-SHANG-CO-0097", "旧 JPG 的絮棉、厚呢及整套商代冬装形制缺乏依据，不作视觉输入。唯一输入为已验收 #914 GPT Image 原生 PNG；披肩、绑腿等为艺术推拟。", ["https://museum.sinica.edu.tw/exhibitions/205/", "https://www11.ihp.sinica.edu.tw/storage/w2_file/4070EtRbrJN.pdf", "https://www.chnmuseum.cn/zp/zpml/csp/202112/t20211221_253289.shtml"]);
  accepted("HL-SHANG-CO-0101", "旧 JPG 的絮棉、厚呢及整套商代冬装形制缺乏依据，不作视觉输入。唯一输入为已验收 #915 GPT Image 原生 PNG；披肩、绑腿等为艺术推拟。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.sta.edu.cn/_upload/article/files/89/12/8e41e7a8474f8cf0fa386d39a188/0fea4e22-9b5c-4edf-87f5-de7f6d1c3113.pdf"]);
  accepted("HL-SHANG-CO-0102", "旧 JPG 的絮棉、厚呢及整套商代冬装形制缺乏依据，不作视觉输入。唯一输入为已验收 #916 GPT Image 原生 PNG；披肩、绑腿等为艺术推拟。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00000370", "https://www.dpm.org.cn/collection/bronze/234508.html"]);
  accepted("HL-SHANG-CO-0103", "旧 JPG 的絮棉、厚呢及整套商代冬装形制缺乏依据，不作视觉输入。唯一输入为已验收 #917 GPT Image 原生 PNG；披肩、绑腿等为艺术推拟。", ["https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml", "https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250870.shtml"]);
  accepted("HL-SHANG-CO-0106", "旧 JPG 的絮棉、厚呢及整套商代冬装形制缺乏依据，不作视觉输入。唯一输入为已验收 #918 GPT Image 原生 PNG；披肩、绑腿等为艺术推拟。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250885.shtml", "https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250883.shtml"]);
  accepted("HL-SHANG-CO-0110", "渔网坠有区域考古依据；本图的渔者、网具组合与冬季衣装是解释性重构。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chinamuseum.org.cn/detail.html?contentId=3106&id=13", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0111", "晚商玉器工艺有实物依据；玉工操作方式、磨石组合和冬季衣装是解释性推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.dpm.org.cn/classify_detail/258152.html", "https://www.dpm.org.cn/lemmas/239468.html", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0113", "商代漆器残片支持红漆木器；漆工、笔刷、操作姿态与冬季衣装均为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250889.shtml", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-CO-0116", "鲁北商周制盐作坊与盔形陶器有考古调查依据；工人冬季衣装和搬运姿态为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.whycyjy.sdu.edu.cn/__local/4/D9/5C/AD879AE60CB1EF8A30961F2DE5B_22912360_1705B3.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0003", "甲骨材料支持晚商贞人与占卜活动；具体五官、年龄、发式及衣装无定像，图为匿名解释性胸像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://museum.sinica.edu.tw/resources/item/125/", "https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0010", "甲骨研究支持祭祀乐舞；此年轻舞者的五官、发饰和衣装不是出土肖像或固定舞服。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www1.ihp.sinica.edu.tw/Publications/Bulletin/1081/Article/2028", "https://www11.ihp.sinica.edu.tw/storage/w2_file/3643WTGacxg.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0011", "晚商乐器与甲骨音乐材料支持鼓乐活动；此鼓师面貌和服饰均为匿名示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www1.ihp.sinica.edu.tw/storage/publishBookItem/%E7%AC%AC%E4%BA%8C%E8%BC%AF_0208%E5%AE%8B%E9%8E%AE%E8%B1%AA_%E6%91%98%E8%A6%81.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0013", "晚商玉人及纺织材料可参照人物服饰；贵族男子的五官、衣装组合不对应某个考古个体。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0014", "甲骨材料支持贞人称谓；此与 #966 有区别的中年男子胸像不是历史人物定像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://museum.sinica.edu.tw/resources/item/125/", "https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0017", "殷墟骨笄与玉饰有实物依据；该女子五官及双笄组合为解释性推拟，非妇好肖像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0020", "甲骨田猎与作册般鼋铭记载商代射猎；此男子五官及简化弓具组合为匿名示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/20191022jiagu/", "https://www.chnmuseum.cn/zp/zpml/csp/202112/t20211221_253289.shtml", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0024", "甲骨研究支持乐舞；该年轻女子五官、发笄和衣装均为解释性示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www1.ihp.sinica.edu.tw/Publications/Bulletin/1081/Article/2028", "https://www11.ihp.sinica.edu.tw/storage/w2_file/3643WTGacxg.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0025", "青铜铭文支持小臣职称；该男子五官、束发和衣领样式没有个人史料定像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00000370", "https://www.dpm.org.cn/collection/bronze/234508.html", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);

  accepted("HL-XIA-SC-0116", "旧 JPG 的华饰服装、宏大城门旗帜和祭坛伪文字未获本场考古证据，不作为视觉输入。新图依二里头夯土遗存、陶礼器及玉礼器线索作黄昏聚集示意；具体禳祓祈年仪式、人物动作和供品摆位属于艺术推拟，非遗址实拍或已证祭礼。", ["https://www.cssn.cn/lsx/lsx_kgx/202210/t20221024_5552684.shtml", "https://www.cssn.cn/kgxc/kgxc_kgxl/202304/t20230423_5624057.shtml"]);
  accepted("HL-SHANG-FA-0026", "妇好墓和钺证实女性精英军事活动；此人为匿名示意，绝非妇好定像，发饰和衣装为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32319.shtml", "https://www.dpm.org.cn/classify_detail/258152.html", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0029", "商代农业有甲骨及出土材料依据；此农人的五官、发式与衣装没有考古定像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www1.ihp.sinica.edu.tw/Publications/Bulletin/123/Article/571", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0031", "殷墟石磬与编磬有实物依据；此磬师面貌、发式与衣装为匿名示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250856.shtml", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0033", "渔网坠有区域考古依据；此洹水渔者面貌、束发和网具组合为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chinamuseum.org.cn/detail.html?contentId=3106&id=13", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0034", "晚商玉器工艺有实物依据；此玉工容貌、工装和玉坯摆放均为解释性推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www.dpm.org.cn/classify_detail/258152.html", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0036", "商代漆器残片支持髹漆工艺；此漆工容貌、工具与衣装为匿名示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250889.shtml", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0039", "鲁北商周盐业调查支持盔形陶器；此盐工容貌、服装和搬运器物姿态为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.whycyjy.sdu.edu.cn/__local/4/D9/5C/AD879AE60CB1EF8A30961F2DE5B_22912360_1705B3.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0040", "商代鼓乐有甲骨及馆藏资料依据；此鼓师五官与衣装并非出土人物像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html", "https://www1.ihp.sinica.edu.tw/storage/publishBookItem/%E7%AC%AC%E4%BA%8C%E8%BC%AF_0208%E5%AE%8B%E9%8E%AE%E8%B1%AA_%E6%91%98%E8%A6%81.pdf", "https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0044", "晚商玉人与纺织材料可参照服饰；青年贵族男子五官与衣装是解释性新作。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);
  accepted("HL-SHANG-FA-0045", "晚商玉人与纺织材料可参照服饰；老年贵族男子五官与发饰是解释性新作。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00010992", "https://www.dpm.org.cn/journal/371023.html?_list=1", "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html"]);

  accepted("HL-SHANG-FA-0088", "商代漆器残片可证髹漆工艺；这名老年工匠的容貌、衣着、工具与具体手势均为解释性新作。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www.chnmuseum.cn/zp/zpml/kgfjp/202107/t20210728_250889.shtml"]);
  accepted("HL-SHANG-FA-0093", "鲁北商周盐业遗址与盔形陶器有考古依据；青年盐工的脸、衣着和持器姿态均非出土定像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.history.sdu.edu.cn/lab/info/1023/2071.htm"]);
  accepted("HL-SHANG-FA-0094", "鲁北商周盐业遗址与盔形陶器有考古依据；老年盐工的脸、发式、衣着和持器姿态均为推拟。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://ir.pku.edu.cn/handle/20.500.11897/6557", "https://www.history.sdu.edu.cn/lab/info/1023/2071.htm"]);
  accepted("HL-SHANG-FA-0095", "殷墟甲骨文可见鼓乐资料；这名青年乐师的容貌、衣着与鼓槌为示意，并非出土人物像。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www1.ihp.sinica.edu.tw/storage/publishBookItem/%E7%AC%AC%E4%BA%8C%E8%BC%AF_0208%E5%AE%8B%E9%8E%AE%E8%B1%AA_%E6%91%98%E8%A6%81.pdf"]);
  accepted("HL-SHANG-FA-0096", "殷墟甲骨文可见鼓乐资料；这名老年乐师的容貌、发式、衣着与鼓槌为示意。 旧 JPG 未作为视觉输入；本图由 GPT Image 根据文字新生成，并非文物实拍原图。", ["https://www1.ihp.sinica.edu.tw/storage/publishBookItem/%E7%AC%AC%E4%BA%8C%E8%BC%AF_0208%E5%AE%8B%E9%8E%AE%E8%B1%AA_%E6%91%98%E8%A6%81.pdf"]);

  const acceptedTitles=Object.freeze({
    'JT-HF-XIANQIN-OFF-15021':'比干（另一条目）·商朝',
    'JT-HF-XIANQIN-OFF-16003':'微子启（帝乙长子）·商末周初',
    'JT-HF-XIANQIN-OFF-18008':'甘盘（另一条目）·商朝',
    'JT-HF-XIANQIN-OFF-20004':'伊尹（负鼎俎说汤，传世叙事）·商朝',
    'JT-HF-XIANQIN-OFF-20008':'巫贤（祖乙时期）·商朝',
    'JT-HF-XIANQIN-OFF-20010':'傅说（《说命》传世叙事）·商朝',
    'JT-HF-XIANQIN-SCH-20009':'甘盘（聚落事务场景）·商朝',
    'JT-HF-XIANQIN-SCH-22009':'箕子·商末周初（《洪范》传世叙事）',
    'HL-SHANG-AC-0006':"殷墟玉人所见发式推拟",
    "HL-SHANG-AC-0010":"商晚期铜胄与皮甲残件（甲领铜泡组合待证）",
    "HL-SHANG-AC-0011":"商代童子束发推拟与骨笄（骨环用途未证）",
    "HL-SHANG-AC-0013":"商代老者束发推拟与骨笄",
    "HL-SHANG-CO-0017":"商代农人（协田卜辞启发；耤田身份待证）",
    "HL-SHANG-CO-0061":"商代农人·青年（协田卜辞启发；耤田身份待证）",
    "HL-SHANG-CO-0062":"商代农人·老年（协田卜辞启发；耤田身份待证）",
    "HL-SHANG-CO-0106":"商代农人·冬装（协田卜辞启发；耤田身份待证）",
    "HL-XIA-SC-0116":"二里头聚落礼仪活动想象场景·黄昏",
    "HL-SHANG-FA-0026":"商代女性军事贵族·容貌示意（非妇好定像）",
    "HL-SHANG-FA-0029":"商代农人·容貌示意（耤田身份待证）",
    "HL-SHANG-FA-0031":"商代磬师·容貌示意",
    "HL-SHANG-FA-0033":"商代渔人·容貌示意",
    "HL-SHANG-FA-0034":"商代玉工·容貌示意",
    "HL-SHANG-FA-0036":"商代漆器工匠·容貌示意",
    "HL-SHANG-FA-0039":"商代鲁北煮盐工·容貌示意",
    "HL-SHANG-FA-0040":"商代鼓师·容貌示意",
    "HL-SHANG-FA-0044":"商代贵族男子服饰·青年示意",
    "HL-SHANG-FA-0045":"商代贵族男子服饰·老年示意",
    "HL-SHANG-FA-0088":"商代漆器工匠·老年容貌示意",
    "HL-SHANG-FA-0093":"商代鲁北盐工·青年容貌示意",
    "HL-SHANG-FA-0094":"商代鲁北盐工·老年容貌示意",
    "HL-SHANG-FA-0095":"商代鼓师·青年容貌示意",
    "HL-SHANG-FA-0096":"商代鼓师·老年容貌示意"
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
