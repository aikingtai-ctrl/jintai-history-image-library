/* G039 display-only correction. Frozen shards and original-image manifest are unchanged. */
(()=>{
  const id='ZG-20261028-G039';
  const title="《幽明录》〈武昌望夫石〉（拟题；《初学记》卷五引；十视角）";
  const story="武昌望夫石（拟题）";
  const note="史料核对：唐《初学记》卷五〈石第九·事对·化女 望夫〉明确引刘义庆《幽明录》：武昌北山有状若人立的望夫石；传说一位妇人的丈夫从役远赴国难，她携弱子在山上饯送，立望夫而化为石。这里的‘望夫石’为引文中的称谓，展示条目题名为拟题；故事没有给出具体纪年、妇儿相貌、丈夫的交通工具或岩石地貌。冻结旧稿误署《续齐谐记》及祖冲之／吴均；所核今本《续齐谐记》无此条。酒壶陶杯、红罗帕、军旅楼船、长亭、盘山石阶、祭拜香炉果盘、符信、江崖、神光、仙宫、具体衣饰与造型，均非该引文明文，只能作影视生产设计，不能标成原典道具或实景。";
  const source="唐《初学记》卷五〈石第九·事对·化女 望夫〉引刘义庆《幽明录》：https://zh.wikisource.org/zh-hans/%E5%88%9D%E5%AD%B8%E8%A8%98/%E5%8D%B7%E7%AC%AC%E4%BA%94；对照今本《续齐谐记》（无此条）：https://zh.wikisource.org/zh-hans/%E7%BA%8C%E9%BD%8A%E8%AB%A7%E8%A8%98";
  const anchor="【引文可证】武昌北山、人形立石、妇人、弱子、丈夫从役远赴国难、山上饯送与立望夫化石。【影视推拟】妇儿容貌与衣饰、山形和天气，以及酒帕、楼船、长亭、香炉、石阶等道具建筑；原文没有这些细节。";
  const labels=["01_妇人与幼子在北山望夫（服饰影视复原）","02_状若人立的望夫石（无神魔本相记载）","03_携弱子山上饯送（丈夫形象为推拟）","04_妇人远望神态（具体容貌未述）","05_武昌北山远景（具体地貌未述）","06_化石叙事转场（无仙宫洞府记载）","07_山上饯送现场（无长亭设酒记载）","08_望夫石肌理概念（无酒壶红帕原典道具）","09_后世祭物概念（香炉果盘非引文明文）","10_山路远景概念（楼船石阶非引文明文）"];
  const subtypes={"382":"人形立石","383":"母子饯送","384":"妇人神态","385":"北山地貌推拟","386":"化石转场","387":"山上饯送","388":"岩石概念","389":"祭物影视概念","390":"山路影视概念"};
  const prompts={"ZG-20261028-0381":"Use case: historical-fantasy-character. ID ZG-20261028-0381. One 4:5 vertical full-body portrait for a South Dynasties tale attributed in the extant citation to Liu Yiqing's Youming lu, not to Xu Qixie ji. A young adult woman from a modest household stands with her small child on a wind-swept hillside, turned toward the long distance where her husband has departed for state service. Quiet, determined, grief held in the posture rather than melodrama. Simple muted blue-gray cross-collar upper garment, long plain skirt, modest hair arrangement; costume is film design, exact dress unknown from the short tale. Full head, hem and shoes visible, natural child proportion, rocky hill and distant river valley softly receding, overcast daylight, grounded Chinese historical fantasy film still. The original story mentions woman, weak child, hill, departure and petrification, but no wine vessel, red scarf, pavilion or ship. No text, captions, glow, stylized goddess, later imperial palace, modern objects, collage or border.","ZG-20261028-0382":"Use case: historical-fantasy-environmental-character. ID ZG-20261028-0382. Generate exactly one 4:5 vertical image of the Wuchang North Hill husband-waiting stone from the old tale cited by Chuxueji as Liu Yiqing's Youming lu. A weathered natural gray rock spire stands alone on a grassy rocky ridge; its silhouette subtly resembles a standing woman looking toward the distant valley, without sculpted face, dress, arms or human anatomy. Wind, lichen, rain streaks and overcast light convey time and longing. Grounded landscape film still, tactile stone and realistic human-sized scale; no person, child-shaped stone, shrine, offerings, miracle light, floating stone, captions, diagrams, borders or collage. The tale says only that the stone resembles a standing human; this particular formation and landscape are production design.","ZG-20261028-0383":"Use case: historical-fantasy-scene. ID ZG-20261028-0383. Create one 16:9 horizontal image of the husband-waiting-stone tale in the moment of farewell, before any supernatural transformation. Use the supplied image as the exact visual reference for the same adult woman, small child, blue-gray plain clothing and hairstyles. On a grassy Wuchang North Hill path, the woman keeps one hand on the child as she quietly watches her husband, a plainly dressed adult departing for distant state service, walking away toward the valley. His back is seen, a small travel bundle on shoulder as film-design detail, no boat or military rank asserted by the surviving text. Three human figures only, restrained grief, clear spatial direction, windy overcast daylight, realistic South Dynasties-inspired production design. The primary tale records a wife carrying a weak child to send off her husband at the hill and waiting until she becomes stone; exact dress, path, bag and geography are reconstruction. No stone woman simultaneously beside her, crowd, pavilion, wine cups, red scarf, shrine, supernatural glow, captions or collage.","ZG-20261028-0384":"Use case: historical-fantasy-character-detail. ID ZG-20261028-0384. One 4:5 vertical waist-up cinematic portrait of the same young woman in the supplied image from the husband-waiting-stone tale. Preserve her face, black hair tied with a plain pin, muted blue-gray cross-collar garment and restrained expression. On the hill in cool overcast wind, she looks into the distance with tired resolve; the small child's hand is visible holding her sleeve at the lower edge, giving the relationship without another full face. Show natural skin, stitching and wind-touched hair, shallow depth of field, no elaborate head ornament, heroic crown, tears painted on, stone transformation yet, invented text, captions, borders or collage. The old tale gives a faithful wife and weak child; this face and clothing are production design.","ZG-20261028-0385":"Use case: historical-fantasy-environment. ID ZG-20261028-0385. Exactly one 16:9 horizontal wide establishing view for the Wuchang North Hill husband-waiting-stone tale. Use the reference only for the same mother and small child in muted blue-gray plain South Dynasties-inspired clothing; they should be tiny but recognizable figures on a solitary modest grass-and-rock ridge, looking toward the far horizon. A narrow path descends into a distant misty river valley under gray daylight. Spatially coherent terrain and subtle atmosphere, grounded live-action film still. This is the moment before the mother turns to stone: do not depict any standing human-shaped rock or statue in this image. No large cliff, invented city, pavilion, monumental shrine, soldiers, boat, fantasy light, inscriptions, captions, diagrams, border or collage. The old text mentions a North Hill; exact topography and river vista are scenic production design.","ZG-20261028-0386":"Use case: historical-fantasy-transformation. ID ZG-20261028-0386. Create exactly one 16:9 horizontal cinematic frame of the single supernatural moment in the Wuchang husband-waiting-stone tale. Use reference 1 for the same woman, small child and muted blue-gray clothing; use reference 2 for the final rough, woman-shaped rock silhouette and rainy hillside. On the ridge under gray rain, the woman who has been looking toward the far distance is becoming rough gray stone from her feet and lower skirt upward, in one continuous body; her upper face and one arm remain human for this moment. Her child steps back beside her, startled but unharmed. No duplicate fully human woman and no separate finished statue in the same frame. Transformation is quiet and tactile, with rain, wind and stone texture, no bright magic beams, golden aura, giant cliff, shrine, captions, diagram, border or collage. The old text gives transformation into standing stone; the visible intermediate phase is film interpretation.","ZG-20261028-0387":"Use case: historical-fantasy-narrative-scene. ID ZG-20261028-0387. Generate one 16:9 horizontal cinematic scene, the hilltop farewell central to the husband-waiting-stone tale. Keep the same plain blue-gray-clad woman and small child from the supplied reference. From a rear three-quarter view near the ground, the mother kneels to steady the child on a narrow rocky path while both watch a single man disappear down the distant slope; overcast morning and wind in grass, clear emotional sightline. The mountain, path, small travel bundle and costumes are film design; the surviving text confirms only that she brought a weak child to bid her husband farewell on the hill before waiting for him. No interior hall, pavilion, ritual table, wine jug, red scarf, military boat, finished woman-shaped stone, magic effect, captions, border or collage. Natural bodies and simple material details, one coherent moment.","ZG-20261028-0388":"Use case: historical-fantasy-prop. ID ZG-20261028-0388. Output exactly one 1:1 square image. A close visual study of the human-shaped standing rock on Wuchang North Hill in the transmitted Wangfushi story, with a simple weathered surface and a silhouette only loosely resembling a person. This stone, rather than a wine pot or scarf, is the object actually named by the text. Exact geology, color, and form are film interpretation. No shrine, offerings, magical symbols, readable text, or caption.","ZG-20261028-0389":"Use case: historical-fantasy-prop. ID ZG-20261028-0389. Output exactly one 1:1 square image. A modest later memorial offering near a human-shaped standing rock, clearly presented as film design rather than an object described in the short Youming lu citation. A plain uninscribed vessel and a few wild flowers can suggest remembrance. The cited text records no incense burner, fruit plate, military letter, ritual, or shrine. Naturalistic tactile materials, no claim of an excavated artifact, no readable text or caption.","ZG-20261028-0390":"Use case: historical-fantasy-environment. ID ZG-20261028-0390. Output exactly one 16:9 wide image. A restrained film-designed view from Wuchang North Hill: a woman and her small child look along a simple mountain path toward the unseen husband who has gone to national service; a human-shaped stone is visible at a distance as a separate narrative time layer. The source gives a hill and a departure, but no boat, ship, stone staircase, terrace, cliff, exact valley, or traffic route. Plausible terrain, no supernatural architecture, no inscriptions or captions."};
  window.JINTAI_G039_PROMPTS=prompts;
  window.JINTAI_G039_PROMPT_PROVENANCE={"ZG-20261028-0381":"ZG-20261028-0381-generation-prompt.txt","ZG-20261028-0382":"ZG-20261028-0382-generation-prompt.txt","ZG-20261028-0383":"ZG-20261028-0383-generation-prompt.txt","ZG-20261028-0384":"ZG-20261028-0384-generation-prompt.txt","ZG-20261028-0385":"ZG-20261028-0385-generation-prompt-v2.txt","ZG-20261028-0386":"ZG-20261028-0386-generation-prompt.txt","ZG-20261028-0387":"ZG-20261028-0387-generation-prompt.txt","ZG-20261028-0388":"display-provisional-not-generation-record","ZG-20261028-0389":"display-provisional-not-generation-record","ZG-20261028-0390":"display-provisional-not-generation-record"};
  window.JINTAI_G039_NOTE=note;
  window.JINTAI_G039_CORRECT_META=function(meta){
    if(!meta)return meta;
    const g=(meta.groups||[]).find(x=>x[0]===id);
    if(g){
      g[2]='《幽明录》（《初学记》卷五引）';
      g[3]='刘义庆《幽明录》佚文；唐《初学记》卷五引';
      g[4]='故事纪年未述；具体衣饰为影视复原';
      g[5]=story;
      g[6]='妇人、弱子、从役远赴国难的丈夫；容貌衣饰未述';
      g[7]='武昌北山山上饯送、望夫化石；地貌与建筑未述';
      g[8]='状若人立的望夫石；酒壶、红帕、船、香炉等并非引文道具';
      g[9]='《初学记》卷五〈化女 望夫〉引刘义庆《幽明录》；旧署《续齐谐记》误';
      g[10]="https://zh.wikisource.org/zh-hans/%E5%88%9D%E5%AD%B8%E8%A8%98/%E5%8D%B7%E7%AC%AC%E4%BA%94";
    }
    return meta;
  };
  window.JINTAI_G039_CORRECT_ITEM=function(item,row){
    const n=Number(row&&row[0]);
    if(!item||item.gid!==id||n<381||n>390)return item;
    const ident='ZG-20261028-'+String(n).padStart(4,'0');
    item.book='《幽明录》（《初学记》卷五引）';
    item.author_era='刘义庆《幽明录》佚文；唐《初学记》卷五引';
    item.era='故事纪年未述；具体衣饰为影视复原';
    item.story=story;
    item.characters='妇人、弱子、远赴国难的从役丈夫；容貌衣饰未述';
    item.scenes='武昌北山饯送与望夫化石；江崖、楼船、长亭、石阶皆为影视推拟';
    item.props='状若人立的望夫石；酒壶红帕、香炉果盘和符信非引文明文';
    item.basis='《初学记》卷五引刘义庆《幽明录》望夫石；旧署《续齐谐记》误';
    item.url="https://zh.wikisource.org/zh-hans/%E5%88%9D%E5%AD%B8%E8%A8%98/%E5%8D%B7%E7%AC%AC%E4%BA%94";
    item.sub_type=subtypes[n]||item.sub_type;
    item.label=labels[n-381];
    item.title='《幽明录》〈武昌望夫石〉（拟题） · '+item.label;
    item.frozen_prompt=row[8];
    item.prompt=note+'\n\n'+prompts[ident];
    item.source_note=note;
    item.prompt_provenance=window.JINTAI_G039_PROMPT_PROVENANCE[ident];
    return item;
  };
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)record=previous(record)||record;
    if(!record||record.id!==id)return record;
    record.title=title; record.story=story;
    record.hold='《幽明录》佚文（《初学记》卷五引）';
    record.era='故事纪年未述；衣饰与地貌为影视复原';
    record.anchor=anchor; record.brief=anchor; record.src=source;
    record.review_status='《初学记》卷五一手引文核对；旧署《续齐谐记》已纠正';
    record.qualification='传世志怪叙事；引文明文与影视推拟已区分';
    record._sourceWarning=note;
    for(let i=0;i<(record.variants||[]).length&&i<10;i++){
      const view=record.variants[i]; if(view._g039Corrected)continue;
      const ident='ZG-20261028-'+String(381+i).padStart(4,'0');
      view._frozenPrompt=view.prompt;
      view.prompt=note+'\n\n'+prompts[ident];
      view.ref=source;
      view.label='Z'+String(i+1).padStart(2,'0')+'·'+labels[i];
      view._g039Corrected=true;
    }
    return record;
  };
})();
