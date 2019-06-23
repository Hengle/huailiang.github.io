/*
 *  /MathJax/jax/input/AsciiMath/jax.js
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

(function(aa) {
  var g;
  var X = MathJax.Object.Subclass({
    firstChild: null,
    lastChild: null,
    Init: function() {
      this.childNodes = [];
    },
    appendChild: function(ab) {
      if (ab.parent) {
        ab.parent.removeChild(ab);
      }
      if (this.lastChild) {
        this.lastChild.nextSibling = ab;
      }
      if (!this.firstChild) {
        this.firstChild = ab;
      }
      this.childNodes.push(ab);
      ab.parent = this;
      this.lastChild = ab;
      return ab;
    },
    removeChild: function(ad) {
      for (var ac = 0, ab = this.childNodes.length; ac < ab; ac++) {
        if (this.childNodes[ac] === ad) {
          break;
        }
      }
      if (ac === ab) {
        return;
      }
      this.childNodes.splice(ac, 1);
      if (ad === this.firstChild) {
        this.firstChild = ad.nextSibling;
      }
      if (ad === this.lastChild) {
        if (!this.childNodes.length) {
          this.lastChild = null;
        } else {
          this.lastChild = this.childNodes[this.childNodes.length - 1];
        }
      }
      if (ac) {
        this.childNodes[ac - 1].nextSibling = ad.nextSibling;
      }
      ad.nextSibling = ad.parent = null;
      return ad;
    },
    replaceChild: function(ae, ac) {
      for (var ad = 0, ab = this.childNodes.length; ad < ab; ad++) {
        if (this.childNodes[ad] === ac) {
          break;
        }
      }
      if (ad) {
        this.childNodes[ad - 1].nextSibling = ae;
      } else {
        this.firstChild = ae;
      }
      if (ad >= ab - 1) {
        this.lastChild = ae;
      }
      this.childNodes[ad] = ae;
      ae.nextSibling = ac.nextSibling;
      ac.nextSibling = ac.parent = null;
      return ac;
    },
    hasChildNodes: function(ab) {
      return this.childNodes.length > 0;
    },
    toString: function() {
      return '{' + this.childNodes.join('') + '}';
    }
  });
  var x = function() {
    g = MathJax.ElementJax.mml;
    var ab = g.mbase.prototype.Init;
    g.mbase.Augment({
      firstChild: null,
      lastChild: null,
      nodeValue: null,
      nextSibling: null,
      Init: function() {
        var ac = ab.apply(this, arguments) || this;
        ac.childNodes = ac.data;
        ac.nodeName = ac.type;
        return ac;
      },
      appendChild: function(af) {
        if (af.parent) {
          af.parent.removeChild(af);
        }
        var ad = arguments;
        if (af.isa(X)) {
          ad = af.childNodes;
          af.data = af.childNodes = [];
          af.firstChild = af.lastChild = null;
        }
        for (var ae = 0, ac = ad.length; ae < ac; ae++) {
          af = ad[ae];
          if (this.lastChild) {
            this.lastChild.nextSibling = af;
          }
          if (!this.firstChild) {
            this.firstChild = af;
          }
          this.Append(af);
          this.lastChild = af;
        }
        return af;
      },
      removeChild: function(ae) {
        for (var ad = 0, ac = this.childNodes.length; ad < ac; ad++) {
          if (this.childNodes[ad] === ae) {
            break;
          }
        }
        if (ad === ac) {
          return;
        }
        this.childNodes.splice(ad, 1);
        if (ae === this.firstChild) {
          this.firstChild = ae.nextSibling;
        }
        if (ae === this.lastChild) {
          if (!this.childNodes.length) {
            this.lastChild = null;
          } else {
            this.lastChild = this.childNodes[this.childNodes.length - 1];
          }
        }
        if (ad) {
          this.childNodes[ad - 1].nextSibling = ae.nextSibling;
        }
        ae.nextSibling = ae.parent = null;
        return ae;
      },
      replaceChild: function(af, ad) {
        for (var ae = 0, ac = this.childNodes.length; ae < ac; ae++) {
          if (this.childNodes[ae] === ad) {
            break;
          }
        }
        if (ae) {
          this.childNodes[ae - 1].nextSibling = af;
        } else {
          this.firstChild = af;
        }
        if (ae >= ac - 1) {
          this.lastChild = af;
        }
        this.SetData(ae, af);
        af.nextSibling = ad.nextSibling;
        ad.nextSibling = ad.parent = null;
        return ad;
      },
      hasChildNodes: function(ac) {
        return this.childNodes.length > 0;
      },
      setAttribute: function(ac, ad) {
        this[ac] = ad;
      }
    });
  };
  var Q = {};
  var e = {
    getElementById: true,
    createElementNS: function(ac, ab) {
      var ad = g[ab]();
      if (ab === 'mo' && aa.config.useMathMLspacing) {
        ad.useMMLspacing = 128;
      }
      return ad;
    },
    createTextNode: function(ab) {
      return g.chars(ab).With({ nodeValue: ab });
    },
    createDocumentFragment: function() {
      return X();
    }
  };
  var J = { appName: 'MathJax' };
  var C = 'blue';
  var o = true;
  var v = true;
  var d = '.';
  var f = true;
  var l = J.appName.slice(0, 9) == 'Microsoft';
  function E(ab) {
    if (l) {
      return e.createElement(ab);
    } else {
      return e.createElementNS('http://www.w3.org/1999/xhtml', ab);
    }
  }
  var W = 'http://www.w3.org/1998/Math/MathML';
  function P(ab) {
    if (l) {
      return e.createElement('m:' + ab);
    } else {
      return e.createElementNS(W, ab);
    }
  }
  function O(ab, ad) {
    var ac;
    if (l) {
      ac = e.createElement('m:' + ab);
    } else {
      ac = e.createElementNS(W, ab);
    }
    if (ad) {
      ac.appendChild(ad);
    }
    return ac;
  }
  function u(ab, ac) {
    z.push({ input: ab, tag: 'mo', output: ac, tex: null, ttype: V });
    B();
  }
  function r(ab) {
    z.push(ab);
    B();
  }
  var D = [
    '\uD835\uDC9C',
    '\u212C',
    '\uD835\uDC9E',
    '\uD835\uDC9F',
    '\u2130',
    '\u2131',
    '\uD835\uDCA2',
    '\u210B',
    '\u2110',
    '\uD835\uDCA5',
    '\uD835\uDCA6',
    '\u2112',
    '\u2133',
    '\uD835\uDCA9',
    '\uD835\uDCAA',
    '\uD835\uDCAB',
    '\uD835\uDCAC',
    '\u211B',
    '\uD835\uDCAE',
    '\uD835\uDCAF',
    '\uD835\uDCB0',
    '\uD835\uDCB1',
    '\uD835\uDCB2',
    '\uD835\uDCB3',
    '\uD835\uDCB4',
    '\uD835\uDCB5',
    '\uD835\uDCB6',
    '\uD835\uDCB7',
    '\uD835\uDCB8',
    '\uD835\uDCB9',
    '\u212F',
    '\uD835\uDCBB',
    '\u210A',
    '\uD835\uDCBD',
    '\uD835\uDCBE',
    '\uD835\uDCBF',
    '\uD835\uDCC0',
    '\uD835\uDCC1',
    '\uD835\uDCC2',
    '\uD835\uDCC3',
    '\u2134',
    '\uD835\uDCC5',
    '\uD835\uDCC6',
    '\uD835\uDCC7',
    '\uD835\uDCC8',
    '\uD835\uDCC9',
    '\uD835\uDCCA',
    '\uD835\uDCCB',
    '\uD835\uDCCC',
    '\uD835\uDCCD',
    '\uD835\uDCCE',
    '\uD835\uDCCF'
  ];
  var H = [
    '\uD835\uDD04',
    '\uD835\uDD05',
    '\u212D',
    '\uD835\uDD07',
    '\uD835\uDD08',
    '\uD835\uDD09',
    '\uD835\uDD0A',
    '\u210C',
    '\u2111',
    '\uD835\uDD0D',
    '\uD835\uDD0E',
    '\uD835\uDD0F',
    '\uD835\uDD10',
    '\uD835\uDD11',
    '\uD835\uDD12',
    '\uD835\uDD13',
    '\uD835\uDD14',
    '\u211C',
    '\uD835\uDD16',
    '\uD835\uDD17',
    '\uD835\uDD18',
    '\uD835\uDD19',
    '\uD835\uDD1A',
    '\uD835\uDD1B',
    '\uD835\uDD1C',
    '\u2128',
    '\uD835\uDD1E',
    '\uD835\uDD1F',
    '\uD835\uDD20',
    '\uD835\uDD21',
    '\uD835\uDD22',
    '\uD835\uDD23',
    '\uD835\uDD24',
    '\uD835\uDD25',
    '\uD835\uDD26',
    '\uD835\uDD27',
    '\uD835\uDD28',
    '\uD835\uDD29',
    '\uD835\uDD2A',
    '\uD835\uDD2B',
    '\uD835\uDD2C',
    '\uD835\uDD2D',
    '\uD835\uDD2E',
    '\uD835\uDD2F',
    '\uD835\uDD30',
    '\uD835\uDD31',
    '\uD835\uDD32',
    '\uD835\uDD33',
    '\uD835\uDD34',
    '\uD835\uDD35',
    '\uD835\uDD36',
    '\uD835\uDD37'
  ];
  var w = [
    '\uD835\uDD38',
    '\uD835\uDD39',
    '\u2102',
    '\uD835\uDD3B',
    '\uD835\uDD3C',
    '\uD835\uDD3D',
    '\uD835\uDD3E',
    '\u210D',
    '\uD835\uDD40',
    '\uD835\uDD41',
    '\uD835\uDD42',
    '\uD835\uDD43',
    '\uD835\uDD44',
    '\u2115',
    '\uD835\uDD46',
    '\u2119',
    '\u211A',
    '\u211D',
    '\uD835\uDD4A',
    '\uD835\uDD4B',
    '\uD835\uDD4C',
    '\uD835\uDD4D',
    '\uD835\uDD4E',
    '\uD835\uDD4F',
    '\uD835\uDD50',
    '\u2124',
    '\uD835\uDD52',
    '\uD835\uDD53',
    '\uD835\uDD54',
    '\uD835\uDD55',
    '\uD835\uDD56',
    '\uD835\uDD57',
    '\uD835\uDD58',
    '\uD835\uDD59',
    '\uD835\uDD5A',
    '\uD835\uDD5B',
    '\uD835\uDD5C',
    '\uD835\uDD5D',
    '\uD835\uDD5E',
    '\uD835\uDD5F',
    '\uD835\uDD60',
    '\uD835\uDD61',
    '\uD835\uDD62',
    '\uD835\uDD63',
    '\uD835\uDD64',
    '\uD835\uDD65',
    '\uD835\uDD66',
    '\uD835\uDD67',
    '\uD835\uDD68',
    '\uD835\uDD69',
    '\uD835\uDD6A',
    '\uD835\uDD6B'
  ];
  var c = 0,
    A = 1,
    U = 2,
    i = 3,
    b = 4,
    h = 5,
    a = 6,
    L = 7,
    V = 8,
    m = 9,
    Y = 10,
    K = 15;
  var k = { input: '"', tag: 'mtext', output: 'mbox', tex: null, ttype: Y };
  var z = [
    { input: 'alpha', tag: 'mi', output: '\u03B1', tex: null, ttype: c },
    { input: 'beta', tag: 'mi', output: '\u03B2', tex: null, ttype: c },
    { input: 'chi', tag: 'mi', output: '\u03C7', tex: null, ttype: c },
    { input: 'delta', tag: 'mi', output: '\u03B4', tex: null, ttype: c },
    { input: 'Delta', tag: 'mo', output: '\u0394', tex: null, ttype: c },
    { input: 'epsi', tag: 'mi', output: '\u03B5', tex: 'epsilon', ttype: c },
    { input: 'varepsilon', tag: 'mi', output: '\u025B', tex: null, ttype: c },
    { input: 'eta', tag: 'mi', output: '\u03B7', tex: null, ttype: c },
    { input: 'gamma', tag: 'mi', output: '\u03B3', tex: null, ttype: c },
    { input: 'Gamma', tag: 'mo', output: '\u0393', tex: null, ttype: c },
    { input: 'iota', tag: 'mi', output: '\u03B9', tex: null, ttype: c },
    { input: 'kappa', tag: 'mi', output: '\u03BA', tex: null, ttype: c },
    { input: 'lambda', tag: 'mi', output: '\u03BB', tex: null, ttype: c },
    { input: 'Lambda', tag: 'mo', output: '\u039B', tex: null, ttype: c },
    { input: 'lamda', tag: 'mi', output: '\u03BB', tex: null, ttype: c },
    { input: 'Lamda', tag: 'mo', output: '\u039B', tex: null, ttype: c },
    { input: 'mu', tag: 'mi', output: '\u03BC', tex: null, ttype: c },
    { input: 'nu', tag: 'mi', output: '\u03BD', tex: null, ttype: c },
    { input: 'omega', tag: 'mi', output: '\u03C9', tex: null, ttype: c },
    { input: 'Omega', tag: 'mo', output: '\u03A9', tex: null, ttype: c },
    {
      input: 'phi',
      tag: 'mi',
      output: f ? '\u03D5' : '\u03C6',
      tex: null,
      ttype: c
    },
    {
      input: 'varphi',
      tag: 'mi',
      output: f ? '\u03C6' : '\u03D5',
      tex: null,
      ttype: c
    },
    { input: 'Phi', tag: 'mo', output: '\u03A6', tex: null, ttype: c },
    { input: 'pi', tag: 'mi', output: '\u03C0', tex: null, ttype: c },
    { input: 'Pi', tag: 'mo', output: '\u03A0', tex: null, ttype: c },
    { input: 'psi', tag: 'mi', output: '\u03C8', tex: null, ttype: c },
    { input: 'Psi', tag: 'mi', output: '\u03A8', tex: null, ttype: c },
    { input: 'rho', tag: 'mi', output: '\u03C1', tex: null, ttype: c },
    { input: 'sigma', tag: 'mi', output: '\u03C3', tex: null, ttype: c },
    { input: 'Sigma', tag: 'mo', output: '\u03A3', tex: null, ttype: c },
    { input: 'tau', tag: 'mi', output: '\u03C4', tex: null, ttype: c },
    { input: 'theta', tag: 'mi', output: '\u03B8', tex: null, ttype: c },
    { input: 'vartheta', tag: 'mi', output: '\u03D1', tex: null, ttype: c },
    { input: 'Theta', tag: 'mo', output: '\u0398', tex: null, ttype: c },
    { input: 'upsilon', tag: 'mi', output: '\u03C5', tex: null, ttype: c },
    { input: 'xi', tag: 'mi', output: '\u03BE', tex: null, ttype: c },
    { input: 'Xi', tag: 'mo', output: '\u039E', tex: null, ttype: c },
    { input: 'zeta', tag: 'mi', output: '\u03B6', tex: null, ttype: c },
    { input: '*', tag: 'mo', output: '\u22C5', tex: 'cdot', ttype: c },
    { input: '**', tag: 'mo', output: '\u2217', tex: 'ast', ttype: c },
    { input: '***', tag: 'mo', output: '\u22C6', tex: 'star', ttype: c },
    { input: '//', tag: 'mo', output: '/', tex: null, ttype: c },
    { input: '\\\\', tag: 'mo', output: '\\', tex: 'backslash', ttype: c },
    { input: 'setminus', tag: 'mo', output: '\\', tex: null, ttype: c },
    { input: 'xx', tag: 'mo', output: '\u00D7', tex: 'times', ttype: c },
    { input: '|><', tag: 'mo', output: '\u22C9', tex: 'ltimes', ttype: c },
    { input: '><|', tag: 'mo', output: '\u22CA', tex: 'rtimes', ttype: c },
    { input: '|><|', tag: 'mo', output: '\u22C8', tex: 'bowtie', ttype: c },
    { input: '-:', tag: 'mo', output: '\u00F7', tex: 'div', ttype: c },
    { input: 'divide', tag: 'mo', output: '-:', tex: null, ttype: V },
    { input: '@', tag: 'mo', output: '\u2218', tex: 'circ', ttype: c },
    { input: 'o+', tag: 'mo', output: '\u2295', tex: 'oplus', ttype: c },
    { input: 'ox', tag: 'mo', output: '\u2297', tex: 'otimes', ttype: c },
    { input: 'o.', tag: 'mo', output: '\u2299', tex: 'odot', ttype: c },
    { input: 'sum', tag: 'mo', output: '\u2211', tex: null, ttype: L },
    { input: 'prod', tag: 'mo', output: '\u220F', tex: null, ttype: L },
    { input: '^^', tag: 'mo', output: '\u2227', tex: 'wedge', ttype: c },
    { input: '^^^', tag: 'mo', output: '\u22C0', tex: 'bigwedge', ttype: L },
    { input: 'vv', tag: 'mo', output: '\u2228', tex: 'vee', ttype: c },
    { input: 'vvv', tag: 'mo', output: '\u22C1', tex: 'bigvee', ttype: L },
    { input: 'nn', tag: 'mo', output: '\u2229', tex: 'cap', ttype: c },
    { input: 'nnn', tag: 'mo', output: '\u22C2', tex: 'bigcap', ttype: L },
    { input: 'uu', tag: 'mo', output: '\u222A', tex: 'cup', ttype: c },
    { input: 'uuu', tag: 'mo', output: '\u22C3', tex: 'bigcup', ttype: L },
    { input: '!=', tag: 'mo', output: '\u2260', tex: 'ne', ttype: c },
    { input: ':=', tag: 'mo', output: ':=', tex: null, ttype: c },
    { input: 'lt', tag: 'mo', output: '<', tex: null, ttype: c },
    { input: '<=', tag: 'mo', output: '\u2264', tex: 'le', ttype: c },
    { input: 'lt=', tag: 'mo', output: '\u2264', tex: 'leq', ttype: c },
    { input: 'gt', tag: 'mo', output: '>', tex: null, ttype: c },
    { input: '>=', tag: 'mo', output: '\u2265', tex: 'ge', ttype: c },
    { input: 'gt=', tag: 'mo', output: '\u2265', tex: 'geq', ttype: c },
    { input: '-<', tag: 'mo', output: '\u227A', tex: 'prec', ttype: c },
    { input: '-lt', tag: 'mo', output: '\u227A', tex: null, ttype: c },
    { input: '>-', tag: 'mo', output: '\u227B', tex: 'succ', ttype: c },
    { input: '-<=', tag: 'mo', output: '\u2AAF', tex: 'preceq', ttype: c },
    { input: '>-=', tag: 'mo', output: '\u2AB0', tex: 'succeq', ttype: c },
    { input: 'in', tag: 'mo', output: '\u2208', tex: null, ttype: c },
    { input: '!in', tag: 'mo', output: '\u2209', tex: 'notin', ttype: c },
    { input: 'sub', tag: 'mo', output: '\u2282', tex: 'subset', ttype: c },
    { input: 'sup', tag: 'mo', output: '\u2283', tex: 'supset', ttype: c },
    { input: 'sube', tag: 'mo', output: '\u2286', tex: 'subseteq', ttype: c },
    { input: 'supe', tag: 'mo', output: '\u2287', tex: 'supseteq', ttype: c },
    { input: '-=', tag: 'mo', output: '\u2261', tex: 'equiv', ttype: c },
    { input: '~=', tag: 'mo', output: '\u2245', tex: 'cong', ttype: c },
    { input: '~~', tag: 'mo', output: '\u2248', tex: 'approx', ttype: c },
    { input: 'prop', tag: 'mo', output: '\u221D', tex: 'propto', ttype: c },
    { input: 'and', tag: 'mtext', output: 'and', tex: null, ttype: a },
    { input: 'or', tag: 'mtext', output: 'or', tex: null, ttype: a },
    { input: 'not', tag: 'mo', output: '\u00AC', tex: 'neg', ttype: c },
    { input: '=>', tag: 'mo', output: '\u21D2', tex: 'implies', ttype: c },
    { input: 'if', tag: 'mo', output: 'if', tex: null, ttype: a },
    { input: '<=>', tag: 'mo', output: '\u21D4', tex: 'iff', ttype: c },
    { input: 'AA', tag: 'mo', output: '\u2200', tex: 'forall', ttype: c },
    { input: 'EE', tag: 'mo', output: '\u2203', tex: 'exists', ttype: c },
    { input: '_|_', tag: 'mo', output: '\u22A5', tex: 'bot', ttype: c },
    { input: 'TT', tag: 'mo', output: '\u22A4', tex: 'top', ttype: c },
    { input: '|--', tag: 'mo', output: '\u22A2', tex: 'vdash', ttype: c },
    { input: '|==', tag: 'mo', output: '\u22A8', tex: 'models', ttype: c },
    { input: '(', tag: 'mo', output: '(', tex: 'left(', ttype: b },
    { input: ')', tag: 'mo', output: ')', tex: 'right)', ttype: h },
    { input: '[', tag: 'mo', output: '[', tex: 'left[', ttype: b },
    { input: ']', tag: 'mo', output: ']', tex: 'right]', ttype: h },
    { input: '{', tag: 'mo', output: '{', tex: null, ttype: b },
    { input: '}', tag: 'mo', output: '}', tex: null, ttype: h },
    { input: '|', tag: 'mo', output: '|', tex: null, ttype: m },
    { input: ':|:', tag: 'mo', output: '|', tex: null, ttype: c },
    { input: '|:', tag: 'mo', output: '|', tex: null, ttype: b },
    { input: ':|', tag: 'mo', output: '|', tex: null, ttype: h },
    { input: '(:', tag: 'mo', output: '\u2329', tex: 'langle', ttype: b },
    { input: ':)', tag: 'mo', output: '\u232A', tex: 'rangle', ttype: h },
    { input: '<<', tag: 'mo', output: '\u2329', tex: null, ttype: b },
    { input: '>>', tag: 'mo', output: '\u232A', tex: null, ttype: h },
    {
      input: '{:',
      tag: 'mo',
      output: '{:',
      tex: null,
      ttype: b,
      invisible: true
    },
    {
      input: ':}',
      tag: 'mo',
      output: ':}',
      tex: null,
      ttype: h,
      invisible: true
    },
    { input: 'int', tag: 'mo', output: '\u222B', tex: null, ttype: c },
    { input: 'dx', tag: 'mi', output: '{:d x:}', tex: null, ttype: V },
    { input: 'dy', tag: 'mi', output: '{:d y:}', tex: null, ttype: V },
    { input: 'dz', tag: 'mi', output: '{:d z:}', tex: null, ttype: V },
    { input: 'dt', tag: 'mi', output: '{:d t:}', tex: null, ttype: V },
    { input: 'oint', tag: 'mo', output: '\u222E', tex: null, ttype: c },
    { input: 'del', tag: 'mo', output: '\u2202', tex: 'partial', ttype: c },
    { input: 'grad', tag: 'mo', output: '\u2207', tex: 'nabla', ttype: c },
    { input: '+-', tag: 'mo', output: '\u00B1', tex: 'pm', ttype: c },
    { input: 'O/', tag: 'mo', output: '\u2205', tex: 'emptyset', ttype: c },
    { input: 'oo', tag: 'mo', output: '\u221E', tex: 'infty', ttype: c },
    { input: 'aleph', tag: 'mo', output: '\u2135', tex: null, ttype: c },
    { input: '...', tag: 'mo', output: '...', tex: 'ldots', ttype: c },
    { input: ':.', tag: 'mo', output: '\u2234', tex: 'therefore', ttype: c },
    { input: ":'", tag: 'mo', output: '\u2235', tex: 'because', ttype: c },
    { input: '/_', tag: 'mo', output: '\u2220', tex: 'angle', ttype: c },
    { input: '/_\\', tag: 'mo', output: '\u25B3', tex: 'triangle', ttype: c },
    { input: "'", tag: 'mo', output: '\u2032', tex: 'prime', ttype: c },
    {
      input: 'tilde',
      tag: 'mover',
      output: '~',
      tex: null,
      ttype: A,
      acc: true
    },
    { input: '\\ ', tag: 'mo', output: '\u00A0', tex: null, ttype: c },
    { input: 'frown', tag: 'mo', output: '\u2322', tex: null, ttype: c },
    { input: 'quad', tag: 'mo', output: '\u00A0\u00A0', tex: null, ttype: c },
    {
      input: 'qquad',
      tag: 'mo',
      output: '\u00A0\u00A0\u00A0\u00A0',
      tex: null,
      ttype: c
    },
    { input: 'cdots', tag: 'mo', output: '\u22EF', tex: null, ttype: c },
    { input: 'vdots', tag: 'mo', output: '\u22EE', tex: null, ttype: c },
    { input: 'ddots', tag: 'mo', output: '\u22F1', tex: null, ttype: c },
    { input: 'diamond', tag: 'mo', output: '\u22C4', tex: null, ttype: c },
    { input: 'square', tag: 'mo', output: '\u25A1', tex: null, ttype: c },
    { input: '|__', tag: 'mo', output: '\u230A', tex: 'lfloor', ttype: c },
    { input: '__|', tag: 'mo', output: '\u230B', tex: 'rfloor', ttype: c },
    { input: '|~', tag: 'mo', output: '\u2308', tex: 'lceiling', ttype: c },
    { input: '~|', tag: 'mo', output: '\u2309', tex: 'rceiling', ttype: c },
    { input: 'CC', tag: 'mo', output: '\u2102', tex: null, ttype: c },
    { input: 'NN', tag: 'mo', output: '\u2115', tex: null, ttype: c },
    { input: 'QQ', tag: 'mo', output: '\u211A', tex: null, ttype: c },
    { input: 'RR', tag: 'mo', output: '\u211D', tex: null, ttype: c },
    { input: 'ZZ', tag: 'mo', output: '\u2124', tex: null, ttype: c },
    { input: 'f', tag: 'mi', output: 'f', tex: null, ttype: A, func: true },
    { input: 'g', tag: 'mi', output: 'g', tex: null, ttype: A, func: true },
    { input: 'lim', tag: 'mo', output: 'lim', tex: null, ttype: L },
    { input: 'Lim', tag: 'mo', output: 'Lim', tex: null, ttype: L },
    { input: 'sin', tag: 'mo', output: 'sin', tex: null, ttype: A, func: true },
    { input: 'cos', tag: 'mo', output: 'cos', tex: null, ttype: A, func: true },
    { input: 'tan', tag: 'mo', output: 'tan', tex: null, ttype: A, func: true },
    {
      input: 'sinh',
      tag: 'mo',
      output: 'sinh',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'cosh',
      tag: 'mo',
      output: 'cosh',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'tanh',
      tag: 'mo',
      output: 'tanh',
      tex: null,
      ttype: A,
      func: true
    },
    { input: 'cot', tag: 'mo', output: 'cot', tex: null, ttype: A, func: true },
    { input: 'sec', tag: 'mo', output: 'sec', tex: null, ttype: A, func: true },
    { input: 'csc', tag: 'mo', output: 'csc', tex: null, ttype: A, func: true },
    {
      input: 'arcsin',
      tag: 'mo',
      output: 'arcsin',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'arccos',
      tag: 'mo',
      output: 'arccos',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'arctan',
      tag: 'mo',
      output: 'arctan',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'coth',
      tag: 'mo',
      output: 'coth',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'sech',
      tag: 'mo',
      output: 'sech',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'csch',
      tag: 'mo',
      output: 'csch',
      tex: null,
      ttype: A,
      func: true
    },
    { input: 'exp', tag: 'mo', output: 'exp', tex: null, ttype: A, func: true },
    {
      input: 'abs',
      tag: 'mo',
      output: 'abs',
      tex: null,
      ttype: A,
      rewriteleftright: ['|', '|']
    },
    {
      input: 'norm',
      tag: 'mo',
      output: 'norm',
      tex: null,
      ttype: A,
      rewriteleftright: ['\u2225', '\u2225']
    },
    {
      input: 'floor',
      tag: 'mo',
      output: 'floor',
      tex: null,
      ttype: A,
      rewriteleftright: ['\u230A', '\u230B']
    },
    {
      input: 'ceil',
      tag: 'mo',
      output: 'ceil',
      tex: null,
      ttype: A,
      rewriteleftright: ['\u2308', '\u2309']
    },
    { input: 'log', tag: 'mo', output: 'log', tex: null, ttype: A, func: true },
    { input: 'ln', tag: 'mo', output: 'ln', tex: null, ttype: A, func: true },
    { input: 'det', tag: 'mo', output: 'det', tex: null, ttype: A, func: true },
    { input: 'dim', tag: 'mo', output: 'dim', tex: null, ttype: c },
    { input: 'mod', tag: 'mo', output: 'mod', tex: null, ttype: c },
    { input: 'gcd', tag: 'mo', output: 'gcd', tex: null, ttype: A, func: true },
    { input: 'lcm', tag: 'mo', output: 'lcm', tex: null, ttype: A, func: true },
    { input: 'lub', tag: 'mo', output: 'lub', tex: null, ttype: c },
    { input: 'glb', tag: 'mo', output: 'glb', tex: null, ttype: c },
    { input: 'min', tag: 'mo', output: 'min', tex: null, ttype: L },
    { input: 'max', tag: 'mo', output: 'max', tex: null, ttype: L },
    { input: 'Sin', tag: 'mo', output: 'Sin', tex: null, ttype: A, func: true },
    { input: 'Cos', tag: 'mo', output: 'Cos', tex: null, ttype: A, func: true },
    { input: 'Tan', tag: 'mo', output: 'Tan', tex: null, ttype: A, func: true },
    {
      input: 'Arcsin',
      tag: 'mo',
      output: 'Arcsin',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'Arccos',
      tag: 'mo',
      output: 'Arccos',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'Arctan',
      tag: 'mo',
      output: 'Arctan',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'Sinh',
      tag: 'mo',
      output: 'Sinh',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'Cosh',
      tag: 'mo',
      output: 'Cosh',
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: 'Tanh',
      tag: 'mo',
      output: 'Tanh',
      tex: null,
      ttype: A,
      func: true
    },
    { input: 'Cot', tag: 'mo', output: 'Cot', tex: null, ttype: A, func: true },
    { input: 'Sec', tag: 'mo', output: 'Sec', tex: null, ttype: A, func: true },
    { input: 'Csc', tag: 'mo', output: 'Csc', tex: null, ttype: A, func: true },
    { input: 'Log', tag: 'mo', output: 'Log', tex: null, ttype: A, func: true },
    { input: 'Ln', tag: 'mo', output: 'Ln', tex: null, ttype: A, func: true },
    {
      input: 'Abs',
      tag: 'mo',
      output: 'abs',
      tex: null,
      ttype: A,
      notexcopy: true,
      rewriteleftright: ['|', '|']
    },
    { input: 'uarr', tag: 'mo', output: '\u2191', tex: 'uparrow', ttype: c },
    { input: 'darr', tag: 'mo', output: '\u2193', tex: 'downarrow', ttype: c },
    { input: 'rarr', tag: 'mo', output: '\u2192', tex: 'rightarrow', ttype: c },
    { input: '->', tag: 'mo', output: '\u2192', tex: 'to', ttype: c },
    {
      input: '>->',
      tag: 'mo',
      output: '\u21A3',
      tex: 'rightarrowtail',
      ttype: c
    },
    {
      input: '->>',
      tag: 'mo',
      output: '\u21A0',
      tex: 'twoheadrightarrow',
      ttype: c
    },
    {
      input: '>->>',
      tag: 'mo',
      output: '\u2916',
      tex: 'twoheadrightarrowtail',
      ttype: c
    },
    { input: '|->', tag: 'mo', output: '\u21A6', tex: 'mapsto', ttype: c },
    { input: 'larr', tag: 'mo', output: '\u2190', tex: 'leftarrow', ttype: c },
    {
      input: 'harr',
      tag: 'mo',
      output: '\u2194',
      tex: 'leftrightarrow',
      ttype: c
    },
    { input: 'rArr', tag: 'mo', output: '\u21D2', tex: 'Rightarrow', ttype: c },
    { input: 'lArr', tag: 'mo', output: '\u21D0', tex: 'Leftarrow', ttype: c },
    {
      input: 'hArr',
      tag: 'mo',
      output: '\u21D4',
      tex: 'Leftrightarrow',
      ttype: c
    },
    { input: 'sqrt', tag: 'msqrt', output: 'sqrt', tex: null, ttype: A },
    { input: 'root', tag: 'mroot', output: 'root', tex: null, ttype: U },
    { input: 'frac', tag: 'mfrac', output: '/', tex: null, ttype: U },
    { input: '/', tag: 'mfrac', output: '/', tex: null, ttype: i },
    {
      input: 'stackrel',
      tag: 'mover',
      output: 'stackrel',
      tex: null,
      ttype: U
    },
    { input: 'overset', tag: 'mover', output: 'stackrel', tex: null, ttype: U },
    {
      input: 'underset',
      tag: 'munder',
      output: 'stackrel',
      tex: null,
      ttype: U
    },
    { input: '_', tag: 'msub', output: '_', tex: null, ttype: i },
    { input: '^', tag: 'msup', output: '^', tex: null, ttype: i },
    {
      input: 'hat',
      tag: 'mover',
      output: '\u005E',
      tex: null,
      ttype: A,
      acc: true
    },
    {
      input: 'bar',
      tag: 'mover',
      output: '\u00AF',
      tex: 'overline',
      ttype: A,
      acc: true
    },
    {
      input: 'vec',
      tag: 'mover',
      output: '\u2192',
      tex: null,
      ttype: A,
      acc: true
    },
    { input: 'dot', tag: 'mover', output: '.', tex: null, ttype: A, acc: true },
    {
      input: 'ddot',
      tag: 'mover',
      output: '..',
      tex: null,
      ttype: A,
      acc: true
    },
    {
      input: 'overarc',
      tag: 'mover',
      output: '\u23DC',
      tex: 'overparen',
      ttype: A,
      acc: true
    },
    {
      input: 'ul',
      tag: 'munder',
      output: '\u0332',
      tex: 'underline',
      ttype: A,
      acc: true
    },
    {
      input: 'ubrace',
      tag: 'munder',
      output: '\u23DF',
      tex: 'underbrace',
      ttype: K,
      acc: true
    },
    {
      input: 'obrace',
      tag: 'mover',
      output: '\u23DE',
      tex: 'overbrace',
      ttype: K,
      acc: true
    },
    { input: 'text', tag: 'mtext', output: 'text', tex: null, ttype: Y },
    { input: 'mbox', tag: 'mtext', output: 'mbox', tex: null, ttype: Y },
    { input: 'color', tag: 'mstyle', ttype: U },
    { input: 'id', tag: 'mrow', ttype: U },
    { input: 'class', tag: 'mrow', ttype: U },
    { input: 'cancel', tag: 'menclose', output: 'cancel', tex: null, ttype: A },
    k,
    {
      input: 'bb',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'bold',
      output: 'bb',
      tex: null,
      ttype: A
    },
    {
      input: 'mathbf',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'bold',
      output: 'mathbf',
      tex: null,
      ttype: A
    },
    {
      input: 'sf',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'sans-serif',
      output: 'sf',
      tex: null,
      ttype: A
    },
    {
      input: 'mathsf',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'sans-serif',
      output: 'mathsf',
      tex: null,
      ttype: A
    },
    {
      input: 'bbb',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'double-struck',
      output: 'bbb',
      tex: null,
      ttype: A,
      codes: w
    },
    {
      input: 'mathbb',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'double-struck',
      output: 'mathbb',
      tex: null,
      ttype: A,
      codes: w
    },
    {
      input: 'cc',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'script',
      output: 'cc',
      tex: null,
      ttype: A,
      codes: D
    },
    {
      input: 'mathcal',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'script',
      output: 'mathcal',
      tex: null,
      ttype: A,
      codes: D
    },
    {
      input: 'tt',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'monospace',
      output: 'tt',
      tex: null,
      ttype: A
    },
    {
      input: 'mathtt',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'monospace',
      output: 'mathtt',
      tex: null,
      ttype: A
    },
    {
      input: 'fr',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'fraktur',
      output: 'fr',
      tex: null,
      ttype: A,
      codes: H
    },
    {
      input: 'mathfrak',
      tag: 'mstyle',
      atname: 'mathvariant',
      atval: 'fraktur',
      output: 'mathfrak',
      tex: null,
      ttype: A,
      codes: H
    }
  ];
  function T(ac, ab) {
    if (ac.input > ab.input) {
      return 1;
    } else {
      return -1;
    }
  }
  var S = [];
  function n() {
    var ac;
    var ab = z.length;
    for (ac = 0; ac < ab; ac++) {
      if (z[ac].tex) {
        z.push({
          input: z[ac].tex,
          tag: z[ac].tag,
          output: z[ac].output,
          ttype: z[ac].ttype,
          acc: z[ac].acc || false
        });
      }
    }
    B();
  }
  function B() {
    var ab;
    z.sort(T);
    for (ab = 0; ab < z.length; ab++) {
      S[ab] = z[ab].input;
    }
  }
  function I(ab, ac) {
    z.push({ input: ab, tag: 'mo', output: ac, tex: null, ttype: V });
    B();
  }
  function p(ad, ae) {
    var ab;
    if (
      ad.charAt(ae) == '\\' &&
      ad.charAt(ae + 1) != '\\' &&
      ad.charAt(ae + 1) != ' '
    ) {
      ab = ad.slice(ae + 1);
    } else {
      ab = ad.slice(ae);
    }
    for (var ac = 0; ac < ab.length && ab.charCodeAt(ac) <= 32; ac = ac + 1) {}
    return ab.slice(ac);
  }
  function N(ac, af, ag) {
    if (ag == 0) {
      var ae, ab;
      ag = -1;
      ae = ac.length;
      while (ag + 1 < ae) {
        ab = (ag + ae) >> 1;
        if (ac[ab] < af) {
          ag = ab;
        } else {
          ae = ab;
        }
      }
      return ae;
    } else {
      for (var ad = ag; ad < ac.length && ac[ad] < af; ad++) {}
    }
    return ad;
  }
  function j(ah) {
    var ab = 0;
    var ac = 0;
    var ae;
    var ak;
    var aj;
    var af = '';
    var ag = true;
    for (var ad = 1; ad <= ah.length && ag; ad++) {
      ak = ah.slice(0, ad);
      ac = ab;
      ab = N(S, ak, ac);
      if (ab < S.length && ah.slice(0, S[ab].length) == S[ab]) {
        af = S[ab];
        ae = ab;
        ad = af.length;
      }
      ag = ab < S.length && ah.slice(0, S[ab].length) >= S[ab];
    }
    s = y;
    if (af != '') {
      y = z[ae].ttype;
      return z[ae];
    }
    y = c;
    ab = 1;
    ak = ah.slice(0, 1);
    var ai = true;
    while ('0' <= ak && ak <= '9' && ab <= ah.length) {
      ak = ah.slice(ab, ab + 1);
      ab++;
    }
    if (ak == d) {
      ak = ah.slice(ab, ab + 1);
      if ('0' <= ak && ak <= '9') {
        ai = false;
        ab++;
        while ('0' <= ak && ak <= '9' && ab <= ah.length) {
          ak = ah.slice(ab, ab + 1);
          ab++;
        }
      }
    }
    if ((ai && ab > 1) || ab > 2) {
      ak = ah.slice(0, ab - 1);
      aj = 'mn';
    } else {
      ab = 2;
      ak = ah.slice(0, 1);
      aj = ('A' > ak || ak > 'Z') && ('a' > ak || ak > 'z') ? 'mo' : 'mi';
    }
    if (ak == '-' && s == i) {
      y = i;
      return { input: ak, tag: aj, output: ak, ttype: A, func: true };
    }
    return { input: ak, tag: aj, output: ak, ttype: c };
  }
  function R(ac) {
    var ab;
    if (!ac.hasChildNodes()) {
      return;
    }
    if (
      ac.firstChild.hasChildNodes() &&
      (ac.nodeName == 'mrow' || ac.nodeName == 'M:MROW')
    ) {
      ab = ac.firstChild.firstChild.nodeValue;
      if (ab == '(' || ab == '[' || ab == '{') {
        ac.removeChild(ac.firstChild);
      }
    }
    if (
      ac.lastChild.hasChildNodes() &&
      (ac.nodeName == 'mrow' || ac.nodeName == 'M:MROW')
    ) {
      ab = ac.lastChild.firstChild.nodeValue;
      if (ab == ')' || ab == ']' || ab == '}') {
        ac.removeChild(ac.lastChild);
      }
    }
  }
  var F, s, y;
  function G(ai) {
    var ad,
      ac,
      al,
      af,
      ak,
      ag = e.createDocumentFragment();
    ai = p(ai, 0);
    ad = j(ai);
    if (ad == null || (ad.ttype == h && F > 0)) {
      return [null, ai];
    }
    if (ad.ttype == V) {
      ai = ad.output + p(ai, ad.input.length);
      ad = j(ai);
    }
    switch (ad.ttype) {
      case L:
      case c:
        ai = p(ai, ad.input.length);
        return [O(ad.tag, e.createTextNode(ad.output)), ai];
      case b:
        F++;
        ai = p(ai, ad.input.length);
        al = q(ai, true);
        F--;
        if (typeof ad.invisible == 'boolean' && ad.invisible) {
          ac = O('mrow', al[0]);
        } else {
          ac = O('mo', e.createTextNode(ad.output));
          ac = O('mrow', ac);
          ac.appendChild(al[0]);
        }
        return [ac, al[1]];
      case Y:
        if (ad != k) {
          ai = p(ai, ad.input.length);
        }
        if (ai.charAt(0) == '{') {
          af = ai.indexOf('}');
        } else {
          if (ai.charAt(0) == '(') {
            af = ai.indexOf(')');
          } else {
            if (ai.charAt(0) == '[') {
              af = ai.indexOf(']');
            } else {
              if (ad == k) {
                af = ai.slice(1).indexOf('"') + 1;
              } else {
                af = 0;
              }
            }
          }
        }
        if (af == -1) {
          af = ai.length;
        }
        ak = ai.slice(1, af);
        if (ak.charAt(0) == ' ') {
          ac = O('mspace');
          ac.setAttribute('width', '1ex');
          ag.appendChild(ac);
        }
        ag.appendChild(O(ad.tag, e.createTextNode(ak)));
        if (ak.charAt(ak.length - 1) == ' ') {
          ac = O('mspace');
          ac.setAttribute('width', '1ex');
          ag.appendChild(ac);
        }
        ai = p(ai, af + 1);
        return [O('mrow', ag), ai];
      case K:
      case A:
        ai = p(ai, ad.input.length);
        al = G(ai);
        if (al[0] == null) {
          return [O(ad.tag, e.createTextNode(ad.output)), ai];
        }
        if (typeof ad.func == 'boolean' && ad.func) {
          ak = ai.charAt(0);
          if (
            ak == '^' ||
            ak == '_' ||
            ak == '/' ||
            ak == '|' ||
            ak == ',' ||
            (ad.input.length == 1 && ad.input.match(/\w/) && ak != '(')
          ) {
            return [O(ad.tag, e.createTextNode(ad.output)), ai];
          } else {
            ac = O('mrow', O(ad.tag, e.createTextNode(ad.output)));
            ac.appendChild(al[0]);
            return [ac, al[1]];
          }
        }
        R(al[0]);
        if (ad.input == 'sqrt') {
          return [O(ad.tag, al[0]), al[1]];
        } else {
          if (typeof ad.rewriteleftright != 'undefined') {
            ac = O('mrow', O('mo', e.createTextNode(ad.rewriteleftright[0])));
            ac.appendChild(al[0]);
            ac.appendChild(O('mo', e.createTextNode(ad.rewriteleftright[1])));
            return [ac, al[1]];
          } else {
            if (ad.input == 'cancel') {
              ac = O(ad.tag, al[0]);
              ac.setAttribute('notation', 'updiagonalstrike');
              return [ac, al[1]];
            } else {
              if (typeof ad.acc == 'boolean' && ad.acc) {
                ac = O(ad.tag, al[0]);
                var ah = O('mo', e.createTextNode(ad.output));
                if (
                  ad.input == 'vec' &&
                  ((al[0].nodeName == 'mrow' &&
                    al[0].childNodes.length == 1 &&
                    al[0].firstChild.firstChild.nodeValue !== null &&
                    al[0].firstChild.firstChild.nodeValue.length == 1) ||
                    (al[0].firstChild.nodeValue !== null &&
                      al[0].firstChild.nodeValue.length == 1))
                ) {
                  ah.setAttribute('stretchy', false);
                }
                ac.appendChild(ah);
                return [ac, al[1]];
              } else {
                if (!l && typeof ad.codes != 'undefined') {
                  for (af = 0; af < al[0].childNodes.length; af++) {
                    if (
                      al[0].childNodes[af].nodeName == 'mi' ||
                      al[0].nodeName == 'mi'
                    ) {
                      ak =
                        al[0].nodeName == 'mi'
                          ? al[0].firstChild.nodeValue
                          : al[0].childNodes[af].firstChild.nodeValue;
                      var aj = [];
                      for (var ae = 0; ae < ak.length; ae++) {
                        if (ak.charCodeAt(ae) > 64 && ak.charCodeAt(ae) < 91) {
                          aj = aj + ad.codes[ak.charCodeAt(ae) - 65];
                        } else {
                          if (
                            ak.charCodeAt(ae) > 96 &&
                            ak.charCodeAt(ae) < 123
                          ) {
                            aj = aj + ad.codes[ak.charCodeAt(ae) - 71];
                          } else {
                            aj = aj + ak.charAt(ae);
                          }
                        }
                      }
                      if (al[0].nodeName == 'mi') {
                        al[0] = O('mo').appendChild(e.createTextNode(aj));
                      } else {
                        al[0].replaceChild(
                          O('mo').appendChild(e.createTextNode(aj)),
                          al[0].childNodes[af]
                        );
                      }
                    }
                  }
                }
                ac = O(ad.tag, al[0]);
                ac.setAttribute(ad.atname, ad.atval);
                return [ac, al[1]];
              }
            }
          }
        }
      case U:
        ai = p(ai, ad.input.length);
        al = G(ai);
        if (al[0] == null) {
          return [O('mo', e.createTextNode(ad.input)), ai];
        }
        R(al[0]);
        var ab = G(al[1]);
        if (ab[0] == null) {
          return [O('mo', e.createTextNode(ad.input)), ai];
        }
        R(ab[0]);
        if (['color', 'class', 'id'].indexOf(ad.input) >= 0) {
          if (ai.charAt(0) == '{') {
            af = ai.indexOf('}');
          } else {
            if (ai.charAt(0) == '(') {
              af = ai.indexOf(')');
            } else {
              if (ai.charAt(0) == '[') {
                af = ai.indexOf(']');
              }
            }
          }
          ak = ai.slice(1, af);
          ac = O(ad.tag, ab[0]);
          if (ad.input === 'color') {
            ac.setAttribute('mathcolor', ak);
          } else {
            if (ad.input === 'class') {
              ac.setAttribute('class', ak);
            } else {
              if (ad.input === 'id') {
                ac.setAttribute('id', ak);
              }
            }
          }
          return [ac, ab[1]];
        }
        if (ad.input == 'root' || ad.output == 'stackrel') {
          ag.appendChild(ab[0]);
        }
        ag.appendChild(al[0]);
        if (ad.input == 'frac') {
          ag.appendChild(ab[0]);
        }
        return [O(ad.tag, ag), ab[1]];
      case i:
        ai = p(ai, ad.input.length);
        return [O('mo', e.createTextNode(ad.output)), ai];
      case a:
        ai = p(ai, ad.input.length);
        ac = O('mspace');
        ac.setAttribute('width', '1ex');
        ag.appendChild(ac);
        ag.appendChild(O(ad.tag, e.createTextNode(ad.output)));
        ac = O('mspace');
        ac.setAttribute('width', '1ex');
        ag.appendChild(ac);
        return [O('mrow', ag), ai];
      case m:
        F++;
        ai = p(ai, ad.input.length);
        al = q(ai, false);
        F--;
        ak = '';
        if (al[0].lastChild != null) {
          ak = al[0].lastChild.firstChild.nodeValue;
        }
        if (ak == '|' && ai.charAt(0) !== ',') {
          ac = O('mo', e.createTextNode(ad.output));
          ac = O('mrow', ac);
          ac.appendChild(al[0]);
          return [ac, al[1]];
        } else {
          ac = O('mo', e.createTextNode('\u2223'));
          ac = O('mrow', ac);
          return [ac, ai];
        }
      default:
        ai = p(ai, ad.input.length);
        return [O(ad.tag, e.createTextNode(ad.output)), ai];
    }
  }
  function t(ah) {
    var af, ai, ag, ae, ab, ad;
    ah = p(ah, 0);
    ai = j(ah);
    ab = G(ah);
    ae = ab[0];
    ah = ab[1];
    af = j(ah);
    if (af.ttype == i && af.input != '/') {
      ah = p(ah, af.input.length);
      ab = G(ah);
      if (ab[0] == null) {
        ab[0] = O('mo', e.createTextNode('\u25A1'));
      } else {
        R(ab[0]);
      }
      ah = ab[1];
      ad = ai.ttype == L || ai.ttype == K;
      if (af.input == '_') {
        ag = j(ah);
        if (ag.input == '^') {
          ah = p(ah, ag.input.length);
          var ac = G(ah);
          R(ac[0]);
          ah = ac[1];
          ae = O(ad ? 'munderover' : 'msubsup', ae);
          ae.appendChild(ab[0]);
          ae.appendChild(ac[0]);
          ae = O('mrow', ae);
        } else {
          ae = O(ad ? 'munder' : 'msub', ae);
          ae.appendChild(ab[0]);
        }
      } else {
        if (af.input == '^' && ad) {
          ae = O('mover', ae);
          ae.appendChild(ab[0]);
        } else {
          ae = O(af.tag, ae);
          ae.appendChild(ab[0]);
        }
      }
      if (typeof ai.func != 'undefined' && ai.func) {
        ag = j(ah);
        if (ag.ttype != i && ag.ttype != h) {
          ab = t(ah);
          ae = O('mrow', ae);
          ae.appendChild(ab[0]);
          ah = ab[1];
        }
      }
    }
    return [ae, ah];
  }
  function q(ak, aj) {
    var ao,
      al,
      ag,
      ar,
      ah = e.createDocumentFragment();
    do {
      ak = p(ak, 0);
      ag = t(ak);
      al = ag[0];
      ak = ag[1];
      ao = j(ak);
      if (ao.ttype == i && ao.input == '/') {
        ak = p(ak, ao.input.length);
        ag = t(ak);
        if (ag[0] == null) {
          ag[0] = O('mo', e.createTextNode('\u25A1'));
        } else {
          R(ag[0]);
        }
        ak = ag[1];
        R(al);
        al = O(ao.tag, al);
        al.appendChild(ag[0]);
        ah.appendChild(al);
        ao = j(ak);
      } else {
        if (al != undefined) {
          ah.appendChild(al);
        }
      }
    } while (
      ((ao.ttype != h && (ao.ttype != m || aj)) || F == 0) &&
      ao != null &&
      ao.output != ''
    );
    if (ao.ttype == h || ao.ttype == m) {
      var at = ah.childNodes.length;
      if (
        at > 0 &&
        ah.childNodes[at - 1].nodeName == 'mrow' &&
        ah.childNodes[at - 1].lastChild &&
        ah.childNodes[at - 1].lastChild.firstChild
      ) {
        var av = ah.childNodes[at - 1].lastChild.firstChild.nodeValue;
        if (av == ')' || av == ']') {
          var ac = ah.childNodes[at - 1].firstChild.firstChild.nodeValue;
          if (
            (ac == '(' && av == ')' && ao.output != '}') ||
            (ac == '[' && av == ']')
          ) {
            var ad = [];
            var ap = true;
            var am = ah.childNodes.length;
            for (ar = 0; ap && ar < am; ar = ar + 2) {
              ad[ar] = [];
              al = ah.childNodes[ar];
              if (ap) {
                ap =
                  al.nodeName == 'mrow' &&
                  (ar == am - 1 ||
                    (al.nextSibling.nodeName == 'mo' &&
                      al.nextSibling.firstChild.nodeValue == ',')) &&
                  al.firstChild.firstChild.nodeValue == ac &&
                  al.lastChild.firstChild.nodeValue == av;
              }
              if (ap) {
                for (var aq = 0; aq < al.childNodes.length; aq++) {
                  if (al.childNodes[aq].firstChild.nodeValue == ',') {
                    ad[ar][ad[ar].length] = aq;
                  }
                }
              }
              if (ap && ar > 1) {
                ap = ad[ar].length == ad[ar - 2].length;
              }
            }
            ap = ap && (ad.length > 1 || ad[0].length > 0);
            var af = [];
            if (ap) {
              var ae,
                ab,
                ai,
                an,
                au = e.createDocumentFragment();
              for (ar = 0; ar < am; ar = ar + 2) {
                ae = e.createDocumentFragment();
                ab = e.createDocumentFragment();
                al = ah.firstChild;
                ai = al.childNodes.length;
                an = 0;
                al.removeChild(al.firstChild);
                for (aq = 1; aq < ai - 1; aq++) {
                  if (typeof ad[ar][an] != 'undefined' && aq == ad[ar][an]) {
                    al.removeChild(al.firstChild);
                    if (
                      al.firstChild.nodeName == 'mrow' &&
                      al.firstChild.childNodes.length == 1 &&
                      al.firstChild.firstChild.firstChild.nodeValue == '\u2223'
                    ) {
                      if (ar == 0) {
                        af.push('solid');
                      }
                      al.removeChild(al.firstChild);
                      al.removeChild(al.firstChild);
                      aq += 2;
                      an++;
                    } else {
                      if (ar == 0) {
                        af.push('none');
                      }
                    }
                    ae.appendChild(O('mtd', ab));
                    an++;
                  } else {
                    ab.appendChild(al.firstChild);
                  }
                }
                ae.appendChild(O('mtd', ab));
                if (ar == 0) {
                  af.push('none');
                }
                if (ah.childNodes.length > 2) {
                  ah.removeChild(ah.firstChild);
                  ah.removeChild(ah.firstChild);
                }
                au.appendChild(O('mtr', ae));
              }
              al = O('mtable', au);
              al.setAttribute('columnlines', af.join(' '));
              if (typeof ao.invisible == 'boolean' && ao.invisible) {
                al.setAttribute('columnalign', 'left');
              }
              ah.replaceChild(al, ah.firstChild);
            }
          }
        }
      }
      ak = p(ak, ao.input.length);
      if (typeof ao.invisible != 'boolean' || !ao.invisible) {
        al = O('mo', e.createTextNode(ao.output));
        ah.appendChild(al);
      }
    }
    return [ah, ak];
  }
  function M(ad, ac) {
    var ae, ab;
    F = 0;
    ad = ad.replace(/&nbsp;/g, '');
    ad = ad.replace(/&gt;/g, '>');
    ad = ad.replace(/&lt;/g, '<');
    ae = q(ad.replace(/^\s+/g, ''), false)[0];
    ab = O('mstyle', ae);
    if (C != '') {
      ab.setAttribute('mathcolor', C);
    }
    if (mathfontsize != '') {
      ab.setAttribute('fontsize', mathfontsize);
      ab.setAttribute('mathsize', mathfontsize);
    }
    if (mathfontfamily != '') {
      ab.setAttribute('fontfamily', mathfontfamily);
      ab.setAttribute('mathvariant', mathfontfamily);
    }
    if (o) {
      ab.setAttribute('displaystyle', 'true');
    }
    ab = O('math', ab);
    if (v) {
      ab.setAttribute('title', ad.replace(/\s+/g, ' '));
    }
    return ab;
  }
  v = false;
  mathfontfamily = '';
  C = '';
  mathfontsize = '';
  (function() {
    for (var ac = 0, ab = z.length; ac < ab; ac++) {
      if (z[ac].codes) {
        delete z[ac].codes;
      }
      if (z[ac].func) {
        z[ac].tag = 'mi';
      }
    }
  })();
  aa.Augment({
    AM: {
      Init: function() {
        o = aa.config.displaystyle;
        d = aa.config.decimal || aa.config.decimalsign;
        if (!aa.config.fixphi) {
          for (var ac = 0, ab = z.length; ac < ab; ac++) {
            if (z[ac].input === 'phi') {
              z[ac].output = '\u03C6';
            }
            if (z[ac].input === 'varphi') {
              z[ac].output = '\u03D5';
              ac = ab;
            }
          }
        }
        x();
        n();
      },
      Augment: function(ab) {
        for (var ac in ab) {
          if (ab.hasOwnProperty(ac)) {
            switch (ac) {
              case 'displaystyle':
                o = ab[ac];
                break;
              case 'decimal':
                decimal = ab[ac];
                break;
              case 'parseMath':
                M = ab[ac];
                break;
              case 'parseExpr':
                q = ab[ac];
                break;
              case 'parseIexpr':
                t = ab[ac];
                break;
              case 'parseSexpr':
                G = ab[ac];
                break;
              case 'removeBrackets':
                R = ab[ac];
                break;
              case 'getSymbol':
                j = ab[ac];
                break;
              case 'position':
                N = ab[ac];
                break;
              case 'removeCharsAndBlanks':
                p = ab[ac];
                break;
              case 'createMmlNode':
                O = ab[ac];
                break;
              case 'createElementMathML':
                P = ab[ac];
                break;
              case 'createElementXHTML':
                E = ab[ac];
                break;
              case 'initSymbols':
                n = ab[ac];
                break;
              case 'refreshSymbols':
                B = ab[ac];
                break;
              case 'compareNames':
                T = ab[ac];
                break;
            }
            this[ac] = ab[ac];
          }
        }
      },
      parseMath: M,
      parseExpr: q,
      parseIexpr: t,
      parseSexr: G,
      removeBrackets: R,
      getSymbol: j,
      position: N,
      removeCharsAndBlanks: p,
      createMmlNode: O,
      createElementMathML: P,
      createElementXHTML: E,
      initSymbols: n,
      refreshSymbols: B,
      compareNames: T,
      createDocumentFragment: X,
      document: e,
      define: I,
      newcommand: u,
      newsymbol: r,
      symbols: z,
      names: S,
      TOKEN: {
        CONST: c,
        UNARY: A,
        BINARY: U,
        INFIX: i,
        LEFTBRACKET: b,
        RIGHTBRACKET: h,
        SPACE: a,
        UNDEROVER: L,
        DEFINITION: V,
        LEFTRIGHT: m,
        TEXT: Y,
        UNARYUNDEROVER: K
      }
    }
  });
  var Z = [Q, J];
  Z = null;
})(MathJax.InputJax.AsciiMath);
(function(b) {
  var a;
  b.Augment({
    sourceMenuTitle: ['AsciiMathInput', 'AsciiMath Input'],
    annotationEncoding: 'text/x-asciimath',
    prefilterHooks: MathJax.Callback.Hooks(true),
    postfilterHooks: MathJax.Callback.Hooks(true),
    Translate: function(c) {
      var d,
        f = MathJax.HTML.getScript(c);
      var g = { math: f, script: c };
      var h = this.prefilterHooks.Execute(g);
      if (h) {
        return h;
      }
      f = g.math;
      try {
        d = this.AM.parseMath(f);
      } catch (e) {
        if (!e.asciimathError) {
          throw e;
        }
        d = this.formatError(e, f);
      }
      g.math = a(d);
      this.postfilterHooks.Execute(g);
      return this.postfilterHooks.Execute(g) || g.math;
    },
    formatError: function(f, e, c) {
      var d = f.message.replace(/\n.*/, '');
      MathJax.Hub.signal.Post(['AsciiMath Jax - parse error', d, e, c]);
      return a.Error(d);
    },
    Error: function(c) {
      throw MathJax.Hub.Insert(Error(c), { asciimathError: true });
    },
    Startup: function() {
      a = MathJax.ElementJax.mml;
      this.AM.Init();
    }
  });
  b.loadComplete('jax.js');
})(MathJax.InputJax.AsciiMath);
