// 身主子/午两派：通行表「子午皆火星」与安身主诀逐字「子铃午火」
// 反馈来源：用户 2026-10-31 邮件第 3 条（部分排盘给铃星、部分给火星）
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { SHEN_ZHU, ZIWEI_SCHOOL_DEFAULTS, ZIWEI_SCHOOL_OPTIONS } from '../engine/ziwei.js';
import { ok } from './_harness.mjs';

const ZI = (datetime, extra = {}) => compute({ system: 'ziwei', datetime, gender: 'male', ...extra });

// ── 默认走通行表：子午皆火星 ──────────────────────────────────
const ziYear = ZI('1996-06-15T10:00'); // 丙子年
ok('默认身主开关为 common', ZIWEI_SCHOOL_DEFAULTS.shenzhuSchool === 'common', ZIWEI_SCHOOL_DEFAULTS.shenzhuSchool);
ok('开关选项含 common / verse', ZIWEI_SCHOOL_OPTIONS.shenzhuSchool.join(',') === 'common,verse', ZIWEI_SCHOOL_OPTIONS.shenzhuSchool.join(','));
ok('子年默认身主火星', ziYear.bodyMaster === '火星', ziYear.bodyMaster);
ok('子年带两派说明', typeof ziYear.bodyMasterNote === 'string' && ziYear.bodyMasterNote.includes('子午皆火星') && ziYear.bodyMasterNote.includes('铃火'), ziYear.bodyMasterNote);
ok('子年 summary 标通行表', typeof ziYear.summary === 'string' && ziYear.summary.includes('身主】火星（子午皆火星）'), ziYear.summary && ziYear.summary.split('\n').find((l) => l.includes('身主')));

// ── 切到逐字诀：子铃星、午火星 ────────────────────────────────
const ziVerse = ZI('1996-06-15T10:00', { shenzhuSchool: 'verse' });
ok('逐字诀子年身主铃星', ziVerse.bodyMaster === '铃星', ziVerse.bodyMaster);
ok('逐字诀带出处', ziVerse.bodyMasterNote.includes('子午安身铃火宿'), ziVerse.bodyMasterNote);
ok('逐字诀 summary 标子铃午火', ziVerse.summary.includes('身主】铃星（子铃午火）'), ziVerse.summary.split('\n').find((l) => l.includes('身主')));
const ziNested = compute({ system: 'ziwei', datetime: '1996-06-15T10:00', gender: 'male', schools: { shenzhuSchool: 'verse' } });
ok('nested schools 同样生效', ziNested.bodyMaster === '铃星', ziNested.bodyMaster);
ok('非法值回落 common', ZI('1996-06-15T10:00', { shenzhuSchool: 'x' }).bodyMaster === '火星');

// ── 午年两派都是火星；其余十支不受开关影响 ────────────────────
const wuYear = ZI('1990-05-12T14:30'); // 庚午年
const wuVerse = ZI('1990-05-12T14:30', { shenzhuSchool: 'verse' });
ok('午年默认火星', wuYear.bodyMaster === '火星', wuYear.bodyMaster);
ok('午年逐字诀仍火星', wuVerse.bodyMaster === '火星', wuVerse.bodyMaster);
ok('午年也有两派说明', wuYear.bodyMasterNote.includes('子午皆火星') && wuYear.bodyMasterNote.includes('铃火'), wuYear.bodyMasterNote);
const maoYear = ZI('2000-01-01T00:00'); // 己卯年
ok('卯年身主天同', maoYear.bodyMaster === '天同', maoYear.bodyMaster);
ok('非子午年不带两派说明', maoYear.bodyMasterNote === undefined, maoYear.bodyMasterNote);
for (const b of ['丑', '寅', '卯', '辰', '巳', '未', '申', '酉', '戌', '亥']) {
  ok(`两支一致 ${b}`, SHEN_ZHU.common[b] === SHEN_ZHU.verse[b], `${SHEN_ZHU.common[b]}/${SHEN_ZHU.verse[b]}`);
}
ok('两派只在子位不同', SHEN_ZHU.common.子 !== SHEN_ZHU.verse.子 && SHEN_ZHU.common.午 === SHEN_ZHU.verse.午);

// ── 流派说明与面板标注 ─────────────────────────────────────
ok('rules.schools 列出身主开关', ziYear.rules.schools.includes('身主 common') && ziYear.rules.schools.includes('verse'), ziYear.rules.schools);
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.ziweiHTML(ziYear);
ok('面板身主带标注点', /身主 火星<span class="pp-dim" title="[^"]*子午皆火星/.test(html), (html.match(/身主[^<]*<span[^>]*>[^<]*/) || [''])[0]);
ok('面板标注可读到出处', html.includes('子午安身铃火宿'), '');
