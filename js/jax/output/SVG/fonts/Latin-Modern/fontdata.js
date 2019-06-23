/*
 *  /MathJax/jax/output/SVG/fonts/Latin-Modern/fontdata.js
 *
 *  Copyright (c) 2009-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function(A, f, F, p) {
  var C = '2.7.5';
  var c = 'LatinModernMathJax_Alphabets',
    x = 'LatinModernMathJax_Arrows',
    z = 'LatinModernMathJax_DoubleStruck',
    D = 'LatinModernMathJax_Fraktur',
    i = 'LatinModernMathJax_Latin',
    w = 'LatinModernMathJax_Main',
    o = 'LatinModernMathJax_Marks',
    y = 'LatinModernMathJax_Misc',
    G = 'LatinModernMathJax_Monospace',
    B = 'LatinModernMathJax_NonUnicode',
    t = 'LatinModernMathJax_Normal',
    E = 'LatinModernMathJax_Operators',
    a = 'LatinModernMathJax_SansSerif',
    r = 'LatinModernMathJax_Script',
    b = 'LatinModernMathJax_Shapes',
    n = 'LatinModernMathJax_Size1',
    m = 'LatinModernMathJax_Size2',
    l = 'LatinModernMathJax_Size3',
    j = 'LatinModernMathJax_Size4',
    h = 'LatinModernMathJax_Size5',
    g = 'LatinModernMathJax_Size6',
    e = 'LatinModernMathJax_Size7',
    v = 'LatinModernMathJax_Symbols',
    q = 'LatinModernMathJax_Variants';
  var s = 'H',
    d = 'V',
    u = { load: 'extra', dir: s },
    k = { load: 'extra', dir: d };
  A.Augment({
    FONTDATA: {
      version: C,
      baselineskip: 1200,
      lineH: 800,
      lineD: 200,
      FONTS: {
        LatinModernMathJax_Alphabets: 'Alphabets/Regular/Main.js',
        LatinModernMathJax_Arrows: 'Arrows/Regular/Main.js',
        LatinModernMathJax_DoubleStruck: 'DoubleStruck/Regular/Main.js',
        LatinModernMathJax_Fraktur: 'Fraktur/Regular/Main.js',
        LatinModernMathJax_Latin: 'Latin/Regular/Main.js',
        LatinModernMathJax_Main: 'Main/Regular/Main.js',
        LatinModernMathJax_Marks: 'Marks/Regular/Main.js',
        LatinModernMathJax_Misc: 'Misc/Regular/Main.js',
        LatinModernMathJax_Monospace: 'Monospace/Regular/Main.js',
        LatinModernMathJax_NonUnicode: 'NonUnicode/Regular/Main.js',
        LatinModernMathJax_Normal: 'Normal/Regular/Main.js',
        LatinModernMathJax_Operators: 'Operators/Regular/Main.js',
        LatinModernMathJax_SansSerif: 'SansSerif/Regular/Main.js',
        LatinModernMathJax_Script: 'Script/Regular/Main.js',
        LatinModernMathJax_Shapes: 'Shapes/Regular/Main.js',
        LatinModernMathJax_Size1: 'Size1/Regular/Main.js',
        LatinModernMathJax_Size2: 'Size2/Regular/Main.js',
        LatinModernMathJax_Size3: 'Size3/Regular/Main.js',
        LatinModernMathJax_Size4: 'Size4/Regular/Main.js',
        LatinModernMathJax_Size5: 'Size5/Regular/Main.js',
        LatinModernMathJax_Size6: 'Size6/Regular/Main.js',
        LatinModernMathJax_Size7: 'Size7/Regular/Main.js',
        LatinModernMathJax_Symbols: 'Symbols/Regular/Main.js',
        LatinModernMathJax_Variants: 'Variants/Regular/Main.js'
      },
      VARIANT: {
        normal: { fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n] },
        bold: {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          bold: true,
          offsetA: 119808,
          offsetG: 120488,
          offsetN: 120782
        },
        italic: {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          italic: true,
          offsetA: 119860,
          offsetG: 120546,
          remap: { 119893: 8462 }
        },
        'bold-italic': {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          bold: true,
          italic: true,
          offsetA: 119912,
          offsetG: 120604
        },
        'double-struck': {
          fonts: [z],
          offsetA: 120120,
          offsetN: 120792,
          remap: {
            120122: 8450,
            120127: 8461,
            120133: 8469,
            120135: 8473,
            120136: 8474,
            120137: 8477,
            120145: 8484
          }
        },
        fraktur: {
          fonts: [D],
          offsetA: 120068,
          remap: {
            120070: 8493,
            120075: 8460,
            120076: 8465,
            120085: 8476,
            120093: 8488
          }
        },
        'bold-fraktur': { fonts: [D], bold: true, offsetA: 120172 },
        script: {
          fonts: [r],
          italic: true,
          offsetA: 119964,
          remap: {
            119965: 8492,
            119968: 8496,
            119969: 8497,
            119971: 8459,
            119972: 8464,
            119975: 8466,
            119976: 8499,
            119981: 8475,
            119994: 8495,
            119996: 8458,
            120004: 8500
          }
        },
        'bold-script': {
          fonts: [r],
          bold: true,
          italic: true,
          offsetA: 120016
        },
        'sans-serif': { fonts: [a], offsetA: 120224, offsetN: 120802 },
        'bold-sans-serif': {
          fonts: [a],
          bold: true,
          offsetA: 120276,
          offsetN: 120812,
          offsetG: 120662
        },
        'sans-serif-italic': { fonts: [a], italic: true, offsetA: 120328 },
        'sans-serif-bold-italic': {
          fonts: [a],
          bold: true,
          italic: true,
          offsetA: 120380,
          offsetG: 120720
        },
        monospace: { fonts: [G], offsetA: 120432, offsetN: 120822 },
        '-Latin-Modern-variant': {
          fonts: [q, w, t, G, i, c, o, x, E, v, b, y, B, n]
        },
        '-tex-caligraphic': {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          italic: true
        },
        '-tex-oldstyle': { fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n] },
        '-tex-caligraphic-bold': {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          italic: true,
          bold: true
        },
        '-tex-oldstyle-bold': {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          bold: true
        },
        '-tex-mathit': {
          fonts: [w, t, G, i, c, o, x, E, v, b, y, q, B, n],
          italic: true,
          noIC: true
        },
        '-largeOp': { fonts: [n, w] },
        '-smallOp': {}
      },
      RANGES: [
        { name: 'alpha', low: 97, high: 122, offset: 'A', add: 26 },
        { name: 'Alpha', low: 65, high: 90, offset: 'A' },
        { name: 'number', low: 48, high: 57, offset: 'N' },
        { name: 'greek', low: 945, high: 969, offset: 'G', add: 26 },
        {
          name: 'Greek',
          low: 913,
          high: 1014,
          offset: 'G',
          remap: {
            1013: 52,
            977: 53,
            1008: 54,
            981: 55,
            1009: 56,
            982: 57,
            1012: 17
          }
        }
      ],
      RULECHAR: 8722,
      REMAP: {
        10: 32,
        9666: 9664,
        12296: 10216,
        12297: 10217,
        10072: 8739,
        9656: 9654,
        978: 933,
        9652: 9650,
        9653: 9651,
        65079: 9182,
        65080: 9183,
        697: 8242,
        9723: 9633,
        9724: 9632,
        9662: 9660,
        8254: 773,
        9663: 9661
      },
      REMAPACCENT: {
        '\u007E': '\u0303',
        '\u2192': '\u20D7',
        '\u0060': '\u0300',
        '\u005E': '\u0302',
        '\u00B4': '\u0301',
        '\u2032': '\u0301',
        '\u2035': '\u0300'
      },
      REMAPACCENTUNDER: {},
      DELIMITERS: {
        40: {
          dir: d,
          HW: [
            [996, w],
            [1094, n],
            [1194, m],
            [1444, l],
            [1792, j],
            [2092, h],
            [2392, g],
            [2990, e]
          ],
          stretch: { bot: [9117, v], ext: [9116, v], top: [9115, v] }
        },
        41: {
          dir: d,
          HW: [
            [996, w],
            [1094, n],
            [1194, m],
            [1444, l],
            [1792, j],
            [2092, h],
            [2392, g],
            [2990, e]
          ],
          stretch: { bot: [9120, v], ext: [9119, v], top: [9118, v] }
        },
        45: { alias: 8722, dir: s },
        47: {
          dir: d,
          HW: [
            [1000, w],
            [1310, n],
            [1716, m],
            [1771, m, 1.032],
            [2248, l],
            [2944, j],
            [3858, h],
            [5054, g],
            [6620, e]
          ]
        },
        61: {
          dir: s,
          HW: [[666, w]],
          stretch: { left: [57344, e], rep: [57345, e], right: [57346, e] }
        },
        91: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { bot: [9123, v], ext: [9122, v], top: [9121, v] }
        },
        92: {
          dir: d,
          HW: [
            [1000, w],
            [1310, n],
            [1716, m],
            [1771, m, 1.032],
            [2248, l],
            [2944, j],
            [3858, h],
            [5054, g],
            [6620, e]
          ]
        },
        93: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { bot: [9126, v], ext: [9125, v], top: [9124, v] }
        },
        94: { alias: 770, dir: s },
        95: { alias: 818, dir: s },
        123: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: {
            bot: [9129, v],
            ext: [57347, e],
            mid: [9128, v],
            top: [9127, v]
          }
        },
        124: {
          dir: d,
          HW: [
            [1000, w],
            [1202, n],
            [1444, m],
            [1734, l],
            [2084, j],
            [2502, h],
            [3004, g],
            [3606, e]
          ],
          stretch: { bot: [57348, e], ext: [57349, e], top: [57350, e] }
        },
        125: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: {
            bot: [9133, v],
            ext: [57351, e],
            mid: [9132, v],
            top: [9131, v]
          }
        },
        126: { alias: 771, dir: s },
        175: { alias: 818, dir: s },
        710: { alias: 770, dir: s },
        713: { alias: 8722, dir: s },
        732: { alias: 771, dir: s },
        770: {
          dir: s,
          HW: [
            [364, w],
            [644, n],
            [768, m],
            [919, l],
            [1100, j],
            [1320, h],
            [1581, g],
            [1896, e]
          ]
        },
        771: {
          dir: s,
          HW: [
            [370, w],
            [652, n],
            [778, m],
            [931, l],
            [1115, j],
            [1335, h],
            [1599, g],
            [1915, e]
          ]
        },
        8722: { HW: [], stretch: { rep: [8722, w, 0, 0, 0, -0.31, -0.31] } },
        774: u,
        780: {
          dir: s,
          HW: [
            [364, w],
            [644, n],
            [768, m],
            [919, l],
            [1100, j],
            [1320, h],
            [1581, g],
            [1896, e]
          ]
        },
        785: u,
        812: u,
        813: u,
        814: u,
        815: u,
        816: u,
        818: {
          dir: s,
          HW: [[392, o], [568, n]],
          stretch: { left: [57589, e], rep: [57590, e], right: [57591, e] }
        },
        819: u,
        831: u,
        8213: { alias: 8722, dir: s },
        8214: {
          dir: d,
          HW: [
            [1000, w],
            [1202, n],
            [1444, m],
            [1734, l],
            [2084, j],
            [2502, h],
            [3004, g],
            [3606, e]
          ],
          stretch: { bot: [57642, e], ext: [57643, e], top: [57644, e] }
        },
        8215: { alias: 8722, dir: s },
        8254: { alias: 8722, dir: s },
        8260: {
          dir: d,
          HW: [
            [1000, w],
            [1310, n],
            [1716, m],
            [2248, l],
            [2944, j],
            [3858, h],
            [5054, g],
            [6620, e]
          ]
        },
        8400: u,
        8401: u,
        8406: u,
        8407: u,
        8417: u,
        8425: u,
        8428: u,
        8429: u,
        8430: u,
        8431: u,
        8592: {
          dir: s,
          HW: [[885, w], [1351, n]],
          stretch: { left: [57379, e], rep: [57380, e], right: [57381, e] }
        },
        8593: {
          dir: d,
          HW: [[882, w], [1348, n]],
          stretch: { bot: [57385, e], ext: [57386, e], top: [57387, e] }
        },
        8594: {
          dir: s,
          HW: [[885, w], [1351, n]],
          stretch: { left: [57382, e], rep: [57383, e], right: [57384, e] }
        },
        8595: {
          dir: d,
          HW: [[882, w], [1348, n]],
          stretch: { bot: [57388, e], ext: [57389, e], top: [57390, e] }
        },
        8596: {
          dir: s,
          HW: [[884, w], [1330, n]],
          stretch: { left: [57399, e], rep: [57400, e], right: [57401, e] }
        },
        8597: {
          dir: d,
          HW: [[1014, w], [1014, n]],
          stretch: { bot: [57402, e], ext: [57403, e], top: [57404, e] }
        },
        8598: k,
        8599: k,
        8600: k,
        8601: k,
        8602: u,
        8603: u,
        8606: u,
        8607: k,
        8608: u,
        8609: k,
        8610: u,
        8611: u,
        8612: {
          dir: s,
          HW: [[865, x], [1331, n]],
          stretch: { left: [57427, e], rep: [57428, e], right: [57429, e] }
        },
        8613: k,
        8614: {
          dir: s,
          HW: [[865, w], [1331, n]],
          stretch: { left: [57430, e], rep: [57431, e], right: [57432, e] }
        },
        8615: k,
        8617: u,
        8618: u,
        8619: u,
        8620: u,
        8621: u,
        8622: u,
        8624: k,
        8625: k,
        8626: k,
        8627: k,
        8630: u,
        8631: u,
        8636: u,
        8637: u,
        8638: k,
        8639: k,
        8640: u,
        8641: u,
        8642: k,
        8643: k,
        8644: u,
        8645: k,
        8646: u,
        8647: u,
        8648: k,
        8649: u,
        8650: k,
        8651: u,
        8652: u,
        8653: u,
        8654: u,
        8655: u,
        8656: {
          dir: s,
          HW: [[879, w], [1345, n]],
          stretch: { left: [57511, e], rep: [57512, e], right: [57513, e] }
        },
        8657: {
          dir: d,
          HW: [[879, w], [1345, n]],
          stretch: { bot: [57517, e], ext: [57518, e], top: [57519, e] }
        },
        8658: {
          dir: s,
          HW: [[879, w], [1345, n]],
          stretch: { left: [57514, e], rep: [57515, e], right: [57516, e] }
        },
        8659: {
          dir: d,
          HW: [[879, w], [1345, n]],
          stretch: { bot: [57520, e], ext: [57521, e], top: [57522, e] }
        },
        8660: {
          dir: s,
          HW: [[956, w], [1422, n]],
          stretch: { left: [57523, e], rep: [57524, e], right: [57525, e] }
        },
        8661: {
          dir: d,
          HW: [[956, w], [1422, n]],
          stretch: { bot: [57526, e], ext: [57527, e], top: [57528, e] }
        },
        8662: k,
        8663: k,
        8664: k,
        8665: k,
        8666: u,
        8667: u,
        8668: u,
        8669: u,
        8678: u,
        8679: k,
        8680: u,
        8681: k,
        8691: k,
        8693: k,
        8694: u,
        8719: k,
        8720: k,
        8721: k,
        8722: {
          dir: s,
          HW: [[666, w]],
          stretch: { left: [57639, e], rep: [57640, e], right: [57641, e] }
        },
        8725: { alias: 8260, dir: d },
        8730: {
          dir: d,
          HW: [[1000, w], [1200, n], [1800, m], [2400, l], [3000, j]],
          stretch: { bot: [9143, v], ext: [57651, e], top: [57652, e] }
        },
        8739: {
          dir: d,
          HW: [
            [1000, w],
            [1202, n],
            [1444, m],
            [1734, l],
            [2084, j],
            [2502, h],
            [3004, g],
            [3606, e]
          ],
          stretch: { bot: [57348, e], ext: [57349, e], top: [57350, e] }
        },
        8741: {
          dir: d,
          HW: [
            [1000, w],
            [1202, n],
            [1444, m],
            [1734, l],
            [2084, j],
            [2502, h],
            [3004, g],
            [3606, e]
          ],
          stretch: { bot: [57642, e], ext: [57643, e], top: [57644, e] }
        },
        8747: k,
        8748: k,
        8749: k,
        8750: k,
        8751: k,
        8752: k,
        8753: k,
        8754: k,
        8755: k,
        8801: u,
        8803: u,
        8866: k,
        8867: k,
        8868: k,
        8869: k,
        8896: k,
        8897: k,
        8898: k,
        8899: k,
        8968: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { ext: [9122, v], top: [9121, v] }
        },
        8969: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { ext: [9125, v], top: [9124, v] }
        },
        8970: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { bot: [9123, v], ext: [9122, v] }
        },
        8971: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ],
          stretch: { bot: [9126, v], ext: [9125, v] }
        },
        8978: { alias: 9180, dir: s },
        8994: { alias: 9180, dir: s },
        8995: { alias: 9181, dir: s },
        9001: {
          dir: d,
          HW: [
            [1000, v],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ]
        },
        9002: {
          dir: d,
          HW: [
            [1000, v],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ]
        },
        9130: { dir: d, HW: [[748, v]], stretch: { ext: [9130, v] } },
        9135: { alias: 8722, dir: s },
        9136: {
          dir: d,
          HW: [[750, v, null, 9127]],
          stretch: { top: [9127, v], ext: [9130, v], bot: [9133, v] }
        },
        9137: {
          dir: d,
          HW: [[750, v, null, 9131]],
          stretch: { top: [9131, v], ext: [9130, v], bot: [9129, v] }
        },
        9140: u,
        9141: u,
        9168: {
          dir: d,
          HW: [
            [1000, w, null, 124],
            [1309, w, 1.309, 124],
            [1771, w, 1.771, 124],
            [2233, w, 2.233, 124],
            [2695, w, 2.695, 124]
          ],
          stretch: { ext: [124, w] }
        },
        9180: u,
        9181: u,
        9182: {
          dir: s,
          HW: [
            [492, w],
            [993, n],
            [1494, m],
            [1996, l],
            [2498, j],
            [3000, h],
            [3502, g],
            [4006, e]
          ],
          stretch: {
            left: [57613, e],
            rep: [57614, e],
            mid: [57615, e],
            right: [57616, e]
          }
        },
        9183: {
          dir: s,
          HW: [
            [492, w],
            [993, n],
            [1494, m],
            [1996, l],
            [2498, j],
            [3000, h],
            [3502, g],
            [4006, e]
          ],
          stretch: {
            left: [57617, e],
            rep: [57618, e],
            mid: [57619, e],
            right: [57620, e]
          }
        },
        9184: u,
        9185: u,
        9472: { alias: 8722, dir: s },
        10145: u,
        10214: k,
        10215: k,
        10216: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ]
        },
        10217: {
          dir: d,
          HW: [
            [1000, w],
            [1100, n],
            [1200, m],
            [1450, l],
            [1800, j],
            [2100, h],
            [2400, g],
            [3000, e]
          ]
        },
        10218: k,
        10219: k,
        10222: {
          dir: d,
          HW: [
            [1024, w],
            [1126, n],
            [1228, m],
            [1482, l],
            [1836, j],
            [2140, h],
            [2444, g],
            [3052, e]
          ],
          stretch: { bot: [57601, e], ext: [57602, e], top: [57603, e] }
        },
        10223: {
          dir: d,
          HW: [
            [1024, w],
            [1126, n],
            [1228, m],
            [1482, l],
            [1836, j],
            [2140, h],
            [2444, g],
            [3052, e]
          ],
          stretch: { bot: [57604, e], ext: [57605, e], top: [57606, e] }
        },
        10229: { alias: 8592, dir: s },
        10230: { alias: 8594, dir: s },
        10231: { alias: 8596, dir: s },
        10232: { alias: 8656, dir: s },
        10233: { alias: 8658, dir: s },
        10234: { alias: 8660, dir: s },
        10235: { alias: 8612, dir: s },
        10236: { alias: 8614, dir: s },
        10237: { alias: 10502, dir: s },
        10238: { alias: 10503, dir: s },
        10502: {
          dir: s,
          HW: [[879, x], [1325, n]],
          stretch: { left: [57541, e], rep: [57542, e], right: [57543, e] }
        },
        10503: {
          dir: s,
          HW: [[879, x], [1325, n]],
          stretch: { left: [57544, e], rep: [57545, e], right: [57546, e] }
        },
        10752: k,
        10753: k,
        10754: k,
        10755: k,
        10756: k,
        10757: k,
        10758: k,
        10761: k,
        10764: k,
        10769: k,
        11012: u,
        11013: u,
        11014: k,
        11015: k,
        11020: u,
        11021: k,
        11057: u,
        12296: { alias: 10216, dir: d },
        12297: { alias: 10217, dir: d },
        65079: { alias: 9182, dir: s },
        65080: { alias: 9183, dir: s }
      }
    }
  });
  MathJax.Hub.Register.LoadHook(
    A.fontDir + '/Main/Regular/Main.js',
    function() {
      A.FONTDATA.FONTS[w][8722][0] = A.FONTDATA.FONTS[w][43][0];
      A.FONTDATA.FONTS[w][8722][1] = A.FONTDATA.FONTS[w][43][1];
    }
  );
  MathJax.Hub.Register.LoadHook(
    A.fontDir + '/Size7/Regular/Main.js',
    function() {
      var H;
      H = A.FONTDATA.DELIMITERS[9182].stretch.rep[0];
      A.FONTDATA.FONTS[e][H][0] += 200;
      A.FONTDATA.FONTS[e][H][1] += 200;
      H = A.FONTDATA.DELIMITERS[9183].stretch.rep[0];
      A.FONTDATA.FONTS[e][H][0] += 200;
      A.FONTDATA.FONTS[e][H][1] += 200;
    }
  );
  MathJax.Hub.Register.LoadHook(
    A.fontDir + '/Size1/Regular/Main.js',
    function() {
      A.FONTDATA.FONTS[n][8747][2] -= 425;
      A.FONTDATA.FONTS[n][8748][2] -= 425;
      A.FONTDATA.FONTS[n][8749][2] -= 425;
      A.FONTDATA.FONTS[n][8750][2] -= 425;
      A.FONTDATA.FONTS[n][8751][2] -= 425;
      A.FONTDATA.FONTS[n][8752][2] -= 425;
      A.FONTDATA.FONTS[n][8753][2] -= 425;
      A.FONTDATA.FONTS[n][8754][2] -= 425;
      A.FONTDATA.FONTS[n][8755][2] -= 425;
      A.FONTDATA.FONTS[n][10764][2] -= 425;
      A.FONTDATA.FONTS[n][10769][2] -= 425;
    }
  );
  F.loadComplete(A.fontDir + '/fontdata.js');
})(MathJax.OutputJax.SVG, MathJax.ElementJax.mml, MathJax.Ajax, MathJax.Hub);
