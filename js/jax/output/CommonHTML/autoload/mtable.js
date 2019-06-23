/*
 *  /MathJax/jax/output/CommonHTML/autoload/mtable.js
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

MathJax.Hub.Register.StartupHook('CommonHTML Jax Ready', function() {
  var g = '2.7.5';
  var b = MathJax.ElementJax.mml,
    a = MathJax.Hub.config,
    e = MathJax.OutputJax.CommonHTML,
    d = MathJax.Hub.SplitList;
  var c = -1,
    f = 1000000;
  b.mtable.Augment({
    toCommonHTML: function(l) {
      var m = { rows: [], labels: [], labeled: false };
      l = this.CHTMLdefaultNode(l, { noBBox: true, childOptions: m });
      var k = e.Element('mjx-table');
      while (l.firstChild) {
        k.appendChild(l.firstChild);
      }
      l.appendChild(k);
      var h = this.getValues(
        'columnalign',
        'rowalign',
        'columnspacing',
        'rowspacing',
        'columnwidth',
        'equalcolumns',
        'equalrows',
        'columnlines',
        'rowlines',
        'frame',
        'framespacing',
        'align',
        'width',
        'side',
        'minlabelspacing',
        'useHeight'
      );
      var j = e.TEX.min_rule_thickness / e.em;
      m.t = e.Px(j * this.CHTML.scale, 1);
      this.CHTMLgetBoxSizes(h, m);
      this.CHTMLgetAttributes(h, m);
      this.CHTMLadjustCells(h, m);
      if (h.frame) {
        k.style.border = m.t + ' ' + h.frame;
      }
      this.CHTMLalignV(h, m, l);
      this.CHTMLcolumnWidths(h, m, l);
      this.CHTMLstretchCells(h, m);
      if (m.labeled) {
        this.CHTMLaddLabels(h, m, l, k);
      }
      var i = this.CHTML;
      i.w = i.r = m.R;
      i.h = i.t = m.T - m.B;
      i.d = i.b = m.B;
      if (!h.frame && !i.pwidth) {
        l.style.padding = '0 ' + e.Em(1 / 6);
        i.L = i.R = 1 / 6;
      }
      this.CHTMLhandleSpace(l);
      this.CHTMLhandleBBox(l);
      this.CHTMLhandleColor(l);
      return l;
    },
    CHTMLgetBoxSizes: function(z, k) {
      var r = e.FONTDATA.lineH * z.useHeight,
        t = e.FONTDATA.lineD * z.useHeight;
      var y = [],
        h = [],
        l = [],
        w = -1,
        q,
        n;
      for (q = 0, n = this.data.length; q < n; q++) {
        var B = this.data[q],
          A = B.type === 'mtr' ? 0 : c;
        y[q] = r;
        h[q] = t;
        for (var p = A, v = B.data.length + A; p < v; p++) {
          if (l[p] == null) {
            l[p] = -f;
            if (p > w) {
              w = p;
            }
          }
          var u = B.data[p - A].CHTML;
          if (u.h > y[q]) {
            y[q] = u.h;
          }
          if (u.d > h[q]) {
            h[q] = u.d;
          }
          if (u.w > l[p]) {
            l[p] = u.w;
          }
        }
      }
      if (z.equalrows) {
        k.HD = true;
        var x = Math.max.apply(Math, y);
        var o = Math.max.apply(Math, h);
        for (q = 0, n = y.length; q < n; q++) {
          y[q] = x;
          h[q] = o;
        }
      }
      k.H = y;
      k.D = h;
      (k.W = l), (k.J = w);
    },
    CHTMLgetAttributes: function(v, j) {
      var l = d(v.columnspacing),
        x = d(v.rowspacing),
        t = d(v.columnalign),
        r = d(v.rowalign),
        k = d(v.columnlines),
        w = d(v.rowlines),
        o = d(v.columnwidth),
        n = [],
        q,
        p,
        u = j.J,
        s = j.rows.length - 1;
      for (q = 0, p = l.length; q < p; q++) {
        l[q] = this.CHTMLlength2em(l[q]);
      }
      for (q = 0, p = x.length; q < p; q++) {
        x[q] = this.CHTMLlength2em(x[q]);
      }
      while (l.length < u) {
        l.push(l[l.length - 1]);
      }
      while (t.length <= u) {
        t.push(t[t.length - 1]);
      }
      while (k.length < u) {
        k.push(k[k.length - 1]);
      }
      while (o.length <= u) {
        o.push(o[o.length - 1]);
      }
      while (x.length < s) {
        x.push(x[x.length - 1]);
      }
      while (r.length <= s) {
        r.push(r[r.length - 1]);
      }
      while (w.length < s) {
        w.push(w[w.length - 1]);
      }
      t[c] = v.side.substr(0, 1) === 'l' ? 'left' : 'right';
      for (q = 0; q <= s; q++) {
        var y = this.data[q];
        n[q] = [];
        if (y.rowalign) {
          r[q] = y.rowalign;
        }
        if (y.columnalign) {
          n[q] = d(y.columnalign);
          while (n[q].length <= u) {
            n[q].push(n[q][n[q].length - 1]);
          }
        }
      }
      var h = d(v.framespacing);
      if (h.length != 2) {
        h = d(this.defaults.framespacing);
      }
      h[0] = Math.max(0, this.CHTMLlength2em(h[0]));
      h[1] = Math.max(0, this.CHTMLlength2em(h[1]));
      if (
        v.columnlines.replace(/none/g, '').replace(/ /g, '') !== '' ||
        v.rowlines.replace(/none/g, '').replace(/ /g, '') !== ''
      ) {
        v.fspace = true;
      }
      if (v.frame === b.LINES.NONE) {
        delete v.frame;
      } else {
        v.fspace = true;
      }
      if (v.frame) {
        h[0] = Math.max(0, h[0]);
        h[1] = Math.max(0, h[1]);
      }
      if (v.fspace) {
        l[u] = h[0];
        x[s] = h[1];
      } else {
        l[u] = x[s] = 0;
      }
      k[u] = w[s] = b.LINES.NONE;
      j.CSPACE = l;
      j.RSPACE = x;
      j.CALIGN = t;
      j.RALIGN = r;
      j.CLINES = k;
      j.RLINES = w;
      j.CWIDTH = o;
      j.RCALIGN = n;
      j.FSPACE = h;
    },
    CHTMLadjustCells: function(l, r) {
      var S = r.rows,
        W = r.CSPACE,
        o = r.CLINES,
        x = r.RSPACE,
        F = r.RLINES,
        V = r.CALIGN,
        q = r.RALIGN,
        G = r.RCALIGN;
      W[r.J] *= 2;
      x[S.length - 1] *= 2;
      var p = '0',
        I,
        t,
        z,
        N,
        n,
        P,
        U = 0;
      if (l.fspace) {
        U = r.FSPACE[1];
        p = e.Em(r.FSPACE[1]);
      }
      r.RHD = [];
      r.RH = [];
      for (var Q = 0, K = S.length; Q < K; Q++) {
        var w = S[Q],
          v = this.data[Q];
        I = x[Q] / 2;
        N = null;
        z = '0';
        if (F[Q] !== b.LINES.NONE && F[Q] !== '') {
          N = r.t + ' ' + F[Q];
        }
        if (N || (o[O] !== b.LINES.NONE && o[O] !== '')) {
          while (w.length <= r.J) {
            w.push(e.addElement(w.node, 'mjx-mtd', null, [['span']]));
          }
        }
        r.RH[Q] = U + r.H[Q];
        U = Math.max(0, I);
        r.RHD[Q] = r.RH[Q] + U + r.D[Q];
        I = e.Em(U);
        if (l.fspace) {
          z = e.Em(r.FSPACE[0]);
        }
        for (var O = 0, y = w.length; O < y; O++) {
          var E = v.type === 'mtr' ? 0 : c;
          var J = v.data[O - E] || { CHTML: e.BBOX.zero() };
          var k = w[O].style;
          n = J.CHTML;
          t = W[O] / 2;
          if (o[O] !== b.LINES.NONE) {
            k.borderRight = r.t + ' ' + o[O];
            t -= 1 / e.em / 2;
          }
          t = e.Em(Math.max(0, t));
          k.padding = p + ' ' + t + ' 0px ' + z;
          if (N) {
            k.borderBottom = N;
          }
          z = t;
          P = J.rowalign || (this.data[Q] || {}).rowalign || q[Q];
          var A = Math.max(1, n.h),
            C = Math.max(0.2, n.d),
            h = r.H[Q] + r.D[Q] - (A + C),
            u = w[O].firstChild.style;
          if (P === b.ALIGN.TOP) {
            if (h) {
              u.marginBottom = e.Em(h);
            }
            k.verticalAlign = 'top';
          } else {
            if (P === b.ALIGN.BOTTOM) {
              k.verticalAlign = 'bottom';
              if (h) {
                u.marginTop = e.Em(h);
              }
            } else {
              if (P === b.ALIGN.CENTER) {
                if (h) {
                  u.marginTop = u.marginBottom = e.Em(h / 2);
                }
                k.verticalAlign = 'middle';
              } else {
                if (A !== r.H[Q]) {
                  u.marginTop = e.Em(r.H[Q] - A);
                }
              }
            }
          }
          P = J.columnalign || G[Q][O] || V[O];
          if (P !== b.ALIGN.CENTER) {
            k.textAlign = P;
          }
        }
        w.node.style.height = e.Em(r.RHD[Q]);
        p = I;
      }
      W[r.J] /= 2;
      x[S.length - 1] /= 2;
    },
    CHTMLalignV: function(w, k, o) {
      var m,
        t = k.rows.length,
        v = k.H,
        j = k.D,
        x = k.RSPACE;
      if (typeof w.align !== 'string') {
        w.align = String(w.align);
      }
      if (w.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/)) {
        m = parseInt(RegExp.$3 || '0');
        w.align = RegExp.$1;
        if (m < 0) {
          m += k.rows.length + 1;
        }
        if (m > t || m <= 0) {
          m = null;
        }
      } else {
        w.align = this.defaults.align;
      }
      var p = 0,
        l = 0,
        u = e.TEX.axis_height;
      if (w.fspace) {
        p += k.FSPACE[1];
      }
      if (w.frame) {
        p += 2 / e.em;
        l += 1 / e.em;
      }
      for (var q = 0; q < t; q++) {
        var r = v[q],
          s = j[q];
        p += r + s + x[q];
        if (m) {
          if (q === m - 1) {
            l +=
              {
                top: r + s,
                bottom: 0,
                center: (r + s) / 2,
                baseline: s,
                axis: u + s
              }[w.align] + x[q];
          }
          if (q >= m) {
            l += r + s + x[q];
          }
        }
      }
      if (!m) {
        l = {
          top: p,
          bottom: 0,
          center: p / 2,
          baseline: p / 2,
          axis: p / 2 - u
        }[w.align];
      }
      if (l) {
        o.style.verticalAlign = e.Em(-l);
      }
      k.T = p;
      k.B = l;
    },
    CHTMLcolumnWidths: function(l, r, A) {
      var I = r.CWIDTH,
        K = r.CSPACE,
        u = r.J,
        F;
      var G = 0,
        n = false,
        y = l.width.match(/%$/);
      var H, B, v;
      if (l.width !== 'auto' && !y) {
        G = Math.max(0, this.CHTMLlength2em(l.width, r.R));
        n = true;
      }
      if (l.equalcolumns) {
        if (y) {
          var z = e.Percent(1 / (u + 1));
          for (F = 0; F <= u; F++) {
            I[F] = z;
          }
        } else {
          v = Math.max.apply(Math, r.W);
          if (l.width !== 'auto') {
            var q = l.fspace ? r.FSPACE[0] + (l.frame ? 2 / e.em : 0) : 0;
            for (F = 0; F <= u; F++) {
              q += K[F];
            }
            v = Math.max((G - q) / (u + 1), v);
          }
          v = e.Em(v);
          for (F = 0; F <= u; F++) {
            I[F] = v;
          }
        }
        n = true;
      }
      var E = 0;
      if (l.fspace) {
        E = r.FSPACE[0];
      }
      var s = [],
        D = [],
        h = [],
        o = [];
      var t = r.rows[0];
      for (F = 0; F <= u; F++) {
        o[F] = r.W[F];
        if (I[F] === 'auto') {
          s.push(F);
        } else {
          if (I[F] === 'fit') {
            D.push(F);
          } else {
            if (I[F].match(/%$/)) {
              h.push(F);
            } else {
              o[F] = this.CHTMLlength2em(I[F], o[F]);
            }
          }
        }
        E += o[F] + K[F];
        if (t[F]) {
          t[F].style.width = e.Em(o[F]);
        }
      }
      if (l.frame) {
        E += 2 / e.em;
      }
      var C = D.length > 0;
      if (n) {
        if (y) {
          for (F = 0; F <= u; F++) {
            cell = t[F].style;
            if (I[F] === 'auto' && !C) {
              cell.width = '';
            } else {
              if (I[F] === 'fit') {
                cell.width = '';
              } else {
                if (I[F].match(/%$/)) {
                  cell.width = I[F];
                } else {
                  cell.minWidth = cell.maxWidth = cell.width;
                }
              }
            }
          }
        } else {
          if (G > E) {
            var k = 0;
            for (H = 0, B = h.length; H < B; H++) {
              F = h[H];
              v = Math.max(o[F], this.CHTMLlength2em(I[F], G));
              k += v - o[F];
              o[F] = v;
              t[F].style.width = e.Em(v);
            }
            E += k;
          }
          if (!C) {
            D = s;
          }
          if (G > E && D.length) {
            var x = (G - E) / D.length;
            for (H = 0, B = D.length; H < B; H++) {
              F = D[H];
              o[F] += x;
              t[F].style.width = e.Em(o[F]);
            }
            E = G;
          }
        }
      }
      o[c] = r.W[c];
      r.W = o;
      r.R = E;
      if (y) {
        A.style.width = this.CHTML.pwidth = '100%';
        this.CHTML.mwidth = e.Em(E);
        A.firstChild.style.width = l.width;
        A.firstChild.style.margin = 'auto';
      }
    },
    CHTMLstretchCells: function(x, l) {
      var y = l.rows,
        w = l.H,
        k = l.D,
        m = l.W,
        t = l.J,
        s = y.length - 1;
      for (var o = 0; o <= s; o++) {
        var z = y[o],
          q = this.data[o];
        var p = w[o],
          r = k[o];
        for (var n = 0; n <= t; n++) {
          var v = z[n],
            u = q.data[n];
          if (!u) {
            continue;
          }
          if (u.CHTML.stretch === 'V') {
            u.CHTMLstretchV(p, r);
          } else {
            if (u.CHTML.stretch === 'H') {
              u.CHTMLstretchH(v, m[n]);
            }
          }
        }
      }
    },
    CHTMLaddLabels: function(h, k, w, B) {
      var q = this.getValues(
        'indentalignfirst',
        'indentshiftfirst',
        'indentalign',
        'indentshift'
      );
      if (q.indentalignfirst !== b.INDENTALIGN.INDENTALIGN) {
        q.indentalign = q.indentalignfirst;
      }
      if (q.indentalign === b.INDENTALIGN.AUTO) {
        q.indentalign = a.displayAlign;
      }
      if (q.indentshiftfirst !== b.INDENTSHIFT.INDENTSHIFT) {
        q.indentshift = q.indentshiftfirst;
      }
      if (q.indentshift === 'auto') {
        q.indentshift = '0';
      }
      var z = this.CHTMLlength2em(q.indentshift, e.cwidth);
      var A = this.CHTMLlength2em(h.minlabelspacing, 0.8);
      var p = A + k.W[c],
        y = 0,
        D = k.R;
      var n = this.CHTMLlength2em(a.displayIndent, e.cwidth);
      var t = k.CALIGN[c] === b.INDENTALIGN.RIGHT ? -1 : 1;
      if (q.indentalign === b.INDENTALIGN.CENTER) {
        D += 2 * (p - t * (z + n));
        z += n;
      } else {
        if (k.CALIGN[c] === q.indentalign) {
          if (n < 0) {
            y = t * n;
            n = 0;
          }
          z += t * n;
          if (p > t * z) {
            z = t * p;
          }
          z += y;
          z *= t;
          D += z;
        } else {
          D += p - t * z + n;
          z -= t * n;
          z *= -t;
        }
      }
      var o = e.addElement(w, 'mjx-box', {
        style: { width: '100%', 'text-align': q.indentalign }
      });
      o.appendChild(B);
      var C = e.Element('mjx-itable');
      B.style.display = 'inline-table';
      if (!B.style.width) {
        B.style.width = 'auto';
      }
      C.style.verticalAlign = 'top';
      B.style.verticalAlign = e.Em(k.T - k.B - k.H[0]);
      w.style.verticalAlign = '';
      if (z) {
        if (q.indentalign === b.INDENTALIGN.CENTER) {
          B.style.marginLeft = e.Em(z);
          B.style.marginRight = e.Em(-z);
        } else {
          var u =
            'margin' +
            (q.indentalign === b.INDENTALIGN.RIGHT ? 'Right' : 'Left');
          B.style[u] = e.Em(z);
        }
      }
      if (k.CALIGN[c] === 'left') {
        w.insertBefore(C, o);
        C.style.marginRight = e.Em(-k.W[c] - y);
        if (y) {
          C.style.marginLeft = e.Em(y);
        }
      } else {
        w.appendChild(C);
        C.style.marginLeft = e.Em(-k.W[c] + y);
      }
      var l = k.labels,
        j = 0;
      if (h.fspace) {
        j = k.FSPACE[0] + (h.frame ? 1 / e.em : 0);
      }
      for (var x = 0, v = l.length; x < v; x++) {
        if (l[x] && this.data[x].data[0]) {
          C.appendChild(l[x]);
          var r = this.data[x].data[0].CHTML;
          j = k.RH[x] - Math.max(1, r.h);
          if (j) {
            l[x].firstChild.firstChild.style.marginTop = e.Em(j);
          }
          l[x].style.height = e.Em(k.RHD[x]);
        } else {
          e.addElement(C, 'mjx-label', { style: { height: e.Em(k.RHD[x]) } });
        }
      }
      w.style.width = this.CHTML.pwidth = '100%';
      w.style.minWidth = this.CHTML.mwidth = e.Em(Math.max(0, D));
    }
  });
  b.mtr.Augment({
    toCommonHTML: function(l, j) {
      l = this.CHTMLcreateNode(l);
      this.CHTMLhandleStyle(l);
      this.CHTMLhandleScale(l);
      if (!j) {
        j = { rows: [], labels: [] };
      }
      var n = [];
      j.rows.push(n);
      n.node = l;
      j.labels.push(null);
      for (var k = 0, h = this.data.length; k < h; k++) {
        n.push(this.CHTMLaddChild(l, k, j));
      }
      this.CHTMLhandleColor(l);
      return l;
    }
  });
  b.mlabeledtr.Augment({
    toCommonHTML: function(n, k) {
      n = this.CHTMLcreateNode(n);
      this.CHTMLhandleStyle(n);
      this.CHTMLhandleScale(n);
      if (!k) {
        k = { rows: [], labels: [] };
      }
      var o = [];
      k.rows.push(o);
      o.node = n;
      var j = e.Element('mjx-label');
      k.labels.push(j);
      this.CHTMLaddChild(j, 0, k);
      if (this.data[0]) {
        k.labeled = true;
      }
      for (var l = 1, h = this.data.length; l < h; l++) {
        o.push(this.CHTMLaddChild(n, l, k));
      }
      this.CHTMLhandleColor(n);
      return n;
    }
  });
  b.mtd.Augment({
    toCommonHTML: function(l, i) {
      l = this.CHTMLdefaultNode(l, i);
      e.addElement(l.firstChild, 'mjx-strut');
      if (this.isEmbellished()) {
        var m = this.CoreMO(),
          h = this.CHTML;
        if (m.CHTMLcanStretch('Vertical')) {
          h.stretch = 'V';
        } else {
          if (m.CHTMLcanStretch('Horizontal')) {
            h.stretch = 'H';
          }
        }
        if (h.stretch) {
          var j = m.Get('minsize', true);
          if (j) {
            if (h.stretch === 'V') {
              var n = h.h + h.d;
              if (n) {
                var k = this.CHTMLlength2em(j, n) / n;
                if (k > 1) {
                  h.h *= k;
                  h.d *= k;
                }
              }
            } else {
              h.w = Math.max(h.w, this.CHTMLlength2em(j, h.w));
            }
          }
        }
      }
      return l;
    }
  });
  MathJax.Hub.Startup.signal.Post('CommonHTML mtable Ready');
  MathJax.Ajax.loadComplete(e.autoloadDir + '/mtable.js');
});
