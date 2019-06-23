/*
 *  /MathJax/jax/output/HTML-CSS/autoload/menclose.js
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

MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function() {
  var d = '2.7.5';
  var a = MathJax.ElementJax.mml,
    b = MathJax.OutputJax['HTML-CSS'];
  var c = 'http://www.w3.org/2000/svg';
  var f = 'urn:schemas-microsoft-com:vml';
  var e = 'mjxvml';
  a.menclose.Augment({
    toHTML: function(ac) {
      var j = this.getValues(
        'notation',
        'thickness',
        'padding',
        'mathcolor',
        'color'
      );
      if (j.color && !this.mathcolor) {
        j.mathcolor = j.color;
      }
      if (j.thickness == null) {
        j.thickness = '.075em';
      }
      if (j.padding == null) {
        j.padding = '.2em';
      }
      ac = this.HTMLcreateSpan(ac);
      var V = this.HTMLgetMu(ac),
        af = this.HTMLgetScale();
      var X = b.length2em(j.padding, V, 1 / b.em) * af;
      var N = b.length2em(j.thickness, V, 1 / b.em) * af;
      N = Math.max(1 / b.em, N);
      var E = b.Em(N) + ' solid';
      var z = b.createStack(ac);
      var v = b.createBox(z);
      this.HTMLmeasureChild(0, v);
      var K = v.bbox.h + X + N,
        P = v.bbox.d + X + N,
        o = v.bbox.w + 2 * (X + N);
      var O = b.createFrame(z, K + P, 0, o, N, 'none');
      O.id = 'MathJax-frame-' + this.spanID;
      b.addBox(z, O);
      z.insertBefore(O, v);
      var s = 0,
        U = 0,
        u = 0,
        A = 0,
        M = 0,
        J = 0;
      var S, g;
      var I, ad, Q;
      if (!j.mathcolor) {
        j.mathcolor = 'currentColor';
      } else {
        ac.style.color = j.mathcolor;
      }
      var k = MathJax.Hub.SplitList(j.notation),
        q = {};
      for (var ab = 0, Z = k.length; ab < Z; ab++) {
        q[k[ab]] = true;
      }
      if (q[a.NOTATION.UPDIAGONALARROW]) {
        q[a.NOTATION.UPDIAGONALSTRIKE] = false;
      }
      var G;
      for (var Y in q) {
        if (!q.hasOwnProperty(Y) || !q[Y]) {
          continue;
        }
        switch (Y) {
          case a.NOTATION.BOX:
            O.style.border = E;
            if (!b.msieBorderWidthBug) {
              s = U = A = u = N;
            }
            break;
          case a.NOTATION.ROUNDEDBOX:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              Q = Math.floor(1000 * Math.min(o, K + P) - 2 * N);
              (I = Math.floor(4000 * (o - 2 * N))),
                (ad = Math.floor(4000 * (K + P - 2 * N)));
              this.HTMLvmlElement(g, 'shape', {
                style: {
                  width: this.HTMLpx(o - 2 * N),
                  height: this.HTMLpx(K + P - 2 * N),
                  left: this.HTMLpx(N, 0.5),
                  top: this.HTMLpx(N, 0.5)
                },
                path:
                  'm ' +
                  Q +
                  ',0 qx 0,' +
                  Q +
                  ' l 0,' +
                  (ad - Q) +
                  ' qy ' +
                  Q +
                  ',' +
                  ad +
                  ' l ' +
                  (I - Q) +
                  ',' +
                  ad +
                  ' qx ' +
                  I +
                  ',' +
                  (ad - Q) +
                  ' l ' +
                  I +
                  ',' +
                  Q +
                  ' qy ' +
                  (I - Q) +
                  ',0 x e',
                coordsize: I + ',' + ad
              });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'rect', {
                x: 1,
                y: 1,
                width: this.HTMLpx(o - N) - 1,
                height: this.HTMLpx(K + P - N) - 1,
                rx: this.HTMLpx(Math.min(K + P, o) / 4)
              });
            }
            break;
          case a.NOTATION.CIRCLE:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLvmlElement(g, 'oval', {
                style: {
                  width: this.HTMLpx(o - 2 * N),
                  height: this.HTMLpx(K + P - 2 * N),
                  left: this.HTMLpx(N, 0.5),
                  top: this.HTMLpx(N, 0.5)
                }
              });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'ellipse', {
                rx: this.HTMLpx(o / 2 - N),
                ry: this.HTMLpx((K + P) / 2 - N),
                cx: this.HTMLpx(o / 2),
                cy: this.HTMLpx((K + P) / 2)
              });
            }
            break;
          case a.NOTATION.LEFT:
            O.style.borderLeft = E;
            if (!b.msieBorderWidthBug) {
              A = N;
            }
            break;
          case a.NOTATION.ACTUARIAL:
            O.style.borderTop = E;
            if (!b.msieBorderWidthBug) {
              s = N;
              O.bbox.w += X - N;
            }
          case a.NOTATION.RIGHT:
            O.style.borderRight = E;
            if (!b.msieBorderWidthBug) {
              u = N;
            }
            break;
          case a.NOTATION.VERTICALSTRIKE:
            G = b.createRule(z, K + P - N / 2, 0, N);
            b.addBox(z, G);
            b.placeBox(G, X + N + v.bbox.w / 2, -P, true);
            break;
          case a.NOTATION.TOP:
            O.style.borderTop = E;
            if (!b.msieBorderWidthBug) {
              s = N;
            }
            break;
          case a.NOTATION.BOTTOM:
            O.style.borderBottom = E;
            if (!b.msieBorderWidthBug) {
              U = N;
            }
            break;
          case a.NOTATION.HORIZONTALSTRIKE:
            G = b.createRule(z, N, 0, o - N / 2);
            b.addBox(z, G);
            b.placeBox(G, 0, (K + P) / 2 - P, true);
            break;
          case a.NOTATION.UPDIAGONALSTRIKE:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              G = this.HTMLvmlElement(g, 'line', {
                from: '0,' + this.HTMLpx(K + P - N),
                to: this.HTMLpx(o) + ',0'
              });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'line', {
                x1: 1,
                y1: this.HTMLpx(K + P - N),
                x2: this.HTMLpx(o - N),
                y2: this.HTMLpx(N)
              });
            }
            break;
          case a.NOTATION.UPDIAGONALARROW:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              G = this.HTMLvmlElement(g, 'line', {
                from: '0,' + this.HTMLpx(K + P - N),
                to: this.HTMLpx(o) + ',' + this.HTMLpx(N)
              });
              this.HTMLvmlElement(G, 'stroke', { endarrow: 'classic' });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              var aa = Math.sqrt(o * o + (K + P) * (K + P)),
                ae = ((((1 / aa) * 10 * this.scale) / b.em) * N) / 0.075;
              I = o * ae;
              ad = (K + P) * ae;
              var F = o - N / 2,
                C = N / 2;
              if (C + ad - 0.4 * I < 0) {
                C = 0.4 * I - ad;
              }
              this.HTMLsvgElement(S.firstChild, 'line', {
                x1: 1,
                y1: this.HTMLpx(K + P - N),
                x2: this.HTMLpx(F - 0.7 * I),
                y2: this.HTMLpx(C + 0.7 * ad)
              });
              this.HTMLsvgElement(S.firstChild, 'polygon', {
                points:
                  this.HTMLpx(F) +
                  ',' +
                  this.HTMLpx(C) +
                  ' ' +
                  this.HTMLpx(F - I - 0.4 * ad) +
                  ',' +
                  this.HTMLpx(C + ad - 0.4 * I) +
                  ' ' +
                  this.HTMLpx(F - 0.7 * I) +
                  ',' +
                  this.HTMLpx(C + 0.7 * ad) +
                  ' ' +
                  this.HTMLpx(F - I + 0.4 * ad) +
                  ',' +
                  this.HTMLpx(C + ad + 0.4 * I) +
                  ' ' +
                  this.HTMLpx(F) +
                  ',' +
                  this.HTMLpx(C),
                fill: j.mathcolor,
                stroke: 'none'
              });
            }
            break;
          case a.NOTATION.DOWNDIAGONALSTRIKE:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLvmlElement(g, 'line', {
                from: '0,0',
                to: this.HTMLpx(o) + ',' + this.HTMLpx(K + P - N)
              });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'line', {
                x1: 1,
                y1: this.HTMLpx(N),
                x2: this.HTMLpx(o - N),
                y2: this.HTMLpx(K + P - N)
              });
            }
            break;
          case a.NOTATION.PHASORANGLE:
            o -= 2 * X;
            X = (K + P) / 2;
            o += X;
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLvmlElement(g, 'shape', {
                style: { width: this.HTMLpx(o), height: this.HTMLpx(K + P) },
                path:
                  'm ' +
                  this.HTMLpt(X + N / 2, N / 2) +
                  ' l ' +
                  this.HTMLpt(N / 2, K + P - N) +
                  ' ' +
                  this.HTMLpt(o - N / 2, K + P - N) +
                  ' e',
                coordsize: this.HTMLpt(o, K + P)
              });
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'path', {
                d:
                  'M ' +
                  this.HTMLpx(X) +
                  ',1L 1,' +
                  this.HTMLpx(K + P - N) +
                  ' L ' +
                  this.HTMLpx(o) +
                  ',' +
                  this.HTMLpx(K + P - N)
              });
              b.placeBox(S.parentNode, 0, -P, true);
            }
            break;
          case a.NOTATION.MADRUWB:
            O.style.borderBottom = E;
            O.style.borderRight = E;
            if (!b.msieBorderWidthBug) {
              U = u = N;
            }
            break;
          case a.NOTATION.RADICAL:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLvmlElement(g, 'shape', {
                style: { width: this.HTMLpx(o), height: this.HTMLpx(K + P) },
                path:
                  'm ' +
                  this.HTMLpt(N / 2, 0.6 * (K + P)) +
                  ' l ' +
                  this.HTMLpt(X, K + P - N) +
                  ' ' +
                  this.HTMLpt(2 * X, N / 2) +
                  ' ' +
                  this.HTMLpt(o, N / 2) +
                  ' e',
                coordsize: this.HTMLpt(o, K + P)
              });
              M = X;
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'path', {
                d:
                  'M 1,' +
                  this.HTMLpx(0.6 * (K + P)) +
                  ' L ' +
                  this.HTMLpx(X) +
                  ',' +
                  this.HTMLpx(K + P) +
                  ' L ' +
                  this.HTMLpx(2 * X) +
                  ',1 L ' +
                  this.HTMLpx(o) +
                  ',1'
              });
              b.placeBox(S.parentNode, 0, X / 2 - P, true);
              M = X;
              J = N;
            }
            break;
          case a.NOTATION.LONGDIV:
            if (b.useVML) {
              if (!g) {
                g = this.HTMLvml(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLvmlElement(g, 'line', {
                from: '0,' + this.HTMLpx(N / 2),
                to: this.HTMLpx(o - N) + ',' + this.HTMLpx(N / 2)
              });
              this.HTMLvmlElement(g, 'arc', {
                style: {
                  width: this.HTMLpx(2 * X),
                  height: this.HTMLpx(K + P - 2 * N),
                  left: this.HTMLpx(-X),
                  top: this.HTMLpx(N)
                },
                startangle: '10',
                endangle: '170'
              });
              M = X;
            } else {
              if (!S) {
                S = this.HTMLsvg(z, K, P, o, N, j.mathcolor);
              }
              this.HTMLsvgElement(S.firstChild, 'path', {
                d:
                  'M ' +
                  this.HTMLpx(o) +
                  ',1 L 1,1 a' +
                  this.HTMLpx(X) +
                  ',' +
                  this.HTMLpx((K + P) / 2 - N) +
                  ' 0 0,1 1,' +
                  this.HTMLpx(K + P - 2 * N)
              });
              b.placeBox(S.parentNode, 0, N - P, true);
              M = X;
              J = N;
            }
            break;
        }
      }
      O.style.width = b.Em(o - A - u);
      O.style.height = b.Em(K + P - s - U);
      b.placeBox(O, 0, J - P, true);
      b.placeBox(v, M + X + N, 0);
      this.HTMLhandleSpace(ac);
      this.HTMLhandleColor(ac);
      return ac;
    },
    HTMLpx: function(g) {
      return g * b.em;
    },
    HTMLpt: function(g, h) {
      return Math.floor(1000 * g) + ',' + Math.floor(1000 * h);
    },
    HTMLhandleColor: function(h) {
      var i = document.getElementById('MathJax-frame-' + this.spanID);
      if (i) {
        var g = this.getValues('mathbackground', 'background');
        if (this.style && h.style.backgroundColor) {
          g.mathbackground = h.style.backgroundColor;
          h.style.backgroundColor = '';
        }
        if (g.background && !this.mathbackground) {
          g.mathbackground = g.background;
        }
        if (g.mathbackground && g.mathbackground !== a.COLOR.TRANSPARENT) {
          i.style.backgroundColor = g.mathbackground;
        }
      } else {
        this.SUPER(arguments).HTMLhandleColor.call(this, h);
      }
    },
    HTMLsvg: function(h, l, m, g, k, j) {
      var i = document.createElementNS(c, 'svg');
      if (i.style) {
        i.style.width = b.Em(g);
        i.style.height = b.Em(l + m);
      }
      var n = b.createBox(h);
      n.appendChild(i);
      b.placeBox(n, 0, -m, true);
      this.HTMLsvgElement(i, 'g', {
        fill: 'none',
        stroke: j,
        'stroke-width': k * b.em
      });
      return i;
    },
    HTMLsvgElement: function(g, h, i) {
      var j = document.createElementNS(c, h);
      j.isMathJax = true;
      if (i) {
        for (var k in i) {
          if (i.hasOwnProperty(k)) {
            j.setAttributeNS(null, k, i[k].toString());
          }
        }
      }
      g.appendChild(j);
      return j;
    },
    HTMLvml: function(i, l, m, h, k, j) {
      var g = b.createFrame(i, l + m, 0, h, 0, 'none');
      b.addBox(i, g);
      b.placeBox(g, 0, -m, true);
      this.constructor.VMLcolor = j;
      this.constructor.VMLthickness = this.HTMLpx(k);
      return g;
    },
    HTMLvmlElement: function(g, h, i) {
      var j = b.addElement(g, e + ':' + h, { isMathJax: true });
      j.style.position = 'absolute';
      j.style.left = j.style.top = 0;
      MathJax.Hub.Insert(j, i);
      if (!i.fillcolor) {
        j.fillcolor = 'none';
      }
      if (!i.strokecolor) {
        j.strokecolor = this.constructor.VMLcolor;
      }
      if (!i.strokeweight) {
        j.strokeweight = this.constructor.VMLthickness;
      }
      return j;
    }
  });
  MathJax.Hub.Browser.Select({
    MSIE: function(g) {
      if ((document.documentMode || 0) < 9) {
        a.menclose.Augment({
          HTMLpx: function(i, h) {
            return i * b.em + (h || 0) + 'px';
          }
        });
        b.useVML = true;
        if (!document.namespaces[e]) {
          if (document.documentMode && document.documentMode === 8) {
            document.namespaces.add(e, f, '#default#VML');
          } else {
            document.namespaces.add(e, f);
            document
              .createStyleSheet()
              .addRule(e + '\\: *', '{behavior: url(#default#VML)}');
          }
        }
      }
    }
  });
  MathJax.Hub.Startup.signal.Post('HTML-CSS menclose Ready');
  MathJax.Ajax.loadComplete(b.autoloadDir + '/menclose.js');
});
