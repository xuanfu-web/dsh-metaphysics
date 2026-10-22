import io
import re

PK = 'src/panel-kit.js'
s = io.open(PK, encoding='utf-8').read()

# ── 一、CSS 侧：父级限定替换（长串在先，避免被短串抢先吃掉）──────────────
CSS_RULES = [
    (r'\.pp-bz td\.wxs', '.pp-bz td.bz-wxs'),
    (r'\.pp-bz td\.lbl', '.pp-bz td.bz-lbl'),
    (r'\.pp-bz th\.hdr-day', '.pp-bz th.bz-hdr-day'),
    (r'\.pp-bz \.big', '.pp-bz .bz-big'),
    (r'\.pp-bz \.cg', '.pp-bz .bz-cg'),

    (r'\.pp-detail \.st \.br', '.pp-detail .dt-st .dt-br'),
    (r'\.pp-detail \.st', '.pp-detail .dt-st'),
    (r'\.pp-detail \.dh \.x', '.pp-detail .dt-dh .dt-x'),
    (r'\.pp-detail \.dh', '.pp-detail .dt-dh'),
    (r'\.pp-detail \.dr \.k', '.pp-detail .dt-dr .dt-k'),
    (r'\.pp-detail \.dr \.v', '.pp-detail .dt-dr .dt-v'),
    (r'\.pp-detail \.dr', '.pp-detail .dt-dr'),
    (r'\.pp-detail \.tri', '.pp-detail .dt-tri'),
    (r'\.pp-detail \.empty', '.pp-detail .dt-empty'),

    (r'\.pp-flow \.fl \.p \.k', '.pp-flow .flow-row .flow-p .flow-k'),
    (r'\.pp-flow \.fl \.m i\.dim', '.pp-flow .flow-row .flow-m i.flow-dim'),
    (r'\.pp-flow \.fl \.p', '.pp-flow .flow-row .flow-p'),
    (r'\.pp-flow \.fl \.m', '.pp-flow .flow-row .flow-m'),
    (r'\.pp-flow \.fl', '.pp-flow .flow-row'),
    (r'em\.same', 'em.flow-same'),

    (r'\.pp-foot \.l \.dx', '.pp-foot .ft-l .ft-dx'),
    (r'\.pp-foot \.l', '.pp-foot .ft-l'),
    (r'\.pp-foot \.r', '.pp-foot .ft-r'),
    (r'\.pp-foot \.pn', '.pp-foot .ft-pn'),

    (r'\.pp-center \.t4', '.pp-center .ct-t4'),
    (r'\.pp-center \.t3', '.pp-center .ct-t3'),
    (r'\.pp-center \.t2', '.pp-center .ct-t2'),
    (r'\.pp-center \.t1', '.pp-center .ct-t1'),
    (r'\.mp-dl-c \.t3', '.mp-dl-c .dl-t3'),
    (r'\.mp-dl-c \.t2', '.mp-dl-c .dl-t2'),
    (r'\.mp-dl-c \.t1', '.mp-dl-c .dl-t1'),

    (r'\.mp-hexbox\.mini', '.mp-hexbox.hb-mini'),
    (r'\.mp-hexbox \.h', '.mp-hexbox .hb-h'),
    (r'\.mp-hexbox \.n', '.mp-hexbox .hb-n'),
    (r'\.mp-hexbox \.s', '.mp-hexbox .hb-s'),
    (r'\.mp-tritag\.ti', '.mp-tritag.tritag-ti'),
    (r'\.mp-tritag\.yong', '.mp-tritag.tritag-yong'),
    (r'\.mp-mh-rel \.lv', '.mp-mh-rel .mh-lv'),
    (r'\.mp-hex\.on', '.mp-hex.hex-on'),
    (r'\.mp-hy-row\.plain', '.mp-hy-row.hy-plain'),
    (r'\.mp-tt-card \.rev', '.mp-tt-card .tt-rev'),
    (r'\.mp-tt-card \.up', '.mp-tt-card .tt-up'),

    (r'\.pp-ss \.s', '.pp-ss .ss-s'),
    (r'\.pp-ssx \.h', '.pp-ssx .ssx-h'),
    (r'\.pp-ssg \.gi', '.pp-ssg .ssg-gi'),
    (r'\.pp-ssg \.gt', '.pp-ssg .ssg-gt'),

    (r'\.it-ask \.d', '.it-ask .ask-d'),
    (r'\.it-ask \.q', '.it-ask .ask-q'),
    (r'\.it-ask \.sep', '.it-ask .ask-sep'),
    (r'\.it-ask \.none', '.it-ask .ask-none'),
]
css_n = 0
for pat, repl in CSS_RULES:
    s, n = re.subn(pat, repl, s)
    css_n += n
    if n == 0:
        print('!! CSS 未命中:', pat)

