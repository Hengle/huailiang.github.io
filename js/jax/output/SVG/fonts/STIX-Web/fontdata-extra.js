/*
 *  /MathJax/jax/output/SVG/fonts/STIX-Web/fontdata-extra.js
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

(function(L) {
  var B = '2.7.5';
  var t = L.FONTDATA.DELIMITERS;
  var s = 'H',
    f = 'V';
  var ah = [8722, E, 0, 0, 0, -0.26, -0.26];
  var u = 'STIXMathJax_Alphabets-bold-italic',
    G = 'STIXMathJax_Alphabets-bold',
    z = 'STIXMathJax_Alphabets-italic',
    e = 'STIXMathJax_Alphabets',
    S = 'STIXMathJax_Arrows-bold',
    x = 'STIXMathJax_Arrows',
    g = 'STIXMathJax_DoubleStruck-bold-italic',
    i = 'STIXMathJax_DoubleStruck-bold',
    c = 'STIXMathJax_DoubleStruck-italic',
    b = 'STIXMathJax_DoubleStruck',
    q = 'STIXMathJax_Fraktur-bold',
    p = 'STIXMathJax_Fraktur',
    U = 'STIXMathJax_Latin-bold-italic',
    C = 'STIXMathJax_Latin-bold',
    D = 'STIXMathJax_Latin-italic',
    K = 'STIXMathJax_Latin',
    R = 'STIXMathJax_Main-bold-italic',
    ak = 'STIXMathJax_Main-bold',
    P = 'STIXMathJax_Main-italic',
    E = 'STIXMathJax_Main',
    k = 'STIXMathJax_Marks-bold-italic',
    I = 'STIXMathJax_Marks-bold',
    m = 'STIXMathJax_Marks-italic',
    aa = 'STIXMathJax_Marks',
    ai = 'STIXMathJax_Misc-bold-italic',
    h = 'STIXMathJax_Misc-bold',
    ae = 'STIXMathJax_Misc-italic',
    y = 'STIXMathJax_Misc',
    al = 'STIXMathJax_Monospace',
    ac = 'STIXMathJax_Normal-bold-italic',
    Q = 'STIXMathJax_Normal-bold',
    T = 'STIXMathJax_Normal-italic',
    j = 'STIXMathJax_Operators-bold',
    w = 'STIXMathJax_Operators',
    N = 'STIXMathJax_SansSerif-bold-italic',
    A = 'STIXMathJax_SansSerif-bold',
    am = 'STIXMathJax_SansSerif-italic',
    d = 'STIXMathJax_SansSerif',
    a = 'STIXMathJax_Script-bold-italic',
    O = 'STIXMathJax_Script-italic',
    X = 'STIXMathJax_Script',
    r = 'STIXMathJax_Shapes-bold-italic',
    J = 'STIXMathJax_Shapes-bold',
    l = 'STIXMathJax_Shapes',
    af = 'STIXMathJax_Size1',
    ad = 'STIXMathJax_Size2',
    ab = 'STIXMathJax_Size3',
    Z = 'STIXMathJax_Size4',
    Y = 'STIXMathJax_Size5',
    ag = 'STIXMathJax_Symbols-bold',
    v = 'STIXMathJax_Symbols',
    F = 'STIXMathJax_Variants-bold-italic',
    o = 'STIXMathJax_Variants-bold',
    aj = 'STIXMathJax_Variants-italic',
    M = 'STIXMathJax_Variants';
  var n = {
    61: { dir: s, HW: [[589, E]], stretch: { rep: [61, E] } },
    711: {
      dir: s,
      HW: [[311, E], [560, af], [979, ad], [1460, ab], [1886, Z], [2328, Y]]
    },
    717: { dir: s, HW: [[312, aa]], stretch: { rep: [717, aa] } },
    759: {
      dir: s,
      HW: [[330, aa], [560, af], [979, ad], [1460, ab], [1886, Z], [2328, Y]]
    },
    8400: {
      dir: s,
      HW: [[436, aa], [871, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { left: [57365, Y], rep: [57366, Y] }
    },
    8401: {
      dir: s,
      HW: [[436, aa], [871, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { rep: [57366, Y], right: [57367, Y] }
    },
    8406: {
      dir: s,
      HW: [[436, aa], [872, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { left: [57368, Y], rep: [57366, Y] }
    },
    8417: {
      dir: s,
      HW: [[478, aa]],
      stretch: { left: [57368, Y], rep: [57366, Y], right: [57369, Y] }
    },
    8428: {
      dir: s,
      HW: [[436, aa], [871, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { rep: [57370, Y], right: [57371, Y] }
    },
    8429: {
      dir: s,
      HW: [[436, aa], [871, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { left: [57372, Y], rep: [57370, Y] }
    },
    8430: {
      dir: s,
      HW: [[436, aa], [872, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { left: [57373, Y], rep: [57370, Y] }
    },
    8431: {
      dir: s,
      HW: [[436, aa], [872, af], [1308, ad], [1744, ab], [2180, Z], [3000, Y]],
      stretch: { rep: [57370, Y], right: [57374, Y] }
    },
    8512: { dir: f, HW: [[1022, b], [1450, af]] },
    8606: { dir: s, HW: [[786, E]], stretch: { left: [8606, E], rep: ah } },
    8607: {
      dir: f,
      HW: [[816, x]],
      stretch: { ext: [9168, E], top: [8607, x] }
    },
    8608: { dir: s, HW: [[786, E]], stretch: { right: [8608, E], rep: ah } },
    8609: {
      dir: f,
      HW: [[816, x]],
      stretch: { ext: [9168, E], bot: [8609, x] }
    },
    8612: {
      dir: s,
      HW: [[787, x]],
      stretch: { left: [8592, E], rep: [9135, v], right: [10206, v] }
    },
    8613: {
      dir: f,
      HW: [[816, x]],
      stretch: {
        bot: [95, E, 0.05, -0.01, 0.8],
        ext: [9168, E],
        top: [8593, E]
      }
    },
    8614: {
      dir: s,
      HW: [[787, E]],
      stretch: { left: [10205, v], rep: [9135, v], right: [8594, E] }
    },
    8615: {
      dir: f,
      HW: [[816, x]],
      stretch: { top: [8868, ak, 0.04, 0, 0.6], ext: [9168, E], bot: [8595, E] }
    },
    8616: {
      dir: f,
      HW: [[816, x]],
      stretch: { top: [8593, E], ext: [9168, E], bot: [10515, x] }
    },
    8617: {
      dir: s,
      HW: [[786, E]],
      stretch: { left: [8592, E], rep: ah, right: [57525, x] }
    },
    8618: {
      dir: s,
      HW: [[786, E]],
      stretch: { left: [57524, x], rep: ah, right: [8594, E] }
    },
    8624: {
      dir: f,
      HW: [[818, E]],
      stretch: { top: [8624, E], ext: [9168, E, 0.152] }
    },
    8625: {
      dir: f,
      HW: [[818, E]],
      stretch: { top: [8625, E], ext: [9168, E, -0.195] }
    },
    8626: {
      dir: f,
      HW: [[816, x]],
      stretch: { bot: [8626, x], ext: [9168, E, 0.152] }
    },
    8627: {
      dir: f,
      HW: [[816, x]],
      stretch: { bot: [8627, x], ext: [9168, E, -0.195] }
    },
    8628: {
      dir: s,
      HW: [[786, x]],
      stretch: { rep: [8722, E, 0, 0.4], right: [8628, x] }
    },
    8629: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [8629, x], ext: [9168, E, 0.57] }
    },
    8636: {
      dir: s,
      HW: [[847, E]],
      stretch: { left: [8636, E], rep: [9135, v] }
    },
    8637: {
      dir: s,
      HW: [[847, E]],
      stretch: { left: [8637, E], rep: [9135, v] }
    },
    8638: {
      dir: f,
      HW: [[818, E]],
      stretch: { ext: [9168, E], top: [8638, E] }
    },
    8639: {
      dir: f,
      HW: [[818, E]],
      stretch: { ext: [9168, E], top: [8639, E] }
    },
    8640: {
      dir: s,
      HW: [[847, E]],
      stretch: { rep: [9135, v], right: [8640, E] }
    },
    8641: { dir: s, HW: [[847, E]], stretch: { right: [8641, E], rep: ah } },
    8642: {
      dir: f,
      HW: [[818, E]],
      stretch: { bot: [8642, E], ext: [9168, E] }
    },
    8643: {
      dir: f,
      HW: [[818, E]],
      stretch: { bot: [8643, E], ext: [9168, E] }
    },
    8651: {
      dir: s,
      HW: [[786, E]],
      stretch: { left: [10602, x], rep: [61, E], right: [10605, x] }
    },
    8652: {
      dir: s,
      HW: [[786, E]],
      stretch: { left: [10603, x], rep: [61, E], right: [10604, x] }
    },
    8666: {
      dir: s,
      HW: [[806, E]],
      stretch: { left: [8666, E], rep: [57377, Y] }
    },
    8667: {
      dir: s,
      HW: [[806, E]],
      stretch: { rep: [57377, Y], right: [8667, E] }
    },
    8672: {
      dir: s,
      HW: [[806, E]],
      stretch: { left: [8672, E], rep: [57633, x] }
    },
    8673: {
      dir: f,
      HW: [[818, x]],
      stretch: { ext: [57645, x], top: [8673, x] }
    },
    8674: {
      dir: s,
      HW: [[806, E]],
      stretch: { right: [8674, E], rep: [57646, x] }
    },
    8675: {
      dir: f,
      HW: [[818, x]],
      stretch: { ext: [57644, x], bot: [8675, x] }
    },
    8676: { dir: s, HW: [[806, x]], stretch: { left: [8676, x], rep: ah } },
    8677: { dir: s, HW: [[806, x]], stretch: { right: [8677, x], rep: ah } },
    8701: { dir: s, HW: [[806, x]], stretch: { left: [8701, x], rep: ah } },
    8702: { dir: s, HW: [[806, x]], stretch: { right: [8702, x], rep: ah } },
    8703: {
      dir: s,
      HW: [[886, x]],
      stretch: { left: [8701, x], rep: ah, right: [8702, x] }
    },
    8719: { dir: f, HW: [[1022, w], [1451, af]] },
    8720: { dir: f, HW: [[1022, w], [1451, af]] },
    8721: { dir: f, HW: [[1022, w], [1450, af]] },
    8731: {
      dir: f,
      HW: [[1232, w], [1847, af], [2460, ad], [3075, ab]],
      stretch: { bot: [57381, Y], ext: [57379, Y], top: [57380, Y] }
    },
    8732: {
      dir: f,
      HW: [[1232, w], [1847, af], [2460, ad], [3075, ab]],
      stretch: { bot: [57382, Y], ext: [57379, Y], top: [57380, Y] }
    },
    8747: {
      dir: f,
      HW: [[607, E], [979, af]],
      stretch: { top: [57404, Y], ext: [57405, Y], bot: [57406, Y] }
    },
    8748: { dir: f, HW: [[1144, w], [2269, af]] },
    8749: { dir: f, HW: [[1144, w], [2269, af]] },
    8750: { dir: f, HW: [[1144, w], [2269, af]] },
    8751: { dir: f, HW: [[1144, w], [2269, af]] },
    8752: { dir: f, HW: [[1144, w], [2269, af]] },
    8753: { dir: f, HW: [[1144, w], [2269, af]] },
    8754: { dir: f, HW: [[1144, w], [2269, af]] },
    8755: { dir: f, HW: [[1144, w], [2269, af]] },
    8896: { dir: f, HW: [[1022, w], [1451, af]] },
    8897: { dir: f, HW: [[1022, w], [1451, af]] },
    8898: { dir: f, HW: [[1032, w], [1461, af]] },
    8899: { dir: f, HW: [[1032, w], [1461, af]] },
    9130: {
      dir: f,
      HW: [[1010, Y, null, 57357]],
      stretch: { top: [57357, Y], ext: [57357, Y], bot: [57357, Y] }
    },
    9140: {
      dir: s,
      HW: [[816, E], [925, af], [1458, ad], [1991, ab], [2524, Z], [3057, Y]],
      stretch: { left: [57383, Y], rep: [57384, Y], right: [57385, Y] }
    },
    9141: {
      dir: s,
      HW: [[816, E], [925, af], [1458, ad], [1991, ab], [2524, Z], [3057, Y]],
      stretch: { left: [57386, Y], rep: [57387, Y], right: [57388, Y] }
    },
    9168: {
      dir: f,
      HW: [
        [304, E],
        [690, af],
        [879, ad],
        [1350, ad, 1.536],
        [1827, ad, 2.078],
        [2303, ad, 2.62],
        [2780, ad, 3.162]
      ],
      stretch: { ext: [8739, E] }
    },
    9180: {
      dir: s,
      HW: [[1000, E], [926, af], [1460, ad], [1886, ab], [2328, Z], [3237, Y]],
      stretch: { left: [57389, Y], rep: [57384, Y], right: [57390, Y] }
    },
    9181: {
      dir: s,
      HW: [[1000, E], [926, af], [1460, ad], [1886, ab], [2328, Z], [3237, Y]],
      stretch: { left: [57391, Y], rep: [57387, Y], right: [57392, Y] }
    },
    9184: {
      dir: s,
      HW: [[1000, E], [1460, af], [1886, ad], [2312, ab], [2738, Z], [3164, Y]]
    },
    9185: {
      dir: s,
      HW: [[1000, E], [1460, af], [1886, ad], [2312, ab], [2738, Z], [3164, Y]]
    },
    10098: {
      dir: f,
      HW: [[932, y], [1230, af], [1845, ad], [2459, ab], [3075, Z]]
    },
    10099: {
      dir: f,
      HW: [[932, y], [1230, af], [1845, ad], [2459, ab], [3075, Z]]
    },
    10214: {
      dir: f,
      HW: [[930, v], [1230, af], [1845, ad], [2460, ab], [3075, Z]],
      stretch: { top: [9555, l], ext: [9553, l], bot: [9561, l] }
    },
    10215: {
      dir: f,
      HW: [[930, v], [1230, af], [1845, ad], [2460, ab], [3075, Z]],
      stretch: { top: [9558, l], ext: [9553, l], bot: [9564, l] }
    },
    10218: {
      dir: f,
      HW: [[932, v], [1230, af], [1845, ad], [2461, ab], [3075, Z]]
    },
    10219: {
      dir: f,
      HW: [[932, v], [1230, af], [1845, ad], [2461, ab], [3075, Z]]
    },
    10224: {
      dir: f,
      HW: [[818, x]],
      stretch: { ext: [57399, Y], top: [10224, x] }
    },
    10225: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [10225, x], ext: [57399, Y] }
    },
    10502: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [8656, E], rep: [61, E], right: [10980, w, 0, -0.09] }
    },
    10503: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [8872, E, 0, -0.09], rep: [61, E], right: [8658, E] }
    },
    10506: {
      dir: f,
      HW: [[818, x]],
      stretch: { ext: [57400, Y], top: [10506, x] }
    },
    10507: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [10507, x], ext: [57400, Y] }
    },
    10514: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [10514, x], ext: [9168, E] }
    },
    10515: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [10515, x], ext: [9168, E] }
    },
    10574: {
      dir: s,
      HW: [[850, x]],
      stretch: { left: [8636, E], rep: ah, right: [8640, E] }
    },
    10575: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [8638, E], ext: [9168, E], bot: [8642, E] }
    },
    10576: {
      dir: s,
      HW: [[850, x]],
      stretch: { left: [8637, E], rep: ah, right: [8641, E] }
    },
    10577: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [8639, E], ext: [9168, E], bot: [8643, E] }
    },
    10578: { dir: s, HW: [[816, x]], stretch: { left: [10578, x], rep: ah } },
    10579: { dir: s, HW: [[816, x]], stretch: { right: [10579, x], rep: ah } },
    10580: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [10580, x], ext: [9168, E] }
    },
    10581: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [10581, x], ext: [9168, E] }
    },
    10582: { dir: s, HW: [[816, x]], stretch: { left: [10582, x], rep: ah } },
    10583: { dir: s, HW: [[816, x]], stretch: { right: [10583, x], rep: ah } },
    10584: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [10584, x], ext: [9168, E] }
    },
    10585: {
      dir: f,
      HW: [[818, x]],
      stretch: { bot: [10585, x], ext: [9168, E] }
    },
    10586: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [8636, E], rep: ah, right: [8867, ak, 0, 0.1, 0.6] }
    },
    10587: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [57526, x], rep: ah, right: [8640, E] }
    },
    10588: {
      dir: f,
      HW: [[818, x]],
      stretch: {
        bot: [95, E, 0.05, -0.01, 0.8],
        ext: [9168, E],
        top: [8638, E]
      }
    },
    10589: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [8868, ak, 0.04, 0, 0.6], ext: [9168, E], bot: [8642, E] }
    },
    10590: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [8637, E], rep: ah, right: [8867, ak, 0, 0.1, 0.6] }
    },
    10591: {
      dir: s,
      HW: [[816, x]],
      stretch: { left: [57526, x], rep: ah, right: [8641, E] }
    },
    10592: {
      dir: f,
      HW: [[818, x]],
      stretch: {
        bot: [95, E, 0.05, -0.01, 0.8],
        ext: [9168, E],
        top: [8639, E]
      }
    },
    10593: {
      dir: f,
      HW: [[818, x]],
      stretch: { top: [8868, ak, 0.04, 0, 0.6], ext: [9168, E], bot: [8643, E] }
    },
    10624: { dir: f, HW: [[884, v]], stretch: { ext: [10624, v] } },
    10627: {
      dir: f,
      HW: [[932, v], [1230, af], [1845, ad], [2460, ab], [3075, Z]]
    },
    10628: {
      dir: f,
      HW: [[932, v], [1230, af], [1845, ad], [2460, ab], [3075, Z]]
    },
    10629: {
      dir: f,
      HW: [[932, v], [1230, af], [1848, ad], [2459, ab], [3075, Z]]
    },
    10630: {
      dir: f,
      HW: [[932, v], [1230, af], [1848, ad], [2459, ab], [3075, Z]]
    },
    10647: {
      dir: f,
      HW: [[932, E]],
      stretch: {
        top: [57613, l, 0.1, 0.05],
        ext: [9168, E, -0.1],
        bot: [57612, l, 0.1]
      }
    },
    10648: {
      dir: f,
      HW: [[932, E]],
      stretch: {
        top: [57612, l, -0.1, 0.05],
        ext: [9168, E],
        bot: [57613, l, -0.1]
      }
    },
    10752: { dir: f, HW: [[1022, w], [1451, af]] },
    10753: { dir: f, HW: [[1022, w], [1451, af]] },
    10754: { dir: f, HW: [[1022, w], [1451, af]] },
    10755: { dir: f, HW: [[1032, w], [1461, af]] },
    10756: { dir: f, HW: [[1032, w], [1461, af]] },
    10757: { dir: f, HW: [[1022, w], [1451, af]] },
    10758: { dir: f, HW: [[1022, w], [1451, af]] },
    10759: { dir: f, HW: [[1022, w], [1451, af]] },
    10760: { dir: f, HW: [[1022, w], [1451, af]] },
    10761: { dir: f, HW: [[1022, w], [1451, af]] },
    10762: { dir: f, HW: [[1022, w], [1450, af]] },
    10763: { dir: f, HW: [[1144, w], [2269, af]] },
    10764: { dir: f, HW: [[1144, w], [2269, af]] },
    10765: { dir: f, HW: [[1144, w], [2269, af]] },
    10766: { dir: f, HW: [[1144, w], [2269, af]] },
    10767: { dir: f, HW: [[1144, w], [2269, af]] },
    10768: { dir: f, HW: [[1144, w], [2269, af]] },
    10769: { dir: f, HW: [[1144, w], [2269, af]] },
    10770: { dir: f, HW: [[1144, w], [2269, af]] },
    10771: { dir: f, HW: [[1144, w], [2269, af]] },
    10772: { dir: f, HW: [[1144, w], [2269, af]] },
    10773: { dir: f, HW: [[1144, w], [2269, af]] },
    10774: { dir: f, HW: [[1144, w], [2269, af]] },
    10775: { dir: f, HW: [[1144, w], [2269, af]] },
    10776: { dir: f, HW: [[1144, w], [2269, af]] },
    10777: { dir: f, HW: [[1144, w], [2269, af]] },
    10778: { dir: f, HW: [[1144, w], [2269, af]] },
    10779: { dir: f, HW: [[1267, w], [2426, af]] },
    10780: { dir: f, HW: [[1267, w], [2426, af]] },
    11004: { dir: f, HW: [[1022, w], [1230, af], [1875, ad]] },
    11007: { dir: f, HW: [[1022, w], [1230, af], [1875, ad]] },
    11077: {
      dir: s,
      HW: [[818, l]],
      stretch: { left: [11077, l], rep: [57401, Y] }
    }
  };
  for (var W in n) {
    if (n.hasOwnProperty(W)) {
      t[W] = n[W];
    }
  }
  MathJax.Ajax.loadComplete(L.fontDir + '/fontdata-extra.js');
})(MathJax.OutputJax.SVG);
