import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveLanguage,translate} from '../dist/i18n.js';

test('system locale recognizes regional variants and falls back to English',()=>{
 for(const locale of ['zh-CN','zh-TW','ZH-Hans'])assert.equal(resolveLanguage(locale),'zh');
 for(const locale of ['ja','ja-JP'])assert.equal(resolveLanguage(locale),'ja');
 for(const locale of ['en-US','fr-FR','de',undefined,''])assert.equal(resolveLanguage(locale),'en');
});
test('progress and hints retain their live values in both translations',()=>{
 assert.equal(translate('✓　填满区域 12 / 30','en'),'✓ Fill cells 12 / 30');
 assert.equal(translate('○　填满区域 2 / 8','ja'),'○ マスを埋める 2 / 8');
 assert.equal(translate('当前区域 · N-6','en'),'Current area · N-6');
 assert.equal(translate('W-1 完成！','en'),'W-1 complete!');
 assert.equal(translate('已选中一个可放置图块。高亮格有 3 种合法选择。','en'),'Tile selected. The highlighted cell has 3 legal options.');
});
test('tile directions translate without changing IDs or whitespace',()=>{
 assert.equal(translate('树桩 · 向上','en'),'Stump · Up');
 assert.equal(translate('树冠 · 向左','ja'),'樹冠 · 左');
 assert.equal(translate(' 继续游戏 ','en'),' Continue ');
 assert.equal(translate('N-6','en'),'N-6');
 assert.equal(translate('继续游戏','zh'),'继续游戏');
});