# ── 二、HTML 侧：按行号 + token 精确替换 ────────────────────────────────
# 行号 -> [(旧token, 新token), ...]
LINES = {
    562: [('l', 'ft-l')],
    563: [('dx', 'ft-dx')],
    567: [('r', 'ft-r')],
    570: [('pn', 'ft-pn')],
    600: [('t1', 'ct-t1')], 602: [('t1', 'ct-t1')], 603: [('t1', 'ct-t1')],
    606: [('t2', 'ct-t2')], 607: [('t2', 'ct-t2')],
    608: [('t3', 'ct-t3')],
    609: [('t4', 'ct-t4')], 610: [('t4', 'ct-t4')], 611: [('t4', 'ct-t4')], 612: [('t4', 'ct-t4')],
    938: [('t1', 'dl-t1')], 939: [('t2', 'dl-t2')], 940: [('t3', 'dl-t3')],
    941: [('t2', 'dl-t2')],
    641: [('fl', 'flow-row'), ('p', 'flow-p'), ('k', 'flow-k'), ('m', 'flow-m'), ('same', 'flow-same')],
    646: [('fl', 'flow-row'), ('p', 'flow-p'), ('m', 'flow-m')],
    672: [('empty', 'dt-empty')], 696: [('empty', 'dt-empty')],
    675: [('br', 'dt-br')],
    677: [('st', 'dt-st')], 703: [('st', 'dt-st')],
    710: [('tri', 'dt-tri'), ('empty', 'dt-empty')],
    711: [('dr', 'dt-dr'), ('k', 'dt-k'), ('v', 'dt-v')],
    713: [('dh', 'dt-dh')],
    718: [('x', 'dt-x')],
    725: [('tri', 'dt-tri')], 726: [('tri', 'dt-tri')],
    800: [('plain', 'hy-plain')],
    842: [('mini', 'hb-mini')],
    843: [('h', 'hb-h')], 844: [('n', 'hb-n')], 846: [('s', 'hb-s')],
    855: [('ti', 'tritag-ti'), ('yong', 'tritag-yong')],
    859: [('h', 'hb-h')], 860: [('n', 'hb-n')], 863: [('s', 'hb-s')],
    870: [('lv', 'mh-lv')],
    954: [('up', 'tt-up'), ('rev', 'tt-rev')],
    991: [('s', 'ss-s')],
    1056: [('h', 'ssx-h')], 1058: [('h', 'ssx-h')],
    1057: [('gi', 'ssg-gi'), ('gt', 'ssg-gt')],
    1101: [('d', 'ask-d'), ('q', 'ask-q'), ('sep', 'ask-sep'), ('none', 'ask-none')],
    # 八字表（.big/.cg/.lbl/.wxs/.hdr-day）
    1005: [('big', 'bz-big')], 1006: [('big', 'bz-big')],
    1012: [('lbl', 'bz-lbl')],
}

lines = s.split('\n')
html_n = 0
for ln, pairs in LINES.items():
    idx = ln - 1
    if idx >= len(lines):
        print('!! 行号越界', ln)
        continue
    orig = lines[idx]
    cur = orig
    for old, new in pairs:
        # 只替换 class="..." 内的独立 token
        def fix(m):
            global html_n
            inner = m.group(1)
            toks = re.split(r'(\s+)', inner)
            out = []
            for t in toks:
                if t == old:
                    out.append(new)
                    html_n += 1
                else:
                    out.append(t)
            return 'class="' + ''.join(out) + '"'
        cur = re.sub(r'class="([^"]*)"', fix, cur)
    if cur == orig:
        print('!! 行内未命中', ln, pairs)
    lines[idx] = cur

s = '\n'.join(lines)
io.open(PK, 'w', encoding='utf-8').write(s)
print(f'\nCSS 替换 {css_n} 处，HTML token 替换 {html_n} 处')
