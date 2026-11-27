/* G038 display-only correction. Does not modify frozen shards, source plan or original manifest. */
(()=>{
  const id='ZG-20261028-G038';
  const title="《太平廣記》卷284〈陽羨書生〉（出《續齊諧記》；十视角）";
  const story="《陽羨書生》（《太平廣記》卷284條目名）";
  const note="史料核对：《太平廣記》卷284〈陽羨書生〉署出《續齊諧記》：陽羨許彥在綏安山遇脚痛的十七八岁书生；书生入未扩大的鹅笼，与双鹅并坐，鹅不惊；后在树下吐铜奁宴食，依次吐出首位女子、女子吐男子、男子再吐第二女子；日暮收回人物器皿，留大铜盘，铭题是许彦多年后赠张散时才被看见。今本《續齊諧記》盘宽作二尺，《太平廣記》作二尺餘；女子与书生关系亦有‘结妻／结好’异文。旧稿‘东阳许彦’、祖冲之/吴均混署、神魔本相、石亭锦席、仙宫冥司、室内斗法、舟车阵法与金玉酒具并非所核原文明文。书生与笼的异象属传世志怪叙事；服饰、景物、笼材及器形为影视复原，不作实物考古结论。";
  const source="《太平廣記》卷284〈陽羨書生〉（出《續齊諧記》）：https://zh.wikisource.org/zh-hant/%E5%A4%AA%E5%B9%B3%E5%BB%A3%E8%A8%98/%E5%8D%B7%E7%AC%AC284；今本《續齊諧記》〈永平銅盤〉：https://zh.wikisource.org/zh-hans/%E7%BA%8C%E9%BD%8A%E8%AB%A7%E8%A8%98";
  const anchor="【角色】陽羨許彥；綏安山路侧脚痛的十七八岁无名书生；书生、首位女子及年轻男子依次吐出的三位人形宾客；两只不惊的鹅。【场景】山路初遇；书生入未扩大的鹅笼，与双鹅并坐；树下铜奁宴食、书生醉眠、层层邀人；日暮留盘辞别。【道具】鹅笼与双鹅、铜奁及铜器、后来留下的大铜盘；笼材、餐具造型和可读铭文字形均未载明。";
  const labels=["01_許彥與腳痛書生初遇（服饰为影视复原）","02_首位女子人物像（非精怪本相）","03_书生欲入小鹅笼（画面停在入笼前）","04_十七八岁书生神态（冠服为影视复原）","05_绥安山行与树下歇息","06_树下铜奁现宴（非仙宫幻境）","07_书生醉眠后女子邀男子共席","08_双鹅笼特写（材质形制为影视复原）","09_临别铜盘（永平三年铭题后被辨认）","10_日暮树下赠盘辞别（无舟车阵法）"];
  const subtypes={"373":"入笼互动","374":"书生神态","375":"山路树荫","376":"铜奁成宴","377":"树下宴席","378":"双鹅笼","379":"赠盘与铭题","380":"日暮辞别"};
  const replacements={"stories":{"《阳羡书生鹅笼奇幻》":"《陽羨書生》（《太平廣記》卷284條目名）"},"characters":{"阳羡豪爽行旅许彦（背负竹鹅笼）与善幻术的阳羡书生（年十七八、卧于鹅笼中）":"陽羨許彥与十七八岁脚痛书生；鹅笼材质、衣冠及相貌为影视复原","书生口中依次吐出的绝色丽人、外遇少年才子及少年口中再吐出的妙龄女郎":"首位十五六岁丽服女子、二十三四岁男子及二十许第二女子；三人均为叙事人物，不定为精怪","鹅笼中原本饲养却与书生并坐毫不惊惧的两只雪白大鹅":"与书生同坐笼中的双鹅，鹅不惊；羽色未述"},"scenes":{"阳羡山间苍松翠柏遮蔽的石盘古道与清幽树林":"绥安山行的道路与后来树下歇息；路面、树种和季候未述","月色下书生自口中层层吐出铜奁盛馔与活人男女套叠幻境的超现实空间":"树下书生吐铜奁宴食，依次出现首位女子、男子、第二女子；无另设幻境宫室","树下锦席上书生醉眠、女子吐出少年、少年再吐出小妾共饮却被书生一口吞回的戏剧现场":"树下宴席：书生醉眠；首位女子邀男子，男子再邀第二女子；随后依次收回；锦席和小妾身份未述"},"props":{"编织精巧空间不改却能容纳大活人与双鹅的阳羡竹编双鹅笼":"鹅笼与双鹅：笼不更广、书生不更小；竹编材质未述","书生最后吐出赠予许彦、刻有汉永平三年铭文的二尺宽青铜大盘与金玉酒具":"临别留下大铜盘，约二尺／二尺余广；多年后张散读铭为永平三年；其余宴饮器皿为铜，未述金玉"}};
  const prompts={"ZG-20261028-0371":"Use case: historical-scene. ID ZG-20261028-0371. Output exactly one 4:5 vertical image. A full-length cinematic character scene from the Yangxian goose-cage tale transmitted in Xu Qixie Ji: Xu Yan, an adult traveler, carries a plain woven cage with exactly two calm geese while meeting an unnamed scholar aged about seventeen or eighteen who is resting beside a mountain path and says his foot hurts. They are both ordinary human scale at this first meeting; the strange act of fitting inside the unchanged cage has not yet occurred. Show the cage clearly, both geese visible, and the two characters in a natural grounded interaction. The source gives a journey in Suian mountain and the young man's request, but no exact clothing, pavilion, fancy patterned travel rug, or commemorative bronze basin at this moment. Period-plausible Southern Dynasties film costume, subdued woodland daylight, tactile bamboo and cloth, believable anatomy, no animal fusion, no tiny man, no oversized magic cage, no text or caption. This is a film reconstruction of a transmitted literary episode, not a documented portrait.","ZG-20261028-0372":"Use case: historical-scene. ID ZG-20261028-0372. Output exactly one 4:5 vertical image. A nonsexual cinematic character portrait of the first young woman who appears at the tree-side meal in the Yangxian goose-cage tale of Xu Qixie Ji. She has just been summoned by the teenage scholar and stands in ordinary human scale beside a low meal setting, looking composed but aware of the uncanny situation. A softly blurred glimpse of Xu Yan and the scholar behind her can establish the story; the woman is the sole focus. The transmitted text calls her a young woman in fine clothing but does not identify her as a ghost, deity, monster, or a transformed beast. Treat dress and tree-side props as restrained film reconstruction. Human anatomy, fine cloth texture, muted daylight, no magical aura, no monstrous true form, no erotic pose, no body horror, no bronze gift basin from the ending, no readable text or caption.","ZG-20261028-0373":"Use case: historical-scene. ID ZG-20261028-0373. Output exactly one 16:9 horizontal image. The impossible goose-cage scene from the Yangxian tale: Xu Yan stands with one hand holding the carrying handle of his ORDINARY SMALL GOOSE CAGE, no taller than his knee and no wider than his torso; two adult geese are inside. A young scholar of about seventeen or eighteen stands beside it, bending toward its small open door as if he is about to enter without shrinking. Stop the action at the threshold so the cage remains unmistakably portable and unchanged, and the young man remains full human size; Xu Yan is startled by the request. This is a restrained film interpretation of the literary paradox on a wooded Suian mountain path. Keep cage structure practical, exact two geese, believable bodies and hands, no enormous walk-in cage, no tiny human, no third goose, no banquet or bronze plate, no text or caption.","ZG-20261028-0374":"Use case: historical-scene. ID ZG-20261028-0374. Output exactly one 4:5 vertical image. A quiet close character portrait of the unnamed scholar, approximately seventeen or eighteen, from the Yangxian goose-cage story. He rests beside a Suian mountain path and says his foot hurts; his expression is composed and ambiguous, as if his extraordinary request is perfectly ordinary. Keep his body fully human and untransformed. A soft out-of-focus suggestion of Xu Yan and a cage with two geese may sit behind him, but the young scholar is the only sharp subject. The source gives his age and sore foot, not a face, rank, cap, jewelry, or precise garment. Use plausible Eastern Jin film costume only as interpretation, natural path-side daylight, fine human skin and cloth detail. No ghost, deity, monster, glowing eyes, embroidered ceremonial crown, bronze plate from the end, readable text, or caption.","ZG-20261028-0375":"Use case: historical-scene. ID ZG-20261028-0375. Output exactly one 16:9 wide image. A landscape establishing shot of the route through Suian mountain in the Yangxian goose-cage tale. Xu Yan travels carrying a plain cage containing two geese; farther along he pauses under a tree, the place where the young scholar will later emerge and offer a meal. Keep the people small within a believable wooded mountain path so the real textual setting, path and tree, defines the frame. The source does not specify a city, bridge, pavilion, stone-paved road, season, weather, tree species, or exact geography; scenery and restrained Eastern Jin clothing are film reconstruction. Gentle daylight and tactile earth and leaves, natural cinematic scale, no banquet yet, no bronze gift plate, no boats, court, palace, supernatural realm, readable text, or caption.","ZG-20261028-0376":"Use case: historical-scene. ID ZG-20261028-0376. Output exactly one 16:9 wide image. Beneath a tree after leaving the unchanged goose cage, the young scholar offers Xu Yan a modest meal, then produces a small copper food casket from his mouth; its contents become an unexpectedly rich spread served in copper vessels. Capture the moment just after the casket appears: the scholar holds or sets it down, Xu Yan regards it in astonishment, two geese remain safely in their nearby plain cage. The transmitted Xu Qixie Ji episode locates this marvel under a tree, not in a fairy palace, dragon court, cave, or underworld. Let the uncanny quality come from the impossible source of the meal and their reactions, with no body horror. Naturalistic Eastern Jin film reconstruction, understated daylight, copper surfaces without invented gold or jade, clear human anatomy, no women or later farewell plate yet, no floating cage, magic symbols, readable text, or caption.","ZG-20261028-0377":"Use case: historical-scene. ID ZG-20261028-0377. Output exactly one 16:9 wide image. Under a tree by the Suian mountain path, the teenage scholar is asleep after the meal. The first young woman, fully clothed in restrained early fifth-century cross-collar dress, sits slightly apart; the young man she has summoned quietly speaks with Xu Yan. Four distinct people total: sleeping scholar, young woman, summoned young man, and adult traveler Xu Yan. Show a few simple copper serving vessels and human-sized goose cage with exactly two geese at the edge. The encounter is literary magic, but everyone remains ordinary human in appearance. Naturalistic film reconstruction, muted colors, modest fabrics, no ornate Tang palace robes or gold headdresses, no erotic pose, no second summoned woman yet, no weapon, no magic glow, no readable text or caption.","ZG-20261028-0378":"Use case: historical-scene. ID ZG-20261028-0378. Output exactly one 1:1 square image. A grounded close prop study of Xu Yan's ordinary travel cage on the earth beside the Suian mountain path, containing exactly two calm geese just before the young scholar enters. Show the whole cage with a practical carrying handle and a simple woven structure, enough to establish why the later entry is impossible. The text names a goose cage and two geese but does not specify the weaving material, exact shape, color of the birds, decoration, or mystical mechanism; these prop details are film reconstruction. Natural daylight, finely observed feathers and wear, human-scale prop photography. No giant magical cage, miniature figures, talismans, bronze plate, brocade display table, glow, readable text, or caption.","ZG-20261028-0379":"Use case: historical-scene. ID ZG-20261028-0379. Output exactly one 1:1 square image. A close cinematic study of the broad copper plate left by the young scholar as a parting gift to Xu Yan in the Yangxian goose-cage tale. The transmitted accounts say it was about two chi across, or a little more in the Taiping Guangji variant; only later, when Xu Yan presented it to Zhang San, was an inscription read as made in the third year of Yongping. Show an ordinary broad bronze or copper dish with restrained age and use, optionally in Xu Yan's hands under the tree, not an invented ritual weapon or magical disk. The exact casting pattern, lettering and bronze alloy are not documented here, so keep any marks indistinct and unreadable. Single prop focus, nuanced metal texture, no gold or jade cups, inscribed legible modern characters, palace altar, treasure glow, readable text, or caption.","ZG-20261028-0380":"Use case: historical-scene. ID ZG-20261028-0380. Output exactly one 16:9 wide image. A concluding wide shot under a tree along the Suian mountain path as daylight wanes. The young scholar has put away the remarkable meal and is taking leave; Xu Yan holds the broad copper plate left in remembrance, while his practical travel cage with exactly two geese sits nearby. Emphasize the quiet farewell and the contrast between an ordinary path and the uncanny events just witnessed. The transmitted story says the day was late and describes a tree-side parting, but gives no stone pavilion, cart, boat, array, building, road engineering, tree species, or exact landscape. Treat clothing, light and foliage as Eastern Jin period film reconstruction rather than verified architecture. No floating cage, supernatural palace, extra people, gold or jade banquet vessels, readable text, or caption."};
  window.JINTAI_G038_PROMPTS=prompts;
  window.JINTAI_G038_NOTE=note;
  window.JINTAI_G038_CORRECT_META=function(meta){
    if(!meta)return meta;
    const group=(meta.groups||[]).find(x=>x[0]===id);
    if(group){
      group[3]='吴均·南梁（传世文本）；《太平廣記》叙事背景为东晋';
      group[5]=story;
      group[6]='陽羨許彥、十七八岁脚痛书生、三位依次出现的人形宾客与双鹅；具体容貌衣饰为影视复原';
      group[7]='绥安山路初遇、未扩大的鹅笼与双鹅并坐、树下铜奁宴饮、日暮赠盘辞别；景物形制为影视复原';
      group[8]='鹅笼、铜奁和铜器、大铜盘；笼材、铜器纹饰和铭文具体字形未述';
      group[9]='《太平廣記》卷284〈陽羨書生〉署出《續齊諧記》：陽羨許彥、綏安山、双鹅笼、树下宴、留铜盘；有二尺／二尺余等异文';
      group[10]="https://zh.wikisource.org/zh-hant/%E5%A4%AA%E5%B9%B3%E5%BB%A3%E8%A8%98/%E5%8D%B7%E7%AC%AC284";
    }
    const book=(meta.books||[]).find(x=>x.book_no===6);
    if(book)for(const key of ['stories','characters','scenes','props']){
      if(Array.isArray(book[key]))book[key]=book[key].map(value=>replacements[key][value]||value);
    }
    return meta;
  };
  window.JINTAI_G038_CORRECT_ITEM=function(item,row){
    const n=Number(row&&row[0]);
    if(n<371||n>380||!item||item.gid!==id)return item;
    const ident='ZG-20261028-'+String(n).padStart(4,'0');
    item.author_era='吴均·南梁（传世文本）；叙事背景为东晋';
    item.story=story;
    item.characters='陽羨許彥、脚痛书生、先后出现的三位人形宾客与双鹅；具体衣饰为影视复原';
    item.scenes='绥安山行、鹅笼双鹅、树下宴饮、日暮赠盘；无另设仙宫与斗法';
    item.props='鹅笼、铜奁与铜器、大铜盘；材料纹饰未述';
    item.basis='《太平廣記》卷284〈陽羨書生〉，署出《續齊諧記》；今本有异文';
    item.url="https://zh.wikisource.org/zh-hant/%E5%A4%AA%E5%B9%B3%E5%BB%A3%E8%A8%98/%E5%8D%B7%E7%AC%AC284";
    item.sub_type=subtypes[n]||item.sub_type;
    item.label=labels[n-371];
    item.title=story+' · '+item.label;
    item.frozen_prompt=row[8];
    item.prompt=prompts[ident];
    item.source_note=note;
    return item;
  };
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)record=previous(record)||record;
    if(!record||record.id!==id)return record;
    record.title=title;
    record.story=story;
    record.hold='《續齊諧記》（吴均·南梁传本）';
    record.era='故事叙事背景为东晋；文本归吴均·南梁';
    record.anchor=anchor;
    record.brief=anchor;
    record.src=source;
    record.review_status='《太平廣記》卷284与今本《續齊諧記》逐句核对；异文及影视复原已标';
    record.qualification='傳世志怪文學；人名地名、双鹅笼、树下宴与留盘可回指；造型/器形非考古证据';
    record._sourceWarning=note;
    for(let i=0;i<(record.variants||[]).length&&i<10;i++){
      const view=record.variants[i];
      if(view._g038Corrected)continue;
      const ident='ZG-20261028-'+String(371+i).padStart(4,'0');
      view._frozenPrompt=view.prompt;
      view.prompt=note+'\n\n'+prompts[ident];
      view.ref=source;
      view.label='Z'+String(i+1).padStart(2,'0')+'·'+labels[i];
      view._g038Corrected=true;
    }
    return record;
  };
})();
