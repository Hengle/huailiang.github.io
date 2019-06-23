/*
 *  /MathJax/jax/input/TeX/jax.js
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

(function(d, c, j) {
  var i,
    h = '\u00A0';
  var k = function(m) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [['TeX', m]].concat([].slice.call(arguments, 1))
    );
  };
  var f = MathJax.Object.isArray;
  var e = MathJax.Object.Subclass({
    Init: function(n, m) {
      this.global = { isInner: m };
      this.data = [b.start(this.global)];
      if (n) {
        this.data[0].env = n;
      }
      this.env = this.data[0].env;
    },
    Push: function() {
      var o, n, p, q;
      for (o = 0, n = arguments.length; o < n; o++) {
        p = arguments[o];
        if (!p) {
          continue;
        }
        if (p instanceof i.mbase) {
          p = b.mml(p);
        }
        p.global = this.global;
        q = this.data.length ? this.Top().checkItem(p) : true;
        if (q instanceof Array) {
          this.Pop();
          this.Push.apply(this, q);
        } else {
          if (q instanceof b) {
            this.Pop();
            this.Push(q);
          } else {
            if (q) {
              this.data.push(p);
              if (p.env) {
                if (p.copyEnv !== false) {
                  for (var r in this.env) {
                    if (this.env.hasOwnProperty(r)) {
                      p.env[r] = this.env[r];
                    }
                  }
                }
                this.env = p.env;
              } else {
                p.env = this.env;
              }
            }
          }
        }
      }
    },
    Pop: function() {
      var m = this.data.pop();
      if (!m.isOpen) {
        delete m.env;
      }
      this.env = this.data.length ? this.Top().env : {};
      return m;
    },
    Top: function(m) {
      if (m == null) {
        m = 1;
      }
      if (this.data.length < m) {
        return null;
      }
      return this.data[this.data.length - m];
    },
    Prev: function(m) {
      var n = this.Top();
      if (m) {
        return n.data[n.data.length - 1];
      } else {
        return n.Pop();
      }
    },
    toString: function() {
      return 'stack[\n  ' + this.data.join('\n  ') + '\n]';
    }
  });
  var b = (e.Item = MathJax.Object.Subclass({
    type: 'base',
    endError: [
      'ExtraOpenMissingClose',
      'Extra open brace or missing close brace'
    ],
    closeError: [
      'ExtraCloseMissingOpen',
      'Extra close brace or missing open brace'
    ],
    rightError: ['MissingLeftExtraRight', 'Missing \\left or extra \\right'],
    Init: function() {
      if (this.isOpen) {
        this.env = {};
      }
      this.data = [];
      this.Push.apply(this, arguments);
    },
    Push: function() {
      this.data.push.apply(this.data, arguments);
    },
    Pop: function() {
      return this.data.pop();
    },
    mmlData: function(m, n) {
      if (m == null) {
        m = true;
      }
      if (this.data.length === 1 && !n) {
        return this.data[0];
      }
      return i.mrow.apply(i, this.data).With(m ? { inferred: true } : {});
    },
    checkItem: function(m) {
      if (m.type === 'over' && this.isOpen) {
        m.num = this.mmlData(false);
        this.data = [];
      }
      if (m.type === 'cell' && this.isOpen) {
        if (m.linebreak) {
          return false;
        }
        d.Error(['Misplaced', 'Misplaced %1', m.name]);
      }
      if (m.isClose && this[m.type + 'Error']) {
        d.Error(this[m.type + 'Error']);
      }
      if (!m.isNotStack) {
        return true;
      }
      this.Push(m.data[0]);
      return false;
    },
    With: function(m) {
      for (var n in m) {
        if (m.hasOwnProperty(n)) {
          this[n] = m[n];
        }
      }
      return this;
    },
    toString: function() {
      return this.type + '[' + this.data.join('; ') + ']';
    }
  }));
  b.start = b.Subclass({
    type: 'start',
    isOpen: true,
    Init: function(m) {
      this.SUPER(arguments).Init.call(this);
      this.global = m;
    },
    checkItem: function(m) {
      if (m.type === 'stop') {
        return b.mml(this.mmlData());
      }
      return this.SUPER(arguments).checkItem.call(this, m);
    }
  });
  b.stop = b.Subclass({ type: 'stop', isClose: true });
  b.open = b.Subclass({
    type: 'open',
    isOpen: true,
    stopError: [
      'ExtraOpenMissingClose',
      'Extra open brace or missing close brace'
    ],
    checkItem: function(n) {
      if (n.type === 'close') {
        var m = this.mmlData();
        return b.mml(i.TeXAtom(m));
      }
      return this.SUPER(arguments).checkItem.call(this, n);
    }
  });
  b.close = b.Subclass({ type: 'close', isClose: true });
  b.prime = b.Subclass({
    type: 'prime',
    checkItem: function(m) {
      if (this.data[0].type !== 'msubsup') {
        return [i.msup(this.data[0], this.data[1]), m];
      }
      this.data[0].SetData(this.data[0].sup, this.data[1]);
      return [this.data[0], m];
    }
  });
  b.subsup = b.Subclass({
    type: 'subsup',
    stopError: ['MissingScript', 'Missing superscript or subscript argument'],
    supError: ['MissingOpenForSup', 'Missing open brace for superscript'],
    subError: ['MissingOpenForSub', 'Missing open brace for subscript'],
    checkItem: function(m) {
      if (m.type === 'open' || m.type === 'left') {
        return true;
      }
      if (m.type === 'mml') {
        if (this.primes) {
          if (this.position !== 2) {
            this.data[0].SetData(2, this.primes);
          } else {
            m.data[0] = i.mrow(
              this.primes.With({ variantForm: true }),
              m.data[0]
            );
          }
        }
        this.data[0].SetData(this.position, m.data[0]);
        if (this.movesupsub != null) {
          this.data[0].movesupsub = this.movesupsub;
        }
        return b.mml(this.data[0]);
      }
      if (this.SUPER(arguments).checkItem.call(this, m)) {
        d.Error(this[['', 'subError', 'supError'][this.position]]);
      }
    },
    Pop: function() {}
  });
  b.over = b.Subclass({
    type: 'over',
    isClose: true,
    name: '\\over',
    checkItem: function(o, m) {
      if (o.type === 'over') {
        d.Error(['AmbiguousUseOf', 'Ambiguous use of %1', o.name]);
      }
      if (o.isClose) {
        var n = i.mfrac(this.num, this.mmlData(false));
        if (this.thickness != null) {
          n.linethickness = this.thickness;
        }
        if (this.open || this.close) {
          n.texWithDelims = true;
          n = d.fixedFence(this.open, n, this.close);
        }
        return [b.mml(n), o];
      }
      return this.SUPER(arguments).checkItem.call(this, o);
    },
    toString: function() {
      return 'over[' + this.num + ' / ' + this.data.join('; ') + ']';
    }
  });
  b.left = b.Subclass({
    type: 'left',
    isOpen: true,
    delim: '(',
    stopError: ['ExtraLeftMissingRight', 'Extra \\left or missing \\right'],
    checkItem: function(m) {
      if (m.type === 'right') {
        return b.mml(d.fenced(this.delim, this.mmlData(), m.delim));
      }
      return this.SUPER(arguments).checkItem.call(this, m);
    }
  });
  b.right = b.Subclass({ type: 'right', isClose: true, delim: ')' });
  b.begin = b.Subclass({
    type: 'begin',
    isOpen: true,
    checkItem: function(m) {
      if (m.type === 'end') {
        if (m.name !== this.name) {
          d.Error([
            'EnvBadEnd',
            '\\begin{%1} ended with \\end{%2}',
            this.name,
            m.name
          ]);
        }
        if (!this.end) {
          return b.mml(this.mmlData());
        }
        return this.parse[this.end].call(this.parse, this, this.data);
      }
      if (m.type === 'stop') {
        d.Error(['EnvMissingEnd', 'Missing \\end{%1}', this.name]);
      }
      return this.SUPER(arguments).checkItem.call(this, m);
    }
  });
  b.end = b.Subclass({ type: 'end', isClose: true });
  b.style = b.Subclass({
    type: 'style',
    checkItem: function(n) {
      if (!n.isClose) {
        return this.SUPER(arguments).checkItem.call(this, n);
      }
      var m = i.mstyle.apply(i, this.data).With(this.styles);
      return [b.mml(m), n];
    }
  });
  b.position = b.Subclass({
    type: 'position',
    checkItem: function(n) {
      if (n.isClose) {
        d.Error(['MissingBoxFor', 'Missing box for %1', this.name]);
      }
      if (n.isNotStack) {
        var m = n.mmlData();
        switch (this.move) {
          case 'vertical':
            m = i
              .mpadded(m)
              .With({ height: this.dh, depth: this.dd, voffset: this.dh });
            return [b.mml(m)];
          case 'horizontal':
            return [b.mml(this.left), n, b.mml(this.right)];
        }
      }
      return this.SUPER(arguments).checkItem.call(this, n);
    }
  });
  b.array = b.Subclass({
    type: 'array',
    isOpen: true,
    copyEnv: false,
    arraydef: {},
    Init: function() {
      this.table = [];
      this.row = [];
      this.frame = [];
      this.hfill = [];
      this.SUPER(arguments).Init.apply(this, arguments);
    },
    checkItem: function(n) {
      if (n.isClose && n.type !== 'over') {
        if (n.isEntry) {
          this.EndEntry();
          this.clearEnv();
          return false;
        }
        if (n.isCR) {
          this.EndEntry();
          this.EndRow();
          this.clearEnv();
          return false;
        }
        this.EndTable();
        this.clearEnv();
        var o = this.arraydef.scriptlevel;
        delete this.arraydef.scriptlevel;
        var m = i.mtable.apply(i, this.table).With(this.arraydef);
        if (this.frame.length === 4) {
          m.frame = this.frame.dashed ? 'dashed' : 'solid';
        } else {
          if (this.frame.length) {
            m.hasFrame = true;
            if (this.arraydef.rowlines) {
              this.arraydef.rowlines = this.arraydef.rowlines.replace(
                /none( none)+$/,
                'none'
              );
            }
            m = i
              .menclose(m)
              .With({ notation: this.frame.join(' '), isFrame: true });
            if (
              (this.arraydef.columnlines || 'none') != 'none' ||
              (this.arraydef.rowlines || 'none') != 'none'
            ) {
              m.padding = 0;
            }
          }
        }
        if (o) {
          m = i.mstyle(m).With({ scriptlevel: o });
        }
        if (this.open || this.close) {
          m = d.fenced(this.open, m, this.close);
        }
        m = b.mml(m);
        if (this.requireClose) {
          if (n.type === 'close') {
            return m;
          }
          d.Error(['MissingCloseBrace', 'Missing close brace']);
        }
        return [m, n];
      }
      return this.SUPER(arguments).checkItem.call(this, n);
    },
    EndEntry: function() {
      var m = i.mtd.apply(i, this.data);
      if (this.hfill.length) {
        if (this.hfill[0] === 0) {
          m.columnalign = 'right';
        }
        if (this.hfill[this.hfill.length - 1] === this.data.length) {
          m.columnalign = m.columnalign ? 'center' : 'left';
        }
      }
      this.row.push(m);
      this.data = [];
      this.hfill = [];
    },
    EndRow: function() {
      var m = i.mtr;
      if (this.isNumbered && this.row.length === 3) {
        this.row.unshift(this.row.pop());
        m = i.mlabeledtr;
      }
      this.table.push(m.apply(i, this.row));
      this.row = [];
    },
    EndTable: function() {
      if (this.data.length || this.row.length) {
        this.EndEntry();
        this.EndRow();
      }
      this.checkLines();
    },
    checkLines: function() {
      if (this.arraydef.rowlines) {
        var m = this.arraydef.rowlines.split(/ /);
        if (m.length === this.table.length) {
          this.frame.push('bottom');
          m.pop();
          this.arraydef.rowlines = m.join(' ');
        } else {
          if (m.length < this.table.length - 1) {
            this.arraydef.rowlines += ' none';
          }
        }
      }
      if (this.rowspacing) {
        var n = this.arraydef.rowspacing.split(/ /);
        while (n.length < this.table.length) {
          n.push(this.rowspacing + 'em');
        }
        this.arraydef.rowspacing = n.join(' ');
      }
    },
    clearEnv: function() {
      for (var m in this.env) {
        if (this.env.hasOwnProperty(m)) {
          delete this.env[m];
        }
      }
    }
  });
  b.cell = b.Subclass({ type: 'cell', isClose: true });
  b.mml = b.Subclass({
    type: 'mml',
    isNotStack: true,
    Add: function() {
      this.data.push.apply(this.data, arguments);
      return this;
    }
  });
  b.fn = b.Subclass({
    type: 'fn',
    checkItem: function(n) {
      if (this.data[0]) {
        if (n.isOpen) {
          return true;
        }
        if (n.type !== 'fn') {
          if (n.type !== 'mml' || !n.data[0]) {
            return [this.data[0], n];
          }
          if (n.data[0].isa(i.mspace)) {
            return [this.data[0], n];
          }
          var m = n.data[0];
          if (m.isEmbellished()) {
            m = m.CoreMO();
          }
          if ([0, 0, 1, 1, 0, 1, 1, 0, 0, 0][m.Get('texClass')]) {
            return [this.data[0], n];
          }
        }
        return [
          this.data[0],
          i.mo(i.entity('#x2061')).With({ texClass: i.TEXCLASS.NONE }),
          n
        ];
      }
      return this.SUPER(arguments).checkItem.apply(this, arguments);
    }
  });
  b.not = b.Subclass({
    type: 'not',
    checkItem: function(n) {
      var m, o;
      if (n.type === 'open' || n.type === 'left') {
        return true;
      }
      if (n.type === 'mml' && n.data[0].type.match(/^(mo|mi|mtext)$/)) {
        (m = n.data[0]), (o = m.data.join(''));
        if (o.length === 1 && !m.movesupsub && m.data.length === 1) {
          o = b.not.remap[o.charCodeAt(0)];
          if (o) {
            m.SetData(0, i.chars(String.fromCharCode(o)));
          } else {
            m.Append(i.chars('\u0338'));
          }
          return n;
        }
      }
      m = i.mpadded(i.mtext('\u29F8')).With({ width: 0 });
      m = i.TeXAtom(m).With({ texClass: i.TEXCLASS.REL });
      return [m, n];
    }
  });
  b.not.remap = {
    8592: 8602,
    8594: 8603,
    8596: 8622,
    8656: 8653,
    8658: 8655,
    8660: 8654,
    8712: 8713,
    8715: 8716,
    8739: 8740,
    8741: 8742,
    8764: 8769,
    126: 8769,
    8771: 8772,
    8773: 8775,
    8776: 8777,
    8781: 8813,
    61: 8800,
    8801: 8802,
    60: 8814,
    62: 8815,
    8804: 8816,
    8805: 8817,
    8818: 8820,
    8819: 8821,
    8822: 8824,
    8823: 8825,
    8826: 8832,
    8827: 8833,
    8834: 8836,
    8835: 8837,
    8838: 8840,
    8839: 8841,
    8866: 8876,
    8872: 8877,
    8873: 8878,
    8875: 8879,
    8828: 8928,
    8829: 8929,
    8849: 8930,
    8850: 8931,
    8882: 8938,
    8883: 8939,
    8884: 8940,
    8885: 8941,
    8707: 8708
  };
  b.dots = b.Subclass({
    type: 'dots',
    checkItem: function(n) {
      if (n.type === 'open' || n.type === 'left') {
        return true;
      }
      var o = this.ldots;
      if (n.type === 'mml' && n.data[0].isEmbellished()) {
        var m = n.data[0].CoreMO().Get('texClass');
        if (m === i.TEXCLASS.BIN || m === i.TEXCLASS.REL) {
          o = this.cdots;
        }
      }
      return [o, n];
    }
  });
  var g = {
    Add: function(m, p, o) {
      if (!p) {
        p = this;
      }
      for (var n in m) {
        if (m.hasOwnProperty(n)) {
          if (
            typeof m[n] === 'object' &&
            !f(m[n]) &&
            (typeof p[n] === 'object' || typeof p[n] === 'function')
          ) {
            this.Add(m[n], p[n], m[n], o);
          } else {
            if (!p[n] || !p[n].isUser || !o) {
              p[n] = m[n];
            }
          }
        }
      }
      return p;
    }
  };
  var l = function() {
    i = MathJax.ElementJax.mml;
    c.Insert(g, {
      letter: /[a-z]/i,
      digit: /[0-9.]/,
      number: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)*|\.[0-9]+)/,
      special: {
        '\\': 'ControlSequence',
        '{': 'Open',
        '}': 'Close',
        '~': 'Tilde',
        '^': 'Superscript',
        _: 'Subscript',
        ' ': 'Space',
        '\t': 'Space',
        '\r': 'Space',
        '\n': 'Space',
        "'": 'Prime',
        '%': 'Comment',
        '&': 'Entry',
        '#': 'Hash',
        '\u00A0': 'Space',
        '\u2019': 'Prime'
      },
      remap: { '-': '2212', '*': '2217', '`': '2018' },
      mathchar0mi: {
        alpha: '03B1',
        beta: '03B2',
        gamma: '03B3',
        delta: '03B4',
        epsilon: '03F5',
        zeta: '03B6',
        eta: '03B7',
        theta: '03B8',
        iota: '03B9',
        kappa: '03BA',
        lambda: '03BB',
        mu: '03BC',
        nu: '03BD',
        xi: '03BE',
        omicron: '03BF',
        pi: '03C0',
        rho: '03C1',
        sigma: '03C3',
        tau: '03C4',
        upsilon: '03C5',
        phi: '03D5',
        chi: '03C7',
        psi: '03C8',
        omega: '03C9',
        varepsilon: '03B5',
        vartheta: '03D1',
        varpi: '03D6',
        varrho: '03F1',
        varsigma: '03C2',
        varphi: '03C6',
        S: ['00A7', { mathvariant: i.VARIANT.NORMAL }],
        aleph: ['2135', { mathvariant: i.VARIANT.NORMAL }],
        hbar: ['210F', { variantForm: true }],
        imath: '0131',
        jmath: '0237',
        ell: '2113',
        wp: ['2118', { mathvariant: i.VARIANT.NORMAL }],
        Re: ['211C', { mathvariant: i.VARIANT.NORMAL }],
        Im: ['2111', { mathvariant: i.VARIANT.NORMAL }],
        partial: ['2202', { mathvariant: i.VARIANT.NORMAL }],
        infty: ['221E', { mathvariant: i.VARIANT.NORMAL }],
        prime: ['2032', { mathvariant: i.VARIANT.NORMAL, variantForm: true }],
        emptyset: ['2205', { mathvariant: i.VARIANT.NORMAL }],
        nabla: ['2207', { mathvariant: i.VARIANT.NORMAL }],
        top: ['22A4', { mathvariant: i.VARIANT.NORMAL }],
        bot: ['22A5', { mathvariant: i.VARIANT.NORMAL }],
        angle: ['2220', { mathvariant: i.VARIANT.NORMAL }],
        triangle: ['25B3', { mathvariant: i.VARIANT.NORMAL }],
        backslash: [
          '2216',
          { mathvariant: i.VARIANT.NORMAL, variantForm: true }
        ],
        forall: ['2200', { mathvariant: i.VARIANT.NORMAL }],
        exists: ['2203', { mathvariant: i.VARIANT.NORMAL }],
        neg: ['00AC', { mathvariant: i.VARIANT.NORMAL }],
        lnot: ['00AC', { mathvariant: i.VARIANT.NORMAL }],
        flat: ['266D', { mathvariant: i.VARIANT.NORMAL }],
        natural: ['266E', { mathvariant: i.VARIANT.NORMAL }],
        sharp: ['266F', { mathvariant: i.VARIANT.NORMAL }],
        clubsuit: ['2663', { mathvariant: i.VARIANT.NORMAL }],
        diamondsuit: ['2662', { mathvariant: i.VARIANT.NORMAL }],
        heartsuit: ['2661', { mathvariant: i.VARIANT.NORMAL }],
        spadesuit: ['2660', { mathvariant: i.VARIANT.NORMAL }]
      },
      mathchar0mo: {
        surd: '221A',
        coprod: ['2210', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigvee: ['22C1', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigwedge: ['22C0', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        biguplus: ['2A04', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigcap: ['22C2', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigcup: ['22C3', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        int: ['222B', { texClass: i.TEXCLASS.OP }],
        intop: [
          '222B',
          { texClass: i.TEXCLASS.OP, movesupsub: true, movablelimits: true }
        ],
        iint: ['222C', { texClass: i.TEXCLASS.OP }],
        iiint: ['222D', { texClass: i.TEXCLASS.OP }],
        prod: ['220F', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        sum: ['2211', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigotimes: ['2A02', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigoplus: ['2A01', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        bigodot: ['2A00', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        oint: ['222E', { texClass: i.TEXCLASS.OP }],
        bigsqcup: ['2A06', { texClass: i.TEXCLASS.OP, movesupsub: true }],
        smallint: ['222B', { largeop: false }],
        triangleleft: '25C3',
        triangleright: '25B9',
        bigtriangleup: '25B3',
        bigtriangledown: '25BD',
        wedge: '2227',
        land: '2227',
        vee: '2228',
        lor: '2228',
        cap: '2229',
        cup: '222A',
        ddagger: '2021',
        dagger: '2020',
        sqcap: '2293',
        sqcup: '2294',
        uplus: '228E',
        amalg: '2A3F',
        diamond: '22C4',
        bullet: '2219',
        wr: '2240',
        div: '00F7',
        odot: ['2299', { largeop: false }],
        oslash: ['2298', { largeop: false }],
        otimes: ['2297', { largeop: false }],
        ominus: ['2296', { largeop: false }],
        oplus: ['2295', { largeop: false }],
        mp: '2213',
        pm: '00B1',
        circ: '2218',
        bigcirc: '25EF',
        setminus: ['2216', { variantForm: true }],
        cdot: '22C5',
        ast: '2217',
        times: '00D7',
        star: '22C6',
        propto: '221D',
        sqsubseteq: '2291',
        sqsupseteq: '2292',
        parallel: '2225',
        mid: '2223',
        dashv: '22A3',
        vdash: '22A2',
        leq: '2264',
        le: '2264',
        geq: '2265',
        ge: '2265',
        lt: '003C',
        gt: '003E',
        succ: '227B',
        prec: '227A',
        approx: '2248',
        succeq: '2AB0',
        preceq: '2AAF',
        supset: '2283',
        subset: '2282',
        supseteq: '2287',
        subseteq: '2286',
        in: '2208',
        ni: '220B',
        notin: '2209',
        owns: '220B',
        gg: '226B',
        ll: '226A',
        sim: '223C',
        simeq: '2243',
        perp: '22A5',
        equiv: '2261',
        asymp: '224D',
        smile: '2323',
        frown: '2322',
        ne: '2260',
        neq: '2260',
        cong: '2245',
        doteq: '2250',
        bowtie: '22C8',
        models: '22A8',
        notChar: '29F8',
        Leftrightarrow: '21D4',
        Leftarrow: '21D0',
        Rightarrow: '21D2',
        leftrightarrow: '2194',
        leftarrow: '2190',
        gets: '2190',
        rightarrow: '2192',
        to: '2192',
        mapsto: '21A6',
        leftharpoonup: '21BC',
        leftharpoondown: '21BD',
        rightharpoonup: '21C0',
        rightharpoondown: '21C1',
        nearrow: '2197',
        searrow: '2198',
        nwarrow: '2196',
        swarrow: '2199',
        rightleftharpoons: '21CC',
        hookrightarrow: '21AA',
        hookleftarrow: '21A9',
        longleftarrow: '27F5',
        Longleftarrow: '27F8',
        longrightarrow: '27F6',
        Longrightarrow: '27F9',
        Longleftrightarrow: '27FA',
        longleftrightarrow: '27F7',
        longmapsto: '27FC',
        ldots: '2026',
        cdots: '22EF',
        vdots: '22EE',
        ddots: '22F1',
        dotsc: '2026',
        dotsb: '22EF',
        dotsm: '22EF',
        dotsi: '22EF',
        dotso: '2026',
        ldotp: ['002E', { texClass: i.TEXCLASS.PUNCT }],
        cdotp: ['22C5', { texClass: i.TEXCLASS.PUNCT }],
        colon: ['003A', { texClass: i.TEXCLASS.PUNCT }]
      },
      mathchar7: {
        Gamma: '0393',
        Delta: '0394',
        Theta: '0398',
        Lambda: '039B',
        Xi: '039E',
        Pi: '03A0',
        Sigma: '03A3',
        Upsilon: '03A5',
        Phi: '03A6',
        Psi: '03A8',
        Omega: '03A9',
        _: '005F',
        '#': '0023',
        $: '0024',
        '%': '0025',
        '&': '0026',
        And: '0026'
      },
      delimiter: {
        '(': '(',
        ')': ')',
        '[': '[',
        ']': ']',
        '<': '27E8',
        '>': '27E9',
        '\\lt': '27E8',
        '\\gt': '27E9',
        '/': '/',
        '|': ['|', { texClass: i.TEXCLASS.ORD }],
        '.': '',
        '\\\\': '\\',
        '\\lmoustache': '23B0',
        '\\rmoustache': '23B1',
        '\\lgroup': '27EE',
        '\\rgroup': '27EF',
        '\\arrowvert': '23D0',
        '\\Arrowvert': '2016',
        '\\bracevert': '23AA',
        '\\Vert': ['2016', { texClass: i.TEXCLASS.ORD }],
        '\\|': ['2016', { texClass: i.TEXCLASS.ORD }],
        '\\vert': ['|', { texClass: i.TEXCLASS.ORD }],
        '\\uparrow': '2191',
        '\\downarrow': '2193',
        '\\updownarrow': '2195',
        '\\Uparrow': '21D1',
        '\\Downarrow': '21D3',
        '\\Updownarrow': '21D5',
        '\\backslash': '\\',
        '\\rangle': '27E9',
        '\\langle': '27E8',
        '\\rbrace': '}',
        '\\lbrace': '{',
        '\\}': '}',
        '\\{': '{',
        '\\rceil': '2309',
        '\\lceil': '2308',
        '\\rfloor': '230B',
        '\\lfloor': '230A',
        '\\lbrack': '[',
        '\\rbrack': ']'
      },
      macros: {
        displaystyle: ['SetStyle', 'D', true, 0],
        textstyle: ['SetStyle', 'T', false, 0],
        scriptstyle: ['SetStyle', 'S', false, 1],
        scriptscriptstyle: ['SetStyle', 'SS', false, 2],
        rm: ['SetFont', i.VARIANT.NORMAL],
        mit: ['SetFont', i.VARIANT.ITALIC],
        oldstyle: ['SetFont', i.VARIANT.OLDSTYLE],
        cal: ['SetFont', i.VARIANT.CALIGRAPHIC],
        it: ['SetFont', '-tex-mathit'],
        bf: ['SetFont', i.VARIANT.BOLD],
        bbFont: ['SetFont', i.VARIANT.DOUBLESTRUCK],
        scr: ['SetFont', i.VARIANT.SCRIPT],
        frak: ['SetFont', i.VARIANT.FRAKTUR],
        sf: ['SetFont', i.VARIANT.SANSSERIF],
        tt: ['SetFont', i.VARIANT.MONOSPACE],
        tiny: ['SetSize', 0.5],
        Tiny: ['SetSize', 0.6],
        scriptsize: ['SetSize', 0.7],
        small: ['SetSize', 0.85],
        normalsize: ['SetSize', 1],
        large: ['SetSize', 1.2],
        Large: ['SetSize', 1.44],
        LARGE: ['SetSize', 1.73],
        huge: ['SetSize', 2.07],
        Huge: ['SetSize', 2.49],
        arcsin: ['NamedFn'],
        arccos: ['NamedFn'],
        arctan: ['NamedFn'],
        arg: ['NamedFn'],
        cos: ['NamedFn'],
        cosh: ['NamedFn'],
        cot: ['NamedFn'],
        coth: ['NamedFn'],
        csc: ['NamedFn'],
        deg: ['NamedFn'],
        det: 'NamedOp',
        dim: ['NamedFn'],
        exp: ['NamedFn'],
        gcd: 'NamedOp',
        hom: ['NamedFn'],
        inf: 'NamedOp',
        ker: ['NamedFn'],
        lg: ['NamedFn'],
        lim: 'NamedOp',
        liminf: ['NamedOp', 'lim&thinsp;inf'],
        limsup: ['NamedOp', 'lim&thinsp;sup'],
        ln: ['NamedFn'],
        log: ['NamedFn'],
        max: 'NamedOp',
        min: 'NamedOp',
        Pr: 'NamedOp',
        sec: ['NamedFn'],
        sin: ['NamedFn'],
        sinh: ['NamedFn'],
        sup: 'NamedOp',
        tan: ['NamedFn'],
        tanh: ['NamedFn'],
        limits: ['Limits', 1],
        nolimits: ['Limits', 0],
        overline: ['UnderOver', '00AF', null, 1],
        underline: ['UnderOver', '005F'],
        overbrace: ['UnderOver', '23DE', 1],
        underbrace: ['UnderOver', '23DF', 1],
        overparen: ['UnderOver', '23DC'],
        underparen: ['UnderOver', '23DD'],
        overrightarrow: ['UnderOver', '2192'],
        underrightarrow: ['UnderOver', '2192'],
        overleftarrow: ['UnderOver', '2190'],
        underleftarrow: ['UnderOver', '2190'],
        overleftrightarrow: ['UnderOver', '2194'],
        underleftrightarrow: ['UnderOver', '2194'],
        overset: 'Overset',
        underset: 'Underset',
        stackrel: ['Macro', '\\mathrel{\\mathop{#2}\\limits^{#1}}', 2],
        over: 'Over',
        overwithdelims: 'Over',
        atop: 'Over',
        atopwithdelims: 'Over',
        above: 'Over',
        abovewithdelims: 'Over',
        brace: ['Over', '{', '}'],
        brack: ['Over', '[', ']'],
        choose: ['Over', '(', ')'],
        frac: 'Frac',
        sqrt: 'Sqrt',
        root: 'Root',
        uproot: ['MoveRoot', 'upRoot'],
        leftroot: ['MoveRoot', 'leftRoot'],
        left: 'LeftRight',
        right: 'LeftRight',
        middle: 'Middle',
        llap: 'Lap',
        rlap: 'Lap',
        raise: 'RaiseLower',
        lower: 'RaiseLower',
        moveleft: 'MoveLeftRight',
        moveright: 'MoveLeftRight',
        ',': ['Spacer', i.LENGTH.THINMATHSPACE],
        ':': ['Spacer', i.LENGTH.MEDIUMMATHSPACE],
        '>': ['Spacer', i.LENGTH.MEDIUMMATHSPACE],
        ';': ['Spacer', i.LENGTH.THICKMATHSPACE],
        '!': ['Spacer', i.LENGTH.NEGATIVETHINMATHSPACE],
        enspace: ['Spacer', '.5em'],
        quad: ['Spacer', '1em'],
        qquad: ['Spacer', '2em'],
        thinspace: ['Spacer', i.LENGTH.THINMATHSPACE],
        negthinspace: ['Spacer', i.LENGTH.NEGATIVETHINMATHSPACE],
        hskip: 'Hskip',
        hspace: 'Hskip',
        kern: 'Hskip',
        mskip: 'Hskip',
        mspace: 'Hskip',
        mkern: 'Hskip',
        rule: 'rule',
        Rule: ['Rule'],
        Space: ['Rule', 'blank'],
        big: ['MakeBig', i.TEXCLASS.ORD, 0.85],
        Big: ['MakeBig', i.TEXCLASS.ORD, 1.15],
        bigg: ['MakeBig', i.TEXCLASS.ORD, 1.45],
        Bigg: ['MakeBig', i.TEXCLASS.ORD, 1.75],
        bigl: ['MakeBig', i.TEXCLASS.OPEN, 0.85],
        Bigl: ['MakeBig', i.TEXCLASS.OPEN, 1.15],
        biggl: ['MakeBig', i.TEXCLASS.OPEN, 1.45],
        Biggl: ['MakeBig', i.TEXCLASS.OPEN, 1.75],
        bigr: ['MakeBig', i.TEXCLASS.CLOSE, 0.85],
        Bigr: ['MakeBig', i.TEXCLASS.CLOSE, 1.15],
        biggr: ['MakeBig', i.TEXCLASS.CLOSE, 1.45],
        Biggr: ['MakeBig', i.TEXCLASS.CLOSE, 1.75],
        bigm: ['MakeBig', i.TEXCLASS.REL, 0.85],
        Bigm: ['MakeBig', i.TEXCLASS.REL, 1.15],
        biggm: ['MakeBig', i.TEXCLASS.REL, 1.45],
        Biggm: ['MakeBig', i.TEXCLASS.REL, 1.75],
        mathord: ['TeXAtom', i.TEXCLASS.ORD],
        mathop: ['TeXAtom', i.TEXCLASS.OP],
        mathopen: ['TeXAtom', i.TEXCLASS.OPEN],
        mathclose: ['TeXAtom', i.TEXCLASS.CLOSE],
        mathbin: ['TeXAtom', i.TEXCLASS.BIN],
        mathrel: ['TeXAtom', i.TEXCLASS.REL],
        mathpunct: ['TeXAtom', i.TEXCLASS.PUNCT],
        mathinner: ['TeXAtom', i.TEXCLASS.INNER],
        vcenter: ['TeXAtom', i.TEXCLASS.VCENTER],
        mathchoice: ['Extension', 'mathchoice'],
        buildrel: 'BuildRel',
        hbox: ['HBox', 0],
        text: 'HBox',
        mbox: ['HBox', 0],
        fbox: 'FBox',
        strut: 'Strut',
        mathstrut: ['Macro', '\\vphantom{(}'],
        phantom: 'Phantom',
        vphantom: ['Phantom', 1, 0],
        hphantom: ['Phantom', 0, 1],
        smash: 'Smash',
        acute: ['Accent', '00B4'],
        grave: ['Accent', '0060'],
        ddot: ['Accent', '00A8'],
        tilde: ['Accent', '007E'],
        bar: ['Accent', '00AF'],
        breve: ['Accent', '02D8'],
        check: ['Accent', '02C7'],
        hat: ['Accent', '005E'],
        vec: ['Accent', '2192'],
        dot: ['Accent', '02D9'],
        widetilde: ['Accent', '007E', 1],
        widehat: ['Accent', '005E', 1],
        matrix: 'Matrix',
        array: 'Matrix',
        pmatrix: ['Matrix', '(', ')'],
        cases: ['Matrix', '{', '', 'left left', null, '.1em', null, true],
        eqalign: [
          'Matrix',
          null,
          null,
          'right left',
          i.LENGTH.THICKMATHSPACE,
          '.5em',
          'D'
        ],
        displaylines: ['Matrix', null, null, 'center', null, '.5em', 'D'],
        cr: 'Cr',
        '\\': 'CrLaTeX',
        newline: 'Cr',
        hline: ['HLine', 'solid'],
        hdashline: ['HLine', 'dashed'],
        eqalignno: [
          'Matrix',
          null,
          null,
          'right left',
          i.LENGTH.THICKMATHSPACE,
          '.5em',
          'D',
          null,
          'right'
        ],
        leqalignno: [
          'Matrix',
          null,
          null,
          'right left',
          i.LENGTH.THICKMATHSPACE,
          '.5em',
          'D',
          null,
          'left'
        ],
        hfill: 'HFill',
        hfil: 'HFill',
        hfilll: 'HFill',
        bmod: [
          'Macro',
          '\\mmlToken{mo}[lspace="thickmathspace" rspace="thickmathspace"]{mod}'
        ],
        pmod: ['Macro', '\\pod{\\mmlToken{mi}{mod}\\kern 6mu #1}', 1],
        mod: [
          'Macro',
          '\\mathchoice{\\kern18mu}{\\kern12mu}{\\kern12mu}{\\kern12mu}\\mmlToken{mi}{mod}\\,\\,#1',
          1
        ],
        pod: [
          'Macro',
          '\\mathchoice{\\kern18mu}{\\kern8mu}{\\kern8mu}{\\kern8mu}(#1)',
          1
        ],
        iff: ['Macro', '\\;\\Longleftrightarrow\\;'],
        skew: ['Macro', '{{#2{#3\\mkern#1mu}\\mkern-#1mu}{}}', 3],
        mathcal: ['Macro', '{\\cal #1}', 1],
        mathscr: ['Macro', '{\\scr #1}', 1],
        mathrm: ['Macro', '{\\rm #1}', 1],
        mathbf: ['Macro', '{\\bf #1}', 1],
        mathbb: ['Macro', '{\\bbFont #1}', 1],
        Bbb: ['Macro', '{\\bbFont #1}', 1],
        mathit: ['Macro', '{\\it #1}', 1],
        mathfrak: ['Macro', '{\\frak #1}', 1],
        mathsf: ['Macro', '{\\sf #1}', 1],
        mathtt: ['Macro', '{\\tt #1}', 1],
        textrm: ['Macro', '\\mathord{\\rm\\text{#1}}', 1],
        textit: ['Macro', '\\mathord{\\it\\text{#1}}', 1],
        textbf: ['Macro', '\\mathord{\\bf\\text{#1}}', 1],
        textsf: ['Macro', '\\mathord{\\sf\\text{#1}}', 1],
        texttt: ['Macro', '\\mathord{\\tt\\text{#1}}', 1],
        pmb: ['Macro', '\\rlap{#1}\\kern1px{#1}', 1],
        TeX: ['Macro', 'T\\kern-.14em\\lower.5ex{E}\\kern-.115em X'],
        LaTeX: [
          'Macro',
          'L\\kern-.325em\\raise.21em{\\scriptstyle{A}}\\kern-.17em\\TeX'
        ],
        ' ': ['Macro', '\\text{ }'],
        not: 'Not',
        dots: 'Dots',
        space: 'Tilde',
        '\u00A0': 'Tilde',
        begin: 'BeginEnd',
        end: 'BeginEnd',
        newcommand: ['Extension', 'newcommand'],
        renewcommand: ['Extension', 'newcommand'],
        newenvironment: ['Extension', 'newcommand'],
        renewenvironment: ['Extension', 'newcommand'],
        def: ['Extension', 'newcommand'],
        let: ['Extension', 'newcommand'],
        verb: ['Extension', 'verb'],
        boldsymbol: ['Extension', 'boldsymbol'],
        tag: ['Extension', 'AMSmath'],
        notag: ['Extension', 'AMSmath'],
        label: ['Extension', 'AMSmath'],
        ref: ['Extension', 'AMSmath'],
        eqref: ['Extension', 'AMSmath'],
        nonumber: ['Macro', '\\notag'],
        unicode: ['Extension', 'unicode'],
        color: 'Color',
        href: ['Extension', 'HTML'],
        class: ['Extension', 'HTML'],
        style: ['Extension', 'HTML'],
        cssId: ['Extension', 'HTML'],
        bbox: ['Extension', 'bbox'],
        mmlToken: 'MmlToken',
        require: 'Require'
      },
      environment: {
        array: ['AlignedArray'],
        matrix: ['Array', null, null, null, 'c'],
        pmatrix: ['Array', null, '(', ')', 'c'],
        bmatrix: ['Array', null, '[', ']', 'c'],
        Bmatrix: ['Array', null, '\\{', '\\}', 'c'],
        vmatrix: ['Array', null, '\\vert', '\\vert', 'c'],
        Vmatrix: ['Array', null, '\\Vert', '\\Vert', 'c'],
        cases: ['Array', null, '\\{', '.', 'll', null, '.2em', 'T'],
        equation: [null, 'Equation'],
        'equation*': [null, 'Equation'],
        eqnarray: ['ExtensionEnv', null, 'AMSmath'],
        'eqnarray*': ['ExtensionEnv', null, 'AMSmath'],
        align: ['ExtensionEnv', null, 'AMSmath'],
        'align*': ['ExtensionEnv', null, 'AMSmath'],
        aligned: ['ExtensionEnv', null, 'AMSmath'],
        multline: ['ExtensionEnv', null, 'AMSmath'],
        'multline*': ['ExtensionEnv', null, 'AMSmath'],
        split: ['ExtensionEnv', null, 'AMSmath'],
        gather: ['ExtensionEnv', null, 'AMSmath'],
        'gather*': ['ExtensionEnv', null, 'AMSmath'],
        gathered: ['ExtensionEnv', null, 'AMSmath'],
        alignat: ['ExtensionEnv', null, 'AMSmath'],
        'alignat*': ['ExtensionEnv', null, 'AMSmath'],
        alignedat: ['ExtensionEnv', null, 'AMSmath']
      },
      p_height: 1.2 / 0.85
    });
    if (this.config.Macros) {
      var m = this.config.Macros;
      for (var n in m) {
        if (m.hasOwnProperty(n)) {
          if (typeof m[n] === 'string') {
            g.macros[n] = ['Macro', m[n]];
          } else {
            g.macros[n] = ['Macro'].concat(m[n]);
          }
          g.macros[n].isUser = true;
        }
      }
    }
  };
  var a = MathJax.Object.Subclass({
    Init: function(n, o) {
      this.string = n;
      this.i = 0;
      this.macroCount = 0;
      var m;
      if (o) {
        m = {};
        for (var p in o) {
          if (o.hasOwnProperty(p)) {
            m[p] = o[p];
          }
        }
      }
      this.stack = d.Stack(m, !!o);
      this.Parse();
      this.Push(b.stop());
    },
    Parse: function() {
      var o, m;
      while (this.i < this.string.length) {
        o = this.string.charAt(this.i++);
        m = o.charCodeAt(0);
        if (m >= 55296 && m < 56320) {
          o += this.string.charAt(this.i++);
        }
        if (g.special.hasOwnProperty(o)) {
          this[g.special[o]](o);
        } else {
          if (g.letter.test(o)) {
            this.Variable(o);
          } else {
            if (g.digit.test(o)) {
              this.Number(o);
            } else {
              this.Other(o);
            }
          }
        }
      }
    },
    Push: function() {
      this.stack.Push.apply(this.stack, arguments);
    },
    mml: function() {
      if (this.stack.Top().type !== 'mml') {
        return null;
      }
      return this.stack.Top().data[0];
    },
    mmlToken: function(m) {
      return m;
    },
    ControlSequence: function(p) {
      var m = this.GetCS(),
        o = this.csFindMacro(m);
      if (o) {
        if (!f(o)) {
          o = [o];
        }
        var n = o[0];
        if (!(n instanceof Function)) {
          n = this[n];
        }
        n.apply(this, [p + m].concat(o.slice(1)));
      } else {
        if (g.mathchar0mi.hasOwnProperty(m)) {
          this.csMathchar0mi(m, g.mathchar0mi[m]);
        } else {
          if (g.mathchar0mo.hasOwnProperty(m)) {
            this.csMathchar0mo(m, g.mathchar0mo[m]);
          } else {
            if (g.mathchar7.hasOwnProperty(m)) {
              this.csMathchar7(m, g.mathchar7[m]);
            } else {
              if (g.delimiter.hasOwnProperty('\\' + m)) {
                this.csDelimiter(m, g.delimiter['\\' + m]);
              } else {
                this.csUndefined(p + m);
              }
            }
          }
        }
      }
    },
    csFindMacro: function(m) {
      return g.macros.hasOwnProperty(m) ? g.macros[m] : null;
    },
    csMathchar0mi: function(m, o) {
      var n = { mathvariant: i.VARIANT.ITALIC };
      if (f(o)) {
        n = o[1];
        o = o[0];
      }
      this.Push(this.mmlToken(i.mi(i.entity('#x' + o)).With(n)));
    },
    csMathchar0mo: function(m, o) {
      var n = { stretchy: false };
      if (f(o)) {
        n = o[1];
        n.stretchy = false;
        o = o[0];
      }
      this.Push(this.mmlToken(i.mo(i.entity('#x' + o)).With(n)));
    },
    csMathchar7: function(m, o) {
      var n = { mathvariant: i.VARIANT.NORMAL };
      if (f(o)) {
        n = o[1];
        o = o[0];
      }
      if (this.stack.env.font) {
        n.mathvariant = this.stack.env.font;
      }
      this.Push(this.mmlToken(i.mi(i.entity('#x' + o)).With(n)));
    },
    csDelimiter: function(m, o) {
      var n = {};
      if (f(o)) {
        n = o[1];
        o = o[0];
      }
      if (o.length === 4) {
        o = i.entity('#x' + o);
      } else {
        o = i.chars(o);
      }
      this.Push(
        this.mmlToken(
          i
            .mo(o)
            .With({ fence: false, stretchy: false })
            .With(n)
        )
      );
    },
    csUndefined: function(m) {
      d.Error(['UndefinedControlSequence', 'Undefined control sequence %1', m]);
    },
    Variable: function(n) {
      var m = {};
      if (this.stack.env.font) {
        m.mathvariant = this.stack.env.font;
      }
      this.Push(this.mmlToken(i.mi(i.chars(n)).With(m)));
    },
    Number: function(p) {
      var m,
        o = this.string.slice(this.i - 1).match(g.number);
      if (o) {
        m = i.mn(o[0].replace(/[{}]/g, ''));
        this.i += o[0].length - 1;
      } else {
        m = i.mo(i.chars(p));
      }
      if (this.stack.env.font) {
        m.mathvariant = this.stack.env.font;
      }
      this.Push(this.mmlToken(m));
    },
    Open: function(m) {
      this.Push(b.open());
    },
    Close: function(m) {
      this.Push(b.close());
    },
    Tilde: function(m) {
      this.Push(i.mtext(i.chars(h)));
    },
    Space: function(m) {},
    Superscript: function(r) {
      if (this.GetNext().match(/\d/)) {
        this.string =
          this.string.substr(0, this.i + 1) +
          ' ' +
          this.string.substr(this.i + 1);
      }
      var q,
        o,
        p = this.stack.Top();
      if (p.type === 'prime') {
        o = p.data[0];
        q = p.data[1];
        this.stack.Pop();
      } else {
        o = this.stack.Prev();
        if (!o) {
          o = i.mi('');
        }
      }
      if (o.isEmbellishedWrapper) {
        o = o.data[0].data[0];
      }
      var n = o.movesupsub,
        m = o.sup;
      if (
        (o.type === 'msubsup' && o.data[o.sup]) ||
        (o.type === 'munderover' && o.data[o.over] && !o.subsupOK)
      ) {
        d.Error(['DoubleExponent', 'Double exponent: use braces to clarify']);
      }
      if (o.type !== 'msubsup') {
        if (n) {
          if (o.type !== 'munderover' || o.data[o.over]) {
            if (o.movablelimits && o.isa(i.mi)) {
              o = this.mi2mo(o);
            }
            o = i.munderover(o, null, null).With({ movesupsub: true });
          }
          m = o.over;
        } else {
          o = i.msubsup(o, null, null);
          m = o.sup;
        }
      }
      this.Push(b.subsup(o).With({ position: m, primes: q, movesupsub: n }));
    },
    Subscript: function(r) {
      if (this.GetNext().match(/\d/)) {
        this.string =
          this.string.substr(0, this.i + 1) +
          ' ' +
          this.string.substr(this.i + 1);
      }
      var q,
        o,
        p = this.stack.Top();
      if (p.type === 'prime') {
        o = p.data[0];
        q = p.data[1];
        this.stack.Pop();
      } else {
        o = this.stack.Prev();
        if (!o) {
          o = i.mi('');
        }
      }
      if (o.isEmbellishedWrapper) {
        o = o.data[0].data[0];
      }
      var n = o.movesupsub,
        m = o.sub;
      if (
        (o.type === 'msubsup' && o.data[o.sub]) ||
        (o.type === 'munderover' && o.data[o.under] && !o.subsupOK)
      ) {
        d.Error([
          'DoubleSubscripts',
          'Double subscripts: use braces to clarify'
        ]);
      }
      if (o.type !== 'msubsup') {
        if (n) {
          if (o.type !== 'munderover' || o.data[o.under]) {
            if (o.movablelimits && o.isa(i.mi)) {
              o = this.mi2mo(o);
            }
            o = i.munderover(o, null, null).With({ movesupsub: true });
          }
          m = o.under;
        } else {
          o = i.msubsup(o, null, null);
          m = o.sub;
        }
      }
      this.Push(b.subsup(o).With({ position: m, primes: q, movesupsub: n }));
    },
    PRIME: '\u2032',
    SMARTQUOTE: '\u2019',
    Prime: function(o) {
      var n = this.stack.Prev();
      if (!n) {
        n = i.mi();
      }
      if (n.type === 'msubsup' && n.data[n.sup]) {
        d.Error([
          'DoubleExponentPrime',
          'Prime causes double exponent: use braces to clarify'
        ]);
      }
      var m = '';
      this.i--;
      do {
        m += this.PRIME;
        this.i++, (o = this.GetNext());
      } while (o === "'" || o === this.SMARTQUOTE);
      m = ['', '\u2032', '\u2033', '\u2034', '\u2057'][m.length] || m;
      this.Push(b.prime(n, this.mmlToken(i.mo(m))));
    },
    mi2mo: function(m) {
      var n = i.mo();
      n.Append.apply(n, m.data);
      var o;
      for (o in n.defaults) {
        if (n.defaults.hasOwnProperty(o) && m[o] != null) {
          n[o] = m[o];
        }
      }
      for (o in i.copyAttributes) {
        if (i.copyAttributes.hasOwnProperty(o) && m[o] != null) {
          n[o] = m[o];
        }
      }
      n.lspace = n.rspace = '0';
      n.useMMLspacing &= ~(n.SPACE_ATTR.lspace | n.SPACE_ATTR.rspace);
      return n;
    },
    Comment: function(m) {
      while (
        this.i < this.string.length &&
        this.string.charAt(this.i) != '\n'
      ) {
        this.i++;
      }
    },
    Hash: function(m) {
      d.Error([
        'CantUseHash1',
        "You can't use 'macro parameter character #' in math mode"
      ]);
    },
    Other: function(o) {
      var n, m;
      if (this.stack.env.font) {
        n = { mathvariant: this.stack.env.font };
      }
      if (g.remap.hasOwnProperty(o)) {
        o = g.remap[o];
        if (f(o)) {
          n = o[1];
          o = o[0];
        }
        m = i.mo(i.entity('#x' + o)).With(n);
      } else {
        m = i.mo(o).With(n);
      }
      if (m.autoDefault('stretchy', true)) {
        m.stretchy = false;
      }
      if (m.autoDefault('texClass', true) == '') {
        m = i.TeXAtom(m);
      }
      this.Push(this.mmlToken(m));
    },
    SetFont: function(n, m) {
      this.stack.env.font = m;
    },
    SetStyle: function(n, m, o, p) {
      this.stack.env.style = m;
      this.stack.env.level = p;
      this.Push(
        b.style().With({ styles: { displaystyle: o, scriptlevel: p } })
      );
    },
    SetSize: function(m, n) {
      this.stack.env.size = n;
      this.Push(b.style().With({ styles: { mathsize: n + 'em' } }));
    },
    Color: function(o) {
      var n = this.GetArgument(o);
      var m = this.stack.env.color;
      this.stack.env.color = n;
      var p = this.ParseArg(o);
      if (m) {
        this.stack.env.color;
      } else {
        delete this.stack.env.color;
      }
      this.Push(i.mstyle(p).With({ mathcolor: n }));
    },
    Spacer: function(m, n) {
      this.Push(
        i.mspace().With({ width: n, mathsize: i.SIZE.NORMAL, scriptlevel: 0 })
      );
    },
    LeftRight: function(m) {
      this.Push(b[m.substr(1)]().With({ delim: this.GetDelimiter(m) }));
    },
    Middle: function(m) {
      var n = this.GetDelimiter(m);
      this.Push(i.TeXAtom().With({ texClass: i.TEXCLASS.CLOSE }));
      if (this.stack.Top().type !== 'left') {
        d.Error(['MisplacedMiddle', '%1 must be within \\left and \\right', m]);
      }
      this.Push(i.mo(n).With({ stretchy: true }));
      this.Push(i.TeXAtom().With({ texClass: i.TEXCLASS.OPEN }));
    },
    NamedFn: function(n, o) {
      if (!o) {
        o = n.substr(1);
      }
      var m = i.mi(o).With({ texClass: i.TEXCLASS.OP });
      this.Push(b.fn(this.mmlToken(m)));
    },
    NamedOp: function(n, o) {
      if (!o) {
        o = n.substr(1);
      }
      o = o.replace(/&thinsp;/, '\u2006');
      var m = i
        .mo(o)
        .With({
          movablelimits: true,
          movesupsub: true,
          form: i.FORM.PREFIX,
          texClass: i.TEXCLASS.OP
        });
      this.Push(this.mmlToken(m));
    },
    Limits: function(n, m) {
      var p = this.stack.Prev('nopop');
      if (!p || (p.Get('texClass') !== i.TEXCLASS.OP && p.movesupsub == null)) {
        d.Error(['MisplacedLimits', '%1 is allowed only on operators', n]);
      }
      var o = this.stack.Top();
      if (p.type === 'munderover' && !m) {
        p = o.data[o.data.length - 1] = i.msubsup.apply(i.subsup, p.data);
      } else {
        if (p.type === 'msubsup' && m) {
          p = o.data[o.data.length - 1] = i.munderover.apply(
            i.underover,
            p.data
          );
        }
      }
      p.movesupsub = m ? true : false;
      p.Core().movablelimits = false;
      if (p.movablelimits) {
        p.movablelimits = false;
      }
    },
    Over: function(o, n, p) {
      var m = b.over().With({ name: o });
      if (n || p) {
        m.open = n;
        m.close = p;
      } else {
        if (o.match(/withdelims$/)) {
          m.open = this.GetDelimiter(o);
          m.close = this.GetDelimiter(o);
        }
      }
      if (o.match(/^\\above/)) {
        m.thickness = this.GetDimen(o);
      } else {
        if (o.match(/^\\atop/) || n || p) {
          m.thickness = 0;
        }
      }
      this.Push(m);
    },
    Frac: function(n) {
      var m = this.ParseArg(n);
      var o = this.ParseArg(n);
      this.Push(i.mfrac(m, o));
    },
    Sqrt: function(p) {
      var q = this.GetBrackets(p),
        m = this.GetArgument(p);
      if (m === '\\frac') {
        m += '{' + this.GetArgument(m) + '}{' + this.GetArgument(m) + '}';
      }
      var o = d.Parse(m, this.stack.env).mml();
      if (!q) {
        o = i.msqrt.apply(i, o.array());
      } else {
        o = i.mroot(o, this.parseRoot(q));
      }
      this.Push(o);
    },
    Root: function(o) {
      var p = this.GetUpTo(o, '\\of');
      var m = this.ParseArg(o);
      this.Push(i.mroot(m, this.parseRoot(p)));
    },
    parseRoot: function(r) {
      var o = this.stack.env,
        m = o.inRoot;
      o.inRoot = true;
      var q = d.Parse(r, o);
      r = q.mml();
      var p = q.stack.global;
      if (p.leftRoot || p.upRoot) {
        r = i.mpadded(r);
        if (p.leftRoot) {
          r.width = p.leftRoot;
        }
        if (p.upRoot) {
          r.voffset = p.upRoot;
          r.height = p.upRoot;
        }
      }
      o.inRoot = m;
      return r;
    },
    MoveRoot: function(m, p) {
      if (!this.stack.env.inRoot) {
        d.Error(['MisplacedMoveRoot', '%1 can appear only within a root', m]);
      }
      if (this.stack.global[p]) {
        d.Error(['MultipleMoveRoot', 'Multiple use of %1', m]);
      }
      var o = this.GetArgument(m);
      if (!o.match(/-?[0-9]+/)) {
        d.Error(['IntegerArg', 'The argument to %1 must be an integer', m]);
      }
      o = o / 15 + 'em';
      if (o.substr(0, 1) !== '-') {
        o = '+' + o;
      }
      this.stack.global[p] = o;
    },
    Accent: function(o, m, s) {
      var r = this.ParseArg(o);
      var q = { accent: true };
      if (this.stack.env.font) {
        q.mathvariant = this.stack.env.font;
      }
      var n = this.mmlToken(i.mo(i.entity('#x' + m)).With(q));
      n.stretchy = s ? true : false;
      var p = r.isEmbellished() ? r.CoreMO() : r;
      if (p.isa(i.mo)) {
        p.movablelimits = false;
      }
      this.Push(i.TeXAtom(i.munderover(r, null, n).With({ accent: true })));
    },
    UnderOver: function(o, s, m, q) {
      var r = { o: 'over', u: 'under' }[o.charAt(1)];
      var p = this.ParseArg(o);
      if (p.Get('movablelimits')) {
        p.movablelimits = false;
      }
      if (p.isa(i.munderover) && p.isEmbellished()) {
        p.Core().With({ lspace: 0, rspace: 0 });
        p = i.mrow(i.mo().With({ rspace: 0 }), p);
      }
      var n = i.munderover(p, null, null);
      n.SetData(
        n[r],
        this.mmlToken(
          i.mo(i.entity('#x' + s)).With({ stretchy: true, accent: !q })
        )
      );
      if (m) {
        n = i.TeXAtom(n).With({ texClass: i.TEXCLASS.OP, movesupsub: true });
      }
      this.Push(n.With({ subsupOK: true }));
    },
    Overset: function(m) {
      var o = this.ParseArg(m),
        n = this.ParseArg(m);
      n.movablelimits = false;
      this.Push(i.mover(n, o));
    },
    Underset: function(m) {
      var o = this.ParseArg(m),
        n = this.ParseArg(m);
      n.movablelimits = false;
      this.Push(i.munder(n, o));
    },
    TeXAtom: function(p, r) {
      var q = { texClass: r },
        o;
      if (r == i.TEXCLASS.OP) {
        q.movesupsub = q.movablelimits = true;
        var m = this.GetArgument(p);
        var n = m.match(/^\s*\\rm\s+([a-zA-Z0-9 ]+)$/);
        if (n) {
          q.mathvariant = i.VARIANT.NORMAL;
          o = b.fn(this.mmlToken(i.mi(n[1]).With(q)));
        } else {
          o = b.fn(i.TeXAtom(d.Parse(m, this.stack.env).mml()).With(q));
        }
      } else {
        o = i.TeXAtom(this.ParseArg(p)).With(q);
      }
      this.Push(o);
    },
    MmlToken: function(o) {
      var p = this.GetArgument(o),
        m = this.GetBrackets(o, '').replace(/^\s+/, ''),
        s = this.GetArgument(o),
        r = { attrNames: [] },
        n;
      if (!i[p] || !i[p].prototype.isToken) {
        d.Error(['NotMathMLToken', '%1 is not a token element', p]);
      }
      while (m !== '') {
        n = m.match(/^([a-z]+)\s*=\s*('[^']*'|"[^"]*"|[^ ,]*)\s*,?\s*/i);
        if (!n) {
          d.Error(['InvalidMathMLAttr', 'Invalid MathML attribute: %1', m]);
        }
        if (
          i[p].prototype.defaults[n[1]] == null &&
          !this.MmlTokenAllow[n[1]]
        ) {
          d.Error([
            'UnknownAttrForElement',
            '%1 is not a recognized attribute for %2',
            n[1],
            p
          ]);
        }
        var q = this.MmlFilterAttribute(
          n[1],
          n[2].replace(/^(['"])(.*)\1$/, '$2')
        );
        if (q) {
          if (q.toLowerCase() === 'true') {
            q = true;
          } else {
            if (q.toLowerCase() === 'false') {
              q = false;
            }
          }
          r[n[1]] = q;
          r.attrNames.push(n[1]);
        }
        m = m.substr(n[0].length);
      }
      this.Push(this.mmlToken(i[p](s).With(r)));
    },
    MmlFilterAttribute: function(m, n) {
      return n;
    },
    MmlTokenAllow: {
      fontfamily: 1,
      fontsize: 1,
      fontweight: 1,
      fontstyle: 1,
      color: 1,
      background: 1,
      id: 1,
      class: 1,
      href: 1,
      style: 1
    },
    Strut: function(m) {
      this.Push(
        i.mpadded(i.mrow()).With({ height: '8.6pt', depth: '3pt', width: 0 })
      );
    },
    Phantom: function(n, m, o) {
      var p = i.mphantom(this.ParseArg(n));
      if (m || o) {
        p = i.mpadded(p);
        if (o) {
          p.height = p.depth = 0;
        }
        if (m) {
          p.width = 0;
        }
      }
      this.Push(i.TeXAtom(p));
    },
    Smash: function(o) {
      var n = this.trimSpaces(this.GetBrackets(o, ''));
      var m = i.mpadded(this.ParseArg(o));
      switch (n) {
        case 'b':
          m.depth = 0;
          break;
        case 't':
          m.height = 0;
          break;
        default:
          m.height = m.depth = 0;
      }
      this.Push(i.TeXAtom(m));
    },
    Lap: function(n) {
      var m = i.mpadded(this.ParseArg(n)).With({ width: 0 });
      if (n === '\\llap') {
        m.lspace = '-1width';
      }
      this.Push(i.TeXAtom(m));
    },
    RaiseLower: function(m) {
      var n = this.GetDimen(m);
      var o = b.position().With({ name: m, move: 'vertical' });
      if (n.charAt(0) === '-') {
        n = n.slice(1);
        m = { raise: '\\lower', lower: '\\raise' }[m.substr(1)];
      }
      if (m === '\\lower') {
        o.dh = '-' + n;
        o.dd = '+' + n;
      } else {
        o.dh = '+' + n;
        o.dd = '-' + n;
      }
      this.Push(o);
    },
    MoveLeftRight: function(m) {
      var p = this.GetDimen(m);
      var o = p.charAt(0) === '-' ? p.slice(1) : '-' + p;
      if (m === '\\moveleft') {
        var n = p;
        p = o;
        o = n;
      }
      this.Push(
        b
          .position()
          .With({
            name: m,
            move: 'horizontal',
            left: i.mspace().With({ width: p, mathsize: i.SIZE.NORMAL }),
            right: i.mspace().With({ width: o, mathsize: i.SIZE.NORMAL })
          })
      );
    },
    Hskip: function(m) {
      this.Push(
        i.mspace().With({ width: this.GetDimen(m), mathsize: i.SIZE.NORMAL })
      );
    },
    Rule: function(n, p) {
      var m = this.GetDimen(n),
        o = this.GetDimen(n),
        r = this.GetDimen(n);
      var q = { width: m, height: o, depth: r };
      if (p !== 'blank') {
        q.mathbackground = this.stack.env.color || 'black';
      }
      this.Push(i.mspace().With(q));
    },
    rule: function(p) {
      var n = this.GetBrackets(p),
        m = this.GetDimen(p),
        q = this.GetDimen(p);
      var o = i
        .mspace()
        .With({
          width: m,
          height: q,
          mathbackground: this.stack.env.color || 'black'
        });
      if (n) {
        o = i.mpadded(o).With({ voffset: n });
        if (n.match(/^\-/)) {
          o.height = n;
          o.depth = '+' + n.substr(1);
        } else {
          o.height = '+' + n;
        }
      }
      this.Push(o);
    },
    MakeBig: function(m, p, n) {
      n *= g.p_height;
      n = String(n).replace(/(\.\d\d\d).+/, '$1') + 'em';
      var o = this.GetDelimiter(m, true);
      this.Push(
        i
          .mstyle(
            i
              .TeXAtom(
                i
                  .mo(o)
                  .With({
                    minsize: n,
                    maxsize: n,
                    fence: true,
                    stretchy: true,
                    symmetric: true
                  })
              )
              .With({ texClass: p })
          )
          .With({ scriptlevel: 0 })
      );
    },
    BuildRel: function(m) {
      var n = this.ParseUpTo(m, '\\over');
      var o = this.ParseArg(m);
      this.Push(
        i.TeXAtom(i.munderover(o, null, n)).With({ texClass: i.TEXCLASS.REL })
      );
    },
    HBox: function(m, n) {
      this.Push.apply(this, this.InternalMath(this.GetArgument(m), n));
    },
    FBox: function(m) {
      this.Push(
        i.menclose
          .apply(i, this.InternalMath(this.GetArgument(m)))
          .With({ notation: 'box' })
      );
    },
    Not: function(m) {
      this.Push(b.not());
    },
    Dots: function(m) {
      this.Push(
        b
          .dots()
          .With({
            ldots: this.mmlToken(
              i.mo(i.entity('#x2026')).With({ stretchy: false })
            ),
            cdots: this.mmlToken(
              i.mo(i.entity('#x22EF')).With({ stretchy: false })
            )
          })
      );
    },
    Require: function(m) {
      var n = this.GetArgument(m)
        .replace(/.*\//, '')
        .replace(/[^a-z0-9_.-]/gi, '');
      this.Extension(null, n);
    },
    Extension: function(m, n, o) {
      if (m && !typeof m === 'string') {
        m = m.name;
      }
      n = d.extensionDir + '/' + n;
      if (!n.match(/\.js$/)) {
        n += '.js';
      }
      if (!j.loaded[j.fileURL(n)]) {
        if (m != null) {
          delete g[o || 'macros'][m.replace(/^\\/, '')];
        }
        c.RestartAfter(j.Require(n));
      }
    },
    Macro: function(o, r, q, s) {
      if (q) {
        var n = [];
        if (s != null) {
          var m = this.GetBrackets(o);
          n.push(m == null ? s : m);
        }
        for (var p = n.length; p < q; p++) {
          n.push(this.GetArgument(o));
        }
        r = this.SubstituteArgs(n, r);
      }
      this.string = this.AddArgs(r, this.string.slice(this.i));
      this.i = 0;
      if (++this.macroCount > d.config.MAXMACROS) {
        d.Error([
          'MaxMacroSub1',
          'MathJax maximum macro substitution count exceeded; is there a recursive macro call?'
        ]);
      }
    },
    Matrix: function(n, p, v, r, u, o, m, w, t) {
      var s = this.GetNext();
      if (s === '') {
        d.Error(['MissingArgFor', 'Missing argument for %1', n]);
      }
      if (s === '{') {
        this.i++;
      } else {
        this.string = s + '}' + this.string.slice(this.i + 1);
        this.i = 0;
      }
      var q = b
        .array()
        .With({
          requireClose: true,
          arraydef: { rowspacing: o || '4pt', columnspacing: u || '1em' }
        });
      if (w) {
        q.isCases = true;
      }
      if (t) {
        q.isNumbered = true;
        q.arraydef.side = t;
      }
      if (p || v) {
        q.open = p;
        q.close = v;
      }
      if (m === 'D') {
        q.arraydef.displaystyle = true;
      }
      if (r != null) {
        q.arraydef.columnalign = r;
      }
      this.Push(q);
    },
    Entry: function(p) {
      this.Push(b.cell().With({ isEntry: true, name: p }));
      if (this.stack.Top().isCases) {
        var o = this.string;
        var t = 0,
          s = -1,
          q = this.i,
          n = o.length;
        while (q < n) {
          var u = o.charAt(q);
          if (u === '{') {
            t++;
            q++;
          } else {
            if (u === '}') {
              if (t === 0) {
                n = 0;
              } else {
                t--;
                if (t === 0 && s < 0) {
                  s = q - this.i;
                }
                q++;
              }
            } else {
              if (u === '&' && t === 0) {
                d.Error([
                  'ExtraAlignTab',
                  'Extra alignment tab in \\cases text'
                ]);
              } else {
                if (u === '\\') {
                  if (o.substr(q).match(/^((\\cr)[^a-zA-Z]|\\\\)/)) {
                    n = 0;
                  } else {
                    q += 2;
                  }
                } else {
                  q++;
                }
              }
            }
          }
        }
        var r = o.substr(this.i, q - this.i);
        if (
          !r.match(/^\s*\\text[^a-zA-Z]/) ||
          s !== r.replace(/\s+$/, '').length - 1
        ) {
          this.Push.apply(this, this.InternalMath(r, 0));
          this.i = q;
        }
      }
    },
    Cr: function(m) {
      this.Push(b.cell().With({ isCR: true, name: m }));
    },
    CrLaTeX: function(m) {
      var q;
      if (this.string.charAt(this.i) === '[') {
        q = this.GetBrackets(m, '')
          .replace(/ /g, '')
          .replace(/,/, '.');
        if (q && !this.matchDimen(q)) {
          d.Error([
            'BracketMustBeDimension',
            'Bracket argument to %1 must be a dimension',
            m
          ]);
        }
      }
      this.Push(b.cell().With({ isCR: true, name: m, linebreak: true }));
      var p = this.stack.Top();
      if (p.isa(b.array)) {
        if (q && p.arraydef.rowspacing) {
          var o = p.arraydef.rowspacing.split(/ /);
          if (!p.rowspacing) {
            p.rowspacing = this.dimen2em(o[0]);
          }
          while (o.length < p.table.length) {
            o.push(this.Em(p.rowspacing));
          }
          o[p.table.length - 1] = this.Em(
            Math.max(0, p.rowspacing + this.dimen2em(q))
          );
          p.arraydef.rowspacing = o.join(' ');
        }
      } else {
        if (q) {
          this.Push(i.mspace().With({ depth: q }));
        }
        this.Push(i.mspace().With({ linebreak: i.LINEBREAK.NEWLINE }));
      }
    },
    emPerInch: 7.2,
    pxPerInch: 72,
    matchDimen: function(m) {
      return m.match(
        /^(-?(?:\.\d+|\d+(?:\.\d*)?))(px|pt|em|ex|mu|pc|in|mm|cm)$/
      );
    },
    dimen2em: function(q) {
      var o = this.matchDimen(q);
      var n = parseFloat(o[1] || '1'),
        p = o[2];
      if (p === 'em') {
        return n;
      }
      if (p === 'ex') {
        return n * 0.43;
      }
      if (p === 'pt') {
        return n / 10;
      }
      if (p === 'pc') {
        return n * 1.2;
      }
      if (p === 'px') {
        return (n * this.emPerInch) / this.pxPerInch;
      }
      if (p === 'in') {
        return n * this.emPerInch;
      }
      if (p === 'cm') {
        return (n * this.emPerInch) / 2.54;
      }
      if (p === 'mm') {
        return (n * this.emPerInch) / 25.4;
      }
      if (p === 'mu') {
        return n / 18;
      }
      return 0;
    },
    Em: function(n) {
      if (Math.abs(n) < 0.0006) {
        return '0em';
      }
      return n.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    HLine: function(n, o) {
      if (o == null) {
        o = 'solid';
      }
      var p = this.stack.Top();
      if (!p.isa(b.array) || p.data.length) {
        d.Error(['Misplaced', 'Misplaced %1', n]);
      }
      if (p.table.length == 0) {
        p.frame.push('top');
      } else {
        var m = p.arraydef.rowlines ? p.arraydef.rowlines.split(/ /) : [];
        while (m.length < p.table.length) {
          m.push('none');
        }
        m[p.table.length - 1] = o;
        p.arraydef.rowlines = m.join(' ');
      }
    },
    HFill: function(m) {
      var n = this.stack.Top();
      if (n.isa(b.array)) {
        n.hfill.push(n.data.length);
      } else {
        d.Error(['UnsupportedHFill', 'Unsupported use of %1', m]);
      }
    },
    BeginEnd: function(o) {
      var p = this.GetArgument(o),
        r = false;
      if (p.match(/^\\end\\/)) {
        r = true;
        p = p.substr(5);
      }
      if (p.match(/\\/i)) {
        d.Error(['InvalidEnv', "Invalid environment name '%1'", p]);
      }
      var q = this.envFindName(p);
      if (!q) {
        d.Error(['UnknownEnv', "Unknown environment '%1'", p]);
      }
      if (!f(q)) {
        q = [q];
      }
      var m = f(q[1]) ? q[1][0] : q[1];
      var n = b.begin().With({ name: p, end: m, parse: this });
      if (o === '\\end') {
        if (!r && f(q[1]) && this[q[1][1]]) {
          n = this[q[1][1]].apply(this, [n].concat(q.slice(2)));
        } else {
          n = b.end().With({ name: p });
        }
      } else {
        if (++this.macroCount > d.config.MAXMACROS) {
          d.Error([
            'MaxMacroSub2',
            'MathJax maximum substitution count exceeded; is there a recursive latex environment?'
          ]);
        }
        if (q[0] && this[q[0]]) {
          n = this[q[0]].apply(this, [n].concat(q.slice(2)));
        }
      }
      this.Push(n);
    },
    envFindName: function(m) {
      return g.environment.hasOwnProperty(m) ? g.environment[m] : null;
    },
    Equation: function(m, n) {
      return n;
    },
    ExtensionEnv: function(n, m) {
      this.Extension(n.name, m, 'environment');
    },
    Array: function(n, p, u, s, t, o, m, q) {
      if (!s) {
        s = this.GetArgument('\\begin{' + n.name + '}');
      }
      var v = ('c' + s).replace(/[^clr|:]/g, '').replace(/[^|:]([|:])+/g, '$1');
      s = s
        .replace(/[^clr]/g, '')
        .split('')
        .join(' ');
      s = s
        .replace(/l/g, 'left')
        .replace(/r/g, 'right')
        .replace(/c/g, 'center');
      var r = b
        .array()
        .With({
          arraydef: {
            columnalign: s,
            columnspacing: t || '1em',
            rowspacing: o || '4pt'
          }
        });
      if (v.match(/[|:]/)) {
        if (v.charAt(0).match(/[|:]/)) {
          r.frame.push('left');
          r.frame.dashed = v.charAt(0) === ':';
        }
        if (v.charAt(v.length - 1).match(/[|:]/)) {
          r.frame.push('right');
        }
        v = v.substr(1, v.length - 2);
        r.arraydef.columnlines = v
          .split('')
          .join(' ')
          .replace(/[^|: ]/g, 'none')
          .replace(/\|/g, 'solid')
          .replace(/:/g, 'dashed');
      }
      if (p) {
        r.open = this.convertDelimiter(p);
      }
      if (u) {
        r.close = this.convertDelimiter(u);
      }
      if (m === 'D') {
        r.arraydef.displaystyle = true;
      } else {
        if (m) {
          r.arraydef.displaystyle = false;
        }
      }
      if (m === 'S') {
        r.arraydef.scriptlevel = 1;
      }
      if (q) {
        r.arraydef.useHeight = false;
      }
      this.Push(n);
      return r;
    },
    AlignedArray: function(m) {
      var n = this.GetBrackets('\\begin{' + m.name + '}');
      return this.setArrayAlign(this.Array.apply(this, arguments), n);
    },
    setArrayAlign: function(n, m) {
      m = this.trimSpaces(m || '');
      if (m === 't') {
        n.arraydef.align = 'baseline 1';
      } else {
        if (m === 'b') {
          n.arraydef.align = 'baseline -1';
        } else {
          if (m === 'c') {
            n.arraydef.align = 'center';
          } else {
            if (m) {
              n.arraydef.align = m;
            }
          }
        }
      }
      return n;
    },
    convertDelimiter: function(m) {
      if (m) {
        m = g.delimiter.hasOwnProperty(m) ? g.delimiter[m] : null;
      }
      if (m == null) {
        return null;
      }
      if (f(m)) {
        m = m[0];
      }
      if (m.length === 4) {
        m = String.fromCharCode(parseInt(m, 16));
      }
      return m;
    },
    trimSpaces: function(n) {
      if (typeof n != 'string') {
        return n;
      }
      var m = n.replace(/^\s+|\s+$/g, '');
      if (m.match(/\\$/) && n.match(/ $/)) {
        m += ' ';
      }
      return m;
    },
    nextIsSpace: function() {
      return this.string.charAt(this.i).match(/\s/);
    },
    GetNext: function() {
      while (this.nextIsSpace()) {
        this.i++;
      }
      return this.string.charAt(this.i);
    },
    GetCS: function() {
      var m = this.string.slice(this.i).match(/^([a-z]+|.) ?/i);
      if (m) {
        this.i += m[1].length;
        return m[1];
      } else {
        this.i++;
        return ' ';
      }
    },
    GetArgument: function(n, o) {
      switch (this.GetNext()) {
        case '':
          if (!o) {
            d.Error(['MissingArgFor', 'Missing argument for %1', n]);
          }
          return null;
        case '}':
          if (!o) {
            d.Error([
              'ExtraCloseMissingOpen',
              'Extra close brace or missing open brace'
            ]);
          }
          return null;
        case '\\':
          this.i++;
          return '\\' + this.GetCS();
        case '{':
          var m = ++this.i,
            p = 1;
          while (this.i < this.string.length) {
            switch (this.string.charAt(this.i++)) {
              case '\\':
                this.i++;
                break;
              case '{':
                p++;
                break;
              case '}':
                if (--p == 0) {
                  return this.string.slice(m, this.i - 1);
                }
                break;
            }
          }
          d.Error(['MissingCloseBrace', 'Missing close brace']);
          break;
      }
      return this.string.charAt(this.i++);
    },
    GetBrackets: function(n, p) {
      if (this.GetNext() != '[') {
        return p;
      }
      var m = ++this.i,
        o = 0;
      while (this.i < this.string.length) {
        switch (this.string.charAt(this.i++)) {
          case '{':
            o++;
            break;
          case '\\':
            this.i++;
            break;
          case '}':
            if (o-- <= 0) {
              d.Error([
                'ExtraCloseLooking',
                'Extra close brace while looking for %1',
                "']'"
              ]);
            }
            break;
          case ']':
            if (o == 0) {
              return this.string.slice(m, this.i - 1);
            }
            break;
        }
      }
      d.Error([
        'MissingCloseBracket',
        "Couldn't find closing ']' for argument to %1",
        n
      ]);
    },
    GetDelimiter: function(m, n) {
      while (this.nextIsSpace()) {
        this.i++;
      }
      var o = this.string.charAt(this.i);
      this.i++;
      if (this.i <= this.string.length) {
        if (o == '\\') {
          o += this.GetCS(m);
        } else {
          if (o === '{' && n) {
            this.i--;
            o = this.GetArgument(m)
              .replace(/^\s+/, '')
              .replace(/\s+$/, '');
          }
        }
        if (g.delimiter.hasOwnProperty(o)) {
          return this.convertDelimiter(o);
        }
      }
      d.Error([
        'MissingOrUnrecognizedDelim',
        'Missing or unrecognized delimiter for %1',
        m
      ]);
    },
    GetDimen: function(n) {
      var o;
      if (this.nextIsSpace()) {
        this.i++;
      }
      if (this.string.charAt(this.i) == '{') {
        o = this.GetArgument(n);
        if (
          o.match(
            /^\s*([-+]?([.,]\d+|\d+([.,]\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/
          )
        ) {
          return o.replace(/ /g, '').replace(/,/, '.');
        }
      } else {
        o = this.string.slice(this.i);
        var m = o.match(
          /^\s*(([-+]?([.,]\d+|\d+([.,]\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)) ?/
        );
        if (m) {
          this.i += m[0].length;
          return m[1].replace(/ /g, '').replace(/,/, '.');
        }
      }
      d.Error([
        'MissingDimOrUnits',
        'Missing dimension or its units for %1',
        n
      ]);
    },
    GetUpTo: function(o, p) {
      while (this.nextIsSpace()) {
        this.i++;
      }
      var n = this.i,
        m,
        r,
        q = 0;
      while (this.i < this.string.length) {
        m = this.i;
        r = this.string.charAt(this.i++);
        switch (r) {
          case '\\':
            r += this.GetCS();
            break;
          case '{':
            q++;
            break;
          case '}':
            if (q == 0) {
              d.Error([
                'ExtraCloseLooking',
                'Extra close brace while looking for %1',
                p
              ]);
            }
            q--;
            break;
        }
        if (q == 0 && r == p) {
          return this.string.slice(n, m);
        }
      }
      d.Error(['TokenNotFoundForCommand', "Couldn't find %1 for %2", p, o]);
    },
    ParseArg: function(m) {
      return d.Parse(this.GetArgument(m), this.stack.env).mml();
    },
    ParseUpTo: function(m, n) {
      return d.Parse(this.GetUpTo(m, n), this.stack.env).mml();
    },
    InternalMath: function(v, m) {
      var o = this.stack.env.font ? { mathvariant: this.stack.env.font } : {};
      var n = [],
        r = 0,
        q = 0,
        u,
        s = '',
        p = 0;
      if (v.match(/\\?[${}\\]|\\\(|\\(eq)?ref\s*\{/)) {
        while (r < v.length) {
          u = v.charAt(r++);
          if (u === '$') {
            if (s === '$' && p === 0) {
              n.push(i.TeXAtom(d.Parse(v.slice(q, r - 1), {}).mml()));
              s = '';
              q = r;
            } else {
              if (s === '') {
                if (q < r - 1) {
                  n.push(this.InternalText(v.slice(q, r - 1), o));
                }
                s = '$';
                q = r;
              }
            }
          } else {
            if (u === '{' && s !== '') {
              p++;
            } else {
              if (u === '}') {
                if (s === '}' && p === 0) {
                  n.push(
                    i.TeXAtom(
                      d
                        .Parse(v.slice(q, r), {})
                        .mml()
                        .With(o)
                    )
                  );
                  s = '';
                  q = r;
                } else {
                  if (s !== '') {
                    if (p) {
                      p--;
                    }
                  }
                }
              } else {
                if (u === '\\') {
                  if (s === '' && v.substr(r).match(/^(eq)?ref\s*\{/)) {
                    var t = RegExp['$&'].length;
                    if (q < r - 1) {
                      n.push(this.InternalText(v.slice(q, r - 1), o));
                    }
                    s = '}';
                    q = r - 1;
                    r += t;
                  } else {
                    u = v.charAt(r++);
                    if (u === '(' && s === '') {
                      if (q < r - 2) {
                        n.push(this.InternalText(v.slice(q, r - 2), o));
                      }
                      s = ')';
                      q = r;
                    } else {
                      if (u === ')' && s === ')' && p === 0) {
                        n.push(i.TeXAtom(d.Parse(v.slice(q, r - 2), {}).mml()));
                        s = '';
                        q = r;
                      } else {
                        if (u.match(/[${}\\]/) && s === '') {
                          r--;
                          v = v.substr(0, r - 1) + v.substr(r);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s !== '') {
          d.Error(['MathNotTerminated', 'Math not terminated in text box']);
        }
      }
      if (q < v.length) {
        n.push(this.InternalText(v.slice(q), o));
      }
      if (m != null) {
        n = [
          i.mstyle.apply(i, n).With({ displaystyle: false, scriptlevel: m })
        ];
      } else {
        if (n.length > 1) {
          n = [i.mrow.apply(i, n)];
        }
      }
      return n;
    },
    InternalText: function(n, m) {
      n = n.replace(/^\s+/, h).replace(/\s+$/, h);
      return i.mtext(i.chars(n)).With(m);
    },
    setDef: function(m, n) {
      n.isUser = true;
      g.macros[m] = n;
    },
    setEnv: function(m, n) {
      n.isUser = true;
      g.environment[m] = n;
    },
    SubstituteArgs: function(n, m) {
      var q = '';
      var p = '';
      var r;
      var o = 0;
      while (o < m.length) {
        r = m.charAt(o++);
        if (r === '\\') {
          q += r + m.charAt(o++);
        } else {
          if (r === '#') {
            r = m.charAt(o++);
            if (r === '#') {
              q += r;
            } else {
              if (!r.match(/[1-9]/) || r > n.length) {
                d.Error([
                  'IllegalMacroParam',
                  'Illegal macro parameter reference'
                ]);
              }
              p = this.AddArgs(this.AddArgs(p, q), n[r - 1]);
              q = '';
            }
          } else {
            q += r;
          }
        }
      }
      return this.AddArgs(p, q);
    },
    AddArgs: function(n, m) {
      if (m.match(/^[a-z]/i) && n.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i)) {
        n += ' ';
      }
      if (n.length + m.length > d.config.MAXBUFFER) {
        d.Error([
          'MaxBufferSize',
          'MathJax internal buffer size exceeded; is there a recursive macro call?'
        ]);
      }
      return n + m;
    }
  });
  d.Augment({
    Stack: e,
    Parse: a,
    Definitions: g,
    Startup: l,
    config: { MAXMACROS: 10000, MAXBUFFER: 5 * 1024 },
    sourceMenuTitle: ['TeXCommands', 'TeX Commands'],
    annotationEncoding: 'application/x-tex',
    prefilterHooks: MathJax.Callback.Hooks(true),
    postfilterHooks: MathJax.Callback.Hooks(true),
    Config: function() {
      this.SUPER(arguments).Config.apply(this, arguments);
      if (this.config.equationNumbers.autoNumber !== 'none') {
        if (!this.config.extensions) {
          this.config.extensions = [];
        }
        this.config.extensions.push('AMSmath.js');
      }
    },
    Translate: function(m) {
      var n,
        o = false,
        q = MathJax.HTML.getScript(m);
      var s =
        m.type
          .replace(/\n/g, ' ')
          .match(/(;|\s|\n)mode\s*=\s*display(;|\s|\n|$)/) != null;
      var r = { math: q, display: s, script: m };
      var t = this.prefilterHooks.Execute(r);
      if (t) {
        return t;
      }
      q = r.math;
      try {
        n = d.Parse(q).mml();
      } catch (p) {
        if (!p.texError) {
          throw p;
        }
        n = this.formatError(p, q, s, m);
        o = true;
      }
      if (n.isa(i.mtable) && n.displaystyle === 'inherit') {
        n.displaystyle = s;
      }
      if (n.inferred) {
        n = i.apply(MathJax.ElementJax, n.data);
      } else {
        n = i(n);
      }
      if (s) {
        n.root.display = 'block';
      }
      if (o) {
        n.texError = true;
      }
      r.math = n;
      return this.postfilterHooks.Execute(r) || r.math;
    },
    prefilterMath: function(n, o, m) {
      return n;
    },
    postfilterMath: function(n, o, m) {
      this.combineRelations(n.root);
      return n;
    },
    formatError: function(p, o, q, m) {
      var n = p.message.replace(/\n.*/, '');
      c.signal.Post(['TeX Jax - parse error', n, o, q, m]);
      return i.Error(n);
    },
    Error: function(m) {
      if (f(m)) {
        m = k.apply(k, m);
      }
      throw c.Insert(Error(m), { texError: true });
    },
    Macro: function(m, n, o) {
      g.macros[m] = ['Macro'].concat([].slice.call(arguments, 1));
      g.macros[m].isUser = true;
    },
    fenced: function(o, n, p) {
      var m = i.mrow().With({ open: o, close: p, texClass: i.TEXCLASS.INNER });
      m.Append(
        i
          .mo(o)
          .With({
            fence: true,
            stretchy: true,
            symmetric: true,
            texClass: i.TEXCLASS.OPEN
          })
      );
      if (n.type === 'mrow' && n.inferred) {
        m.Append.apply(m, n.data);
      } else {
        m.Append(n);
      }
      m.Append(
        i
          .mo(p)
          .With({
            fence: true,
            stretchy: true,
            symmetric: true,
            texClass: i.TEXCLASS.CLOSE
          })
      );
      return m;
    },
    fixedFence: function(o, n, p) {
      var m = i.mrow().With({ open: o, close: p, texClass: i.TEXCLASS.ORD });
      if (o) {
        m.Append(this.mathPalette(o, 'l'));
      }
      if (n.type === 'mrow') {
        m.Append.apply(m, n.data);
      } else {
        m.Append(n);
      }
      if (p) {
        m.Append(this.mathPalette(p, 'r'));
      }
      return m;
    },
    mathPalette: function(p, n) {
      if (p === '{' || p === '}') {
        p = '\\' + p;
      }
      var o = '{\\bigg' + n + ' ' + p + '}',
        m = '{\\big' + n + ' ' + p + '}';
      return d.Parse('\\mathchoice' + o + m + m + m, {}).mml();
    },
    combineRelations: function(q) {
      var r, n, p, o;
      for (r = 0, n = q.data.length; r < n; r++) {
        if (q.data[r]) {
          if (q.isa(i.mrow)) {
            while (
              r + 1 < n &&
              (p = q.data[r]) &&
              (o = q.data[r + 1]) &&
              p.isa(i.mo) &&
              o.isa(i.mo) &&
              p.Get('texClass') === i.TEXCLASS.REL &&
              o.Get('texClass') === i.TEXCLASS.REL
            ) {
              if (
                p.variantForm == o.variantForm &&
                p.Get('mathvariant') == o.Get('mathvariant') &&
                p.style == o.style &&
                p['class'] == o['class'] &&
                !p.id &&
                !o.id
              ) {
                p.Append.apply(p, o.data);
                q.data.splice(r + 1, 1);
                n--;
              } else {
                p.rspace = o.lspace = '0pt';
                r++;
              }
            }
          }
          if (!q.data[r].isToken) {
            this.combineRelations(q.data[r]);
          }
        }
      }
    }
  });
  d.prefilterHooks.Add(function(m) {
    m.math = d.prefilterMath(m.math, m.display, m.script);
  });
  d.postfilterHooks.Add(function(m) {
    m.math = d.postfilterMath(m.math, m.display, m.script);
  });
  d.loadComplete('jax.js');
})(MathJax.InputJax.TeX, MathJax.Hub, MathJax.Ajax);
