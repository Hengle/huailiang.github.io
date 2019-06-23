/*
 *  /MathJax/jax/output/CommonHTML/autoload/menclose.js
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
  var a = MathJax.ElementJax.mml,
    d = MathJax.OutputJax.CommonHTML;
  var f = 'http://www.w3.org/2000/svg';
  var e = 4,
    b = 1,
    c = 2;
  a.menclose.Augment({
    toCommonHTML: function(o) {
      var y = this.getValues('notation', 'thickness', 'padding');
      if (y.thickness == null) {
        y.thickness = '.075em';
      }
      if (y.padding == null) {
        y.padding = '.2em';
      }
      o = this.CHTMLdefaultNode(o, { childNodes: 'mjx-box', forceChild: true });
      var j = o.firstChild,
        v = this.CHTMLbboxFor(0);
      var h = this.CHTMLlength2em(y.padding, 1 / d.em);
      var z = this.CHTMLlength2em(y.thickness, 1 / d.em);
      z = Math.max(1, Math.round(z * d.em)) / d.em;
      var q = d.Px(z) + ' solid';
      var u = {
        L: h,
        R: h,
        T: h,
        B: h,
        H: v.h + h,
        D: v.d + h,
        W: v.w + 2 * h
      };
      j.style.padding = d.Em(h);
      var s = MathJax.Hub.SplitList(y.notation),
        w = {};
      for (var r = 0, l = s.length; r < l; r++) {
        w[s[r]] = true;
      }
      if (w[a.NOTATION.UPDIAGONALARROW]) {
        delete w[a.NOTATION.UPDIAGONALSTRIKE];
      }
      for (var k in w) {
        if (w.hasOwnProperty(k)) {
          if (this.CHTMLnotation[k] && this.CHTMLnotation.hasOwnProperty(k)) {
            this.CHTMLnotation[k].call(this, j, v, u, h, z, q);
          }
        }
      }
      var x = this.CHTML;
      x.w += u.L + u.R;
      x.r += x.L;
      if (x.w > x.r) {
        x.r = x.w;
      }
      x.h += u.T;
      if (x.h > x.t) {
        x.t = x.h;
      }
      x.d += u.B;
      if (x.d > x.b) {
        x.b = x.d;
      }
      return o;
    },
    CHTMLnotation: {
      box: function(m, j, l, k, i, h) {
        k -= i;
        m.style.padding = d.Em(k);
        m.style.border = h;
      },
      roundedbox: function(n, k, m, l, i, h) {
        var j = Math.min(k.w, k.h + k.d + 2 * l) / 4;
        d.addElement(n.parentNode, 'mjx-box', {
          style: {
            padding: d.Em(l - i),
            border: h,
            'border-radius': d.Em(j),
            height: d.Em(k.h + k.d),
            'vertical-align': d.Em(-m.D),
            width: d.Em(k.w),
            'margin-left': d.Em(-m.W)
          }
        });
      },
      circle: function(j, o, n, i, r, l) {
        var q = n.H,
          h = n.D,
          k = n.W;
        var m = this.CHTMLsvg(j, n, r);
        this.CHTMLsvgElement(m.firstChild, 'ellipse', {
          rx: d.Px(k / 2 - r / 2),
          ry: d.Px((q + h) / 2 - r / 2),
          cx: d.Px(k / 2),
          cy: d.Px((q + h) / 2)
        });
      },
      left: function(m, j, l, k, i, h) {
        m.style.borderLeft = h;
        m.style.paddingLeft = d.Em(k - i);
      },
      right: function(m, j, l, k, i, h) {
        m.style.borderRight = h;
        m.style.paddingRight = d.Em(k - i);
      },
      top: function(m, j, l, k, i, h) {
        m.style.borderTop = h;
        m.style.paddingTop = d.Em(k - i);
      },
      bottom: function(m, j, l, k, i, h) {
        m.style.borderBottom = h;
        m.style.paddingBottom = d.Em(k - i);
      },
      actuarial: function(m, j, l, k, i, h) {
        m.style.borderTop = m.style.borderRight = h;
        m.style.paddingTop = m.style.paddingRight = d.Em(k - i);
      },
      madruwb: function(m, j, l, k, i, h) {
        m.style.borderBottom = m.style.borderRight = h;
        m.style.paddingBottom = m.style.paddingRight = d.Em(k - i);
      },
      verticalstrike: function(m, j, l, k, i, h) {
        d.addElement(m.parentNode, 'mjx-box', {
          style: {
            'border-left': h,
            height: d.Em(l.H + l.D),
            'vertical-align': d.Em(-l.D),
            width: d.Em(j.w / 2 + k - i / 2),
            'margin-left': d.Em(-j.w / 2 - k - i / 2)
          }
        });
      },
      horizontalstrike: function(m, j, l, k, i, h) {
        d.addElement(m.parentNode, 'mjx-box', {
          style: {
            'border-top': h,
            height: d.Em((l.H + l.D) / 2 - i / 2),
            'vertical-align': d.Em(-l.D),
            width: d.Em(l.W),
            'margin-left': d.Em(-l.W)
          }
        });
      },
      updiagonalstrike: function(j, o, n, i, r, l) {
        var q = n.H,
          h = n.D,
          k = n.W;
        var m = this.CHTMLsvg(j, n, r);
        this.CHTMLsvgElement(m.firstChild, 'line', {
          x1: d.Px(r / 2),
          y1: d.Px(q + h - r),
          x2: d.Px(k - r),
          y2: d.Px(r / 2)
        });
      },
      downdiagonalstrike: function(j, o, n, i, r, l) {
        var q = n.H,
          h = n.D,
          k = n.W;
        var m = this.CHTMLsvg(j, n, r);
        this.CHTMLsvgElement(m.firstChild, 'line', {
          x1: d.Px(r / 2),
          y1: d.Px(r / 2),
          x2: d.Px(k - r),
          y2: d.Px(q + h - r)
        });
      },
      updiagonalarrow: function(i, q, o, h, w, k) {
        var v = o.H + o.D - w,
          j = o.W - w / 2;
        var u = Math.atan2(v, j) * (-180 / Math.PI).toFixed(3);
        var l = Math.sqrt(v * v + j * j);
        var m = this.CHTMLsvg(i, o, w);
        var n = this.CHTMLsvgElement(m.firstChild, 'g', {
          fill: 'currentColor',
          transform:
            'translate(' +
            this.CHTMLpx(w / 2) +
            ' ' +
            this.CHTMLpx(v + w / 2) +
            ') rotate(' +
            u +
            ')'
        });
        var s = w * e,
          z = w * b,
          r = w * c;
        this.CHTMLsvgElement(n, 'line', {
          x1: d.Px(w / 2),
          y1: 0,
          x2: d.Px(l - s),
          y2: 0
        });
        this.CHTMLsvgElement(n, 'path', {
          d:
            'M ' +
            this.CHTMLpx(l - s) +
            ',0 L ' +
            this.CHTMLpx(l - s - z) +
            ',' +
            this.CHTMLpx(r) +
            'L ' +
            this.CHTMLpx(l) +
            ',0 L ' +
            this.CHTMLpx(l - s - z) +
            ',' +
            this.CHTMLpx(-r),
          stroke: 'none'
        });
      },
      phasorangle: function(j, q, o, i, s, l) {
        var n = i,
          r = o.H,
          h = o.D;
        i = (r + h) / 2;
        var k = o.W + i - n;
        o.W = k;
        o.L = i;
        j.style.margin = '0 0 0 ' + d.Em(i - n);
        var m = this.CHTMLsvg(j, o, s);
        this.CHTMLsvgElement(m.firstChild, 'path', {
          d:
            'M ' +
            this.CHTMLpx(i) +
            ',1 L 1,' +
            this.CHTMLpx(r + h - s) +
            ' L ' +
            this.CHTMLpx(k) +
            ',' +
            this.CHTMLpx(r + h - s)
        });
      },
      longdiv: function(j, o, n, i, r, l) {
        n.W += 1.5 * i;
        n.L += 1.5 * i;
        var q = n.H,
          h = n.D,
          k = n.W;
        j.style.margin = '0 0 0 ' + d.Em(1.5 * i);
        var m = this.CHTMLsvg(j, n, r);
        this.CHTMLsvgElement(m.firstChild, 'path', {
          d:
            'M ' +
            this.CHTMLpx(k) +
            ',1 L 1,1 a' +
            this.CHTMLpx(i) +
            ',' +
            this.CHTMLpx((q + h) / 2 - r / 2) +
            ' 0 0,1 1,' +
            this.CHTMLpx(q + h - 1.5 * r)
        });
      },
      radical: function(j, o, n, i, r, l) {
        n.W += 1.5 * i;
        n.L += 1.5 * i;
        var q = n.H,
          h = n.D,
          k = n.W;
        j.style.margin = '0 0 0 ' + d.Em(1.5 * i);
        var m = this.CHTMLsvg(j, n, r);
        this.CHTMLsvgElement(m.firstChild, 'path', {
          d:
            'M 1,' +
            this.CHTMLpx(0.6 * (q + h)) +
            ' L ' +
            this.CHTMLpx(i) +
            ',' +
            this.CHTMLpx(q + h) +
            ' L ' +
            this.CHTMLpx(2 * i) +
            ',1 L ' +
            this.CHTMLpx(k) +
            ',1'
        });
      }
    },
    CHTMLpx: function(h) {
      h *= d.em;
      if (Math.abs(h) < 0.1) {
        return '0';
      }
      return h.toFixed(1).replace(/\.0$/, '');
    },
    CHTMLsvg: function(j, k, i) {
      if (!h) {
        var h = document.createElementNS(f, 'svg');
        if (h.style) {
          h.style.width = d.Em(k.W);
          h.style.height = d.Em(k.H + k.D);
          h.style.verticalAlign = d.Em(-k.D);
          h.style.marginLeft = d.Em(-k.W);
        }
        this.CHTMLsvgElement(h, 'g', { 'stroke-width': d.Px(i) });
        j.parentNode.appendChild(h);
      }
      return h;
    },
    CHTMLsvgElement: function(h, i, j) {
      var k = document.createElementNS(f, i);
      k.isMathJax = true;
      if (j) {
        for (var l in j) {
          if (j.hasOwnProperty(l)) {
            k.setAttributeNS(null, l, j[l].toString());
          }
        }
      }
      h.appendChild(k);
      return k;
    }
  });
  if (!document.createElementNS) {
    delete a.menclose.prototype.toCommonHTML;
  }
  MathJax.Hub.Startup.signal.Post('CommonHTML menclose Ready');
  MathJax.Ajax.loadComplete(d.autoloadDir + '/menclose.js');
});
