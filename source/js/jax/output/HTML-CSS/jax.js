/*
 *  /MathJax/jax/output/HTML-CSS/jax.js
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

(function(j, b, d) {
  var i,
    k = b.Browser.isMobile;
  var h = MathJax.Object.isArray;
  var e = function() {
    var m = [].slice.call(arguments, 0);
    m[0][0] = ['HTML-CSS', m[0][0]];
    return MathJax.Message.Set.apply(MathJax.Message, m);
  };
  var f = MathJax.Object.Subclass({
    timeout: (k ? 15 : 8) * 1000,
    comparisonFont: [
      'sans-serif',
      'monospace',
      'script',
      'Times',
      'Courier',
      'Arial',
      'Helvetica'
    ],
    testSize: ['40px', '50px', '60px', '30px', '20px'],
    FedoraSTIXcheck: {
      family: 'STIXSizeOneSym',
      testString: 'abcABC',
      noStyleChar: true
    },
    Init: function() {
      this.div = MathJax.HTML.addElement(
        document.body,
        'div',
        {
          style: {
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
            padding: 0,
            border: 0,
            margin: 0
          }
        },
        [
          [
            'div',
            {
              id: 'MathJax_Font_Test',
              style: {
                position: 'absolute',
                visibility: 'hidden',
                top: 0,
                left: 0,
                width: 'auto',
                'min-width': 0,
                'max-width': 'none',
                padding: 0,
                border: 0,
                margin: 0,
                whiteSpace: 'nowrap',
                textAlign: 'left',
                textIndent: 0,
                textTransform: 'none',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                wordSpacing: 'normal',
                fontSize: this.testSize[0],
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSizeAdjust: 'none'
              }
            },
            ['']
          ]
        ]
      ).firstChild;
      this.text = this.div.firstChild;
    },
    findFont: function(r, o) {
      var q = null;
      if (o && this.testCollection(o)) {
        q = o;
      } else {
        for (var p = 0, n = r.length; p < n; p++) {
          if (r[p] === o) {
            continue;
          }
          if (this.testCollection(r[p])) {
            q = r[p];
            break;
          }
        }
      }
      if (q === 'STIX' && this.testFont(this.FedoraSTIXcheck)) {
        q = null;
      }
      return q;
    },
    testCollection: function(n) {
      var m = { testString: '() {} []' };
      m.family =
        { TeX: 'MathJax_Size1', STIX: 'STIXSizeOneSym' }[n] ||
        n.replace(/-(Math)?/, '') + 'MathJax_Size1';
      if (n === 'STIX') {
        m.noStyleChar = true;
      }
      return this.testFont(m);
    },
    testFont: function(p) {
      if (p.isWebFont && d.FontFaceBug) {
        this.div.style.fontWeight = this.div.style.fontStyle = 'normal';
      } else {
        this.div.style.fontWeight = p.weight || 'normal';
        this.div.style.fontStyle = p.style || 'normal';
      }
      var r = p.familyFixed || p.family;
      if (!p.isWebFont && !r.match(/^(STIX|MathJax)|'/)) {
        r =
          r
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/ Jax/, 'Jax') +
          "','" +
          r +
          "','" +
          r +
          '-';
        if (p.weight) {
          r += 'Bold';
        }
        if (p.style) {
          r += 'Italic';
        }
        if (!p.weight && !p.style) {
          r += 'Regular';
        }
        p.familyFixed = r = "'" + r + "'";
      }
      var o = this.getComparisonWidths(p.testString, p.noStyleChar);
      var s = null;
      if (o) {
        this.div.style.fontFamily = r + ',' + this.comparisonFont[0];
        if (this.div.offsetWidth == o[0]) {
          this.div.style.fontFamily = r + ',' + this.comparisonFont[o[2]];
          if (this.div.offsetWidth == o[1]) {
            s = false;
          }
        }
        if (
          s === null &&
          (this.div.offsetWidth != o[3] || this.div.offsetHeight != o[4])
        ) {
          if (!p.noStyleChar && d.FONTDATA && d.FONTDATA.hasStyleChar) {
            for (var q = 0, n = this.testSize.length; q < n; q++) {
              if (this.testStyleChar(p, this.testSize[q])) {
                s = true;
                n = 0;
              }
            }
          } else {
            s = true;
          }
        }
      }
      if (d.safariTextNodeBug) {
        this.div.innerHTML = '';
      } else {
        this.text.nodeValue = '';
      }
      return s;
    },
    styleChar: '\uEFFD',
    versionChar: '\uEFFE',
    compChar: '\uEFFF',
    testStyleChar: function(p, r) {
      var u = 3 + (p.weight ? 2 : 0) + (p.style ? 4 : 0);
      var o = '',
        q = 0;
      var t = this.div.style.fontSize;
      this.div.style.fontSize = r;
      if (d.msieItalicWidthBug && p.style === 'italic') {
        this.text.nodeValue = o = this.compChar;
        q = this.div.offsetWidth;
      }
      if (d.safariTextNodeBug) {
        this.div.innerHTML = this.compChar + o;
      } else {
        this.text.nodeValue = this.compChar + o;
      }
      var m = this.div.offsetWidth - q;
      if (d.safariTextNodeBug) {
        this.div.innerHTML = this.styleChar + o;
      } else {
        this.text.nodeValue = this.styleChar + o;
      }
      var s = Math.floor((this.div.offsetWidth - q) / m + 0.5);
      if (s === u) {
        if (d.safariTextNodeBug) {
          this.div.innerHTML = this.versionChar + o;
        } else {
          this.text.nodeValue = this.versionChar + o;
        }
        p.version = Math.floor((this.div.offsetWidth - q) / m + 1.5) / 2;
      }
      this.div.style.fontSize = t;
      return s === u;
    },
    getComparisonWidths: function(r, p) {
      if (d.FONTDATA && d.FONTDATA.hasStyleChar && !p) {
        r += this.styleChar + ' ' + this.compChar;
      }
      if (d.safariTextNodeBug) {
        this.div.innerHTML = r;
      } else {
        this.text.nodeValue = r;
      }
      this.div.style.fontFamily = this.comparisonFont[0];
      var o = this.div.offsetWidth;
      this.div.style.fontFamily = d.webFontDefault;
      var t = this.div.offsetWidth,
        q = this.div.offsetHeight;
      for (var s = 1, n = this.comparisonFont.length; s < n; s++) {
        this.div.style.fontFamily = this.comparisonFont[s];
        if (this.div.offsetWidth != o) {
          return [o, this.div.offsetWidth, s, t, q];
        }
      }
      return null;
    },
    loadWebFont: function(o) {
      b.Startup.signal.Post(
        'HTML-CSS Jax - Web-Font ' + d.fontInUse + '/' + o.directory
      );
      var q = e([
        'LoadWebFont',
        'Loading web-font %1',
        d.fontInUse + '/' + o.directory
      ]);
      var m = MathJax.Callback({});
      var p = MathJax.Callback(['loadComplete', this, o, q, m]);
      j.timer.start(j, [this.checkWebFont, o, p], 0, this.timeout);
      return m;
    },
    loadComplete: function(p, r, o, m) {
      MathJax.Message.Clear(r);
      if (m === j.STATUS.OK) {
        this.webFontLoaded = true;
        o();
        return;
      }
      this.loadError(p);
      if (b.Browser.isFirefox && d.allowWebFonts) {
        var q = document.location.protocol + '//' + document.location.hostname;
        if (document.location.port != '') {
          q += ':' + document.location.port;
        }
        q += '/';
        if (j.fileURL(d.webfontDir).substr(0, q.length) !== q) {
          this.firefoxFontError(p);
        }
      }
      if (!this.webFontLoaded) {
        d.loadWebFontError(p, o);
      } else {
        o();
      }
    },
    loadError: function(m) {
      e(
        [
          'CantLoadWebFont',
          "Can't load web font %1",
          d.fontInUse + '/' + m.directory
        ],
        null,
        2000
      );
      b.Startup.signal.Post(
        'HTML-CSS Jax - web font error for ' + d.fontInUse + '/' + m.directory
      );
    },
    firefoxFontError: function(m) {
      e(
        [
          'FirefoxCantLoadWebFont',
          "Firefox can't load web fonts from a remote host"
        ],
        null,
        3000
      );
      b.Startup.signal.Post(
        'HTML-CSS Jax - Firefox web fonts on remote host error'
      );
    },
    checkWebFont: function(m, n, o) {
      if (m.time(o)) {
        return;
      }
      if (d.Font.testFont(n)) {
        o(m.STATUS.OK);
      } else {
        setTimeout(m, m.delay);
      }
    },
    fontFace: function(q) {
      var r = d.allowWebFonts;
      var t = d.FONTDATA.FONTS[q];
      if (d.msieFontCSSBug && !t.family.match(/-Web$/)) {
        t.family += '-Web';
      }
      if (t.isWebFont) {
        delete t.familyFixed;
      }
      var m = d.webfontDir + '/' + r;
      var p = j.fileURL(m);
      var o = q
        .replace(/-b/, '-B')
        .replace(/-i/, '-I')
        .replace(/-Bold-/, '-Bold');
      if (!o.match(/-/)) {
        o += '-Regular';
      }
      if (r === 'svg') {
        o += '.svg#' + o;
      } else {
        o += '.' + r;
      }
      var n = j.fileRev(m + '/' + o.replace(/#.*/, ''));
      var s = {
        'font-family': t.family,
        src: "url('" + p + '/' + o + n + "')"
      };
      if (r === 'otf') {
        o = o.replace(/otf$/, 'woff');
        n = j.fileRev(m + '/' + o);
        s.src += " format('opentype')";
        p = j.fileURL(d.webfontDir + '/woff');
        s.src = "url('" + p + '/' + o + n + "') format('woff'), " + s.src;
      } else {
        if (r !== 'eot') {
          s.src += " format('" + r + "')";
        }
      }
      if (!(d.FontFaceBug && t.isWebFont)) {
        if (q.match(/-bold/)) {
          s['font-weight'] = 'bold';
        }
        if (q.match(/-italic/)) {
          s['font-style'] = 'italic';
        }
      }
      return s;
    }
  });
  var l, a, c;
  var g = MathJax.Hub.Browser.isMSIE && (document.documentMode || 0) < 8;
  d.Augment({
    config: {
      styles: {
        '.MathJax': {
          display: 'inline',
          'font-style': 'normal',
          'font-weight': 'normal',
          'line-height': 'normal',
          'font-size': '100%',
          'font-size-adjust': 'none',
          'text-indent': 0,
          'text-align': 'left',
          'text-transform': 'none',
          'letter-spacing': 'normal',
          'word-spacing': 'normal',
          'word-wrap': 'normal',
          'white-space': 'nowrap',
          float: 'none',
          direction: 'ltr',
          'max-width': 'none',
          'max-height': 'none',
          'min-width': 0,
          'min-height': 0,
          border: 0,
          padding: 0,
          margin: 0
        },
        '.MathJax:focus, body :focus .MathJax': { display: 'inline-table' },
        '.MathJax_Display': {
          position: 'relative',
          display: 'block!important',
          'text-indent': 0,
          'max-width': 'none',
          'max-height': 'none',
          'min-width': 0,
          'min-height': 0,
          width: '100%'
        },
        '.MathJax.MathJax_FullWidth': {
          'text-align': 'center',
          display: (g ? 'block' : 'table-cell') + '!important',
          width: (g ? '100%' : '10000em') + '!important'
        },
        '.MathJax img, .MathJax nobr, .MathJax a': {
          border: 0,
          padding: 0,
          margin: 0,
          'max-width': 'none',
          'max-height': 'none',
          'min-width': 0,
          'min-height': 0,
          'vertical-align': 0,
          'line-height': 'normal',
          'text-decoration': 'none'
        },
        'img.MathJax_strut': {
          border: '0!important',
          padding: '0!important',
          margin: '0!important',
          'vertical-align': '0!important'
        },
        '.MathJax span': {
          display: 'inline',
          position: 'static',
          border: 0,
          padding: 0,
          margin: 0,
          'vertical-align': 0,
          'line-height': 'normal',
          'text-decoration': 'none',
          'box-sizing': 'content-box'
        },
        '.MathJax nobr': { 'white-space': 'nowrap!important' },
        '.MathJax img': {
          display: 'inline!important',
          float: 'none!important'
        },
        '.MathJax *': {
          transition: 'none',
          '-webkit-transition': 'none',
          '-moz-transition': 'none',
          '-ms-transition': 'none',
          '-o-transition': 'none'
        },
        '.MathJax_Processing': {
          visibility: 'hidden',
          position: 'fixed',
          width: 0,
          height: 0,
          overflow: 'hidden'
        },
        '.MathJax_Processed': { display: 'none!important' },
        '.MathJax_test': {
          'font-style': 'normal',
          'font-weight': 'normal',
          'font-size': '100%',
          'font-size-adjust': 'none',
          'text-indent': 0,
          'text-transform': 'none',
          'letter-spacing': 'normal',
          'word-spacing': 'normal',
          overflow: 'hidden',
          height: '1px'
        },
        '.MathJax_test.mjx-test-display': {
          display: (g ? 'block' : 'table') + '!important'
        },
        '.MathJax_test.mjx-test-inline': {
          display: 'inline!important',
          'margin-right': '-1px'
        },
        '.MathJax_test.mjx-test-default': {
          display: 'block!important',
          clear: 'both'
        },
        '.MathJax_ex_box': {
          display: 'inline-block!important',
          position: 'absolute',
          overflow: 'hidden',
          'min-height': 0,
          'max-height': 'none',
          padding: 0,
          border: 0,
          margin: 0,
          width: '1px',
          height: '60ex'
        },
        '.MathJax_em_box': {
          display: 'inline-block!important',
          position: 'absolute',
          overflow: 'hidden',
          'min-height': 0,
          'max-height': 'none',
          padding: 0,
          border: 0,
          margin: 0,
          width: '1px',
          height: '60em'
        },
        '.mjx-test-inline .MathJax_left_box': {
          display: 'inline-block',
          width: 0,
          float: 'left'
        },
        '.mjx-test-inline .MathJax_right_box': {
          display: 'inline-block',
          width: 0,
          float: 'right'
        },
        '.mjx-test-display .MathJax_right_box': {
          display: (g ? 'block' : 'table-cell') + '!important',
          width: (g ? '100%' : '10000em') + '!important',
          'min-width': 0,
          'max-width': 'none',
          padding: 0,
          border: 0,
          margin: 0
        },
        '.MathJax .MathJax_HitBox': {
          cursor: 'text',
          background: 'white',
          opacity: 0,
          filter: 'alpha(opacity=0)'
        },
        '.MathJax .MathJax_HitBox *': {
          filter: 'none',
          opacity: 1,
          background: 'transparent'
        },
        '#MathJax_Tooltip': {
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'auto',
          height: 'auto',
          display: 'none'
        },
        '#MathJax_Tooltip *': {
          filter: 'none',
          opacity: 1,
          background: 'transparent'
        },
        '@font-face': {
          'font-family': 'MathJax_Blank',
          src: "url('about:blank')"
        }
      }
    },
    settings: b.config.menuSettings,
    Font: null,
    webFontDefault: 'MathJax_Blank',
    allowWebFonts: 'otf',
    maxStretchyParts: 1000,
    fontName: {
      TeXLocal: 'TeX',
      TeXWeb: ['', 'TeX'],
      TeXImage: ['', ''],
      STIXLocal: ['STIX', 'STIX-Web'],
      STIXWeb: 'STIX-Web',
      AsanaMathWeb: 'Asana-Math',
      GyrePagellaWeb: 'Gyre-Pagella',
      GyreTermesWeb: 'Gyre-Termes',
      LatinModernWeb: 'Latin-Modern',
      NeoEulerWeb: 'Neo-Euler'
    },
    fontInUse: 'generic',
    FONTDATA: {
      TeX_factor: 1,
      baselineskip: 1.2,
      lineH: 0.8,
      lineD: 0.2,
      ffLineH: 0.8,
      FONTS: {},
      VARIANT: {
        normal: { fonts: [] },
        '-generic-variant': {},
        '-largeOp': {},
        '-smallOp': {}
      },
      RANGES: [],
      DELIMITERS: {},
      RULECHAR: 45,
      REMAP: {}
    },
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.Font = f();
      this.SUPER(arguments).Config.call(this);
      var o = this.settings,
        n = this.config,
        m = o.font;
      if (this.adjustAvailableFonts) {
        this.adjustAvailableFonts(n.availableFonts);
      }
      if (o.scale) {
        n.scale = o.scale;
      }
      if (m && m !== 'Auto' && this.fontName[m]) {
        n.availableFonts = [];
        delete n.fonts;
        if (h(this.fontName[m])) {
          n.preferredFont = this.fontName[m][0];
          n.webFont = this.fontName[m][1];
        } else {
          n.preferredFont = n.webFont = this.fontName[m];
        }
        if (n.preferredFont) {
          n.availableFonts[0] = n.preferredFont;
        }
      }
      if (n.fonts) {
        n.availableFonts = n.fonts;
        n.preferredFont = n.webFont = n.fonts[0];
        if (n.webFont === 'STIX') {
          n.webFont += '-Web';
        }
      }
      m = this.Font.findFont(n.availableFonts, n.preferredFont);
      if (!m && this.allowWebFonts) {
        m = n.webFont;
        if (m) {
          this.webFonts = true;
        }
      }
      if (!m && this.config.imageFont) {
        m = n.imageFont;
        this.imgFonts = true;
      }
      if (m) {
        this.fontInUse = m;
        this.fontDir += '/' + m;
        this.webfontDir += '/' + m;
        this.require.push(this.fontDir + '/fontdata.js');
        if (this.imgFonts) {
          this.require.push(this.directory + '/imageFonts.js');
          b.Startup.signal.Post('HTML-CSS Jax - using image fonts');
        }
      } else {
        e(
          [
            'CantFindFontUsing',
            "Can't find a valid font using %1",
            '[' + this.config.availableFonts.join(', ') + ']'
          ],
          null,
          3000
        );
        b.Startup.signal.Post('HTML-CSS Jax - no valid font');
      }
      this.require.push(MathJax.OutputJax.extensionDir + '/MathEvents.js');
    },
    Startup: function() {
      l = MathJax.Extension.MathEvents.Event;
      a = MathJax.Extension.MathEvents.Touch;
      c = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = l.ContextMenu;
      this.Mousedown = l.AltContextMenu;
      this.Mouseover = c.Mouseover;
      this.Mouseout = c.Mouseout;
      this.Mousemove = c.Mousemove;
      this.hiddenDiv = this.Element('div', {
        style: {
          visibility: 'hidden',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          height: '1px',
          width: 'auto',
          padding: 0,
          border: 0,
          margin: 0,
          textAlign: 'left',
          textIndent: 0,
          textTransform: 'none',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          wordSpacing: 'normal'
        }
      });
      if (!document.body.firstChild) {
        document.body.appendChild(this.hiddenDiv);
      } else {
        document.body.insertBefore(this.hiddenDiv, document.body.firstChild);
      }
      this.hiddenDiv = this.addElement(this.hiddenDiv, 'div', {
        id: 'MathJax_Hidden'
      });
      var n = this.addElement(this.hiddenDiv, 'div', {
        style: { width: '5in' }
      });
      this.pxPerInch = n.offsetWidth / 5;
      this.hiddenDiv.removeChild(n);
      this.startMarker = this.createStrut(this.Element('span'), 10, true);
      this.endMarker = this.addText(this.Element('span'), 'x').parentNode;
      this.HDspan = this.Element('span');
      if (this.operaHeightBug) {
        this.createStrut(this.HDspan, 0);
      }
      if (this.msieInlineBlockAlignBug) {
        this.HDimg = this.addElement(this.HDspan, 'img', {
          style: { height: '0px', width: '1px' }
        });
        try {
          this.HDimg.src = 'about:blank';
        } catch (m) {}
      } else {
        this.HDimg = this.createStrut(this.HDspan, 0);
      }
      this.TestSpan = this.Element('span', { className: 'MathJax_test' }, [
        ['span', { className: 'MathJax_left_box' }],
        ['span', { className: 'MathJax_ex_box' }],
        ['span', { className: 'MathJax_em_box' }],
        ['span', { className: 'MathJax_right_box' }]
      ]);
      return j.Styles(this.config.styles, ['InitializeHTML', this]);
    },
    removeSTIXfonts: function(p) {
      for (var o = 0, n = p.length; o < n; o++) {
        if (p[o] === 'STIX') {
          p.splice(o, 1);
          n--;
          o--;
        }
      }
      if (this.config.preferredFont === 'STIX') {
        this.config.preferredFont = p[0];
      }
    },
    PreloadWebFonts: function() {
      if (!d.allowWebFonts || !d.config.preloadWebFonts) {
        return;
      }
      for (var o = 0, n = d.config.preloadWebFonts.length; o < n; o++) {
        var p = d.FONTDATA.FONTS[d.config.preloadWebFonts[o]];
        if (!p.available) {
          d.Font.testFont(p);
        }
      }
    },
    InitializeHTML: function() {
      this.PreloadWebFonts();
      this.getDefaultExEm();
      if (this.defaultEm) {
        return;
      }
      var m = MathJax.Callback();
      j.timer.start(
        j,
        function(n) {
          if (n.time(m)) {
            b.signal.Post(['HTML-CSS Jax - no default em size']);
            return;
          }
          d.getDefaultExEm();
          if (d.defaultEm) {
            m();
          } else {
            setTimeout(n, n.delay);
          }
        },
        this.defaultEmDelay,
        this.defaultEmTimeout
      );
      return m;
    },
    defaultEmDelay: 100,
    defaultEmTimeout: 1000,
    getDefaultExEm: function() {
      var m = document.body.appendChild(this.TestSpan.cloneNode(true));
      m.className += ' mjx-test-inline mjx-test-default';
      this.defaultEx = m.childNodes[1].offsetHeight / 60;
      this.defaultEm = m.childNodes[2].offsetHeight / 60;
      this.defaultWidth = Math.max(
        0,
        m.lastChild.offsetLeft - m.firstChild.offsetLeft - 2
      );
      document.body.removeChild(m);
    },
    preTranslate: function(s) {
      var r = s.jax[this.id],
        D,
        z = r.length,
        y,
        G,
        w,
        C,
        u,
        E,
        p,
        F,
        o,
        H,
        v,
        t = false,
        A,
        q = this.config.linebreaks.automatic,
        x = this.config.linebreaks.width;
      if (q) {
        t = x.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null;
        if (t) {
          x = x.replace(/\s*container\s*/, '');
        } else {
          v = this.defaultWidth;
        }
        if (x === '') {
          x = '100%';
        }
      } else {
        v = 100000;
      }
      for (D = 0; D < z; D++) {
        G = r[D];
        if (!G.parentNode) {
          continue;
        }
        w = G.previousSibling;
        if (
          w &&
          String(w.className).match(
            /^MathJax(_Display)?( MathJax_Process(ing|ed))?$/
          )
        ) {
          w.parentNode.removeChild(w);
        }
        if (G.MathJax.preview) {
          G.MathJax.preview.style.display = 'none';
        }
        p = G.MathJax.elementJax;
        if (!p) {
          continue;
        }
        p.HTMLCSS = { display: p.root.Get('display') === 'block' };
        C = u = this.Element('span', {
          className: 'MathJax',
          id: p.inputID + '-Frame',
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: l.Menu,
          onmousedown: l.Mousedown,
          onmouseover: l.Mouseover,
          onmouseout: l.Mouseout,
          onmousemove: l.Mousemove,
          onclick: l.Click,
          ondblclick: l.DblClick,
          onkeydown: l.Keydown,
          tabIndex: b.getTabOrder(p)
        });
        if (b.Browser.noContextMenu) {
          C.ontouchstart = a.start;
          C.ontouchend = a.end;
        }
        if (p.HTMLCSS.display) {
          u = this.Element('div', { className: 'MathJax_Display' });
          u.appendChild(C);
        } else {
          if (this.msieDisappearingBug) {
            C.style.display = 'inline-block';
          }
        }
        u.className += ' MathJax_Processing';
        G.parentNode.insertBefore(u, G);
        p.HTMLCSS.span = C;
        p.HTMLCSS.div = u;
        E = this.TestSpan.cloneNode(true);
        E.className +=
          ' mjx-test-' + (p.HTMLCSS.display ? 'display' : 'inline');
        G.parentNode.insertBefore(E, G);
      }
      var B = [];
      for (D = 0; D < z; D++) {
        G = r[D];
        if (!G.parentNode) {
          continue;
        }
        E = G.previousSibling;
        u = E.previousSibling;
        p = G.MathJax.elementJax;
        if (!p) {
          continue;
        }
        F = E.childNodes[1].offsetHeight / 60;
        o = E.childNodes[2].offsetHeight / 60;
        A = Math.max(
          0,
          p.HTMLCSS.display
            ? E.lastChild.offsetWidth - 1
            : E.lastChild.offsetLeft - E.firstChild.offsetLeft - 2
        );
        if (F === 0 || F === 'NaN') {
          B.push(u);
          p.HTMLCSS.isHidden = true;
          F = this.defaultEx;
          o = this.defaultEm;
          A = this.defaultWidth;
        }
        if (A === 0 && !p.HTMLCSS.display) {
          A = this.defaultWidth;
        }
        if (t) {
          v = A;
        }
        H = this.config.matchFontHeight ? F / this.TeX.x_height / o : 1;
        H = Math.floor(
          Math.max(this.config.minScaleAdjust / 100, H) * this.config.scale
        );
        p.HTMLCSS.scale = H / 100;
        p.HTMLCSS.fontSize = H + '%';
        p.HTMLCSS.em = p.HTMLCSS.outerEm = o;
        this.em = (o * H) / 100;
        p.HTMLCSS.ex = F;
        p.HTMLCSS.cwidth = A / this.em;
        p.HTMLCSS.lineWidth = q ? this.length2em(x, 1, v / this.em) : 1000000;
      }
      for (D = 0, y = B.length; D < y; D++) {
        this.hiddenDiv.appendChild(B[D]);
        this.addElement(this.hiddenDiv, 'br');
      }
      for (D = 0; D < z; D++) {
        G = r[D];
        if (!G.parentNode) {
          continue;
        }
        p = r[D].MathJax.elementJax;
        if (!p) {
          continue;
        }
        G.parentNode.removeChild(G.previousSibling);
        if (G.MathJax.preview) {
          G.MathJax.preview.style.display = '';
        }
      }
      s.HTMLCSSeqn = s.HTMLCSSlast = 0;
      s.HTMLCSSi = -1;
      s.HTMLCSSchunk = this.config.EqnChunk;
      s.HTMLCSSdelay = false;
    },
    PHASE: { I: 1, II: 2, III: 3 },
    Translate: function(n, r) {
      if (!n.parentNode) {
        return;
      }
      if (r.HTMLCSSdelay) {
        r.HTMLCSSdelay = false;
        b.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
      }
      var m = n.MathJax.elementJax,
        q = m.root,
        s = m.HTMLCSS.div,
        o = m.HTMLCSS.span;
      if (!document.getElementById(o.id)) {
        return;
      }
      this.getMetrics(m);
      if (this.scale !== 1) {
        o.style.fontSize = m.HTMLCSS.fontSize;
      }
      this.initImg(o);
      this.initHTML(q, o);
      this.savePreview(n);
      try {
        q.setTeXclass();
        q.toHTML(o, s, this.PHASE.I);
      } catch (p) {
        if (p.restart) {
          while (o.firstChild) {
            o.removeChild(o.firstChild);
          }
        }
        this.restorePreview(n);
        throw p;
      }
      this.restorePreview(n);
      s.className = s.className.split(/ /)[0] + ' MathJax_Processed';
      b.signal.Post(['New Math Pending', m.inputID]);
      r.HTMLCSSeqn += r.i - r.HTMLCSSi;
      r.HTMLCSSi = r.i;
      if (r.HTMLCSSeqn >= r.HTMLCSSlast + r.HTMLCSSchunk) {
        this.postTranslate(r, true);
        r.HTMLCSSchunk = Math.floor(
          r.HTMLCSSchunk * this.config.EqnChunkFactor
        );
        r.HTMLCSSdelay = true;
      }
      return false;
    },
    savePreview: function(m) {
      var n = m.MathJax.preview;
      if (n) {
        m.MathJax.tmpPreview = document.createElement('span');
        n.parentNode.replaceChild(m.MathJax.tmpPreview, n);
      }
    },
    restorePreview: function(m) {
      var n = m.MathJax.tmpPreview;
      if (n) {
        n.parentNode.replaceChild(m.MathJax.preview, n);
        delete m.MathJax.tmpPreview;
      }
    },
    getMetrics: function(m) {
      var n = m.HTMLCSS;
      this.em = i.mbase.prototype.em = n.em * n.scale;
      this.outerEm = n.em;
      this.scale = n.scale;
      this.cwidth = n.cwidth;
      this.linebreakWidth = n.lineWidth;
    },
    postTranslate: function(o, u) {
      var r = o.jax[this.id],
        v,
        p,
        s,
        q;
      for (s = o.HTMLCSSlast, q = o.HTMLCSSeqn; s < q; s++) {
        v = r[s];
        if (v && v.parentNode && v.MathJax.elementJax) {
          var n = (v.MathJax.elementJax.HTMLCSS || {}).div;
          if (n) {
            n.className = n.className.split(/ /)[0];
          }
          if (v.MathJax.preview) {
            v.MathJax.preview.innerHTML = '';
          }
        }
      }
      for (s = o.HTMLCSSlast, q = o.HTMLCSSeqn; s < q; s++) {
        v = r[s];
        if (v && v.parentNode && v.MathJax.elementJax) {
          p = v.MathJax.elementJax;
          this.getMetrics(p);
          if (p.HTMLCSS.span && p.HTMLCSS.div) {
            p.root.toHTML(p.HTMLCSS.span, p.HTMLCSS.div, this.PHASE.II);
          }
        }
      }
      for (s = o.HTMLCSSlast, q = o.HTMLCSSeqn; s < q; s++) {
        v = r[s];
        if (v && v.parentNode && v.MathJax.elementJax) {
          p = v.MathJax.elementJax;
          this.getMetrics(p);
          if (p.HTMLCSS.span && p.HTMLCSS.div) {
            p.root.toHTML(p.HTMLCSS.span, p.HTMLCSS.div, this.PHASE.III);
            if (p.HTMLCSS.isHidden) {
              v.parentNode.insertBefore(p.HTMLCSS.div, v);
            }
            delete p.HTMLCSS.span;
            delete p.HTMLCSS.div;
            v.MathJax.state = p.STATE.PROCESSED;
            b.signal.Post(['New Math', v.MathJax.elementJax.inputID]);
          }
        }
      }
      if (this.forceReflow) {
        var t = (document.styleSheets || [])[0] || {};
        t.disabled = true;
        t.disabled = false;
      }
      o.HTMLCSSlast = o.HTMLCSSeqn;
    },
    getJaxFromMath: function(m) {
      if (m.parentNode.className.match(/MathJax_Display/)) {
        m = m.parentNode;
      }
      do {
        m = m.nextSibling;
      } while (m && m.nodeName.toLowerCase() !== 'script');
      return b.getJaxFor(m);
    },
    getHoverSpan: function(m, n) {
      return m.root.HTMLspanElement();
    },
    getHoverBBox: function(m, p, q) {
      var r = p.bbox,
        o = m.HTMLCSS.outerEm;
      var n = { w: r.w * o, h: r.h * o, d: r.d * o };
      if (r.width) {
        n.width = r.width;
      }
      return n;
    },
    Zoom: function(n, y, x, m, v) {
      y.className = 'MathJax';
      y.style.fontSize = n.HTMLCSS.fontSize;
      var B = y.appendChild(this.TestSpan.cloneNode(true));
      var q = B.childNodes[2].offsetHeight / 60;
      this.em = i.mbase.prototype.em = q;
      this.outerEm = q / n.HTMLCSS.scale;
      B.parentNode.removeChild(B);
      this.scale = n.HTMLCSS.scale;
      this.linebreakWidth = n.HTMLCSS.lineWidth;
      this.cwidth = n.HTMLCSS.cwidth;
      this.zoomScale = parseInt(b.config.menuSettings.zscale) / 100;
      this.idPostfix = '-zoom';
      n.root.toHTML(y, y);
      this.idPostfix = '';
      this.zoomScale = 1;
      var z = n.root.HTMLspanElement().bbox,
        p = z.width;
      if (p) {
        if (z.tw) {
          m = z.tw * q;
        }
        if (z.w * q < m) {
          m = z.w * q;
        }
        y.style.width = Math.floor(m - 1.5 * d.em) + 'px';
        y.style.display = 'inline-block';
        var o = (n.root.id || 'MathJax-Span-' + n.root.spanID) + '-zoom';
        var r = document.getElementById(o).firstChild;
        while (r && r.style.width !== p) {
          r = r.nextSibling;
        }
        if (r) {
          var u = r.offsetWidth;
          r.style.width = '100%';
          if (u > m) {
            y.style.width = u + 100 + 'px';
          }
        }
      }
      r = y.firstChild.firstChild.style;
      if (z.H != null && z.H > z.h) {
        r.marginTop = d.Em(z.H - Math.max(z.h, d.FONTDATA.lineH));
      }
      if (z.D != null && z.D > z.d) {
        r.marginBottom = d.Em(z.D - Math.max(z.d, d.FONTDATA.lineD));
      }
      if (z.lw < 0) {
        r.paddingLeft = d.Em(-z.lw);
      }
      if (z.rw > z.w) {
        r.marginRight = d.Em(z.rw - z.w);
      }
      y.style.position = 'absolute';
      if (!p) {
        x.style.position = 'absolute';
      }
      var w = y.offsetWidth,
        t = y.offsetHeight,
        A = x.offsetHeight,
        s = x.offsetWidth;
      y.style.position = x.style.position = '';
      return { Y: -l.getBBox(y).h, mW: s, mH: A, zW: w, zH: t };
    },
    initImg: function(m) {},
    initHTML: function(n, m) {},
    initFont: function(m) {
      var o = d.FONTDATA.FONTS,
        n = d.config.availableFonts;
      if (n && n.length && d.Font.testFont(o[m])) {
        o[m].available = true;
        if (o[m].familyFixed) {
          o[m].family = o[m].familyFixed;
          delete o[m].familyFixed;
        }
        return null;
      }
      if (!this.allowWebFonts) {
        return null;
      }
      o[m].isWebFont = true;
      if (d.FontFaceBug) {
        o[m].family = m;
        if (d.msieFontCSSBug) {
          o[m].family += '-Web';
        }
      }
      return j.Styles({ '@font-face': this.Font.fontFace(m) });
    },
    Remove: function(m) {
      var n = document.getElementById(m.inputID + '-Frame');
      if (n) {
        if (m.HTMLCSS.display) {
          n = n.parentNode;
        }
        n.parentNode.removeChild(n);
      }
      delete m.HTMLCSS;
    },
    getHD: function(n, o) {
      if (n.bbox && this.config.noReflows && !o) {
        return { h: n.bbox.h, d: n.bbox.d };
      }
      var m = n.style.position;
      n.style.position = 'absolute';
      this.HDimg.style.height = '0px';
      n.appendChild(this.HDspan);
      var p = { h: n.offsetHeight };
      this.HDimg.style.height = p.h + 'px';
      p.d = n.offsetHeight - p.h;
      p.h -= p.d;
      p.h /= this.em;
      p.d /= this.em;
      n.removeChild(this.HDspan);
      n.style.position = m;
      return p;
    },
    getW: function(q) {
      var n,
        p,
        o = (q.bbox || {}).w,
        r = q;
      if (q.bbox && this.config.noReflows && q.bbox.exactW !== false) {
        if (!q.bbox.exactW) {
          if (q.style.paddingLeft) {
            o += this.unEm(q.style.paddingLeft) * (q.scale || 1);
          }
          if (q.style.paddingRight) {
            o += this.unEm(q.style.paddingRight) * (q.scale || 1);
          }
        }
        return o;
      }
      if (q.bbox && q.bbox.exactW) {
        return o;
      }
      if (
        (q.bbox &&
          o >= 0 &&
          !this.initialSkipBug &&
          !this.msieItalicWidthBug) ||
        this.negativeBBoxes ||
        !q.firstChild
      ) {
        n = q.offsetWidth;
        p = q.parentNode.offsetHeight;
      } else {
        if (q.bbox && o < 0 && this.msieNegativeBBoxBug) {
          (n = -q.offsetWidth), (p = q.parentNode.offsetHeight);
        } else {
          var m = q.style.position;
          q.style.position = 'absolute';
          r = this.startMarker;
          q.insertBefore(r, q.firstChild);
          q.appendChild(this.endMarker);
          n = this.endMarker.offsetLeft - r.offsetLeft;
          q.removeChild(this.endMarker);
          q.removeChild(r);
          q.style.position = m;
        }
      }
      if (p != null) {
        q.parentNode.HH = p / this.em;
      }
      return n / this.em;
    },
    Measured: function(o, n) {
      var p = o.bbox;
      if (p.width == null && p.w && !p.isMultiline) {
        var m = this.getW(o);
        p.rw += m - p.w;
        p.w = m;
        p.exactW = true;
      }
      if (!n) {
        n = o.parentNode;
      }
      if (!n.bbox) {
        n.bbox = p;
      }
      return o;
    },
    Remeasured: function(n, m) {
      m.bbox = this.Measured(n, m).bbox;
    },
    MeasureSpans: function(q) {
      var t = [],
        v,
        s,
        p,
        w,
        n,
        r,
        o,
        u;
      for (s = 0, p = q.length; s < p; s++) {
        v = q[s];
        if (!v) {
          continue;
        }
        w = v.bbox;
        u = this.parentNode(v);
        if (
          w.exactW ||
          w.width ||
          w.w === 0 ||
          w.isMultiline ||
          (this.config.noReflows && w.exactW !== false)
        ) {
          if (!u.bbox) {
            u.bbox = w;
          }
          continue;
        }
        if (
          this.negativeBBoxes ||
          !v.firstChild ||
          (w.w >= 0 && !this.initialSkipBug) ||
          (w.w < 0 && this.msieNegativeBBoxBug)
        ) {
          t.push([v]);
        } else {
          if (this.initialSkipBug) {
            n = this.startMarker.cloneNode(true);
            r = this.endMarker.cloneNode(true);
            v.insertBefore(n, v.firstChild);
            v.appendChild(r);
            t.push([v, n, r, v.style.position]);
            v.style.position = 'absolute';
          } else {
            r = this.endMarker.cloneNode(true);
            v.appendChild(r);
            t.push([v, null, r]);
          }
        }
      }
      for (s = 0, p = t.length; s < p; s++) {
        v = t[s][0];
        w = v.bbox;
        u = this.parentNode(v);
        if (
          (w.w >= 0 && !this.initialSkipBug) ||
          this.negativeBBoxes ||
          !v.firstChild
        ) {
          o = v.offsetWidth;
          u.HH = u.offsetHeight / this.em;
        } else {
          if (w.w < 0 && this.msieNegativeBBoxBug) {
            (o = -v.offsetWidth), (u.HH = u.offsetHeight / this.em);
          } else {
            o = t[s][2].offsetLeft - ((t[s][1] || {}).offsetLeft || 0);
          }
        }
        o /= this.em;
        w.rw += o - w.w;
        w.w = o;
        w.exactW = true;
        if (!u.bbox) {
          u.bbox = w;
        }
      }
      for (s = 0, p = t.length; s < p; s++) {
        v = t[s];
        if (v[1]) {
          v[1].parentNode.removeChild(v[1]), (v[0].style.position = v[3]);
        }
        if (v[2]) {
          v[2].parentNode.removeChild(v[2]);
        }
      }
    },
    Em: function(n) {
      if (Math.abs(n) < 0.0006) {
        return '0em';
      }
      return n.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    EmRounded: function(n) {
      if (Math.abs(n) < 0.0006) {
        return '0em';
      }
      n = (Math.round(n * d.em) + 0.05) / d.em;
      return n.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    unEm: function(n) {
      return parseFloat(n);
    },
    Px: function(n) {
      n *= this.em;
      var o = n < 0 ? '-' : '';
      return (
        o +
        Math.abs(n)
          .toFixed(1)
          .replace(/\.?0+$/, '') +
        'px'
      );
    },
    unPx: function(n) {
      return parseFloat(n) / this.em;
    },
    Percent: function(n) {
      return (100 * n).toFixed(1).replace(/\.?0+$/, '') + '%';
    },
    length2em: function(t, o, r) {
      if (typeof t !== 'string') {
        t = t.toString();
      }
      if (t === '') {
        return '';
      }
      if (t === i.SIZE.NORMAL) {
        return 1;
      }
      if (t === i.SIZE.BIG) {
        return 2;
      }
      if (t === i.SIZE.SMALL) {
        return 0.71;
      }
      if (t === 'infinity') {
        return d.BIGDIMEN;
      }
      var q = this.FONTDATA.TeX_factor,
        u = (d.zoomScale || 1) / d.em;
      if (t.match(/mathspace$/)) {
        return d.MATHSPACE[t] * q;
      }
      var p = t.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var n = parseFloat(p[1] || '1'),
        s = p[2];
      if (r == null) {
        r = 1;
      }
      if (o == null) {
        o = 1;
      }
      if (s === 'em') {
        return n * q;
      }
      if (s === 'ex') {
        return n * d.TeX.x_height * q;
      }
      if (s === '%') {
        return (n / 100) * r;
      }
      if (s === 'px') {
        return n * u;
      }
      if (s === 'pt') {
        return (n / 10) * q;
      }
      if (s === 'pc') {
        return n * 1.2 * q;
      }
      if (s === 'in') {
        return n * this.pxPerInch * u;
      }
      if (s === 'cm') {
        return (n * this.pxPerInch * u) / 2.54;
      }
      if (s === 'mm') {
        return (n * this.pxPerInch * u) / 25.4;
      }
      if (s === 'mu') {
        return (n / 18) * q * o;
      }
      return n * r;
    },
    thickness2em: function(n, m) {
      var o = d.TeX.rule_thickness;
      if (n === i.LINETHICKNESS.MEDIUM) {
        return o;
      }
      if (n === i.LINETHICKNESS.THIN) {
        return 0.67 * o;
      }
      if (n === i.LINETHICKNESS.THICK) {
        return 1.67 * o;
      }
      return this.length2em(n, m, o);
    },
    border2em: function(n, m) {
      if (n === i.LINETHICKNESS.THIN) {
        n = '1px';
      }
      if (n === i.LINETHICKNESS.MEDIUM) {
        n = '3px';
      }
      if (n === i.LINETHICKNESS.THICK) {
        n = '5px';
      }
      return this.length2em(n, m);
    },
    getPadding: function(n) {
      var p = { top: 0, right: 0, bottom: 0, left: 0 },
        m = false;
      for (var q in p) {
        if (p.hasOwnProperty(q)) {
          var o = n.style['padding' + q.charAt(0).toUpperCase() + q.substr(1)];
          if (o) {
            p[q] = this.length2em(o);
            m = true;
          }
        }
      }
      return m ? p : false;
    },
    getBorders: function(r) {
      var o = { top: 0, right: 0, bottom: 0, left: 0 },
        p = {},
        n = false;
      for (var s in o) {
        if (o.hasOwnProperty(s)) {
          var m = 'border' + s.charAt(0).toUpperCase() + s.substr(1);
          var q = r.style[m + 'Style'];
          if (q) {
            n = true;
            o[s] = this.border2em(
              r.style[m + 'Width'] || i.LINETHICKNESS.MEDIUM
            );
            p[m] = [
              r.style[m + 'Width'],
              r.style[m + 'Style'],
              r.style[m + 'Color']
            ].join(' ');
          }
        }
      }
      o.css = p;
      return n ? o : false;
    },
    setBorders: function(m, n) {
      if (n) {
        for (var o in n.css) {
          if (n.css.hasOwnProperty(o)) {
            m.style[o] = n.css[o];
          }
        }
      }
    },
    createStrut: function(o, n, p) {
      var m = this.Element('span', {
        isMathJax: true,
        style: {
          display: 'inline-block',
          overflow: 'hidden',
          height: n + 'px',
          width: '1px',
          marginRight: '-1px'
        }
      });
      if (p) {
        o.insertBefore(m, o.firstChild);
      } else {
        o.appendChild(m);
      }
      return m;
    },
    createBlank: function(n, m, o) {
      var p = this.Element('span', {
        isMathJax: true,
        style: {
          display: 'inline-block',
          overflow: 'hidden',
          height: '1px',
          width: this.Em(m)
        }
      });
      if (m < 0) {
        p.style.marginRight = p.style.width;
        p.style.width = 0;
      }
      if (o) {
        n.insertBefore(p, n.firstChild);
      } else {
        n.appendChild(p);
      }
      return p;
    },
    createShift: function(n, m, p) {
      var o = this.Element('span', {
        style: { marginLeft: this.Em(m) },
        isMathJax: true
      });
      if (p) {
        n.insertBefore(o, n.firstChild);
      } else {
        n.appendChild(o);
      }
      return o;
    },
    createSpace: function(r, p, q, s, o, u) {
      if (p < -q) {
        q = -p;
      }
      var t = this.Em(p + q),
        m = this.Em(-q);
      if (this.msieInlineBlockAlignBug) {
        m = this.Em(d.getHD(r.parentNode, true).d - q);
      }
      if (r.isBox || u) {
        var n = r.scale == null ? 1 : r.scale;
        r.bbox = {
          exactW: true,
          h: p * n,
          d: q * n,
          w: s * n,
          rw: s * n,
          lw: 0
        };
        r.style.height = t;
        r.style.verticalAlign = m;
        r.HH = (p + q) * n;
      } else {
        r = this.addElement(r, 'span', {
          style: { height: t, verticalAlign: m },
          isMathJax: true
        });
      }
      if (s >= 0) {
        r.style.width = this.Em(s);
        r.style.display = 'inline-block';
        r.style.overflow = 'hidden';
      } else {
        if (this.msieNegativeSpaceBug) {
          r.style.height = '';
        }
        r.style.marginLeft = this.Em(s);
        if (d.safariNegativeSpaceBug && r.parentNode.firstChild == r) {
          this.createBlank(r, 0, true);
        }
      }
      if (o && o !== i.COLOR.TRANSPARENT) {
        r.style.backgroundColor = o;
        r.style.position = 'relative';
      }
      return r;
    },
    createRule: function(t, p, r, u, n) {
      if (p < -r) {
        r = -p;
      }
      var o = d.TeX.min_rule_thickness,
        q = 1;
      if (u > 0 && u * this.em < o) {
        u = o / this.em;
      }
      if (p + r > 0 && (p + r) * this.em < o) {
        q = (1 / (p + r)) * (o / this.em);
        p *= q;
        r *= q;
      }
      if (!n) {
        n = 'solid';
      } else {
        n = 'solid ' + n;
      }
      var m = {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: this.Em(-r)
      };
      if (u > p + r) {
        m.borderTop = this.Px(p + r) + ' ' + n;
        m.width = this.Em(u);
        m.height = this.msieRuleBug && p + r > 0 ? this.Em(p + r) : 0;
      } else {
        m.borderLeft = this.Px(u) + ' ' + n;
        m.width = this.msieRuleBug && u > 0 ? this.Em(u) : 0;
        m.height = this.Em(p + r);
      }
      var s = this.addElement(t, 'span', {
        style: m,
        noAdjust: true,
        HH: p + r,
        isMathJax: true,
        bbox: { h: p, d: r, w: u, rw: u, lw: 0, exactW: true }
      });
      if (t.isBox || t.className == 'mspace') {
        (t.bbox = s.bbox), (t.HH = p + r);
      }
      return s;
    },
    createFrame: function(v, s, u, x, z, n) {
      if (s < -u) {
        u = -s;
      }
      var r = 2 * z;
      if (this.msieFrameSizeBug) {
        if (x < r) {
          x = r;
        }
        if (s + u < r) {
          s = r - u;
        }
      }
      if (this.msieBorderWidthBug) {
        r = 0;
      }
      var y = this.Em(s + u - r),
        m = this.Em(-u - z),
        q = this.Em(x - r);
      var o = this.Px(z) + ' ' + n;
      var p = this.addElement(v, 'span', {
        style: {
          border: o,
          display: 'inline-block',
          overflow: 'hidden',
          width: q,
          height: y
        },
        bbox: { h: s, d: u, w: x, rw: x, lw: 0, exactW: true },
        noAdjust: true,
        HH: s + u,
        isMathJax: true
      });
      if (m) {
        p.style.verticalAlign = m;
      }
      return p;
    },
    parentNode: function(n) {
      var m = n.parentNode;
      if (m.nodeName.toLowerCase() === 'a') {
        m = m.parentNode;
      }
      return m;
    },
    createStack: function(o, q, n) {
      if (this.msiePaddingWidthBug) {
        this.createStrut(o, 0);
      }
      var p = String(n).match(/%$/);
      var m = !p && n != null ? n : 0;
      o = this.addElement(o, 'span', {
        noAdjust: true,
        HH: 0,
        isMathJax: true,
        style: {
          display: 'inline-block',
          position: 'relative',
          width: p ? '100%' : this.Em(m),
          height: 0
        }
      });
      if (!q) {
        o.parentNode.bbox = o.bbox = {
          exactW: true,
          h: -this.BIGDIMEN,
          d: -this.BIGDIMEN,
          w: m,
          lw: this.BIGDIMEN,
          rw: !p && n != null ? n : -this.BIGDIMEN
        };
        if (p) {
          o.bbox.width = n;
        }
      }
      return o;
    },
    createBox: function(n, m) {
      var o = this.addElement(n, 'span', {
        style: { position: 'absolute' },
        isBox: true,
        isMathJax: true
      });
      if (m != null) {
        o.style.width = m;
      }
      return o;
    },
    addBox: function(m, n) {
      n.style.position = 'absolute';
      n.isBox = n.isMathJax = true;
      return m.appendChild(n);
    },
    placeBox: function(w, v, u, q) {
      w.isMathJax = true;
      var z = d.parentNode(w),
        F = w.bbox,
        B = z.bbox;
      if (this.msiePlaceBoxBug) {
        this.addText(w, this.NBSP);
      }
      if (this.imgSpaceBug) {
        this.addText(w, this.imgSpace);
      }
      var A,
        I = 0;
      if (w.HH != null) {
        A = w.HH;
      } else {
        if (F) {
          var o = w.firstChild;
          A = Math.max(3, 3 * (o ? o.scale || 1 : 1), F.h + F.d);
        } else {
          A = w.offsetHeight / this.em;
        }
      }
      if (!w.noAdjust) {
        A += 1;
        A = Math.round(A * this.em) / this.em;
        if (this.msieInlineBlockAlignBug) {
          this.addElement(w, 'img', {
            className: 'MathJax_strut',
            border: 0,
            src: 'about:blank',
            isMathJax: true,
            style: { width: 0, height: this.Em(A) }
          });
        } else {
          this.addElement(w, 'span', {
            isMathJax: true,
            style: { display: 'inline-block', width: 0, height: this.Em(A) }
          });
          if (d.chromeHeightBug) {
            A -= (w.lastChild.offsetHeight - Math.round(A * this.em)) / this.em;
          }
        }
      }
      if (F) {
        if (this.initialSkipBug) {
          if (F.lw < 0) {
            I = F.lw;
            d.createBlank(w, -I, true);
          }
          if (F.rw > F.w) {
            d.createBlank(w, F.rw - F.w + 0.1);
          }
        }
        if (!this.msieClipRectBug && !F.noclip && !q) {
          var E = 3 / this.em;
          var C = F.H == null ? F.h : F.H,
            n = F.D == null ? F.d : F.D;
          var G = A - C - E,
            s = A + n + E,
            p = -1000,
            m = F.rw + 1000;
          w.style.clip =
            'rect(' +
            this.Em(G) +
            ' ' +
            this.Em(m) +
            ' ' +
            this.Em(s) +
            ' ' +
            this.Em(p) +
            ')';
        }
      }
      w.style.top = this.Em(-u - A);
      w.style.left = this.Em(v + I);
      if (F && B) {
        if (F.H != null && (B.H == null || F.H + u > B.H)) {
          B.H = F.H + u;
        }
        if (F.D != null && (B.D == null || F.D - u > B.D)) {
          B.D = F.D - u;
        }
        if (F.h + u > B.h) {
          B.h = F.h + u;
        }
        if (F.d - u > B.d) {
          B.d = F.d - u;
        }
        if (B.H != null && B.H <= B.h) {
          delete B.H;
        }
        if (B.D != null && B.D <= B.d) {
          delete B.D;
        }
        if (F.w + v > B.w) {
          B.w = F.w + v;
          if (B.width == null) {
            z.style.width = this.Em(B.w);
          }
        }
        if (F.rw + v > B.rw) {
          B.rw = F.rw + v;
        }
        if (F.lw + v < B.lw) {
          B.lw = F.lw + v;
        }
        if (F.width != null && !F.isFixed) {
          if (B.width == null) {
            z.style.width = B.width = '100%';
            if (F.minWidth) {
              z.style.minWidth = B.minWidth = F.minWidth;
            }
          }
          w.style.width = F.width;
        }
        if (F.tw) {
          B.tw = F.tw;
        }
      }
    },
    alignBox: function(t, p, s, x, w) {
      if (x == null) {
        x = 0;
      }
      this.placeBox(t, x, s);
      if (this.msiePlaceBoxBug) {
        var n = t.lastChild;
        while (n && n.nodeName !== '#text') {
          n = n.previousSibling;
        }
        if (n) {
          t.removeChild(n);
        }
      }
      var v = t.bbox;
      if (v.isMultiline && !w) {
        return;
      }
      var u = v.width != null && !v.isFixed;
      var m = 0,
        q = x - v.w / 2,
        o = '50%';
      if (this.initialSkipBug) {
        m = v.w - v.rw - 0.1;
        q += v.lw;
      }
      if (this.msieMarginScaleBug) {
        q = q * this.em + 'px';
      } else {
        q = this.Em(q);
      }
      if (u) {
        q = x === 0 ? '' : this.Em(x);
        o = 50 - parseFloat(v.width) / 2 + '%';
      }
      b.Insert(
        t.style,
        {
          right: { left: '', right: this.Em(m - x) },
          center: { left: o, marginLeft: q }
        }[p]
      );
    },
    setStackWidth: function(n, m) {
      if (typeof m === 'number') {
        n.style.width = this.Em(Math.max(0, m));
        var o = n.bbox;
        if (o) {
          o.w = m;
          o.exactW = true;
        }
        o = n.parentNode.bbox;
        if (o) {
          o.w = m;
          o.exactW = true;
        }
      } else {
        n.style.width = n.parentNode.style.width = '100%';
        if (n.bbox) {
          n.bbox.width = m;
        }
        if (n.parentNode.bbox) {
          n.parentNode.bbox.width = m;
        }
      }
    },
    createDelimiter: function(w, n, p, s, q) {
      if (!n) {
        w.bbox = { h: 0, d: 0, w: this.TeX.nulldelimiterspace, lw: 0 };
        w.bbox.rw = w.bbox.w;
        this.createSpace(w, w.bbox.h, w.bbox.d, w.bbox.w);
        return;
      }
      if (!s) {
        s = 1;
      }
      if (!(p instanceof Array)) {
        p = [p, p];
      }
      var v = p[1];
      p = p[0];
      var o = { alias: n };
      while (o.alias) {
        n = o.alias;
        o = this.FONTDATA.DELIMITERS[n];
        if (!o) {
          o = { HW: [0, this.FONTDATA.VARIANT[i.VARIANT.NORMAL]] };
        }
      }
      if (o.load) {
        b.RestartAfter(j.Require(this.fontDir + '/fontdata-' + o.load + '.js'));
      }
      for (var u = 0, r = o.HW.length; u < r; u++) {
        if (o.HW[u][0] * s >= p - 0.01 || (u == r - 1 && !o.stretch)) {
          if (o.HW[u][2]) {
            s *= o.HW[u][2];
          }
          if (o.HW[u][3]) {
            n = o.HW[u][3];
          }
          var t = this.addElement(w, 'span');
          this.createChar(t, [n, o.HW[u][1]], s, q);
          w.bbox = t.bbox;
          w.offset = 0.65 * w.bbox.w;
          w.scale = s;
          return;
        }
      }
      if (o.stretch) {
        this['extendDelimiter' + o.dir](w, v, o.stretch, s, q);
      }
    },
    extendDelimiterV: function(B, u, F, G, x) {
      var p = this.createStack(B, true);
      var w = this.createBox(p),
        v = this.createBox(p);
      this.createChar(w, F.top || F.ext, G, x);
      this.createChar(v, F.bot || F.ext, G, x);
      var o = { bbox: { w: 0, lw: 0, rw: 0 } },
        E = o,
        q;
      var C = w.bbox.h + w.bbox.d + v.bbox.h + v.bbox.d;
      var s = -w.bbox.h;
      this.placeBox(w, 0, s, true);
      s -= w.bbox.d;
      if (F.mid) {
        E = this.createBox(p);
        this.createChar(E, F.mid, G, x);
        C += E.bbox.h + E.bbox.d;
      }
      if (F.min && u < C * F.min) {
        u = C * F.min;
      }
      if (u > C) {
        o = this.Element('span');
        this.createChar(o, F.ext, G, x);
        var D = o.bbox.h + o.bbox.d,
          m = D - 0.05,
          z,
          r,
          A = F.mid ? 2 : 1;
        r = z = Math.min(Math.ceil((u - C) / (A * m)), this.maxStretchyParts);
        if (!F.fullExtenders) {
          m = (u - C) / (A * z);
        }
        var t = (z / (z + 1)) * (D - m);
        m = D - t;
        s += t + m - o.bbox.h;
        while (A-- > 0) {
          while (z-- > 0) {
            if (!this.msieCloneNodeBug) {
              q = o.cloneNode(true);
            } else {
              q = this.Element('span');
              this.createChar(q, F.ext, G, x);
            }
            q.bbox = o.bbox;
            s -= m;
            this.placeBox(this.addBox(p, q), 0, s, true);
          }
          s += t - o.bbox.d;
          if (F.mid && A) {
            this.placeBox(E, 0, s - E.bbox.h, true);
            z = r;
            s += -(E.bbox.h + E.bbox.d) + t + m - o.bbox.h;
          }
        }
      } else {
        s += (C - u) / 2;
        if (F.mid) {
          this.placeBox(E, 0, s - E.bbox.h, true);
          s += -(E.bbox.h + E.bbox.d);
        }
        s += (C - u) / 2;
      }
      this.placeBox(v, 0, s - v.bbox.h, true);
      s -= v.bbox.h + v.bbox.d;
      B.bbox = {
        w: Math.max(w.bbox.w, o.bbox.w, v.bbox.w, E.bbox.w),
        lw: Math.min(w.bbox.lw, o.bbox.lw, v.bbox.lw, E.bbox.lw),
        rw: Math.max(w.bbox.rw, o.bbox.rw, v.bbox.rw, E.bbox.rw),
        h: 0,
        d: -s,
        exactW: true
      };
      B.scale = G;
      B.offset = 0.55 * B.bbox.w;
      B.isMultiChar = true;
      this.setStackWidth(p, B.bbox.w);
    },
    extendDelimiterH: function(C, p, F, H, z) {
      var s = this.createStack(C, true);
      var q = this.createBox(s),
        D = this.createBox(s);
      this.createChar(q, F.left || F.rep, H, z);
      this.createChar(D, F.right || F.rep, H, z);
      var m = this.Element('span');
      this.createChar(m, F.rep, H, z);
      var E = { bbox: { h: -this.BIGDIMEN, d: -this.BIGDIMEN } },
        o;
      this.placeBox(q, -q.bbox.lw, 0, true);
      var v = q.bbox.rw - q.bbox.lw + (D.bbox.rw - D.bbox.lw) - 0.05,
        u = q.bbox.rw - q.bbox.lw - 0.025,
        y;
      if (F.mid) {
        E = this.createBox(s);
        this.createChar(E, F.mid, H, z);
        v += E.bbox.w;
      }
      if (F.min && p < v * F.min) {
        p = v * F.min;
      }
      if (p > v) {
        var G = m.bbox.rw - m.bbox.lw,
          r = G - 0.05,
          A,
          t,
          B = F.mid ? 2 : 1;
        t = A = Math.min(Math.ceil((p - v) / (B * r)), this.maxStretchyParts);
        if (!F.fillExtenders) {
          r = (p - v) / (B * A);
        }
        y = (A / (A + 1)) * (G - r);
        r = G - y;
        u -= m.bbox.lw + y;
        while (B-- > 0) {
          while (A-- > 0) {
            if (!this.cloneNodeBug) {
              o = m.cloneNode(true);
            } else {
              o = this.Element('span');
              this.createChar(o, F.rep, H, z);
            }
            o.bbox = m.bbox;
            this.placeBox(this.addBox(s, o), u, 0, true);
            u += r;
          }
          if (F.mid && B) {
            this.placeBox(E, u, 0, true);
            u += E.bbox.w - y;
            A = t;
          }
        }
      } else {
        u -= (v - p) / 2;
        if (F.mid) {
          this.placeBox(E, u, 0, true);
          u += E.bbox.w;
        }
        u -= (v - p) / 2;
      }
      u -= D.bbox.lw;
      this.placeBox(D, u, 0, true);
      C.bbox = {
        w: u + D.bbox.rw,
        lw: 0,
        rw: u + D.bbox.rw,
        h: Math.max(q.bbox.h, m.bbox.h, D.bbox.h, E.bbox.h),
        d: Math.max(q.bbox.d, m.bbox.d, D.bbox.d, E.bbox.d),
        exactW: true
      };
      C.scale = H;
      C.isMultiChar = true;
      this.setStackWidth(s, C.bbox.w);
    },
    createChar: function(u, r, p, n) {
      u.isMathJax = true;
      var t = u,
        v = '',
        q = { fonts: [r[1]], noRemap: true };
      if (n && n === i.VARIANT.BOLD) {
        q.fonts = [r[1] + '-bold', r[1]];
      }
      if (typeof r[1] !== 'string') {
        q = r[1];
      }
      if (r[0] instanceof Array) {
        for (var s = 0, o = r[0].length; s < o; s++) {
          v += String.fromCharCode(r[0][s]);
        }
      } else {
        v = String.fromCharCode(r[0]);
      }
      if (r[4]) {
        p *= r[4];
      }
      if (p !== 1 || r[3]) {
        t = this.addElement(u, 'span', {
          style: { fontSize: this.Percent(p) },
          scale: p,
          isMathJax: true
        });
        this.handleVariant(t, q, v);
        u.bbox = t.bbox;
      } else {
        this.handleVariant(u, q, v);
      }
      if (r[2]) {
        u.style.marginLeft = this.Em(r[2]);
      }
      if (r[3]) {
        u.firstChild.style.verticalAlign = this.Em(r[3]);
        u.bbox.h += r[3];
        if (u.bbox.h < 0) {
          u.bbox.h = 0;
        }
      }
      if (r[5]) {
        u.bbox.h += r[5];
      }
      if (r[6]) {
        u.bbox.d += r[6];
      }
      if (this.AccentBug && u.bbox.w === 0) {
        t.firstChild.nodeValue += this.NBSP;
      }
    },
    positionDelimiter: function(n, m) {
      m -= n.bbox.h;
      n.bbox.d -= m;
      n.bbox.h += m;
      if (m) {
        if (
          this.safariVerticalAlignBug ||
          this.konquerorVerticalAlignBug ||
          (this.operaVerticalAlignBug && n.isMultiChar)
        ) {
          if (n.firstChild.style.display === '' && n.style.top !== '') {
            n = n.firstChild;
            m -= d.unEm(n.style.top);
          }
          n.style.position = 'relative';
          n.style.top = this.Em(-m);
        } else {
          n.style.verticalAlign = this.Em(m);
          if (d.ffVerticalAlignBug) {
            d.createRule(n.parentNode, n.bbox.h, 0, 0);
            delete n.parentNode.bbox;
          }
        }
      }
    },
    handleVariant: function(B, q, t) {
      var A = '',
        y,
        D,
        u,
        E,
        o = B,
        p = !!B.style.fontFamily;
      if (t.length === 0) {
        return;
      }
      if (!B.bbox) {
        B.bbox = {
          w: 0,
          h: -this.BIGDIMEN,
          d: -this.BIGDIMEN,
          rw: -this.BIGDIMEN,
          lw: this.BIGDIMEN
        };
      }
      if (!q) {
        q = this.FONTDATA.VARIANT[i.VARIANT.NORMAL];
      }
      E = q;
      for (var C = 0, z = t.length; C < z; C++) {
        q = E;
        y = t.charCodeAt(C);
        D = t.charAt(C);
        if (y >= 55296 && y < 56319) {
          C++;
          y = ((y - 55296) << 10) + (t.charCodeAt(C) - 56320) + 65536;
          if (this.FONTDATA.RemapPlane1) {
            var F = this.FONTDATA.RemapPlane1(y, q);
            y = F.n;
            q = F.variant;
          }
        } else {
          var v,
            s,
            w = this.FONTDATA.RANGES;
          for (v = 0, s = w.length; v < s; v++) {
            if (w[v].name === 'alpha' && q.noLowerCase) {
              continue;
            }
            var r = q['offset' + w[v].offset];
            if (r && y >= w[v].low && y <= w[v].high) {
              if (w[v].remap && w[v].remap[y]) {
                y = r + w[v].remap[y];
              } else {
                if (w[v].remapOnly) {
                  break;
                }
                y = y - w[v].low + r;
                if (w[v].add) {
                  y += w[v].add;
                }
              }
              if (q['variant' + w[v].offset]) {
                q = this.FONTDATA.VARIANT[q['variant' + w[v].offset]];
              }
              break;
            }
          }
        }
        if (q.remap && q.remap[y]) {
          y = q.remap[y];
          if (q.remap.variant) {
            q = this.FONTDATA.VARIANT[q.remap.variant];
          }
        } else {
          if (this.FONTDATA.REMAP[y] && !q.noRemap) {
            y = this.FONTDATA.REMAP[y];
          }
        }
        if (h(y)) {
          q = this.FONTDATA.VARIANT[y[1]];
          y = y[0];
        }
        if (typeof y === 'string') {
          t = y + t.substr(C + 1);
          z = t.length;
          C = -1;
          continue;
        }
        u = this.lookupChar(q, y);
        D = u[y];
        if (p || (!this.checkFont(u, o.style) && !D[5].img)) {
          if (A.length) {
            this.addText(o, A);
            A = '';
          }
          var x =
            !!o.style.fontFamily ||
            !!B.style.fontStyle ||
            !!B.style.fontWeight ||
            !u.directory ||
            p;
          p = false;
          if (o !== B) {
            x = !this.checkFont(u, B.style);
            o = B;
          }
          if (x) {
            o = this.addElement(B, 'span', { isMathJax: true, subSpan: true });
          }
          this.handleFont(o, u, o !== B);
        }
        A = this.handleChar(o, u, D, y, A);
        if (!(D[5] || {}).space) {
          if (D[0] / 1000 > B.bbox.h) {
            B.bbox.h = D[0] / 1000;
          }
          if (D[1] / 1000 > B.bbox.d) {
            B.bbox.d = D[1] / 1000;
          }
        }
        if (B.bbox.w + D[3] / 1000 < B.bbox.lw) {
          B.bbox.lw = B.bbox.w + D[3] / 1000;
        }
        if (B.bbox.w + D[4] / 1000 > B.bbox.rw) {
          B.bbox.rw = B.bbox.w + D[4] / 1000;
        }
        B.bbox.w += D[2] / 1000;
        if ((D[5] || {}).isUnknown) {
          B.bbox.exactW = false;
        }
      }
      if (A.length) {
        this.addText(o, A);
      }
      if (B.scale && B.scale !== 1) {
        B.bbox.h *= B.scale;
        B.bbox.d *= B.scale;
        B.bbox.w *= B.scale;
        B.bbox.lw *= B.scale;
        B.bbox.rw *= B.scale;
      }
      if (d.isChar(t) && u.skew && u.skew[y]) {
        B.bbox.skew = u.skew[y];
      }
    },
    checkFont: function(m, n) {
      var o = n.fontWeight || 'normal';
      if (o.match(/^\d+$/)) {
        o = parseInt(o) >= 600 ? 'bold' : 'normal';
      }
      return (
        m.family.replace(/'/g, '') === n.fontFamily.replace(/'/g, '') &&
        (((m.style || 'normal') === (n.fontStyle || 'normal') &&
          (m.weight || 'normal') === o) ||
          (this.FontFaceBug && n.fontFamily !== ''))
      );
    },
    handleFont: function(o, m, q) {
      o.style.fontFamily = m.family;
      if (!m.directory) {
        o.style.fontSize = Math.floor(d.config.scale / d.scale + 0.5) + '%';
      }
      if (!(d.FontFaceBug && m.isWebFont)) {
        var n = m.style || 'normal',
          p = m.weight || 'normal';
        if (n !== 'normal' || q) {
          o.style.fontStyle = n;
        }
        if (p !== 'normal' || q) {
          o.style.fontWeight = p;
        }
      }
    },
    handleChar: function(o, m, u, t, s) {
      var r = u[5];
      if (r.space) {
        if (s.length) {
          this.addText(o, s);
        }
        d.createShift(o, u[2] / 1000);
        return '';
      }
      if (r.img) {
        return this.handleImg(o, m, u, t, s);
      }
      if (r.isUnknown && this.FONTDATA.DELIMITERS[t]) {
        if (s.length) {
          this.addText(o, s);
        }
        var q = o.scale;
        d.createDelimiter(o, t, 0, 1, m);
        if (this.FONTDATA.DELIMITERS[t].dir === 'V') {
          o.style.verticalAlign = this.Em(o.bbox.d);
          o.bbox.h += o.bbox.d;
          o.bbox.d = 0;
        }
        o.scale = q;
        u[0] = o.bbox.h * 1000;
        u[1] = o.bbox.d * 1000;
        u[2] = o.bbox.w * 1000;
        u[3] = o.bbox.lw * 1000;
        u[4] = o.bbox.rw * 1000;
        return '';
      }
      if (r.c == null) {
        if (t <= 65535) {
          r.c = String.fromCharCode(t);
        } else {
          var p = t - 65536;
          r.c =
            String.fromCharCode((p >> 10) + 55296) +
            String.fromCharCode((p & 1023) + 56320);
        }
      }
      if (d.ffFontOptimizationBug && u[4] - u[2] > 125) {
        o.style.textRendering = 'optimizeLegibility';
      }
      if (r.rfix) {
        this.addText(o, s + r.c);
        d.createShift(o, r.rfix / 1000);
        return '';
      }
      if (u[2] || (!this.msieAccentBug && !this.combiningCharBug) || s.length) {
        return s + r.c;
      }
      if (this.combiningCharBug) {
        d.addElement(o, 'span', { style: { marginLeft: d.Em(u[3] / 1000) } }, [
          r.c
        ]);
        return '';
      }
      d.createShift(o, u[3] / 1000);
      d.createShift(o, (u[4] - u[3]) / 1000);
      this.addText(o, r.c);
      d.createShift(o, -u[4] / 1000);
      return '';
    },
    handleImg: function(o, m, r, q, p) {
      return p;
    },
    lookupChar: function(r, u) {
      var q, o;
      if (!r.FONTS) {
        var t = this.FONTDATA.FONTS;
        var s = r.fonts || this.FONTDATA.VARIANT.normal.fonts;
        if (!(s instanceof Array)) {
          s = [s];
        }
        if (r.fonts != s) {
          r.fonts = s;
        }
        r.FONTS = [];
        for (q = 0, o = s.length; q < o; q++) {
          if (t[s[q]]) {
            r.FONTS.push(t[s[q]]);
            t[s[q]].name = s[q];
          }
        }
      }
      for (q = 0, o = r.FONTS.length; q < o; q++) {
        var p = r.FONTS[q];
        if (typeof p === 'string') {
          delete r.FONTS;
          this.loadFont(p);
        }
        if (p[u]) {
          if (p[u].length === 5) {
            p[u][5] = {};
          }
          if (d.allowWebFonts && !p.available) {
            this.loadWebFont(p);
          } else {
            return p;
          }
        } else {
          this.findBlock(p, u);
        }
      }
      return this.unknownChar(r, u);
    },
    unknownChar: function(m, p) {
      var o = m.defaultFont || { family: d.config.undefinedFamily };
      if (m.bold) {
        o.weight = 'bold';
      }
      if (m.italic) {
        o.style = 'italic';
      }
      if (!o[p]) {
        o[p] = [800, 200, 500, 0, 500, { isUnknown: true }];
      }
      b.signal.Post(['HTML-CSS Jax - unknown char', p, m]);
      return o;
    },
    isChar: function(m) {
      if (m.length === 1) {
        return true;
      }
      if (m.length !== 2) {
        return false;
      }
      var o = m.charCodeAt(0);
      return o >= 55296 && o < 56319;
    },
    findBlock: function(o, s) {
      if (o.Ranges) {
        for (var r = 0, n = o.Ranges.length; r < n; r++) {
          if (s < o.Ranges[r][0]) {
            return;
          }
          if (s <= o.Ranges[r][1]) {
            var q = o.Ranges[r][2];
            for (var p = o.Ranges.length - 1; p >= 0; p--) {
              if (o.Ranges[p][2] == q) {
                o.Ranges.splice(p, 1);
              }
            }
            this.loadFont(o.directory + '/' + q + '.js');
          }
        }
      }
    },
    loadFont: function(n) {
      var m = MathJax.Callback.Queue();
      m.Push(['Require', j, this.fontDir + '/' + n]);
      if (this.imgFonts) {
        if (!MathJax.isPacked) {
          n = n.replace(/\/([^\/]*)$/, d.imgPacked + '/$1');
        }
        m.Push(['Require', j, this.webfontDir + '/png/' + n]);
      }
      b.RestartAfter(m.Push({}));
    },
    loadWebFont: function(m) {
      m.available = m.isWebFont = true;
      if (d.FontFaceBug) {
        m.family = m.name;
        if (d.msieFontCSSBug) {
          m.family += '-Web';
        }
      }
      b.RestartAfter(this.Font.loadWebFont(m));
    },
    loadWebFontError: function(n, m) {
      b.Startup.signal.Post('HTML-CSS Jax - disable web fonts');
      n.isWebFont = false;
      if (this.config.imageFont && this.config.imageFont === this.fontInUse) {
        this.imgFonts = true;
        b.Startup.signal.Post('HTML-CSS Jax - switch to image fonts');
        b.Startup.signal.Post('HTML-CSS Jax - using image fonts');
        e(
          [
            'WebFontNotAvailable',
            'Web-Fonts not available -- using image fonts instead'
          ],
          null,
          3000
        );
        j.Require(this.directory + '/imageFonts.js', m);
      } else {
        this.allowWebFonts = false;
        m();
      }
    },
    Element: MathJax.HTML.Element,
    addElement: MathJax.HTML.addElement,
    TextNode: MathJax.HTML.TextNode,
    addText: MathJax.HTML.addText,
    ucMatch: MathJax.HTML.ucMatch,
    BIGDIMEN: 10000000,
    ID: 0,
    idPostfix: '',
    GetID: function() {
      this.ID++;
      return this.ID;
    },
    MATHSPACE: {
      veryverythinmathspace: 1 / 18,
      verythinmathspace: 2 / 18,
      thinmathspace: 3 / 18,
      mediummathspace: 4 / 18,
      thickmathspace: 5 / 18,
      verythickmathspace: 6 / 18,
      veryverythickmathspace: 7 / 18,
      negativeveryverythinmathspace: -1 / 18,
      negativeverythinmathspace: -2 / 18,
      negativethinmathspace: -3 / 18,
      negativemediummathspace: -4 / 18,
      negativethickmathspace: -5 / 18,
      negativeverythickmathspace: -6 / 18,
      negativeveryverythickmathspace: -7 / 18
    },
    TeX: {
      x_height: 0.430554,
      quad: 1,
      num1: 0.676508,
      num2: 0.393732,
      num3: 0.44373,
      denom1: 0.685951,
      denom2: 0.344841,
      sup1: 0.412892,
      sup2: 0.362892,
      sup3: 0.288888,
      sub1: 0.15,
      sub2: 0.247217,
      sup_drop: 0.386108,
      sub_drop: 0.05,
      delim1: 2.39,
      delim2: 1,
      axis_height: 0.25,
      rule_thickness: 0.06,
      big_op_spacing1: 0.111111,
      big_op_spacing2: 0.166666,
      big_op_spacing3: 0.2,
      big_op_spacing4: 0.6,
      big_op_spacing5: 0.1,
      scriptspace: 0.1,
      nulldelimiterspace: 0.12,
      delimiterfactor: 901,
      delimitershortfall: 0.3,
      min_rule_thickness: 1.25
    },
    NBSP: '\u00A0',
    rfuzz: 0
  });
  MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
    i = MathJax.ElementJax.mml;
    i.mbase.Augment(
      {
        toHTML: function(q) {
          q = this.HTMLcreateSpan(q);
          if (this.type != 'mrow') {
            q = this.HTMLhandleSize(q);
          }
          for (var o = 0, n = this.data.length; o < n; o++) {
            if (this.data[o]) {
              this.data[o].toHTML(q);
            }
          }
          var u = this.HTMLcomputeBBox(q);
          var p = q.bbox.h,
            t = q.bbox.d,
            r = false,
            s;
          for (o = 0, n = u.length; o < n; o++) {
            s = u[o].HTMLspanElement().bbox;
            if (u[o].forceStretch || s.h !== p || s.d !== t) {
              u[o].HTMLstretchV(q, p, t);
              r = true;
            } else {
              if (u[o].needsBBox) {
                r = true;
              }
            }
          }
          if (r) {
            this.HTMLcomputeBBox(q, true);
          }
          if (this.HTMLlineBreaks(q)) {
            q = this.HTMLmultiline(q);
          }
          this.HTMLhandleSpace(q);
          this.HTMLhandleColor(q);
          if (this.data.length === 1 && this.data[0]) {
            s = this.data[0].HTMLspanElement().bbox;
            if (s.skew) {
              q.bbox.skew = s.skew;
            }
          }
          return q;
        },
        HTMLlineBreaks: function() {
          return false;
        },
        HTMLmultiline: function() {
          i.mbase.HTMLautoloadFile('multiline');
        },
        HTMLcomputeBBox: function(s, r, q, n) {
          if (q == null) {
            q = 0;
          }
          if (n == null) {
            n = this.data.length;
          }
          var p = (s.bbox = { exactW: true }),
            t = [];
          while (q < n) {
            var o = this.data[q];
            if (!o) {
              continue;
            }
            if (!r && o.HTMLcanStretch('Vertical')) {
              t.push(o);
              o = o.CoreMO() || o;
              t[t.length - 1].needsBBox = o !== this.data[q];
            }
            this.HTMLcombineBBoxes(o, p);
            q++;
          }
          this.HTMLcleanBBox(p);
          return t;
        },
        HTMLcombineBBoxes: function(m, n) {
          if (n.w == null) {
            this.HTMLemptyBBox(n);
          }
          var p = m.bbox ? m : m.HTMLspanElement();
          if (!p || !p.bbox) {
            return;
          }
          var o = p.bbox;
          if (o.d > n.d) {
            n.d = o.d;
          }
          if (o.h > n.h) {
            n.h = o.h;
          }
          if (o.D != null && o.D > n.D) {
            n.D = o.D;
          }
          if (o.H != null && o.H > n.H) {
            n.H = o.H;
          }
          if (p.style.paddingLeft) {
            n.w += d.unEm(p.style.paddingLeft) * (p.scale || 1);
          }
          if (n.w + o.lw < n.lw) {
            n.lw = n.w + o.lw;
          }
          if (n.w + o.rw > n.rw) {
            n.rw = n.w + o.rw;
          }
          n.w += o.w;
          if (p.style.paddingRight) {
            n.w += d.unEm(p.style.paddingRight) * (p.scale || 1);
          }
          if (o.width) {
            n.width = o.width;
            n.minWidth = o.minWidth;
          }
          if (o.tw) {
            n.tw = o.tw;
          }
          if (o.ic) {
            n.ic = o.ic;
          } else {
            delete n.ic;
          }
          if (n.exactW && !o.exactW) {
            n.exactW = o.exactW;
          }
        },
        HTMLemptyBBox: function(m) {
          m.h = m.d = m.H = m.D = m.rw = -d.BIGDIMEN;
          m.w = 0;
          m.lw = d.BIGDIMEN;
          return m;
        },
        HTMLcleanBBox: function(m) {
          if (m.h === this.BIGDIMEN) {
            m.h = m.d = m.H = m.D = m.w = m.rw = m.lw = 0;
          }
          if (m.D <= m.d) {
            delete m.D;
          }
          if (m.H <= m.h) {
            delete m.H;
          }
        },
        HTMLzeroBBox: function() {
          return { h: 0, d: 0, w: 0, lw: 0, rw: 0 };
        },
        HTMLcanStretch: function(n) {
          if (this.isEmbellished()) {
            var m = this.Core();
            if (m && m !== this) {
              return m.HTMLcanStretch(n);
            }
          }
          return false;
        },
        HTMLstretchH: function(n, m) {
          return this.HTMLspanElement();
        },
        HTMLstretchV: function(n, m, o) {
          return this.HTMLspanElement();
        },
        HTMLnotEmpty: function(m) {
          while (m) {
            if (
              (m.type !== 'mrow' && m.type !== 'texatom') ||
              m.data.length > 1
            ) {
              return true;
            }
            m = m.data[0];
          }
          return false;
        },
        HTMLmeasureChild: function(o, m) {
          if (this.data[o]) {
            d.Measured(this.data[o].toHTML(m), m);
          } else {
            m.bbox = this.HTMLzeroBBox();
          }
        },
        HTMLboxChild: function(o, m) {
          if (!this.data[o]) {
            this.SetData(o, i.mrow());
          }
          return this.data[o].toHTML(m);
        },
        HTMLcreateSpan: function(m) {
          if (this.spanID) {
            var n = this.HTMLspanElement();
            if (
              n &&
              (n.parentNode === m || (n.parentNode || {}).parentNode === m)
            ) {
              while (n.firstChild) {
                n.removeChild(n.firstChild);
              }
              n.bbox = this.HTMLzeroBBox();
              n.scale = 1;
              n.isMultChar = n.HH = null;
              n.style.cssText = '';
              return n;
            }
          }
          if (this.href) {
            m = d.addElement(m, 'a', { href: this.href, isMathJax: true });
          }
          m = d.addElement(m, 'span', {
            className: this.type,
            isMathJax: true
          });
          if (d.imgHeightBug) {
            m.style.display = 'inline-block';
          }
          if (this['class']) {
            m.className += ' ' + this['class'];
          }
          if (!this.spanID) {
            this.spanID = d.GetID();
          }
          m.id = (this.id || 'MathJax-Span-' + this.spanID) + d.idPostfix;
          m.bbox = this.HTMLzeroBBox();
          this.styles = {};
          if (this.style) {
            m.style.cssText = this.style;
            if (m.style.fontSize) {
              this.mathsize = m.style.fontSize;
              m.style.fontSize = '';
            }
            this.styles = { border: d.getBorders(m), padding: d.getPadding(m) };
            if (this.styles.border) {
              m.style.border = '';
            }
            if (this.styles.padding) {
              m.style.padding = '';
            }
          }
          if (this.href) {
            m.parentNode.bbox = m.bbox;
          }
          this.HTMLaddAttributes(m);
          return m;
        },
        HTMLaddAttributes: function(p) {
          if (this.attrNames) {
            var u = this.attrNames,
              q = i.nocopyAttributes,
              t = b.config.ignoreMMLattributes;
            var r =
              this.type === 'mstyle'
                ? i.math.prototype.defaults
                : this.defaults;
            for (var o = 0, n = u.length; o < n; o++) {
              var s = u[o];
              if (
                t[s] == false ||
                (!q[s] && !t[s] && r[s] == null && typeof p[s] === 'undefined')
              ) {
                p.setAttribute(s, this.attr[s]);
              }
            }
          }
        },
        HTMLspanElement: function() {
          if (!this.spanID) {
            return null;
          }
          return document.getElementById(
            (this.id || 'MathJax-Span-' + this.spanID) + d.idPostfix
          );
        },
        HTMLhandleVariant: function(n, m, o) {
          d.handleVariant(n, m, o);
        },
        HTMLhandleSize: function(m) {
          if (!m.scale) {
            m.scale = this.HTMLgetScale();
            if (m.scale !== 1) {
              m.style.fontSize = d.Percent(m.scale);
            }
          }
          return m;
        },
        HTMLhandleDir: function(n) {
          var m = this.Get('dir', true);
          if (m) {
            n.dir = m;
          }
          return n;
        },
        HTMLhandleColor: function(y) {
          var A = this.getValues('mathcolor', 'color');
          if (this.mathbackground) {
            A.mathbackground = this.mathbackground;
          }
          if (this.background) {
            A.background = this.background;
          }
          if (this.style && y.style.backgroundColor) {
            A.mathbackground = y.style.backgroundColor;
            y.style.backgroundColor = 'transparent';
          }
          var v = (this.styles || {}).border,
            x = (this.styles || {}).padding;
          if (A.color && !this.mathcolor) {
            A.mathcolor = A.color;
          }
          if (A.background && !this.mathbackground) {
            A.mathbackground = A.background;
          }
          if (A.mathcolor) {
            y.style.color = A.mathcolor;
          }
          if (
            (A.mathbackground && A.mathbackground !== i.COLOR.TRANSPARENT) ||
            v ||
            x
          ) {
            var C = y.bbox,
              B = C.exact ? 0 : 1 / d.em,
              w = 0,
              u = 0,
              o = y.style.paddingLeft,
              s = y.style.paddingRight;
            if (this.isToken) {
              w = C.lw;
              u = C.rw - C.w;
            }
            if (o !== '') {
              w += d.unEm(o) * (y.scale || 1);
            }
            if (s !== '') {
              u -= d.unEm(s) * (y.scale || 1);
            }
            var n = d.PaddingWidthBug || C.keepPadding || C.exactW ? 0 : u - w;
            var q = Math.max(0, d.getW(y) + n);
            var z = C.h + C.d,
              m = -C.d,
              t = 0,
              r = 0;
            if (q > 0) {
              q += 2 * B;
              w -= B;
            }
            if (z > 0) {
              z += 2 * B;
              m -= B;
            }
            u = -q - w;
            if (v) {
              u -= v.right;
              m -= v.bottom;
              t += v.left;
              r += v.right;
              C.h += v.top;
              C.d += v.bottom;
              C.w += v.left + v.right;
              C.lw -= v.left;
              C.rw += v.right;
            }
            if (x) {
              z += x.top + x.bottom;
              q += x.left + x.right;
              u -= x.right;
              m -= x.bottom;
              t += x.left;
              r += x.right;
              C.h += x.top;
              C.d += x.bottom;
              C.w += x.left + x.right;
              C.lw -= x.left;
              C.rw += x.right;
            }
            if (r) {
              y.style.paddingRight = d.Em(r);
            }
            var p = d.Element('span', {
              id: 'MathJax-Color-' + this.spanID + d.idPostfix,
              isMathJax: true,
              style: {
                display: 'inline-block',
                backgroundColor: A.mathbackground,
                width: d.Em(q),
                height: d.Em(z),
                verticalAlign: d.Em(m),
                marginLeft: d.Em(w),
                marginRight: d.Em(u)
              }
            });
            d.setBorders(p, v);
            if (C.width) {
              p.style.width = C.width;
              p.style.marginRight = '-' + C.width;
            }
            if (d.msieInlineBlockAlignBug) {
              p.style.position = 'relative';
              p.style.width = p.style.height = 0;
              p.style.verticalAlign = p.style.marginLeft = p.style.marginRight =
                '';
              p.style.border = p.style.padding = '';
              if (v && d.msieBorderWidthBug) {
                z += v.top + v.bottom;
                q += v.left + v.right;
              }
              p.style.width = d.Em(t + B);
              d.placeBox(
                d.addElement(p, 'span', {
                  noAdjust: true,
                  isMathJax: true,
                  style: {
                    display: 'inline-block',
                    position: 'absolute',
                    overflow: 'hidden',
                    background: A.mathbackground || 'transparent',
                    width: d.Em(q),
                    height: d.Em(z)
                  }
                }),
                w,
                C.h + B
              );
              d.setBorders(p.firstChild, v);
            }
            y.parentNode.insertBefore(p, y);
            if (d.msieColorPositionBug) {
              y.style.position = 'relative';
            }
            return p;
          }
          return null;
        },
        HTMLremoveColor: function() {
          var m = document.getElementById(
            'MathJax-Color-' + this.spanID + d.idPostfix
          );
          if (m) {
            m.parentNode.removeChild(m);
          }
        },
        HTMLhandleSpace: function(q) {
          if (this.hasMMLspacing()) {
            if (this.type !== 'mo') {
              return;
            }
            var o = this.getValues('scriptlevel', 'lspace', 'rspace');
            if (
              o.scriptlevel <= 0 ||
              this.hasValue('lspace') ||
              this.hasValue('rspace')
            ) {
              var n = this.HTMLgetMu(q);
              o.lspace = Math.max(0, d.length2em(o.lspace, n));
              o.rspace = Math.max(0, d.length2em(o.rspace, n));
              var m = this,
                p = this.Parent();
              while (p && p.isEmbellished() && p.Core() === m) {
                m = p;
                p = p.Parent();
                q = m.HTMLspanElement();
              }
              if (o.lspace) {
                q.style.paddingLeft = d.Em(o.lspace);
              }
              if (o.rspace) {
                q.style.paddingRight = d.Em(o.rspace);
              }
            }
          } else {
            var r = this.texSpacing();
            if (r !== '') {
              this.HTMLgetScale();
              r = (d.length2em(r, this.scale) / (q.scale || 1)) * this.mscale;
              if (q.style.paddingLeft) {
                r += d.unEm(q.style.paddingLeft);
              }
              q.style.paddingLeft = d.Em(r);
            }
          }
        },
        HTMLgetScale: function() {
          if (this.scale) {
            return this.scale * this.mscale;
          }
          var o = 1,
            m = this.getValues('scriptlevel', 'fontsize');
          m.mathsize = (this.isToken ? this : this.Parent()).Get('mathsize');
          if (this.style) {
            var n = this.HTMLspanElement();
            if (n.style.fontSize != '') {
              m.fontsize = n.style.fontSize;
            }
          }
          if (m.fontsize && !this.mathsize) {
            m.mathsize = m.fontsize;
          }
          if (m.scriptlevel !== 0) {
            if (m.scriptlevel > 2) {
              m.scriptlevel = 2;
            }
            o = Math.pow(this.Get('scriptsizemultiplier'), m.scriptlevel);
            m.scriptminsize = d.length2em(this.Get('scriptminsize'));
            if (o < m.scriptminsize) {
              o = m.scriptminsize;
            }
          }
          this.scale = o;
          this.mscale = d.length2em(m.mathsize);
          return o * this.mscale;
        },
        HTMLgetMu: function(o) {
          var m = 1,
            n = this.getValues('scriptlevel', 'scriptsizemultiplier');
          if (o.scale && o.scale !== 1) {
            m = 1 / o.scale;
          }
          if (n.scriptlevel !== 0) {
            if (n.scriptlevel > 2) {
              n.scriptlevel = 2;
            }
            m = Math.sqrt(Math.pow(n.scriptsizemultiplier, n.scriptlevel));
          }
          return m;
        },
        HTMLgetVariant: function() {
          var m = this.getValues(
            'mathvariant',
            'fontfamily',
            'fontweight',
            'fontstyle'
          );
          m.hasVariant = this.Get('mathvariant', true);
          if (!m.hasVariant) {
            m.family = m.fontfamily;
            m.weight = m.fontweight;
            m.style = m.fontstyle;
          }
          if (this.style) {
            var o = this.HTMLspanElement();
            if (!m.family && o.style.fontFamily) {
              m.family = o.style.fontFamily;
            }
            if (!m.weight && o.style.fontWeight) {
              m.weight = o.style.fontWeight;
            }
            if (!m.style && o.style.fontStyle) {
              m.style = o.style.fontStyle;
            }
          }
          if (m.weight && m.weight.match(/^\d+$/)) {
            m.weight = parseInt(m.weight) > 600 ? 'bold' : 'normal';
          }
          var n = m.mathvariant;
          if (this.variantForm) {
            n = '-' + d.fontInUse + '-variant';
          }
          if (m.family && !m.hasVariant) {
            if (!m.weight && m.mathvariant.match(/bold/)) {
              m.weight = 'bold';
            }
            if (!m.style && m.mathvariant.match(/italic/)) {
              m.style = 'italic';
            }
            return {
              FONTS: [],
              fonts: [],
              noRemap: true,
              defaultFont: {
                family: m.family,
                style: m.style,
                weight: m.weight
              }
            };
          }
          if (m.weight === 'bold') {
            n =
              {
                normal: i.VARIANT.BOLD,
                italic: i.VARIANT.BOLDITALIC,
                fraktur: i.VARIANT.BOLDFRAKTUR,
                script: i.VARIANT.BOLDSCRIPT,
                'sans-serif': i.VARIANT.BOLDSANSSERIF,
                'sans-serif-italic': i.VARIANT.SANSSERIFBOLDITALIC
              }[n] || n;
          } else {
            if (m.weight === 'normal') {
              n =
                {
                  bold: i.VARIANT.normal,
                  'bold-italic': i.VARIANT.ITALIC,
                  'bold-fraktur': i.VARIANT.FRAKTUR,
                  'bold-script': i.VARIANT.SCRIPT,
                  'bold-sans-serif': i.VARIANT.SANSSERIF,
                  'sans-serif-bold-italic': i.VARIANT.SANSSERIFITALIC
                }[n] || n;
            }
          }
          if (m.style === 'italic') {
            n =
              {
                normal: i.VARIANT.ITALIC,
                bold: i.VARIANT.BOLDITALIC,
                'sans-serif': i.VARIANT.SANSSERIFITALIC,
                'bold-sans-serif': i.VARIANT.SANSSERIFBOLDITALIC
              }[n] || n;
          } else {
            if (m.style === 'normal') {
              n =
                {
                  italic: i.VARIANT.NORMAL,
                  'bold-italic': i.VARIANT.BOLD,
                  'sans-serif-italic': i.VARIANT.SANSSERIF,
                  'sans-serif-bold-italic': i.VARIANT.BOLDSANSSERIF
                }[n] || n;
            }
          }
          if (!(n in d.FONTDATA.VARIANT)) {
            n = 'normal';
          }
          return d.FONTDATA.VARIANT[n];
        },
        HTMLdrawBBox: function(m) {
          var o = m.bbox;
          var n = d.Element(
            'span',
            {
              style: {
                'font-size': m.style.fontSize,
                display: 'inline-block',
                opacity: 0.25,
                'margin-left': d.Em(-o.w)
              }
            },
            [
              [
                'span',
                {
                  style: {
                    height: d.Em(o.h),
                    width: d.Em(o.w),
                    'background-color': 'red',
                    display: 'inline-block'
                  }
                }
              ],
              [
                'span',
                {
                  style: {
                    height: d.Em(o.d),
                    width: d.Em(o.w),
                    'margin-left': d.Em(-o.w),
                    'vertical-align': d.Em(-o.d),
                    'background-color': 'green',
                    display: 'inline-block'
                  }
                }
              ]
            ]
          );
          if (m.nextSibling) {
            m.parentNode.insertBefore(n, m.nextSibling);
          } else {
            m.parentNode.appendChild(n);
          }
        }
      },
      {
        HTMLautoload: function() {
          this.constructor.Augment({ toHTML: i.mbase.HTMLautoloadFail });
          var m = d.autoloadDir + '/' + this.type + '.js';
          b.RestartAfter(j.Require(m));
        },
        HTMLautoloadFail: function() {
          throw Error("HTML-CSS can't autoload '" + this.type + "'");
        },
        HTMLautoloadList: {},
        HTMLautoloadFile: function(m) {
          if (i.mbase.HTMLautoloadList.hasOwnProperty(m)) {
            throw Error("HTML-CSS can't autoload file '" + m + "'");
          }
          i.mbase.HTMLautoloadList[m] = true;
          var n = d.autoloadDir + '/' + m + '.js';
          b.RestartAfter(j.Require(n));
        },
        HTMLstretchH: function(n, m) {
          this.HTMLremoveColor();
          return this.toHTML(n, m);
        },
        HTMLstretchV: function(n, m, o) {
          this.HTMLremoveColor();
          return this.toHTML(n, m, o);
        }
      }
    );
    i.chars.Augment({
      toHTML: function(p, o, n, q) {
        var t = this.data.join('').replace(/[\u2061-\u2064]/g, '');
        if (n) {
          t = n(t, q);
        }
        if (o.fontInherit) {
          var s = Math.floor(d.config.scale / d.scale + 0.5) + '%';
          d.addElement(p, 'span', { style: { 'font-size': s } }, [t]);
          if (o.bold) {
            p.lastChild.style.fontWeight = 'bold';
          }
          if (o.italic) {
            p.lastChild.style.fontStyle = 'italic';
          }
          p.bbox = null;
          var r = d.getHD(p),
            m = d.getW(p);
          p.bbox = { h: r.h, d: r.d, w: m, lw: 0, rw: m, exactW: true };
        } else {
          this.HTMLhandleVariant(p, o, t);
        }
      }
    });
    i.entity.Augment({
      toHTML: function(p, o, n, q) {
        var t = this.toString().replace(/[\u2061-\u2064]/g, '');
        if (n) {
          t = n(t, q);
        }
        if (o.fontInherit) {
          var s = Math.floor(d.config.scale / d.scale + 0.5) + '%';
          d.addElement(p, 'span', { style: { 'font-size': s } }, [t]);
          if (o.bold) {
            p.lastChild.style.fontWeight = 'bold';
          }
          if (o.italic) {
            p.lastChild.style.fontStyle = 'italic';
          }
          delete p.bbox;
          var r = d.getHD(p),
            m = d.getW(p);
          p.bbox = { h: r.h, d: r.d, w: m, lw: 0, rw: m, exactW: true };
        } else {
          this.HTMLhandleVariant(p, o, t);
        }
      }
    });
    i.mi.Augment({
      toHTML: function(q) {
        q = this.HTMLhandleSize(this.HTMLcreateSpan(q));
        q.bbox = null;
        var p = this.HTMLgetVariant();
        for (var o = 0, n = this.data.length; o < n; o++) {
          if (this.data[o]) {
            this.data[o].toHTML(q, p);
          }
        }
        if (!q.bbox) {
          q.bbox = this.HTMLzeroBBox();
        }
        var s = this.data.join(''),
          r = q.bbox;
        if (r.skew && !d.isChar(s)) {
          delete r.skew;
        }
        if (r.rw > r.w && d.isChar(s) && !p.noIC) {
          r.ic = r.rw - r.w;
          d.createBlank(q, r.ic / this.mscale);
          r.w = r.rw;
        }
        this.HTMLhandleSpace(q);
        this.HTMLhandleColor(q);
        this.HTMLhandleDir(q);
        return q;
      }
    });
    i.mn.Augment({
      HTMLremapMinus: function(m) {
        return m.replace(/^-/, '\u2212');
      },
      toHTML: function(r) {
        r = this.HTMLhandleSize(this.HTMLcreateSpan(r));
        r.bbox = null;
        var q = this.HTMLgetVariant();
        var p = this.HTMLremapMinus;
        for (var o = 0, n = this.data.length; o < n; o++) {
          if (this.data[o]) {
            this.data[o].toHTML(r, q, p);
            p = null;
          }
        }
        if (!r.bbox) {
          r.bbox = this.HTMLzeroBBox();
        }
        if (!d.isChar(this.data.join(''))) {
          delete r.bbox.skew;
        }
        this.HTMLhandleSpace(r);
        this.HTMLhandleColor(r);
        this.HTMLhandleDir(r);
        return r;
      }
    });
    i.mo.Augment({
      toHTML: function(x) {
        x = this.HTMLhandleSize(this.HTMLcreateSpan(x));
        if (this.data.length == 0) {
          return x;
        } else {
          x.bbox = null;
        }
        var A = this.data.join('');
        var s = this.HTMLgetVariant();
        var z = this.getValues('largeop', 'displaystyle');
        if (z.largeop) {
          s = d.FONTDATA.VARIANT[z.displaystyle ? '-largeOp' : '-smallOp'];
        }
        var y = this.CoreParent(),
          r = y && y.isa(i.msubsup) && this !== y.data[y.base],
          o = r ? this.remapChars : null;
        if (
          d.isChar(A) &&
          y &&
          y.isa(i.munderover) &&
          d.isChar(this.CoreText(y.data[y.base]))
        ) {
          var u = y.data[y.over],
            w = y.data[y.under];
          if (u && this === u.CoreMO() && y.Get('accent')) {
            o = d.FONTDATA.REMAPACCENT;
          } else {
            if (w && this === w.CoreMO() && y.Get('accentunder')) {
              o = d.FONTDATA.REMAPACCENTUNDER;
            }
          }
        }
        if (r && A.match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
          s = d.FONTDATA.VARIANT['-' + d.fontInUse + '-variant'];
        }
        for (var t = 0, q = this.data.length; t < q; t++) {
          if (this.data[t]) {
            this.data[t].toHTML(x, s, this.remap, o);
          }
        }
        if (!x.bbox) {
          x.bbox = this.HTMLzeroBBox();
        }
        if (!d.isChar(A)) {
          delete x.bbox.skew;
        }
        if (d.AccentBug && x.bbox.w === 0 && d.isChar(A) && x.firstChild) {
          x.firstChild.nodeValue += d.NBSP;
          d.createSpace(x, 0, 0, -x.offsetWidth / d.em);
        }
        if (z.largeop) {
          var v = d.TeX.axis_height * this.scale * this.mscale;
          var n = (x.bbox.h - x.bbox.d) / 2 - v;
          if (d.safariVerticalAlignBug && x.lastChild.nodeName === 'IMG') {
            x.lastChild.style.verticalAlign = d.Em(
              d.unEm(x.lastChild.style.verticalAlign || 0) / d.em - n / x.scale
            );
          } else {
            if (d.konquerorVerticalAlignBug && x.lastChild.nodeName === 'IMG') {
              x.style.position = 'relative';
              x.lastChild.style.position = 'relative';
              x.lastChild.style.top = d.Em(n / x.scale);
            } else {
              x.style.verticalAlign = d.Em(-n / x.scale);
            }
          }
          x.bbox.h -= n;
          x.bbox.d += n;
          if (x.bbox.rw > x.bbox.w) {
            x.bbox.ic = x.bbox.rw - x.bbox.w;
            d.createBlank(x, x.bbox.ic / this.mscale);
            x.bbox.w = x.bbox.rw;
          }
        }
        this.HTMLhandleSpace(x);
        this.HTMLhandleColor(x);
        this.HTMLhandleDir(x);
        return x;
      },
      HTMLcanStretch: function(q) {
        if (!this.Get('stretchy')) {
          return false;
        }
        var r = this.data.join('');
        if (r.length > 1) {
          return false;
        }
        var o = this.CoreParent();
        if (
          o &&
          o.isa(i.munderover) &&
          d.isChar(this.CoreText(o.data[o.base]))
        ) {
          var p = o.data[o.over],
            n = o.data[o.under];
          if (p && this === p.CoreMO() && o.Get('accent')) {
            r = d.FONTDATA.REMAPACCENT[r] || r;
          } else {
            if (n && this === n.CoreMO() && o.Get('accentunder')) {
              r = d.FONTDATA.REMAPACCENTUNDER[r] || r;
            }
          }
        }
        r = d.FONTDATA.DELIMITERS[r.charCodeAt(0)];
        var m = r && r.dir === q.substr(0, 1);
        this.forceStretch =
          m && (this.Get('minsize', true) || this.Get('maxsize', true));
        return m;
      },
      HTMLstretchV: function(o, p, q) {
        this.HTMLremoveColor();
        var t = this.getValues('symmetric', 'maxsize', 'minsize');
        var r = this.HTMLspanElement(),
          u = this.HTMLgetMu(r),
          s;
        var n = this.HTMLgetScale(),
          m = d.TeX.axis_height * n;
        if (t.symmetric) {
          s = 2 * Math.max(p - m, q + m);
        } else {
          s = p + q;
        }
        t.maxsize = d.length2em(t.maxsize, u, r.bbox.h + r.bbox.d);
        t.minsize = d.length2em(t.minsize, u, r.bbox.h + r.bbox.d);
        s = Math.max(t.minsize, Math.min(t.maxsize, s));
        if (s != t.minsize) {
          s = [
            Math.max(
              (s * d.TeX.delimiterfactor) / 1000,
              s - d.TeX.delimitershortfall
            ),
            s
          ];
        }
        r = this.HTMLcreateSpan(o);
        d.createDelimiter(r, this.data.join('').charCodeAt(0), s, n);
        if (t.symmetric) {
          s = (r.bbox.h + r.bbox.d) / 2 + m;
        } else {
          s = ((r.bbox.h + r.bbox.d) * p) / (p + q);
        }
        d.positionDelimiter(r, s);
        this.HTMLhandleSpace(r);
        this.HTMLhandleColor(r);
        return r;
      },
      HTMLstretchH: function(q, m) {
        this.HTMLremoveColor();
        var o = this.getValues(
          'maxsize',
          'minsize',
          'mathvariant',
          'fontweight'
        );
        if (
          (o.fontweight === 'bold' || parseInt(o.fontweight) >= 600) &&
          !this.Get('mathvariant', true)
        ) {
          o.mathvariant = i.VARIANT.BOLD;
        }
        var p = this.HTMLspanElement(),
          n = this.HTMLgetMu(p),
          r = p.scale;
        o.maxsize = d.length2em(o.maxsize, n, p.bbox.w);
        o.minsize = d.length2em(o.minsize, n, p.bbox.w);
        m = Math.max(o.minsize, Math.min(o.maxsize, m));
        p = this.HTMLcreateSpan(q);
        d.createDelimiter(
          p,
          this.data.join('').charCodeAt(0),
          m,
          r,
          o.mathvariant
        );
        this.HTMLhandleSpace(p);
        this.HTMLhandleColor(p);
        return p;
      }
    });
    i.mtext.Augment({
      toHTML: function(q) {
        q = this.HTMLhandleSize(this.HTMLcreateSpan(q));
        var p = this.HTMLgetVariant();
        if (d.config.mtextFontInherit || this.Parent().type === 'merror') {
          var r = this.Get('mathvariant');
          if (r === 'monospace') {
            q.className += ' MJX-monospace';
          } else {
            if (r.match(/sans-serif/)) {
              q.className += ' MJX-sans-serif';
            }
          }
          p = { bold: p.bold, italic: p.italic, fontInherit: true };
        }
        for (var o = 0, n = this.data.length; o < n; o++) {
          if (this.data[o]) {
            this.data[o].toHTML(q, p);
          }
        }
        if (!q.bbox) {
          q.bbox = this.HTMLzeroBBox();
        }
        if (!d.isChar(this.data.join(''))) {
          delete q.bbox.skew;
        }
        this.HTMLhandleSpace(q);
        this.HTMLhandleColor(q);
        this.HTMLhandleDir(q);
        return q;
      }
    });
    i.merror.Augment({
      toHTML: function(n) {
        var p = MathJax.HTML.addElement(n, 'span', {
          style: { display: 'inline-block' }
        });
        n = this.SUPER(arguments).toHTML.call(this, p);
        var o = d.getHD(p),
          m = d.getW(p);
        p.bbox = { h: o.h, d: o.d, w: m, lw: 0, rw: m, exactW: true };
        p.id = n.id;
        n.id = null;
        return p;
      }
    });
    i.ms.Augment({ toHTML: i.mbase.HTMLautoload });
    i.mglyph.Augment({ toHTML: i.mbase.HTMLautoload });
    i.mspace.Augment({
      toHTML: function(q) {
        q = this.HTMLcreateSpan(q);
        var o = this.getValues('height', 'depth', 'width');
        var n = this.HTMLgetMu(q);
        this.HTMLgetScale();
        o.mathbackground = this.mathbackground;
        if (this.background && !this.mathbackground) {
          o.mathbackground = this.background;
        }
        var p = d.length2em(o.height, n) * this.mscale,
          r = d.length2em(o.depth, n) * this.mscale,
          m = d.length2em(o.width, n) * this.mscale;
        d.createSpace(q, p, r, m, o.mathbackground, true);
        return q;
      }
    });
    i.mphantom.Augment({
      toHTML: function(q, o, s) {
        q = this.HTMLcreateSpan(q);
        if (this.data[0] != null) {
          var r = this.data[0].toHTML(q);
          if (s != null) {
            d.Remeasured(this.data[0].HTMLstretchV(q, o, s), q);
          } else {
            if (o != null) {
              d.Remeasured(this.data[0].HTMLstretchH(q, o), q);
            } else {
              r = d.Measured(r, q);
            }
          }
          q.bbox = {
            w: r.bbox.w,
            h: r.bbox.h,
            d: r.bbox.d,
            lw: 0,
            rw: 0,
            exactW: true
          };
          for (var p = 0, n = q.childNodes.length; p < n; p++) {
            q.childNodes[p].style.visibility = 'hidden';
          }
        }
        this.HTMLhandleSpace(q);
        this.HTMLhandleColor(q);
        return q;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.mpadded.Augment({
      toHTML: function(u, o, m) {
        u = this.HTMLcreateSpan(u);
        if (this.data[0] != null) {
          var s = d.createStack(u, true);
          var p = d.createBox(s);
          var n = this.data[0].toHTML(p);
          if (m != null) {
            d.Remeasured(this.data[0].HTMLstretchV(p, o, m), p);
          } else {
            if (o != null) {
              d.Remeasured(this.data[0].HTMLstretchH(p, o), p);
            } else {
              d.Measured(n, p);
            }
          }
          var v = this.getValues(
              'height',
              'depth',
              'width',
              'lspace',
              'voffset'
            ),
            t = 0,
            r = 0,
            w = this.HTMLgetMu(u);
          this.HTMLgetScale();
          if (v.lspace) {
            t = this.HTMLlength2em(p, v.lspace, w);
          }
          if (v.voffset) {
            r = this.HTMLlength2em(p, v.voffset, w);
          }
          d.placeBox(p, t, r);
          t /= this.mscale;
          r /= this.mscale;
          u.bbox = {
            h: p.bbox.h,
            d: p.bbox.d,
            w: p.bbox.w,
            exactW: true,
            lw: p.bbox.lw + t,
            rw: p.bbox.rw + t,
            H: Math.max(
              p.bbox.H == null ? -d.BIGDIMEN : p.bbox.H + r,
              p.bbox.h + r
            ),
            D: Math.max(
              p.bbox.D == null ? -d.BIGDIMEN : p.bbox.D - r,
              p.bbox.d - r
            )
          };
          if (v.height !== '') {
            u.bbox.h = this.HTMLlength2em(p, v.height, w, 'h', 0);
          }
          if (v.depth !== '') {
            u.bbox.d = this.HTMLlength2em(p, v.depth, w, 'd', 0);
          }
          if (v.width !== '') {
            u.bbox.w = this.HTMLlength2em(p, v.width, w, 'w', 0);
          }
          if (u.bbox.H <= u.bbox.h) {
            delete u.bbox.H;
          }
          if (u.bbox.D <= u.bbox.d) {
            delete u.bbox.D;
          }
          var q = /^\s*(\d+(\.\d*)?|\.\d+)\s*(pt|em|ex|mu|px|pc|in|mm|cm)\s*$/;
          u.bbox.exact = !!(
            (this.data[0] && this.data[0].data.length == 0) ||
            q.exec(v.height) ||
            q.exec(v.width) ||
            q.exec(v.depth)
          );
          d.setStackWidth(s, u.bbox.w);
        }
        this.HTMLhandleSpace(u);
        this.HTMLhandleColor(u);
        return u;
      },
      HTMLlength2em: function(s, t, o, u, n) {
        if (n == null) {
          n = -d.BIGDIMEN;
        }
        var q = String(t).match(/width|height|depth/);
        var r = q ? s.bbox[q[0].charAt(0)] : u ? s.bbox[u] : 0;
        var p = d.length2em(t, o, r / this.mscale) * this.mscale;
        if (u && String(t).match(/^\s*[-+]/)) {
          return Math.max(n, s.bbox[u] + p);
        } else {
          return p;
        }
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.mrow.Augment({
      HTMLlineBreaks: function(m) {
        if (!this.parent.linebreakContainer) {
          return false;
        }
        return (
          (d.config.linebreaks.automatic && m.bbox.w > d.linebreakWidth) ||
          this.hasNewline()
        );
      },
      HTMLstretchH: function(o, m) {
        this.HTMLremoveColor();
        var n = this.HTMLspanElement();
        this.data[this.core].HTMLstretchH(n, m);
        this.HTMLcomputeBBox(n, true);
        this.HTMLhandleColor(n);
        return n;
      },
      HTMLstretchV: function(o, n, p) {
        this.HTMLremoveColor();
        var m = this.HTMLspanElement();
        this.data[this.core].HTMLstretchV(m, n, p);
        this.HTMLcomputeBBox(m, true);
        this.HTMLhandleColor(m);
        return m;
      }
    });
    i.mstyle.Augment({
      toHTML: function(n, m, o) {
        n = this.HTMLcreateSpan(n);
        if (this.data[0] != null) {
          var p = this.data[0].toHTML(n);
          if (o != null) {
            this.data[0].HTMLstretchV(n, m, o);
          } else {
            if (m != null) {
              this.data[0].HTMLstretchH(n, m);
            }
          }
          n.bbox = p.bbox;
        }
        this.HTMLhandleSpace(n);
        this.HTMLhandleColor(n);
        return n;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.mfrac.Augment({
      toHTML: function(F) {
        F = this.HTMLcreateSpan(F);
        var o = d.createStack(F);
        var w = d.createBox(o),
          s = d.createBox(o);
        d.MeasureSpans([this.HTMLboxChild(0, w), this.HTMLboxChild(1, s)]);
        var m = this.getValues(
          'displaystyle',
          'linethickness',
          'numalign',
          'denomalign',
          'bevelled'
        );
        var K = this.HTMLgetScale(),
          E = m.displaystyle;
        var J = d.TeX.axis_height * K;
        if (m.bevelled) {
          var I = E ? 0.4 : 0.15;
          var x = Math.max(w.bbox.h + w.bbox.d, s.bbox.h + s.bbox.d) + 2 * I;
          var G = d.createBox(o);
          d.createDelimiter(G, 47, x);
          d.placeBox(w, 0, (w.bbox.d - w.bbox.h) / 2 + J + I);
          d.placeBox(G, w.bbox.w - I / 2, (G.bbox.d - G.bbox.h) / 2 + J);
          d.placeBox(
            s,
            w.bbox.w + G.bbox.w - I,
            (s.bbox.d - s.bbox.h) / 2 + J - I
          );
        } else {
          var n = Math.max(w.bbox.w, s.bbox.w);
          var A = d.thickness2em(m.linethickness, this.scale) * this.mscale,
            C,
            B,
            z,
            y;
          var D = d.TeX.min_rule_thickness / this.em;
          if (E) {
            z = d.TeX.num1;
            y = d.TeX.denom1;
          } else {
            z = A === 0 ? d.TeX.num3 : d.TeX.num2;
            y = d.TeX.denom2;
          }
          z *= K;
          y *= K;
          if (A === 0) {
            C = Math.max((E ? 7 : 3) * d.TeX.rule_thickness, 2 * D);
            B = z - w.bbox.d - (s.bbox.h - y);
            if (B < C) {
              z += (C - B) / 2;
              y += (C - B) / 2;
            }
          } else {
            C = Math.max((E ? 2 : 0) * D + A, A / 2 + 1.5 * D);
            B = z - w.bbox.d - (J + A / 2);
            if (B < C) {
              z += C - B;
            }
            B = J - A / 2 - (s.bbox.h - y);
            if (B < C) {
              y += C - B;
            }
            var r = d.createBox(o);
            d.createRule(r, A, 0, n + 2 * A);
            d.placeBox(r, 0, J - A / 2);
          }
          d.alignBox(w, m.numalign, z, 0, true);
          d.alignBox(s, m.denomalign, -y, 0, true);
        }
        this.HTMLhandleSpace(F);
        this.HTMLhandleColor(F);
        return F;
      },
      HTMLcanStretch: function(m) {
        return false;
      },
      HTMLhandleSpace: function(n) {
        if (!this.texWithDelims) {
          var o = d.TeX.nulldelimiterspace * this.mscale;
          var m = n.childNodes[d.msiePaddingWidthBug ? 1 : 0].style;
          m.marginLeft = m.marginRight = d.Em(o);
          n.bbox.w += 2 * o;
          n.bbox.rw += 2 * o;
        }
        this.SUPER(arguments).HTMLhandleSpace.call(this, n);
      }
    });
    i.msqrt.Augment({
      toHTML: function(z) {
        z = this.HTMLcreateSpan(z);
        var B = d.createStack(z);
        var r = d.createBox(B),
          w = d.createBox(B),
          v = d.createBox(B);
        var u = this.HTMLgetScale();
        var C = d.TeX.rule_thickness * u,
          o,
          n,
          A,
          s;
        if (this.Get('displaystyle')) {
          o = d.TeX.x_height * u;
        } else {
          o = C;
        }
        n = Math.max(C + o / 4, (1.5 * d.TeX.min_rule_thickness) / this.em);
        var m = this.HTMLboxChild(0, r);
        A = m.bbox.h + m.bbox.d + n + C;
        d.createDelimiter(v, 8730, A, u);
        d.MeasureSpans([m, v]);
        s = m.bbox.w;
        var y = 0;
        if (v.isMultiChar || (d.AdjustSurd && d.imgFonts)) {
          v.bbox.w *= 0.95;
        }
        if (v.bbox.h + v.bbox.d > A) {
          n = (v.bbox.h + v.bbox.d - (A - C)) / 2;
        }
        var D = d.FONTDATA.DELIMITERS[d.FONTDATA.RULECHAR];
        if (!D || s < (D.HW[0] || [0])[0] * u || u < 0.75) {
          d.createRule(w, 0, C, s);
          w.bbox.h = -C;
        } else {
          d.createDelimiter(w, d.FONTDATA.RULECHAR, s, u);
        }
        A = m.bbox.h + n + C;
        n = A * d.rfuzz;
        if (v.isMultiChar) {
          n = d.rfuzz;
        }
        y = this.HTMLaddRoot(B, v, y, v.bbox.h + v.bbox.d - A, u);
        d.placeBox(v, y, A - v.bbox.h);
        d.placeBox(w, y + v.bbox.w, A - w.bbox.h + n);
        d.placeBox(r, y + v.bbox.w, 0);
        this.HTMLhandleSpace(z);
        this.HTMLhandleColor(z);
        return z;
      },
      HTMLaddRoot: function(o, n, m, q, p) {
        return m;
      }
    });
    i.mroot.Augment({
      toHTML: i.msqrt.prototype.toHTML,
      HTMLaddRoot: function(u, n, s, q, m) {
        var o = d.createBox(u);
        if (this.data[1]) {
          var r = this.data[1].toHTML(o);
          r.style.paddingRight = r.style.paddingLeft = '';
          d.Measured(r, o);
        } else {
          o.bbox = this.HTMLzeroBBox();
        }
        var p = this.HTMLrootHeight(n.bbox.h + n.bbox.d, m, o) - q;
        var t = Math.min(o.bbox.w, o.bbox.rw);
        s = Math.max(t, n.offset);
        d.placeBox(o, s - t, p);
        return s - n.offset;
      },
      HTMLrootHeight: function(o, n, m) {
        return 0.45 * (o - 0.9 * n) + 0.6 * n + Math.max(0, m.bbox.d - 0.075);
      }
    });
    i.mfenced.Augment({
      toHTML: function(q) {
        q = this.HTMLcreateSpan(q);
        if (this.data.open) {
          this.data.open.toHTML(q);
        }
        if (this.data[0] != null) {
          this.data[0].toHTML(q);
        }
        for (var o = 1, n = this.data.length; o < n; o++) {
          if (this.data[o]) {
            if (this.data['sep' + o]) {
              this.data['sep' + o].toHTML(q);
            }
            this.data[o].toHTML(q);
          }
        }
        if (this.data.close) {
          this.data.close.toHTML(q);
        }
        var s = this.HTMLcomputeBBox(q);
        var p = q.bbox.h,
          r = q.bbox.d;
        for (o = 0, n = s.length; o < n; o++) {
          s[o].HTMLstretchV(q, p, r);
        }
        if (s.length) {
          this.HTMLcomputeBBox(q, true);
        }
        this.HTMLhandleSpace(q);
        this.HTMLhandleColor(q);
        return q;
      },
      HTMLcomputeBBox: function(r, q) {
        var o = (r.bbox = {}),
          s = [];
        this.HTMLcheckStretchy(this.data.open, o, s, q);
        this.HTMLcheckStretchy(this.data[0], o, s, q);
        for (var p = 1, n = this.data.length; p < n; p++) {
          if (this.data[p]) {
            this.HTMLcheckStretchy(this.data['sep' + p], o, s, q);
            this.HTMLcheckStretchy(this.data[p], o, s, q);
          }
        }
        this.HTMLcheckStretchy(this.data.close, o, s, q);
        this.HTMLcleanBBox(o);
        return s;
      },
      HTMLcheckStretchy: function(m, n, p, o) {
        if (m) {
          if (!o && m.HTMLcanStretch('Vertical')) {
            p.push(m);
            m = m.CoreMO() || m;
          }
          this.HTMLcombineBBoxes(m, n);
        }
      }
    });
    i.menclose.Augment({ toHTML: i.mbase.HTMLautoload });
    i.maction.Augment({ toHTML: i.mbase.HTMLautoload });
    i.semantics.Augment({
      toHTML: function(n, m, o) {
        n = this.HTMLcreateSpan(n);
        if (this.data[0] != null) {
          var p = this.data[0].toHTML(n);
          if (o != null) {
            this.data[0].HTMLstretchV(n, m, o);
          } else {
            if (m != null) {
              this.data[0].HTMLstretchH(n, m);
            }
          }
          n.bbox = p.bbox;
        }
        this.HTMLhandleSpace(n);
        return n;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.munderover.Augment({
      toHTML: function(M, I, G) {
        var n = this.getValues(
          'displaystyle',
          'accent',
          'accentunder',
          'align'
        );
        var q = this.data[this.base];
        if (
          !n.displaystyle &&
          q != null &&
          (q.movablelimits || q.CoreMO().Get('movablelimits'))
        ) {
          return i.msubsup.prototype.toHTML.call(this, M);
        }
        M = this.HTMLcreateSpan(M);
        var Q = this.HTMLgetScale();
        var r = d.createStack(M);
        var s = [],
          p = [],
          O = [],
          z,
          N,
          J;
        for (N = 0, J = this.data.length; N < J; N++) {
          if (this.data[N] != null) {
            z = s[N] = d.createBox(r);
            p[N] = this.data[N].toHTML(z);
            if (N == this.base) {
              if (G != null) {
                this.data[this.base].HTMLstretchV(z, I, G);
              } else {
                if (I != null) {
                  this.data[this.base].HTMLstretchH(z, I);
                }
              }
              O[N] =
                G == null && I != null
                  ? false
                  : this.data[N].HTMLcanStretch('Horizontal');
              if (this.data[this.over] && n.accent) {
                p[N].bbox.h = Math.max(p[N].bbox.h, Q * d.TeX.x_height);
              }
            } else {
              O[N] = this.data[N].HTMLcanStretch('Horizontal');
              p[N].style.paddingLeft = p[N].style.paddingRight = '';
            }
          }
        }
        d.MeasureSpans(p);
        var o = -d.BIGDIMEN,
          L = o;
        for (N = 0, J = this.data.length; N < J; N++) {
          if (this.data[N]) {
            if (s[N].bbox.w > L) {
              L = s[N].bbox.w;
            }
            if (!O[N] && L > o) {
              o = L;
            }
          }
        }
        if (G == null && I != null) {
          o = I;
        } else {
          if (o == -d.BIGDIMEN) {
            o = L;
          }
        }
        for (N = L = 0, J = this.data.length; N < J; N++) {
          if (this.data[N]) {
            z = s[N];
            if (O[N]) {
              z.bbox = this.data[N].HTMLstretchH(z, o).bbox;
              if (N !== this.base) {
                p[N].style.paddingLeft = p[N].style.paddingRight = '';
              }
            }
            if (z.bbox.w > L) {
              L = z.bbox.w;
            }
          }
        }
        var F = d.TeX.rule_thickness * this.mscale,
          H = d.FONTDATA.TeX_factor;
        var w,
          u,
          B,
          A,
          v,
          E,
          K,
          P = 0;
        q = s[this.base] || { bbox: this.HTMLzeroBBox() };
        if (q.bbox.ic) {
          P = 1.3 * q.bbox.ic + 0.05;
        }
        for (N = 0, J = this.data.length; N < J; N++) {
          if (this.data[N] != null) {
            z = s[N];
            v = d.TeX.big_op_spacing5 * Q;
            var C = N != this.base && n[this.ACCENTS[N]];
            if (C && z.bbox.w <= 1 / d.em + 0.0001) {
              z.bbox.w = z.bbox.rw - z.bbox.lw;
              z.bbox.noclip = true;
              if (z.bbox.lw) {
                z.insertBefore(
                  d.createSpace(z.parentNode, 0, 0, -z.bbox.lw),
                  z.firstChild
                );
              }
              d.createBlank(z, 0, 0, z.bbox.rw + 0.1);
            }
            E = { left: 0, center: (L - z.bbox.w) / 2, right: L - z.bbox.w }[
              n.align
            ];
            w = E;
            u = 0;
            if (N == this.over) {
              if (C) {
                K = Math.max(F * Q * H, 2.5 / this.em);
                v = 0;
                if (q.bbox.skew) {
                  w += q.bbox.skew;
                  M.bbox.skew = q.bbox.skew;
                  if (w + z.bbox.w > L) {
                    M.bbox.skew += (L - z.bbox.w - w) / 2;
                  }
                }
              } else {
                B = d.TeX.big_op_spacing1 * Q * H;
                A = d.TeX.big_op_spacing3 * Q * H;
                K = Math.max(B, A - Math.max(0, z.bbox.d));
              }
              K = Math.max(K, 1.5 / this.em);
              w += P / 2;
              u = q.bbox.h + z.bbox.d + K;
              z.bbox.h += v;
            } else {
              if (N == this.under) {
                if (C) {
                  K = 3 * F * Q * H;
                  v = 0;
                } else {
                  B = d.TeX.big_op_spacing2 * Q * H;
                  A = d.TeX.big_op_spacing4 * Q * H;
                  K = Math.max(B, A - z.bbox.h);
                }
                K = Math.max(K, 1.5 / this.em);
                w -= P / 2;
                u = -(q.bbox.d + z.bbox.h + K);
                z.bbox.d += v;
              }
            }
            d.placeBox(z, w, u);
          }
        }
        this.HTMLhandleSpace(M);
        this.HTMLhandleColor(M);
        return M;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.msubsup.Augment({
      toHTML: function(M, K, F) {
        M = this.HTMLcreateSpan(M);
        var P = this.HTMLgetScale(),
          J = this.HTMLgetMu(M);
        var y = d.createStack(M),
          n,
          w = [];
        var x = d.createBox(y);
        if (this.data[this.base]) {
          w.push(this.data[this.base].toHTML(x));
          if (F != null) {
            this.data[this.base].HTMLstretchV(x, K, F);
          } else {
            if (K != null) {
              this.data[this.base].HTMLstretchH(x, K);
            }
          }
        } else {
          x.bbox = this.HTMLzeroBBox();
        }
        var N = d.TeX.x_height * P,
          E = d.TeX.scriptspace * P * 0.75;
        var m, z;
        if (this.HTMLnotEmpty(this.data[this.sup])) {
          m = d.createBox(y);
          w.push(this.data[this.sup].toHTML(m));
        }
        if (this.HTMLnotEmpty(this.data[this.sub])) {
          z = d.createBox(y);
          w.push(this.data[this.sub].toHTML(z));
        }
        d.MeasureSpans(w);
        if (m) {
          m.bbox.w += E;
          m.bbox.rw = Math.max(m.bbox.w, m.bbox.rw);
        }
        if (z) {
          z.bbox.w += E;
          z.bbox.rw = Math.max(z.bbox.w, z.bbox.rw);
        }
        d.placeBox(x, 0, 0);
        var o = P;
        if (m) {
          o = this.data[this.sup].HTMLgetScale();
        } else {
          if (z) {
            o = this.data[this.sub].HTMLgetScale();
          }
        }
        var H = d.TeX.sup_drop * o,
          G = d.TeX.sub_drop * o;
        var B = x.bbox.h - H,
          A = x.bbox.d + G,
          O = 0,
          I;
        if (x.bbox.ic) {
          x.bbox.w -= x.bbox.ic;
          O = 1.3 * x.bbox.ic + 0.05;
        }
        if (
          this.data[this.base] &&
          K == null &&
          F == null &&
          (this.data[this.base].type === 'mi' ||
            this.data[this.base].type === 'mo')
        ) {
          if (
            d.isChar(this.data[this.base].data.join('')) &&
            w[0].scale === 1 &&
            !this.data[this.base].Get('largeop')
          ) {
            B = A = 0;
          }
        }
        var L = this.getValues('subscriptshift', 'superscriptshift');
        L.subscriptshift =
          L.subscriptshift === '' ? 0 : d.length2em(L.subscriptshift, J);
        L.superscriptshift =
          L.superscriptshift === '' ? 0 : d.length2em(L.superscriptshift, J);
        if (!m) {
          if (z) {
            A = Math.max(
              A,
              d.TeX.sub1 * P,
              z.bbox.h - (4 / 5) * N,
              L.subscriptshift
            );
            d.placeBox(z, x.bbox.w, -A, z.bbox);
          }
        } else {
          if (!z) {
            n = this.getValues('displaystyle', 'texprimestyle');
            I =
              d.TeX[
                n.displaystyle ? 'sup1' : n.texprimestyle ? 'sup3' : 'sup2'
              ];
            B = Math.max(B, I * P, m.bbox.d + (1 / 4) * N, L.superscriptshift);
            d.placeBox(m, x.bbox.w + O, B, m.bbox);
          } else {
            A = Math.max(A, d.TeX.sub2 * P);
            var C = d.TeX.rule_thickness * P;
            if (B - m.bbox.d - (z.bbox.h - A) < 3 * C) {
              A = 3 * C - B + m.bbox.d + z.bbox.h;
              H = (4 / 5) * N - (B - m.bbox.d);
              if (H > 0) {
                B += H;
                A -= H;
              }
            }
            d.placeBox(m, x.bbox.w + O, Math.max(B, L.superscriptshift));
            d.placeBox(z, x.bbox.w, -Math.max(A, L.subscriptshift));
          }
        }
        this.HTMLhandleSpace(M);
        this.HTMLhandleColor(M);
        return M;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    i.mmultiscripts.Augment({ toHTML: i.mbase.HTMLautoload });
    i.mtable.Augment({ toHTML: i.mbase.HTMLautoload });
    i['annotation-xml'].Augment({ toHTML: i.mbase.HTMLautoload });
    i.annotation.Augment({
      toHTML: function(m) {
        return this.HTMLcreateSpan(m);
      }
    });
    i.math.Augment({
      toHTML: function(E, B, t) {
        var u,
          w,
          x,
          r,
          m = E;
        if (!t || t === d.PHASE.I) {
          var C = d.addElement(E, 'nobr', { isMathJax: true });
          E = this.HTMLcreateSpan(C);
          var n = this.Get('alttext');
          if (n && !E.getAttribute('aria-label')) {
            E.setAttribute('aria-label', n);
          }
          u = d.createStack(E);
          w = d.createBox(u);
          u.style.fontSize = C.parentNode.style.fontSize;
          C.parentNode.style.fontSize = '';
          if (this.data[0] != null) {
            i.mbase.prototype.displayAlign = b.config.displayAlign;
            i.mbase.prototype.displayIndent = b.config.displayIndent;
            if (String(b.config.displayIndent).match(/^0($|[a-z%])/i)) {
              i.mbase.prototype.displayIndent = '0';
            }
            x = this.data[0].toHTML(w);
            x.bbox.exactW = false;
          }
        } else {
          E = E.firstChild.firstChild;
          if (this.href) {
            E = E.firstChild;
          }
          u = E.firstChild;
          if (u.style.position !== 'relative') {
            u = u.nextSibling;
          }
          w = u.firstChild;
          x = w.firstChild;
        }
        r = !t || t === d.PHASE.II ? d.Measured(x, w) : x;
        if (!t || t === d.PHASE.III) {
          d.placeBox(w, 0, 0);
          var q = r.bbox.w;
          q =
            Math.abs(q) < 0.006
              ? 0
              : Math.max(0, Math.round(q * this.em) + 0.25);
          E.style.width = d.EmRounded(q / d.outerEm);
          E.style.display = 'inline-block';
          var A = 1 / d.em,
            G = d.em / d.outerEm;
          d.em /= G;
          E.bbox.h *= G;
          E.bbox.d *= G;
          E.bbox.w *= G;
          E.bbox.lw *= G;
          E.bbox.rw *= G;
          if (E.bbox.H) {
            E.bbox.H *= G;
          }
          if (E.bbox.D) {
            E.bbox.D *= G;
          }
          if (r && r.bbox.width != null) {
            E.style.minWidth = r.bbox.minWidth || E.style.width;
            E.style.width = r.bbox.width;
            w.style.width = u.style.width = '100%';
            m.className += ' MathJax_FullWidth';
          }
          var D = this.HTMLhandleColor(E);
          if (r) {
            d.createRule(E, (r.bbox.h + A) * G, (r.bbox.d + A) * G, 0);
          }
          if (
            !this.isMultiline &&
            this.Get('display') === 'block' &&
            E.bbox.width == null
          ) {
            var o = this.getValues(
              'indentalignfirst',
              'indentshiftfirst',
              'indentalign',
              'indentshift'
            );
            if (o.indentalignfirst !== i.INDENTALIGN.INDENTALIGN) {
              o.indentalign = o.indentalignfirst;
            }
            if (o.indentalign === i.INDENTALIGN.AUTO) {
              o.indentalign = this.displayAlign;
            }
            if (o.indentshiftfirst !== i.INDENTSHIFT.INDENTSHIFT) {
              o.indentshift = o.indentshiftfirst;
            }
            if (o.indentshift === 'auto') {
              o.indentshift = '0';
            }
            var F = d.length2em(o.indentshift, 1, d.scale * d.cwidth);
            if (this.displayIndent !== '0') {
              var y = d.length2em(this.displayIndent, 1, d.scale * d.cwidth);
              F += o.indentalign === i.INDENTALIGN.RIGHT ? -y : y;
            }
            m.style.textAlign = B.style.textAlign = o.indentalign;
            if (F) {
              b.Insert(
                E.style,
                {
                  left: { marginLeft: d.Em(F) },
                  right: { marginRight: d.Em(-F) },
                  center: { marginLeft: d.Em(F), marginRight: d.Em(-F) }
                }[o.indentalign]
              );
              if (D) {
                var v = parseFloat(D.style.marginLeft || '0') + F,
                  s = parseFloat(D.style.marginRight || '0') - F;
                D.style.marginLeft = d.Em(v);
                D.style.marginRight = d.Em(
                  s + (o.indentalign === 'right' ? E.bbox.w + F - E.bbox.w : 0)
                );
                if (d.msieColorBug && o.indentalign === 'right') {
                  if (parseFloat(D.style.marginLeft) > 0) {
                    var z = MathJax.HTML.addElement(D.parentNode, 'span');
                    z.style.marginLeft = d.Em(s + Math.min(0, E.bbox.w + F));
                    D.nextSibling.style.marginRight = '0em';
                  }
                  D.nextSibling.style.marginLeft = '0em';
                  D.style.marginRight = D.style.marginLeft = '0em';
                }
              }
            }
          }
        }
        return E;
      },
      HTMLspanElement: i.mbase.prototype.HTMLspanElement
    });
    i.TeXAtom.Augment({
      toHTML: function(q, o, s) {
        q = this.HTMLcreateSpan(q);
        if (this.data[0] != null) {
          if (this.texClass === i.TEXCLASS.VCENTER) {
            var m = d.createStack(q);
            var r = d.createBox(m);
            var t = this.data[0].toHTML(r);
            if (s != null) {
              d.Remeasured(this.data[0].HTMLstretchV(r, o, s), r);
            } else {
              if (o != null) {
                d.Remeasured(this.data[0].HTMLstretchH(r, o), r);
              } else {
                d.Measured(t, r);
              }
            }
            var n = d.TeX.axis_height * this.HTMLgetScale();
            d.placeBox(r, 0, n - (r.bbox.h + r.bbox.d) / 2 + r.bbox.d);
          } else {
            var p = this.data[0].toHTML(q, o, s);
            if (s != null) {
              p = this.data[0].HTMLstretchV(r, o, s);
            } else {
              if (o != null) {
                p = this.data[0].HTMLstretchH(r, o);
              }
            }
            q.bbox = p.bbox;
          }
        }
        this.HTMLhandleSpace(q);
        this.HTMLhandleColor(q);
        return q;
      },
      HTMLstretchH: i.mbase.HTMLstretchH,
      HTMLstretchV: i.mbase.HTMLstretchV
    });
    b.Register.StartupHook('onLoad', function() {
      setTimeout(MathJax.Callback(['loadComplete', d, 'jax.js']), 0);
    });
  });
  b.Register.StartupHook('End Config', function() {
    b.Browser.Select({
      MSIE: function(m) {
        var q = document.documentMode || 0;
        var p = m.versionAtLeast('7.0');
        var o = m.versionAtLeast('8.0') && q > 7;
        var n = document.compatMode === 'BackCompat';
        if (q < 9) {
          d.config.styles['.MathJax .MathJax_HitBox']['background-color'] =
            'white';
          d.config.styles['.MathJax .MathJax_HitBox'].opacity = 0;
          d.config.styles['.MathJax .MathJax_HitBox'].filter =
            'alpha(opacity=0)';
        }
        d.Augment({
          PaddingWidthBug: true,
          msieAccentBug: true,
          msieColorBug: q < 8,
          msieColorPositionBug: true,
          msieRelativeWidthBug: n,
          msieDisappearingBug: q >= 8,
          msieMarginScaleBug: q < 8,
          msiePaddingWidthBug: true,
          msieBorderWidthBug: n,
          msieFrameSizeBug: q <= 8,
          msieInlineBlockAlignBug: !o || n,
          msiePlaceBoxBug: o && !n,
          msieClipRectBug: !o,
          msieNegativeSpaceBug: n,
          msieRuleBug: q < 7,
          cloneNodeBug: o && m.version === '8.0',
          msieItalicWidthBug: true,
          initialSkipBug: q < 8,
          msieNegativeBBoxBug: q >= 8,
          msieIE6: !p,
          msieItalicWidthBug: true,
          FontFaceBug: q < 9,
          msieFontCSSBug: m.isIE9,
          allowWebFonts: q >= 9 ? 'woff' : 'eot'
        });
      },
      Firefox: function(n) {
        var o = false;
        if (n.versionAtLeast('3.5')) {
          var m = String(document.location).replace(/[^\/]*$/, '');
          if (
            document.location.protocol !== 'file:' ||
            b.config.root.match(/^https?:\/\//) ||
            (b.config.root + '/').substr(0, m.length) === m
          ) {
            o = 'otf';
          }
        }
        d.Augment({
          ffVerticalAlignBug: !n.versionAtLeast('20.0'),
          AccentBug: true,
          allowWebFonts: o,
          ffFontOptimizationBug: true
        });
      },
      Safari: function(r) {
        var p = r.versionAtLeast('3.0');
        var o = r.versionAtLeast('3.1');
        var m =
          navigator.appVersion.match(/ Safari\/\d/) &&
          navigator.appVersion.match(/ Version\/\d/) &&
          navigator.vendor.match(/Apple/);
        var n = navigator.appVersion.match(/ Android (\d+)\.(\d+)/);
        var s =
          o &&
          r.isMobile &&
          ((navigator.platform.match(/iPad|iPod|iPhone/) &&
            !r.versionAtLeast('5.0')) ||
            (n != null && (n[1] < 2 || (n[1] == 2 && n[2] < 2))));
        d.Augment({
          config: {
            styles: {
              '.MathJax img, .MathJax nobr, .MathJax a': {
                'max-width': '5000em',
                'max-height': '5000em'
              }
            }
          },
          Em: (r.webkit || 0) >= 538 ? d.EmRounded : d.Em,
          rfuzz: 0.011,
          AccentBug: true,
          AdjustSurd: true,
          negativeBBoxes: true,
          safariNegativeSpaceBug: true,
          safariVerticalAlignBug: !o,
          safariTextNodeBug: !p,
          forceReflow: true,
          FontFaceBug: true,
          combiningCharBug: parseInt(r.webkit) >= 602,
          allowWebFonts: o && !s ? 'otf' : false
        });
        if (m) {
          d.Augment({ webFontDefault: r.isMobile ? 'sans-serif' : 'serif' });
        }
        if (r.isPC) {
          d.Augment({
            adjustAvailableFonts: d.removeSTIXfonts,
            checkWebFontsTwice: true
          });
        }
        if (s) {
          var q = b.config['HTML-CSS'];
          if (q) {
            q.availableFonts = [];
            q.preferredFont = null;
          } else {
            b.config['HTML-CSS'] = { availableFonts: [], preferredFont: null };
          }
        }
      },
      Chrome: function(m) {
        d.Augment({
          Em: d.EmRounded,
          cloneNodeBug: true,
          rfuzz: -0.02,
          AccentBug: true,
          AdjustSurd: true,
          FontFaceBug: m.versionAtLeast('32.0'),
          negativeBBoxes: true,
          safariNegativeSpaceBug: true,
          safariWebFontSerif: [''],
          forceReflow: true,
          allowWebFonts: m.versionAtLeast('4.0') ? 'otf' : 'svg'
        });
      },
      Opera: function(m) {
        m.isMini = navigator.appVersion.match('Opera Mini') != null;
        d.config.styles['.MathJax .merror']['vertical-align'] = null;
        d.config.styles['.MathJax span']['z-index'] = 0;
        d.Augment({
          operaHeightBug: true,
          operaVerticalAlignBug: true,
          operaFontSizeBug: m.versionAtLeast('10.61'),
          initialSkipBug: true,
          FontFaceBug: true,
          PaddingWidthBug: true,
          allowWebFonts: m.versionAtLeast('10.0') && !m.isMini ? 'otf' : false,
          adjustAvailableFonts: d.removeSTIXfonts
        });
      },
      Konqueror: function(m) {
        d.Augment({ konquerorVerticalAlignBug: true });
      }
    });
  });
  MathJax.Hub.Register.StartupHook('End Cookie', function() {
    if (b.config.menuSettings.zoom !== 'None') {
      j.Require('[MathJax]/extensions/MathZoom.js');
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.OutputJax['HTML-CSS']);