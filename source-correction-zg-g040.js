/* G040 display-only correction. Frozen source shards and original-image manifest remain unchanged. */
(()=>{
  const id='ZG-20261028-G040';
  const title="《续齐谐记》〈端午椶〉（今本；十视角）";
  const story="端午椶（今本）";
  const note="一手核对：今本《续齐谐记》〈端午椶〉记屈原五月五日投汨罗水，楚人以竹筒贮米投水祭之；数百年后的汉建武时，长沙区曲遇一位自称三闾大夫的士人，得知祭米常为蛟龙所窃，依其建议用楝叶塞竹筒、彩丝缠绕。两段时代不能画作同一时空。旧稿的“欧回”、白衣仙魂踏浪、切云冠、玉具剑、龙舟竞渡、龙鳞船队、羽觞、宫殿洞府、确定的蛟龙外貌与具体服饰均非此文所载；若出现，只能标影视推拟。楝叶与竹筒米有据，三角粽造型和具体编扎法未述。";
  const source="今本《续齐谐记》〈端午椶〉：https://zh.wikisource.org/zh-hans/%E7%BA%8C%E9%BD%8A%E8%AB%A7%E8%A8%98#端午椶";
  const labels=["01_汉建武自称三闾大夫士人全身像（容貌推拟）","02_江下蛟龙近景（外形推拟）","03_区曲与来者对谈（汉代；场所推拟）","04_来者面部近景（容貌推拟）","05_楚人竹筒米祭汨罗（早期层；岸貌推拟）","06_蛟龙窃祭米水下想象（视角推拟）","07_区曲备楝叶彩丝（室内场所推拟）","08_楝叶塞口彩丝缠竹筒米（工艺推拟）","09_竹筒米与楝叶彩丝制作材料","10_简朴小舟送祭米（小舟为影视推拟；原文无龙舟）"];
  const subtypes={"392":"蛟龙形态推拟","393":"汉代区曲与士人对谈","394":"士人容貌推拟","395":"楚人汨罗祭江","396":"江底窃米想象","397":"汉代备祭物","398":"封口竹筒米","399":"楝叶彩丝材料","400":"小舟影视配套"};
  const prompts={"ZG-20261028-0391":"Use case: historical-scene. ID ZG-20261028-0391. Create exactly one 4:5 vertical full-body film still based on the extant Xu Qixie ji tale “Dragon Boat Festival Rice in Bamboo Tubes.” In the Eastern Han Jianwu era, an anonymous adult visitor who calls himself the Sanlü Dafu stands quietly on a riverbank, as if about to speak to the Changsha man Qu Qu. He is human-looking, reserved and grave, wearing a modest dark brown cross-collar robe and plain cloth headwear; his exact appearance and clothing are film interpretation, not described by the source. Miluo River reeds and soft mist behind him, natural overcast daylight, weathered earth textures, complete head, hands, hem and shoes, realistic human anatomy, grounded Chinese historical fantasy cinematography. This is the later Han encounter, not the earlier Chu memorial rite. No second Qu Yuan character, white immortal robes, walking on water, sword, dragon boat, racing, palace, magic aura, text, captions, watermark, collage or border.","ZG-20261028-0392":"Use case: historical-scene. ID ZG-20261028-0392. Create exactly one 4:5 vertical close portrait of the jiaolong river creature mentioned as stealing rice offerings in the extant Xu Qixie ji tale. Beneath murky green-brown river water, a long dark scaled head and part of a sinuous body emerge from shadow beside one simple open bamboo tube filled with white rice. Treat its visible anatomy as restrained film imagination: an elusive river beast, neither a huge imperial dragon nor a cute mascot. Refracted daylight, silt, river pebbles, faint reed roots and physically believable water, cinematic naturalism, clear single focal subject. This depicts the vulnerable offering before chinaberry leaves and colored silk protect it, separate from the Han conversation and the earlier Chu shore scene. No person, giant horns, pearls, supernatural beam, boat, sword, text, captions, diagram, collage or border.","ZG-20261028-0393":"Use case: historical-scene. ID ZG-20261028-0393. Create exactly one 16:9 wide film still of the Eastern Han Jianwu encounter in the extant Xu Qixie ji tale. On a quiet Changsha river path, Qu Qu, a thoughtful adult local man in a muted blue-gray cross-collar robe, faces the anonymous visitor in the same plain dark brown robe and cloth headwear as the G040 character design. The visitor calmly explains that the annual rice offerings have been taken by a jiaolong and advises stopping a bamboo tube with chinaberry leaves and winding colored silk around it. An unadorned bamboo rice tube rests nearby; gesture and eye line make the exchange legible. The precise meeting place, costumes and staging are film interpretation. Natural diffused light, reeds and river in depth, grounded historical texture, two adults only. This Han exchange is centuries after Qu Yuan's death; do not show a second Qu Yuan in the same scene. No white ghost, dragon boat, festival crowd, sword, palace, text, caption, collage or border.","ZG-20261028-0394":"Use case: identity-preserve. ID ZG-20261028-0394. Edit the supplied G040-0391 portrait into exactly one 4:5 vertical chest-up close film still of the very same anonymous Han Jianwu-era visitor. Preserve his recognizable face, age, short moustache and pointed chin beard, dark brown cross-collar robe, simple dark cloth headwear, natural skin texture and quiet Miluo riverbank setting. Tighten the camera to a chest-up perspective with his head fully in frame, eyes turned toward the unseen Qu Qu as he speaks earnestly about the rice offering. Keep the overcast daylight and grounded period film realism. This visitor only calls himself Sanlü Dafu in the extant Xu Qixie ji; his precise appearance remains cinematic casting, not an attested portrait. No second person, crown, white immortal robe, jade sword, glowing halo, boat, writing, caption, collage or border.","ZG-20261028-0395":"Use case: historical-scene. ID ZG-20261028-0395. Create exactly one 16:9 wide establishing film still of the earlier Chu memorial rite described in the extant Xu Qixie ji tale, centuries before the Han Jianwu conversation. A few grieving Chu people stand on a broad natural bank of the Miluo River and respectfully cast plain bamboo cylinders filled with rice into the water to commemorate Qu Yuan, who has already died. Their dress and the exact riverbank are modest film reconstruction, not specified in the short text. Place the human figures small within reeds, low hills and a broad river; one clearly visible bamboo tube arcs toward the water. Quiet daylight, solemn realism, no sensational suicide image. These initial offerings do not yet have the later chinaberry-leaf stopper and colored silk. No Han visitor, Qu Qu, dragon boat race, ornate ship, sword, palace, text, captions, collage or border.","ZG-20261028-0396":"Use case: historical-scene. ID ZG-20261028-0396. Create exactly one 16:9 wide underwater fantasy film still imagining the extant Xu Qixie ji claim that a jiaolong stole rice offerings. From a submerged viewpoint under the Miluo River, a half-seen dark sinuous river creature in the far midground approaches several plain rice-filled bamboo tubes that have sunk among stones and aquatic roots. The source states the theft but never describes the creature's form or this exact view; keep the imagery mysterious and grounded. Soft daylight shafts filter through green-brown water and suspended silt; quiet suspense, clear sense of depth and scale. The offerings are unprotected, before the later Han advice to add chinaberry leaves and colored silk. No human apparition, temple, luminous palace, giant ornate dragon, magic beams, dragon boat, sword, text, captions, collage or border.","ZG-20261028-0397":"Use case: historical-scene. ID ZG-20261028-0397. Create exactly one 16:9 wide interior film still for the later Eastern Han Jianwu strand of the extant Xu Qixie ji tale. In a simple riverside household workroom, Qu Qu in his muted blue-gray cross-collar robe studies a bamboo tube filled with rice while laying fresh chinaberry leaves and several colored silk threads beside it, preparing to follow the visitor's advice. The source records the advice and Qu Qu's compliance; this interior workroom and the precise making gesture are film interpretation. A doorway opens toward soft river light; rough wooden table, natural fibers, restrained historical realism, one person and a focused action. No additional Qu Yuan figure, fighting, ghost, palace, elaborate altar, sword, triangular dumpling, dragon boat, text, captions, collage or border.","ZG-20261028-0398":"Use case: precise-object-edit. ID ZG-20261028-0398. Edit the supplied square still of one bamboo rice cylinder. Keep the same bamboo tube, modest four-colored silk windings, worn dark wooden surface, close macro camera, natural sidelight, color and tactile realism. Change only the near open end: securely stop the entire circular mouth with fresh chinaberry leaves tucked inside the rim, visibly forming a complete leaf cap so no rice is exposed or spilling. The source says chinaberry leaves are placed over the rice tube to prevent the jiaolong from stealing the offering; the specific craft construction is cinematic interpretation. Output exactly one 1:1 square image. No triangular dumpling, cutaway, human hand, sword, dragon, text, caption, collage or border.","ZG-20261028-0399":"Use case: historical-scene. ID ZG-20261028-0399. Create exactly one 1:1 square close still of the modest offering materials described in the extant Xu Qixie ji tale. On a plain Han-era wooden work surface, show a short open bamboo tube visibly holding rice, a few fresh chinaberry leaves and several separate colored silk strands ready to be wound around it. A single adult hand may reach in to pick up a leaf, but no face; the arrangement and hand are film staging rather than a recorded moment. Tactile bamboo, rice, leaf and silk fibers, diffuse daylight, restrained historical documentary texture, unmistakable square single scene. Do not turn the tube into a triangular dumpling or add Qu Yuan's sword, lacquer goblet, incense burner, talisman, writing, label, caption, collage or border.","ZG-20261028-0400":"Use case: identity-preserve. ID ZG-20261028-0400. Edit Image 1, the supplied 16:9 river-skiff still, using Image 2 only as the identity and clothing reference for Qu Qu. Keep the broad Miluo river, modest unadorned wooden skiff, one boatman, quiet daylight, reeds, hills and several bamboo rice tubes sealed with chinaberry leaves and colored silk. Replace only the person standing on the near bank in Image 1 with the same adult Chinese man Qu Qu seen in Image 2: muted blue-gray cross-collar robe, tied dark hair, short moustache and small chin beard. He watches the skiff depart; keep believable human proportions and a clear two-person composition. This ordinary skiff is film interpretation because the extant Xu Qixie ji tale does not mention a boat; the later Han advice to protect the offerings is the textual basis. Output exactly one 16:9 horizontal still. No woman in the foreground, racing, drum, dragon prow, dragon-scale hull, fleet, ghost, palace, sword, text, captions, collage or border."};
  window.JINTAI_G040_PROMPTS=prompts;
  window.JINTAI_G040_PROMPT_PROVENANCE={"ZG-20261028-0391":"ZG-20261028-0391-generation-prompt.txt","ZG-20261028-0392":"ZG-20261028-0392-generation-prompt.txt","ZG-20261028-0393":"ZG-20261028-0393-generation-prompt.txt","ZG-20261028-0394":"ZG-20261028-0394-generation-prompt-v2.txt","ZG-20261028-0395":"ZG-20261028-0395-generation-prompt.txt","ZG-20261028-0396":"ZG-20261028-0396-generation-prompt.txt","ZG-20261028-0397":"ZG-20261028-0397-generation-prompt.txt","ZG-20261028-0398":"ZG-20261028-0398-generation-prompt-v2.txt","ZG-20261028-0399":"ZG-20261028-0399-generation-prompt.txt","ZG-20261028-0400":"ZG-20261028-0400-generation-prompt-v2.txt"};
  window.JINTAI_G040_NOTE=note;
  window.JINTAI_G040_CORRECT_META=function(meta){
    if(!meta)return meta;
    const g=(meta.groups||[]).find(x=>x[0]===id);
    if(g){
      g[2]='《续齐谐记》〈端午椶〉（今本）';
      g[3]='今本题署吴均；具体传写源流另考';
      g[4]='楚人祭江与东汉建武区曲遇士人，两段时代分开';
      g[5]=story;
      g[6]='屈原（先事）、楚人、汉建武长沙区曲、自称三闾大夫的士人；蛟龙外形未述';
      g[7]='汨罗水投竹筒米；区曲遇士人；用楝叶和彩丝护祭物；地点布景未述';
      g[8]='竹筒米、楝叶、彩丝；玉具剑、龙舟、羽觞非此文道具';
      g[9]='今本《续齐谐记》〈端午椶〉；楚人祭江与汉建武授法分时';
      g[10]="https://zh.wikisource.org/zh-hans/%E7%BA%8C%E9%BD%8A%E8%AB%A7%E8%A8%98#端午椶";
    }
    return meta;
  };
  window.JINTAI_G040_CORRECT_ITEM=function(item,row){
    const n=Number(row&&row[0]);
    if(!item||item.gid!==id||n<391||n>400)return item;
    const ident='ZG-20261028-'+String(n).padStart(4,'0');
    item.book='《续齐谐记》〈端午椶〉（今本）';
    item.author_era='今本题署吴均；传写源流另考';
    item.era='楚人祭江与东汉建武遇士人分时';
    item.story=story;
    item.characters='屈原（先事）、楚人、区曲、自称三闾大夫者；相貌衣饰未述';
    item.scenes='汨罗水祭江与汉建武授法；小舟、室内、江底视角为影视推拟';
    item.props='竹筒米、楝叶、彩丝；龙舟、玉具剑、羽觞非此文道具';
    item.basis='今本《续齐谐记》〈端午椶〉，两段时代分开';
    item.url="https://zh.wikisource.org/zh-hans/%E7%BA%8C%E9%BD%8A%E8%AB%A7%E8%A8%98#端午椶";
    item.sub_type=subtypes[n]||item.sub_type;
    item.label=labels[n-391];
    item.title='《续齐谐记》〈端午椶〉 · '+item.label;
    item.frozen_prompt=row[8];
    item.prompt=prompts[ident];
    item.source_note=note;
    item.prompt_provenance=window.JINTAI_G040_PROMPT_PROVENANCE[ident];
    return item;
  };
  const previous=window.applyJintaiSourceCorrection;
  window.applyJintaiSourceCorrection=function(record){
    if(previous)record=previous(record)||record;
    if(!record||record.id!==id)return record;
    record.title=title;record.story=story;
    record.hold='今本《续齐谐记》〈端午椶〉';
    record.era='楚人祭江／东汉建武士人授法，两层分时';
    record.anchor=note;record.brief=note;record.src=source;
    record.review_status='今本《续齐谐记》原文核对；影视推拟已标明';
    record.qualification='楚人祭江、区曲遇士人、楝叶彩丝可证；人物、蛟龙外形与舟楫推拟';
    record._sourceWarning=note;
    for(let i=0;i<(record.variants||[]).length&&i<10;i++){
      const view=record.variants[i];if(view._g040Corrected)continue;
      const ident='ZG-20261028-'+String(391+i).padStart(4,'0');
      view._frozenPrompt=view.prompt;
      view.prompt=note+'\n\n实际生成提示词：\n'+prompts[ident];
      view.ref=source;
      view.label='Z'+String(i+1).padStart(2,'0')+'·'+labels[i];
      view._g040Corrected=true;
    }
    return record;
  };
})();
