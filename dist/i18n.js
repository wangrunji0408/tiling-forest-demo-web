// Chinese is the source language of the original demo. Translate text nodes and
// accessible labels while retaining their source, including dynamically built UI.
export const resolveLanguage = value => /^zh\b/i.test(value||'')?'zh':/^ja\b/i.test(value||'')?'ja':'en';
const rows = [
['森林','Forest','森'],['开始游戏','Start game','ゲーム開始'],['继续游戏','Continue','つづきから'],['重新开始','New game','はじめから'],['游戏规则','How to play','遊び方'],
['指南','Guide','ガイド'],['规则','Rules','ルール'],['菜单','Menu','メニュー'],['关闭','Close','閉じる'],['全屏','Fullscreen','全画面'],['开启声音','Enable sound','音声オン'],['关闭声音','Mute sound','音声オフ'],
['移动','Move','移動'],['图块','Tiles','タイル'],['擦除','Erase','消す'],['标记','Marks','マーク'],['撤销','Undo','戻す'],['重做','Redo','やり直す'],['重置','Reset','リセット'],['加载布局','Load layout','配置を読込'],
['未完成','Incomplete','未完成'],['尚未到达','Unexplored','未探索'],['✓ 已完成','✓ Complete','✓ 完成'],['拥有的图块','Your tiles','手持ちのタイル'],['8 种','8 marks','8 種類'],
['区域内道路连成一体','Connect all roads in the area','エリア内の道をつなぐ'],['树桩成对发芽','Pair the stumps','切り株をペアにする'],
['备忘标记','Note markers','メモ用マーク'],['完成','Complete','完成'],['横向','Horizontal','横'],['纵向','Vertical','縦'],['排除','Exclude','除外'],['待定','Unsure','保留'],['加减','Plus/minus','プラス・マイナス'],['减号','Minus','マイナス'],['加号','Plus','プラス'],
['展开区域详情','Show area details','エリアの詳細を表示'],['收起区域详情','Hide area details','エリアの詳細を閉じる'],['清空当前区域','Clear this area','このエリアをリセット'],['恢复完成时的布局','Restore the completed layout','完成時の配置に戻す'],
['森林全景','Forest overview','森の全景'],['返回起点','Back to the start','スタート地点へ'],['缩小 Q','Zoom out (Q)','縮小 (Q)'],['放大 E','Zoom in (E)','拡大 (E)'],['拖动地图 Esc','Pan the map (Esc)','マップを移動 (Esc)'],['放置图块','Place tiles','タイルを置く'],['移除已放置的图块','Remove placed tiles','配置したタイルを消す'],['撤销 Z','Undo (Z)','戻す (Z)'],['重做 X','Redo (X)','やり直す (X)'],['收起 / 展开 Tab','Collapse / expand (Tab)','開く / 閉じる (Tab)'],
['自动保存','Autosave','自動保存'],['✓ 已自动保存','✓ Saved','✓ 保存済み'],['存储不可用 · 请导出存档','Storage unavailable · Export your save','保存できません · セーブを出力してください'],
['点击放置 · 单指拖动 · 双指缩放','Tap to place · Drag to pan · Pinch to zoom','タップで配置 · ドラッグで移動 · ピンチで拡大'],
['点击移除图块 · 单指拖动 · 双指缩放','Tap to erase · Drag to pan · Pinch to zoom','タップで消す · ドラッグで移動 · ピンチで拡大'],
['点击放置标记 · 再次点击移除','Tap to mark · Tap again to remove','タップでマーク · もう一度で消す'],
['单指拖动 · 双指缩放 · 选择图块开始拼图','Drag to pan · Pinch to zoom · Select a tile to build','ドラッグで移動 · ピンチで拡大 · タイルを選択'],
['点击移除图块 · 拖动移动地图','Click to erase · Drag to pan','クリックで消す · ドラッグで移動'],
['拖动 / WASD 移动地图 · Q / E 缩放 · 点击「图块」继续拼图','Drag / WASD to pan · Q / E to zoom · Select Tiles to build','ドラッグ / WASD で移動 · Q / E で拡大縮小 · タイルで再開'],
['点击 放置标记 · 再次点击 移除标记 · 标记不影响谜题判定','Click to mark · Click again to remove · Marks do not affect rules','クリックでマーク · もう一度で消す · 判定には影響しません'],
['左键 放置 · 右键 移除 · 滚轮 切换图块 · 拖动 / WASD 移动','Left click: place · Right click: erase · Wheel: select · Drag / WASD: pan','左クリックで配置 · 右クリックで消す · ホイールで選択 · ドラッグ / WASD で移動'],
['欢迎来到 Tiling Forest！用手中的图块填满 W-1 区域。','Welcome to Tiling Forest! Fill W-1 with your tiles.','Tiling Forest へようこそ！手持ちのタイルで W-1 を埋めましょう。'],
['获得新图块！','New tile unlocked!','新しいタイルを獲得！'],['森林完成！','Forest complete!','森が完成！'],['Tiling Forest 通关！','Tiling Forest cleared!','Tiling Forest クリア！'],
['所有区域、树桩和道路都已满足条件。恭喜你完全通关 Tiling Forest！','Every area, stump and road meets the rules. Congratulations on fully completing Tiling Forest!','すべてのエリア・切り株・道の条件を満たしました。Tiling Forest 完全クリア、おめでとうございます！'],
['你已完成 N-6，达成 demo 的通关条件。继续完成所有区域、让所有树桩发芽并让每条道路开花，挑战森林的完全完成。','You completed N-6 and cleared the demo. Complete every area, sprout every stump and bloom every road to finish the entire forest.','N-6 を完成させ、体験版をクリアしました。すべてのエリアを完成させ、切り株を芽吹かせ、道に花を咲かせて完全クリアを目指しましょう。'],
['这片区域尚未到达。请先将道路与已到达的道路连接。','This area is unexplored. Connect it to a road you have already reached.','まだ到達していないエリアです。到達済みの道につなげましょう。'],
['图案不匹配：相邻边的道路与地形必须对齐。','Edges do not match: adjacent roads and terrain must line up.','模様が合いません。隣り合う道と地形を合わせてください。'],
['当前周边图案与保存的布局不匹配。','The saved layout does not match the surrounding tiles.','保存した配置と周囲のタイルの模様が合いません。'],
['此浏览器不支持全屏，请使用窗口最大化。','Fullscreen is unavailable in this browser. Try maximizing the window.','このブラウザーでは全画面表示が使えません。ウィンドウを最大化してください。'],
['森林 · 菜单','Forest · Menu','森 · メニュー'],['返回标题','Title screen','タイトルへ'],['导出存档','Export save','セーブを書き出す'],['导入存档','Import save','セーブを読み込む'],['关于移植','About this port','移植版について'],
['背景音乐与音效','Music and sound effects','BGM と効果音'],['音量','Volume','音量'],['显示图块网格','Show tile grid','タイルの枠を表示'],['显示区域名称','Show area names','エリア名を表示'],['语言','Language','言語'],['跟随系统','System default','システム設定に従う'],
['进度自动保存在当前浏览器。可以导入网页版存档或原版 progress.json。','Progress is saved in this browser. Import a web save or the original progress.json.','進行状況はこのブラウザーに自動保存されます。Web 版のセーブや原版の progress.json を読み込めます。'],
['开始新的森林','Start a new forest','新しい森を始める'],['重新开始会替换此浏览器中的当前进度。可以先在菜单导出存档。','Starting over replaces this browser’s current progress. You can export your save from the menu first.','はじめから始めると、このブラウザーの現在の進行状況を置き換えます。先にメニューからセーブを書き出せます。'],['取消','Cancel','キャンセル'],['继续探索','Keep exploring','探索を続ける'],
['存档已导入','Save imported','セーブを読み込みました'],['无法读取存档：请选择网页版存档或原版 progress.json。','Could not read the save. Choose a web save or the original progress.json.','読み込めませんでした。Web 版のセーブか原版の progress.json を選んでください。'],
['规则列表','Rules','ルール一覧'],['图块的图案','Matching tile edges','タイルの模様'],['图块相邻边的','Adjacent tile edges must have ' ,'隣り合うタイルの辺は、'],['道路和地形必须对齐','matching roads and terrain','道と地形を一致させる必要があります'],
['。不能放置图案不匹配的图块。每种方向是独立图块，需要分别解锁。','. Tiles with mismatched edges cannot be placed. Each orientation is a separate tile to unlock.','。模様の合わないタイルは置けません。向きごとに独立したタイルを獲得する必要があります。'],
['完成一个区域','Completing an area','エリアの完成'],['填满所有空格，将','Fill every empty cell, ','すべての空きマスを埋め、'],['区域内的道路连成一体','connect all roads within the area','エリア内の道をひとつにつなげ'],
['，并让区域内的树桩全部发芽。完成后获得一种新图块。',', and sprout all its stumps. Completing it unlocks a new tile.','、エリア内の切り株をすべて芽吹かせましょう。完成すると新しいタイルを獲得します。'],
['道路与探索','Roads and exploration','道と探索'],['将道路连接到','Connect a road to ','道を'],['已到达的道路','an already reached road','到達済みの道'],
['，即可到达新道路并解锁相连的区域。仅连接两条未探索道路，不能解锁区域。',' to reach new roads and unlock their areas. Connecting two unexplored roads alone does not unlock an area.','につなげると、新しい道に到達してエリアを解放できます。未探索の道同士をつなぐだけでは解放されません。'],
['空地','Open ground','広場'],['进入同一空地的道路视为相互连接。空地本身不要求全部连接到道路。','Roads entering the same open ground count as connected. Open ground itself does not all need to connect to a road.','同じ広場に入る道はつながっているとみなされます。広場自体をすべて道につなぐ必要はありません。'],
['树桩发芽','Sprouting stumps','切り株の芽吹き'],['两个树桩','Two stumps sprout when they ','ふたつの切り株が'],['相向、间隔恰好一格','face each other with exactly one cell between them','向かい合い、間がちょうど 1 マス'],
['，中间夹有道路时发芽。可以与区域外的树桩配对。',', with a road in that cell. They may pair with a stump outside the area.','で、そのマスに道があると芽吹きます。エリア外の切り株ともペアにできます。'],
['森林完全完成','Completing the forest','森の完全クリア'],['完成所有区域，让所有树桩发芽，让所有道路开花。道路必须被','Complete every area, sprout every stump and bloom every road. A road needs ','全エリアを完成させ、すべての切り株を芽吹かせ、すべての道に花を咲かせましょう。道には'],['恰好一对','exactly one pair','ちょうど 1 組'],
['发芽的树桩夹住；花朵遇到空地停止，两对以上会枯萎。',' of sprouted stumps. Flowers stop at open ground and wilt with two or more pairs.','の芽吹いた切り株が必要です。花は広場で止まり、2 組以上あると枯れます。'],
['通关目标','Goal','クリア条件'],['找到并完成','Find and complete ','探し出して完成させるエリアは '],['即可通关 demo；再满足森林的全部条件，达成完全完成。','to clear the demo. Then meet every forest condition for full completion.','です。体験版クリア後は、森の全条件を満たして完全クリアを目指しましょう。'],
['触屏操作','Touch controls','タッチ操作'],['键鼠操作','Mouse and keyboard','マウスとキーボード'],
['轻点格子放置图块；单指拖动移动地图，双指捏合缩放。选择「擦除」后轻点已放置的图块即可移除。底部图块栏可横向滑动，点击区域名称可展开详情。','Tap a cell to place a tile. Drag with one finger to pan; pinch with two to zoom. Choose Erase, then tap a placed tile to remove it. Swipe the bottom tile strip sideways. Tap the area name to show details.','マスをタップして配置します。1 本指のドラッグで移動、2 本指のピンチで拡大縮小。「消す」を選んでタイルをタップすると消せます。下部のタイル欄は横にスワイプでき、エリア名をタップすると詳細が開きます。'],
['左键放置 · 右键移除 · 拖动 / WASD 移动 · Q / E 缩放','Left click: place · Right click: erase · Drag / WASD: pan · Q / E: zoom','左クリックで配置 · 右クリックで消す · ドラッグ / WASD で移動 · Q / E で拡大縮小'],
['滚轮 / R / T 切换图块 · 1–0 快选 · Z 撤销 · X 重做','Wheel / R / T: select tiles · 1–0: quick select · Z: undo · X: redo','ホイール / R / T でタイル選択 · 1–0 で直接選択 · Z で戻す · X でやり直す'],
['C 重置当前区域 · Tab 收起图块栏 · Esc 切换移动模式','C: reset area · Tab: collapse tiles · Esc: toggle pan mode','C でエリアをリセット · Tab でタイル欄を開閉 · Esc で移動モード'],
['通过菜单导出 / 导入存档；所有进度自动保存在浏览器。','Export / import saves from the menu. Progress is automatically saved in this browser.','メニューからセーブを読み書きできます。進行状況はブラウザーに自動保存されます。'],
['森林指南','Forest guide','森のガイド'],['已完成','Completed','完成済み'],['个区域，已获得','areas; unlocked','エリア、獲得済み'],['种图块。','tiles.','種類のタイル。'],
['已通关！现在尝试让所有区域完成、所有树桩发芽、所有道路开花。','Demo cleared! Now complete every area, sprout every stump and bloom every road.','クリア済み！すべてのエリアを完成させ、切り株を芽吹かせ、道に花を咲かせましょう。'],
['目标：找到并完成北方区域 N-6。无法完成当前区域时，先寻找其他可以到达的道路。','Goal: find and complete area N-6 in the north. If this area seems impossible, explore another reachable road first.','目標は北のエリア N-6 の完成です。今のエリアが難しければ、他の到達できる道を探しましょう。'],
['已到达的区域','Reached areas','到達済みのエリア'],
['提示检查当前已拥有的图块和相邻图案。一个合法落子并不保证最终可解；图块不够时，可以换一个区域探索。','Hints check your available tiles and neighboring edges. A legal move is not necessarily part of a solution; try another area if you need more tiles.','ヒントは手持ちのタイルと隣接する模様を確認します。置けるタイルが必ず正解とは限りません。タイルが足りなければ他のエリアを探索しましょう。'],
['寻找一个合法落子','Find a legal move','置けるタイルを探す'],['提示不会自动填图，也不会使用尚未解锁的图块。','Hints never fill the map or use locked tiles.','ヒントは自動で配置せず、未獲得のタイルも使いません。'],
['先沿道路到达这个区域。','Reach this area along a road first.','まず道をたどってこのエリアに到達しましょう。'],['当前没有可填的合法空格。尝试撤销布局或探索其他区域。','No legal empty cell found. Try undoing a move or exploring another area.','置ける空きマスがありません。配置を戻すか、他のエリアを探索してください。'],
['使用本地 Tiling Forest demo 提取的原版地图、图块规则定义、像素贴图、中文规则和音乐，在浏览器中重新实现游戏逻辑。','This browser port rebuilds the game using the original demo’s map, tile definitions, pixel art, rules and music extracted from a local installation.','ローカルの体験版から抽出した原版のマップ、タイル定義、ピクセルアート、ルール、音楽を使ってブラウザー上でゲームを再実装しています。'],
['包含 35 个区域、36 档图块解锁、道路探索、树桩配对与花朵判定。原始素材及游戏设计版权归 muratsubo Games 及各自权利人所有。本项目为非官方移植。请支持','Includes 35 areas, 36 tile unlocks, road exploration, stump pairs and flower rules. Original assets and game design belong to muratsubo Games and their respective owners. This is an unofficial port. Please support the ','35 エリア、36 段階のタイル獲得、道の探索、切り株のペア、花の判定を実装しています。原版の素材とゲームデザインの権利は muratsubo Games および各権利者に帰属します。本作は非公式の移植です。ぜひ原版を応援してください：'],
['原版游戏','original game','原版ゲーム'],['。','.','。'],
['引擎由 OpenSiv3D / Direct3D 改写为 Canvas 2D。原版 Steam 成就和动态指南推理未接入；本版指南提供规则说明、区域定位和合法落子提示。','The OpenSiv3D / Direct3D engine was rewritten in Canvas 2D. Steam achievements and the original dynamic guide are not included; this guide offers rules, area navigation and legal-move hints.','OpenSiv3D / Direct3D から Canvas 2D に書き直しています。Steam 実績と原版の動的ガイドは未実装です。本版のガイドにはルール、エリア移動、配置ヒントがあります。'],
['浏览器移植版 · 原版地图与像素资源','Browser port · Original map and pixel art','ブラウザー移植版 · 原版マップとピクセルアート'],
['Tiling Forest / Tiling Town © muratsubo Games · 原作版权归原作者所有','Tiling Forest / Tiling Town © muratsubo Games · Original rights reserved','Tiling Forest / Tiling Town © muratsubo Games · 原作の権利は原作者に帰属します'],
['森林拼图地图，单指拖动移动视角，双指缩放，点击空格放置图块','Forest puzzle map. Drag to pan, pinch to zoom, tap an empty cell to place a tile.','森のパズルマップ。ドラッグで移動、ピンチで拡大縮小、空きマスをタップして配置。'],
['道路 · 横向','Road · Horizontal','道 · 横'],['道路 · 纵向','Road · Vertical','道 · 縦'],['弯道 · 左上','Bend · Up-left','曲がり道 · 左上'],['弯道 · 右上','Bend · Up-right','曲がり道 · 右上'],['弯道 · 左下','Bend · Down-left','曲がり道 · 左下'],['弯道 · 右下','Bend · Down-right','曲がり道 · 右下'],
];
const dictionary=new Map(rows.map(([zh,en,ja])=>[zh,{en,ja}]));
export function translate(source,locale){
 if(locale==='zh')return source;
 const text=source.trim(),entry=dictionary.get(text);
 let result=entry?.[locale];
 if(result===undefined){
  let m;
  if((m=text.match(/^([✓○])　(.+)$/)))result=m[1]+' '+translate(m[2],locale);
  else if((m=text.match(/^填满区域 (\d+) \/ (\d+)$/)))result=(locale==='ja'?'マスを埋める':'Fill cells')+` ${m[1]} / ${m[2]}`;
  else if((m=text.match(/^(.+) 完成！$/)))result=m[1]+(locale==='ja'?' 完成！':' complete!');
  else if((m=text.match(/^当前区域 · (.+)$/)))result=(locale==='ja'?'現在のエリア':'Current area')+' · '+m[1];
  else if((m=text.match(/^已选中一个可放置图块。高亮格有 (\d+) 种合法选择。$/)))result=locale==='ja'?`タイルを選択しました。強調されたマスには ${m[1]} 種類置けます。`:`Tile selected. The highlighted cell has ${m[1]} legal options.`;
  else if((m=text.match(/^(树冠|树桩|空地入口|空地) · (.+)$/))){const names={树冠:['Canopy','樹冠'],树桩:['Stump','切り株'],空地入口:['Ground entrance','広場の入口'],空地:['Open ground','広場']},dirs={向上:['Up','上'],向下:['Down','下'],向左:['Left','左'],向右:['Right','右']},i=locale==='ja'?1:0;result=names[m[1]][i]+' · '+(dirs[m[2]]?.[i]||m[2]);}
 }
 if(result===undefined)return source;
 return source.slice(0,source.length-source.trimStart().length)+result+source.slice(source.trimEnd().length);
}
export function installLocalization(){
 const KEY='tiling-forest-language';let preference='system';try{preference=localStorage.getItem(KEY)||'system';}catch{}
 if(!['system','zh','en','ja'].includes(preference))preference='system';
 let locale=preference==='system'?resolveLanguage(navigator.languages?.[0]||navigator.language):preference;
 const memory=new WeakMap();
 function update(node,slot,current,write){let record=memory.get(node);if(!record){record={};memory.set(node,record);}const old=record[slot],source=old&&current===old.result?old.source:current,result=translate(source,locale);record[slot]={source,result};if(current!==result)write(result);}
 function apply(root=document.body){
  if(root.nodeType===3){if(!root.parentElement?.closest('script,style'))update(root,'text',root.data,v=>root.data=v);return;}
  if(root.nodeType!==1||root.matches('script,style'))return;
  for(const attr of ['title','aria-label'])if(root.hasAttribute(attr))update(root,attr,root.getAttribute(attr),v=>root.setAttribute(attr,v));
  for(const child of root.childNodes)apply(child);
 }
 const observer=new MutationObserver(records=>{for(const r of records){if(r.type==='childList'){for(const n of r.addedNodes)apply(n);}else apply(r.target);}});
 function sync(){document.documentElement.lang=locale==='zh'?'zh-CN':locale;apply();document.dispatchEvent(new CustomEvent('forest-languagechange'));}
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label']});
 window.addEventListener('languagechange',()=>{if(preference==='system'){locale=resolveLanguage(navigator.languages?.[0]||navigator.language);sync();}});
 sync();
 return {get preference(){return preference;},get locale(){return locale;},apply,set(value){if(!['system','zh','en','ja'].includes(value))return;preference=value;locale=value==='system'?resolveLanguage(navigator.languages?.[0]||navigator.language):value;try{localStorage.setItem(KEY,value);}catch{}sync();}};
}
