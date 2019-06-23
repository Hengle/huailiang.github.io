
MathJax.Ajax.Preloading(
  '[MathJax]/jax/input/TeX/config.js',
  '[MathJax]/jax/output/CommonHTML/config.js',
  '[MathJax]/jax/output/PreviewHTML/config.js',
  '[MathJax]/extensions/tex2jax.js',
  '[MathJax]/extensions/MathEvents.js',
  '[MathJax]/extensions/MathZoom.js',
  '[MathJax]/extensions/MathMenu.js',
  '[MathJax]/jax/element/mml/jax.js',
  '[MathJax]/extensions/toMathML.js',
  '[MathJax]/extensions/TeX/noErrors.js',
  '[MathJax]/extensions/TeX/noUndefined.js',
  '[MathJax]/jax/input/TeX/jax.js',
  '[MathJax]/extensions/TeX/AMSmath.js',
  '[MathJax]/extensions/TeX/AMSsymbols.js',
  '[MathJax]/jax/output/CommonHTML/jax.js',
  '[MathJax]/jax/output/CommonHTML/autoload/mtable.js',
  '[MathJax]/jax/output/PreviewHTML/jax.js',
  '[MathJax]/extensions/fast-preview.js',
  '[MathJax]/extensions/AssistiveMML.js',
  '[MathJax]/extensions/a11y/accessibility-menu.js'
);

MathJax.Hub.Config({
  extensions: ['[a11y]/accessibility-menu.js']
});

MathJax.InputJax.TeX = MathJax.InputJax({
  id: 'TeX',
  version: '2.7.5',
  directory: MathJax.InputJax.directory + '/TeX',
  extensionDir: MathJax.InputJax.extensionDir + '/TeX',
  config: {
    TagSide: 'right',
    TagIndent: '0.8em',
    MultLineWidth: '85%',
    equationNumbers: {
      autoNumber: 'none',
      formatNumber: function(a) {
        return a;
      },
      formatTag: function(a) {
        return '(' + a + ')';
      },
      formatID: function(a) {
        return 'mjx-eqn-' + String(a).replace(/\s/g, '_');
      },
      formatURL: function(b, a) {
        return a + '#' + encodeURIComponent(b);
      },
      useLabelIds: true
    }
  },
  resetEquationNumbers: function() {}
});
MathJax.InputJax.TeX.Register('math/tex');
MathJax.InputJax.TeX.loadComplete('config.js');
MathJax.OutputJax.CommonHTML = MathJax.OutputJax({
  id: 'CommonHTML',
  version: '2.7.5',
  directory: MathJax.OutputJax.directory + '/CommonHTML',
  extensionDir: MathJax.OutputJax.extensionDir + '/CommonHTML',
  autoloadDir: MathJax.OutputJax.directory + '/CommonHTML/autoload',
  fontDir: MathJax.OutputJax.directory + '/CommonHTML/fonts',
  webfontDir: MathJax.OutputJax.fontDir + '/HTML-CSS',
  config: {
    matchFontHeight: true,
    scale: 100,
    minScaleAdjust: 50,
    mtextFontInherit: false,
    undefinedFamily: "STIXGeneral,'Cambria Math','Arial Unicode MS',serif",
    EqnChunk: MathJax.Hub.Browser.isMobile ? 20 : 100,
    EqnChunkFactor: 1.5,
    EqnChunkDelay: 100,
    linebreaks: { automatic: false, width: 'container' }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.CommonHTML.Register('jax/mml');
}
MathJax.OutputJax.CommonHTML.loadComplete('config.js');
MathJax.OutputJax.PreviewHTML = MathJax.OutputJax({
  id: 'PreviewHTML',
  version: '2.7.5',
  directory: MathJax.OutputJax.directory + '/PreviewHTML',
  extensionDir: MathJax.OutputJax.extensionDir + '/PreviewHTML',
  noFastPreview: true,
  config: {
    scale: 100,
    minScaleAdjust: 50,
    mtextFontInherit: false,
    linebreaks: { automatic: false, width: 'container' }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.PreviewHTML.Register('jax/mml');
}
MathJax.OutputJax.PreviewHTML.loadComplete('config.js');
MathJax.Extension.tex2jax = {
  version: '2.7.5',
  config: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    skipTags: [
      'script',
      'noscript',
      'style',
      'textarea',
      'pre',
      'code',
      'annotation',
      'annotation-xml'
    ],
    ignoreClass: 'tex2jax_ignore',
    processClass: 'tex2jax_process',
    processEscapes: false,
    processEnvironments: true,
    processRefs: true,
    preview: 'TeX'
  },
  ignoreTags: {
    br: MathJax.Hub.Browser.isMSIE && document.documentMode < 9 ? '\n' : ' ',
    wbr: '',
    '#comment': ''
  },
  PreProcess: function(a) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig('tex2jax', this.config);
      if (this.config.Augment) {
        MathJax.Hub.Insert(this, this.config.Augment);
      }
      if (
        typeof this.config.previewTeX !== 'undefined' &&
        !this.config.previewTeX
      ) {
        this.config.preview = 'none';
      }
      this.configured = true;
    }
    if (typeof a === 'string') {
      a = document.getElementById(a);
    }
    if (!a) {
      a = document.body;
    }
    if (this.createPatterns()) {
      this.scanElement(a, a.nextSibling);
    }
  },
  createPatterns: function() {
    var d = [],
      e = [],
      c,
      a,
      b = this.config;
    this.match = {};
    for (c = 0, a = b.inlineMath.length; c < a; c++) {
      d.push(this.patternQuote(b.inlineMath[c][0]));
      this.match[b.inlineMath[c][0]] = {
        mode: '',
        end: b.inlineMath[c][1],
        pattern: this.endPattern(b.inlineMath[c][1])
      };
    }
    for (c = 0, a = b.displayMath.length; c < a; c++) {
      d.push(this.patternQuote(b.displayMath[c][0]));
      this.match[b.displayMath[c][0]] = {
        mode: '; mode=display',
        end: b.displayMath[c][1],
        pattern: this.endPattern(b.displayMath[c][1])
      };
    }
    if (d.length) {
      e.push(d.sort(this.sortLength).join('|'));
    }
    if (b.processEnvironments) {
      e.push('\\\\begin\\{([^}]*)\\}');
    }
    if (b.processEscapes) {
      e.push('\\\\*\\\\\\$');
    }
    if (b.processRefs) {
      e.push('\\\\(eq)?ref\\{[^}]*\\}');
    }
    this.start = new RegExp(e.join('|'), 'g');
    this.skipTags = new RegExp('^(' + b.skipTags.join('|') + ')$', 'i');
    var f = [];
    if (MathJax.Hub.config.preRemoveClass) {
      f.push(MathJax.Hub.config.preRemoveClass);
    }
    if (b.ignoreClass) {
      f.push(b.ignoreClass);
    }
    this.ignoreClass = f.length
      ? new RegExp('(^| )(' + f.join('|') + ')( |$)')
      : /^$/;
    this.processClass = new RegExp('(^| )(' + b.processClass + ')( |$)');
    return e.length > 0;
  },
  patternQuote: function(a) {
    return a.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1');
  },
  endPattern: function(a) {
    return new RegExp(this.patternQuote(a) + '|\\\\.|[{}]', 'g');
  },
  sortLength: function(d, c) {
    if (d.length !== c.length) {
      return c.length - d.length;
    }
    return d == c ? 0 : d < c ? -1 : 1;
  },
  scanElement: function(c, b, g) {
    var a, e, d, f;
    while (c && c != b) {
      if (c.nodeName.toLowerCase() === '#text') {
        if (!g) {
          c = this.scanText(c);
        }
      } else {
        a = typeof c.className === 'undefined' ? '' : c.className;
        e = typeof c.tagName === 'undefined' ? '' : c.tagName;
        if (typeof a !== 'string') {
          a = String(a);
        }
        f = this.processClass.exec(a);
        if (
          c.firstChild &&
          !a.match(/(^| )MathJax/) &&
          (f || !this.skipTags.exec(e))
        ) {
          d = (g || this.ignoreClass.exec(a)) && !f;
          this.scanElement(c.firstChild, b, d);
        }
      }
      if (c) {
        c = c.nextSibling;
      }
    }
  },
  scanText: function(c) {
    if (c.nodeValue.replace(/\s+/, '') == '') {
      return c;
    }
    var b,
      d,
      e = 0,
      a;
    this.search = { start: true };
    this.pattern = this.start;
    while (c) {
      a = null;
      this.pattern.lastIndex = e;
      e = 0;
      while (
        c &&
        c.nodeName.toLowerCase() === '#text' &&
        (b = this.pattern.exec(c.nodeValue))
      ) {
        if (this.search.start) {
          c = this.startMatch(b, c);
        } else {
          c = this.endMatch(b, c);
        }
      }
      if (this.search.matched) {
        c = this.encloseMath(c);
      } else {
        if (!this.search.start) {
          a = this.search;
        }
      }
      if (c) {
        do {
          d = c;
          c = c.nextSibling;
        } while (c && this.ignoreTags[c.nodeName.toLowerCase()] != null);
        if (!c || c.nodeName !== '#text') {
          if (!a) {
            return this.search.close ? this.prevEndMatch() : d;
          }
          c = a.open;
          e = a.opos + a.olen + (a.blen || 0);
          this.search = { start: true };
          this.pattern = this.start;
        }
      }
    }
    return c;
  },
  startMatch: function(a, b) {
    var f = this.match[a[0]];
    if (f != null) {
      this.search = {
        end: f.end,
        mode: f.mode,
        pcount: 0,
        open: b,
        olen: a[0].length,
        opos: this.pattern.lastIndex - a[0].length
      };
      this.switchPattern(f.pattern);
    } else {
      if (a[0].substr(0, 6) === '\\begin') {
        this.search = {
          end: '\\end{' + a[1] + '}',
          mode: '; mode=display',
          pcount: 0,
          open: b,
          olen: 0,
          opos: this.pattern.lastIndex - a[0].length,
          blen: a[1].length + 3,
          isBeginEnd: true
        };
        this.switchPattern(this.endPattern(this.search.end));
      } else {
        if (a[0].substr(0, 4) === '\\ref' || a[0].substr(0, 6) === '\\eqref') {
          this.search = {
            mode: '',
            end: '',
            open: b,
            pcount: 0,
            olen: 0,
            opos: this.pattern.lastIndex - a[0].length
          };
          return this.endMatch([''], b);
        } else {
          var d = a[0].substr(0, a[0].length - 1),
            g,
            c;
          if (d.length % 2 === 0) {
            c = [d.replace(/\\\\/g, '\\')];
            g = 1;
          } else {
            c = [d.substr(1).replace(/\\\\/g, '\\'), '$'];
            g = 0;
          }
          c = MathJax.HTML.Element('span', null, c);
          var e = MathJax.HTML.TextNode(b.nodeValue.substr(0, a.index));
          b.nodeValue = b.nodeValue.substr(a.index + a[0].length - g);
          b.parentNode.insertBefore(c, b);
          b.parentNode.insertBefore(e, c);
          this.pattern.lastIndex = g;
        }
      }
    }
    return b;
  },
  endMatch: function(a, c) {
    var b = this.search;
    if (a[0] == b.end) {
      if (!b.close || b.pcount === 0) {
        b.close = c;
        b.cpos = this.pattern.lastIndex;
        b.clen = b.isBeginEnd ? 0 : a[0].length;
      }
      if (b.pcount === 0) {
        b.matched = true;
        c = this.encloseMath(c);
        this.switchPattern(this.start);
      }
    } else {
      if (a[0] === '{') {
        b.pcount++;
      } else {
        if (a[0] === '}' && b.pcount) {
          b.pcount--;
        }
      }
    }
    return c;
  },
  prevEndMatch: function() {
    this.search.matched = true;
    var a = this.encloseMath(this.search.close);
    this.switchPattern(this.start);
    return a;
  },
  switchPattern: function(a) {
    a.lastIndex = this.pattern.lastIndex;
    this.pattern = a;
    this.search.start = a === this.start;
  },
  encloseMath: function(b) {
    var a = this.search,
      g = a.close,
      f,
      d,
      c;
    if (a.cpos === g.length) {
      g = g.nextSibling;
    } else {
      g = g.splitText(a.cpos);
    }
    if (!g) {
      f = g = MathJax.HTML.addText(a.close.parentNode, '');
    }
    a.close = g;
    d = a.opos ? a.open.splitText(a.opos) : a.open;
    while ((c = d.nextSibling) && c !== g) {
      if (c.nodeValue !== null) {
        if (c.nodeName === '#comment') {
          d.nodeValue += c.nodeValue.replace(
            /^\[CDATA\[((.|\n|\r)*)\]\]$/,
            '$1'
          );
        } else {
          d.nodeValue += c.nodeValue;
        }
      } else {
        var h = this.ignoreTags[c.nodeName.toLowerCase()];
        d.nodeValue += h == null ? ' ' : h;
      }
      d.parentNode.removeChild(c);
    }
    var e = d.nodeValue.substr(a.olen, d.nodeValue.length - a.olen - a.clen);
    d.parentNode.removeChild(d);
    if (this.config.preview !== 'none') {
      this.createPreview(a.mode, e);
    }
    d = this.createMathTag(a.mode, e);
    this.search = {};
    this.pattern.lastIndex = 0;
    if (f) {
      f.parentNode.removeChild(f);
    }
    return d;
  },
  insertNode: function(b) {
    var a = this.search;
    a.close.parentNode.insertBefore(b, a.close);
  },
  createPreview: function(d, a) {
    var b = MathJax.Hub.config.preRemoveClass;
    var c = this.config.preview;
    if (c === 'none') {
      return;
    }
    if ((this.search.close.previousSibling || {}).className === b) {
      return;
    }
    if (c === 'TeX') {
      c = [this.filterPreview(a)];
    }
    if (c) {
      c = MathJax.HTML.Element('span', { className: b }, c);
      this.insertNode(c);
    }
  },
  createMathTag: function(c, b) {
    var a = document.createElement('script');
    a.type = 'math/tex' + c;
    MathJax.HTML.setScript(a, b);
    this.insertNode(a);
    return a;
  },
  filterPreview: function(a) {
    return a;
  }
};
MathJax.Hub.Register.PreProcessor(['PreProcess', MathJax.Extension.tex2jax]);
MathJax.Ajax.loadComplete('[MathJax]/extensions/tex2jax.js');
(function(d, h, l, g, m, b, j) {
  var p = '2.7.5';
  var i = MathJax.Extension;
  var c = (i.MathEvents = { version: p });
  var k = d.config.menuSettings;
  var o = {
    hover: 500,
    frame: {
      x: 3.5,
      y: 5,
      bwidth: 1,
      bcolor: '#A6D',
      hwidth: '15px',
      hcolor: '#83A'
    },
    button: { x: -6, y: -3, wx: -2 },
    fadeinInc: 0.2,
    fadeoutInc: 0.05,
    fadeDelay: 50,
    fadeoutStart: 400,
    fadeoutDelay: 15 * 1000,
    styles: {
      '.MathJax_Hover_Frame': {
        'border-radius': '.25em',
        '-webkit-border-radius': '.25em',
        '-moz-border-radius': '.25em',
        '-khtml-border-radius': '.25em',
        'box-shadow': '0px 0px 15px #83A',
        '-webkit-box-shadow': '0px 0px 15px #83A',
        '-moz-box-shadow': '0px 0px 15px #83A',
        '-khtml-box-shadow': '0px 0px 15px #83A',
        border: '1px solid #A6D ! important',
        display: 'inline-block',
        position: 'absolute'
      },
      '.MathJax_Menu_Button .MathJax_Hover_Arrow': {
        position: 'absolute',
        cursor: 'pointer',
        display: 'inline-block',
        border: '2px solid #AAA',
        'border-radius': '4px',
        '-webkit-border-radius': '4px',
        '-moz-border-radius': '4px',
        '-khtml-border-radius': '4px',
        'font-family': "'Courier New',Courier",
        'font-size': '9px',
        color: '#F0F0F0'
      },
      '.MathJax_Menu_Button .MathJax_Hover_Arrow span': {
        display: 'block',
        'background-color': '#AAA',
        border: '1px solid',
        'border-radius': '3px',
        'line-height': 0,
        padding: '4px'
      },
      '.MathJax_Hover_Arrow:hover': {
        color: 'white!important',
        border: '2px solid #CCC!important'
      },
      '.MathJax_Hover_Arrow:hover span': {
        'background-color': '#CCC!important'
      }
    }
  };
  var n = (c.Event = {
    LEFTBUTTON: 0,
    RIGHTBUTTON: 2,
    MENUKEY: 'altKey',
    KEY: {
      RETURN: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    Mousedown: function(q) {
      return n.Handler(q, 'Mousedown', this);
    },
    Mouseup: function(q) {
      return n.Handler(q, 'Mouseup', this);
    },
    Mousemove: function(q) {
      return n.Handler(q, 'Mousemove', this);
    },
    Mouseover: function(q) {
      return n.Handler(q, 'Mouseover', this);
    },
    Mouseout: function(q) {
      return n.Handler(q, 'Mouseout', this);
    },
    Click: function(q) {
      return n.Handler(q, 'Click', this);
    },
    DblClick: function(q) {
      return n.Handler(q, 'DblClick', this);
    },
    Menu: function(q) {
      return n.Handler(q, 'ContextMenu', this);
    },
    Handler: function(t, r, s) {
      if (l.loadingMathMenu) {
        return n.False(t);
      }
      var q = b[s.jaxID];
      if (!t) {
        t = window.event;
      }
      t.isContextMenu = r === 'ContextMenu';
      if (q[r]) {
        return q[r](t, s);
      }
      if (i.MathZoom) {
        return i.MathZoom.HandleEvent(t, r, s);
      }
    },
    False: function(q) {
      if (!q) {
        q = window.event;
      }
      if (q) {
        if (q.preventDefault) {
          q.preventDefault();
        } else {
          q.returnValue = false;
        }
        if (q.stopPropagation) {
          q.stopPropagation();
        }
        q.cancelBubble = true;
      }
      return false;
    },
    Keydown: function(r, q) {
      if (!r) {
        r = window.event;
      }
      if (r.keyCode === n.KEY.SPACE) {
        n.ContextMenu(r, this);
      }
    },
    ContextMenu: function(t, E, w) {
      var B = b[E.jaxID],
        v = B.getJaxFromMath(E);
      var F = (B.config.showMathMenu != null ? B : d).config.showMathMenu;
      if (!F || (k.context !== 'MathJax' && !w)) {
        return;
      }
      if (c.msieEventBug) {
        t = window.event || t;
      }
      n.ClearSelection();
      f.ClearHoverTimer();
      if (v.hover) {
        if (v.hover.remove) {
          clearTimeout(v.hover.remove);
          delete v.hover.remove;
        }
        v.hover.nofade = true;
      }
      var u = MathJax.Menu;
      var G, D;
      if (u) {
        if (u.loadingDomain) {
          return n.False(t);
        }
        G = m.loadDomain('MathMenu');
        if (!G) {
          u.jax = v;
          var r = u.menu.Find('Show Math As').submenu;
          r.items[0].name = v.sourceMenuTitle;
          r.items[0].format = v.sourceMenuFormat || 'MathML';
          r.items[1].name = j[v.inputJax].sourceMenuTitle;
          r.items[5].disabled = !j[v.inputJax].annotationEncoding;
          var A = r.items[2];
          A.disabled = true;
          var q = A.submenu.items;
          annotationList = MathJax.Hub.Config.semanticsAnnotations;
          for (var z = 0, y = q.length; z < y; z++) {
            var s = q[z].name[1];
            if (v.root && v.root.getAnnotation(s) !== null) {
              A.disabled = false;
              q[z].hidden = false;
            } else {
              q[z].hidden = true;
            }
          }
          var x = u.menu.Find('Math Settings', 'MathPlayer');
          x.hidden = !(v.outputJax === 'NativeMML' && d.Browser.hasMathPlayer);
          return u.menu.Post(t);
        }
        u.loadingDomain = true;
        D = function() {
          delete u.loadingDomain;
        };
      } else {
        if (l.loadingMathMenu) {
          return n.False(t);
        }
        l.loadingMathMenu = true;
        G = l.Require('[MathJax]/extensions/MathMenu.js');
        D = function() {
          delete l.loadingMathMenu;
          if (!MathJax.Menu) {
            MathJax.Menu = {};
          }
        };
      }
      var C = {
        pageX: t.pageX,
        pageY: t.pageY,
        clientX: t.clientX,
        clientY: t.clientY
      };
      g.Queue(G, D, ['ContextMenu', n, C, E, w]);
      return n.False(t);
    },
    AltContextMenu: function(s, r) {
      var t = b[r.jaxID];
      var q = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      if (q) {
        q = (t.config.showMathMenuMSIE != null ? t : d).config.showMathMenuMSIE;
        if (k.context === 'MathJax' && !k.mpContext && q) {
          if (!c.noContextMenuBug || s.button !== n.RIGHTBUTTON) {
            return;
          }
        } else {
          if (!s[n.MENUKEY] || s.button !== n.LEFTBUTTON) {
            return;
          }
        }
        return t.ContextMenu(s, r, true);
      }
    },
    ClearSelection: function() {
      if (c.safariContextMenuBug) {
        setTimeout('window.getSelection().empty()', 0);
      }
      if (document.selection) {
        setTimeout('document.selection.empty()', 0);
      }
    },
    getBBox: function(s) {
      s.appendChild(c.topImg);
      var r = c.topImg.offsetTop,
        t = s.offsetHeight - r,
        q = s.offsetWidth;
      s.removeChild(c.topImg);
      return { w: q, h: r, d: t };
    }
  });
  var f = (c.Hover = {
    Mouseover: function(s, r) {
      if (k.discoverable || k.zoom === 'Hover') {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.ReHover(q);
          } else {
            f.HoverTimer(q, r);
          }
          return n.False(s);
        }
      }
    },
    Mouseout: function(s, r) {
      if (k.discoverable || k.zoom === 'Hover') {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.UnHover(q);
          } else {
            f.ClearHoverTimer();
          }
          return n.False(s);
        }
      }
    },
    Mousemove: function(s, r) {
      if (k.discoverable || k.zoom === 'Hover') {
        var q = this.getJaxFromMath(r);
        if (q.hover) {
          return;
        }
        if (f.lastX == s.clientX && f.lastY == s.clientY) {
          return;
        }
        f.lastX = s.clientX;
        f.lastY = s.clientY;
        f.HoverTimer(q, r);
        return n.False(s);
      }
    },
    HoverTimer: function(q, r) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(g(['Hover', this, q, r]), o.hover);
    },
    ClearHoverTimer: function() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        delete this.hoverTimer;
      }
    },
    Hover: function(q, u) {
      if (i.MathZoom && i.MathZoom.Hover({}, u)) {
        return;
      }
      var t = b[q.outputJax],
        v = t.getHoverSpan(q, u),
        y = t.getHoverBBox(q, v, u),
        w = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      var A = o.frame.x,
        z = o.frame.y,
        x = o.frame.bwidth;
      if (c.msieBorderWidthBug) {
        x = 0;
      }
      q.hover = { opacity: 0, id: q.inputID + '-Hover' };
      var r = h.Element(
        'span',
        {
          id: q.hover.id,
          isMathJax: true,
          style: {
            display: 'inline-block',
            width: 0,
            height: 0,
            position: 'relative'
          }
        },
        [
          [
            'span',
            {
              className: 'MathJax_Hover_Frame',
              isMathJax: true,
              style: {
                display: 'inline-block',
                position: 'absolute',
                top: this.Px(-y.h - z - x - (y.y || 0)),
                left: this.Px(-A - x + (y.x || 0)),
                width: this.Px(y.w + 2 * A),
                height: this.Px(y.h + y.d + 2 * z),
                opacity: 0,
                filter: 'alpha(opacity=0)'
              }
            }
          ]
        ]
      );
      var s = h.Element(
        'span',
        {
          isMathJax: true,
          id: q.hover.id + 'Menu',
          className: 'MathJax_Menu_Button',
          style: {
            display: 'inline-block',
            'z-index': 1,
            width: 0,
            height: 0,
            position: 'relative'
          }
        },
        [
          [
            'span',
            {
              className: 'MathJax_Hover_Arrow',
              isMathJax: true,
              math: u,
              onclick: this.HoverMenu,
              jax: t.id,
              style: {
                left: this.Px(y.w + A + x + (y.x || 0) + o.button.x),
                top: this.Px(-y.h - z - x - (y.y || 0) - o.button.y),
                opacity: 0,
                filter: 'alpha(opacity=0)'
              }
            },
            [['span', { isMathJax: true }, '\u25BC']]
          ]
        ]
      );
      if (y.width) {
        r.style.width = s.style.width = y.width;
        r.style.marginRight = s.style.marginRight = '-' + y.width;
        r.firstChild.style.width = y.width;
        s.firstChild.style.left = '';
        s.firstChild.style.right = this.Px(o.button.wx);
      }
      v.parentNode.insertBefore(r, v);
      if (w) {
        v.parentNode.insertBefore(s, v);
      }
      if (v.style) {
        v.style.position = 'relative';
      }
      this.ReHover(q);
    },
    ReHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      q.hover.remove = setTimeout(g(['UnHover', this, q]), o.fadeoutDelay);
      this.HoverFadeTimer(q, o.fadeinInc);
    },
    UnHover: function(q) {
      if (!q.hover.nofade) {
        this.HoverFadeTimer(q, -o.fadeoutInc, o.fadeoutStart);
      }
    },
    HoverFade: function(q) {
      delete q.hover.timer;
      q.hover.opacity = Math.max(0, Math.min(1, q.hover.opacity + q.hover.inc));
      q.hover.opacity = Math.floor(1000 * q.hover.opacity) / 1000;
      var s = document.getElementById(q.hover.id),
        r = document.getElementById(q.hover.id + 'Menu');
      s.firstChild.style.opacity = q.hover.opacity;
      s.firstChild.style.filter =
        'alpha(opacity=' + Math.floor(100 * q.hover.opacity) + ')';
      if (r) {
        r.firstChild.style.opacity = q.hover.opacity;
        r.firstChild.style.filter = s.style.filter;
      }
      if (q.hover.opacity === 1) {
        return;
      }
      if (q.hover.opacity > 0) {
        this.HoverFadeTimer(q, q.hover.inc);
        return;
      }
      s.parentNode.removeChild(s);
      if (r) {
        r.parentNode.removeChild(r);
      }
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      delete q.hover;
    },
    HoverFadeTimer: function(q, s, r) {
      q.hover.inc = s;
      if (!q.hover.timer) {
        q.hover.timer = setTimeout(g(['HoverFade', this, q]), r || o.fadeDelay);
      }
    },
    HoverMenu: function(q) {
      if (!q) {
        q = window.event;
      }
      return b[this.jax].ContextMenu(q, this.math, true);
    },
    ClearHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      if (q.hover.timer) {
        clearTimeout(q.hover.timer);
      }
      f.ClearHoverTimer();
      delete q.hover;
    },
    Px: function(q) {
      if (Math.abs(q) < 0.006) {
        return '0px';
      }
      return q.toFixed(2).replace(/\.?0+$/, '') + 'px';
    },
    getImages: function() {
      if (k.discoverable) {
        var q = new Image();
        q.src = o.button.src;
      }
    }
  });
  var a = (c.Touch = {
    last: 0,
    delay: 500,
    start: function(r) {
      var q = new Date().getTime();
      var s = q - a.last < a.delay && a.up;
      a.last = q;
      a.up = false;
      if (s) {
        a.timeout = setTimeout(a.menu, a.delay, r, this);
        r.preventDefault();
      }
    },
    end: function(r) {
      var q = new Date().getTime();
      a.up = q - a.last < a.delay;
      if (a.timeout) {
        clearTimeout(a.timeout);
        delete a.timeout;
        a.last = 0;
        a.up = false;
        r.preventDefault();
        return n.Handler(r.touches[0] || r.touch, 'DblClick', this);
      }
    },
    menu: function(r, q) {
      delete a.timeout;
      a.last = 0;
      a.up = false;
      return n.Handler(r.touches[0] || r.touch, 'ContextMenu', q);
    }
  });
  d.Browser.Select({
    MSIE: function(q) {
      var s = document.documentMode || 0;
      var r = q.versionAtLeast('8.0');
      c.msieBorderWidthBug = document.compatMode === 'BackCompat';
      c.msieEventBug = q.isIE9;
      c.msieAlignBug = !r || s < 8;
      if (s < 9) {
        n.LEFTBUTTON = 1;
      }
    },
    Safari: function(q) {
      c.safariContextMenuBug = true;
    },
    Opera: function(q) {
      c.operaPositionBug = true;
    },
    Konqueror: function(q) {
      c.noContextMenuBug = true;
    }
  });
  c.topImg = c.msieAlignBug
    ? h.Element('img', {
        style: { width: 0, height: 0, position: 'relative' },
        src: 'about:blank'
      })
    : h.Element('span', {
        style: { width: 0, height: 0, display: 'inline-block' }
      });
  if (c.operaPositionBug) {
    c.topImg.style.border = '1px solid';
  }
  c.config = o = d.CombineConfig('MathEvents', o);
  var e = function() {
    var q = o.styles['.MathJax_Hover_Frame'];
    q.border = o.frame.bwidth + 'px solid ' + o.frame.bcolor + ' ! important';
    q['box-shadow'] = q['-webkit-box-shadow'] = q['-moz-box-shadow'] = q[
      '-khtml-box-shadow'
    ] = '0px 0px ' + o.frame.hwidth + ' ' + o.frame.hcolor;
  };
  g.Queue(
    d.Register.StartupHook('End Config', {}),
    [e],
    ['getImages', f],
    ['Styles', l, o.styles],
    ['Post', d.Startup.signal, 'MathEvents Ready'],
    ['loadComplete', l, '[MathJax]/extensions/MathEvents.js']
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.Callback,
  MathJax.Localization,
  MathJax.OutputJax,
  MathJax.InputJax
);
(function(a, d, f, c, j) {
  var k = '2.7.5';
  var i = a.CombineConfig('MathZoom', {
    styles: {
      '#MathJax_Zoom': {
        position: 'absolute',
        'background-color': '#F0F0F0',
        overflow: 'auto',
        display: 'block',
        'z-index': 301,
        padding: '.5em',
        border: '1px solid black',
        margin: 0,
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-align': 'left',
        'text-indent': 0,
        'text-transform': 'none',
        'line-height': 'normal',
        'letter-spacing': 'normal',
        'word-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        float: 'none',
        '-webkit-box-sizing': 'content-box',
        '-moz-box-sizing': 'content-box',
        'box-sizing': 'content-box',
        'box-shadow': '5px 5px 15px #AAAAAA',
        '-webkit-box-shadow': '5px 5px 15px #AAAAAA',
        '-moz-box-shadow': '5px 5px 15px #AAAAAA',
        '-khtml-box-shadow': '5px 5px 15px #AAAAAA',
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      '#MathJax_ZoomOverlay': {
        position: 'absolute',
        left: 0,
        top: 0,
        'z-index': 300,
        display: 'inline-block',
        width: '100%',
        height: '100%',
        border: 0,
        padding: 0,
        margin: 0,
        'background-color': 'white',
        opacity: 0,
        filter: 'alpha(opacity=0)'
      },
      '#MathJax_ZoomFrame': {
        position: 'relative',
        display: 'inline-block',
        height: 0,
        width: 0
      },
      '#MathJax_ZoomEventTrap': {
        position: 'absolute',
        left: 0,
        top: 0,
        'z-index': 302,
        display: 'inline-block',
        border: 0,
        padding: 0,
        margin: 0,
        'background-color': 'white',
        opacity: 0,
        filter: 'alpha(opacity=0)'
      }
    }
  });
  var e, b, g;
  MathJax.Hub.Register.StartupHook('MathEvents Ready', function() {
    g = MathJax.Extension.MathEvents.Event;
    e = MathJax.Extension.MathEvents.Event.False;
    b = MathJax.Extension.MathEvents.Hover;
  });
  var h = (MathJax.Extension.MathZoom = {
    version: k,
    settings: a.config.menuSettings,
    scrollSize: 18,
    HandleEvent: function(n, l, m) {
      if (h.settings.CTRL && !n.ctrlKey) {
        return true;
      }
      if (h.settings.ALT && !n.altKey) {
        return true;
      }
      if (h.settings.CMD && !n.metaKey) {
        return true;
      }
      if (h.settings.Shift && !n.shiftKey) {
        return true;
      }
      if (!h[l]) {
        return true;
      }
      return h[l](n, m);
    },
    Click: function(m, l) {
      if (this.settings.zoom === 'Click') {
        return this.Zoom(m, l);
      }
    },
    DblClick: function(m, l) {
      if (
        this.settings.zoom === 'Double-Click' ||
        this.settings.zoom === 'DoubleClick'
      ) {
        return this.Zoom(m, l);
      }
    },
    Hover: function(m, l) {
      if (this.settings.zoom === 'Hover') {
        this.Zoom(m, l);
        return true;
      }
      return false;
    },
    Zoom: function(o, u) {
      this.Remove();
      b.ClearHoverTimer();
      g.ClearSelection();
      var s = MathJax.OutputJax[u.jaxID];
      var p = s.getJaxFromMath(u);
      if (p.hover) {
        b.UnHover(p);
      }
      var q = this.findContainer(u);
      var l = Math.floor(0.85 * q.clientWidth),
        t = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      if (this.getOverflow(q) !== 'visible') {
        t = Math.min(q.clientHeight, t);
      }
      t = Math.floor(0.85 * t);
      var n = d.Element('span', { id: 'MathJax_ZoomFrame' }, [
        ['span', { id: 'MathJax_ZoomOverlay', onmousedown: this.Remove }],
        [
          'span',
          {
            id: 'MathJax_Zoom',
            onclick: this.Remove,
            style: { visibility: 'hidden', fontSize: this.settings.zscale }
          },
          [
            [
              'span',
              { style: { display: 'inline-block', 'white-space': 'nowrap' } }
            ]
          ]
        ]
      ]);
      var z = n.lastChild,
        w = z.firstChild,
        r = n.firstChild;
      u.parentNode.insertBefore(n, u);
      u.parentNode.insertBefore(u, n);
      if (w.addEventListener) {
        w.addEventListener('mousedown', this.Remove, true);
      }
      var m = z.offsetWidth || z.clientWidth;
      l -= m;
      t -= m;
      z.style.maxWidth = l + 'px';
      z.style.maxHeight = t + 'px';
      if (this.msieTrapEventBug) {
        var y = d.Element('span', {
          id: 'MathJax_ZoomEventTrap',
          onmousedown: this.Remove
        });
        n.insertBefore(y, z);
      }
      if (this.msieZIndexBug) {
        var v = d.addElement(document.body, 'img', {
          src: 'about:blank',
          id: 'MathJax_ZoomTracker',
          width: 0,
          height: 0,
          style: { width: 0, height: 0, position: 'relative' }
        });
        n.style.position = 'relative';
        n.style.zIndex = i.styles['#MathJax_ZoomOverlay']['z-index'];
        n = v;
      }
      var x = s.Zoom(p, w, u, l, t);
      if (this.msiePositionBug) {
        if (this.msieSizeBug) {
          z.style.height = x.zH + 'px';
          z.style.width = x.zW + 'px';
        }
        if (z.offsetHeight > t) {
          z.style.height = t + 'px';
          z.style.width = x.zW + this.scrollSize + 'px';
        }
        if (z.offsetWidth > l) {
          z.style.width = l + 'px';
          z.style.height = x.zH + this.scrollSize + 'px';
        }
      }
      if (this.operaPositionBug) {
        z.style.width = Math.min(l, x.zW) + 'px';
      }
      if (
        z.offsetWidth > m &&
        z.offsetWidth - m < l &&
        z.offsetHeight - m < t
      ) {
        z.style.overflow = 'visible';
      }
      this.Position(z, x);
      if (this.msieTrapEventBug) {
        y.style.height = z.clientHeight + 'px';
        y.style.width = z.clientWidth + 'px';
        y.style.left = parseFloat(z.style.left) + z.clientLeft + 'px';
        y.style.top = parseFloat(z.style.top) + z.clientTop + 'px';
      }
      z.style.visibility = '';
      if (this.settings.zoom === 'Hover') {
        r.onmouseover = this.Remove;
      }
      if (window.addEventListener) {
        addEventListener('resize', this.Resize, false);
      } else {
        if (window.attachEvent) {
          attachEvent('onresize', this.Resize);
        } else {
          this.onresize = window.onresize;
          window.onresize = this.Resize;
        }
      }
      a.signal.Post(['math zoomed', p]);
      return e(o);
    },
    Position: function(p, r) {
      p.style.display = 'none';
      var q = this.Resize(),
        m = q.x,
        s = q.y,
        l = r.mW;
      p.style.display = '';
      var o = -l - Math.floor((p.offsetWidth - l) / 2),
        n = r.Y;
      p.style.left = Math.max(o, 10 - m) + 'px';
      p.style.top = Math.max(n, 10 - s) + 'px';
      if (!h.msiePositionBug) {
        h.SetWH();
      }
    },
    Resize: function(m) {
      if (h.onresize) {
        h.onresize(m);
      }
      var q = document.getElementById('MathJax_ZoomFrame'),
        l = document.getElementById('MathJax_ZoomOverlay');
      var o = h.getXY(q),
        n = h.findContainer(q);
      if (h.getOverflow(n) !== 'visible') {
        l.scroll_parent = n;
        var p = h.getXY(n);
        o.x -= p.x;
        o.y -= p.y;
        p = h.getBorder(n);
        o.x -= p.x;
        o.y -= p.y;
      }
      l.style.left = -o.x + 'px';
      l.style.top = -o.y + 'px';
      if (h.msiePositionBug) {
        setTimeout(h.SetWH, 0);
      } else {
        h.SetWH();
      }
      return o;
    },
    SetWH: function() {
      var l = document.getElementById('MathJax_ZoomOverlay');
      if (!l) {
        return;
      }
      l.style.display = 'none';
      var m = l.scroll_parent || document.documentElement || document.body;
      l.style.width = m.scrollWidth + 'px';
      l.style.height = Math.max(m.clientHeight, m.scrollHeight) + 'px';
      l.style.display = '';
    },
    findContainer: function(l) {
      l = l.parentNode;
      while (
        l.parentNode &&
        l !== document.body &&
        h.getOverflow(l) === 'visible'
      ) {
        l = l.parentNode;
      }
      return l;
    },
    getOverflow: window.getComputedStyle
      ? function(l) {
          return getComputedStyle(l).overflow;
        }
      : function(l) {
          return (l.currentStyle || { overflow: 'visible' }).overflow;
        },
    getBorder: function(o) {
      var m = { thin: 1, medium: 2, thick: 3 };
      var n = window.getComputedStyle
        ? getComputedStyle(o)
        : o.currentStyle || { borderLeftWidth: 0, borderTopWidth: 0 };
      var l = n.borderLeftWidth,
        p = n.borderTopWidth;
      if (m[l]) {
        l = m[l];
      } else {
        l = parseInt(l);
      }
      if (m[p]) {
        p = m[p];
      } else {
        p = parseInt(p);
      }
      return { x: l, y: p };
    },
    getXY: function(o) {
      var l = 0,
        n = 0,
        m;
      m = o;
      while (m.offsetParent) {
        l += m.offsetLeft;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = '1px solid';
      }
      m = o;
      while (m.offsetParent) {
        n += m.offsetTop;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = '';
      }
      return { x: l, y: n };
    },
    Remove: function(n) {
      var p = document.getElementById('MathJax_ZoomFrame');
      if (p) {
        var o = MathJax.OutputJax[p.previousSibling.jaxID];
        var l = o.getJaxFromMath(p.previousSibling);
        a.signal.Post(['math unzoomed', l]);
        p.parentNode.removeChild(p);
        p = document.getElementById('MathJax_ZoomTracker');
        if (p) {
          p.parentNode.removeChild(p);
        }
        if (h.operaRefreshBug) {
          var m = d.addElement(document.body, 'div', {
            style: {
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              opacity: 0
            },
            id: 'MathJax_OperaDiv'
          });
          document.body.removeChild(m);
        }
        if (window.removeEventListener) {
          removeEventListener('resize', h.Resize, false);
        } else {
          if (window.detachEvent) {
            detachEvent('onresize', h.Resize);
          } else {
            window.onresize = h.onresize;
            delete h.onresize;
          }
        }
      }
      return e(n);
    }
  });
  a.Browser.Select({
    MSIE: function(l) {
      var n = document.documentMode || 0;
      var m = n >= 9;
      h.msiePositionBug = !m;
      h.msieSizeBug =
        l.versionAtLeast('7.0') &&
        (!document.documentMode || n === 7 || n === 8);
      h.msieZIndexBug = n <= 7;
      h.msieInlineBlockAlignBug = n <= 7;
      h.msieTrapEventBug = !window.addEventListener;
      if (document.compatMode === 'BackCompat') {
        h.scrollSize = 52;
      }
      if (m) {
        delete i.styles['#MathJax_Zoom'].filter;
      }
    },
    Opera: function(l) {
      h.operaPositionBug = true;
      h.operaRefreshBug = true;
    }
  });
  h.topImg = h.msieInlineBlockAlignBug
    ? d.Element('img', {
        style: { width: 0, height: 0, position: 'relative' },
        src: 'about:blank'
      })
    : d.Element('span', {
        style: { width: 0, height: 0, display: 'inline-block' }
      });
  if (h.operaPositionBug || h.msieTopBug) {
    h.topImg.style.border = '1px solid';
  }
  MathJax.Callback.Queue(
    ['StartupHook', MathJax.Hub.Register, 'Begin Styles', {}],
    ['Styles', f, i.styles],
    ['Post', a.Startup.signal, 'MathZoom Ready'],
    ['loadComplete', f, '[MathJax]/extensions/MathZoom.js']
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.OutputJax['HTML-CSS'],
  MathJax.OutputJax.NativeMML
);
(function(f, o, q, e, r) {
  var p = '2.7.5';
  var d = MathJax.Callback.Signal('menu');
  MathJax.Extension.MathMenu = { version: p, signal: d };
  var t = function(u) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [['MathMenu', u]].concat([].slice.call(arguments, 1))
    );
  };
  var i = MathJax.Object.isArray;
  var a = f.Browser.isPC,
    l = f.Browser.isMSIE,
    m = (document.documentMode || 0) > 8;
  var j = a ? null : '5px';
  var s = f.CombineConfig('MathMenu', {
    delay: 150,
    showRenderer: true,
    showMathPlayer: true,
    showFontMenu: false,
    showContext: false,
    showDiscoverable: false,
    showLocale: true,
    showLocaleURL: false,
    semanticsAnnotations: {
      TeX: ['TeX', 'LaTeX', 'application/x-tex'],
      StarMath: ['StarMath 5.0'],
      Maple: ['Maple'],
      ContentMathML: ['MathML-Content', 'application/mathml-content+xml'],
      OpenMath: ['OpenMath']
    },
    windowSettings: {
      status: 'no',
      toolbar: 'no',
      locationbar: 'no',
      menubar: 'no',
      directories: 'no',
      personalbar: 'no',
      resizable: 'yes',
      scrollbars: 'yes',
      width: 400,
      height: 300,
      left: Math.round((screen.width - 400) / 2),
      top: Math.round((screen.height - 300) / 3)
    },
    styles: {
      '#MathJax_About': {
        position: 'fixed',
        left: '50%',
        width: 'auto',
        'text-align': 'center',
        border: '3px outset',
        padding: '1em 2em',
        'background-color': '#DDDDDD',
        color: 'black',
        cursor: 'default',
        'font-family': 'message-box',
        'font-size': '120%',
        'font-style': 'normal',
        'text-indent': 0,
        'text-transform': 'none',
        'line-height': 'normal',
        'letter-spacing': 'normal',
        'word-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        float: 'none',
        'z-index': 201,
        'border-radius': '15px',
        '-webkit-border-radius': '15px',
        '-moz-border-radius': '15px',
        '-khtml-border-radius': '15px',
        'box-shadow': '0px 10px 20px #808080',
        '-webkit-box-shadow': '0px 10px 20px #808080',
        '-moz-box-shadow': '0px 10px 20px #808080',
        '-khtml-box-shadow': '0px 10px 20px #808080',
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      '#MathJax_About.MathJax_MousePost': { outline: 'none' },
      '.MathJax_Menu': {
        position: 'absolute',
        'background-color': 'white',
        color: 'black',
        width: 'auto',
        padding: a ? '2px' : '5px 0px',
        border: '1px solid #CCCCCC',
        margin: 0,
        cursor: 'default',
        font: 'menu',
        'text-align': 'left',
        'text-indent': 0,
        'text-transform': 'none',
        'line-height': 'normal',
        'letter-spacing': 'normal',
        'word-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        float: 'none',
        'z-index': 201,
        'border-radius': j,
        '-webkit-border-radius': j,
        '-moz-border-radius': j,
        '-khtml-border-radius': j,
        'box-shadow': '0px 10px 20px #808080',
        '-webkit-box-shadow': '0px 10px 20px #808080',
        '-moz-box-shadow': '0px 10px 20px #808080',
        '-khtml-box-shadow': '0px 10px 20px #808080',
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      '.MathJax_MenuItem': {
        padding: a ? '2px 2em' : '1px 2em',
        background: 'transparent'
      },
      '.MathJax_MenuArrow': {
        position: 'absolute',
        right: '.5em',
        'padding-top': '.25em',
        color: '#666666',
        'font-family': l ? "'Arial unicode MS'" : null,
        'font-size': '.75em'
      },
      '.MathJax_MenuActive .MathJax_MenuArrow': { color: 'white' },
      '.MathJax_MenuArrow.RTL': { left: '.5em', right: 'auto' },
      '.MathJax_MenuCheck': {
        position: 'absolute',
        left: '.7em',
        'font-family': l ? "'Arial unicode MS'" : null
      },
      '.MathJax_MenuCheck.RTL': { right: '.7em', left: 'auto' },
      '.MathJax_MenuRadioCheck': {
        position: 'absolute',
        left: a ? '1em' : '.7em'
      },
      '.MathJax_MenuRadioCheck.RTL': {
        right: a ? '1em' : '.7em',
        left: 'auto'
      },
      '.MathJax_MenuLabel': {
        padding: a ? '2px 2em 4px 1.33em' : '1px 2em 3px 1.33em',
        'font-style': 'italic'
      },
      '.MathJax_MenuRule': {
        'border-top': a ? '1px solid #CCCCCC' : '1px solid #DDDDDD',
        margin: a ? '4px 1px 0px' : '4px 3px'
      },
      '.MathJax_MenuDisabled': { color: 'GrayText' },
      '.MathJax_MenuActive': {
        'background-color': a ? 'Highlight' : '#606872',
        color: a ? 'HighlightText' : 'white'
      },
      '.MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus': {
        'background-color': '#E8E8E8'
      },
      '.MathJax_ContextMenu:focus': { outline: 'none' },
      '.MathJax_ContextMenu .MathJax_MenuItem:focus': { outline: 'none' },
      '#MathJax_AboutClose': { top: '.2em', right: '.2em' },
      '.MathJax_Menu .MathJax_MenuClose': { top: '-10px', left: '-10px' },
      '.MathJax_MenuClose': {
        position: 'absolute',
        cursor: 'pointer',
        display: 'inline-block',
        border: '2px solid #AAA',
        'border-radius': '18px',
        '-webkit-border-radius': '18px',
        '-moz-border-radius': '18px',
        '-khtml-border-radius': '18px',
        'font-family': "'Courier New',Courier",
        'font-size': '24px',
        color: '#F0F0F0'
      },
      '.MathJax_MenuClose span': {
        display: 'block',
        'background-color': '#AAA',
        border: '1.5px solid',
        'border-radius': '18px',
        '-webkit-border-radius': '18px',
        '-moz-border-radius': '18px',
        '-khtml-border-radius': '18px',
        'line-height': 0,
        padding: '8px 0 6px'
      },
      '.MathJax_MenuClose:hover': {
        color: 'white!important',
        border: '2px solid #CCC!important'
      },
      '.MathJax_MenuClose:hover span': { 'background-color': '#CCC!important' },
      '.MathJax_MenuClose:hover:focus': { outline: 'none' }
    }
  });
  var n, k, b;
  f.Register.StartupHook('MathEvents Ready', function() {
    n = MathJax.Extension.MathEvents.Event.False;
    k = MathJax.Extension.MathEvents.Hover;
    b = MathJax.Extension.MathEvents.Event.KEY;
  });
  var h = MathJax.Object.Subclass(
    {
      Keydown: function(u, v) {
        switch (u.keyCode) {
          case b.ESCAPE:
            this.Remove(u, v);
            break;
          case b.RIGHT:
            this.Right(u, v);
            break;
          case b.LEFT:
            this.Left(u, v);
            break;
          case b.UP:
            this.Up(u, v);
            break;
          case b.DOWN:
            this.Down(u, v);
            break;
          case b.RETURN:
          case b.SPACE:
            this.Space(u, v);
            break;
          default:
            return;
            break;
        }
        return n(u);
      },
      Escape: function(u, v) {},
      Right: function(u, v) {},
      Left: function(u, v) {},
      Up: function(u, v) {},
      Down: function(u, v) {},
      Space: function(u, v) {}
    },
    {}
  );
  var g = (MathJax.Menu = h.Subclass(
    {
      version: p,
      items: [],
      posted: false,
      title: null,
      margin: 5,
      Init: function(u) {
        this.items = [].slice.call(arguments, 0);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      Post: function(M, E, B) {
        if (!M) {
          M = window.event || {};
        }
        var I = document.getElementById('MathJax_MenuFrame');
        if (!I) {
          I = g.Background(this);
          delete c.lastItem;
          delete c.lastMenu;
          delete g.skipUp;
          d.Post(['post', g.jax]);
          g.isRTL = MathJax.Localization.fontDirection() === 'rtl';
        }
        var v = o.Element('div', {
          onmouseup: g.Mouseup,
          ondblclick: n,
          ondragstart: n,
          onselectstart: n,
          oncontextmenu: n,
          menuItem: this,
          className: 'MathJax_Menu',
          onkeydown: g.Keydown,
          role: 'menu'
        });
        if (M.type === 'contextmenu' || M.type === 'mouseover') {
          v.className += ' MathJax_ContextMenu';
        }
        if (!B) {
          MathJax.Localization.setCSS(v);
        }
        for (var N = 0, K = this.items.length; N < K; N++) {
          this.items[N].Create(v);
        }
        if (g.isMobile) {
          o.addElement(
            v,
            'span',
            {
              className: 'MathJax_MenuClose',
              menu: E,
              ontouchstart: g.Close,
              ontouchend: n,
              onmousedown: g.Close,
              onmouseup: n
            },
            [['span', {}, '\u00D7']]
          );
        }
        I.appendChild(v);
        this.posted = true;
        if (v.offsetWidth) {
          v.style.width = v.offsetWidth + 2 + 'px';
        }
        var H = M.pageX,
          F = M.pageY;
        var u = document.body.getBoundingClientRect();
        var C = window.getComputedStyle
          ? window.getComputedStyle(document.body)
          : { marginLeft: '0px' };
        var A = u.right - Math.min(0, u.left) + parseFloat(C.marginLeft);
        if (!H && !F && 'clientX' in M) {
          H =
            M.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          F =
            M.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        if (!E) {
          var L = g.CurrentNode() || M.target;
          if ((M.type === 'keydown' || (!H && !F)) && L) {
            var P = window.pageXOffset || document.documentElement.scrollLeft;
            var O = window.pageYOffset || document.documentElement.scrollTop;
            var w = L.getBoundingClientRect();
            H = (w.right + w.left) / 2 + P;
            F = (w.bottom + w.top) / 2 + O;
          }
          if (H + v.offsetWidth > A - this.margin) {
            H = A - v.offsetWidth - this.margin;
          }
          if (g.isMobile) {
            H = Math.max(5, H - Math.floor(v.offsetWidth / 2));
            F -= 20;
          }
          g.skipUp = M.isContextMenu;
        } else {
          var z = 'left',
            J = E.offsetWidth;
          H = g.isMobile ? 30 : J - 2;
          F = 0;
          while (E && E !== I) {
            H += E.offsetLeft;
            F += E.offsetTop;
            E = E.parentNode;
          }
          if (!g.isMobile) {
            if (
              (g.isRTL && H - J - v.offsetWidth > this.margin) ||
              (!g.isRTL && H + v.offsetWidth > A - this.margin)
            ) {
              z = 'right';
              H = Math.max(this.margin, H - J - v.offsetWidth + 6);
            }
          }
          if (!a) {
            v.style['borderRadiusTop' + z] = 0;
            v.style['WebkitBorderRadiusTop' + z] = 0;
            v.style['MozBorderRadiusTop' + z] = 0;
            v.style['KhtmlBorderRadiusTop' + z] = 0;
          }
        }
        v.style.left = H + 'px';
        v.style.top = F + 'px';
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        }
        var G = window.pageXOffset || document.documentElement.scrollLeft;
        var D = window.pageYOffset || document.documentElement.scrollTop;
        g.Focus(v);
        if (M.type === 'keydown') {
          g.skipMouseoverFromKey = true;
          setTimeout(function() {
            delete g.skipMouseoverFromKey;
          }, s.delay);
        }
        window.scrollTo(G, D);
        return n(M);
      },
      Remove: function(u, v) {
        d.Post(['unpost', g.jax]);
        var w = document.getElementById('MathJax_MenuFrame');
        if (w) {
          w.parentNode.removeChild(w);
          if (this.msieFixedPositionBug) {
            detachEvent('onresize', g.Resize);
          }
        }
        if (g.jax.hover) {
          delete g.jax.hover.nofade;
          k.UnHover(g.jax);
        }
        g.Unfocus(v);
        if (u.type === 'mousedown') {
          g.CurrentNode().blur();
        }
        return n(u);
      },
      Find: function(u) {
        return this.FindN(1, u, [].slice.call(arguments, 1));
      },
      FindId: function(u) {
        return this.FindN(0, u, [].slice.call(arguments, 1));
      },
      FindN: function(y, v, x) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[y] === v) {
            if (x.length) {
              if (!this.items[w].submenu) {
                return null;
              }
              return this.items[w].submenu.FindN(y, x[0], x.slice(1));
            }
            return this.items[w];
          }
        }
        return null;
      },
      IndexOf: function(u) {
        return this.IndexOfN(1, u);
      },
      IndexOfId: function(u) {
        return this.IndexOfN(0, u);
      },
      IndexOfN: function(x, v) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[x] === v) {
            return w;
          }
        }
        return null;
      },
      Right: function(u, v) {
        g.Right(u, v);
      },
      Left: function(u, v) {
        g.Left(u, v);
      },
      Up: function(v, w) {
        var u = w.lastChild;
        u.menuItem.Activate(v, u);
      },
      Down: function(v, w) {
        var u = w.firstChild;
        u.menuItem.Activate(v, u);
      },
      Space: function(u, v) {
        this.Remove(u, v);
      }
    },
    {
      config: s,
      Remove: function(u) {
        return g.Event(u, this, 'Remove');
      },
      Mouseover: function(u) {
        return g.Event(u, this, 'Mouseover');
      },
      Mouseout: function(u) {
        return g.Event(u, this, 'Mouseout');
      },
      Mousedown: function(u) {
        return g.Event(u, this, 'Mousedown');
      },
      Mouseup: function(u) {
        return g.Event(u, this, 'Mouseup');
      },
      Keydown: function(u) {
        return g.Event(u, this, 'Keydown');
      },
      Touchstart: function(u) {
        return g.Event(u, this, 'Touchstart');
      },
      Touchend: function(u) {
        return g.Event(u, this, 'Touchend');
      },
      Close: function(u) {
        return g.Event(
          u,
          this.menu || this.parentNode,
          this.menu ? 'Touchend' : 'Remove'
        );
      },
      Event: function(w, y, u, x) {
        if (g.skipMouseover && u === 'Mouseover' && !x) {
          return n(w);
        }
        if (g.skipMouseoverFromKey && u === 'Mouseover') {
          delete g.skipMouseoverFromKey;
          return n(w);
        }
        if (g.skipUp) {
          if (u.match(/Mouseup|Touchend/)) {
            delete g.skipUp;
            return n(w);
          }
          if (u === 'Touchstart' || (u === 'Mousedown' && !g.skipMousedown)) {
            delete g.skipUp;
          }
        }
        if (!w) {
          w = window.event;
        }
        var v = y.menuItem;
        if (v && v[u]) {
          return v[u](w, y);
        }
        return null;
      },
      BGSTYLE: {
        position: 'absolute',
        left: 0,
        top: 0,
        'z-index': 200,
        width: '100%',
        height: '100%',
        border: 0,
        padding: 0,
        margin: 0
      },
      Background: function(v) {
        var w = o.addElement(
          document.body,
          'div',
          { style: this.BGSTYLE, id: 'MathJax_MenuFrame' },
          [
            [
              'div',
              { style: this.BGSTYLE, menuItem: v, onmousedown: this.Remove }
            ]
          ]
        );
        var u = w.firstChild;
        if (g.msieBackgroundBug) {
          u.style.backgroundColor = 'white';
          u.style.filter = 'alpha(opacity=0)';
        }
        if (g.msieFixedPositionBug) {
          w.width = w.height = 0;
          this.Resize();
          attachEvent('onresize', this.Resize);
        } else {
          u.style.position = 'fixed';
        }
        return w;
      },
      Resize: function() {
        setTimeout(g.SetWH, 0);
      },
      SetWH: function() {
        var u = document.getElementById('MathJax_MenuFrame');
        if (u) {
          u = u.firstChild;
          u.style.width = u.style.height = '1px';
          u.style.width = document.body.scrollWidth + 'px';
          u.style.height = document.body.scrollHeight + 'px';
        }
      },
      posted: false,
      active: null,
      GetNode: function(u) {
        var v = document.getElementById(u.inputID + '-Frame');
        return v.isMathJax ? v : v.firstChild;
      },
      CurrentNode: function() {
        return g.GetNode(g.jax);
      },
      AllNodes: function() {
        var v = MathJax.Hub.getAllJax();
        var w = [];
        for (var x = 0, u; (u = v[x]); x++) {
          w.push(g.GetNode(u));
        }
        return w;
      },
      ActiveNode: function() {
        return g.active;
      },
      FocusNode: function(u) {
        g.active = u;
        u.focus();
      },
      Focus: function(u) {
        !g.posted ? g.Activate(u) : (g.ActiveNode().tabIndex = -1);
        u.tabIndex = 0;
        g.FocusNode(u);
      },
      Activate: function(u, v) {
        g.UnsetTabIndex();
        g.posted = true;
      },
      Unfocus: function() {
        g.ActiveNode().tabIndex = -1;
        g.SetTabIndex();
        g.FocusNode(g.CurrentNode());
        g.posted = false;
      },
      MoveHorizontal: function(y, z, w) {
        if (!y.shiftKey) {
          return;
        }
        var v = g.AllNodes();
        var u = v.length;
        if (u === 0) {
          return;
        }
        var x = v[g.Mod(w(g.IndexOf(v, g.CurrentNode())), u)];
        if (x === g.CurrentNode()) {
          return;
        }
        g.menu.Remove(y, z);
        g.jax = MathJax.Hub.getJaxFor(x);
        g.FocusNode(x);
        g.menu.Post(null);
      },
      Right: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w + 1;
        });
      },
      Left: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w - 1;
        });
      },
      UnsetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.tabIndex > 0) {
            u.oldTabIndex = u.tabIndex;
          }
          u.tabIndex = -1;
        }
      },
      SetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.oldTabIndex !== undefined) {
            u.tabIndex = u.oldTabIndex;
            delete u.oldTabIndex;
          } else {
            u.tabIndex = f.getTabOrder(u);
          }
        }
      },
      Mod: function(u, v) {
        return ((u % v) + v) % v;
      },
      IndexOf: Array.prototype.indexOf
        ? function(u, v, w) {
            return u.indexOf(v, w);
          }
        : function(u, x, y) {
            for (var w = y || 0, v = u.length; w < v; w++) {
              if (x === u[w]) {
                return w;
              }
            }
            return -1;
          },
      saveCookie: function() {
        o.Cookie.Set('menu', this.cookie);
      },
      getCookie: function() {
        this.cookie = o.Cookie.Get('menu');
      }
    }
  ));
  MathJax.Menu.NAV = h;
  var c = (g.ITEM = h.Subclass(
    {
      name: '',
      node: null,
      menu: null,
      Attributes: function(u) {
        return f.Insert(
          {
            onmouseup: g.Mouseup,
            ondragstart: n,
            onselectstart: n,
            onselectend: n,
            ontouchstart: g.Touchstart,
            ontouchend: g.Touchend,
            className: 'MathJax_MenuItem',
            role: this.role,
            menuItem: this
          },
          u
        );
      },
      Create: function(w) {
        if (!this.hidden) {
          var v = this.Attributes();
          var u = this.Label(v, w);
          o.addElement(w, 'div', v, u);
        }
      },
      Name: function() {
        return t(this.name[0], this.name[1]);
      },
      Mouseover: function(u, v) {
        if (v.parentNode === g.ActiveNode().parentNode) {
          this.Deactivate(g.ActiveNode());
        }
        this.Activate(u, v);
      },
      Mouseout: function(u, v) {
        this.Deactivate(v);
      },
      Mouseup: function(u, v) {
        return this.Remove(u, v);
      },
      DeactivateSubmenus: function(z) {
        var y = document.getElementById('MathJax_MenuFrame').childNodes,
          v = c.GetMenuNode(z).childNodes;
        for (var w = 0, u = v.length; w < u; w++) {
          var x = v[w].menuItem;
          if (x && x.submenu && x.submenu.posted && x !== z.menuItem) {
            x.Deactivate(v[w]);
          }
        }
        this.RemoveSubmenus(z, y);
      },
      RemoveSubmenus: function(w, v) {
        v = v || document.getElementById('MathJax_MenuFrame').childNodes;
        var u = v.length - 1;
        while (u >= 0 && c.GetMenuNode(w).menuItem !== v[u].menuItem) {
          v[u].menuItem.posted = false;
          v[u].parentNode.removeChild(v[u]);
          u--;
        }
      },
      Touchstart: function(u, v) {
        return this.TouchEvent(u, v, 'Mousedown');
      },
      Touchend: function(u, v) {
        return this.TouchEvent(u, v, 'Mouseup');
      },
      TouchEvent: function(v, w, u) {
        if (this !== c.lastItem) {
          if (c.lastMenu) {
            g.Event(v, c.lastMenu, 'Mouseout');
          }
          g.Event(v, w, 'Mouseover', true);
          c.lastItem = this;
          c.lastMenu = w;
        }
        if (this.nativeTouch) {
          return null;
        }
        g.Event(v, w, u);
        return false;
      },
      Remove: function(u, v) {
        v = v.parentNode.menuItem;
        return v.Remove(u, v);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      isRTL: function() {
        return g.isRTL;
      },
      rtlClass: function() {
        return this.isRTL() ? ' RTL' : '';
      }
    },
    {
      GetMenuNode: function(u) {
        return u.parentNode;
      }
    }
  ));
  g.ENTRY = g.ITEM.Subclass({
    role: 'menuitem',
    Attributes: function(u) {
      u = f.Insert(
        {
          onmouseover: g.Mouseover,
          onmouseout: g.Mouseout,
          onmousedown: g.Mousedown,
          onkeydown: g.Keydown,
          'aria-disabled': !!this.disabled
        },
        u
      );
      u = this.SUPER(arguments).Attributes.call(this, u);
      if (this.disabled) {
        u.className += ' MathJax_MenuDisabled';
      }
      return u;
    },
    MoveVertical: function(u, E, w) {
      var x = c.GetMenuNode(E);
      var D = [];
      for (var z = 0, C = x.menuItem.items, y; (y = C[z]); z++) {
        if (!y.hidden) {
          D.push(y);
        }
      }
      var B = g.IndexOf(D, this);
      if (B === -1) {
        return;
      }
      var A = D.length;
      var v = x.childNodes;
      do {
        B = g.Mod(w(B), A);
      } while (D[B].hidden || !v[B].role || v[B].role === 'separator');
      this.Deactivate(E);
      D[B].Activate(u, v[B]);
    },
    Up: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w - 1;
      });
    },
    Down: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w + 1;
      });
    },
    Right: function(v, u) {
      this.MoveHorizontal(v, u, g.Right, !this.isRTL());
    },
    Left: function(v, u) {
      this.MoveHorizontal(v, u, g.Left, this.isRTL());
    },
    MoveHorizontal: function(A, z, u, B) {
      var x = c.GetMenuNode(z);
      if (x.menuItem === g.menu && A.shiftKey) {
        u(A, z);
      }
      if (B) {
        return;
      }
      if (x.menuItem !== g.menu) {
        this.Deactivate(z);
      }
      var v = x.previousSibling.childNodes;
      var y = v.length;
      while (y--) {
        var w = v[y];
        if (w.menuItem.submenu && w.menuItem.submenu === x.menuItem) {
          g.Focus(w);
          break;
        }
      }
      this.RemoveSubmenus(z);
    },
    Space: function(u, v) {
      this.Mouseup(u, v);
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      if (!this.disabled) {
        v.className += ' MathJax_MenuActive';
      }
      this.DeactivateSubmenus(v);
      g.Focus(v);
    },
    Deactivate: function(u) {
      u.className = u.className.replace(/ MathJax_MenuActive/, '');
    }
  });
  g.ITEM.COMMAND = g.ENTRY.Subclass({
    action: function() {},
    Init: function(u, w, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.action = w;
      this.With(v);
    },
    Label: function(u, v) {
      return [this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        this.Remove(u, v);
        d.Post(['command', this]);
        this.action.call(this, u);
      }
      return n(u);
    }
  });
  g.ITEM.SUBMENU = g.ENTRY.Subclass({
    submenu: null,
    marker: '\u25BA',
    markerRTL: '\u25C4',
    Attributes: function(u) {
      u = f.Insert({ 'aria-haspopup': 'true' }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Init: function(u, w) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      var v = 1;
      if (!(w instanceof g.ITEM)) {
        this.With(w), v++;
      }
      this.submenu = g.apply(g, [].slice.call(arguments, v));
    },
    Label: function(u, v) {
      this.submenu.posted = false;
      return [
        this.Name() + ' ',
        [
          'span',
          { className: 'MathJax_MenuArrow' + this.rtlClass() },
          [this.isRTL() ? this.markerRTL : this.marker]
        ]
      ];
    },
    Timer: function(u, v) {
      this.ClearTimer();
      u = { type: u.type, clientX: u.clientX, clientY: u.clientY };
      this.timer = setTimeout(e(['Mouseup', this, u, v]), s.delay);
    },
    ClearTimer: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    Touchend: function(v, x) {
      var w = this.submenu.posted;
      var u = this.SUPER(arguments).Touchend.apply(this, arguments);
      if (w) {
        this.Deactivate(x);
        delete c.lastItem;
        delete c.lastMenu;
      }
      return u;
    },
    Mouseout: function(u, v) {
      if (!this.submenu.posted) {
        this.Deactivate(v);
      }
      this.ClearTimer();
    },
    Mouseover: function(u, v) {
      this.Activate(u, v);
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        if (!this.submenu.posted) {
          this.ClearTimer();
          this.submenu.Post(u, v, this.ltr);
          g.Focus(v);
        } else {
          this.DeactivateSubmenus(v);
        }
      }
      return n(u);
    },
    Activate: function(u, v) {
      if (!this.disabled) {
        this.Deactivate(v);
        v.className += ' MathJax_MenuActive';
      }
      if (!this.submenu.posted) {
        this.DeactivateSubmenus(v);
        if (!g.isMobile) {
          this.Timer(u, v);
        }
      }
      g.Focus(v);
    },
    MoveVertical: function(w, v, u) {
      this.ClearTimer();
      this.SUPER(arguments).MoveVertical.apply(this, arguments);
    },
    MoveHorizontal: function(w, y, v, x) {
      if (!x) {
        this.SUPER(arguments).MoveHorizontal.apply(this, arguments);
        return;
      }
      if (this.disabled) {
        return;
      }
      if (!this.submenu.posted) {
        this.Activate(w, y);
        return;
      }
      var u = c.GetMenuNode(y).nextSibling.childNodes;
      if (u.length > 0) {
        this.submenu.items[0].Activate(w, u[0]);
      }
    }
  });
  g.ITEM.RADIO = g.ENTRY.Subclass({
    variable: null,
    marker: a ? '\u25CF' : '\u2713',
    role: 'menuitemradio',
    Attributes: function(v) {
      var u = s.settings[this.variable] === this.value ? 'true' : 'false';
      v = f.Insert({ 'aria-checked': u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
      if (this.value == null) {
        this.value = this.name[0];
      }
    },
    Label: function(v, w) {
      var u = { className: 'MathJax_MenuRadioCheck' + this.rtlClass() };
      if (s.settings[this.variable] !== this.value) {
        u = { style: { display: 'none' } };
      }
      return [['span', u, [this.marker]], ' ' + this.Name()];
    },
    Mouseup: function(x, y) {
      if (!this.disabled) {
        var z = y.parentNode.childNodes;
        for (var v = 0, u = z.length; v < u; v++) {
          var w = z[v].menuItem;
          if (w && w.variable === this.variable) {
            z[v].firstChild.style.display = 'none';
          }
        }
        y.firstChild.display = '';
        s.settings[this.variable] = this.value;
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(['radio button', this]);
      }
      this.Remove(x, y);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(x);
    }
  });
  g.ITEM.CHECKBOX = g.ENTRY.Subclass({
    variable: null,
    marker: '\u2713',
    role: 'menuitemcheckbox',
    Attributes: function(v) {
      var u = s.settings[this.variable] ? 'true' : 'false';
      v = f.Insert({ 'aria-checked': u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
    },
    Label: function(v, w) {
      var u = { className: 'MathJax_MenuCheck' + this.rtlClass() };
      if (!s.settings[this.variable]) {
        u = { style: { display: 'none' } };
      }
      return [['span', u, [this.marker]], ' ' + this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        v.firstChild.display = s.settings[this.variable] ? 'none' : '';
        s.settings[this.variable] = !s.settings[this.variable];
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(['checkbox', this]);
      }
      this.Remove(u, v);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(u);
    }
  });
  g.ITEM.LABEL = g.ENTRY.Subclass({
    role: 'menuitem',
    Init: function(u, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.With(v);
    },
    Label: function(u, v) {
      u.className += ' MathJax_MenuLabel';
      return [this.Name()];
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      g.Focus(v);
    },
    Mouseup: function(u, v) {}
  });
  g.ITEM.RULE = g.ITEM.Subclass({
    role: 'separator',
    Attributes: function(u) {
      u = f.Insert({ 'aria-orientation': 'vertical' }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Label: function(u, v) {
      u.className += ' MathJax_MenuRule';
      return null;
    }
  });
  g.About = function(y) {
    var v = g.About.GetFont();
    var A = g.About.GetFormat();
    var u = ['MathJax.js v' + MathJax.fileversion, ['br']];
    u.push([
      'div',
      { style: { 'border-top': 'groove 2px', margin: '.25em 0' } }
    ]);
    g.About.GetJax(u, MathJax.InputJax, ['InputJax', '%1 Input Jax v%2']);
    g.About.GetJax(u, MathJax.OutputJax, ['OutputJax', '%1 Output Jax v%2']);
    g.About.GetJax(u, MathJax.ElementJax, ['ElementJax', '%1 Element Jax v%2']);
    u.push([
      'div',
      { style: { 'border-top': 'groove 2px', margin: '.25em 0' } }
    ]);
    g.About.GetJax(
      u,
      MathJax.Extension,
      ['Extension', '%1 Extension v%2'],
      true
    );
    u.push(
      ['div', { style: { 'border-top': 'groove 2px', margin: '.25em 0' } }],
      [
        'center',
        {},
        [
          f.Browser +
            ' v' +
            f.Browser.version +
            (A ? ' \u2014 ' + t(A.replace(/ /g, ''), A) : '')
        ]
      ]
    );
    g.About.div = g.Background(g.About);
    var x = o.addElement(
      g.About.div,
      'div',
      { id: 'MathJax_About', tabIndex: 0, onkeydown: g.About.Keydown },
      [
        ['b', { style: { fontSize: '120%' } }, ['MathJax']],
        ' v' + MathJax.version,
        ['br'],
        t(v.replace(/ /g, ''), 'using ' + v),
        ['br'],
        ['br'],
        [
          'span',
          {
            style: {
              display: 'inline-block',
              'text-align': 'left',
              'font-size': '80%',
              'max-height': '20em',
              overflow: 'auto',
              'background-color': '#E4E4E4',
              padding: '.4em .6em',
              border: '1px inset'
            },
            tabIndex: 0
          },
          u
        ],
        ['br'],
        ['br'],
        ['a', { href: 'http://www.mathjax.org/' }, ['www.mathjax.org']],
        [
          'span',
          {
            className: 'MathJax_MenuClose',
            id: 'MathJax_AboutClose',
            onclick: g.About.Remove,
            onkeydown: g.About.Keydown,
            tabIndex: 0,
            role: 'button',
            'aria-label': t('CloseAboutDialog', 'Close about MathJax dialog')
          },
          [['span', {}, '\u00D7']]
        ]
      ]
    );
    if (y.type === 'mouseup') {
      x.className += ' MathJax_MousePost';
    }
    x.focus();
    MathJax.Localization.setCSS(x);
    var z = document.documentElement || {};
    var w = window.innerHeight || z.clientHeight || z.scrollHeight || 0;
    if (g.prototype.msieAboutBug) {
      x.style.width = '20em';
      x.style.position = 'absolute';
      x.style.left =
        Math.floor((document.documentElement.scrollWidth - x.offsetWidth) / 2) +
        'px';
      x.style.top =
        Math.floor((w - x.offsetHeight) / 3) + document.body.scrollTop + 'px';
    } else {
      x.style.marginLeft = Math.floor(-x.offsetWidth / 2) + 'px';
      x.style.top = Math.floor((w - x.offsetHeight) / 3) + 'px';
    }
  };
  g.About.Remove = function(u) {
    if (g.About.div) {
      document.body.removeChild(g.About.div);
      delete g.About.div;
    }
  };
  (g.About.Keydown = function(u) {
    if (
      u.keyCode === b.ESCAPE ||
      (this.id === 'MathJax_AboutClose' &&
        (u.keyCode === b.SPACE || u.keyCode === b.RETURN))
    ) {
      g.About.Remove(u);
      g.CurrentNode().focus();
      n(u);
    }
  }),
    (g.About.GetJax = function(v, A, y, x) {
      var z = [];
      for (var B in A) {
        if (A.hasOwnProperty(B) && A[B]) {
          if ((x && A[B].version) || (A[B].isa && A[B].isa(A))) {
            z.push(t(y[0], y[1], A[B].id || B, A[B].version));
          }
        }
      }
      z.sort();
      for (var w = 0, u = z.length; w < u; w++) {
        v.push(z[w], ['br']);
      }
      return v;
    });
  g.About.GetFont = function() {
    var u = MathJax.Hub.outputJax['jax/mml'][0] || {};
    var v =
      {
        SVG: 'web SVG',
        CommonHTML: 'web TeX',
        'HTML-CSS': u.imgFonts
          ? 'image'
          : (u.webFonts ? 'web' : 'local') + ' ' + u.fontInUse
      }[u.id] || 'generic';
    return v + ' fonts';
  };
  g.About.GetFormat = function() {
    var u = MathJax.Hub.outputJax['jax/mml'][0] || {};
    if (u.id !== 'HTML-CSS' || !u.webFonts || u.imgFonts) {
      return;
    }
    return u.allowWebFonts.replace(/otf/, 'woff or otf') + ' fonts';
  };
  g.Help = function(u) {
    q.Require('[MathJax]/extensions/HelpDialog.js', function() {
      MathJax.Extension.Help.Dialog({ type: u.type });
    });
  };
  g.ShowSource = function(y) {
    if (!y) {
      y = window.event;
    }
    var x = { screenX: y.screenX, screenY: y.screenY };
    if (!g.jax) {
      return;
    }
    if (this.format === 'MathML') {
      var v = MathJax.ElementJax.mml;
      if (v && typeof v.mbase.prototype.toMathML !== 'undefined') {
        try {
          g.ShowSource.Text(g.jax.root.toMathML('', g.jax), y);
        } catch (w) {
          if (!w.restart) {
            throw w;
          }
          e.After([this, g.ShowSource, x], w.restart);
        }
      } else {
        if (!q.loadingToMathML) {
          q.loadingToMathML = true;
          g.ShowSource.Window(y);
          e.Queue(
            q.Require('[MathJax]/extensions/toMathML.js'),
            function() {
              delete q.loadingToMathML;
              if (!v.mbase.prototype.toMathML) {
                v.mbase.prototype.toMathML = function() {};
              }
            },
            [this, g.ShowSource, x]
          );
          return;
        }
      }
    } else {
      if (this.format === 'Error') {
        g.ShowSource.Text(g.jax.errorText, y);
      } else {
        if (s.semanticsAnnotations[this.format]) {
          var u = g.jax.root.getAnnotation(this.format);
          if (u.data[0]) {
            g.ShowSource.Text(u.data[0].toString());
          }
        } else {
          if (g.jax.originalText == null) {
            alert(t('NoOriginalForm', 'No original form available'));
            return;
          }
          g.ShowSource.Text(g.jax.originalText, y);
        }
      }
    }
  };
  g.ShowSource.Window = function(v) {
    if (!g.ShowSource.w) {
      var w = [],
        u = s.windowSettings;
      for (var x in u) {
        if (u.hasOwnProperty(x)) {
          w.push(x + '=' + u[x]);
        }
      }
      g.ShowSource.w = window.open('', '_blank', w.join(','));
    }
    return g.ShowSource.w;
  };
  g.ShowSource.Text = function(z, x) {
    var u = g.ShowSource.Window(x);
    delete g.ShowSource.w;
    z = z.replace(/^\s*/, '').replace(/\s*$/, '');
    z = z
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    var y = t('EqSource', 'MathJax Equation Source');
    if (g.isMobile) {
      u.document.open();
      u.document.write(
        "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>" +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write('<pre>' + z + '</pre>');
      u.document.write(
        "<hr><input type='button' value='" +
          t('Close', 'Close') +
          "' onclick='window.close()' />"
      );
      u.document.write('</body></html>');
      u.document.close();
    } else {
      u.document.open();
      u.document.write(
        '<html><head><title>' +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write('<table><tr><td><pre>' + z + '</pre></td></tr></table>');
      u.document.write('</body></html>');
      u.document.close();
      var v = u.document.body.firstChild;
      setTimeout(function() {
        var B = u.outerHeight - u.innerHeight || 30,
          A = u.outerWidth - u.innerWidth || 30,
          w,
          E;
        A = Math.max(
          140,
          Math.min(Math.floor(0.5 * screen.width), v.offsetWidth + A + 25)
        );
        B = Math.max(
          40,
          Math.min(Math.floor(0.5 * screen.height), v.offsetHeight + B + 25)
        );
        if (g.prototype.msieHeightBug) {
          B += 35;
        }
        u.resizeTo(A, B);
        var D;
        try {
          D = x.screenX;
        } catch (C) {}
        if (x && D != null) {
          w = Math.max(
            0,
            Math.min(x.screenX - Math.floor(A / 2), screen.width - A - 20)
          );
          E = Math.max(
            0,
            Math.min(x.screenY - Math.floor(B / 2), screen.height - B - 20)
          );
          u.moveTo(w, E);
        }
      }, 50);
    }
  };
  g.Scale = function() {
    var z = ['CommonHTML', 'HTML-CSS', 'SVG', 'NativeMML', 'PreviewHTML'],
      u = z.length,
      y = 100,
      w,
      v;
    for (w = 0; w < u; w++) {
      v = r[z[w]];
      if (v) {
        y = v.config.scale;
        break;
      }
    }
    var x = prompt(
      t('ScaleMath', 'Scale all mathematics (compared to surrounding text) by'),
      y + '%'
    );
    if (x) {
      if (x.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
        x = parseFloat(x);
        if (x) {
          if (x !== y) {
            for (w = 0; w < u; w++) {
              v = r[z[w]];
              if (v) {
                v.config.scale = x;
              }
            }
            g.cookie.scale = f.config.scale = x;
            g.saveCookie();
            f.Queue(['Rerender', f]);
          }
        } else {
          alert(t('NonZeroScale', 'The scale should not be zero'));
        }
      } else {
        alert(
          t('PercentScale', 'The scale should be a percentage (e.g., 120%%)')
        );
      }
    }
  };
  g.Zoom = function() {
    if (!MathJax.Extension.MathZoom) {
      q.Require('[MathJax]/extensions/MathZoom.js');
    }
  };
  g.Renderer = function() {
    var v = f.outputJax['jax/mml'];
    if (v[0] !== s.settings.renderer) {
      var y = f.Browser,
        x,
        u = g.Renderer.Messages,
        w;
      switch (s.settings.renderer) {
        case 'NativeMML':
          if (!s.settings.warnedMML) {
            if (y.isChrome && y.version.substr(0, 3) !== '24.') {
              x = u.MML.WebKit;
            } else {
              if (y.isSafari && !y.versionAtLeast('5.0')) {
                x = u.MML.WebKit;
              } else {
                if (y.isMSIE) {
                  if (!y.hasMathPlayer) {
                    x = u.MML.MSIE;
                  }
                } else {
                  if (y.isEdge) {
                    x = u.MML.WebKit;
                  } else {
                    x = u.MML[y];
                  }
                }
              }
            }
            w = 'warnedMML';
          }
          break;
        case 'SVG':
          if (!s.settings.warnedSVG) {
            if (y.isMSIE && !m) {
              x = u.SVG.MSIE;
            }
          }
          break;
      }
      if (x) {
        x = t(x[0], x[1]);
        x += '\n\n';
        x += t(
          'SwitchAnyway',
          'Switch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)'
        );
        g.cookie.renderer = v[0].id;
        g.saveCookie();
        if (!confirm(x)) {
          g.cookie.renderer = s.settings.renderer = o.Cookie.Get(
            'menu'
          ).renderer;
          g.saveCookie();
          return;
        }
        if (w) {
          g.cookie.warned = s.settings.warned = true;
        }
        g.cookie.renderer = s.settings.renderer;
        g.saveCookie();
      }
      f.Queue(
        ['setRenderer', f, s.settings.renderer, 'jax/mml'],
        ['Rerender', f]
      );
    }
  };
  g.Renderer.Messages = {
    MML: {
      WebKit: [
        'WebkitNativeMMLWarning',
        "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable."
      ],
      MSIE: [
        'MSIENativeMMLWarning',
        'Internet Explorer requires the MathPlayer plugin in order to process MathML output.'
      ],
      Opera: [
        'OperaNativeMMLWarning',
        "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly."
      ],
      Safari: [
        'SafariNativeMMLWarning',
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ],
      Firefox: [
        'FirefoxNativeMMLWarning',
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ]
    },
    SVG: {
      MSIE: [
        'MSIESVGWarning',
        'SVG is not implemented in Internet Explorer prior to IE9 or when it is emulating IE8 or below. Switching to SVG output will cause the mathematics to not display properly.'
      ]
    }
  };
  g.AssistiveMML = function(w, u) {
    var v = MathJax.Extension.AssistiveMML;
    if (!v) {
      if (!u) {
        q.Require('[MathJax]/extensions/AssistiveMML.js', [
          'AssistiveMML',
          g,
          w,
          true
        ]);
      }
      return;
    }
    MathJax.Hub.Queue([
      (s.settings.assistiveMML ? 'Add' : 'Remove') + 'AssistiveMathML',
      v
    ]);
  };
  g.Font = function() {
    var u = r['HTML-CSS'];
    if (!u) {
      return;
    }
    document.location.reload();
  };
  g.Locale = function() {
    MathJax.Localization.setLocale(s.settings.locale);
    MathJax.Hub.Queue(['Reprocess', MathJax.Hub]);
  };
  g.LoadLocale = function() {
    var u = prompt(t('LoadURL', 'Load translation data from this URL:'));
    if (u) {
      if (!u.match(/\.js$/)) {
        alert(
          t(
            'BadURL',
            "The URL should be for a javascript file that defines MathJax translation data.  Javascript file names should end with '.js'"
          )
        );
      }
      q.Require(u, function(v) {
        if (v != q.STATUS.OK) {
          alert(t('BadData', 'Failed to load translation data from %1', u));
        }
      });
    }
  };
  g.MPEvents = function(w) {
    var v = s.settings.discoverable,
      u = g.MPEvents.Messages;
    if (!m) {
      if (s.settings.mpMouse && !confirm(t.apply(t, u.IE8warning))) {
        delete g.cookie.mpContext;
        delete s.settings.mpContext;
        delete g.cookie.mpMouse;
        delete s.settings.mpMouse;
        g.saveCookie();
        return;
      }
      s.settings.mpContext = s.settings.mpMouse;
      g.cookie.mpContext = g.cookie.mpMouse = s.settings.mpMouse;
      g.saveCookie();
      MathJax.Hub.Queue(['Rerender', MathJax.Hub]);
    } else {
      if (!v && w.name[1] === 'Menu Events' && s.settings.mpContext) {
        alert(t.apply(t, u.IE9warning));
      }
    }
  };
  g.MPEvents.Messages = {
    IE8warning: [
      'IE8warning',
      'This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?'
    ],
    IE9warning: [
      'IE9warning',
      'The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead.'
    ]
  };
  f.Browser.Select({
    MSIE: function(u) {
      var v = document.compatMode === 'BackCompat';
      var w = u.versionAtLeast('8.0') && document.documentMode > 7;
      g.Augment({
        margin: 20,
        msieBackgroundBug: (document.documentMode || 0) < 9,
        msieFixedPositionBug: v || !w,
        msieAboutBug: v,
        msieHeightBug: (document.documentMode || 0) < 9
      });
      if (m) {
        delete s.styles['#MathJax_About'].filter;
        delete s.styles['.MathJax_Menu'].filter;
      }
    },
    Firefox: function(u) {
      g.skipMouseover = u.isMobile && u.versionAtLeast('6.0');
      g.skipMousedown = u.isMobile;
    }
  });
  g.isMobile = f.Browser.isMobile;
  g.noContextMenu = f.Browser.noContextMenu;
  g.CreateLocaleMenu = function() {
    if (!g.menu) {
      return;
    }
    var z = g.menu.Find('Language').submenu,
      w = z.items;
    var v = [],
      B = MathJax.Localization.strings;
    for (var A in B) {
      if (B.hasOwnProperty(A)) {
        v.push(A);
      }
    }
    v = v.sort();
    z.items = [];
    for (var x = 0, u = v.length; x < u; x++) {
      var y = B[v[x]].menuTitle;
      if (y) {
        y += ' (' + v[x] + ')';
      } else {
        y = v[x];
      }
      z.items.push(c.RADIO([v[x], y], 'locale', { action: g.Locale }));
    }
    z.items.push(w[w.length - 2], w[w.length - 1]);
  };
  g.CreateAnnotationMenu = function() {
    if (!g.menu) {
      return;
    }
    var w = g.menu.Find('Show Math As', 'Annotation').submenu;
    var v = s.semanticsAnnotations;
    for (var u in v) {
      if (v.hasOwnProperty(u)) {
        w.items.push(
          c.COMMAND([u, u], g.ShowSource, {
            hidden: true,
            nativeTouch: true,
            format: u
          })
        );
      }
    }
  };
  f.Register.StartupHook('End Config', function() {
    s.settings = f.config.menuSettings;
    if (typeof s.settings.showRenderer !== 'undefined') {
      s.showRenderer = s.settings.showRenderer;
    }
    if (typeof s.settings.showFontMenu !== 'undefined') {
      s.showFontMenu = s.settings.showFontMenu;
    }
    if (typeof s.settings.showContext !== 'undefined') {
      s.showContext = s.settings.showContext;
    }
    g.getCookie();
    g.menu = g(
      c.SUBMENU(
        ['Show', 'Show Math As'],
        c.COMMAND(['MathMLcode', 'MathML Code'], g.ShowSource, {
          nativeTouch: true,
          format: 'MathML'
        }),
        c.COMMAND(['Original', 'Original Form'], g.ShowSource, {
          nativeTouch: true
        }),
        c.SUBMENU(['Annotation', 'Annotation'], { disabled: true }),
        c.RULE(),
        c.CHECKBOX(['texHints', 'Show TeX hints in MathML'], 'texHints'),
        c.CHECKBOX(
          ['semantics', 'Add original form as annotation'],
          'semantics'
        )
      ),
      c.RULE(),
      c.SUBMENU(
        ['Settings', 'Math Settings'],
        c.SUBMENU(
          ['ZoomTrigger', 'Zoom Trigger'],
          c.RADIO(['Hover', 'Hover'], 'zoom', { action: g.Zoom }),
          c.RADIO(['Click', 'Click'], 'zoom', { action: g.Zoom }),
          c.RADIO(['DoubleClick', 'Double-Click'], 'zoom', { action: g.Zoom }),
          c.RADIO(['NoZoom', 'No Zoom'], 'zoom', { value: 'None' }),
          c.RULE(),
          c.LABEL(['TriggerRequires', 'Trigger Requires:']),
          c.CHECKBOX(
            f.Browser.isMac ? ['Option', 'Option'] : ['Alt', 'Alt'],
            'ALT'
          ),
          c.CHECKBOX(['Command', 'Command'], 'CMD', {
            hidden: !f.Browser.isMac
          }),
          c.CHECKBOX(['Control', 'Control'], 'CTRL', {
            hidden: f.Browser.isMac
          }),
          c.CHECKBOX(['Shift', 'Shift'], 'Shift')
        ),
        c.SUBMENU(
          ['ZoomFactor', 'Zoom Factor'],
          c.RADIO('125%', 'zscale'),
          c.RADIO('133%', 'zscale'),
          c.RADIO('150%', 'zscale'),
          c.RADIO('175%', 'zscale'),
          c.RADIO('200%', 'zscale'),
          c.RADIO('250%', 'zscale'),
          c.RADIO('300%', 'zscale'),
          c.RADIO('400%', 'zscale')
        ),
        c.RULE(),
        c.SUBMENU(
          ['Renderer', 'Math Renderer'],
          { hidden: !s.showRenderer },
          c.RADIO(['HTML-CSS', 'HTML-CSS'], 'renderer', { action: g.Renderer }),
          c.RADIO(['CommonHTML', 'Common HTML'], 'renderer', {
            action: g.Renderer,
            value: 'CommonHTML'
          }),
          c.RADIO(['PreviewHTML', 'Preview HTML'], 'renderer', {
            action: g.Renderer,
            value: 'PreviewHTML'
          }),
          c.RADIO(['MathML', 'MathML'], 'renderer', {
            action: g.Renderer,
            value: 'NativeMML'
          }),
          c.RADIO(['SVG', 'SVG'], 'renderer', { action: g.Renderer }),
          c.RADIO(['PlainSource', 'Plain Source'], 'renderer', {
            action: g.Renderer,
            value: 'PlainSource'
          }),
          c.RULE(),
          c.CHECKBOX(['FastPreview', 'Fast Preview'], 'FastPreview')
        ),
        c.SUBMENU(
          'MathPlayer',
          {
            hidden: !f.Browser.isMSIE || !s.showMathPlayer,
            disabled: !f.Browser.hasMathPlayer
          },
          c.LABEL(['MPHandles', 'Let MathPlayer Handle:']),
          c.CHECKBOX(['MenuEvents', 'Menu Events'], 'mpContext', {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(['MouseEvents', 'Mouse Events'], 'mpMouse', {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(['MenuAndMouse', 'Mouse and Menu Events'], 'mpMouse', {
            action: g.MPEvents,
            hidden: m
          })
        ),
        c.SUBMENU(
          ['FontPrefs', 'Font Preference'],
          { hidden: !s.showFontMenu },
          c.LABEL(['ForHTMLCSS', 'For HTML-CSS:']),
          c.RADIO(['Auto', 'Auto'], 'font', { action: g.Font }),
          c.RULE(),
          c.RADIO(['TeXLocal', 'TeX (local)'], 'font', { action: g.Font }),
          c.RADIO(['TeXWeb', 'TeX (web)'], 'font', { action: g.Font }),
          c.RADIO(['TeXImage', 'TeX (image)'], 'font', { action: g.Font }),
          c.RULE(),
          c.RADIO(['STIXLocal', 'STIX (local)'], 'font', { action: g.Font }),
          c.RADIO(['STIXWeb', 'STIX (web)'], 'font', { action: g.Font }),
          c.RULE(),
          c.RADIO(['AsanaMathWeb', 'Asana Math (web)'], 'font', {
            action: g.Font
          }),
          c.RADIO(['GyrePagellaWeb', 'Gyre Pagella (web)'], 'font', {
            action: g.Font
          }),
          c.RADIO(['GyreTermesWeb', 'Gyre Termes (web)'], 'font', {
            action: g.Font
          }),
          c.RADIO(['LatinModernWeb', 'Latin Modern (web)'], 'font', {
            action: g.Font
          }),
          c.RADIO(['NeoEulerWeb', 'Neo Euler (web)'], 'font', {
            action: g.Font
          })
        ),
        c.SUBMENU(
          ['ContextMenu', 'Contextual Menu'],
          { hidden: !s.showContext },
          c.RADIO(['MathJax', 'MathJax'], 'context'),
          c.RADIO(['Browser', 'Browser'], 'context')
        ),
        c.COMMAND(['Scale', 'Scale All Math ...'], g.Scale),
        c
          .RULE()
          .With({ hidden: !s.showDiscoverable, name: ['', 'discover_rule'] }),
        c.CHECKBOX(['Discoverable', 'Highlight on Hover'], 'discoverable', {
          hidden: !s.showDiscoverable
        })
      ),
      c.SUBMENU(
        ['Accessibility', 'Accessibility'],
        c.CHECKBOX(['AssistiveMML', 'Assistive MathML'], 'assistiveMML', {
          action: g.AssistiveMML
        }),
        c.CHECKBOX(['InTabOrder', 'Include in Tab Order'], 'inTabOrder')
      ),
      c.SUBMENU(
        ['Locale', 'Language'],
        { hidden: !s.showLocale, ltr: true },
        c.RADIO('en', 'locale', { action: g.Locale }),
        c
          .RULE()
          .With({ hidden: !s.showLocaleURL, name: ['', 'localURL_rule'] }),
        c.COMMAND(['LoadLocale', 'Load from URL ...'], g.LoadLocale, {
          hidden: !s.showLocaleURL
        })
      ),
      c.RULE(),
      c.COMMAND(['About', 'About MathJax'], g.About),
      c.COMMAND(['Help', 'MathJax Help'], g.Help)
    );
    if (g.isMobile) {
      (function() {
        var v = s.settings;
        var u = g.menu.Find('Math Settings', 'Zoom Trigger').submenu;
        u.items[0].disabled = u.items[1].disabled = true;
        if (v.zoom === 'Hover' || v.zoom == 'Click') {
          v.zoom = 'None';
        }
        u.items = u.items.slice(0, 4);
        if (navigator.appVersion.match(/[ (]Android[) ]/)) {
          g.ITEM.SUBMENU.Augment({ marker: '\u00BB' });
        }
      })();
    }
    g.CreateLocaleMenu();
    g.CreateAnnotationMenu();
  });
  g.showRenderer = function(u) {
    g.cookie.showRenderer = s.showRenderer = u;
    g.saveCookie();
    g.menu.Find('Math Settings', 'Math Renderer').hidden = !u;
  };
  g.showMathPlayer = function(u) {
    g.cookie.showMathPlayer = s.showMathPlayer = u;
    g.saveCookie();
    g.menu.Find('Math Settings', 'MathPlayer').hidden = !u;
  };
  g.showFontMenu = function(u) {
    g.cookie.showFontMenu = s.showFontMenu = u;
    g.saveCookie();
    g.menu.Find('Math Settings', 'Font Preference').hidden = !u;
  };
  g.showContext = function(u) {
    g.cookie.showContext = s.showContext = u;
    g.saveCookie();
    g.menu.Find('Math Settings', 'Contextual Menu').hidden = !u;
  };
  g.showDiscoverable = function(u) {
    g.cookie.showDiscoverable = s.showDiscoverable = u;
    g.saveCookie();
    g.menu.Find('Math Settings', 'Highlight on Hover').hidden = !u;
    g.menu.Find('Math Settings', 'discover_rule').hidden = !u;
  };
  g.showLocale = function(u) {
    g.cookie.showLocale = s.showLocale = u;
    g.saveCookie();
    g.menu.Find('Language').hidden = !u;
  };
  MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function() {
    if (!MathJax.OutputJax['HTML-CSS'].config.imageFont) {
      g.menu.Find(
        'Math Settings',
        'Font Preference',
        'TeX (image)'
      ).disabled = true;
    }
  });
  e.Queue(
    f.Register.StartupHook('End Config', {}),
    ['Styles', q, s.styles],
    ['Post', f.Startup.signal, 'MathMenu Ready'],
    ['loadComplete', q, '[MathJax]/extensions/MathMenu.js']
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.CallBack,
  MathJax.OutputJax
);
MathJax.ElementJax.mml = MathJax.ElementJax(
  { mimeType: 'jax/mml' },
  {
    id: 'mml',
    version: '2.7.5',
    directory: MathJax.ElementJax.directory + '/mml',
    extensionDir: MathJax.ElementJax.extensionDir + '/mml',
    optableDir: MathJax.ElementJax.directory + '/mml/optable'
  }
);
MathJax.ElementJax.mml.Augment(
  {
    Init: function() {
      if (arguments.length === 1 && arguments[0].type === 'math') {
        this.root = arguments[0];
      } else {
        this.root = MathJax.ElementJax.mml.math.apply(this, arguments);
      }
      if (this.root.attr && this.root.attr.mode) {
        if (!this.root.display && this.root.attr.mode === 'display') {
          this.root.display = 'block';
          this.root.attrNames.push('display');
        }
        delete this.root.attr.mode;
        for (var b = 0, a = this.root.attrNames.length; b < a; b++) {
          if (this.root.attrNames[b] === 'mode') {
            this.root.attrNames.splice(b, 1);
            break;
          }
        }
      }
    }
  },
  {
    INHERIT: '_inherit_',
    AUTO: '_auto_',
    SIZE: {
      INFINITY: 'infinity',
      SMALL: 'small',
      NORMAL: 'normal',
      BIG: 'big'
    },
    COLOR: { TRANSPARENT: 'transparent' },
    VARIANT: {
      NORMAL: 'normal',
      BOLD: 'bold',
      ITALIC: 'italic',
      BOLDITALIC: 'bold-italic',
      DOUBLESTRUCK: 'double-struck',
      FRAKTUR: 'fraktur',
      BOLDFRAKTUR: 'bold-fraktur',
      SCRIPT: 'script',
      BOLDSCRIPT: 'bold-script',
      SANSSERIF: 'sans-serif',
      BOLDSANSSERIF: 'bold-sans-serif',
      SANSSERIFITALIC: 'sans-serif-italic',
      SANSSERIFBOLDITALIC: 'sans-serif-bold-italic',
      MONOSPACE: 'monospace',
      INITIAL: 'initial',
      TAILED: 'tailed',
      LOOPED: 'looped',
      STRETCHED: 'stretched',
      CALIGRAPHIC: '-tex-caligraphic',
      OLDSTYLE: '-tex-oldstyle'
    },
    FORM: { PREFIX: 'prefix', INFIX: 'infix', POSTFIX: 'postfix' },
    LINEBREAK: {
      AUTO: 'auto',
      NEWLINE: 'newline',
      NOBREAK: 'nobreak',
      GOODBREAK: 'goodbreak',
      BADBREAK: 'badbreak'
    },
    LINEBREAKSTYLE: {
      BEFORE: 'before',
      AFTER: 'after',
      DUPLICATE: 'duplicate',
      INFIXLINBREAKSTYLE: 'infixlinebreakstyle'
    },
    INDENTALIGN: {
      LEFT: 'left',
      CENTER: 'center',
      RIGHT: 'right',
      AUTO: 'auto',
      ID: 'id',
      INDENTALIGN: 'indentalign'
    },
    INDENTSHIFT: { INDENTSHIFT: 'indentshift' },
    LINETHICKNESS: { THIN: 'thin', MEDIUM: 'medium', THICK: 'thick' },
    NOTATION: {
      LONGDIV: 'longdiv',
      ACTUARIAL: 'actuarial',
      RADICAL: 'radical',
      BOX: 'box',
      ROUNDEDBOX: 'roundedbox',
      CIRCLE: 'circle',
      LEFT: 'left',
      RIGHT: 'right',
      TOP: 'top',
      BOTTOM: 'bottom',
      UPDIAGONALSTRIKE: 'updiagonalstrike',
      DOWNDIAGONALSTRIKE: 'downdiagonalstrike',
      UPDIAGONALARROW: 'updiagonalarrow',
      VERTICALSTRIKE: 'verticalstrike',
      HORIZONTALSTRIKE: 'horizontalstrike',
      PHASORANGLE: 'phasorangle',
      MADRUWB: 'madruwb'
    },
    ALIGN: {
      TOP: 'top',
      BOTTOM: 'bottom',
      CENTER: 'center',
      BASELINE: 'baseline',
      AXIS: 'axis',
      LEFT: 'left',
      RIGHT: 'right'
    },
    LINES: { NONE: 'none', SOLID: 'solid', DASHED: 'dashed' },
    SIDE: {
      LEFT: 'left',
      RIGHT: 'right',
      LEFTOVERLAP: 'leftoverlap',
      RIGHTOVERLAP: 'rightoverlap'
    },
    WIDTH: { AUTO: 'auto', FIT: 'fit' },
    ACTIONTYPE: {
      TOGGLE: 'toggle',
      STATUSLINE: 'statusline',
      TOOLTIP: 'tooltip',
      INPUT: 'input'
    },
    LENGTH: {
      VERYVERYTHINMATHSPACE: 'veryverythinmathspace',
      VERYTHINMATHSPACE: 'verythinmathspace',
      THINMATHSPACE: 'thinmathspace',
      MEDIUMMATHSPACE: 'mediummathspace',
      THICKMATHSPACE: 'thickmathspace',
      VERYTHICKMATHSPACE: 'verythickmathspace',
      VERYVERYTHICKMATHSPACE: 'veryverythickmathspace',
      NEGATIVEVERYVERYTHINMATHSPACE: 'negativeveryverythinmathspace',
      NEGATIVEVERYTHINMATHSPACE: 'negativeverythinmathspace',
      NEGATIVETHINMATHSPACE: 'negativethinmathspace',
      NEGATIVEMEDIUMMATHSPACE: 'negativemediummathspace',
      NEGATIVETHICKMATHSPACE: 'negativethickmathspace',
      NEGATIVEVERYTHICKMATHSPACE: 'negativeverythickmathspace',
      NEGATIVEVERYVERYTHICKMATHSPACE: 'negativeveryverythickmathspace'
    },
    OVERFLOW: {
      LINBREAK: 'linebreak',
      SCROLL: 'scroll',
      ELIDE: 'elide',
      TRUNCATE: 'truncate',
      SCALE: 'scale'
    },
    UNIT: {
      EM: 'em',
      EX: 'ex',
      PX: 'px',
      IN: 'in',
      CM: 'cm',
      MM: 'mm',
      PT: 'pt',
      PC: 'pc'
    },
    TEXCLASS: {
      ORD: 0,
      OP: 1,
      BIN: 2,
      REL: 3,
      OPEN: 4,
      CLOSE: 5,
      PUNCT: 6,
      INNER: 7,
      VCENTER: 8,
      NONE: -1
    },
    TEXCLASSNAMES: [
      'ORD',
      'OP',
      'BIN',
      'REL',
      'OPEN',
      'CLOSE',
      'PUNCT',
      'INNER',
      'VCENTER'
    ],
    skipAttributes: { texClass: true, useHeight: true, texprimestyle: true },
    copyAttributes: {
      displaystyle: 1,
      scriptlevel: 1,
      open: 1,
      close: 1,
      form: 1,
      actiontype: 1,
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: 1,
      href: true,
      style: true
    },
    copyAttributeNames: [
      'displaystyle',
      'scriptlevel',
      'open',
      'close',
      'form',
      'actiontype',
      'fontfamily',
      'fontsize',
      'fontweight',
      'fontstyle',
      'color',
      'background',
      'id',
      'class',
      'href',
      'style'
    ],
    nocopyAttributes: {
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: true,
      href: true,
      style: true,
      xmlns: true
    },
    Error: function(d, e) {
      var c = this.merror(d),
        b = MathJax.Localization.fontDirection(),
        a = MathJax.Localization.fontFamily();
      if (e) {
        c = c.With(e);
      }
      if (b || a) {
        c = this.mstyle(c);
        if (b) {
          c.dir = b;
        }
        if (a) {
          c.style.fontFamily = 'font-family: ' + a;
        }
      }
      return c;
    }
  }
);
(function(a) {
  a.mbase = MathJax.Object.Subclass(
    {
      type: 'base',
      isToken: false,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      noInherit: {},
      noInheritAttribute: { texClass: true },
      getRemoved: {},
      linebreakContainer: false,
      Init: function() {
        this.data = [];
        if (
          this.inferRow &&
          !(arguments.length === 1 && arguments[0].inferred)
        ) {
          this.Append(a.mrow().With({ inferred: true, notParent: true }));
        }
        this.Append.apply(this, arguments);
      },
      With: function(e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            this[f] = e[f];
          }
        }
        return this;
      },
      Append: function() {
        if (this.inferRow && this.data.length) {
          this.data[0].Append.apply(this.data[0], arguments);
        } else {
          for (var f = 0, e = arguments.length; f < e; f++) {
            this.SetData(this.data.length, arguments[f]);
          }
        }
      },
      SetData: function(e, f) {
        if (f != null) {
          if (!(f instanceof a.mbase)) {
            f = this.isToken || this.isChars ? a.chars(f) : a.mtext(f);
          }
          f.parent = this;
          f.setInherit(this.inheritFromMe ? this : this.inherit);
        }
        this.data[e] = f;
      },
      Parent: function() {
        var e = this.parent;
        while (e && e.notParent) {
          e = e.parent;
        }
        return e;
      },
      Get: function(f, k, l) {
        if (!l) {
          if (this[f] != null) {
            return this[f];
          }
          if (this.attr && this.attr[f] != null) {
            return this.attr[f];
          }
        }
        var g = this.Parent();
        if (g && g['adjustChild_' + f] != null) {
          return g['adjustChild_' + f](this.childPosition(), k);
        }
        var j = this.inherit;
        var e = j;
        while (j) {
          var i = j[f];
          if (i == null && j.attr) {
            i = j.attr[f];
          }
          if (j.removedStyles && j.getRemoved[f] && i == null) {
            i = j.removedStyles[j.getRemoved[f]];
          }
          if (i != null && j.noInheritAttribute && !j.noInheritAttribute[f]) {
            var h = j.noInherit[this.type];
            if (!(h && h[f])) {
              return i;
            }
          }
          e = j;
          j = j.inherit;
        }
        if (!k) {
          if (this.defaults[f] === a.AUTO) {
            return this.autoDefault(f);
          }
          if (this.defaults[f] !== a.INHERIT && this.defaults[f] != null) {
            return this.defaults[f];
          }
          if (e) {
            return e.defaults[f];
          }
        }
        return null;
      },
      hasValue: function(e) {
        return this.Get(e, true) != null;
      },
      getValues: function() {
        var f = {};
        for (var g = 0, e = arguments.length; g < e; g++) {
          f[arguments[g]] = this.Get(arguments[g]);
        }
        return f;
      },
      adjustChild_scriptlevel: function(f, e) {
        return this.Get('scriptlevel', e);
      },
      adjustChild_displaystyle: function(f, e) {
        return this.Get('displaystyle', e);
      },
      adjustChild_texprimestyle: function(f, e) {
        return this.Get('texprimestyle', e);
      },
      hasMMLspacing: function() {
        return false;
      },
      childPosition: function() {
        var h = this,
          g = h.parent;
        while (g.notParent) {
          h = g;
          g = h.parent;
        }
        for (var f = 0, e = g.data.length; f < e; f++) {
          if (g.data[f] === h) {
            return f;
          }
        }
        return null;
      },
      setInherit: function(g) {
        if (g !== this.inherit && this.inherit == null) {
          this.inherit = g;
          for (var f = 0, e = this.data.length; f < e; f++) {
            if (this.data[f] && this.data[f].setInherit) {
              this.data[f].setInherit(g);
            }
          }
        }
      },
      setTeXclass: function(e) {
        this.getPrevClass(e);
        return typeof this.texClass !== 'undefined' ? this : e;
      },
      getPrevClass: function(e) {
        if (e) {
          this.prevClass = e.Get('texClass');
          this.prevLevel = e.Get('scriptlevel');
        }
      },
      updateTeXclass: function(e) {
        if (e) {
          this.prevClass = e.prevClass;
          delete e.prevClass;
          this.prevLevel = e.prevLevel;
          delete e.prevLevel;
          this.texClass = e.Get('texClass');
        }
      },
      texSpacing: function() {
        var f = this.prevClass != null ? this.prevClass : a.TEXCLASS.NONE;
        var e = this.Get('texClass') || a.TEXCLASS.ORD;
        if (f === a.TEXCLASS.NONE || e === a.TEXCLASS.NONE) {
          return '';
        }
        if (f === a.TEXCLASS.VCENTER) {
          f = a.TEXCLASS.ORD;
        }
        if (e === a.TEXCLASS.VCENTER) {
          e = a.TEXCLASS.ORD;
        }
        var g = this.TEXSPACE[f][e];
        if ((this.prevLevel > 0 || this.Get('scriptlevel') > 0) && g >= 0) {
          return '';
        }
        return this.TEXSPACELENGTH[Math.abs(g)];
      },
      TEXSPACELENGTH: [
        '',
        a.LENGTH.THINMATHSPACE,
        a.LENGTH.MEDIUMMATHSPACE,
        a.LENGTH.THICKMATHSPACE
      ],
      TEXSPACE: [
        [0, -1, 2, 3, 0, 0, 0, 1],
        [-1, -1, 0, 3, 0, 0, 0, 1],
        [2, 2, 0, 0, 2, 0, 0, 2],
        [3, 3, 0, 0, 3, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 2, 3, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1],
        [1, -1, 2, 3, 1, 0, 1, 1]
      ],
      autoDefault: function(e) {
        return '';
      },
      isSpacelike: function() {
        return false;
      },
      isEmbellished: function() {
        return false;
      },
      Core: function() {
        return this;
      },
      CoreMO: function() {
        return this;
      },
      childIndex: function(g) {
        if (g == null) {
          return;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (g === this.data[f]) {
            return f;
          }
        }
      },
      CoreIndex: function() {
        return (this.inferRow ? this.data[0] || this : this).childIndex(
          this.Core()
        );
      },
      hasNewline: function() {
        if (this.isEmbellished()) {
          return this.CoreMO().hasNewline();
        }
        if (this.isToken || this.linebreakContainer) {
          return false;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f] && this.data[f].hasNewline()) {
            return true;
          }
        }
        return false;
      },
      array: function() {
        if (this.inferred) {
          return this.data;
        } else {
          return [this];
        }
      },
      toString: function() {
        return this.type + '(' + this.data.join(',') + ')';
      },
      getAnnotation: function() {
        return null;
      }
    },
    {
      childrenSpacelike: function() {
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (!this.data[f].isSpacelike()) {
            return false;
          }
        }
        return true;
      },
      childEmbellished: function() {
        return this.data[0] && this.data[0].isEmbellished();
      },
      childCore: function() {
        return this.inferRow && this.data[0]
          ? this.data[0].Core()
          : this.data[0];
      },
      childCoreMO: function() {
        return this.data[0] ? this.data[0].CoreMO() : null;
      },
      setChildTeXclass: function(e) {
        if (this.data[0]) {
          e = this.data[0].setTeXclass(e);
          this.updateTeXclass(this.data[0]);
        }
        return e;
      },
      setBaseTeXclasses: function(g) {
        this.getPrevClass(g);
        this.texClass = null;
        if (this.data[0]) {
          if (this.isEmbellished() || this.data[0].isa(a.mi)) {
            g = this.data[0].setTeXclass(g);
            this.updateTeXclass(this.Core());
          } else {
            this.data[0].setTeXclass();
            g = this;
          }
        } else {
          g = this;
        }
        for (var f = 1, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        return g;
      },
      setSeparateTeXclasses: function(g) {
        this.getPrevClass(g);
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        if (this.isEmbellished()) {
          this.updateTeXclass(this.Core());
        }
        return this;
      }
    }
  );
  a.mi = a.mbase.Subclass({
    type: 'mi',
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.AUTO,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    },
    autoDefault: function(f) {
      if (f === 'mathvariant') {
        var e = (this.data[0] || '').toString();
        return e.length === 1 ||
          (e.length === 2 &&
            e.charCodeAt(0) >= 55296 &&
            e.charCodeAt(0) < 56320)
          ? a.VARIANT.ITALIC
          : a.VARIANT.NORMAL;
      }
      return '';
    },
    setTeXclass: function(f) {
      this.getPrevClass(f);
      var e = this.data.join('');
      if (
        e.length > 1 &&
        e.match(/^[a-z][a-z0-9]*$/i) &&
        this.texClass === a.TEXCLASS.ORD
      ) {
        this.texClass = a.TEXCLASS.OP;
        this.autoOP = true;
      }
      return this;
    }
  });
  a.mn = a.mbase.Subclass({
    type: 'mn',
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mo = a.mbase.Subclass({
    type: 'mo',
    isToken: true,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      form: a.AUTO,
      fence: a.AUTO,
      separator: a.AUTO,
      lspace: a.AUTO,
      rspace: a.AUTO,
      stretchy: a.AUTO,
      symmetric: a.AUTO,
      maxsize: a.AUTO,
      minsize: a.AUTO,
      largeop: a.AUTO,
      movablelimits: a.AUTO,
      accent: a.AUTO,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: a.INHERIT,
      linebreakstyle: a.AUTO,
      linebreakmultchar: a.INHERIT,
      indentalign: a.INHERIT,
      indentshift: a.INHERIT,
      indenttarget: a.INHERIT,
      indentalignfirst: a.INHERIT,
      indentshiftfirst: a.INHERIT,
      indentalignlast: a.INHERIT,
      indentshiftlast: a.INHERIT,
      texClass: a.AUTO
    },
    defaultDef: {
      form: a.FORM.INFIX,
      fence: false,
      separator: false,
      lspace: a.LENGTH.THICKMATHSPACE,
      rspace: a.LENGTH.THICKMATHSPACE,
      stretchy: false,
      symmetric: false,
      maxsize: a.SIZE.INFINITY,
      minsize: '0em',
      largeop: false,
      movablelimits: false,
      accent: false,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: '1ex',
      linebreakstyle: 'before',
      indentalign: a.INDENTALIGN.AUTO,
      indentshift: '0',
      indenttarget: '',
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      texClass: a.TEXCLASS.REL
    },
    SPACE_ATTR: { lspace: 1, rspace: 2 },
    useMMLspacing: 3,
    hasMMLspacing: function() {
      if (this.useMMLspacing) {
        return true;
      }
      return this.form && (this.OPTABLE[this.form] || {})[this.data.join('')];
    },
    autoDefault: function(g, n) {
      var l = this.def;
      if (!l) {
        if (g === 'form') {
          return this.getForm();
        }
        var k = this.data.join('');
        var f = [this.Get('form'), a.FORM.INFIX, a.FORM.POSTFIX, a.FORM.PREFIX];
        for (var h = 0, e = f.length; h < e; h++) {
          var j = this.OPTABLE[f[h]][k];
          if (j) {
            l = this.makeDef(j);
            break;
          }
        }
        if (!l) {
          l = this.CheckRange(k);
        }
        if (!l && n) {
          l = {};
        } else {
          if (!l) {
            l = MathJax.Hub.Insert({}, this.defaultDef);
          }
          if (this.parent) {
            this.def = l;
          } else {
            l = MathJax.Hub.Insert({}, l);
          }
          l.form = f[0];
        }
      }
      this.useMMLspacing &= ~(this.SPACE_ATTR[g] || 0);
      if (l[g] != null) {
        return l[g];
      } else {
        if (!n) {
          return this.defaultDef[g];
        }
      }
      return '';
    },
    CheckRange: function(j) {
      var k = j.charCodeAt(0);
      if (k >= 55296 && k < 56320) {
        k = ((k - 55296) << 10) + (j.charCodeAt(1) - 56320) + 65536;
      }
      for (
        var g = 0, e = this.RANGES.length;
        g < e && this.RANGES[g][0] <= k;
        g++
      ) {
        if (k <= this.RANGES[g][1]) {
          if (this.RANGES[g][3]) {
            var f = a.optableDir + '/' + this.RANGES[g][3] + '.js';
            this.RANGES[g][3] = null;
            MathJax.Hub.RestartAfter(MathJax.Ajax.Require(f));
          }
          var h = a.TEXCLASSNAMES[this.RANGES[g][2]];
          h = this.OPTABLE.infix[j] = a.mo.OPTYPES[h === 'BIN' ? 'BIN3' : h];
          return this.makeDef(h);
        }
      }
      return null;
    },
    makeDef: function(f) {
      if (f[2] == null) {
        f[2] = this.defaultDef.texClass;
      }
      if (!f[3]) {
        f[3] = {};
      }
      var e = MathJax.Hub.Insert({}, f[3]);
      e.lspace = this.SPACE[f[0]];
      e.rspace = this.SPACE[f[1]];
      e.texClass = f[2];
      if (
        e.texClass === a.TEXCLASS.REL &&
        (this.movablelimits || this.data.join('').match(/^[a-z]+$/i))
      ) {
        e.texClass = a.TEXCLASS.OP;
      }
      return e;
    },
    getForm: function() {
      var e = this,
        g = this.parent,
        f = this.Parent();
      while (f && f.isEmbellished()) {
        e = g;
        g = f.parent;
        f = f.Parent();
      }
      if (g && g.type === 'mrow' && g.NonSpaceLength() !== 1) {
        if (g.FirstNonSpace() === e) {
          return a.FORM.PREFIX;
        }
        if (g.LastNonSpace() === e) {
          return a.FORM.POSTFIX;
        }
      }
      return a.FORM.INFIX;
    },
    isEmbellished: function() {
      return true;
    },
    hasNewline: function() {
      return this.Get('linebreak') === a.LINEBREAK.NEWLINE;
    },
    CoreParent: function() {
      var e = this;
      while (e && e.isEmbellished() && e.CoreMO() === this && !e.isa(a.math)) {
        e = e.Parent();
      }
      return e;
    },
    CoreText: function(e) {
      if (!e) {
        return '';
      }
      if (e.isEmbellished()) {
        return e.CoreMO().data.join('');
      }
      while (
        (((e.isa(a.mrow) ||
          e.isa(a.TeXAtom) ||
          e.isa(a.mstyle) ||
          e.isa(a.mphantom)) &&
          e.data.length === 1) ||
          e.isa(a.munderover)) &&
        e.data[0]
      ) {
        e = e.data[0];
      }
      if (!e.isToken) {
        return '';
      } else {
        return e.data.join('');
      }
    },
    remapChars: {
      '*': '\u2217',
      '"': '\u2033',
      '\u00B0': '\u2218',
      '\u00B2': '2',
      '\u00B3': '3',
      '\u00B4': '\u2032',
      '\u00B9': '1'
    },
    remap: function(f, e) {
      f = f.replace(/-/g, '\u2212');
      if (e) {
        f = f.replace(/'/g, '\u2032').replace(/`/g, '\u2035');
        if (f.length === 1) {
          f = e[f] || f;
        }
      }
      return f;
    },
    setTeXclass: function(f) {
      var e = this.getValues('form', 'lspace', 'rspace', 'fence');
      if (this.hasMMLspacing()) {
        this.texClass = a.TEXCLASS.NONE;
        return this;
      }
      if (e.fence && !this.texClass) {
        if (e.form === a.FORM.PREFIX) {
          this.texClass = a.TEXCLASS.OPEN;
        }
        if (e.form === a.FORM.POSTFIX) {
          this.texClass = a.TEXCLASS.CLOSE;
        }
      }
      this.texClass = this.Get('texClass');
      if (this.data.join('') === '\u2061') {
        if (f) {
          f.texClass = a.TEXCLASS.OP;
          f.fnOP = true;
        }
        this.texClass = this.prevClass = a.TEXCLASS.NONE;
        return f;
      }
      return this.adjustTeXclass(f);
    },
    adjustTeXclass: function(f) {
      if (this.texClass === a.TEXCLASS.NONE) {
        return f;
      }
      if (f) {
        if (
          f.autoOP &&
          (this.texClass === a.TEXCLASS.BIN || this.texClass === a.TEXCLASS.REL)
        ) {
          f.texClass = a.TEXCLASS.ORD;
        }
        this.prevClass = f.texClass || a.TEXCLASS.ORD;
        this.prevLevel = f.Get('scriptlevel');
      } else {
        this.prevClass = a.TEXCLASS.NONE;
      }
      if (
        this.texClass === a.TEXCLASS.BIN &&
        (this.prevClass === a.TEXCLASS.NONE ||
          this.prevClass === a.TEXCLASS.BIN ||
          this.prevClass === a.TEXCLASS.OP ||
          this.prevClass === a.TEXCLASS.REL ||
          this.prevClass === a.TEXCLASS.OPEN ||
          this.prevClass === a.TEXCLASS.PUNCT)
      ) {
        this.texClass = a.TEXCLASS.ORD;
      } else {
        if (
          this.prevClass === a.TEXCLASS.BIN &&
          (this.texClass === a.TEXCLASS.REL ||
            this.texClass === a.TEXCLASS.CLOSE ||
            this.texClass === a.TEXCLASS.PUNCT)
        ) {
          f.texClass = this.prevClass = a.TEXCLASS.ORD;
        } else {
          if (this.texClass === a.TEXCLASS.BIN) {
            var g = this,
              e = this.parent;
            while (
              e &&
              e.parent &&
              e.isEmbellished() &&
              (e.data.length === 1 || (e.type !== 'mrow' && e.Core() === g))
            ) {
              g = e;
              e = e.parent;
            }
            if (e.data[e.data.length - 1] === g) {
              this.texClass = a.TEXCLASS.ORD;
            }
          }
        }
      }
      return this;
    }
  });
  a.mtext = a.mbase.Subclass({
    type: 'mtext',
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mspace = a.mbase.Subclass({
    type: 'mspace',
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: '0em',
      height: '0ex',
      depth: '0ex',
      linebreak: a.LINEBREAK.AUTO
    },
    hasDimAttr: function() {
      return (
        this.hasValue('width') ||
        this.hasValue('height') ||
        this.hasValue('depth')
      );
    },
    hasNewline: function() {
      return (
        !this.hasDimAttr() && this.Get('linebreak') === a.LINEBREAK.NEWLINE
      );
    }
  });
  a.ms = a.mbase.Subclass({
    type: 'ms',
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      lquote: '"',
      rquote: '"'
    }
  });
  a.mglyph = a.mbase.Subclass({
    type: 'mglyph',
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      alt: '',
      src: '',
      width: a.AUTO,
      height: a.AUTO,
      valign: '0em'
    }
  });
  a.mrow = a.mbase.Subclass({
    type: 'mrow',
    isSpacelike: a.mbase.childrenSpacelike,
    inferred: false,
    notParent: false,
    isEmbellished: function() {
      var f = false;
      for (var g = 0, e = this.data.length; g < e; g++) {
        if (this.data[g] == null) {
          continue;
        }
        if (this.data[g].isEmbellished()) {
          if (f) {
            return false;
          }
          f = true;
          this.core = g;
        } else {
          if (!this.data[g].isSpacelike()) {
            return false;
          }
        }
      }
      return f;
    },
    NonSpaceLength: function() {
      var g = 0;
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          g++;
        }
      }
      return g;
    },
    FirstNonSpace: function() {
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          return this.data[f];
        }
      }
      return null;
    },
    LastNonSpace: function() {
      for (var e = this.data.length - 1; e >= 0; e--) {
        if (this.data[0] && !this.data[e].isSpacelike()) {
          return this.data[e];
        }
      }
      return null;
    },
    Core: function() {
      if (!this.isEmbellished() || typeof this.core === 'undefined') {
        return this;
      }
      return this.data[this.core];
    },
    CoreMO: function() {
      if (!this.isEmbellished() || typeof this.core === 'undefined') {
        return this;
      }
      return this.data[this.core].CoreMO();
    },
    toString: function() {
      if (this.inferred) {
        return '[' + this.data.join(',') + ']';
      }
      return this.SUPER(arguments).toString.call(this);
    },
    setTeXclass: function(g) {
      var f,
        e = this.data.length;
      if ((this.open || this.close) && (!g || !g.fnOP)) {
        this.getPrevClass(g);
        g = null;
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (!this.hasOwnProperty('texClass')) {
          this.texClass = a.TEXCLASS.INNER;
        }
        return this;
      } else {
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (this.data[0]) {
          this.updateTeXclass(this.data[0]);
        }
        return g;
      }
    },
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.mfrac = a.mbase.Subclass({
    type: 'mfrac',
    num: 0,
    den: 1,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      linethickness: a.LINETHICKNESS.MEDIUM,
      numalign: a.ALIGN.CENTER,
      denomalign: a.ALIGN.CENTER,
      bevelled: false
    },
    adjustChild_displaystyle: function(e) {
      return false;
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get('scriptlevel');
      if (!this.Get('displaystyle') || e > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e == this.den) {
        return true;
      }
      return this.Get('texprimestyle');
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msqrt = a.mbase.Subclass({
    type: 'msqrt',
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    setTeXclass: a.mbase.setSeparateTeXclasses,
    adjustChild_texprimestyle: function(e) {
      return true;
    }
  });
  a.mroot = a.mbase.Subclass({
    type: 'mroot',
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    adjustChild_displaystyle: function(e) {
      if (e === 1) {
        return false;
      }
      return this.Get('displaystyle');
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get('scriptlevel');
      if (f === 1) {
        e += 2;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === 0) {
        return true;
      }
      return this.Get('texprimestyle');
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mstyle = a.mbase.Subclass({
    type: 'mstyle',
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    inferRow: true,
    defaults: {
      scriptlevel: a.INHERIT,
      displaystyle: a.INHERIT,
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: '8pt',
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      decimalseparator: '.'
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.scriptlevel;
      if (f == null) {
        f = this.Get('scriptlevel');
      } else {
        if (String(f).match(/^ *[-+]/)) {
          var e = this.Get('scriptlevel', null, true);
          f = e + parseInt(f);
        }
      }
      return f;
    },
    inheritFromMe: true,
    noInherit: {
      mpadded: {
        width: true,
        height: true,
        depth: true,
        lspace: true,
        voffset: true
      },
      mtable: { width: true, height: true, depth: true, align: true }
    },
    getRemoved: {
      fontfamily: 'fontFamily',
      fontweight: 'fontWeight',
      fontstyle: 'fontStyle',
      fontsize: 'fontSize'
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.merror = a.mbase.Subclass({
    type: 'merror',
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD
  });
  a.mpadded = a.mbase.Subclass({
    type: 'mpadded',
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: '',
      height: '',
      depth: '',
      lspace: 0,
      voffset: 0
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mphantom = a.mbase.Subclass({
    type: 'mphantom',
    texClass: a.TEXCLASS.ORD,
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mfenced = a.mbase.Subclass({
    type: 'mfenced',
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      open: '(',
      close: ')',
      separators: ','
    },
    addFakeNodes: function() {
      var f = this.getValues('open', 'close', 'separators');
      f.open = f.open.replace(/[ \t\n\r]/g, '');
      f.close = f.close.replace(/[ \t\n\r]/g, '');
      f.separators = f.separators.replace(/[ \t\n\r]/g, '');
      if (f.open !== '') {
        this.SetData(
          'open',
          a
            .mo(f.open)
            .With({
              fence: true,
              form: a.FORM.PREFIX,
              texClass: a.TEXCLASS.OPEN
            })
        );
      }
      if (f.separators !== '') {
        while (f.separators.length < this.data.length) {
          f.separators += f.separators.charAt(f.separators.length - 1);
        }
        for (var g = 1, e = this.data.length; g < e; g++) {
          if (this.data[g]) {
            this.SetData(
              'sep' + g,
              a.mo(f.separators.charAt(g - 1)).With({ separator: true })
            );
          }
        }
      }
      if (f.close !== '') {
        this.SetData(
          'close',
          a
            .mo(f.close)
            .With({
              fence: true,
              form: a.FORM.POSTFIX,
              texClass: a.TEXCLASS.CLOSE
            })
        );
      }
    },
    texClass: a.TEXCLASS.OPEN,
    setTeXclass: function(g) {
      this.addFakeNodes();
      this.getPrevClass(g);
      if (this.data.open) {
        g = this.data.open.setTeXclass(g);
      }
      if (this.data[0]) {
        g = this.data[0].setTeXclass(g);
      }
      for (var f = 1, e = this.data.length; f < e; f++) {
        if (this.data['sep' + f]) {
          g = this.data['sep' + f].setTeXclass(g);
        }
        if (this.data[f]) {
          g = this.data[f].setTeXclass(g);
        }
      }
      if (this.data.close) {
        g = this.data.close.setTeXclass(g);
      }
      this.updateTeXclass(this.data.open);
      this.texClass = a.TEXCLASS.INNER;
      return g;
    }
  });
  a.menclose = a.mbase.Subclass({
    type: 'menclose',
    inferRow: true,
    linebreakContainer: true,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      notation: a.NOTATION.LONGDIV,
      texClass: a.TEXCLASS.ORD
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msubsup = a.mbase.Subclass({
    type: 'msubsup',
    base: 0,
    sub: 1,
    sup: 2,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      subscriptshift: '',
      superscriptshift: '',
      texClass: a.AUTO
    },
    autoDefault: function(e) {
      if (e === 'texClass') {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      return 0;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get('displaystyle');
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get('scriptlevel');
      if (f > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.sub) {
        return true;
      }
      return this.Get('texprimestyle');
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.msub = a.msubsup.Subclass({ type: 'msub' });
  a.msup = a.msubsup.Subclass({ type: 'msup', sub: 2, sup: 1 });
  a.mmultiscripts = a.msubsup.Subclass({
    type: 'mmultiscripts',
    adjustChild_texprimestyle: function(e) {
      if (e % 2 === 1) {
        return true;
      }
      return this.Get('texprimestyle');
    }
  });
  a.mprescripts = a.mbase.Subclass({ type: 'mprescripts' });
  a.none = a.mbase.Subclass({ type: 'none' });
  a.munderover = a.mbase.Subclass({
    type: 'munderover',
    base: 0,
    under: 1,
    over: 2,
    sub: 1,
    sup: 2,
    ACCENTS: ['', 'accentunder', 'accent'],
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      accent: a.AUTO,
      accentunder: a.AUTO,
      align: a.ALIGN.CENTER,
      texClass: a.AUTO,
      subscriptshift: '',
      superscriptshift: ''
    },
    autoDefault: function(e) {
      if (e === 'texClass') {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      if (e === 'accent' && this.data[this.over]) {
        return this.data[this.over].CoreMO().Get('accent');
      }
      if (e === 'accentunder' && this.data[this.under]) {
        return this.data[this.under].CoreMO().Get('accent');
      }
      return false;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get('displaystyle');
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.Get('scriptlevel');
      var e =
        this.data[this.base] &&
        !this.Get('displaystyle') &&
        this.data[this.base].CoreMO().Get('movablelimits');
      if (g == this.under && (e || !this.Get('accentunder'))) {
        f++;
      }
      if (g == this.over && (e || !this.Get('accent'))) {
        f++;
      }
      return f;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.base && this.data[this.over]) {
        return true;
      }
      return this.Get('texprimestyle');
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.munder = a.munderover.Subclass({ type: 'munder' });
  a.mover = a.munderover.Subclass({
    type: 'mover',
    over: 1,
    under: 2,
    sup: 1,
    sub: 2,
    ACCENTS: ['', 'accent', 'accentunder']
  });
  a.mtable = a.mbase.Subclass({
    type: 'mtable',
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      align: a.ALIGN.AXIS,
      rowalign: a.ALIGN.BASELINE,
      columnalign: a.ALIGN.CENTER,
      groupalign: '{left}',
      alignmentscope: true,
      columnwidth: a.WIDTH.AUTO,
      width: a.WIDTH.AUTO,
      rowspacing: '1ex',
      columnspacing: '.8em',
      rowlines: a.LINES.NONE,
      columnlines: a.LINES.NONE,
      frame: a.LINES.NONE,
      framespacing: '0.4em 0.5ex',
      equalrows: false,
      equalcolumns: false,
      displaystyle: false,
      side: a.SIDE.RIGHT,
      minlabelspacing: '0.8em',
      texClass: a.TEXCLASS.ORD,
      useHeight: 1
    },
    adjustChild_displaystyle: function() {
      return this.displaystyle != null
        ? this.displaystyle
        : this.defaults.displaystyle;
    },
    inheritFromMe: true,
    noInherit: {
      mover: { align: true },
      munder: { align: true },
      munderover: { align: true },
      mtable: {
        align: true,
        rowalign: true,
        columnalign: true,
        groupalign: true,
        alignmentscope: true,
        columnwidth: true,
        width: true,
        rowspacing: true,
        columnspacing: true,
        rowlines: true,
        columnlines: true,
        frame: true,
        framespacing: true,
        equalrows: true,
        equalcolumns: true,
        displaystyle: true,
        side: true,
        minlabelspacing: true,
        texClass: true,
        useHeight: 1
      }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (
          !(
            arguments[f] instanceof a.mtr ||
            arguments[f] instanceof a.mlabeledtr
          )
        ) {
          arguments[f] = a.mtr(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtr = a.mbase.Subclass({
    type: 'mtr',
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: {
      mrow: { rowalign: true, columnalign: true, groupalign: true },
      mtable: { rowalign: true, columnalign: true, groupalign: true }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (!(arguments[f] instanceof a.mtd)) {
          arguments[f] = a.mtd(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtd = a.mbase.Subclass({
    type: 'mtd',
    inferRow: true,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowspan: 1,
      columnspan: 1,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.maligngroup = a.mbase.Subclass({
    type: 'maligngroup',
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: { mrow: { groupalign: true }, mtable: { groupalign: true } }
  });
  a.malignmark = a.mbase.Subclass({
    type: 'malignmark',
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      edge: a.SIDE.LEFT
    },
    isSpacelike: function() {
      return true;
    }
  });
  a.mlabeledtr = a.mtr.Subclass({ type: 'mlabeledtr' });
  a.maction = a.mbase.Subclass({
    type: 'maction',
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      actiontype: a.ACTIONTYPE.TOGGLE,
      selection: 1
    },
    selected: function() {
      return this.data[this.Get('selection') - 1] || a.NULL;
    },
    isEmbellished: function() {
      return this.selected().isEmbellished();
    },
    isSpacelike: function() {
      return this.selected().isSpacelike();
    },
    Core: function() {
      return this.selected().Core();
    },
    CoreMO: function() {
      return this.selected().CoreMO();
    },
    setTeXclass: function(f) {
      if (this.Get('actiontype') === a.ACTIONTYPE.TOOLTIP && this.data[1]) {
        this.data[1].setTeXclass();
      }
      var e = this.selected();
      f = e.setTeXclass(f);
      this.updateTeXclass(e);
      return f;
    }
  });
  a.semantics = a.mbase.Subclass({
    type: 'semantics',
    notParent: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: { definitionURL: null, encoding: null },
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(g) {
      var l = MathJax.Hub.config.MathMenu.semanticsAnnotations[g];
      if (l) {
        for (var h = 0, e = this.data.length; h < e; h++) {
          var k = this.data[h].Get('encoding');
          if (k) {
            for (var f = 0, o = l.length; f < o; f++) {
              if (l[f] === k) {
                return this.data[h];
              }
            }
          }
        }
      }
      return null;
    }
  });
  a.annotation = a.mbase.Subclass({
    type: 'annotation',
    isChars: true,
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: 'mathmlkeys',
      name: '',
      src: null
    }
  });
  a['annotation-xml'] = a.mbase.Subclass({
    type: 'annotation-xml',
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: 'mathmlkeys',
      name: '',
      src: null
    }
  });
  a.math = a.mstyle.Subclass({
    type: 'math',
    defaults: {
      mathvariant: a.VARIANT.NORMAL,
      mathsize: a.SIZE.NORMAL,
      mathcolor: '',
      mathbackground: a.COLOR.TRANSPARENT,
      dir: 'ltr',
      scriptlevel: 0,
      displaystyle: a.AUTO,
      display: 'inline',
      maxwidth: '',
      overflow: a.OVERFLOW.LINEBREAK,
      altimg: '',
      'altimg-width': '',
      'altimg-height': '',
      'altimg-valign': '',
      alttext: '',
      cdgroup: '',
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: '8px',
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      lineleading: '1ex',
      indentshift: 'auto',
      indentalign: a.INDENTALIGN.AUTO,
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      decimalseparator: '.',
      texprimestyle: false
    },
    autoDefault: function(e) {
      if (e === 'displaystyle') {
        return this.Get('display') === 'block';
      }
      return '';
    },
    linebreakContainer: true,
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.chars = a.mbase.Subclass({
    type: 'chars',
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      return this.data.join('');
    },
    toString: function() {
      return this.data.join('');
    }
  });
  a.entity = a.mbase.Subclass({
    type: 'entity',
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      if (this.data[0].substr(0, 2) === '#x') {
        return parseInt(this.data[0].substr(2), 16);
      } else {
        if (this.data[0].substr(0, 1) === '#') {
          return parseInt(this.data[0].substr(1));
        } else {
          return 0;
        }
      }
    },
    toString: function() {
      var e = this.value();
      if (e <= 65535) {
        return String.fromCharCode(e);
      }
      e -= 65536;
      return (
        String.fromCharCode((e >> 10) + 55296) +
        String.fromCharCode((e & 1023) + 56320)
      );
    }
  });
  a.xml = a.mbase.Subclass({
    type: 'xml',
    Init: function() {
      this.div = document.createElement('div');
      return this.SUPER(arguments).Init.apply(this, arguments);
    },
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        var g = this.Import(arguments[f]);
        this.data.push(g);
        this.div.appendChild(g);
      }
    },
    Import: function(j) {
      if (document.importNode) {
        return document.importNode(j, true);
      }
      var f, g, e;
      if (j.nodeType === 1) {
        f = document.createElement(j.nodeName);
        for (g = 0, e = j.attributes.length; g < e; g++) {
          var h = j.attributes[g];
          if (h.specified && h.nodeValue != null && h.nodeValue != '') {
            f.setAttribute(h.nodeName, h.nodeValue);
          }
          if (h.nodeName === 'style') {
            f.style.cssText = h.nodeValue;
          }
        }
        if (j.className) {
          f.className = j.className;
        }
      } else {
        if (j.nodeType === 3 || j.nodeType === 4) {
          f = document.createTextNode(j.nodeValue);
        } else {
          if (j.nodeType === 8) {
            f = document.createComment(j.nodeValue);
          } else {
            return document.createTextNode('');
          }
        }
      }
      for (g = 0, e = j.childNodes.length; g < e; g++) {
        f.appendChild(this.Import(j.childNodes[g]));
      }
      return f;
    },
    value: function() {
      return this.div;
    },
    toString: function() {
      return this.div.innerHTML;
    }
  });
  a.TeXAtom = a.mbase.Subclass({
    type: 'texatom',
    linebreakContainer: true,
    inferRow: true,
    notParent: true,
    texClass: a.TEXCLASS.ORD,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    isEmbellished: a.mbase.childEmbellished,
    setTeXclass: function(e) {
      this.data[0].setTeXclass();
      return this.adjustTeXclass(e);
    },
    adjustTeXclass: a.mo.prototype.adjustTeXclass
  });
  a.NULL = a.mbase().With({ type: 'null' });
  var b = a.TEXCLASS;
  var d = {
    ORD: [0, 0, b.ORD],
    ORD11: [1, 1, b.ORD],
    ORD21: [2, 1, b.ORD],
    ORD02: [0, 2, b.ORD],
    ORD55: [5, 5, b.ORD],
    OP: [1, 2, b.OP, { largeop: true, movablelimits: true, symmetric: true }],
    OPFIXED: [1, 2, b.OP, { largeop: true, movablelimits: true }],
    INTEGRAL: [0, 1, b.OP, { largeop: true, symmetric: true }],
    INTEGRAL2: [1, 2, b.OP, { largeop: true, symmetric: true }],
    BIN3: [3, 3, b.BIN],
    BIN4: [4, 4, b.BIN],
    BIN01: [0, 1, b.BIN],
    BIN5: [5, 5, b.BIN],
    TALLBIN: [4, 4, b.BIN, { stretchy: true }],
    BINOP: [4, 4, b.BIN, { largeop: true, movablelimits: true }],
    REL: [5, 5, b.REL],
    REL1: [1, 1, b.REL, { stretchy: true }],
    REL4: [4, 4, b.REL],
    RELSTRETCH: [5, 5, b.REL, { stretchy: true }],
    RELACCENT: [5, 5, b.REL, { accent: true }],
    WIDEREL: [5, 5, b.REL, { accent: true, stretchy: true }],
    OPEN: [0, 0, b.OPEN, { fence: true, stretchy: true, symmetric: true }],
    CLOSE: [0, 0, b.CLOSE, { fence: true, stretchy: true, symmetric: true }],
    INNER: [0, 0, b.INNER],
    PUNCT: [0, 3, b.PUNCT],
    ACCENT: [0, 0, b.ORD, { accent: true }],
    WIDEACCENT: [0, 0, b.ORD, { accent: true, stretchy: true }]
  };
  a.mo.Augment(
    {
      SPACE: [
        '0em',
        '0.1111em',
        '0.1667em',
        '0.2222em',
        '0.2667em',
        '0.3333em'
      ],
      RANGES: [
        [32, 127, b.REL, 'BasicLatin'],
        [160, 255, b.ORD, 'Latin1Supplement'],
        [256, 383, b.ORD],
        [384, 591, b.ORD],
        [688, 767, b.ORD, 'SpacingModLetters'],
        [768, 879, b.ORD, 'CombDiacritMarks'],
        [880, 1023, b.ORD, 'GreekAndCoptic'],
        [7680, 7935, b.ORD],
        [8192, 8303, b.PUNCT, 'GeneralPunctuation'],
        [8304, 8351, b.ORD],
        [8352, 8399, b.ORD],
        [8400, 8447, b.ORD, 'CombDiactForSymbols'],
        [8448, 8527, b.ORD, 'LetterlikeSymbols'],
        [8528, 8591, b.ORD],
        [8592, 8703, b.REL, 'Arrows'],
        [8704, 8959, b.BIN, 'MathOperators'],
        [8960, 9215, b.ORD, 'MiscTechnical'],
        [9312, 9471, b.ORD],
        [9472, 9631, b.ORD],
        [9632, 9727, b.ORD, 'GeometricShapes'],
        [9984, 10175, b.ORD, 'Dingbats'],
        [10176, 10223, b.ORD, 'MiscMathSymbolsA'],
        [10224, 10239, b.REL, 'SupplementalArrowsA'],
        [10496, 10623, b.REL, 'SupplementalArrowsB'],
        [10624, 10751, b.ORD, 'MiscMathSymbolsB'],
        [10752, 11007, b.BIN, 'SuppMathOperators'],
        [11008, 11263, b.ORD, 'MiscSymbolsAndArrows'],
        [119808, 120831, b.ORD]
      ],
      OPTABLE: {
        prefix: {
          '\u2200': d.ORD21,
          '\u2202': d.ORD21,
          '\u2203': d.ORD21,
          '\u2207': d.ORD21,
          '\u220F': d.OP,
          '\u2210': d.OP,
          '\u2211': d.OP,
          '\u2212': d.BIN01,
          '\u2213': d.BIN01,
          '\u221A': [1, 1, b.ORD, { stretchy: true }],
          '\u2220': d.ORD,
          '\u222B': d.INTEGRAL,
          '\u222E': d.INTEGRAL,
          '\u22C0': d.OP,
          '\u22C1': d.OP,
          '\u22C2': d.OP,
          '\u22C3': d.OP,
          '\u2308': d.OPEN,
          '\u230A': d.OPEN,
          '\u27E8': d.OPEN,
          '\u27EE': d.OPEN,
          '\u2A00': d.OP,
          '\u2A01': d.OP,
          '\u2A02': d.OP,
          '\u2A04': d.OP,
          '\u2A06': d.OP,
          '\u00AC': d.ORD21,
          '\u00B1': d.BIN01,
          '(': d.OPEN,
          '+': d.BIN01,
          '-': d.BIN01,
          '[': d.OPEN,
          '{': d.OPEN,
          '|': d.OPEN
        },
        postfix: {
          '!': [1, 0, b.CLOSE],
          '&': d.ORD,
          '\u2032': d.ORD02,
          '\u203E': d.WIDEACCENT,
          '\u2309': d.CLOSE,
          '\u230B': d.CLOSE,
          '\u23DE': d.WIDEACCENT,
          '\u23DF': d.WIDEACCENT,
          '\u266D': d.ORD02,
          '\u266E': d.ORD02,
          '\u266F': d.ORD02,
          '\u27E9': d.CLOSE,
          '\u27EF': d.CLOSE,
          ˆ: d.WIDEACCENT,
          ˇ: d.WIDEACCENT,
          ˉ: d.WIDEACCENT,
          ˊ: d.ACCENT,
          ˋ: d.ACCENT,
          '\u02D8': d.ACCENT,
          '\u02D9': d.ACCENT,
          '\u02DC': d.WIDEACCENT,
          '\u0302': d.WIDEACCENT,
          '\u00A8': d.ACCENT,
          '\u00AF': d.WIDEACCENT,
          ')': d.CLOSE,
          ']': d.CLOSE,
          '^': d.WIDEACCENT,
          _: d.WIDEACCENT,
          '`': d.ACCENT,
          '|': d.CLOSE,
          '}': d.CLOSE,
          '~': d.WIDEACCENT
        },
        infix: {
          '': d.ORD,
          '%': [3, 3, b.ORD],
          '\u2022': d.BIN4,
          '\u2026': d.INNER,
          '\u2044': d.TALLBIN,
          '\u2061': d.ORD,
          '\u2062': d.ORD,
          '\u2063': [0, 0, b.ORD, { linebreakstyle: 'after', separator: true }],
          '\u2064': d.ORD,
          '\u2190': d.WIDEREL,
          '\u2191': d.RELSTRETCH,
          '\u2192': d.WIDEREL,
          '\u2193': d.RELSTRETCH,
          '\u2194': d.WIDEREL,
          '\u2195': d.RELSTRETCH,
          '\u2196': d.RELSTRETCH,
          '\u2197': d.RELSTRETCH,
          '\u2198': d.RELSTRETCH,
          '\u2199': d.RELSTRETCH,
          '\u21A6': d.WIDEREL,
          '\u21A9': d.WIDEREL,
          '\u21AA': d.WIDEREL,
          '\u21BC': d.WIDEREL,
          '\u21BD': d.WIDEREL,
          '\u21C0': d.WIDEREL,
          '\u21C1': d.WIDEREL,
          '\u21CC': d.WIDEREL,
          '\u21D0': d.WIDEREL,
          '\u21D1': d.RELSTRETCH,
          '\u21D2': d.WIDEREL,
          '\u21D3': d.RELSTRETCH,
          '\u21D4': d.WIDEREL,
          '\u21D5': d.RELSTRETCH,
          '\u2208': d.REL,
          '\u2209': d.REL,
          '\u220B': d.REL,
          '\u2212': d.BIN4,
          '\u2213': d.BIN4,
          '\u2215': d.TALLBIN,
          '\u2216': d.BIN4,
          '\u2217': d.BIN4,
          '\u2218': d.BIN4,
          '\u2219': d.BIN4,
          '\u221D': d.REL,
          '\u2223': d.REL,
          '\u2225': d.REL,
          '\u2227': d.BIN4,
          '\u2228': d.BIN4,
          '\u2229': d.BIN4,
          '\u222A': d.BIN4,
          '\u223C': d.REL,
          '\u2240': d.BIN4,
          '\u2243': d.REL,
          '\u2245': d.REL,
          '\u2248': d.REL,
          '\u224D': d.REL,
          '\u2250': d.REL,
          '\u2260': d.REL,
          '\u2261': d.REL,
          '\u2264': d.REL,
          '\u2265': d.REL,
          '\u226A': d.REL,
          '\u226B': d.REL,
          '\u227A': d.REL,
          '\u227B': d.REL,
          '\u2282': d.REL,
          '\u2283': d.REL,
          '\u2286': d.REL,
          '\u2287': d.REL,
          '\u228E': d.BIN4,
          '\u2291': d.REL,
          '\u2292': d.REL,
          '\u2293': d.BIN4,
          '\u2294': d.BIN4,
          '\u2295': d.BIN4,
          '\u2296': d.BIN4,
          '\u2297': d.BIN4,
          '\u2298': d.BIN4,
          '\u2299': d.BIN4,
          '\u22A2': d.REL,
          '\u22A3': d.REL,
          '\u22A4': d.ORD55,
          '\u22A5': d.REL,
          '\u22A8': d.REL,
          '\u22C4': d.BIN4,
          '\u22C5': d.BIN4,
          '\u22C6': d.BIN4,
          '\u22C8': d.REL,
          '\u22EE': d.ORD55,
          '\u22EF': d.INNER,
          '\u22F1': [5, 5, b.INNER],
          '\u25B3': d.BIN4,
          '\u25B5': d.BIN4,
          '\u25B9': d.BIN4,
          '\u25BD': d.BIN4,
          '\u25BF': d.BIN4,
          '\u25C3': d.BIN4,
          '\u2758': d.REL,
          '\u27F5': d.WIDEREL,
          '\u27F6': d.WIDEREL,
          '\u27F7': d.WIDEREL,
          '\u27F8': d.WIDEREL,
          '\u27F9': d.WIDEREL,
          '\u27FA': d.WIDEREL,
          '\u27FC': d.WIDEREL,
          '\u2A2F': d.BIN4,
          '\u2A3F': d.BIN4,
          '\u2AAF': d.REL,
          '\u2AB0': d.REL,
          '\u00B1': d.BIN4,
          '\u00B7': d.BIN4,
          '\u00D7': d.BIN4,
          '\u00F7': d.BIN4,
          '*': d.BIN3,
          '+': d.BIN4,
          ',': [0, 3, b.PUNCT, { linebreakstyle: 'after', separator: true }],
          '-': d.BIN4,
          '.': [3, 3, b.ORD],
          '/': d.ORD11,
          ':': [1, 2, b.REL],
          ';': [0, 3, b.PUNCT, { linebreakstyle: 'after', separator: true }],
          '<': d.REL,
          '=': d.REL,
          '>': d.REL,
          '?': [1, 1, b.CLOSE],
          '\\': d.ORD,
          '^': d.ORD11,
          _: d.ORD11,
          '|': [2, 2, b.ORD, { fence: true, stretchy: true, symmetric: true }],
          '#': d.ORD,
          $: d.ORD,
          '\u002E': [0, 3, b.PUNCT, { separator: true }],
          ʹ: d.ORD,
          '\u0300': d.ACCENT,
          '\u0301': d.ACCENT,
          '\u0303': d.WIDEACCENT,
          '\u0304': d.ACCENT,
          '\u0306': d.ACCENT,
          '\u0307': d.ACCENT,
          '\u0308': d.ACCENT,
          '\u030C': d.ACCENT,
          '\u0332': d.WIDEACCENT,
          '\u0338': d.REL4,
          '\u2015': [0, 0, b.ORD, { stretchy: true }],
          '\u2017': [0, 0, b.ORD, { stretchy: true }],
          '\u2020': d.BIN3,
          '\u2021': d.BIN3,
          '\u20D7': d.ACCENT,
          ℑ: d.ORD,
          ℓ: d.ORD,
          '\u2118': d.ORD,
          ℜ: d.ORD,
          '\u2205': d.ORD,
          '\u221E': d.ORD,
          '\u2305': d.BIN3,
          '\u2306': d.BIN3,
          '\u2322': d.REL4,
          '\u2323': d.REL4,
          '\u2329': d.OPEN,
          '\u232A': d.CLOSE,
          '\u23AA': d.ORD,
          '\u23AF': [0, 0, b.ORD, { stretchy: true }],
          '\u23B0': d.OPEN,
          '\u23B1': d.CLOSE,
          '\u2500': d.ORD,
          '\u25EF': d.BIN3,
          '\u2660': d.ORD,
          '\u2661': d.ORD,
          '\u2662': d.ORD,
          '\u2663': d.ORD,
          '\u3008': d.OPEN,
          '\u3009': d.CLOSE,
          '\uFE37': d.WIDEACCENT,
          '\uFE38': d.WIDEACCENT
        }
      }
    },
    { OPTYPES: d }
  );
  var c = a.mo.prototype.OPTABLE;
  c.infix['^'] = d.WIDEREL;
  c.infix._ = d.WIDEREL;
  c.prefix['\u2223'] = d.OPEN;
  c.prefix['\u2225'] = d.OPEN;
  c.postfix['\u2223'] = d.CLOSE;
  c.postfix['\u2225'] = d.CLOSE;
})(MathJax.ElementJax.mml);
MathJax.ElementJax.mml.loadComplete('jax.js');
MathJax.Hub.Register.LoadHook('[MathJax]/jax/element/mml/jax.js', function() {
  var c = '2.7.5';
  var a = MathJax.ElementJax.mml,
    b = MathJax.Hub.config.menuSettings;
  a.mbase.Augment({
    toMathML: function(l) {
      var h = this.inferred && this.parent.inferRow;
      if (l == null) {
        l = '';
      }
      var f = this.type,
        e = this.toMathMLattributes();
      if (f === 'mspace') {
        return l + '<' + f + e + ' />';
      }
      var k = [],
        j = this.isToken ? '' : l + (h ? '' : '  ');
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          k.push(this.data[g].toMathML(j));
        } else {
          if (!this.isToken && !this.isChars) {
            k.push(j + '<mrow />');
          }
        }
      }
      if (this.isToken || this.isChars) {
        return l + '<' + f + e + '>' + k.join('') + '</' + f + '>';
      }
      if (h) {
        return k.join('\n');
      }
      if (k.length === 0 || (k.length === 1 && k[0] === '')) {
        return l + '<' + f + e + ' />';
      }
      return l + '<' + f + e + '>\n' + k.join('\n') + '\n' + l + '</' + f + '>';
    },
    toMathMLattributes: function() {
      var j =
        this.type === 'mstyle' ? a.math.prototype.defaults : this.defaults;
      var h = this.attrNames || a.copyAttributeNames,
        g = a.skipAttributes,
        l = a.copyAttributes;
      var e = [];
      if (this.type === 'math' && (!this.attr || !('xmlns' in this.attr))) {
        e.push('xmlns="http://www.w3.org/1998/Math/MathML"');
      }
      if (!this.attrNames) {
        for (var k in j) {
          if (!g[k] && !l[k] && j.hasOwnProperty(k)) {
            if (this[k] != null && this[k] !== j[k]) {
              if (this.Get(k, null, 1) !== this[k]) {
                e.push(k + '="' + this.toMathMLattribute(this[k]) + '"');
              }
            }
          }
        }
      }
      for (var f = 0, d = h.length; f < d; f++) {
        if (l[h[f]] === 1 && !j.hasOwnProperty(h[f])) {
          continue;
        }
        value = (this.attr || {})[h[f]];
        if (value == null) {
          value = this[h[f]];
        }
        if (value != null) {
          e.push(h[f] + '="' + this.toMathMLquote(value) + '"');
        }
      }
      this.toMathMLclass(e);
      if (e.length) {
        return ' ' + e.join(' ');
      } else {
        return '';
      }
    },
    toMathMLclass: function(d) {
      var f = [];
      if (this['class']) {
        f.push(this['class']);
      }
      if (this.isa(a.TeXAtom) && b.texHints) {
        var e = [
          'ORD',
          'OP',
          'BIN',
          'REL',
          'OPEN',
          'CLOSE',
          'PUNCT',
          'INNER',
          'VCENTER'
        ][this.texClass];
        if (e) {
          f.push('MJX-TeXAtom-' + e);
          if (e === 'OP' && !this.movablelimits) {
            f.push('MJX-fixedlimits');
          }
        }
      }
      if (this.mathvariant && this.toMathMLvariants[this.mathvariant]) {
        f.push('MJX' + this.mathvariant);
      }
      if (this.variantForm) {
        f.push('MJX-variant');
      }
      if (f.length) {
        d.unshift('class="' + this.toMathMLquote(f.join(' ')) + '"');
      }
    },
    toMathMLattribute: function(d) {
      if (
        typeof d === 'string' &&
        d.replace(/ /g, '').match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)
      ) {
        return (
          (RegExp.$2 || '') +
          ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, '') +
          'em'
        );
      } else {
        if (this.toMathMLvariants[d]) {
          return this.toMathMLvariants[d];
        }
      }
      return this.toMathMLquote(d);
    },
    toMathMLvariants: {
      '-tex-caligraphic': a.VARIANT.SCRIPT,
      '-tex-caligraphic-bold': a.VARIANT.BOLDSCRIPT,
      '-tex-oldstyle': a.VARIANT.NORMAL,
      '-tex-oldstyle-bold': a.VARIANT.BOLD,
      '-tex-mathit': a.VARIANT.ITALIC
    },
    toMathMLquote: function(f) {
      f = String(f).split('');
      for (var g = 0, d = f.length; g < d; g++) {
        var k = f[g].charCodeAt(0);
        if (k <= 55295 || 57344 <= k) {
          if (k > 126 || (k < 32 && k !== 10 && k !== 13 && k !== 9)) {
            f[g] = '&#x' + k.toString(16).toUpperCase() + ';';
          } else {
            var j = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[
              f[g]
            ];
            if (j) {
              f[g] = j;
            }
          }
        } else {
          if (g + 1 < d) {
            var h = f[g + 1].charCodeAt(0);
            var e = ((k - 55296) << 10) + (h - 56320) + 65536;
            f[g] = '&#x' + e.toString(16).toUpperCase() + ';';
            f[g + 1] = '';
            g++;
          } else {
            f[g] = '';
          }
        }
      }
      return f.join('');
    }
  });
  a.math.Augment({
    toMathML: function(d, e) {
      var g;
      if (d == null) {
        d = '';
      }
      if (e && e.originalText && b.semantics) {
        g = MathJax.InputJax[e.inputJax].annotationEncoding;
      }
      var n = this.data[0] && this.data[0].data.length > 1;
      var p = this.type,
        k = this.toMathMLattributes();
      var j = [],
        o = d + (g ? '  ' + (n ? '  ' : '') : '') + '  ';
      for (var h = 0, f = this.data.length; h < f; h++) {
        if (this.data[h]) {
          j.push(this.data[h].toMathML(o));
        } else {
          j.push(o + '<mrow />');
        }
      }
      if (j.length === 0 || (j.length === 1 && j[0] === '')) {
        if (!g) {
          return '<' + p + k + ' />';
        }
        j.push(o + '<mrow />');
      }
      if (g) {
        if (n) {
          j.unshift(d + '    <mrow>');
          j.push(d + '    </mrow>');
        }
        j.unshift(d + '  <semantics>');
        var l = e.originalText.replace(/[&<>]/g, function(i) {
          return { '>': '&gt;', '<': '&lt;', '&': '&amp;' }[i];
        });
        j.push(
          d +
            '    <annotation encoding="' +
            this.toMathMLquote(g) +
            '">' +
            l +
            '</annotation>'
        );
        j.push(d + '  </semantics>');
      }
      return d + '<' + p + k + '>\n' + j.join('\n') + '\n' + d + '</' + p + '>';
    }
  });
  a.msubsup.Augment({
    toMathML: function(j) {
      var f = this.type;
      if (this.data[this.sup] == null) {
        f = 'msub';
      }
      if (this.data[this.sub] == null) {
        f = 'msup';
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(j + '  '));
        }
      }
      return j + '<' + f + e + '>\n' + h.join('\n') + '\n' + j + '</' + f + '>';
    }
  });
  a.munderover.Augment({
    toMathML: function(k) {
      var f = this.type;
      var j = this.data[this.base];
      if (j && j.isa(a.TeXAtom) && j.movablelimits && !j.Get('displaystyle')) {
        type = 'msubsup';
        if (this.data[this.under] == null) {
          f = 'msup';
        }
        if (this.data[this.over] == null) {
          f = 'msub';
        }
      } else {
        if (this.data[this.under] == null) {
          f = 'mover';
        }
        if (this.data[this.over] == null) {
          f = 'munder';
        }
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(k + '  '));
        }
      }
      return k + '<' + f + e + '>\n' + h.join('\n') + '\n' + k + '</' + f + '>';
    }
  });
  a.TeXAtom.Augment({
    toMathML: function(e) {
      var d = this.toMathMLattributes();
      if (!d && this.data[0].data.length === 1) {
        return e.substr(2) + this.data[0].toMathML(e);
      }
      return (
        e +
        '<mrow' +
        d +
        '>\n' +
        this.data[0].toMathML(e + '  ') +
        '\n' +
        e +
        '</mrow>'
      );
    }
  });
  a.chars.Augment({
    toMathML: function(d) {
      return (d || '') + this.toMathMLquote(this.toString());
    }
  });
  a.entity.Augment({
    toMathML: function(d) {
      return (
        (d || '') +
        '&' +
        this.toMathMLquote(this.data[0]) +
        ';<!-- ' +
        this.toString() +
        ' -->'
      );
    }
  });
  a.xml.Augment({
    toMathML: function(d) {
      return (d || '') + this.toString();
    }
  });
  MathJax.Hub.Register.StartupHook('TeX mathchoice Ready', function() {
    a.TeXmathchoice.Augment({
      toMathML: function(d) {
        return this.Core().toMathML(d);
      }
    });
  });
  MathJax.Hub.Startup.signal.Post('toMathML Ready');
});
MathJax.Ajax.loadComplete('[MathJax]/extensions/toMathML.js');
(function(b, e) {
  var d = '2.7.5';
  var a = b.CombineConfig('TeX.noErrors', {
    disabled: false,
    multiLine: true,
    inlineDelimiters: ['', ''],
    style: {
      'font-size': '90%',
      'text-align': 'left',
      color: 'black',
      padding: '1px 3px',
      border: '1px solid'
    }
  });
  var c = '\u00A0';
  MathJax.Extension['TeX/noErrors'] = { version: d, config: a };
  b.Register.StartupHook('TeX Jax Ready', function() {
    var f = MathJax.InputJax.TeX.formatError;
    MathJax.InputJax.TeX.Augment({
      formatError: function(j, i, k, g) {
        if (a.disabled) {
          return f.apply(this, arguments);
        }
        var h = j.message.replace(/\n.*/, '');
        b.signal.Post(['TeX Jax - parse error', h, i, k, g]);
        var m = a.inlineDelimiters;
        var l = k || a.multiLine;
        if (!k) {
          i = m[0] + i + m[1];
        }
        if (l) {
          i = i.replace(/ /g, c);
        } else {
          i = i.replace(/\n/g, ' ');
        }
        return MathJax.ElementJax.mml
          .merror(i)
          .With({ isError: true, multiLine: l });
      }
    });
  });
  b.Register.StartupHook('HTML-CSS Jax Config', function() {
    b.Config({
      'HTML-CSS': {
        styles: {
          '.MathJax .noError': b.Insert(
            { 'vertical-align': b.Browser.isMSIE && a.multiLine ? '-2px' : '' },
            a.style
          )
        }
      }
    });
  });
  b.Register.StartupHook('HTML-CSS Jax Ready', function() {
    var g = MathJax.ElementJax.mml;
    var h = MathJax.OutputJax['HTML-CSS'];
    var f = g.math.prototype.toHTML,
      i = g.merror.prototype.toHTML;
    g.math.Augment({
      toHTML: function(j, k) {
        var l = this.data[0];
        if (l && l.data[0] && l.data[0].isError) {
          j.style.fontSize = '';
          j = this.HTMLcreateSpan(j);
          j.bbox = l.data[0].toHTML(j).bbox;
        } else {
          j = f.apply(this, arguments);
        }
        return j;
      }
    });
    g.merror.Augment({
      toHTML: function(p) {
        if (!this.isError) {
          return i.apply(this, arguments);
        }
        p = this.HTMLcreateSpan(p);
        p.className = 'noError';
        if (this.multiLine) {
          p.style.display = 'inline-block';
        }
        var r = this.data[0].data[0].data.join('').split(/\n/);
        for (var o = 0, l = r.length; o < l; o++) {
          h.addText(p, r[o]);
          if (o !== l - 1) {
            h.addElement(p, 'br', { isMathJax: true });
          }
        }
        var q = h.getHD(p.parentNode),
          k = h.getW(p.parentNode);
        if (l > 1) {
          var n = (q.h + q.d) / 2,
            j = h.TeX.x_height / 2;
          p.parentNode.style.verticalAlign = h.Em(q.d + (j - n));
          q.h = j + n;
          q.d = n - j;
        }
        p.bbox = { h: q.h, d: q.d, w: k, lw: 0, rw: k };
        return p;
      }
    });
  });
  b.Register.StartupHook('SVG Jax Config', function() {
    b.Config({
      SVG: {
        styles: {
          '.MathJax_SVG .noError': b.Insert(
            { 'vertical-align': b.Browser.isMSIE && a.multiLine ? '-2px' : '' },
            a.style
          )
        }
      }
    });
  });
  b.Register.StartupHook('SVG Jax Ready', function() {
    var g = MathJax.ElementJax.mml;
    var f = g.math.prototype.toSVG,
      h = g.merror.prototype.toSVG;
    g.math.Augment({
      toSVG: function(i, j) {
        var k = this.data[0];
        if (k && k.data[0] && k.data[0].isError) {
          i = k.data[0].toSVG(i);
        } else {
          i = f.apply(this, arguments);
        }
        return i;
      }
    });
    g.merror.Augment({
      toSVG: function(n) {
        if (!this.isError || this.Parent().type !== 'math') {
          return h.apply(this, arguments);
        }
        n = e.addElement(n, 'span', { className: 'noError', isMathJax: true });
        if (this.multiLine) {
          n.style.display = 'inline-block';
        }
        var o = this.data[0].data[0].data.join('').split(/\n/);
        for (var l = 0, j = o.length; l < j; l++) {
          e.addText(n, o[l]);
          if (l !== j - 1) {
            e.addElement(n, 'br', { isMathJax: true });
          }
        }
        if (j > 1) {
          var k = n.offsetHeight / 2;
          n.style.verticalAlign = -k + k / j + 'px';
        }
        return n;
      }
    });
  });
  b.Register.StartupHook('NativeMML Jax Ready', function() {
    var h = MathJax.ElementJax.mml;
    var g = MathJax.Extension['TeX/noErrors'].config;
    var f = h.math.prototype.toNativeMML,
      i = h.merror.prototype.toNativeMML;
    h.math.Augment({
      toNativeMML: function(j) {
        var k = this.data[0];
        if (k && k.data[0] && k.data[0].isError) {
          j = k.data[0].toNativeMML(j);
        } else {
          j = f.apply(this, arguments);
        }
        return j;
      }
    });
    h.merror.Augment({
      toNativeMML: function(n) {
        if (!this.isError) {
          return i.apply(this, arguments);
        }
        n = n.appendChild(document.createElement('span'));
        var o = this.data[0].data[0].data.join('').split(/\n/);
        for (var l = 0, k = o.length; l < k; l++) {
          n.appendChild(document.createTextNode(o[l]));
          if (l !== k - 1) {
            n.appendChild(document.createElement('br'));
          }
        }
        if (this.multiLine) {
          n.style.display = 'inline-block';
          if (k > 1) {
            n.style.verticalAlign = 'middle';
          }
        }
        for (var p in g.style) {
          if (g.style.hasOwnProperty(p)) {
            var j = p.replace(/-./g, function(m) {
              return m.charAt(1).toUpperCase();
            });
            n.style[j] = g.style[p];
          }
        }
        return n;
      }
    });
  });
  b.Register.StartupHook('PreviewHTML Jax Config', function() {
    b.Config({
      PreviewHTML: {
        styles: {
          '.MathJax_PHTML .noError': b.Insert(
            { 'vertical-align': b.Browser.isMSIE && a.multiLine ? '-2px' : '' },
            a.style
          )
        }
      }
    });
  });
  b.Register.StartupHook('PreviewHTML Jax Ready', function() {
    var f = MathJax.ElementJax.mml;
    var h = MathJax.HTML;
    var g = f.merror.prototype.toPreviewHTML;
    f.merror.Augment({
      toPreviewHTML: function(l) {
        if (!this.isError) {
          return g.apply(this, arguments);
        }
        l = this.PHTMLcreateSpan(l);
        l.className = 'noError';
        if (this.multiLine) {
          l.style.display = 'inline-block';
        }
        var n = this.data[0].data[0].data.join('').split(/\n/);
        for (var k = 0, j = n.length; k < j; k++) {
          h.addText(l, n[k]);
          if (k !== j - 1) {
            h.addElement(l, 'br', { isMathJax: true });
          }
        }
        return l;
      }
    });
  });
  b.Register.StartupHook('CommonHTML Jax Config', function() {
    b.Config({
      CommonHTML: {
        styles: {
          '.mjx-chtml .mjx-noError': b.Insert(
            {
              'line-height': 1.2,
              'vertical-align': b.Browser.isMSIE && a.multiLine ? '-2px' : ''
            },
            a.style
          )
        }
      }
    });
  });
  b.Register.StartupHook('CommonHTML Jax Ready', function() {
    var f = MathJax.ElementJax.mml;
    var g = MathJax.OutputJax.CommonHTML;
    var i = MathJax.HTML;
    var h = f.merror.prototype.toCommonHTML;
    f.merror.Augment({
      toCommonHTML: function(n) {
        if (!this.isError) {
          return h.apply(this, arguments);
        }
        n = g.addElement(n, 'mjx-noError');
        var p = this.data[0].data[0].data.join('').split(/\n/);
        for (var k = 0, j = p.length; k < j; k++) {
          i.addText(n, p[k]);
          if (k !== j - 1) {
            g.addElement(n, 'br', { isMathJax: true });
          }
        }
        var o = (this.CHTML = g.BBOX.zero());
        o.w = n.offsetWidth / g.em;
        if (j > 1) {
          var l = (1.2 * j) / 2;
          o.h = l + 0.25;
          o.d = l - 0.25;
          n.style.verticalAlign = g.Em(0.45 - l);
        } else {
          o.h = 1;
          o.d = 0.2 + 2 / g.em;
        }
        return n;
      }
    });
  });
  b.Startup.signal.Post('TeX noErrors Ready');
})(MathJax.Hub, MathJax.HTML);
MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/noErrors.js');
MathJax.Extension['TeX/noUndefined'] = {
  version: '2.7.5',
  config: MathJax.Hub.CombineConfig('TeX.noUndefined', {
    disabled: false,
    attributes: { mathcolor: 'red' }
  })
};
MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
  var b = MathJax.Extension['TeX/noUndefined'].config;
  var a = MathJax.ElementJax.mml;
  var c = MathJax.InputJax.TeX.Parse.prototype.csUndefined;
  MathJax.InputJax.TeX.Parse.Augment({
    csUndefined: function(d) {
      if (b.disabled) {
        return c.apply(this, arguments);
      }
      MathJax.Hub.signal.Post(['TeX Jax - undefined control sequence', d]);
      this.Push(a.mtext(d).With(b.attributes));
    }
  });
  MathJax.Hub.Startup.signal.Post('TeX noUndefined Ready');
});
MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/noUndefined.js');
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
MathJax.Extension['TeX/AMSmath'] = {
  version: '2.7.5',
  number: 0,
  startNumber: 0,
  IDs: {},
  eqIDs: {},
  labels: {},
  eqlabels: {},
  refs: []
};
MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
  var b = MathJax.ElementJax.mml,
    h = MathJax.InputJax.TeX,
    g = MathJax.Extension['TeX/AMSmath'];
  var d = h.Definitions,
    f = h.Stack.Item,
    a = h.config.equationNumbers;
  var c = function(k) {
    var n = [];
    for (var l = 0, j = k.length; l < j; l++) {
      n[l] = h.Parse.prototype.Em(k[l]);
    }
    return n.join(' ');
  };
  var e =
    document.getElementsByTagName('base').length === 0
      ? ''
      : String(document.location).replace(/#.*$/, '');
  d.Add(
    {
      mathchar0mo: { iiiint: ['2A0C', { texClass: b.TEXCLASS.OP }] },
      macros: {
        mathring: ['Accent', '2DA'],
        nobreakspace: 'Tilde',
        negmedspace: ['Spacer', b.LENGTH.NEGATIVEMEDIUMMATHSPACE],
        negthickspace: ['Spacer', b.LENGTH.NEGATIVETHICKMATHSPACE],
        idotsint: ['MultiIntegral', '\\int\\cdots\\int'],
        dddot: ['Accent', '20DB'],
        ddddot: ['Accent', '20DC'],
        sideset: [
          'Macro',
          '\\mathop{\\mathop{\\rlap{\\phantom{#3}}}\\nolimits#1\\!\\mathop{#3}\\nolimits#2}',
          3
        ],
        boxed: ['Macro', '\\fbox{$\\displaystyle{#1}$}', 1],
        tag: 'HandleTag',
        notag: 'HandleNoTag',
        label: 'HandleLabel',
        ref: 'HandleRef',
        eqref: ['HandleRef', true],
        substack: ['Macro', '\\begin{subarray}{c}#1\\end{subarray}', 1],
        injlim: ['NamedOp', 'inj&thinsp;lim'],
        projlim: ['NamedOp', 'proj&thinsp;lim'],
        varliminf: ['Macro', '\\mathop{\\underline{\\mmlToken{mi}{lim}}}'],
        varlimsup: ['Macro', '\\mathop{\\overline{\\mmlToken{mi}{lim}}}'],
        varinjlim: [
          'Macro',
          '\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}}}'
        ],
        varprojlim: [
          'Macro',
          '\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}}}'
        ],
        DeclareMathOperator: 'HandleDeclareOp',
        operatorname: 'HandleOperatorName',
        SkipLimits: 'SkipLimits',
        genfrac: 'Genfrac',
        frac: ['Genfrac', '', '', '', ''],
        tfrac: ['Genfrac', '', '', '', 1],
        dfrac: ['Genfrac', '', '', '', 0],
        binom: ['Genfrac', '(', ')', '0', ''],
        tbinom: ['Genfrac', '(', ')', '0', 1],
        dbinom: ['Genfrac', '(', ')', '0', 0],
        cfrac: 'CFrac',
        shoveleft: ['HandleShove', b.ALIGN.LEFT],
        shoveright: ['HandleShove', b.ALIGN.RIGHT],
        xrightarrow: ['xArrow', 8594, 5, 6],
        xleftarrow: ['xArrow', 8592, 7, 3]
      },
      environment: {
        align: [
          'AMSarray',
          null,
          true,
          true,
          'rlrlrlrlrlrl',
          c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0])
        ],
        'align*': [
          'AMSarray',
          null,
          false,
          true,
          'rlrlrlrlrlrl',
          c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0])
        ],
        multline: ['Multline', null, true],
        'multline*': ['Multline', null, false],
        split: ['AMSarray', null, false, false, 'rl', c([0])],
        gather: ['AMSarray', null, true, true, 'c'],
        'gather*': ['AMSarray', null, false, true, 'c'],
        alignat: ['AlignAt', null, true, true],
        'alignat*': ['AlignAt', null, false, true],
        alignedat: ['AlignAt', null, false, false],
        aligned: [
          'AlignedAMSArray',
          null,
          null,
          null,
          'rlrlrlrlrlrl',
          c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0]),
          '.5em',
          'D'
        ],
        gathered: ['AlignedAMSArray', null, null, null, 'c', null, '.5em', 'D'],
        subarray: ['Array', null, null, null, null, c([0]), '0.1em', 'S', 1],
        smallmatrix: [
          'Array',
          null,
          null,
          null,
          'c',
          c([1 / 3]),
          '.2em',
          'S',
          1
        ],
        equation: ['EquationBegin', 'Equation', true],
        'equation*': ['EquationBegin', 'EquationStar', false],
        eqnarray: [
          'AMSarray',
          null,
          true,
          true,
          'rcl',
          '0 ' + b.LENGTH.THICKMATHSPACE,
          '.5em'
        ],
        'eqnarray*': [
          'AMSarray',
          null,
          false,
          true,
          'rcl',
          '0 ' + b.LENGTH.THICKMATHSPACE,
          '.5em'
        ]
      },
      delimiter: {
        '\\lvert': ['007C', { texClass: b.TEXCLASS.OPEN }],
        '\\rvert': ['007C', { texClass: b.TEXCLASS.CLOSE }],
        '\\lVert': ['2016', { texClass: b.TEXCLASS.OPEN }],
        '\\rVert': ['2016', { texClass: b.TEXCLASS.CLOSE }]
      }
    },
    null,
    true
  );
  h.Parse.Augment({
    HandleTag: function(k) {
      var m = this.GetStar();
      var j = this.trimSpaces(this.GetArgument(k)),
        i = j;
      if (!m) {
        j = a.formatTag(j);
      }
      var l = this.stack.global;
      l.tagID = i;
      if (l.notags) {
        h.Error([
          'CommandNotAllowedInEnv',
          '%1 not allowed in %2 environment',
          k,
          l.notags
        ]);
      }
      if (l.tag) {
        h.Error(['MultipleCommand', 'Multiple %1', k]);
      }
      l.tag = b.mtd.apply(b, this.InternalMath(j)).With({ id: a.formatID(i) });
    },
    HandleNoTag: function(i) {
      if (this.stack.global.tag) {
        delete this.stack.global.tag;
      }
      this.stack.global.notag = true;
    },
    HandleLabel: function(j) {
      var k = this.stack.global,
        i = this.GetArgument(j);
      if (i === '') {
        return;
      }
      if (!g.refUpdate) {
        if (k.label) {
          h.Error(['MultipleCommand', 'Multiple %1', j]);
        }
        k.label = i;
        if (g.labels[i] || g.eqlabels[i]) {
          h.Error(['MultipleLabel', "Label '%1' multiply defined", i]);
        }
        g.eqlabels[i] = { tag: '???', id: '' };
      }
    },
    HandleRef: function(k, m) {
      var j = this.GetArgument(k);
      var l = g.labels[j] || g.eqlabels[j];
      if (!l) {
        l = { tag: '???', id: '' };
        g.badref = !g.refUpdate;
      }
      var i = l.tag;
      if (m) {
        i = a.formatTag(i);
      }
      this.Push(
        b.mrow
          .apply(b, this.InternalMath(i))
          .With({ href: a.formatURL(l.id, e), class: 'MathJax_ref' })
      );
    },
    HandleDeclareOp: function(j) {
      var i = this.GetStar() ? '' : '\\nolimits\\SkipLimits';
      var k = this.trimSpaces(this.GetArgument(j));
      if (k.charAt(0) == '\\') {
        k = k.substr(1);
      }
      var l = this.GetArgument(j);
      l = l.replace(/\*/g, '\\text{*}').replace(/-/g, '\\text{-}');
      this.setDef(k, ['Macro', '\\mathop{\\rm ' + l + '}' + i]);
    },
    HandleOperatorName: function(j) {
      var i = this.GetStar() ? '' : '\\nolimits\\SkipLimits';
      var k = this.trimSpaces(this.GetArgument(j));
      k = k.replace(/\*/g, '\\text{*}').replace(/-/g, '\\text{-}');
      this.string =
        '\\mathop{\\rm ' + k + '}' + i + ' ' + this.string.slice(this.i);
      this.i = 0;
    },
    SkipLimits: function(j) {
      var l = this.GetNext(),
        k = this.i;
      if (l === '\\' && ++this.i && this.GetCS() !== 'limits') {
        this.i = k;
      }
    },
    HandleShove: function(j, i) {
      var k = this.stack.Top();
      if (k.type !== 'multline') {
        h.Error([
          'CommandInMultline',
          '%1 can only appear within the multline environment',
          j
        ]);
      }
      if (k.data.length) {
        h.Error([
          'CommandAtTheBeginingOfLine',
          '%1 must come at the beginning of the line',
          j
        ]);
      }
      k.data.shove = i;
    },
    CFrac: function(l) {
      var i = this.trimSpaces(this.GetBrackets(l, '')),
        k = this.GetArgument(l),
        m = this.GetArgument(l);
      var j = b.mfrac(
        h.Parse('\\strut\\textstyle{' + k + '}', this.stack.env).mml(),
        h.Parse('\\strut\\textstyle{' + m + '}', this.stack.env).mml()
      );
      i = { l: b.ALIGN.LEFT, r: b.ALIGN.RIGHT, '': '' }[i];
      if (i == null) {
        h.Error(['IllegalAlign', 'Illegal alignment specified in %1', l]);
      }
      if (i) {
        j.numalign = j.denomalign = i;
      }
      this.Push(j);
    },
    Genfrac: function(j, l, q, n, i) {
      if (l == null) {
        l = this.GetDelimiterArg(j);
      }
      if (q == null) {
        q = this.GetDelimiterArg(j);
      }
      if (n == null) {
        n = this.GetArgument(j);
      }
      if (i == null) {
        i = this.trimSpaces(this.GetArgument(j));
      }
      var m = this.ParseArg(j);
      var p = this.ParseArg(j);
      var k = b.mfrac(m, p);
      if (n !== '') {
        k.linethickness = n;
      }
      if (l || q) {
        k = h.fixedFence(l, k.With({ texWithDelims: true }), q);
      }
      if (i !== '') {
        var o = ['D', 'T', 'S', 'SS'][i];
        if (o == null) {
          h.Error(['BadMathStyleFor', 'Bad math style for %1', j]);
        }
        k = b.mstyle(k);
        if (o === 'D') {
          k.displaystyle = true;
          k.scriptlevel = 0;
        } else {
          k.displaystyle = false;
          k.scriptlevel = i - 1;
        }
      }
      this.Push(k);
    },
    Multline: function(j, i) {
      this.Push(j);
      this.checkEqnEnv();
      return f
        .multline(i, this.stack)
        .With({
          arraydef: {
            displaystyle: true,
            rowspacing: '.5em',
            width: h.config.MultLineWidth,
            columnwidth: '100%',
            side: h.config.TagSide,
            minlabelspacing: h.config.TagIndent
          }
        });
    },
    AMSarray: function(k, j, i, m, l) {
      this.Push(k);
      if (i) {
        this.checkEqnEnv();
      }
      m = m
        .replace(/[^clr]/g, '')
        .split('')
        .join(' ');
      m = m
        .replace(/l/g, 'left')
        .replace(/r/g, 'right')
        .replace(/c/g, 'center');
      return f
        .AMSarray(k.name, j, i, this.stack)
        .With({
          arraydef: {
            displaystyle: true,
            rowspacing: '.5em',
            columnalign: m,
            columnspacing: l || '1em',
            rowspacing: '3pt',
            side: h.config.TagSide,
            minlabelspacing: h.config.TagIndent
          }
        });
    },
    AlignedAMSArray: function(i) {
      var j = this.GetBrackets('\\begin{' + i.name + '}');
      return this.setArrayAlign(this.AMSarray.apply(this, arguments), j);
    },
    AlignAt: function(l, j, i) {
      var q,
        k,
        p = '',
        o = [];
      if (!i) {
        k = this.GetBrackets('\\begin{' + l.name + '}');
      }
      q = this.GetArgument('\\begin{' + l.name + '}');
      if (q.match(/[^0-9]/)) {
        h.Error([
          'PositiveIntegerArg',
          'Argument to %1 must me a positive integer',
          '\\begin{' + l.name + '}'
        ]);
      }
      while (q > 0) {
        p += 'rl';
        o.push('0em 0em');
        q--;
      }
      o = o.join(' ');
      if (i) {
        return this.AMSarray(l, j, i, p, o);
      }
      var m = this.AMSarray(l, j, i, p, o);
      return this.setArrayAlign(m, k);
    },
    EquationBegin: function(i, j) {
      this.checkEqnEnv();
      this.stack.global.forcetag = j && a.autoNumber !== 'none';
      return i;
    },
    EquationStar: function(i, j) {
      this.stack.global.tagged = true;
      return j;
    },
    checkEqnEnv: function() {
      if (this.stack.global.eqnenv) {
        h.Error([
          'ErroneousNestingEq',
          'Erroneous nesting of equation structures'
        ]);
      }
      this.stack.global.eqnenv = true;
    },
    MultiIntegral: function(j, m) {
      var l = this.GetNext();
      if (l === '\\') {
        var k = this.i;
        l = this.GetArgument(j);
        this.i = k;
        if (l === '\\limits') {
          if (j === '\\idotsint') {
            m = '\\!\\!\\mathop{\\,\\,' + m + '}';
          } else {
            m = '\\!\\!\\!\\mathop{\\,\\,\\,' + m + '}';
          }
        }
      }
      this.string = m + ' ' + this.string.slice(this.i);
      this.i = 0;
    },
    xArrow: function(k, o, n, i) {
      var m = { width: '+' + (n + i) + 'mu', lspace: n + 'mu' };
      var p = this.GetBrackets(k),
        q = this.ParseArg(k);
      var s = b
        .mo(b.chars(String.fromCharCode(o)))
        .With({ stretchy: true, texClass: b.TEXCLASS.REL });
      var j = b.munderover(s);
      j.SetData(
        j.over,
        b
          .mpadded(q)
          .With(m)
          .With({ voffset: '.15em' })
      );
      if (p) {
        p = h.Parse(p, this.stack.env).mml();
        j.SetData(
          j.under,
          b
            .mpadded(p)
            .With(m)
            .With({ voffset: '-.24em' })
        );
      }
      this.Push(j.With({ subsupOK: true }));
    },
    GetDelimiterArg: function(i) {
      var j = this.trimSpaces(this.GetArgument(i));
      if (j == '') {
        return null;
      }
      if (j in d.delimiter) {
        return j;
      }
      h.Error([
        'MissingOrUnrecognizedDelim',
        'Missing or unrecognized delimiter for %1',
        i
      ]);
    },
    GetStar: function() {
      var i = this.GetNext() === '*';
      if (i) {
        this.i++;
      }
      return i;
    }
  });
  f.Augment({
    autoTag: function() {
      var j = this.global;
      if (!j.notag) {
        g.number++;
        j.tagID = a.formatNumber(g.number.toString());
        var i = h.Parse('\\text{' + a.formatTag(j.tagID) + '}', {}).mml();
        j.tag = b.mtd(i).With({ id: a.formatID(j.tagID) });
      }
    },
    getTag: function() {
      var m = this.global,
        k = m.tag;
      m.tagged = true;
      if (m.label) {
        if (a.useLabelIds) {
          k.id = a.formatID(m.label);
        }
        g.eqlabels[m.label] = { tag: m.tagID, id: k.id };
      }
      if (document.getElementById(k.id) || g.IDs[k.id] || g.eqIDs[k.id]) {
        var l = 0,
          j;
        do {
          l++;
          j = k.id + '_' + l;
        } while (document.getElementById(j) || g.IDs[j] || g.eqIDs[j]);
        k.id = j;
        if (m.label) {
          g.eqlabels[m.label].id = j;
        }
      }
      g.eqIDs[k.id] = 1;
      this.clearTag();
      return k;
    },
    clearTag: function() {
      var i = this.global;
      delete i.tag;
      delete i.tagID;
      delete i.label;
    },
    fixInitialMO: function(l) {
      for (var k = 0, j = l.length; k < j; k++) {
        if (
          l[k] &&
          (l[k].type !== 'mspace' &&
            (l[k].type !== 'texatom' ||
              (l[k].data[0] && l[k].data[0].data.length)))
        ) {
          if (l[k].isEmbellished()) {
            l.unshift(b.mi());
          }
          break;
        }
      }
    }
  });
  f.multline = f.array.Subclass({
    type: 'multline',
    Init: function(j, i) {
      this.SUPER(arguments).Init.apply(this);
      this.numbered = j && a.autoNumber !== 'none';
      this.save = { notag: i.global.notag };
      i.global.tagged = !j && !i.global.forcetag;
    },
    EndEntry: function() {
      if (this.table.length) {
        this.fixInitialMO(this.data);
      }
      var i = b.mtd.apply(b, this.data);
      if (this.data.shove) {
        i.columnalign = this.data.shove;
      }
      this.row.push(i);
      this.data = [];
    },
    EndRow: function() {
      if (this.row.length != 1) {
        h.Error([
          'MultlineRowsOneCol',
          'The rows within the %1 environment must have exactly one column',
          'multline'
        ]);
      }
      this.table.push(this.row);
      this.row = [];
    },
    EndTable: function() {
      this.SUPER(arguments).EndTable.call(this);
      if (this.table.length) {
        var k = this.table.length - 1,
          n,
          l = -1;
        if (!this.table[0][0].columnalign) {
          this.table[0][0].columnalign = b.ALIGN.LEFT;
        }
        if (!this.table[k][0].columnalign) {
          this.table[k][0].columnalign = b.ALIGN.RIGHT;
        }
        if (!this.global.tag && this.numbered) {
          this.autoTag();
        }
        if (this.global.tag && !this.global.notags) {
          l = this.arraydef.side === 'left' ? 0 : this.table.length - 1;
          this.table[l] = [this.getTag()].concat(this.table[l]);
        }
        for (n = 0, k = this.table.length; n < k; n++) {
          var j = n === l ? b.mlabeledtr : b.mtr;
          this.table[n] = j.apply(b, this.table[n]);
        }
      }
      this.global.notag = this.save.notag;
    }
  });
  f.AMSarray = f.array.Subclass({
    type: 'AMSarray',
    Init: function(l, k, j, i) {
      this.SUPER(arguments).Init.apply(this);
      this.numbered = k && a.autoNumber !== 'none';
      this.save = { notags: i.global.notags, notag: i.global.notag };
      i.global.notags = j ? null : l;
      i.global.tagged = !k && !i.global.forcetag;
    },
    EndEntry: function() {
      if (this.row.length % 2 === 1) {
        this.fixInitialMO(this.data);
      }
      this.row.push(b.mtd.apply(b, this.data));
      this.data = [];
    },
    EndRow: function() {
      var i = b.mtr;
      if (!this.global.tag && this.numbered) {
        this.autoTag();
      }
      if (this.global.tag && !this.global.notags) {
        this.row = [this.getTag()].concat(this.row);
        i = b.mlabeledtr;
      } else {
        this.clearTag();
      }
      if (this.numbered) {
        delete this.global.notag;
      }
      this.table.push(i.apply(b, this.row));
      this.row = [];
    },
    EndTable: function() {
      this.SUPER(arguments).EndTable.call(this);
      this.global.notags = this.save.notags;
      this.global.notag = this.save.notag;
    }
  });
  f.start.Augment({
    oldCheckItem: f.start.prototype.checkItem,
    checkItem: function(k) {
      if (k.type === 'stop') {
        var i = this.mmlData(),
          j = this.global;
        if (
          g.display &&
          !j.tag &&
          !j.tagged &&
          !j.isInner &&
          (a.autoNumber === 'all' || j.forcetag)
        ) {
          this.autoTag();
        }
        if (j.tag) {
          var m = [this.getTag(), b.mtd(i)];
          var l = {
            side: h.config.TagSide,
            minlabelspacing: h.config.TagIndent,
            displaystyle: 'inherit'
          };
          i = b.mtable(b.mlabeledtr.apply(b, m)).With(l);
        }
        return f.mml(i);
      }
      return this.oldCheckItem.call(this, k);
    }
  });
  h.prefilterHooks.Add(function(i) {
    g.display = i.display;
    g.number = g.startNumber;
    g.eqlabels = {};
    g.eqIDs = {};
    g.badref = false;
    if (g.refUpdate) {
      g.number = i.script.MathJax.startNumber;
    }
  });
  h.postfilterHooks.Add(function(i) {
    i.script.MathJax.startNumber = g.startNumber;
    g.startNumber = g.number;
    MathJax.Hub.Insert(g.IDs, g.eqIDs);
    MathJax.Hub.Insert(g.labels, g.eqlabels);
    if (g.badref && !i.math.texError) {
      g.refs.push(i.script);
    }
  }, 100);
  MathJax.Hub.Register.MessageHook('Begin Math Input', function() {
    g.refs = [];
    g.refUpdate = false;
  });
  MathJax.Hub.Register.MessageHook('End Math Input', function(l) {
    if (g.refs.length) {
      g.refUpdate = true;
      for (var k = 0, j = g.refs.length; k < j; k++) {
        g.refs[k].MathJax.state = MathJax.ElementJax.STATE.UPDATE;
      }
      return MathJax.Hub.processInput({
        scripts: g.refs,
        start: new Date().getTime(),
        i: 0,
        j: 0,
        jax: {},
        jaxIDs: []
      });
    }
    return null;
  });
  h.resetEquationNumbers = function(j, i) {
    g.startNumber = j || 0;
    if (!i) {
      g.labels = {};
      g.IDs = {};
    }
  };
  MathJax.Hub.Startup.signal.Post('TeX AMSmath Ready');
});
MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/AMSmath.js');
MathJax.Extension['TeX/AMSsymbols'] = { version: '2.7.5' };
MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
  var a = MathJax.ElementJax.mml,
    b = MathJax.InputJax.TeX.Definitions;
  b.Add(
    {
      mathchar0mi: {
        digamma: '03DD',
        varkappa: '03F0',
        varGamma: ['0393', { mathvariant: a.VARIANT.ITALIC }],
        varDelta: ['0394', { mathvariant: a.VARIANT.ITALIC }],
        varTheta: ['0398', { mathvariant: a.VARIANT.ITALIC }],
        varLambda: ['039B', { mathvariant: a.VARIANT.ITALIC }],
        varXi: ['039E', { mathvariant: a.VARIANT.ITALIC }],
        varPi: ['03A0', { mathvariant: a.VARIANT.ITALIC }],
        varSigma: ['03A3', { mathvariant: a.VARIANT.ITALIC }],
        varUpsilon: ['03A5', { mathvariant: a.VARIANT.ITALIC }],
        varPhi: ['03A6', { mathvariant: a.VARIANT.ITALIC }],
        varPsi: ['03A8', { mathvariant: a.VARIANT.ITALIC }],
        varOmega: ['03A9', { mathvariant: a.VARIANT.ITALIC }],
        beth: '2136',
        gimel: '2137',
        daleth: '2138',
        backprime: ['2035', { variantForm: true }],
        hslash: '210F',
        varnothing: ['2205', { variantForm: true }],
        blacktriangle: '25B4',
        triangledown: ['25BD', { variantForm: true }],
        blacktriangledown: '25BE',
        square: '25FB',
        Box: '25FB',
        blacksquare: '25FC',
        lozenge: '25CA',
        Diamond: '25CA',
        blacklozenge: '29EB',
        circledS: ['24C8', { mathvariant: a.VARIANT.NORMAL }],
        bigstar: '2605',
        sphericalangle: '2222',
        measuredangle: '2221',
        nexists: '2204',
        complement: '2201',
        mho: '2127',
        eth: ['00F0', { mathvariant: a.VARIANT.NORMAL }],
        Finv: '2132',
        diagup: '2571',
        Game: '2141',
        diagdown: '2572',
        Bbbk: ['006B', { mathvariant: a.VARIANT.DOUBLESTRUCK }],
        yen: '00A5',
        circledR: '00AE',
        checkmark: '2713',
        maltese: '2720'
      },
      mathchar0mo: {
        dotplus: '2214',
        ltimes: '22C9',
        smallsetminus: '2216',
        rtimes: '22CA',
        Cap: '22D2',
        doublecap: '22D2',
        leftthreetimes: '22CB',
        Cup: '22D3',
        doublecup: '22D3',
        rightthreetimes: '22CC',
        barwedge: '22BC',
        curlywedge: '22CF',
        veebar: '22BB',
        curlyvee: '22CE',
        doublebarwedge: '2A5E',
        boxminus: '229F',
        circleddash: '229D',
        boxtimes: '22A0',
        circledast: '229B',
        boxdot: '22A1',
        circledcirc: '229A',
        boxplus: '229E',
        centerdot: ['22C5', { variantForm: true }],
        divideontimes: '22C7',
        intercal: '22BA',
        leqq: '2266',
        geqq: '2267',
        leqslant: '2A7D',
        geqslant: '2A7E',
        eqslantless: '2A95',
        eqslantgtr: '2A96',
        lesssim: '2272',
        gtrsim: '2273',
        lessapprox: '2A85',
        gtrapprox: '2A86',
        approxeq: '224A',
        lessdot: '22D6',
        gtrdot: '22D7',
        lll: '22D8',
        llless: '22D8',
        ggg: '22D9',
        gggtr: '22D9',
        lessgtr: '2276',
        gtrless: '2277',
        lesseqgtr: '22DA',
        gtreqless: '22DB',
        lesseqqgtr: '2A8B',
        gtreqqless: '2A8C',
        doteqdot: '2251',
        Doteq: '2251',
        eqcirc: '2256',
        risingdotseq: '2253',
        circeq: '2257',
        fallingdotseq: '2252',
        triangleq: '225C',
        backsim: '223D',
        thicksim: ['223C', { variantForm: true }],
        backsimeq: '22CD',
        thickapprox: ['2248', { variantForm: true }],
        subseteqq: '2AC5',
        supseteqq: '2AC6',
        Subset: '22D0',
        Supset: '22D1',
        sqsubset: '228F',
        sqsupset: '2290',
        preccurlyeq: '227C',
        succcurlyeq: '227D',
        curlyeqprec: '22DE',
        curlyeqsucc: '22DF',
        precsim: '227E',
        succsim: '227F',
        precapprox: '2AB7',
        succapprox: '2AB8',
        vartriangleleft: '22B2',
        lhd: '22B2',
        vartriangleright: '22B3',
        rhd: '22B3',
        trianglelefteq: '22B4',
        unlhd: '22B4',
        trianglerighteq: '22B5',
        unrhd: '22B5',
        vDash: '22A8',
        Vdash: '22A9',
        Vvdash: '22AA',
        smallsmile: ['2323', { variantForm: true }],
        shortmid: ['2223', { variantForm: true }],
        smallfrown: ['2322', { variantForm: true }],
        shortparallel: ['2225', { variantForm: true }],
        bumpeq: '224F',
        between: '226C',
        Bumpeq: '224E',
        pitchfork: '22D4',
        varpropto: '221D',
        backepsilon: '220D',
        blacktriangleleft: '25C2',
        blacktriangleright: '25B8',
        therefore: '2234',
        because: '2235',
        eqsim: '2242',
        vartriangle: ['25B3', { variantForm: true }],
        Join: '22C8',
        nless: '226E',
        ngtr: '226F',
        nleq: '2270',
        ngeq: '2271',
        nleqslant: ['2A87', { variantForm: true }],
        ngeqslant: ['2A88', { variantForm: true }],
        nleqq: ['2270', { variantForm: true }],
        ngeqq: ['2271', { variantForm: true }],
        lneq: '2A87',
        gneq: '2A88',
        lneqq: '2268',
        gneqq: '2269',
        lvertneqq: ['2268', { variantForm: true }],
        gvertneqq: ['2269', { variantForm: true }],
        lnsim: '22E6',
        gnsim: '22E7',
        lnapprox: '2A89',
        gnapprox: '2A8A',
        nprec: '2280',
        nsucc: '2281',
        npreceq: ['22E0', { variantForm: true }],
        nsucceq: ['22E1', { variantForm: true }],
        precneqq: '2AB5',
        succneqq: '2AB6',
        precnsim: '22E8',
        succnsim: '22E9',
        precnapprox: '2AB9',
        succnapprox: '2ABA',
        nsim: '2241',
        ncong: '2246',
        nshortmid: ['2224', { variantForm: true }],
        nshortparallel: ['2226', { variantForm: true }],
        nmid: '2224',
        nparallel: '2226',
        nvdash: '22AC',
        nvDash: '22AD',
        nVdash: '22AE',
        nVDash: '22AF',
        ntriangleleft: '22EA',
        ntriangleright: '22EB',
        ntrianglelefteq: '22EC',
        ntrianglerighteq: '22ED',
        nsubseteq: '2288',
        nsupseteq: '2289',
        nsubseteqq: ['2288', { variantForm: true }],
        nsupseteqq: ['2289', { variantForm: true }],
        subsetneq: '228A',
        supsetneq: '228B',
        varsubsetneq: ['228A', { variantForm: true }],
        varsupsetneq: ['228B', { variantForm: true }],
        subsetneqq: '2ACB',
        supsetneqq: '2ACC',
        varsubsetneqq: ['2ACB', { variantForm: true }],
        varsupsetneqq: ['2ACC', { variantForm: true }],
        leftleftarrows: '21C7',
        rightrightarrows: '21C9',
        leftrightarrows: '21C6',
        rightleftarrows: '21C4',
        Lleftarrow: '21DA',
        Rrightarrow: '21DB',
        twoheadleftarrow: '219E',
        twoheadrightarrow: '21A0',
        leftarrowtail: '21A2',
        rightarrowtail: '21A3',
        looparrowleft: '21AB',
        looparrowright: '21AC',
        leftrightharpoons: '21CB',
        rightleftharpoons: ['21CC', { variantForm: true }],
        curvearrowleft: '21B6',
        curvearrowright: '21B7',
        circlearrowleft: '21BA',
        circlearrowright: '21BB',
        Lsh: '21B0',
        Rsh: '21B1',
        upuparrows: '21C8',
        downdownarrows: '21CA',
        upharpoonleft: '21BF',
        upharpoonright: '21BE',
        downharpoonleft: '21C3',
        restriction: '21BE',
        multimap: '22B8',
        downharpoonright: '21C2',
        leftrightsquigarrow: '21AD',
        rightsquigarrow: '21DD',
        leadsto: '21DD',
        dashrightarrow: '21E2',
        dashleftarrow: '21E0',
        nleftarrow: '219A',
        nrightarrow: '219B',
        nLeftarrow: '21CD',
        nRightarrow: '21CF',
        nleftrightarrow: '21AE',
        nLeftrightarrow: '21CE'
      },
      delimiter: {
        '\\ulcorner': '231C',
        '\\urcorner': '231D',
        '\\llcorner': '231E',
        '\\lrcorner': '231F'
      },
      macros: {
        implies: ['Macro', '\\;\\Longrightarrow\\;'],
        impliedby: ['Macro', '\\;\\Longleftarrow\\;']
      }
    },
    null,
    true
  );
  var c = a.mo.OPTYPES.REL;
  MathJax.Hub.Insert(a.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u2322': c,
        '\u2323': c,
        '\u25B3': c,
        '\uE006': c,
        '\uE007': c,
        '\uE00C': c,
        '\uE00D': c,
        '\uE00E': c,
        '\uE00F': c,
        '\uE010': c,
        '\uE011': c,
        '\uE016': c,
        '\uE017': c,
        '\uE018': c,
        '\uE019': c,
        '\uE01A': c,
        '\uE01B': c,
        '\uE04B': c,
        '\uE04F': c
      }
    }
  });
  MathJax.Hub.Startup.signal.Post('TeX AMSsymbols Ready');
});
MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/AMSsymbols.js');
(function(o, f, m, a) {
  var d;
  var g = MathJax.Object.isArray;
  var e, q, h;
  var k = 1,
    l = 0.1,
    j = 0.025,
    b = 0.025;
  var p = {
    '.mjx-chtml': {
      display: 'inline-block',
      'line-height': 0,
      'text-indent': 0,
      'text-align': 'left',
      'text-transform': 'none',
      'font-style': 'normal',
      'font-weight': 'normal',
      'font-size': '100%',
      'font-size-adjust': 'none',
      'letter-spacing': 'normal',
      'word-wrap': 'normal',
      'word-spacing': 'normal',
      'white-space': 'nowrap',
      float: 'none',
      direction: 'ltr',
      'max-width': 'none',
      'max-height': 'none',
      'min-width': 0,
      'min-height': 0,
      border: 0,
      margin: 0,
      padding: '1px 0'
    },
    '.MJXc-display': {
      display: 'block',
      'text-align': 'center',
      margin: '1em 0',
      padding: 0
    },
    '.mjx-chtml[tabindex]:focus, body :focus .mjx-chtml[tabindex]': {
      display: 'inline-table'
    },
    '.mjx-full-width': {
      'text-align': 'center',
      display: 'table-cell!important',
      width: '10000em'
    },
    '.mjx-math': {
      display: 'inline-block',
      'border-collapse': 'separate',
      'border-spacing': 0
    },
    '.mjx-math *': {
      display: 'inline-block',
      '-webkit-box-sizing': 'content-box!important',
      '-moz-box-sizing': 'content-box!important',
      'box-sizing': 'content-box!important',
      'text-align': 'left'
    },
    '.mjx-numerator': { display: 'block', 'text-align': 'center' },
    '.mjx-denominator': { display: 'block', 'text-align': 'center' },
    '.MJXc-stacked': { height: 0, position: 'relative' },
    '.MJXc-stacked > *': { position: 'absolute' },
    '.MJXc-bevelled > *': { display: 'inline-block' },
    '.mjx-stack': { display: 'inline-block' },
    '.mjx-op': { display: 'block' },
    '.mjx-under': { display: 'table-cell' },
    '.mjx-over': { display: 'block' },
    '.mjx-over > *': {
      'padding-left': '0px!important',
      'padding-right': '0px!important'
    },
    '.mjx-under > *': {
      'padding-left': '0px!important',
      'padding-right': '0px!important'
    },
    '.mjx-stack > .mjx-sup': { display: 'block' },
    '.mjx-stack > .mjx-sub': { display: 'block' },
    '.mjx-prestack > .mjx-presup': { display: 'block' },
    '.mjx-prestack > .mjx-presub': { display: 'block' },
    '.mjx-delim-h > .mjx-char': { display: 'inline-block' },
    '.mjx-surd': { 'vertical-align': 'top' },
    '.mjx-mphantom *': { visibility: 'hidden' },
    '.mjx-merror': {
      'background-color': '#FFFF88',
      color: '#CC0000',
      border: '1px solid #CC0000',
      padding: '2px 3px',
      'font-style': 'normal',
      'font-size': '90%'
    },
    '.mjx-annotation-xml': { 'line-height': 'normal' },
    '.mjx-menclose > svg': { fill: 'none', stroke: 'currentColor' },
    '.mjx-mtr': { display: 'table-row' },
    '.mjx-mlabeledtr': { display: 'table-row' },
    '.mjx-mtd': { display: 'table-cell', 'text-align': 'center' },
    '.mjx-label': { display: 'table-row' },
    '.mjx-box': { display: 'inline-block' },
    '.mjx-block': { display: 'block' },
    '.mjx-span': { display: 'inline' },
    '.mjx-char': { display: 'block', 'white-space': 'pre' },
    '.mjx-itable': { display: 'inline-table', width: 'auto' },
    '.mjx-row': { display: 'table-row' },
    '.mjx-cell': { display: 'table-cell' },
    '.mjx-table': { display: 'table', width: '100%' },
    '.mjx-line': { display: 'block', height: 0 },
    '.mjx-strut': { width: 0, 'padding-top': k + 'em' },
    '.mjx-vsize': { width: 0 },
    '.MJXc-space1': { 'margin-left': '.167em' },
    '.MJXc-space2': { 'margin-left': '.222em' },
    '.MJXc-space3': { 'margin-left': '.278em' },
    '.mjx-chartest': {
      display: 'block',
      visibility: 'hidden',
      position: 'absolute',
      top: 0,
      'line-height': 'normal',
      'font-size': '500%'
    },
    '.mjx-chartest .mjx-char': { display: 'inline' },
    '.mjx-chartest .mjx-box': { 'padding-top': '1000px' },
    '.MJXc-processing': {
      visibility: 'hidden',
      position: 'fixed',
      width: 0,
      height: 0,
      overflow: 'hidden'
    },
    '.MJXc-processed': { display: 'none' },
    '.mjx-test': {
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
    '.mjx-test.mjx-test-display': { display: 'table!important' },
    '.mjx-test.mjx-test-inline': {
      display: 'inline!important',
      'margin-right': '-1px'
    },
    '.mjx-test.mjx-test-default': { display: 'block!important', clear: 'both' },
    '.mjx-ex-box': {
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
    '.mjx-test-inline .mjx-left-box': {
      display: 'inline-block',
      width: 0,
      float: 'left'
    },
    '.mjx-test-inline .mjx-right-box': {
      display: 'inline-block',
      width: 0,
      float: 'right'
    },
    '.mjx-test-display .mjx-right-box': {
      display: 'table-cell!important',
      width: '10000em!important',
      'min-width': 0,
      'max-width': 'none',
      padding: 0,
      border: 0,
      margin: 0
    },
    '#MathJax_CHTML_Tooltip': {
      'background-color': 'InfoBackground',
      color: 'InfoText',
      border: '1px solid black',
      'box-shadow': '2px 2px 5px #AAAAAA',
      '-webkit-box-shadow': '2px 2px 5px #AAAAAA',
      '-moz-box-shadow': '2px 2px 5px #AAAAAA',
      '-khtml-box-shadow': '2px 2px 5px #AAAAAA',
      padding: '3px 4px',
      'z-index': 401,
      position: 'absolute',
      left: 0,
      top: 0,
      width: 'auto',
      height: 'auto',
      display: 'none'
    }
  };
  var i = 1000000;
  var n = 5;
  var c = {},
    r = MathJax.Hub.config;
  a.Augment({
    settings: f.config.menuSettings,
    config: { styles: p },
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.SUPER(arguments).Config.call(this);
      var s = this.settings;
      if (s.scale) {
        this.config.scale = s.scale;
      }
      this.require.push(this.fontDir + '/TeX/fontdata.js');
      this.require.push(MathJax.OutputJax.extensionDir + '/MathEvents.js');
      c = this.config.linebreaks;
    },
    Startup: function() {
      e = MathJax.Extension.MathEvents.Event;
      q = MathJax.Extension.MathEvents.Touch;
      h = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = e.ContextMenu;
      this.Mousedown = e.AltContextMenu;
      this.Mouseover = h.Mouseover;
      this.Mouseout = h.Mouseout;
      this.Mousemove = h.Mousemove;
      var s = a.addElement(document.body, 'mjx-block', {
        style: { display: 'block', width: '5in' }
      });
      this.pxPerInch = s.offsetWidth / 5;
      s.parentNode.removeChild(s);
      this.TestSpan = a.Element('mjx-test', { style: { left: '1em' } }, [
        ['mjx-left-box'],
        ['mjx-ex-box'],
        ['mjx-right-box']
      ]);
      return o.Styles(this.config.styles, ['InitializeCHTML', this]);
    },
    InitializeCHTML: function() {
      this.getDefaultExEm();
      if (this.defaultEm) {
        return;
      }
      var s = MathJax.Callback();
      o.timer.start(
        o,
        function(t) {
          if (t.time(s)) {
            f.signal.Post(['CommonHTML Jax - no default em size']);
            return;
          }
          a.getDefaultExEm();
          if (a.defaultEm) {
            s();
          } else {
            setTimeout(t, t.delay);
          }
        },
        this.defaultEmDelay,
        this.defaultEmTimeout
      );
      return s;
    },
    defaultEmDelay: 100,
    defaultEmTimeout: 1000,
    getDefaultExEm: function() {
      var s = document.body.appendChild(this.TestSpan.cloneNode(true));
      s.className += ' mjx-test-inline mjx-test-default';
      this.defaultEm = this.getFontSize(s);
      this.defaultEx = s.childNodes[1].offsetHeight / 60;
      this.defaultWidth = Math.max(
        0,
        s.lastChild.offsetLeft - s.firstChild.offsetLeft - 2
      );
      document.body.removeChild(s);
    },
    getFontSize: window.getComputedStyle
      ? function(t) {
          var s = window.getComputedStyle(t);
          return parseFloat(s.fontSize);
        }
      : function(s) {
          return s.style.pixelLeft;
        },
    getMaxWidth: window.getComputedStyle
      ? function(t) {
          var s = window.getComputedStyle(t);
          if (s.maxWidth !== 'none') {
            return parseFloat(s.maxWidth);
          }
          return 0;
        }
      : function(t) {
          var s = t.currentStyle.maxWidth;
          if (s !== 'none') {
            if (s.match(/\d*px/)) {
              return parseFloat(s);
            }
            var u = t.style.left;
            t.style.left = s;
            s = t.style.pixelLeft;
            t.style.left = u;
            return s;
          }
          return 0;
        },
    loadFont: function(s) {
      f.RestartAfter(o.Require(this.fontDir + '/' + s));
    },
    fontLoaded: function(s) {
      if (!s.match(/-|fontdata/)) {
        s += '-Regular';
      }
      if (!s.match(/\.js$/)) {
        s += '.js';
      }
      MathJax.Callback.Queue(
        ['Post', f.Startup.signal, 'CommonHTML - font data loaded for ' + s],
        ['loadComplete', o, this.fontDir + '/' + s]
      );
    },
    Element: function(s, u, t) {
      if (s.substr(0, 4) === 'mjx-') {
        if (!u) {
          u = {};
        }
        if (u.isMathJax == null) {
          u.isMathJax = true;
        }
        if (u.className) {
          u.className = s + ' ' + u.className;
        } else {
          u.className = s;
        }
        s = 'span';
      }
      return this.HTMLElement(s, u, t);
    },
    addElement: function(u, s, v, t) {
      return u.appendChild(this.Element(s, v, t));
    },
    HTMLElement: m.Element,
    ucMatch: m.ucMatch,
    setScript: m.setScript,
    getNode: function(x, w) {
      var u = RegExp('\\b' + w + '\\b');
      var t = [];
      while (x) {
        for (var v = 0, s = x.childNodes.length; v < s; v++) {
          var y = x.childNodes[v];
          if (y) {
            if (u.test(y.className)) {
              return y;
            }
            if (y.id === '') {
              t.push(y);
            }
          }
        }
        x = t.shift();
      }
      return null;
    },
    preTranslate: function(w) {
      var v = w.jax[this.id],
        E,
        B = v.length,
        H,
        z,
        C,
        F,
        t,
        G,
        s,
        I;
      var y = 100000,
        x = false,
        D = 0,
        u = c.automatic,
        A = c.width;
      if (u) {
        x = !!A.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/);
        if (x) {
          A = A.replace(/\s*container\s*/, '');
        } else {
          y = this.defaultWidth;
        }
        if (A === '') {
          A = '100%';
        }
      }
      for (E = 0; E < B; E++) {
        H = v[E];
        if (!H.parentNode) {
          continue;
        }
        z = H.previousSibling;
        if (
          z &&
          z.className &&
          String(z.className).substr(0, 9) === 'mjx-chtml'
        ) {
          z.parentNode.removeChild(z);
        }
        if (H.MathJax.preview) {
          H.MathJax.preview.style.display = 'none';
        }
        t = H.MathJax.elementJax;
        if (!t) {
          continue;
        }
        t.CHTML = {
          display: t.root.Get('display') === 'block',
          preview: (t.CHTML || {}).preview
        };
        C = a.Element('mjx-chtml', {
          id: t.inputID + '-Frame',
          className: 'MathJax_CHTML',
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: e.Menu,
          onmousedown: e.Mousedown,
          onmouseover: e.Mouseover,
          onmouseout: e.Mouseout,
          onmousemove: e.Mousemove,
          onclick: e.Click,
          ondblclick: e.DblClick,
          onkeydown: e.Keydown,
          tabIndex: f.getTabOrder(t)
        });
        if (t.CHTML.display) {
          var J = a.Element('mjx-chtml', {
            className: 'MJXc-display',
            isMathJax: false
          });
          J.appendChild(C);
          C = J;
        }
        if (f.Browser.noContextMenu) {
          C.ontouchstart = q.start;
          C.ontouchend = q.end;
        }
        C.className += ' MJXc-processing';
        H.parentNode.insertBefore(C, H);
        F = this.TestSpan.cloneNode(true);
        F.className += ' mjx-test-' + (t.CHTML.display ? 'display' : 'inline');
        H.parentNode.insertBefore(F, H);
      }
      for (E = 0; E < B; E++) {
        H = v[E];
        if (!H.parentNode) {
          continue;
        }
        F = H.previousSibling;
        t = H.MathJax.elementJax;
        if (!t) {
          continue;
        }
        s = a.getFontSize(F);
        G = F.childNodes[1].offsetHeight / 60;
        D = Math.max(
          0,
          t.CHTML.display
            ? F.lastChild.offsetWidth - 1
            : F.lastChild.offsetLeft - F.firstChild.offsetLeft - 2
        );
        if (G === 0 || G === 'NaN') {
          G = this.defaultEx;
          D = this.defaultWidth;
        }
        if (D === 0 && !t.CHTML.display) {
          D = this.defaultWidth;
        }
        if (x) {
          y = D;
        }
        I = this.config.matchFontHeight ? G / this.TEX.x_height / s : 1;
        I = Math.floor(
          Math.max(this.config.minScaleAdjust / 100, I) * this.config.scale
        );
        t.CHTML.scale = I / 100;
        t.CHTML.fontSize = I + '%';
        t.CHTML.outerEm = s;
        t.CHTML.em = this.em = (s * I) / 100;
        t.CHTML.ex = G;
        t.CHTML.cwidth = D / this.em;
        t.CHTML.lineWidth = u ? this.length2em(A, y / this.em, 1) : y;
      }
      for (E = 0; E < B; E++) {
        H = v[E];
        if (!H.parentNode) {
          continue;
        }
        t = H.MathJax.elementJax;
        if (!t) {
          continue;
        }
        H.parentNode.removeChild(H.previousSibling);
        if (H.MathJax.preview) {
          H.MathJax.preview.style.display = '';
        }
      }
      w.CHTMLeqn = w.CHTMLlast = 0;
      w.CHTMLi = -1;
      w.CHTMLchunk = this.config.EqnChunk;
      w.CHTMLdelay = false;
    },
    Translate: function(t, x) {
      if (!t.parentNode) {
        return;
      }
      if (x.CHTMLdelay) {
        x.CHTMLdelay = false;
        f.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
      }
      var s = t.MathJax.elementJax,
        w = s.root,
        v = document.getElementById(s.inputID + '-Frame');
      if (!v) {
        return;
      }
      this.getMetrics(s);
      if (this.scale !== 1) {
        v.style.fontSize = s.CHTML.fontSize;
      }
      this.initCHTML(w, v);
      this.savePreview(t);
      this.CHTMLnode = v;
      try {
        w.setTeXclass();
        w.toCommonHTML(v);
      } catch (u) {
        while (v.firstChild) {
          v.removeChild(v.firstChild);
        }
        delete this.CHTMLnode;
        this.restorePreview(t);
        throw u;
      }
      delete this.CHTMLnode;
      this.restorePreview(t);
      if (s.CHTML.display) {
        v = v.parentNode;
      }
      v.className = v.className.replace(/ [^ ]+$/, '');
      v.className += ' MJXc-processed';
      if (t.MathJax.preview) {
        s.CHTML.preview = t.MathJax.preview;
        delete t.MathJax.preview;
      }
      x.CHTMLeqn += x.i - x.CHTMLi;
      x.CHTMLi = x.i;
      if (x.CHTMLeqn >= x.CHTMLlast + x.CHTMLchunk) {
        this.postTranslate(x);
        x.CHTMLchunk = Math.floor(x.CHTMLchunk * this.config.EqnChunkFactor);
        x.CHTMLdelay = true;
      }
    },
    initCHTML: function(t, s) {},
    savePreview: function(s) {
      var t = s.MathJax.preview;
      if (t && t.parentNode) {
        s.MathJax.tmpPreview = document.createElement('span');
        t.parentNode.replaceChild(s.MathJax.tmpPreview, t);
      }
    },
    restorePreview: function(s) {
      var t = s.MathJax.tmpPreview;
      if (t) {
        t.parentNode.replaceChild(s.MathJax.preview, t);
        delete s.MathJax.tmpPreview;
      }
    },
    getMetrics: function(s) {
      var t = s.CHTML;
      this.jax = s;
      this.em = t.em;
      this.outerEm = t.outerEm;
      this.scale = t.scale;
      this.cwidth = t.cwidth;
      this.linebreakWidth = t.lineWidth;
    },
    postTranslate: function(x) {
      var t = x.jax[this.id];
      for (var v = x.CHTMLlast, s = x.CHTMLeqn; v < s; v++) {
        var u = t[v];
        if (u && u.MathJax.elementJax) {
          u.previousSibling.className = u.previousSibling.className.replace(
            / [^ ]+$/,
            ''
          );
          var w = u.MathJax.elementJax.CHTML;
          if (w.preview) {
            w.preview.innerHTML = '';
            u.MathJax.preview = w.preview;
            delete w.preview;
          }
        }
      }
      x.CHTMLlast = x.CHTMLeqn;
    },
    getJaxFromMath: function(s) {
      if (s.parentNode.className.match(/MJXc-display/)) {
        s = s.parentNode;
      }
      do {
        s = s.nextSibling;
      } while (s && s.nodeName.toLowerCase() !== 'script');
      return f.getJaxFor(s);
    },
    getHoverSpan: function(s, t) {
      return s.root.CHTMLnodeElement();
    },
    getHoverBBox: function(s, v, w) {
      var x = s.root.CHTML,
        u = s.CHTML.outerEm;
      var t = { w: x.w * u, h: x.h * u, d: x.d * u };
      if (x.width) {
        t.width = x.width;
      }
      return t;
    },
    Zoom: function(u, B, A, s, y) {
      this.getMetrics(u);
      var v = a.addElement(B, 'mjx-chtml', {
        style: { 'font-size': Math.floor(a.scale * 100) + '%' },
        isMathJax: false
      });
      a.CHTMLnode = v;
      this.idPostfix = '-zoom';
      u.root.toCommonHTML(v);
      this.idPostfix = '';
      var t = v.style,
        C = u.root.CHTML;
      if (C.t > C.h) {
        t.marginTop = a.Em(C.t - C.h);
      }
      if (C.b > C.d) {
        t.marginBottom = a.Em(C.b - C.d);
      }
      if (C.l < 0) {
        t.paddingLeft = a.Em(-C.l);
      }
      if (C.r > C.w) {
        t.marginRight = a.Em(C.r - C.w);
      }
      t.position = 'absolute';
      var z = v.offsetWidth,
        x = v.offsetHeight,
        D = A.firstChild.offsetHeight,
        w = A.firstChild.offsetWidth;
      v.style.position = '';
      return { Y: -e.getBBox(B).h, mW: w, mH: D, zW: z, zH: x };
    },
    Remove: function(s) {
      var t = document.getElementById(s.inputID + '-Frame');
      if (t && s.CHTML.display) {
        t = t.parentNode;
      }
      if (t) {
        t.parentNode.removeChild(t);
      }
      delete s.CHTML;
    },
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
      negativeveryverythickmathspace: -7 / 18,
      thin: 0.04,
      medium: 0.06,
      thick: 0.1,
      infinity: i
    },
    SPACECLASS: {
      thinmathspace: 'MJXc-space1',
      mediummathspace: 'MJXc-space2',
      thickmathspace: 'MJXc-space3'
    },
    pxPerInch: 96,
    em: 16,
    maxStretchyParts: 1000,
    FONTDEF: {},
    TEXDEF: {
      x_height: 0.442,
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
      big_op_spacing4: 0.45,
      big_op_spacing5: 0.1,
      surd_height: 0.075,
      scriptspace: 0.05,
      nulldelimiterspace: 0.12,
      delimiterfactor: 901,
      delimitershortfall: 0.3,
      min_rule_thickness: 1.25
    },
    isChar: function(s) {
      if (s.length === 1) {
        return true;
      }
      if (s.length !== 2) {
        return false;
      }
      var t = s.charCodeAt(0);
      return t >= 55296 && t < 56319;
    },
    unicodeChar: function(s) {
      if (s < 65535) {
        return String.fromCharCode(s);
      }
      s -= 65536;
      return (
        String.fromCharCode((s >> 10) + 55296) +
        String.fromCharCode((s & 1023) + 56320)
      );
    },
    getUnicode: function(s) {
      var t = s.text.charCodeAt(s.i);
      s.i++;
      if (t >= 55296 && t < 56319) {
        t = ((t - 55296) << 10) + (s.text.charCodeAt(s.i) - 56320) + 65536;
        s.i++;
      }
      return t;
    },
    getCharList: function(w, v) {
      var u,
        z,
        s = w.cache,
        B = v;
      if (s[v]) {
        return s[v];
      }
      if (v > 65535 && this.FONTDATA.RemapPlane1) {
        var y = this.FONTDATA.RemapPlane1(v, w);
        v = y.n;
        w = y.variant;
      }
      var t = this.FONTDATA.RANGES,
        A = this.FONTDATA.VARIANT;
      if (v >= t[0].low && v <= t[t.length - 1].high) {
        for (u = 0, z = t.length; u < z; u++) {
          if (t[u].name === 'alpha' && w.noLowerCase) {
            continue;
          }
          var x = w['offset' + t[u].offset];
          if (x && v >= t[u].low && v <= t[u].high) {
            if (t[u].remap && t[u].remap[v]) {
              v = x + t[u].remap[v];
            } else {
              v = v - t[u].low + x;
              if (t[u].add) {
                v += t[u].add;
              }
            }
            if (w['variant' + t[u].offset]) {
              w = A[w['variant' + t[u].offset]];
            }
            break;
          }
        }
      }
      s[B] = this.remapChar(w, v, 0);
      return s[B];
    },
    remapChar: function(t, y, w) {
      var v = [],
        x = this.FONTDATA.VARIANT;
      if (t.remap && t.remap[y]) {
        y = t.remap[y];
        if (t.remap.variant) {
          t = x[t.remap.variant];
        }
      } else {
        if (this.FONTDATA.REMAP[y] && !t.noRemap) {
          y = this.FONTDATA.REMAP[y];
        }
      }
      if (g(y)) {
        if (y[2]) {
          w = n;
        }
        t = x[y[1]];
        y = y[0];
      }
      if (typeof y === 'string') {
        var s = { text: y, i: 0, length: y.length };
        while (s.i < s.length) {
          y = this.getUnicode(s);
          var u = this.getCharList(t, y);
          if (u) {
            v.push.apply(v, u);
          }
        }
      } else {
        if (t.cache[y]) {
          v = t.cache[y];
        } else {
          t.cache[y] = v = this.lookupChar(t, y, w);
        }
      }
      return v;
    },
    lookupChar: function(v, z, x) {
      var y = v;
      while (v) {
        for (var u = 0, s = v.fonts.length; u < s; u++) {
          var t = this.FONTDATA.FONTS[v.fonts[u]];
          if (typeof t === 'string') {
            this.loadFont(t);
          }
          var w = t[z];
          if (w) {
            this.fixChar(w, z);
            if (w[5].space) {
              return [{ type: 'space', w: w[2], font: t }];
            }
            return [{ type: 'char', font: t, n: z }];
          } else {
            if (t.Extra) {
              this.findBlock(t, z);
            }
          }
        }
        v = this.FONTDATA.VARIANT[v.chain];
        if (v && v.remap && v.remap[z] && x++ < n) {
          return this.remapChar(v, z, x);
        }
      }
      return [this.unknownChar(y, z)];
    },
    fixChar: function(s, t) {
      if (s.length === 5) {
        s[5] = {};
      }
      if (s.c == null) {
        s[0] /= 1000;
        s[1] /= 1000;
        s[2] /= 1000;
        s[3] /= 1000;
        s[4] /= 1000;
        s.c = this.unicodeChar(t);
      }
      return s;
    },
    findBlock: function(u, y) {
      var t = u.Extra,
        v = u.file,
        x;
      for (var w = 0, s = t.length; w < s; w++) {
        if (typeof t[w] === 'number') {
          if (y === t[w]) {
            x = v;
            break;
          }
        } else {
          if (y < t[w][0]) {
            return;
          }
          if (y <= t[w][1]) {
            x = v;
            break;
          }
        }
      }
      if (x) {
        delete u.Extra;
        this.loadFont(v);
      }
    },
    unknownChar: function(s, v) {
      f.signal.Post(['CommonHTML Jax - unknown char', v, s]);
      var u = '';
      if (s.bold) {
        u += 'B';
      }
      if (s.italic) {
        u += 'I';
      }
      var t = this.FONTDATA.UNKNOWN[u || 'R'];
      if (!t[v]) {
        this.getUnknownChar(t, v);
      }
      return { type: 'unknown', n: v, font: t };
    },
    getUnknownChar: function(t, v) {
      var u = this.unicodeChar(v);
      var s = this.getHDW(u, t.className);
      t[v] = [
        0.8,
        0.2,
        s.w,
        0,
        s.w,
        { a: Math.max(0, (s.h - s.d) / 2), h: s.h, d: s.d }
      ];
      t[v].c = u;
    },
    styledText: function(t, w) {
      f.signal.Post(['CommonHTML Jax - styled text', w, t]);
      var u = t.style;
      var x = '_' + (u['font-family'] || t.className || '');
      if (u['font-weight']) {
        x += '_' + u['font-weight'];
      }
      if (u['font-style']) {
        x += '_' + u['font-style'];
      }
      if (!this.STYLEDTEXT) {
        this.STYLEDTEXT = {};
      }
      if (!this.STYLEDTEXT[x]) {
        this.STYLEDTEXT[x] = { className: t.className || '' };
      }
      var v = this.STYLEDTEXT[x];
      if (!v['_' + w]) {
        var s = this.getHDW(w, t.className || '', u);
        v['_' + w] = [
          0.8,
          0.2,
          s.w,
          0,
          s.w,
          { a: Math.max(0, (s.h - s.d) / 2), h: s.h, d: s.d }
        ];
        v['_' + w].c = w;
      }
      return {
        type: 'unknown',
        n: '_' + w,
        font: v,
        style: u,
        rscale: t.rscale
      };
    },
    getHDW: function(B, u, F) {
      var t = a.addElement(a.CHTMLnode, 'mjx-chartest', { className: u }, [
        ['mjx-char', { style: F }, [B]]
      ]);
      var s = a.addElement(a.CHTMLnode, 'mjx-chartest', { className: u }, [
        ['mjx-char', { style: F }, [B, ['mjx-box']]]
      ]);
      t.firstChild.style.fontSize = s.firstChild.style.fontSize = '';
      var v = 5 * a.em;
      var E = t.offsetHeight,
        C = s.offsetHeight,
        x = t.offsetWidth;
      a.CHTMLnode.removeChild(t);
      a.CHTMLnode.removeChild(s);
      if (C === 0) {
        v = 5 * a.defaultEm;
        var A = document.body.appendChild(document.createElement('div'));
        A.appendChild(t);
        A.appendChild(s);
        (E = t.offsetHeight), (C = s.offsetHeight), (x = t.offsetWidth);
        document.body.removeChild(A);
      }
      var z = (C - 1000) / v,
        D = x / v,
        y = E / v - z;
      return { h: y, d: z, w: D };
    },
    addCharList: function(v, x, y) {
      var w = { text: '', className: null, a: 0 };
      for (var t = 0, s = x.length; t < s; t++) {
        var u = x[t];
        if (this.charList[u.type]) {
          this.charList[u.type](u, v, y, w, s);
        }
      }
      if (w.text !== '') {
        if (v.childNodes.length) {
          this.charList.flushText(v, w);
        } else {
          m.addText(v, w.text);
          if (v.className) {
            v.className += ' ' + w.className;
          } else {
            v.className = w.className;
          }
        }
      }
      y.b = w.flushed ? 0 : y.a;
    },
    charList: {
      char: function(D, x, B, u, y) {
        var w = D.font,
          A = (w.remapCombining || {})[D.n];
        if (w.className === u.className) {
          A = null;
        } else {
          if (u.className || (A && u.text !== '')) {
            this.flushText(x, u);
          }
        }
        if (!u.a) {
          u.a = w.centerline / 1000;
        }
        if (u.a > (B.a || 0)) {
          B.a = u.a;
        }
        u.className = w.className;
        var t = w[D.n];
        if (A) {
          var v = w;
          if (g(A)) {
            v = a.FONTDATA.FONTS[A[1]];
            A = A[0];
            if (typeof v === 'string') {
              a.loadFont(v);
            }
          }
          if (v[D.n]) {
            a.fixChar(v[D.n], D.n);
          }
          t = a.fixChar(v[A], A);
          u.className = v.className;
        }
        u.text += t.c;
        if (B.h < t[0] + j) {
          B.t = B.h = t[0] + j;
        }
        if (B.d < t[1] + b) {
          B.b = B.d = t[1] + b;
        }
        if (B.l > B.w + t[3]) {
          B.l = B.w + t[3];
        }
        if (B.r < B.w + t[4]) {
          B.r = B.w + t[4];
        }
        B.w += t[2] * (D.rscale || 1);
        if (y == 1 && w.skew && w.skew[D.n]) {
          B.skew = w.skew[D.n];
        }
        if (t[5] && t[5].rfix) {
          this.flushText(x, u).style.marginRight = a.Em(t[5].rfix / 1000);
        }
        if (A) {
          var z = this.flushText(x, u);
          var s = (v[D.n] || w[D.n])[4] - (t[4] - t[2]);
          z.style.marginLeft = a.Em(-t[2] - s);
          if (s < 0) {
            z.style.marginRight = a.Em(-s);
          }
        }
      },
      space: function(t, s, v, u) {
        if (t.w) {
          if (u.text === '') {
            u.className = t.font.className;
          }
          this.flushText(s, u).style.marginRight = a.Em(t.w);
          v.w += t.w;
        }
      },
      unknown: function(t, s, w, u) {
        this['char'](t, s, w, u, 0);
        var v = t.font[t.n];
        if (v[5].a) {
          u.a = v[5].a;
          if (w.a == null || u.a > w.a) {
            w.a = u.a;
          }
        }
        s = this.flushText(s, u, t.style);
        if (v[2] < 3) {
          s.style.width = a.Em(v[2]);
        }
      },
      flushText: function(t, u, s) {
        t = a.addElement(
          t,
          'mjx-charbox',
          { className: u.className, style: s },
          [u.text]
        );
        if (u.a) {
          t.style.paddingBottom = a.Em(u.a);
        }
        u.text = '';
        u.className = null;
        u.a = 0;
        u.flushed = true;
        return t;
      }
    },
    handleText: function(u, x, t, w) {
      if (u.childNodes.length === 0) {
        a.addElement(u, 'mjx-char');
        w = a.BBOX.empty(w);
      }
      if (typeof t === 'string') {
        t = this.FONTDATA.VARIANT[t];
      }
      if (!t) {
        t = this.FONTDATA.VARIANT[d.VARIANT.NORMAL];
      }
      var s = { text: x, i: 0, length: x.length },
        v = [];
      if (t.style && s.length) {
        v.push(this.styledText(t, x));
      } else {
        while (s.i < s.length) {
          var y = this.getUnicode(s);
          v.push.apply(v, this.getCharList(t, y));
        }
      }
      if (v.length) {
        this.addCharList(u.firstChild, v, w);
      }
      w.clean();
      if (w.d < 0) {
        w.D = w.d;
        w.d = 0;
      }
      if (w.h - w.a) {
        u.firstChild.style[
          w.h - w.a < 0 ? 'marginTop' : 'paddingTop'
        ] = this.EmRounded(w.h - w.a);
      }
      if (w.d > -w.b) {
        u.firstChild.style.paddingBottom = this.EmRounded(w.d + w.b);
      }
      return w;
    },
    createDelimiter: function(x, s, u, A, v) {
      if (!s) {
        var B = this.BBOX.zero();
        B.w = B.r = this.TEX.nulldelimiterspace;
        a.addElement(x, 'mjx-box', { style: { width: B.w } });
        return B;
      }
      if (!(u instanceof Array)) {
        u = [u, u];
      }
      var z = u[1];
      u = u[0];
      var t = { alias: s };
      while (t.alias) {
        s = t.alias;
        t = this.FONTDATA.DELIMITERS[s];
        if (!t) {
          t = { HW: [0, this.FONTDATA.VARIANT[d.VARIANT.NORMAL]] };
        }
      }
      if (t.load) {
        f.RestartAfter(
          o.Require(this.fontDir + '/TeX/fontdata-' + t.load + '.js')
        );
      }
      for (var y = 0, w = t.HW.length; y < w; y++) {
        if (t.HW[y][0] >= u - 0.01 || (y == w - 1 && !t.stretch)) {
          if (t.HW[y][3]) {
            s = t.HW[y][3];
          }
          B = this.createChar(x, [s, t.HW[y][1]], t.HW[y][2] || 1, v);
          B.offset = 0.6 * B.w;
          if (A) {
            B.scale = A.scale;
            A.rscale = A.rscale;
          }
          return B;
        }
      }
      if (!t.stretch) {
        return B;
      }
      return this['extendDelimiter' + t.dir](x, z, t.stretch, A, v);
    },
    extendDelimiterV: function(E, x, P, w, C) {
      E = a.addElement(E, 'mjx-delim-v');
      var N = a.Element('span');
      var B,
        A,
        O,
        v,
        I,
        t,
        F,
        y,
        G = 1,
        M;
      I = this.createChar(N, P.top || P.ext, 1, C);
      B = N.removeChild(N.firstChild);
      t = this.createChar(N, P.bot || P.ext, 1, C);
      A = N.removeChild(N.firstChild);
      F = y = a.BBOX.zero();
      var J = I.h + I.d + t.h + t.d - l;
      E.appendChild(B);
      if (P.mid) {
        F = this.createChar(N, P.mid, 1, C);
        O = N.removeChild(N.firstChild);
        J += F.h + F.d;
        G = 2;
      }
      if (P.min && x < J * P.min) {
        x = J * P.min;
      }
      if (x > J) {
        y = this.createChar(N, P.ext, 1, C);
        v = N.removeChild(N.firstChild);
        var L = y.h + y.d,
          u = L - l;
        var D = Math.min(Math.ceil((x - J) / (G * u)), this.maxStretchyParts);
        if (P.fullExtenders) {
          x = D * G * u + J;
        } else {
          u = (x - J) / (G * D);
        }
        M = y.d + y.a - L / 2;
        v.style.margin = v.style.padding = '';
        v.style.lineHeight = a.Em(u);
        v.style.marginBottom = a.Em(M - l / 2 / G);
        v.style.marginTop = a.Em(-M - l / 2 / G);
        var K = v.textContent,
          z = '\n' + K;
        while (--D > 0) {
          K += z;
        }
        v.textContent = K;
        E.appendChild(v);
        if (P.mid) {
          E.appendChild(O);
          E.appendChild(v.cloneNode(true));
        }
      } else {
        M = (x - J - l) / G;
        B.style.marginBottom = a.Em(
          M + parseFloat(B.style.marginBottom || '0')
        );
        if (P.mid) {
          E.appendChild(O);
        }
        A.style.marginTop = a.Em(M + parseFloat(A.style.marginTop || '0'));
      }
      E.appendChild(A);
      var s = a.BBOX({
        w: Math.max(I.w, y.w, t.w, F.w),
        l: Math.min(I.l, y.l, t.l, F.l),
        r: Math.max(I.r, y.r, t.r, F.r),
        h: x - t.d,
        d: t.d,
        t: x - t.d,
        b: t.d
      });
      s.offset = 0.5 * s.w;
      if (w) {
        s.scale = w.scale;
        s.rscale = w.rscale;
      }
      return s;
    },
    extendDelimiterH: function(F, s, P, v, D) {
      F = a.addElement(F, 'mjx-delim-h');
      var N = a.Element('span');
      var t,
        M,
        O,
        u,
        K,
        C,
        x,
        G,
        z,
        H = 1;
      C = this.createChar(N, P.left || P.rep, 1, D);
      t = N.removeChild(N.firstChild);
      x = this.createChar(N, P.right || P.rep, 1, D);
      M = N.removeChild(N.firstChild);
      z = this.createChar(N, P.rep, 1, D);
      u = N.removeChild(N.firstChild);
      t.style.marginLeft = a.Em(-C.l);
      M.style.marginRight = a.Em(x.r - x.w);
      F.appendChild(t);
      var Q = a.BBOX.zero();
      Q.h = Math.max(C.h, x.h, z.h);
      Q.d = Math.max(C.D || C.d, x.D || x.d, z.D || z.d);
      var y = C.r - C.l + (x.r - x.l) - l;
      if (P.mid) {
        G = this.createChar(N, P.mid, 1, D);
        O = N.removeChild(N.firstChild);
        O.style.marginleft = a.Em(-G.l);
        O.style.marginRight = a.Em(G.r - G.w);
        y += G.r - G.l + l;
        H = 2;
        if (G.h > Q.h) {
          Q.h = G.h;
        }
        if (G.d > Q.d) {
          Q.d = G.d;
        }
      }
      if (P.min && s < y * P.min) {
        s = y * P.min;
      }
      Q.w = Q.r = s;
      if (s > y) {
        var B = z.r - z.l,
          J = B - l;
        var E = Math.min(Math.ceil((s - y) / (H * J)), this.maxStretchyParts);
        if (P.fullExtenders) {
          s = E * H * J + y;
        } else {
          J = (s - y) / (H * E);
        }
        var L = (B - J + l / H) / 2;
        u.style.marginLeft = a.Em(-z.l - L);
        u.style.marginRight = a.Em(z.r - z.w + L);
        u.style.letterSpacing = a.Em(-(z.w - J));
        t.style.marginRight = a.Em(C.r - C.w);
        M.style.marginleft = a.Em(-x.l);
        var I = u.textContent,
          A = I;
        while (--E > 0) {
          I += A;
        }
        u.textContent = I;
        F.appendChild(u);
        if (P.mid) {
          F.appendChild(O);
          K = F.appendChild(u.cloneNode(true));
        }
      } else {
        L = (s - y - l / H) / 2;
        t.style.marginRight = a.Em(C.r - C.w + L);
        if (P.mid) {
          F.appendChild(O);
        }
        M.style.marginLeft = a.Em(-x.l + L);
      }
      F.appendChild(M);
      this.adjustHeights([t, u, O, K, M], [C, z, G, z, x], Q);
      if (v) {
        Q.scale = v.scale;
        Q.rscale = v.rscale;
      }
      return Q;
    },
    adjustHeights: function(t, w, x) {
      var u = x.h,
        y = x.d;
      if (x.d < 0) {
        y = -x.d;
        x.D = x.d;
        x.d = 0;
      }
      for (var v = 0, s = t.length; v < s; v++) {
        if (t[v]) {
          t[v].style.paddingTop = a.Em(u - w[v].a);
          t[v].style.paddingBottom = a.Em(y + w[v].a);
          t[v].style.marginTop = t[v].style.marginBottom = 0;
        }
      }
    },
    createChar: function(u, y, w, t) {
      var B = '',
        x = { fonts: [y[1]], noRemap: true, cache: {} };
      if (t && t === d.VARIANT.BOLD && this.FONTDATA.FONTS[y[1] + '-Bold']) {
        x.fonts = [y[1] + '-Bold', y[1]];
      }
      if (typeof y[1] !== 'string') {
        x = y[1];
      }
      if (y[0] instanceof Array) {
        for (var z = 0, v = y[0].length; z < v; z++) {
          B += String.fromCharCode(y[0][z]);
        }
      } else {
        B = String.fromCharCode(y[0]);
      }
      if (y[4]) {
        w *= y[4];
      }
      var A = this.handleText(u, B, x),
        s = u.firstChild.style;
      if (w !== 1) {
        s.fontSize = this.Percent(w);
      }
      if (y[2]) {
        s.paddingLeft = this.Em(y[2]);
        A.w += y[2];
        A.r += y[2];
      }
      if (y[3]) {
        s.verticalAlign = this.Em(y[3]);
        A.h += y[3];
        if (A.h < 0) {
          A.h = 0;
        }
      }
      if (y[5]) {
        s.marginTop = this.Em(y[5]);
        A.h += y[5];
        A.t += y[5];
      }
      if (y[6]) {
        s.marginBottom = this.Em(y[6]);
        A.d += y[6];
        A.b += y[6];
      }
      return A;
    },
    length2em: function(w, u, x) {
      if (typeof w !== 'string') {
        w = w.toString();
      }
      if (w === '') {
        return '';
      }
      if (w === d.SIZE.NORMAL) {
        return 1;
      }
      if (w === d.SIZE.BIG) {
        return 2;
      }
      if (w === d.SIZE.SMALL) {
        return 0.71;
      }
      if (this.MATHSPACE[w]) {
        return this.MATHSPACE[w];
      }
      var t = w.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var s = parseFloat(t[1] || '1'),
        v = t[2];
      if (u == null) {
        u = 1;
      }
      if (!x) {
        x = 1;
      }
      x = 1 / this.em / x;
      if (v === 'em') {
        return s;
      }
      if (v === 'ex') {
        return s * this.TEX.x_height;
      }
      if (v === '%') {
        return (s / 100) * u;
      }
      if (v === 'px') {
        return s * x;
      }
      if (v === 'pt') {
        return s / 10;
      }
      if (v === 'pc') {
        return s * 1.2;
      }
      x *= this.pxPerInch;
      if (v === 'in') {
        return s * x;
      }
      if (v === 'cm') {
        return (s * x) / 2.54;
      }
      if (v === 'mm') {
        return (s * x) / 25.4;
      }
      if (v === 'mu') {
        return s / 18;
      }
      return s * u;
    },
    thickness2em: function(s, t) {
      var u = a.TEX.rule_thickness / (t || 1);
      if (s === d.LINETHICKNESS.MEDIUM) {
        return u;
      }
      if (s === d.LINETHICKNESS.THIN) {
        return 0.67 * u;
      }
      if (s === d.LINETHICKNESS.THICK) {
        return 1.67 * u;
      }
      return this.length2em(s, u, t);
    },
    Em: function(s) {
      if (Math.abs(s) < 0.001) {
        return '0';
      }
      return s.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    EmRounded: function(s) {
      s = (Math.round(s * a.em) + 0.05) / a.em;
      if (Math.abs(s) < 0.0006) {
        return '0em';
      }
      return s.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    unEm: function(s) {
      return parseFloat(s);
    },
    Px: function(s, t) {
      s *= this.em;
      if (t && s < t) {
        s = t;
      }
      if (Math.abs(s) < 0.1) {
        return '0';
      }
      return s.toFixed(1).replace(/\.0$/, '') + 'px';
    },
    Percent: function(s) {
      return (100 * s).toFixed(1).replace(/\.?0+$/, '') + '%';
    },
    Transform: function(v, t, s) {
      var u = v.style;
      u.transform = u.WebkitTransform = u.MozTransform = u['-ms-transform'] = t;
      if (s) {
        u.transformOrigin = u.WebkitTransformOrigin = u.MozTransformOrigin = u[
          '-ms-transform-origin'
        ] = s;
      }
    },
    arrayEntry: function(s, t) {
      return s[Math.max(0, Math.min(t, s.length - 1))];
    },
    removeStyles: [
      'fontSize',
      'fontFamily',
      'fontWeight',
      'fontStyle',
      'fontVariant',
      'font'
    ]
  });
  a.BBOX = MathJax.Object.Subclass(
    {
      Init: function(s) {
        for (var t in s) {
          if (s.hasOwnProperty(t)) {
            this[t] = s[t];
          }
        }
      },
      clean: function() {
        if (this.h === -i) {
          this.h = 0;
        }
        if (this.d === -i) {
          this.d = 0;
        }
        if (this.l === i) {
          this.l = 0;
        }
        if (this.r === -i) {
          this.r = 0;
        }
        if (this.t === -i) {
          this.t = 0;
        }
        if (this.b === -i) {
          this.b = 0;
        }
        if (this.D && this.d > 0) {
          delete this.D;
        }
      },
      rescale: function(s) {
        this.w *= s;
        this.h *= s;
        this.d *= s;
        this.l *= s;
        this.r *= s;
        this.t *= s;
        this.b *= s;
        if (this.L) {
          this.L *= s;
        }
        if (this.R) {
          this.R *= s;
        }
        if (this.D) {
          this.D *= s;
        }
      },
      combine: function(t, s, v) {
        t.X = s;
        t.Y = v;
        var u = t.rscale;
        if (s + u * t.r > this.r) {
          this.r = s + u * t.r;
        }
        if (s + u * t.l < this.l) {
          this.l = s + u * t.l;
        }
        if (s + u * (t.w + (t.L || 0) + (t.R || 0)) > this.w) {
          this.w = s + u * (t.w + (t.L || 0) + (t.R || 0));
        }
        if (v + u * t.h > this.h) {
          this.h = v + u * t.h;
        }
        if (
          t.D &&
          (this.D == null || u * t.D - v > this.D) &&
          u * t.D > this.d
        ) {
          this.D = u * t.D - v;
        } else {
          if (t.D == null && this.D) {
            delete this.D;
          }
        }
        if (u * t.d - v > this.d) {
          this.d = u * t.d - v;
        }
        if (v + u * t.t > this.t) {
          this.t = v + u * t.t;
        }
        if (u * t.b - v > this.b) {
          this.b = u * t.b - v;
        }
      },
      append: function(t) {
        var u = t.rscale;
        var s = this.w;
        if (s + u * t.r > this.r) {
          this.r = s + u * t.r;
        }
        if (s + u * t.l < this.l) {
          this.l = s + u * t.l;
        }
        this.w += u * (t.w + (t.L || 0) + (t.R || 0));
        if (u * t.h > this.h) {
          this.h = u * t.h;
        }
        if (t.D && (this.D == null || u * t.D > this.D) && u * t.D > this.d) {
          this.D = u * t.D;
        } else {
          if (t.D == null && this.D) {
            delete this.D;
          }
        }
        if (u * t.d > this.d) {
          this.d = u * t.d;
        }
        if (u * t.t > this.t) {
          this.t = u * t.t;
        }
        if (u * t.b > this.b) {
          this.b = u * t.b;
        }
      },
      updateFrom: function(s) {
        this.h = s.h;
        this.d = s.d;
        this.w = s.w;
        this.r = s.r;
        this.l = s.l;
        this.t = s.t;
        this.b = s.b;
        if (s.pwidth) {
          this.pwidth = s.pwidth;
        }
        if (s.D) {
          this.D = s.D;
        } else {
          delete this.D;
        }
      },
      adjust: function(t, s, v, u) {
        this[s] += a.length2em(t, 1, this.scale);
        if (u == null) {
          if (this[s] > this[v]) {
            this[v] = this[s];
          }
        } else {
          if (this[v] < u) {
            this[v] = u;
          }
        }
      }
    },
    {
      zero: function() {
        return a.BBOX({
          h: 0,
          d: 0,
          w: 0,
          l: 0,
          r: 0,
          t: 0,
          b: 0,
          scale: 1,
          rscale: 1
        });
      },
      empty: function(s) {
        if (!s) {
          s = a.BBOX.zero();
        }
        s.h = s.d = s.r = s.t = s.b = -i;
        s.w = 0;
        s.l = i;
        delete s.pwidth;
        return s;
      },
      styleAdjust: [
        ['borderTopWidth', 'h', 't'],
        ['borderRightWidth', 'w', 'r'],
        ['borderBottomWidth', 'd', 'b'],
        ['borderLeftWidth', 'w', 'l', 0],
        ['paddingTop', 'h', 't'],
        ['paddingRight', 'w', 'r'],
        ['paddingBottom', 'd', 'b'],
        ['paddingLeft', 'w', 'l', 0]
      ]
    }
  );
  MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
    d = MathJax.ElementJax.mml;
    d.mbase.Augment(
      {
        toCommonHTML: function(t, s) {
          return this.CHTMLdefaultNode(t, s);
        },
        CHTMLmultiline: function() {
          d.mbase.CHTMLautoloadFile('multiline');
        },
        CHTMLdefaultNode: function(v, t) {
          if (!t) {
            t = {};
          }
          v = this.CHTMLcreateNode(v);
          this.CHTML = a.BBOX.empty();
          this.CHTMLhandleStyle(v);
          if (this.isToken) {
            this.CHTMLgetVariant();
          }
          this.CHTMLhandleScale(v);
          var s = Math.max(t.minChildren || 0, this.data.length);
          for (var u = 0; u < s; u++) {
            this.CHTMLaddChild(v, u, t);
          }
          if (!t.noBBox) {
            this.CHTML.clean();
          }
          this.CHTMLhandleSpace(v);
          this.CHTMLhandleBBox(v);
          this.CHTMLhandleColor(v);
          return v;
        },
        CHTMLaddChild: function(x, t, s) {
          var z = this.data[t],
            w;
          var u = s.childNodes;
          if (u instanceof Array) {
            u = u[t] || 'span';
          }
          if (z) {
            if (u) {
              x = a.addElement(x, u);
            }
            w = z.toCommonHTML(x, s.childOptions);
            if (u && z.CHTML.rscale !== 1) {
              x.style.fontSize = x.firstChild.style.fontSize;
              x.firstChild.style.fontSize = '';
            }
            if (!s.noBBox) {
              var y = this.CHTML,
                v = z.CHTML;
              y.append(v);
              if (this.data.length === 1) {
                if (v.ic) {
                  y.ic = v.ic;
                }
                if (v.skew) {
                  y.skew = v.skew;
                }
              } else {
                delete y.ic;
                delete y.skew;
              }
              if (v.pwidth) {
                y.pwidth = v.pwidth;
              }
            }
          } else {
            if (s.forceChild) {
              w = a.addElement(x, u || 'mjx-box');
            }
          }
          return w;
        },
        CHTMLchildNode: function(t, s) {
          t = t.childNodes[s];
          if (t.nodeName.toLowerCase() === 'a') {
            t = t.firstChild;
          }
          return t;
        },
        CHTMLcoreNode: function(s) {
          if (this.inferRow && this.data[0]) {
            return this.data[0].CHTMLcoreNode(s.firstChild);
          }
          return this.CHTMLchildNode(s, this.CoreIndex());
        },
        CHTMLstretchChildV: function(v, u, y) {
          var x = this.data[v];
          if (x) {
            var z = this.CHTML,
              t = x.CHTML;
            if (
              t.stretch ||
              (t.stretch == null && x.CHTMLcanStretch('Vertical', u, y))
            ) {
              var s = t.w;
              t = x.CHTMLstretchV(u, y);
              z.w += t.w - s;
              if (z.w > z.r) {
                z.r = z.w;
              }
              if (t.h > z.h) {
                z.h = t.h;
              }
              if (t.d > z.d) {
                z.d = t.d;
              }
              if (t.t > z.t) {
                z.t = t.t;
              }
              if (t.b > z.b) {
                z.b = t.b;
              }
            }
          }
        },
        CHTMLstretchChildH: function(v, s, x) {
          var y = this.data[v];
          if (y) {
            var z = this.CHTML,
              u = y.CHTML;
            if (
              u.stretch ||
              (u.stretch == null && y.CHTMLcanStretch('Horizontal', s))
            ) {
              var t = u.w;
              u = y.CHTMLstretchH(this.CHTMLchildNode(x, v), s);
              z.w += u.w - t;
              if (z.w > z.r) {
                z.r = z.w;
              }
              if (u.h > z.h) {
                z.h = u.h;
              }
              if (u.d > z.d) {
                z.d = u.d;
              }
              if (u.t > z.t) {
                z.t = u.t;
              }
              if (u.b > z.b) {
                z.b = u.b;
              }
            }
          }
        },
        CHTMLupdateFrom: function(s) {
          this.CHTML.updateFrom(s);
          if (this.inferRow) {
            this.data[0].CHTML.updateFrom(s);
          }
        },
        CHTMLcanStretch: function(w, u, v) {
          var t = false;
          if (this.isEmbellished()) {
            var s = this.Core();
            if (s && s !== this) {
              t = s.CHTMLcanStretch(w, u, v);
            }
          }
          this.CHTML.stretch = t;
          return t;
        },
        CHTMLstretchV: function(s, t) {
          this.CHTMLupdateFrom(this.Core().CHTMLstretchV(s, t));
          return this.CHTML;
        },
        CHTMLstretchH: function(t, s) {
          this.CHTMLupdateFrom(this.CHTMLstretchCoreH(t, s));
          return this.CHTML;
        },
        CHTMLstretchCoreH: function(t, s) {
          return this.Core().CHTMLstretchH(this.CHTMLcoreNode(t), s);
        },
        CHTMLcreateNode: function(s) {
          if (!this.CHTML) {
            this.CHTML = {};
          }
          this.CHTML = a.BBOX.zero();
          if (this.href) {
            s = a.addElement(s, 'a', { href: this.href, isMathJax: true });
          }
          if (!this.CHTMLnodeID) {
            this.CHTMLnodeID = a.GetID();
          }
          var t = (this.id || 'MJXc-Node-' + this.CHTMLnodeID) + a.idPostfix;
          return this.CHTMLhandleAttributes(
            a.addElement(s, 'mjx-' + this.type, { id: t })
          );
        },
        CHTMLnodeElement: function() {
          if (!this.CHTMLnodeID) {
            return null;
          }
          return document.getElementById(
            (this.id || 'MJXc-Node-' + this.CHTMLnodeID) + a.idPostfix
          );
        },
        CHTMLlength2em: function(t, s) {
          return a.length2em(t, s, this.CHTML.scale);
        },
        CHTMLhandleAttributes: function(v) {
          if (this['class']) {
            if (v.className) {
              v.className += ' ' + this['class'];
            } else {
              v.className = this['class'];
            }
          }
          if (this.attrNames) {
            var z = this.attrNames,
              u = d.nocopyAttributes,
              y = f.config.ignoreMMLattributes;
            var w =
              this.type === 'mstyle'
                ? d.math.prototype.defaults
                : this.defaults;
            for (var t = 0, s = z.length; t < s; t++) {
              var x = z[t];
              if (
                y[x] == false ||
                (!u[x] && !y[x] && w[x] == null && typeof v[x] === 'undefined')
              ) {
                v.setAttribute(x, this.attr[x]);
              }
            }
          }
          return v;
        },
        CHTMLhandleScale: function(v) {
          var x = 1,
            u = this.parent,
            w = u ? u.CHTML.scale : 1;
          var s = this.getValues('scriptlevel', 'fontsize');
          s.mathsize = this.Get('mathsize', null, !this.isToken);
          if (s.scriptlevel !== 0) {
            if (s.scriptlevel > 2) {
              s.scriptlevel = 2;
            }
            x = Math.pow(this.Get('scriptsizemultiplier'), s.scriptlevel);
            s.scriptminsize = a.length2em(this.Get('scriptminsize'), 0.8, 1);
            if (x < s.scriptminsize) {
              x = s.scriptminsize;
            }
          }
          if (
            this.removedStyles &&
            this.removedStyles.fontSize &&
            !s.fontsize
          ) {
            s.fontsize = this.removedStyles.fontSize;
          }
          if (s.fontsize && !this.mathsize) {
            s.mathsize = s.fontsize;
          }
          if (s.mathsize !== 1) {
            x *= a.length2em(s.mathsize, 1, 1);
          }
          var t = this.CHTMLvariant;
          if (t && t.style && t.style['font-family']) {
            x *= a.config.scale / 100 / a.scale;
          }
          this.CHTML.scale = x;
          w = this.CHTML.rscale = x / w;
          if (Math.abs(w - 1) < 0.001) {
            w = 1;
          }
          if (v && w !== 1) {
            v.style.fontSize = a.Percent(w);
          }
          return x;
        },
        CHTMLhandleStyle: function(v) {
          if (!this.style) {
            return;
          }
          var u = v.style;
          u.cssText = this.style;
          this.removedStyles = {};
          for (var t = 0, s = a.removeStyles.length; t < s; t++) {
            var w = a.removeStyles[t];
            if (u[w]) {
              this.removedStyles[w] = u[w];
              u[w] = '';
            }
          }
        },
        CHTMLhandleBBox: function(w) {
          var t = this.CHTML,
            v = w.style;
          if (this.data.length === 1 && (this.data[0].CHTML || {}).pwidth) {
            t.pwidth = this.data[0].CHTML.pwidth;
            t.mwidth = this.data[0].CHTML.mwidth;
            v.width = '100%';
          } else {
            if (t.pwidth) {
              t.mwidth = a.Em(t.w);
              v.width = '100%';
            } else {
              if (t.w < 0) {
                v.width = '0px';
                v.marginRight = a.Em(t.w);
              }
            }
          }
          if (!this.style) {
            return;
          }
          for (var u = 0, s = a.BBOX.styleAdjust.length; u < s; u++) {
            var x = a.BBOX.styleAdjust[u];
            if (x && v[x[0]]) {
              t.adjust(v[x[0]], x[1], x[2], x[3]);
            }
          }
        },
        CHTMLhandleColor: function(s) {
          if (this.mathcolor) {
            s.style.color = this.mathcolor;
          } else {
            if (this.color) {
              s.style.color = this.color;
            }
          }
          if (this.mathbackground) {
            s.style.backgroundColor = this.mathbackground;
          } else {
            if (this.background) {
              s.style.backgroundColor = this.background;
            }
          }
        },
        CHTMLhandleSpace: function(s) {
          if (!this.useMMLspacing) {
            var t = this.texSpacing();
            if (t !== '') {
              this.CHTML.L = this.CHTMLlength2em(t);
              s.className += ' ' + a.SPACECLASS[t];
            }
          }
        },
        CHTMLhandleText: function(t, u, s) {
          if (t.firstChild && !this.CHTML) {
            this.CHTML = a.BBOX.empty();
          }
          this.CHTML = a.handleText(t, u, s, this.CHTML);
        },
        CHTMLgetVariant: function() {
          var s = this.getValues(
              'mathvariant',
              'fontfamily',
              'fontweight',
              'fontstyle'
            ),
            u;
          s.hasVariant = this.Get('mathvariant', true);
          if (this.removedStyles) {
            u = this.removedStyles;
            if (u.fontFamily) {
              s.family = u.fontFamily;
            }
            if (u.fontWeight) {
              s.weight = u.fontWeight;
            }
            if (u.fontStyle) {
              s.style = u.fontStyle;
            }
          }
          if (!s.hasVariant) {
            if (s.fontfamily) {
              s.family = s.fontfamily;
            }
            if (s.fontweight) {
              s.weight = s.fontweight;
            }
            if (s.fontstyle) {
              s.style = s.fontstyle;
            }
          }
          if (s.weight && s.weight.match(/^\d+$/)) {
            s.weight = parseInt(s.weight) > 600 ? 'bold' : 'normal';
          }
          var t = s.mathvariant;
          if (this.variantForm) {
            t = '-TeX-variant';
          }
          if (s.family && !s.hasVariant) {
            if (!s.weight && s.mathvariant.match(/bold/)) {
              s.weight = 'bold';
            }
            if (!s.style && s.mathvariant.match(/italic/)) {
              s.style = 'italic';
            }
            this.CHTMLvariant = {
              fonts: [],
              noRemap: true,
              cache: {},
              style: {
                'font-family': s.family,
                'font-weight': s.weight || 'normal',
                'font-style': s.style || 'normal'
              }
            };
            return;
          }
          if (s.weight === 'bold') {
            t =
              {
                normal: d.VARIANT.BOLD,
                italic: d.VARIANT.BOLDITALIC,
                fraktur: d.VARIANT.BOLDFRAKTUR,
                script: d.VARIANT.BOLDSCRIPT,
                'sans-serif': d.VARIANT.BOLDSANSSERIF,
                'sans-serif-italic': d.VARIANT.SANSSERIFBOLDITALIC
              }[t] || t;
          } else {
            if (s.weight === 'normal') {
              t =
                {
                  bold: d.VARIANT.normal,
                  'bold-italic': d.VARIANT.ITALIC,
                  'bold-fraktur': d.VARIANT.FRAKTUR,
                  'bold-script': d.VARIANT.SCRIPT,
                  'bold-sans-serif': d.VARIANT.SANSSERIF,
                  'sans-serif-bold-italic': d.VARIANT.SANSSERIFITALIC
                }[t] || t;
            }
          }
          if (s.style === 'italic') {
            t =
              {
                normal: d.VARIANT.ITALIC,
                bold: d.VARIANT.BOLDITALIC,
                'sans-serif': d.VARIANT.SANSSERIFITALIC,
                'bold-sans-serif': d.VARIANT.SANSSERIFBOLDITALIC
              }[t] || t;
          } else {
            if (s.style === 'normal') {
              t =
                {
                  italic: d.VARIANT.NORMAL,
                  'bold-italic': d.VARIANT.BOLD,
                  'sans-serif-italic': d.VARIANT.SANSSERIF,
                  'sans-serif-bold-italic': d.VARIANT.BOLDSANSSERIF
                }[t] || t;
            }
          }
          this.CHTMLvariant =
            a.FONTDATA.VARIANT[t] || a.FONTDATA.VARIANT[d.VARIANT.NORMAL];
        },
        CHTMLbboxFor: function(s) {
          if (this.data[s] && this.data[s].CHTML) {
            return this.data[s].CHTML;
          }
          return a.BBOX.zero();
        },
        CHTMLdrawBBox: function(t, u) {
          if (!u) {
            u = this.CHTML;
          }
          var s = a.Element(
            'mjx-box',
            {
              style: { opacity: 0.25, 'margin-left': a.Em(-(u.w + (u.R || 0))) }
            },
            [
              [
                'mjx-box',
                {
                  style: {
                    height: a.Em(u.h),
                    width: a.Em(u.w),
                    'background-color': 'red'
                  }
                }
              ],
              [
                'mjx-box',
                {
                  style: {
                    height: a.Em(u.d),
                    width: a.Em(u.w),
                    'margin-left': a.Em(-u.w),
                    'vertical-align': a.Em(-u.d),
                    'background-color': 'green'
                  }
                }
              ]
            ]
          );
          if (t.nextSibling) {
            t.parentNode.insertBefore(s, t.nextSibling);
          } else {
            t.parentNode.appendChild(s);
          }
        },
        CHTMLnotEmpty: function(s) {
          while (
            s &&
            s.data.length < 2 &&
            (s.type === 'mrow' || s.type === 'texatom')
          ) {
            s = s.data[0];
          }
          return !!s;
        }
      },
      {
        CHTMLautoload: function() {
          this.constructor.Augment({ toCommonHTML: d.mbase.CHTMLautoloadFail });
          var s = a.autoloadDir + '/' + this.type + '.js';
          f.RestartAfter(o.Require(s));
        },
        CHTMLautoloadFail: function() {
          throw Error("CommonHTML can't autoload '" + this.type + "'");
        },
        CHTMLautoloadList: {},
        CHTMLautoloadFile: function(s) {
          if (d.mbase.CHTMLautoloadList.hasOwnProperty(s)) {
            throw Error("CommonHTML can't autoload file '" + s + "'");
          }
          d.mbase.CHTMLautoloadList[s] = true;
          var t = a.autoloadDir + '/' + s + '.js';
          f.RestartAfter(o.Require(t));
        },
        CHTMLstretchV: function(s, t) {
          this.Core().CHTMLstretchV(s, t);
          this.toCommonHTML(this.CHTMLnodeElement(), { stretch: true });
          return this.CHTML;
        },
        CHTMLstretchH: function(t, s) {
          this.CHTMLupdateFrom(this.CHTMLstretchCoreH(t, s));
          this.toCommonHTML(t, { stretch: true });
          return this.CHTML;
        }
      }
    );
    d.chars.Augment({
      toCommonHTML: function(t, s) {
        this.CHTML = null;
        if (s == null) {
          s = {};
        }
        var u = this.toString();
        if (s.remap) {
          u = s.remap(u, s.remapchars);
        }
        this.CHTMLhandleText(t, u, s.variant || this.parent.CHTMLvariant);
      }
    });
    d.entity.Augment({
      toCommonHTML: function(t, s) {
        if (s == null) {
          s = {};
        }
        var u = this.toString();
        if (s.remapchars) {
          u = s.remap(u, s.remapchars);
        }
        this.CHTMLhandleText(t, u, s.variant || this.parent.CHTMLvariant);
      }
    });
    d.math.Augment({
      toCommonHTML: function(x) {
        x = this.CHTMLdefaultNode(x);
        if (this.CHTML.w < 0) {
          x.parentNode.style.width = '0px';
          x.parentNode.style.marginRight = a.Em(this.CHTML.w);
        }
        var v = this.Get('alttext');
        if (v && !x.getAttribute('aria-label')) {
          x.setAttribute('aria-label', v);
        }
        if (this.CHTML.pwidth) {
          x.parentNode.style.minWidth = this.CHTML.mwidth || a.Em(this.CHTML.w);
          x.parentNode.className = 'mjx-full-width ' + x.parentNode.className;
          x.style.width = this.CHTML.pwidth;
        } else {
          if (!this.isMultiline && this.Get('display') === 'block') {
            var u = this.getValues(
              'indentalignfirst',
              'indentshiftfirst',
              'indentalign',
              'indentshift'
            );
            if (u.indentalignfirst !== d.INDENTALIGN.INDENTALIGN) {
              u.indentalign = u.indentalignfirst;
            }
            if (u.indentalign === d.INDENTALIGN.AUTO) {
              u.indentalign = r.displayAlign;
            }
            if (u.indentshiftfirst !== d.INDENTSHIFT.INDENTSHIFT) {
              u.indentshift = u.indentshiftfirst;
            }
            if (u.indentshift === 'auto') {
              u.indentshift = '0';
            }
            var t = this.CHTMLlength2em(u.indentshift, a.cwidth);
            if (r.displayIndent !== '0') {
              var s = this.CHTMLlength2em(r.displayIndent, a.cwidth);
              t += u.indentalign === d.INDENTALIGN.RIGHT ? -s : s;
            }
            var w = x.parentNode.parentNode.style;
            x.parentNode.style.textAlign = w.textAlign = u.indentalign;
            if (t) {
              t *= a.em / a.outerEm;
              f.Insert(
                w,
                {
                  left: { marginLeft: a.Em(t) },
                  right: { marginRight: a.Em(-t) },
                  center: { marginLeft: a.Em(t), marginRight: a.Em(-t) }
                }[u.indentalign]
              );
            }
          }
        }
        return x;
      }
    });
    d.mi.Augment({
      toCommonHTML: function(s) {
        s = this.CHTMLdefaultNode(s);
        var u = this.CHTML,
          t = this.data.join('');
        if (u.skew != null && !a.isChar(t)) {
          delete u.skew;
        }
        if (u.r > u.w && a.isChar(t) && !this.CHTMLvariant.noIC) {
          u.ic = u.r - u.w;
          u.w = u.r;
          s.lastChild.style.paddingRight = a.Em(u.ic);
        }
        return s;
      }
    });
    d.mn.Augment({
      CHTMLremapMinus: function(s) {
        return s.replace(/^-/, '\u2212');
      },
      toCommonHTML: function(s) {
        s = this.CHTMLdefaultNode(s, {
          childOptions: { remap: this.CHTMLremapMinus }
        });
        var u = this.CHTML,
          t = this.data.join('');
        if (u.skew != null && !a.isChar(t)) {
          delete u.skew;
        }
        if (u.r > u.w && a.isChar(t) && !this.CHTMLvariant.noIC) {
          u.ic = u.r - u.w;
          u.w = u.r;
          s.lastChild.style.paddingRight = a.Em(u.ic);
        }
        return s;
      }
    });
    d.mo.Augment({
      toCommonHTML: function(v) {
        v = this.CHTMLcreateNode(v);
        this.CHTMLhandleStyle(v);
        this.CHTMLgetVariant();
        this.CHTMLhandleScale(v);
        a.BBOX.empty(this.CHTML);
        var t = this.getValues('displaystyle', 'largeop');
        t.variant = this.CHTMLvariant;
        t.text = this.data.join('');
        if (t.text == '') {
          if (this.fence) {
            v.style.width = a.Em(a.TEX.nulldelimiterspace);
          }
        } else {
          this.CHTMLadjustAccent(t);
          this.CHTMLadjustVariant(t);
          for (var u = 0, s = this.data.length; u < s; u++) {
            this.CHTMLaddChild(v, u, {
              childOptions: {
                variant: t.mathvariant,
                remap: this.remap,
                remapchars: t.remapchars
              }
            });
          }
          if (!a.isChar(t.text)) {
            delete this.CHTML.skew;
          } else {
            if (this.CHTML.w === 0 && this.CHTML.l < 0) {
              this.CHTMLfixCombiningChar(v);
            }
          }
          if (t.largeop) {
            this.CHTMLcenterOp(v);
          }
        }
        this.CHTML.clean();
        this.CHTMLhandleBBox(v);
        this.CHTMLhandleSpace(v);
        this.CHTMLhandleColor(v);
        return v;
      },
      CHTMLhandleSpace: function(v) {
        if (this.hasMMLspacing()) {
          var t = this.getValues('scriptlevel', 'lspace', 'rspace');
          t.lspace = Math.max(0, this.CHTMLlength2em(t.lspace));
          t.rspace = Math.max(0, this.CHTMLlength2em(t.rspace));
          if (t.scriptlevel > 0) {
            if (!this.hasValue('lspace')) {
              t.lspace = 0.15;
            }
            if (!this.hasValue('rspace')) {
              t.rspace = 0.15;
            }
          }
          var s = this,
            u = this.Parent();
          while (u && u.isEmbellished() && u.Core() === s) {
            s = u;
            u = u.Parent();
            v = s.CHTMLnodeElement();
          }
          if (t.lspace) {
            v.style.paddingLeft = a.Em(t.lspace);
          }
          if (t.rspace) {
            v.style.paddingRight = a.Em(t.rspace);
          }
          this.CHTML.L = t.lspace;
          this.CHTML.R = t.rspace;
        } else {
          this.SUPER(arguments).CHTMLhandleSpace.apply(this, arguments);
        }
      },
      CHTMLadjustAccent: function(u) {
        var t = this.CoreParent();
        u.parent = t;
        if (a.isChar(u.text) && t && t.isa(d.munderover)) {
          var v = t.data[t.over],
            s = t.data[t.under];
          if (v && this === v.CoreMO() && t.Get('accent')) {
            u.remapchars = a.FONTDATA.REMAPACCENT;
          } else {
            if (s && this === s.CoreMO() && t.Get('accentunder')) {
              u.remapchars = a.FONTDATA.REMAPACCENTUNDER;
            }
          }
        }
      },
      CHTMLadjustVariant: function(t) {
        var s = t.parent,
          u = s && s.isa(d.msubsup) && this !== s.data[s.base];
        if (t.largeop) {
          t.mathvariant = t.displaystyle ? '-largeOp' : '-smallOp';
        }
        if (u) {
          t.remapchars = this.remapChars;
          if (t.text.match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
            t.mathvariant = '-TeX-variant';
          }
        }
      },
      CHTMLfixCombiningChar: function(s) {
        s = s.firstChild;
        var t = a.Element('mjx-box', {
          style: { width: '.25em', 'margin-left': '-.25em' }
        });
        s.insertBefore(t, s.firstChild);
      },
      CHTMLcenterOp: function(s) {
        var u = this.CHTML;
        var t = (u.h - u.d) / 2 - a.TEX.axis_height;
        if (Math.abs(t) > 0.001) {
          s.style.verticalAlign = a.Em(-t);
        }
        u.h -= t;
        u.d += t;
        if (u.r > u.w) {
          u.ic = u.r - u.w;
          u.w = u.r;
          s.style.paddingRight = a.Em(u.ic);
        }
      },
      CHTMLcanStretch: function(w, u, v) {
        if (!this.Get('stretchy')) {
          return false;
        }
        var x = this.data.join('');
        if (!a.isChar(x)) {
          return false;
        }
        var t = { text: x };
        this.CHTMLadjustAccent(t);
        if (t.remapchars) {
          x = t.remapchars[x] || x;
        }
        x = a.FONTDATA.DELIMITERS[x.charCodeAt(0)];
        var s = x && x.dir === w.substr(0, 1);
        if (s) {
          s =
            this.CHTML.h !== u ||
            this.CHTML.d !== v ||
            !!this.Get('minsize', true) ||
            !!this.Get('maxsize', true);
          if (s) {
            this.CHTML.stretch = true;
          }
        }
        return s;
      },
      CHTMLstretchV: function(v, y) {
        var w = this.CHTMLnodeElement(),
          x = this.CHTML;
        var t = this.getValues('symmetric', 'maxsize', 'minsize');
        var u,
          s = a.TEX.axis_height;
        if (t.symmetric) {
          u = 2 * Math.max(v - s, y + s);
        } else {
          u = v + y;
        }
        t.maxsize = this.CHTMLlength2em(t.maxsize, x.h + x.d);
        t.minsize = this.CHTMLlength2em(t.minsize, x.h + x.d);
        u = Math.max(t.minsize, Math.min(t.maxsize, u));
        if (u !== x.sH) {
          if (u != t.minsize) {
            u = [
              Math.max(
                (u * a.TEX.delimiterfactor) / 1000,
                u - a.TEX.delimitershortfall
              ),
              u
            ];
          }
          while (w.firstChild) {
            w.removeChild(w.firstChild);
          }
          this.CHTML = x = a.createDelimiter(
            w,
            this.data.join('').charCodeAt(0),
            u,
            x
          );
          x.sH = u instanceof Array ? u[1] : u;
          if (t.symmetric) {
            u = (x.h + x.d) / 2 + s;
          } else {
            u = ((x.h + x.d) * v) / (v + y);
          }
          u -= x.h;
          if (Math.abs(u) > 0.05) {
            w.style.verticalAlign = a.Em(u);
            x.h += u;
            x.d -= u;
            x.t += u;
            x.b -= u;
          }
        }
        return this.CHTML;
      },
      CHTMLstretchH: function(u, s) {
        var v = this.CHTML;
        var t = this.getValues(
          'maxsize',
          'minsize',
          'mathvariant',
          'fontweight'
        );
        if (
          (t.fontweight === 'bold' ||
            (this.removedStyles || {}).fontWeight === 'bold' ||
            parseInt(t.fontweight) >= 600) &&
          !this.Get('mathvariant', true)
        ) {
          t.mathvariant = d.VARIANT.BOLD;
        }
        t.maxsize = this.CHTMLlength2em(t.maxsize, v.w);
        t.minsize = this.CHTMLlength2em(t.minsize, v.w);
        s = Math.max(t.minsize, Math.min(t.maxsize, s));
        if (s !== v.sW) {
          while (u.firstChild) {
            u.removeChild(u.firstChild);
          }
          this.CHTML = v = a.createDelimiter(
            u,
            this.data.join('').charCodeAt(0),
            s,
            v,
            t.mathvariant
          );
          v.sW = s;
        }
        return this.CHTML;
      }
    });
    d.mtext.Augment({
      CHTMLgetVariant: function() {
        if (a.config.mtextFontInherit || this.Parent().type === 'merror') {
          var u = a.config.scale / 100 / a.scale;
          var t = {
            cache: {},
            fonts: [],
            className: 'MJXc-font-inherit',
            rscale: u,
            style: { 'font-size': a.Percent(u) }
          };
          var s = this.Get('mathvariant');
          if (s.match(/bold/)) {
            t.style['font-weight'] = 'bold';
          }
          if (s.match(/italic|-tex-mathit/)) {
            t.style['font-style'] = 'italic';
          }
          if (s === 'monospace') {
            t.className += ' MJXc-monospace-font';
          }
          if (s === 'double-struck') {
            t.className += ' MJXc-double-struck-font';
          }
          if (s.match(/fraktur/)) {
            t.className += ' MJXc-fraktur-font';
          }
          if (s.match(/sans-serif/)) {
            t.className += ' MJXc-sans-serif-font';
          }
          if (s.match(/script/)) {
            t.className += ' MJXc-script-font';
          }
          this.CHTMLvariant = t;
        } else {
          this.SUPER(arguments).CHTMLgetVariant.call(this);
        }
      }
    });
    d.merror.Augment({
      toCommonHTML: function(s) {
        s = this.CHTMLdefaultNode(s);
        var t = this.CHTML;
        t.rescale(0.9);
        t.h += 3 / a.em;
        if (t.h > t.t) {
          t.t = t.h;
        }
        t.d += 3 / a.em;
        if (t.d > t.b) {
          t.b = t.d;
        }
        t.w += 8 / a.em;
        t.r = t.w;
        t.l = 0;
        return s;
      }
    });
    d.mspace.Augment({
      toCommonHTML: function(v) {
        v = this.CHTMLcreateNode(v);
        this.CHTMLhandleStyle(v);
        this.CHTMLhandleScale(v);
        var t = this.getValues('height', 'depth', 'width');
        var s = this.CHTMLlength2em(t.width),
          u = this.CHTMLlength2em(t.height),
          y = this.CHTMLlength2em(t.depth);
        var x = this.CHTML;
        x.w = x.r = s;
        x.h = x.t = u;
        x.d = x.b = y;
        x.l = 0;
        if (s < 0) {
          v.style.marginRight = a.Em(s);
          s = 0;
        }
        v.style.width = a.Em(s);
        v.style.height = a.Em(Math.max(0, u + y));
        if (y) {
          v.style.verticalAlign = a.Em(-y);
        }
        this.CHTMLhandleBBox(v);
        this.CHTMLhandleColor(v);
        return v;
      }
    });
    d.mpadded.Augment({
      toCommonHTML: function(t, F) {
        var s;
        if (F && F.stretch) {
          t = t.firstChild;
          s = t.firstChild;
        } else {
          t = this.CHTMLdefaultNode(t, {
            childNodes: 'mjx-box',
            forceChild: true
          });
          s = t.firstChild;
          t = a.addElement(t, 'mjx-block');
          t.appendChild(s);
          a.addElement(t, 'mjx-strut');
        }
        var z = this.CHTMLbboxFor(0);
        var D = this.getValues('width', 'height', 'depth', 'lspace', 'voffset');
        var B = 0,
          A = 0,
          C = z.w,
          u = z.h,
          v = z.d;
        s.style.width = 0;
        s.style.margin = a.Em(-u) + ' 0 ' + a.Em(-v);
        if (D.width !== '') {
          C = this.CHTMLdimen(D.width, 'w', C, 0);
        }
        if (D.height !== '') {
          u = this.CHTMLdimen(D.height, 'h', u, 0);
        }
        if (D.depth !== '') {
          v = this.CHTMLdimen(D.depth, 'd', v, 0);
        }
        if (D.voffset !== '') {
          A = this.CHTMLdimen(D.voffset);
          if (A) {
            s.style.position = 'relative';
            s.style.top = a.Em(-A);
          }
        }
        if (D.lspace !== '') {
          B = this.CHTMLdimen(D.lspace);
          if (B) {
            s.style.position = 'relative';
            s.style.left = a.Em(B);
          }
        }
        t.style.width = 0;
        t.style.marginTop = a.Em(u - k);
        t.style.padding = '0 ' + a.Em(C) + ' ' + a.Em(v) + ' 0';
        var E = a.BBOX({
          w: C,
          h: u,
          d: v,
          l: 0,
          r: C,
          t: u,
          b: v,
          scale: this.CHTML.scale,
          rscale: this.CHTML.rscale
        });
        E.combine(z, B, A);
        E.w = C;
        E.h = u;
        E.d = v;
        this.CHTML = E;
        return t.parentNode;
      },
      CHTMLstretchV: d.mbase.CHTMLstretchV,
      CHTMLstretchH: d.mbase.CHTMLstretchH,
      CHTMLdimen: function(w, y, x, s) {
        if (s == null) {
          s = -i;
        }
        w = String(w);
        var t = w.match(/width|height|depth/);
        var u = t ? this.CHTML[t[0].charAt(0)] : y ? this.CHTML[y] : 0;
        var v = this.CHTMLlength2em(w, u) || 0;
        if (w.match(/^[-+]/) && x != null) {
          v += x;
        }
        if (s != null) {
          v = Math.max(s, v);
        }
        return v;
      }
    });
    d.munderover.Augment({
      toCommonHTML: function(w, G) {
        var E = this.getValues(
          'displaystyle',
          'accent',
          'accentunder',
          'align'
        );
        var u = this.data[this.base];
        if (
          !E.displaystyle &&
          u != null &&
          (u.movablelimits || u.CoreMO().Get('movablelimits'))
        ) {
          return d.msubsup.prototype.toCommonHTML.call(this, w, t);
        }
        var B,
          z,
          s = [],
          t = false;
        if (G && G.stretch) {
          if (this.data[this.base]) {
            u = a.getNode(w, 'mjx-op');
          }
          if (this.data[this.under]) {
            B = a.getNode(w, 'mjx-under');
          }
          if (this.data[this.over]) {
            z = a.getNode(w, 'mjx-over');
          }
          s[0] = u;
          s[1] = B || z;
          s[2] = z;
          t = true;
        } else {
          var y = ['mjx-op', 'mjx-under', 'mjx-over'];
          if (this.over === 1) {
            y[1] = y[2];
          }
          w = this.CHTMLdefaultNode(w, {
            childNodes: y,
            noBBox: true,
            forceChild: true,
            minChildren: 2
          });
          s[0] = u = w.removeChild(w.firstChild);
          s[1] = B = z = w.removeChild(w.firstChild);
          if (w.firstChild) {
            s[2] = z = w.removeChild(w.firstChild);
          }
        }
        var x = [],
          v = this.CHTMLgetBBoxes(x, s, E);
        var F = x[this.base],
          C = this.CHTML;
        C.w = v;
        C.h = F.h;
        C.d = F.d;
        if (F.h < 0.35) {
          u.style.marginTop = a.Em(F.h - 0.35);
        }
        if (E.accent && F.h < a.TEX.x_height) {
          C.h += a.TEX.x_height - F.h;
          u.style.marginTop = a.Em(a.TEX.x_height - Math.max(F.h, 0.35));
          F.h = a.TEX.x_height;
        }
        var A = u,
          D = 0;
        if (F.ic) {
          D = 1.3 * F.ic + 0.05;
        }
        if (this.data[this.over]) {
          A = this.CHTMLaddOverscript(z, x, E, D, u, t);
        }
        if (this.data[this.under]) {
          this.CHTMLaddUnderscript(B, x, E, D, w, A, t);
        } else {
          if (!t) {
            w.appendChild(A);
          }
        }
        this.CHTMLplaceBoxes(u, B, z, E, x);
        return w;
      },
      CHTMLgetBBoxes: function(A, x, v) {
        var y,
          t = this.data.length,
          z,
          u = -i,
          s = u;
        for (y = 0; y < t; y++) {
          A[y] = this.CHTMLbboxFor(y);
          A[y].x = A[y].y = 0;
          if (this.data[y]) {
            A[y].stretch = this.data[y].CHTMLcanStretch('Horizontal');
          }
          z = y === this.base ? 1 : A[y].rscale;
          if (y !== this.base) {
            delete A[y].L;
            delete A[y].R;
          }
          s = Math.max(s, z * (A[y].w + (A[y].L || 0) + (A[y].R || 0)));
          if (!A[y].stretch && s > u) {
            u = s;
          }
        }
        if (u === -i) {
          u = s;
        }
        for (y = 0; y < t; y++) {
          if (A[y].stretch) {
            z = y === this.base ? 1 : A[y].rscale;
            A[y] = this.data[y].CHTMLstretchH(x[y].firstChild, u / z);
            A[y].x = A[y].y = 0;
            s = Math.max(s, z * (A[y].w + (A[y].L || 0) + (A[y].R || 0)));
          }
        }
        if (!A[this.base]) {
          A[this.base] = a.BBOX.empty();
        }
        return s;
      },
      CHTMLaddOverscript: function(B, z, F, E, t, s) {
        var D = this.CHTML;
        var y,
          x,
          w = a.TEX.big_op_spacing5,
          v;
        var A = z[this.over],
          G = z[this.base],
          u = A.rscale;
        if (!s) {
          var C = a.Element('mjx-stack');
          C.appendChild(B);
          C.appendChild(t);
        }
        if (A.D) {
          A.d = A.D;
        }
        if (A.d < 0) {
          B.firstChild.style.verticalAlign = 'top';
          B.style.height = a.Em(A.h + A.d);
        }
        A.x = 0;
        if (F.accent) {
          if (A.w < 0.001) {
            A.x += (A.r - A.l) / 2;
          }
          v = a.TEX.rule_thickness;
          w = 0;
          if (G.skew) {
            A.x += u * G.skew;
            D.skew = u * G.skew;
            if (A.x + u * A.w > D.w) {
              D.skew += (D.w - (A.x + u * A.w)) / 2;
            }
          }
        } else {
          y = a.TEX.big_op_spacing1;
          x = a.TEX.big_op_spacing3;
          v = Math.max(y, x - Math.max(0, u * A.d));
        }
        A.x += E / 2;
        A.y = D.h + v + w + u * A.d;
        if (v) {
          B.style.paddingBottom = a.Em(v / u);
        }
        if (w) {
          B.style.paddingTop = a.Em(w / u);
        }
        return C;
      },
      CHTMLaddUnderscript: function(B, z, E, D, t, A, s) {
        var C = this.CHTML;
        var y,
          x,
          w = a.TEX.big_op_spacing5,
          v;
        var F = z[this.under],
          u = F.rscale;
        if (!s) {
          a.addElement(t, 'mjx-itable', {}, [
            ['mjx-row', {}, [['mjx-cell']]],
            ['mjx-row']
          ]);
          t.firstChild.firstChild.firstChild.appendChild(A);
          t.firstChild.lastChild.appendChild(B);
        }
        if (F.D) {
          F.d = F.D;
        }
        if (F.d < 0) {
          B.firstChild.style.verticalAlign = 'top';
          t.firstChild.style.marginBottom = a.Em(F.d);
        }
        if (E.accentunder) {
          v = 2 * a.TEX.rule_thickness;
          w = 0;
        } else {
          y = a.TEX.big_op_spacing2;
          x = a.TEX.big_op_spacing4;
          v = Math.max(y, x - u * F.h);
        }
        F.x = -D / 2;
        F.y = -(C.d + v + w + u * F.h);
        if (v) {
          B.style.paddingTop = a.Em(v / u);
        }
        if (w) {
          B.style.paddingBottom = a.Em(w / u);
        }
      },
      CHTMLplaceBoxes: function(s, B, A, E, z) {
        var t = this.CHTML.w,
          y,
          v = z.length,
          x;
        var D = a.BBOX.zero();
        D.scale = this.CHTML.scale;
        D.rscale = this.CHTML.rscale;
        z[this.base].x = z[this.base].y = 0;
        var F = i;
        for (y = 0; y < v; y++) {
          x = y === this.base ? 1 : z[y].rscale;
          var C = x * (z[y].w + (z[y].L || 0) + (z[y].R || 0));
          z[y].x += { left: 0, center: (t - C) / 2, right: t - C }[E.align];
          if (z[y].x < F) {
            F = z[y].x;
          }
        }
        for (y = 0; y < v; y++) {
          if (this.data[y]) {
            x = y === this.base ? 1 : z[y].rscale;
            if (z[y].x - F) {
              var u = y === this.base ? s : y === this.over ? A : B;
              u.style.paddingLeft = a.Em((z[y].x - F) / x);
            }
            D.combine(z[y], z[y].x - F, z[y].y);
          }
        }
        this.CHTML = D;
      },
      CHTMLstretchV: d.mbase.CHTMLstretchV,
      CHTMLstretchH: d.mbase.CHTMLstretchH,
      CHTMLchildNode: function(u, t) {
        var s = ['mjx-op', 'mjx-under', 'mjx-over'];
        if (this.over === 1) {
          s[1] = s[2];
        }
        return a.getNode(u, s[t]);
      }
    });
    d.msubsup.Augment({
      toCommonHTML: function(S, C) {
        var A = this.getValues(
          'displaystyle',
          'subscriptshift',
          'superscriptshift',
          'texprimestyle'
        );
        var D, H, z;
        if (C && C.stretch) {
          if (this.data[this.base]) {
            D = a.getNode(S, 'mjx-base');
          }
          if (this.data[this.sub]) {
            H = a.getNode(S, 'mjx-sub');
          }
          if (this.data[this.sup]) {
            z = a.getNode(S, 'mjx-sup');
          }
          E = a.getNode(S, 'mjx-stack');
        } else {
          var K = ['mjx-base', 'mjx-sub', 'mjx-sup'];
          if (this.sup === 1) {
            K[1] = K[2];
          }
          S = this.CHTMLdefaultNode(S, {
            childNodes: K,
            noBBox: true,
            forceChild: true,
            minChildren: 3
          });
          D = S.childNodes[this.base];
          H = S.childNodes[this.sub];
          z = S.childNodes[this.sup];
          if (!this.CHTMLnotEmpty(this.data[this.sub])) {
            S.removeChild(H);
            H = null;
          }
          if (!this.CHTMLnotEmpty(this.data[this.sup])) {
            S.removeChild(z);
            z = null;
          }
          if (S.childNodes.length === 3) {
            var E = a.addElement(S, 'mjx-stack');
            E.appendChild(z);
            E.appendChild(H);
          }
        }
        var F = [],
          G = a.BBOX.empty(this.CHTML);
        for (var V = 0, T = this.data.length; V < T; V++) {
          F[V] = this.CHTMLbboxFor(V);
        }
        var y = F[this.base] || a.BBOX.empty(),
          P = F[this.sub],
          W = F[this.sup];
        var B = H ? P.rscale : 1,
          w = z ? W.rscale : 1;
        G.combine(y, 0, 0);
        var X = a.TEX.x_height,
          N = a.TEX.scriptspace;
        var Q = a.TEX.sup_drop * w,
          O = a.TEX.sub_drop * B;
        var L = y.h - Q,
          J = y.d + O,
          Y = 0,
          R;
        if (y.ic) {
          G.w -= y.ic;
          D.style.marginRight = a.Em(-y.ic);
          Y = 1.3 * y.ic + 0.05;
        }
        var U = this.data[this.base];
        if (U) {
          if (
            (U.type === 'mrow' || U.type === 'mstyle') &&
            U.data.length === 1
          ) {
            U = U.data[0];
          }
          if (U.type === 'mi' || U.type === 'mo') {
            if (
              a.isChar(U.data.join('')) &&
              y.rscale === 1 &&
              !y.sH &&
              !U.Get('largeop')
            ) {
              L = J = 0;
            }
          }
        }
        A.subscriptshift =
          A.subscriptshift === '' ? 0 : this.CHTMLlength2em(A.subscriptshift);
        A.superscriptshift =
          A.superscriptshift === ''
            ? 0
            : this.CHTMLlength2em(A.superscriptshift);
        var I = G.w;
        if (H) {
          P.w += N;
        }
        if (z) {
          W.w += N;
        }
        if (!z) {
          if (H) {
            J = Math.max(
              J,
              a.TEX.sub1,
              B * P.h - (4 / 5) * X,
              A.subscriptshift
            );
            H.style.verticalAlign = a.Em(-J / B);
            H.style.paddingRight = a.Em(N / B);
            G.combine(P, I, -J);
          }
        } else {
          if (!H) {
            R =
              a.TEX[
                A.displaystyle ? 'sup1' : A.texprimestyle ? 'sup3' : 'sup2'
              ];
            L = Math.max(L, R, w * W.d + (1 / 4) * X, A.superscriptshift);
            z.style.verticalAlign = a.Em(L / w);
            z.style.paddingLeft = a.Em(Y / w);
            z.style.paddingRight = a.Em(N / w);
            G.combine(W, I + Y, L);
          } else {
            J = Math.max(J, a.TEX.sub2);
            var M = a.TEX.rule_thickness;
            if (L - w * W.d - (B * P.h - J) < 3 * M) {
              J = 3 * M - L + w * W.d + B * P.h;
              Q = (4 / 5) * X - (L - w * W.d);
              if (Q > 0) {
                L += Q;
                J -= Q;
              }
            }
            L = Math.max(L, A.superscriptshift);
            J = Math.max(J, A.subscriptshift);
            H.style.paddingRight = a.Em(N / B);
            z.style.paddingBottom = a.Em(L / w + J / B - W.d - (P.h / B) * w);
            z.style.paddingLeft = a.Em(Y / w);
            z.style.paddingRight = a.Em(N / w);
            E.style.verticalAlign = a.Em(-J);
            G.combine(W, I + Y, L);
            G.combine(P, I, -J);
          }
        }
        G.clean();
        return S;
      },
      CHTMLstretchV: d.mbase.CHTMLstretchV,
      CHTMLstretchH: d.mbase.CHTMLstretchH,
      CHTMLchildNode: function(u, t) {
        var s = ['mjx-base', 'mjx-sub', 'mjx-sup'];
        if (this.over === 1) {
          s[1] = s[2];
        }
        return a.getNode(u, s[t]);
      }
    });
    d.mfrac.Augment({
      toCommonHTML: function(N) {
        N = this.CHTMLdefaultNode(N, {
          childNodes: ['mjx-numerator', 'mjx-denominator'],
          childOptions: { autowidth: true },
          forceChild: true,
          noBBox: true,
          minChildren: 2
        });
        var x = this.getValues(
          'linethickness',
          'displaystyle',
          'numalign',
          'denomalign',
          'bevelled'
        );
        var O = x.displaystyle;
        var D = N.firstChild,
          w = N.lastChild;
        var y = a.addElement(N, 'mjx-box');
        y.appendChild(D);
        y.appendChild(w);
        N.appendChild(y);
        if (x.numalign !== 'center') {
          D.style.textAlign = x.numalign;
        }
        if (x.denomalign !== 'center') {
          w.style.textAlign = x.denomalign;
        }
        var P = this.CHTMLbboxFor(0),
          B = this.CHTMLbboxFor(1),
          C = a.BBOX.empty(this.CHTML),
          F = P.rscale,
          z = B.rscale;
        x.linethickness = Math.max(
          0,
          a.thickness2em(x.linethickness || '0', C.scale)
        );
        var M = a.TEX.min_rule_thickness / a.em,
          T = a.TEX.axis_height;
        var J = x.linethickness,
          L,
          K,
          I,
          G;
        if (x.bevelled) {
          y.className += ' MJXc-bevelled';
          var S = O ? 0.4 : 0.15;
          var E = Math.max(F * (P.h + P.d), z * (B.h + B.d)) + 2 * S;
          var R = a.Element('mjx-bevel');
          y.insertBefore(R, w);
          var s = a.createDelimiter(R, 47, E);
          I = (F * (P.d - P.h)) / 2 + T + S;
          G = (z * (B.d - B.h)) / 2 + T - S;
          if (I) {
            D.style.verticalAlign = a.Em(I / F);
          }
          if (G) {
            w.style.verticalAlign = a.Em(G / z);
          }
          R.style.marginLeft = R.style.marginRight = a.Em(-S / 2);
          C.combine(P, 0, I);
          C.combine(s, F * P.w - S / 2, 0);
          C.combine(B, F * P.w + s.w - S, G);
          C.clean();
        } else {
          y.className += ' MJXc-stacked';
          if (O) {
            I = a.TEX.num1;
            G = a.TEX.denom1;
          } else {
            I = J === 0 ? a.TEX.num3 : a.TEX.num2;
            G = a.TEX.denom2;
          }
          if (J === 0) {
            L = Math.max((O ? 7 : 3) * a.TEX.rule_thickness, 2 * M);
            K = I - P.d * F - (B.h * z - G);
            if (K < L) {
              I += (L - K) / 2;
              G += (L - K) / 2;
            }
          } else {
            L = Math.max((O ? 2 : 0) * M + J, J / 2 + 1.5 * M);
            J = Math.max(J, M);
            K = I - P.d * F - (T + J / 2);
            if (K < L) {
              I += L - K;
            }
            K = T - J / 2 - (B.h * z - G);
            if (K < L) {
              G += L - K;
            }
            P.L = P.R = B.L = B.R = 0.1;
            var A = a.addElement(y, 'mjx-line', {
              style: {
                'border-bottom': a.Px(J * C.scale, 1) + ' solid',
                top: a.Em(-J / 2 - T)
              }
            });
          }
          C.combine(P, 0, I);
          C.combine(B, 0, -G);
          C.clean();
          y.style.width = a.Em(C.w);
          D.style.width = a.Em(C.w / F);
          w.style.width = a.Em(C.w / z);
          if (A) {
            A.style.width = y.style.width;
          }
          D.style.top = a.Em(-C.h / F);
          w.style.bottom = a.Em(-C.d / z);
          a.addElement(N, 'mjx-vsize', {
            style: { height: a.Em(C.h + C.d), verticalAlign: a.Em(-C.d) }
          });
        }
        if (!this.texWithDelims) {
          var Q = a.TEX.nulldelimiterspace;
          y.style.padding = '0 ' + a.Em(Q);
          C.l += Q;
          C.r += Q;
          C.w += 2 * Q;
        }
        return N;
      },
      CHTMLcanStretch: function(s) {
        return false;
      }
    });
    d.msqrt.Augment({
      toCommonHTML: function(w) {
        w = this.CHTMLdefaultNode(w, {
          childNodes: ['mjx-box', 'mjx-root'],
          forceChild: true,
          noBBox: true
        });
        var v = w.firstChild || a.Element('mjx-box');
        var E = a.addElement(w, 'mjx-box');
        E.appendChild(v);
        var F = this.CHTMLbboxFor(0),
          C = a.BBOX.empty(this.CHTML);
        var G = a.TEX.rule_thickness,
          y = a.TEX.surd_height,
          u = G,
          s,
          D;
        if (this.Get('displaystyle')) {
          u = a.TEX.x_height;
        }
        s = G + u / 4;
        D = F.h + F.d + s + G;
        var z = a.Element('mjx-surd');
        E.insertBefore(z, v);
        var A = a.createDelimiter(z, 8730, [D - 0.04, D]);
        if (A.h + A.d > D) {
          s = (A.h + A.d - (D - G)) / 2;
        }
        D = F.h + s + G;
        var B = this.CHTMLaddRoot(w, A, A.h + A.d - D);
        v.style.paddingTop = a.Em(s);
        v.style.borderTop = a.Px(y * F.scale, 1) + ' solid';
        E.style.paddingTop = a.Em(2 * G - y);
        F.h += s + 2 * G;
        C.combine(A, B, D - A.h);
        C.combine(F, B + A.w, 0);
        C.clean();
        return w;
      },
      CHTMLaddRoot: function() {
        return 0;
      },
      CHTMLhandleBBox: function(s) {
        var t = this.CHTMLbboxFor(0);
        delete t.pwidth;
        this.SUPER(arguments).CHTMLhandleBBox.apply(this, arguments);
      }
    });
    d.mroot.Augment({
      toCommonHTML: d.msqrt.prototype.toCommonHTML,
      CHTMLhandleBBox: d.msqrt.prototype.CHTMLhandleBBox,
      CHTMLaddRoot: function(A, u, v) {
        if (!this.data[1]) {
          return;
        }
        var z = this.CHTML,
          B = this.data[1].CHTML,
          x = A.firstChild;
        var s = B.rscale;
        var t = this.CHTMLrootHeight(B, u, s) - v;
        var y = Math.min(B.w, B.r);
        var C = Math.max(y, u.offset / s);
        if (t) {
          x.style.verticalAlign = a.Em(t / s);
        }
        if (C > y) {
          x.firstChild.style.paddingLeft = a.Em(C - y);
        }
        C -= u.offset / s;
        x.style.width = a.Em(C);
        z.combine(B, 0, t);
        return C * s;
      },
      CHTMLrootHeight: function(u, s, t) {
        return 0.45 * (s.h + s.d - 0.9) + s.offset + Math.max(0, u.d - 0.075);
      }
    });
    d.mfenced.Augment({
      toCommonHTML: function(v) {
        v = this.CHTMLcreateNode(v);
        this.CHTMLhandleStyle(v);
        this.CHTMLhandleScale(v);
        this.CHTMLaddChild(v, 'open', {});
        for (var u = 0, s = this.data.length; u < s; u++) {
          this.CHTMLaddChild(v, 'sep' + u, {});
          this.CHTMLaddChild(v, u, {});
        }
        this.CHTMLaddChild(v, 'close', {});
        var t = this.CHTML.h,
          w = this.CHTML.d;
        this.CHTMLstretchChildV('open', t, w);
        for (u = 0, s = this.data.length; u < s; u++) {
          this.CHTMLstretchChildV('sep' + u, t, w);
          this.CHTMLstretchChildV(u, t, w);
        }
        this.CHTMLstretchChildV('close', t, w);
        this.CHTMLhandleSpace(v);
        this.CHTMLhandleBBox(v);
        this.CHTMLhandleColor(v);
        return v;
      }
    });
    d.mrow.Augment({
      toCommonHTML: function(w, t) {
        t = t || {};
        w = this.CHTMLdefaultNode(w);
        var z = this.CHTML,
          v = z.h,
          x = z.d,
          y;
        for (var u = 0, s = this.data.length; u < s; u++) {
          this.CHTMLstretchChildV(u, v, x);
          if (this.data[u] && this.data[u].CHTML && this.data[u].CHTML.w < 0) {
            y = true;
          }
        }
        if (this.CHTMLlineBreaks()) {
          this.CHTMLmultiline(w);
          if (t.autowidth) {
            w.style.width = '';
          }
        } else {
          if (y && z.w) {
            w.style.width = a.Em(Math.max(0, z.w));
          }
          if (z.w < 0) {
            w.style.marginRight = a.Em(z.w);
          }
        }
        return w;
      },
      CHTMLlineBreaks: function() {
        if (!this.parent.linebreakContainer) {
          return false;
        }
        return (
          (c.automatic && this.CHTML.w > a.linebreakWidth) || this.hasNewline()
        );
      },
      CHTMLstretchV: function(s, t) {
        this.CHTMLstretchChildV(this.CoreIndex(), s, t);
        return this.CHTML;
      },
      CHTMLstretchH: function(t, s) {
        this.CHTMLstretchChildH(this.CoreIndex(), s, t);
        return this.CHTML;
      }
    });
    d.TeXAtom.Augment({
      toCommonHTML: function(x, w) {
        if (!w || !w.stretch) {
          x = this.CHTMLdefaultNode(x);
        }
        if (this.texClass === d.TEXCLASS.VCENTER) {
          var s = a.TEX.axis_height,
            u = this.CHTML;
          var t = s - (u.h + u.d) / 2 + u.d;
          if (Math.abs(t) > 0.001) {
            x.style.verticalAlign = a.Em(t);
            u.h += t;
            u.t += t;
            u.d -= t;
            u.b -= t;
          }
        }
        return x;
      },
      CHTMLstretchV: function(s, t) {
        this.CHTMLupdateFrom(this.Core().CHTMLstretchV(s, t));
        this.toCommonHTML(this.CHTMLnodeElement(), { stretch: true });
        return this.CHTML;
      },
      CHTMLstretchH: function(t, s) {
        this.CHTMLupdateFrom(this.CHTMLstretchCoreH(t, s));
        this.toCommonHTML(t, { stretch: true });
        return this.CHTML;
      }
    });
    d.semantics.Augment({
      toCommonHTML: function(s) {
        s = this.CHTMLcreateNode(s);
        if (this.data[0]) {
          this.data[0].toCommonHTML(s);
          this.CHTMLupdateFrom(this.data[0].CHTML);
          this.CHTMLhandleBBox(s);
        }
        return s;
      }
    });
    d.annotation.Augment({
      toCommonHTML: function(s) {
        return this.CHTMLcreateNode(s);
      }
    });
    d['annotation-xml'].Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.ms.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.mglyph.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.menclose.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.maction.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.mmultiscripts.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    d.mtable.Augment({ toCommonHTML: d.mbase.CHTMLautoload });
    MathJax.Hub.Register.StartupHook('onLoad', function() {
      setTimeout(MathJax.Callback(['loadComplete', a, 'jax.js']), 0);
    });
  });
  MathJax.Hub.Register.StartupHook('End Cookie', function() {
    if (f.config.menuSettings.zoom !== 'None') {
      o.Require('[MathJax]/extensions/MathZoom.js');
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.CommonHTML);
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
(function(i, b, e, g) {
  var h;
  var j, a, d;
  var f = "'Times New Roman',Times,STIXGeneral,serif";
  var m = {
    '.MJXp-script': { 'font-size': '.8em' },
    '.MJXp-right': {
      '-webkit-transform-origin': 'right',
      '-moz-transform-origin': 'right',
      '-ms-transform-origin': 'right',
      '-o-transform-origin': 'right',
      'transform-origin': 'right'
    },
    '.MJXp-bold': { 'font-weight': 'bold' },
    '.MJXp-italic': { 'font-style': 'italic' },
    '.MJXp-scr': { 'font-family': 'MathJax_Script,' + f },
    '.MJXp-frak': { 'font-family': 'MathJax_Fraktur,' + f },
    '.MJXp-sf': { 'font-family': 'MathJax_SansSerif,' + f },
    '.MJXp-cal': { 'font-family': 'MathJax_Caligraphic,' + f },
    '.MJXp-mono': { 'font-family': 'MathJax_Typewriter,' + f },
    '.MJXp-largeop': { 'font-size': '150%' },
    '.MJXp-largeop.MJXp-int': { 'vertical-align': '-.2em' },
    '.MJXp-math': {
      display: 'inline-block',
      'line-height': '1.2',
      'text-indent': '0',
      'font-family': f,
      'white-space': 'nowrap',
      'border-collapse': 'collapse'
    },
    '.MJXp-display': {
      display: 'block',
      'text-align': 'center',
      margin: '1em 0'
    },
    '.MJXp-math span': { display: 'inline-block' },
    '.MJXp-box': { display: 'block!important', 'text-align': 'center' },
    '.MJXp-box:after': { content: '" "' },
    '.MJXp-rule': { display: 'block!important', 'margin-top': '.1em' },
    '.MJXp-char': { display: 'block!important' },
    '.MJXp-mo': { margin: '0 .15em' },
    '.MJXp-mfrac': { margin: '0 .125em', 'vertical-align': '.25em' },
    '.MJXp-denom': { display: 'inline-table!important', width: '100%' },
    '.MJXp-denom > *': { display: 'table-row!important' },
    '.MJXp-surd': { 'vertical-align': 'top' },
    '.MJXp-surd > *': { display: 'block!important' },
    '.MJXp-script-box > * ': { display: 'table!important', height: '50%' },
    '.MJXp-script-box > * > *': {
      display: 'table-cell!important',
      'vertical-align': 'top'
    },
    '.MJXp-script-box > *:last-child > *': { 'vertical-align': 'bottom' },
    '.MJXp-script-box > * > * > *': { display: 'block!important' },
    '.MJXp-mphantom': { visibility: 'hidden' },
    '.MJXp-munderover, .MJXp-munder': { display: 'inline-table!important' },
    '.MJXp-over': { display: 'inline-block!important', 'text-align': 'center' },
    '.MJXp-over > *': { display: 'block!important' },
    '.MJXp-munderover > *, .MJXp-munder > *': {
      display: 'table-row!important'
    },
    '.MJXp-mtable': { 'vertical-align': '.25em', margin: '0 .125em' },
    '.MJXp-mtable > *': {
      display: 'inline-table!important',
      'vertical-align': 'middle'
    },
    '.MJXp-mtr': { display: 'table-row!important' },
    '.MJXp-mtd': {
      display: 'table-cell!important',
      'text-align': 'center',
      padding: '.5em 0 0 .5em'
    },
    '.MJXp-mtr > .MJXp-mtd:first-child': { 'padding-left': 0 },
    '.MJXp-mtr:first-child > .MJXp-mtd': { 'padding-top': 0 },
    '.MJXp-mlabeledtr': { display: 'table-row!important' },
    '.MJXp-mlabeledtr > .MJXp-mtd:first-child': { 'padding-left': 0 },
    '.MJXp-mlabeledtr:first-child > .MJXp-mtd': { 'padding-top': 0 },
    '.MJXp-merror': {
      'background-color': '#FFFF88',
      color: '#CC0000',
      border: '1px solid #CC0000',
      padding: '1px 3px',
      'font-style': 'normal',
      'font-size': '90%'
    }
  };
  (function() {
    for (var n = 0; n < 10; n++) {
      var o = 'scaleX(.' + n + ')';
      m['.MJXp-scale' + n] = {
        '-webkit-transform': o,
        '-moz-transform': o,
        '-ms-transform': o,
        '-o-transform': o,
        transform: o
      };
    }
  })();
  var k = 1000000;
  var c = 'V',
    l = 'H';
  g.Augment({
    settings: b.config.menuSettings,
    config: { styles: m },
    hideProcessedMath: false,
    maxStretchyParts: 1000,
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.SUPER(arguments).Config.call(this);
      var n = this.settings;
      if (n.scale) {
        this.config.scale = n.scale;
      }
      this.require.push(MathJax.OutputJax.extensionDir + '/MathEvents.js');
    },
    Startup: function() {
      j = MathJax.Extension.MathEvents.Event;
      a = MathJax.Extension.MathEvents.Touch;
      d = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = j.ContextMenu;
      this.Mousedown = j.AltContextMenu;
      this.Mouseover = d.Mouseover;
      this.Mouseout = d.Mouseout;
      this.Mousemove = d.Mousemove;
      var n = e.addElement(document.body, 'div', { style: { width: '5in' } });
      this.pxPerInch = n.offsetWidth / 5;
      n.parentNode.removeChild(n);
      return i.Styles(this.config.styles, ['InitializePHTML', this]);
    },
    InitializePHTML: function() {},
    preTranslate: function(p) {
      var s = p.jax[this.id],
        t,
        q = s.length,
        u,
        r,
        v,
        o,
        n;
      for (t = 0; t < q; t++) {
        u = s[t];
        if (!u.parentNode) {
          continue;
        }
        r = u.previousSibling;
        if (
          r &&
          String(r.className).match(
            /^MathJax(_PHTML)?(_Display)?( MathJax_Process(ing|ed))?$/
          )
        ) {
          r.parentNode.removeChild(r);
        }
        n = u.MathJax.elementJax;
        if (!n) {
          continue;
        }
        n.PHTML = { display: n.root.Get('display') === 'block' };
        v = o = e.Element('span', {
          className: 'MathJax_PHTML',
          id: n.inputID + '-Frame',
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: j.Menu,
          onmousedown: j.Mousedown,
          onmouseover: j.Mouseover,
          onmouseout: j.Mouseout,
          onmousemove: j.Mousemove,
          onclick: j.Click,
          ondblclick: j.DblClick,
          onkeydown: j.Keydown,
          tabIndex: b.getTabOrder(n)
        });
        if (b.Browser.noContextMenu) {
          v.ontouchstart = a.start;
          v.ontouchend = a.end;
        }
        if (n.PHTML.display) {
          o = e.Element('div', { className: 'MathJax_PHTML_Display' });
          o.appendChild(v);
        }
        o.className += ' MathJax_Processing';
        u.parentNode.insertBefore(o, u);
      }
    },
    Translate: function(o, s) {
      if (!o.parentNode) {
        return;
      }
      var n = o.MathJax.elementJax,
        r = n.root,
        p = document.getElementById(n.inputID + '-Frame'),
        t = n.PHTML.display ? p.parentNode : p;
      this.initPHTML(r, p);
      try {
        r.toPreviewHTML(p);
      } catch (q) {
        if (q.restart) {
          while (p.firstChild) {
            p.removeChild(p.firstChild);
          }
        }
        throw q;
      }
      t.className = t.className.split(/ /)[0];
      if (this.hideProcessedMath) {
        t.className += ' MathJax_Processed';
        if (o.MathJax.preview) {
          n.PHTML.preview = o.MathJax.preview;
          delete o.MathJax.preview;
        }
      }
    },
    postTranslate: function(s) {
      var o = s.jax[this.id];
      if (!this.hideProcessedMath) {
        return;
      }
      for (var q = 0, n = o.length; q < n; q++) {
        var p = o[q];
        if (p && p.MathJax.elementJax) {
          p.previousSibling.className = p.previousSibling.className.split(
            / /
          )[0];
          var r = p.MathJax.elementJax.PHTML;
          if (r.preview) {
            r.preview.innerHTML = '';
            p.MathJax.preview = r.preview;
            delete r.preview;
          }
        }
      }
    },
    getJaxFromMath: function(n) {
      if (n.parentNode.className.match(/MathJax_PHTML_Display/)) {
        n = n.parentNode;
      }
      do {
        n = n.nextSibling;
      } while (n && n.nodeName.toLowerCase() !== 'script');
      return b.getJaxFor(n);
    },
    getHoverSpan: function(n, o) {
      return n.root.PHTMLspanElement();
    },
    getHoverBBox: function(n, q, r) {
      var s = n.root.PHTML,
        p = n.PHTML.outerEm;
      var o = { w: s.w * p, h: s.h * p, d: s.d * p };
      if (s.width) {
        o.width = s.width;
      }
      return o;
    },
    Zoom: function(o, u, s, n, r) {
      u.className = 'MathJax';
      this.idPostfix = '-zoom';
      o.root.toPHTML(u, u);
      this.idPostfix = '';
      u.style.position = 'absolute';
      if (!width) {
        s.style.position = 'absolute';
      }
      var t = u.offsetWidth,
        q = u.offsetHeight,
        v = s.offsetHeight,
        p = s.offsetWidth;
      if (p === 0) {
        p = s.parentNode.offsetWidth;
      }
      u.style.position = s.style.position = '';
      return { Y: -j.getBBox(u).h, mW: p, mH: v, zW: t, zH: q };
    },
    initPHTML: function(o, n) {},
    Remove: function(n) {
      var o = document.getElementById(n.inputID + '-Frame');
      if (o) {
        if (n.PHTML.display) {
          o = o.parentNode;
        }
        o.parentNode.removeChild(o);
      }
      delete n.PHTML;
    },
    ID: 0,
    idPostfix: '',
    GetID: function() {
      this.ID++;
      return this.ID;
    },
    VARIANT: {
      bold: 'MJXp-bold',
      italic: 'MJXp-italic',
      'bold-italic': 'MJXp-bold MJXp-italic',
      script: 'MJXp-scr',
      'bold-script': 'MJXp-scr MJXp-bold',
      fraktur: 'MJXp-frak',
      'bold-fraktur': 'MJXp-frak MJXp-bold',
      monospace: 'MJXp-mono',
      'sans-serif': 'MJXp-sf',
      '-tex-caligraphic': 'MJXp-cal'
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
      negativeveryverythickmathspace: -7 / 18,
      thin: 0.08,
      medium: 0.1,
      thick: 0.15,
      infinity: k
    },
    TeX: { x_height: 0.430554 },
    pxPerInch: 72,
    em: 16,
    DELIMITERS: {
      '(': { dir: c },
      '{': { dir: c, w: 0.58 },
      '[': { dir: c },
      '|': { dir: c, w: 0.275 },
      ')': { dir: c },
      '}': { dir: c, w: 0.58 },
      ']': { dir: c },
      '/': { dir: c },
      '\\': { dir: c },
      '\u2223': { dir: c, w: 0.275 },
      '\u2225': { dir: c, w: 0.55 },
      '\u230A': { dir: c, w: 0.5 },
      '\u230B': { dir: c, w: 0.5 },
      '\u2308': { dir: c, w: 0.5 },
      '\u2309': { dir: c, w: 0.5 },
      '\u27E8': { dir: c, w: 0.5 },
      '\u27E9': { dir: c, w: 0.5 },
      '\u2191': { dir: c, w: 0.65 },
      '\u2193': { dir: c, w: 0.65 },
      '\u21D1': { dir: c, w: 0.75 },
      '\u21D3': { dir: c, w: 0.75 },
      '\u2195': { dir: c, w: 0.65 },
      '\u21D5': { dir: c, w: 0.75 },
      '\u27EE': { dir: c, w: 0.275 },
      '\u27EF': { dir: c, w: 0.275 },
      '\u23B0': { dir: c, w: 0.6 },
      '\u23B1': { dir: c, w: 0.6 }
    },
    REMAPACCENT: {
      '\u20D7': '\u2192',
      "'": '\u02CB',
      '`': '\u02CA',
      '.': '\u02D9',
      '^': '\u02C6',
      '-': '\u02C9',
      '~': '\u02DC',
      '\u00AF': '\u02C9',
      '\u00B0': '\u02DA',
      '\u00B4': '\u02CA',
      '\u0300': '\u02CB',
      '\u0301': '\u02CA',
      '\u0302': '\u02C6',
      '\u0303': '\u02DC',
      '\u0304': '\u02C9',
      '\u0305': '\u02C9',
      '\u0306': '\u02D8',
      '\u0307': '\u02D9',
      '\u0308': '\u00A8',
      '\u030C': '\u02C7'
    },
    REMAPACCENTUNDER: {},
    length2em: function(r, p) {
      if (typeof r !== 'string') {
        r = r.toString();
      }
      if (r === '') {
        return '';
      }
      if (r === h.SIZE.NORMAL) {
        return 1;
      }
      if (r === h.SIZE.BIG) {
        return 2;
      }
      if (r === h.SIZE.SMALL) {
        return 0.71;
      }
      if (this.MATHSPACE[r]) {
        return this.MATHSPACE[r];
      }
      var o = r.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var n = parseFloat(o[1] || '1'),
        q = o[2];
      if (p == null) {
        p = 1;
      }
      if (q === 'em') {
        return n;
      }
      if (q === 'ex') {
        return n * this.TeX.x_height;
      }
      if (q === '%') {
        return (n / 100) * p;
      }
      if (q === 'px') {
        return n / this.em;
      }
      if (q === 'pt') {
        return n / 10;
      }
      if (q === 'pc') {
        return n * 1.2;
      }
      if (q === 'in') {
        return (n * this.pxPerInch) / this.em;
      }
      if (q === 'cm') {
        return (n * this.pxPerInch) / this.em / 2.54;
      }
      if (q === 'mm') {
        return (n * this.pxPerInch) / this.em / 25.4;
      }
      if (q === 'mu') {
        return n / 18;
      }
      return n * p;
    },
    Em: function(n) {
      if (Math.abs(n) < 0.001) {
        return '0em';
      }
      return n.toFixed(3).replace(/\.?0+$/, '') + 'em';
    },
    arrayEntry: function(n, o) {
      return n[Math.max(0, Math.min(o, n.length - 1))];
    }
  });
  MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
    h = MathJax.ElementJax.mml;
    h.mbase.Augment({
      toPreviewHTML: function(o, n) {
        return this.PHTMLdefaultSpan(o, n);
      },
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      },
      PHTMLaddChild: function(p, o, n) {
        var q = this.data[o];
        if (q) {
          if (n.childSpans) {
            p = e.addElement(p, 'span', { className: n.className });
          }
          q.toPreviewHTML(p);
          if (!n.noBBox) {
            this.PHTML.w += q.PHTML.w + q.PHTML.l + q.PHTML.r;
            if (q.PHTML.h > this.PHTML.h) {
              this.PHTML.h = q.PHTML.h;
            }
            if (q.PHTML.d > this.PHTML.d) {
              this.PHTML.d = q.PHTML.d;
            }
            if (q.PHTML.t > this.PHTML.t) {
              this.PHTML.t = q.PHTML.t;
            }
            if (q.PHTML.b > this.PHTML.b) {
              this.PHTML.b = q.PHTML.b;
            }
          }
        } else {
          if (n.forceChild) {
            e.addElement(p, 'span');
          }
        }
      },
      PHTMLstretchChild: function(q, p, s) {
        var r = this.data[q];
        if (r && r.PHTMLcanStretch('Vertical', p, s)) {
          var t = this.PHTML,
            o = r.PHTML,
            n = o.w;
          r.PHTMLstretchV(p, s);
          t.w += o.w - n;
          if (o.h > t.h) {
            t.h = o.h;
          }
          if (o.d > t.d) {
            t.d = o.d;
          }
        }
      },
      PHTMLcreateSpan: function(n) {
        if (!this.PHTML) {
          this.PHTML = {};
        }
        this.PHTML = { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
        if (this.inferred) {
          return n;
        }
        if (this.type === 'mo' && this.data.join('') === '\u222B') {
          g.lastIsInt = true;
        } else {
          if (
            this.type !== 'mspace' ||
            this.width !== 'negativethinmathspace'
          ) {
            g.lastIsInt = false;
          }
        }
        if (!this.PHTMLspanID) {
          this.PHTMLspanID = g.GetID();
        }
        var o = this.id || 'MJXp-Span-' + this.PHTMLspanID;
        return e.addElement(n, 'span', {
          className: 'MJXp-' + this.type,
          id: o
        });
      },
      PHTMLspanElement: function() {
        if (!this.PHTMLspanID) {
          return null;
        }
        return document.getElementById(
          this.id || 'MJXp-Span-' + this.PHTMLspanID
        );
      },
      PHTMLhandleToken: function(o) {
        var n = this.getValues('mathvariant');
        if (n.mathvariant !== h.VARIANT.NORMAL) {
          o.className += ' ' + g.VARIANT[n.mathvariant];
        }
      },
      PHTMLhandleStyle: function(n) {
        if (this.style) {
          n.style.cssText = this.style;
        }
      },
      PHTMLhandleColor: function(n) {
        if (this.mathcolor) {
          n.style.color = this.mathcolor;
        }
        if (this.mathbackground) {
          n.style.backgroundColor = this.mathbackground;
        }
      },
      PHTMLhandleScriptlevel: function(n) {
        var o = this.Get('scriptlevel');
        if (o) {
          n.className += ' MJXp-script';
        }
      },
      PHTMLhandleText: function(y, A) {
        var v, p;
        var z = 0,
          o = 0,
          q = 0;
        for (var s = 0, r = A.length; s < r; s++) {
          p = A.charCodeAt(s);
          v = A.charAt(s);
          if (p >= 55296 && p < 56319) {
            s++;
            p = ((p - 55296) << 10) + (A.charCodeAt(s) - 56320) + 65536;
          }
          var t = 0.7,
            u = 0.22,
            x = 0.5;
          if (p < 127) {
            if (v.match(/[A-Za-ehik-or-xz0-9]/)) {
              u = 0;
            }
            if (v.match(/[A-HK-Z]/)) {
              x = 0.67;
            } else {
              if (v.match(/[IJ]/)) {
                x = 0.36;
              }
            }
            if (v.match(/[acegm-su-z]/)) {
              t = 0.45;
            } else {
              if (v.match(/[ij]/)) {
                t = 0.75;
              }
            }
            if (v.match(/[ijlt]/)) {
              x = 0.28;
            }
          }
          if (g.DELIMITERS[v]) {
            x = g.DELIMITERS[v].w || 0.4;
          }
          if (t > z) {
            z = t;
          }
          if (u > o) {
            o = u;
          }
          q += x;
        }
        if (!this.CHML) {
          this.PHTML = {};
        }
        this.PHTML = { h: 0.9, d: 0.3, w: q, l: 0, r: 0, t: z, b: o };
        e.addText(y, A);
      },
      PHTMLbboxFor: function(o) {
        if (this.data[o] && this.data[o].PHTML) {
          return this.data[o].PHTML;
        }
        return { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
      },
      PHTMLcanStretch: function(q, o, p) {
        if (this.isEmbellished()) {
          var n = this.Core();
          if (n && n !== this) {
            return n.PHTMLcanStretch(q, o, p);
          }
        }
        return false;
      },
      PHTMLstretchV: function(n, o) {},
      PHTMLstretchH: function(n) {},
      CoreParent: function() {
        var n = this;
        while (
          n &&
          n.isEmbellished() &&
          n.CoreMO() === this &&
          !n.isa(h.math)
        ) {
          n = n.Parent();
        }
        return n;
      },
      CoreText: function(n) {
        if (!n) {
          return '';
        }
        if (n.isEmbellished()) {
          return n.CoreMO().data.join('');
        }
        while (
          (n.isa(h.mrow) ||
            n.isa(h.TeXAtom) ||
            n.isa(h.mstyle) ||
            n.isa(h.mphantom)) &&
          n.data.length === 1 &&
          n.data[0]
        ) {
          n = n.data[0];
        }
        if (!n.isToken) {
          return '';
        } else {
          return n.data.join('');
        }
      }
    });
    h.chars.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, '');
        this.PHTMLhandleText(n, o);
      }
    });
    h.entity.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, '');
        this.PHTMLhandleText(n, o);
      }
    });
    h.math.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        if (this.Get('display') === 'block') {
          n.className += ' MJXp-display';
        }
        return n;
      }
    });
    h.mo.Augment({
      toPreviewHTML: function(o) {
        o = this.PHTMLdefaultSpan(o);
        this.PHTMLadjustAccent(o);
        var n = this.getValues(
          'lspace',
          'rspace',
          'scriptlevel',
          'displaystyle',
          'largeop'
        );
        if (n.scriptlevel === 0) {
          this.PHTML.l = g.length2em(n.lspace);
          this.PHTML.r = g.length2em(n.rspace);
          o.style.marginLeft = g.Em(this.PHTML.l);
          o.style.marginRight = g.Em(this.PHTML.r);
        } else {
          this.PHTML.l = 0.15;
          this.PHTML.r = 0.1;
        }
        if (n.displaystyle && n.largeop) {
          var p = e.Element('span', { className: 'MJXp-largeop' });
          p.appendChild(o.firstChild);
          o.appendChild(p);
          this.PHTML.h *= 1.2;
          this.PHTML.d *= 1.2;
          if (this.data.join('') === '\u222B') {
            p.className += ' MJXp-int';
          }
        }
        return o;
      },
      PHTMLadjustAccent: function(p) {
        var o = this.CoreParent();
        if (
          o &&
          o.isa(h.munderover) &&
          this.CoreText(o.data[o.base]).length === 1
        ) {
          var q = o.data[o.over],
            n = o.data[o.under];
          var s = this.data.join(''),
            r;
          if (q && this === q.CoreMO() && o.Get('accent')) {
            r = g.REMAPACCENT[s];
          } else {
            if (n && this === n.CoreMO() && o.Get('accentunder')) {
              r = g.REMAPACCENTUNDER[s];
            }
          }
          if (r) {
            s = p.innerHTML = r;
          }
          if (s.match(/[\u02C6-\u02DC\u00A8]/)) {
            this.PHTML.acc = -0.52;
          } else {
            if (s === '\u2192') {
              this.PHTML.acc = -0.15;
              this.PHTML.vec = true;
            }
          }
        }
      },
      PHTMLcanStretch: function(q, o, p) {
        if (!this.Get('stretchy')) {
          return false;
        }
        var r = this.data.join('');
        if (r.length > 1) {
          return false;
        }
        r = g.DELIMITERS[r];
        var n = r && r.dir === q.substr(0, 1);
        if (n) {
          n =
            this.PHTML.h !== o ||
            this.PHTML.d !== p ||
            (this.Get('minsize', true) || this.Get('maxsize', true));
        }
        return n;
      },
      PHTMLstretchV: function(p, u) {
        var o = this.PHTMLspanElement(),
          t = this.PHTML;
        var n = this.getValues('symmetric', 'maxsize', 'minsize');
        if (n.symmetric) {
          l = 2 * Math.max(p - 0.25, u + 0.25);
        } else {
          l = p + u;
        }
        n.maxsize = g.length2em(n.maxsize, t.h + t.d);
        n.minsize = g.length2em(n.minsize, t.h + t.d);
        l = Math.max(n.minsize, Math.min(n.maxsize, l));
        var s = l / (t.h + t.d - 0.3);
        var q = e.Element('span', { style: { 'font-size': g.Em(s) } });
        if (s > 1.25) {
          var r = Math.ceil((1.25 / s) * 10);
          q.className = 'MJXp-right MJXp-scale' + r;
          q.style.marginLeft = g.Em(t.w * (r / 10 - 1) + 0.07);
          t.w *= (s * r) / 10;
        }
        q.appendChild(o.firstChild);
        o.appendChild(q);
        if (n.symmetric) {
          o.style.verticalAlign = g.Em(0.25 * (1 - s));
        }
      }
    });
    h.mspace.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var o = this.getValues('height', 'depth', 'width');
        var n = g.length2em(o.width),
          p = g.length2em(o.height),
          s = g.length2em(o.depth);
        var r = this.PHTML;
        r.w = n;
        r.h = p;
        r.d = s;
        if (n < 0) {
          if (!g.lastIsInt) {
            q.style.marginLeft = g.Em(n);
          }
          n = 0;
        }
        q.style.width = g.Em(n);
        q.style.height = g.Em(p + s);
        if (s) {
          q.style.verticalAlign = g.Em(-s);
        }
        return q;
      }
    });
    h.mpadded.Augment({
      toPreviewHTML: function(u) {
        u = this.PHTMLdefaultSpan(u, {
          childSpans: true,
          className: 'MJXp-box',
          forceChild: true
        });
        var o = u.firstChild;
        var v = this.getValues('width', 'height', 'depth', 'lspace', 'voffset');
        var s = this.PHTMLdimen(v.lspace);
        var q = 0,
          n = 0,
          t = s.len,
          r = -s.len,
          p = 0;
        if (v.width !== '') {
          s = this.PHTMLdimen(v.width, 'w', 0);
          if (s.pm) {
            r += s.len;
          } else {
            u.style.width = g.Em(s.len);
          }
        }
        if (v.height !== '') {
          s = this.PHTMLdimen(v.height, 'h', 0);
          if (!s.pm) {
            q += -this.PHTMLbboxFor(0).h;
          }
          q += s.len;
        }
        if (v.depth !== '') {
          s = this.PHTMLdimen(v.depth, 'd', 0);
          if (!s.pm) {
            n += -this.PHTMLbboxFor(0).d;
            p += -s.len;
          }
          n += s.len;
        }
        if (v.voffset !== '') {
          s = this.PHTMLdimen(v.voffset);
          q -= s.len;
          n += s.len;
          p += s.len;
        }
        if (q) {
          o.style.marginTop = g.Em(q);
        }
        if (n) {
          o.style.marginBottom = g.Em(n);
        }
        if (t) {
          o.style.marginLeft = g.Em(t);
        }
        if (r) {
          o.style.marginRight = g.Em(r);
        }
        if (p) {
          u.style.verticalAlign = g.Em(p);
        }
        return u;
      },
      PHTMLdimen: function(q, r, n) {
        if (n == null) {
          n = -k;
        }
        q = String(q);
        var o = q.match(/width|height|depth/);
        var p = o ? this.PHTML[o[0].charAt(0)] : r ? this.PHTML[r] : 0;
        return { len: g.length2em(q, p) || 0, pm: !!q.match(/^[-+]/) };
      }
    });
    h.munderover.Augment({
      toPreviewHTML: function(r) {
        var t = this.getValues(
          'displaystyle',
          'accent',
          'accentunder',
          'align'
        );
        var n = this.data[this.base];
        if (
          !t.displaystyle &&
          n != null &&
          (n.movablelimits || n.CoreMO().Get('movablelimits'))
        ) {
          r = h.msubsup.prototype.toPreviewHTML.call(this, r);
          r.className = r.className.replace(/munderover/, 'msubsup');
          return r;
        }
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: '',
          noBBox: true
        });
        var p = this.PHTMLbboxFor(this.over),
          v = this.PHTMLbboxFor(this.under),
          u = this.PHTMLbboxFor(this.base),
          s = this.PHTML,
          o = p.acc;
        if (this.data[this.over]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = p.l = r.lastChild.firstChild.style.marginRight = p.r = 0;
          }
          var q = e.Element('span', {}, [['span', { className: 'MJXp-over' }]]);
          q.firstChild.appendChild(r.lastChild);
          if (r.childNodes.length > (this.data[this.under] ? 1 : 0)) {
            q.firstChild.appendChild(r.firstChild);
          }
          this.data[this.over].PHTMLhandleScriptlevel(q.firstChild.firstChild);
          if (o != null) {
            if (p.vec) {
              q.firstChild.firstChild.firstChild.style.fontSize = '60%';
              p.h *= 0.6;
              p.d *= 0.6;
              p.w *= 0.6;
            }
            o = o - p.d + 0.1;
            if (u.t != null) {
              o += u.t - u.h;
            }
            q.firstChild.firstChild.style.marginBottom = g.Em(o);
          }
          if (r.firstChild) {
            r.insertBefore(q, r.firstChild);
          } else {
            r.appendChild(q);
          }
        }
        if (this.data[this.under]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = v.l = r.lastChild.firstChild.marginRight = v.r = 0;
          }
          this.data[this.under].PHTMLhandleScriptlevel(r.lastChild);
        }
        s.w = Math.max(0.8 * p.w, 0.8 * v.w, u.w);
        s.h = 0.8 * (p.h + p.d + (o || 0)) + u.h;
        s.d = u.d + 0.8 * (v.h + v.d);
        return r;
      }
    });
    h.msubsup.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, { noBBox: true });
        if (!this.data[this.base]) {
          if (q.firstChild) {
            q.insertBefore(e.Element('span'), q.firstChild);
          } else {
            q.appendChild(e.Element('span'));
          }
        }
        var s = this.data[this.base],
          p = this.data[this.sub],
          n = this.data[this.sup];
        if (!s) {
          s = { bbox: { h: 0.8, d: 0.2 } };
        }
        q.firstChild.style.marginRight = '.05em';
        var o = Math.max(0.4, s.PHTML.h - 0.4),
          u = Math.max(0.2, s.PHTML.d + 0.1);
        var t = this.PHTML;
        if (n && p) {
          var r = e.Element(
            'span',
            {
              className: 'MJXp-script-box',
              style: {
                height: g.Em(o + n.PHTML.h * 0.8 + u + p.PHTML.d * 0.8),
                'vertical-align': g.Em(-u - p.PHTML.d * 0.8)
              }
            },
            [
              [
                'span',
                {},
                [
                  [
                    'span',
                    {},
                    [
                      [
                        'span',
                        {
                          style: { 'margin-bottom': g.Em(-(n.PHTML.d - 0.05)) }
                        }
                      ]
                    ]
                  ]
                ]
              ],
              [
                'span',
                {},
                [
                  [
                    'span',
                    {},
                    [
                      [
                        'span',
                        { style: { 'margin-top': g.Em(-(n.PHTML.h - 0.05)) } }
                      ]
                    ]
                  ]
                ]
              ]
            ]
          );
          p.PHTMLhandleScriptlevel(r.firstChild);
          n.PHTMLhandleScriptlevel(r.lastChild);
          r.firstChild.firstChild.firstChild.appendChild(q.lastChild);
          r.lastChild.firstChild.firstChild.appendChild(q.lastChild);
          q.appendChild(r);
          t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
          t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
          t.w = s.PHTML.w + Math.max(n.PHTML.w, p.PHTML.w) + 0.07;
        } else {
          if (n) {
            q.lastChild.style.verticalAlign = g.Em(o);
            n.PHTMLhandleScriptlevel(q.lastChild);
            t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
            t.d = Math.max(s.PHTML.d, n.PHTML.d * 0.8 - o);
            t.w = s.PHTML.w + n.PHTML.w + 0.07;
          } else {
            if (p) {
              q.lastChild.style.verticalAlign = g.Em(-u);
              p.PHTMLhandleScriptlevel(q.lastChild);
              t.h = Math.max(s.PHTML.h, p.PHTML.h * 0.8 - u);
              t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
              t.w = s.PHTML.w + p.PHTML.w + 0.07;
            }
          }
        }
        return q;
      }
    });
    h.mfrac.Augment({
      toPreviewHTML: function(r) {
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: 'MJXp-box',
          forceChild: true,
          noBBox: true
        });
        var o = this.getValues('linethickness', 'displaystyle');
        if (!o.displaystyle) {
          if (this.data[0]) {
            this.data[0].PHTMLhandleScriptlevel(r.firstChild);
          }
          if (this.data[1]) {
            this.data[1].PHTMLhandleScriptlevel(r.lastChild);
          }
        }
        var n = e.Element('span', { className: 'MJXp-box' }, [
          [
            'span',
            { className: 'MJXp-denom' },
            [
              [
                'span',
                {},
                [['span', { className: 'MJXp-rule', style: { height: '1em' } }]]
              ],
              ['span']
            ]
          ]
        ]);
        n.firstChild.lastChild.appendChild(r.lastChild);
        r.appendChild(n);
        var s = this.PHTMLbboxFor(0),
          p = this.PHTMLbboxFor(1),
          v = this.PHTML;
        v.w = Math.max(s.w, p.w) * 0.8;
        v.h = s.h + s.d + 0.1 + 0.25;
        v.d = p.h + p.d - 0.25;
        v.l = v.r = 0.125;
        o.linethickness = Math.max(0, g.length2em(o.linethickness || '0', 0));
        if (o.linethickness) {
          var u = n.firstChild.firstChild.firstChild;
          var q = g.Em(o.linethickness);
          u.style.borderTop = 'none';
          u.style.borderBottom =
            (o.linethickness < 0.15 ? '1px' : q) + ' solid';
          u.style.margin = q + ' 0';
          q = o.linethickness;
          n.style.marginTop = g.Em(3 * q - 1.2);
          r.style.verticalAlign = g.Em(1.5 * q + 0.1);
          v.h += 1.5 * q - 0.1;
          v.d += 1.5 * q;
        } else {
          n.style.marginTop = '-.7em';
        }
        return r;
      }
    });
    h.msqrt.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n, {
          childSpans: true,
          className: 'MJXp-box',
          forceChild: true,
          noBBox: true
        });
        this.PHTMLlayoutRoot(n, n.firstChild);
        return n;
      },
      PHTMLlayoutRoot: function(u, n) {
        var v = this.PHTMLbboxFor(0);
        var q = Math.ceil((v.h + v.d + 0.14) * 100),
          w = g.Em(14 / q);
        var r = e.Element('span', { className: 'MJXp-surd' }, [
          [
            'span',
            { style: { 'font-size': q + '%', 'margin-top': w } },
            ['\u221A']
          ]
        ]);
        var s = e.Element('span', { className: 'MJXp-root' }, [
          [
            'span',
            { className: 'MJXp-rule', style: { 'border-top': '.08em solid' } }
          ]
        ]);
        var p = ((1.2 / 2.2) * q) / 100;
        if (q > 150) {
          var o = Math.ceil((150 / q) * 10);
          r.firstChild.className = 'MJXp-right MJXp-scale' + o;
          r.firstChild.style.marginLeft = g.Em(((p * (o / 10 - 1)) / q) * 100);
          p = (p * o) / 10;
          s.firstChild.style.borderTopWidth = g.Em(0.08 / Math.sqrt(o / 10));
        }
        s.appendChild(n);
        u.appendChild(r);
        u.appendChild(s);
        this.PHTML.h = v.h + 0.18;
        this.PHTML.d = v.d;
        this.PHTML.w = v.w + p;
        return u;
      }
    });
    h.mroot.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, {
          childSpans: true,
          className: 'MJXp-box',
          forceChild: true,
          noBBox: true
        });
        var p = this.PHTMLbboxFor(1),
          n = q.removeChild(q.lastChild);
        var t = this.PHTMLlayoutRoot(e.Element('span'), q.firstChild);
        n.className = 'MJXp-script';
        var u = parseInt(t.firstChild.firstChild.style.fontSize);
        var o = 0.55 * (u / 120) + p.d * 0.8,
          s = -0.6 * (u / 120);
        if (u > 150) {
          s *= (0.95 * Math.ceil((150 / u) * 10)) / 10;
        }
        n.style.marginRight = g.Em(s);
        n.style.verticalAlign = g.Em(o);
        if (-s > p.w * 0.8) {
          n.style.marginLeft = g.Em(-s - p.w * 0.8);
        }
        q.appendChild(n);
        q.appendChild(t);
        this.PHTML.w += Math.max(0, p.w * 0.8 + s);
        this.PHTML.h = Math.max(this.PHTML.h, p.h * 0.8 + o);
        return q;
      },
      PHTMLlayoutRoot: h.msqrt.prototype.PHTMLlayoutRoot
    });
    h.mfenced.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        this.addFakeNodes();
        this.PHTMLaddChild(q, 'open', {});
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, 'sep' + p, {});
          this.PHTMLaddChild(q, p, {});
        }
        this.PHTMLaddChild(q, 'close', {});
        var o = this.PHTML.h,
          r = this.PHTML.d;
        this.PHTMLstretchChild('open', o, r);
        for (p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLstretchChild('sep' + p, o, r);
          this.PHTMLstretchChild(p, o, r);
        }
        this.PHTMLstretchChild('close', o, r);
        return q;
      }
    });
    h.mrow.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var p = this.PHTML.h,
          r = this.PHTML.d;
        for (var o = 0, n = this.data.length; o < n; o++) {
          this.PHTMLstretchChild(o, p, r);
        }
        return q;
      }
    });
    h.mstyle.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        this.PHTMLhandleScriptlevel(n);
        return n;
      }
    });
    h.TeXAtom.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        n.className = 'MJXp-mrow';
        return n;
      }
    });
    h.mtable.Augment({
      toPreviewHTML: function(E) {
        E = this.PHTMLdefaultSpan(E, { noBBox: true });
        var r = this.getValues(
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
          'width'
        );
        var u = MathJax.Hub.SplitList,
          F,
          A,
          D,
          z;
        var N = u(r.columnspacing),
          w = u(r.rowspacing),
          L = u(r.columnalign),
          t = u(r.rowalign);
        for (F = 0, A = N.length; F < A; F++) {
          N[F] = g.length2em(N[F]);
        }
        for (F = 0, A = w.length; F < A; F++) {
          w[F] = g.length2em(w[F]);
        }
        var K = e.Element('span');
        while (E.firstChild) {
          K.appendChild(E.firstChild);
        }
        E.appendChild(K);
        var y = 0,
          s = 0;
        for (F = 0, A = this.data.length; F < A; F++) {
          var v = this.data[F];
          if (v) {
            var J = g.arrayEntry(w, F - 1),
              C = g.arrayEntry(t, F);
            var x = v.PHTML,
              q = v.PHTMLspanElement();
            q.style.verticalAlign = C;
            var B = v.type === 'mlabeledtr' ? 1 : 0;
            for (D = 0, z = v.data.length; D < z - B; D++) {
              var p = v.data[D + B];
              if (p) {
                var M = g.arrayEntry(N, D - 1),
                  G = g.arrayEntry(L, D);
                var I = p.PHTMLspanElement();
                if (D) {
                  x.w += M;
                  I.style.paddingLeft = g.Em(M);
                }
                if (F) {
                  I.style.paddingTop = g.Em(J);
                }
                I.style.textAlign = G;
              }
            }
            y += x.h + x.d;
            if (F) {
              y += J;
            }
            if (x.w > s) {
              s = x.w;
            }
          }
        }
        var o = this.PHTML;
        o.w = s;
        o.h = y / 2 + 0.25;
        o.d = y / 2 - 0.25;
        o.l = o.r = 0.125;
        return E;
      }
    });
    h.mlabeledtr.Augment({
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 1, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      }
    });
    h.semantics.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLcreateSpan(n);
        if (this.data[0]) {
          this.data[0].toPreviewHTML(n);
          MathJax.Hub.Insert(this.data[0].PHTML || {}, this.PHTML);
        }
        return n;
      }
    });
    h.annotation.Augment({ toPreviewHTML: function(n) {} });
    h['annotation-xml'].Augment({ toPreviewHTML: function(n) {} });
    MathJax.Hub.Register.StartupHook('onLoad', function() {
      setTimeout(MathJax.Callback(['loadComplete', g, 'jax.js']), 0);
    });
  });
  MathJax.Hub.Register.StartupHook('End Cookie', function() {
    if (b.config.menuSettings.zoom !== 'None') {
      i.Require('[MathJax]/extensions/MathZoom.js');
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PreviewHTML);
(function(b, g, f) {
  var c = b.config.menuSettings;
  var e = MathJax.OutputJax;
  var a = f.isMSIE && (document.documentMode || 0) < 8;
  var d = (MathJax.Extension['fast-preview'] = {
    version: '2.7.5',
    enabled: true,
    config: b.CombineConfig('fast-preview', {
      Chunks: { EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0 },
      color: 'inherit!important',
      updateTime: 30,
      updateDelay: 6,
      messageStyle: 'none',
      disabled: f.isMSIE && !f.versionAtLeast('8.0')
    }),
    Config: function() {
      if (b.config['CHTML-preview']) {
        MathJax.Hub.Config({ 'fast-preview': b.config['CHTML-preview'] });
      }
      var m, j, k, h, l;
      var i = this.config;
      if (!i.disabled && c.FastPreview == null) {
        b.Config({ menuSettings: { FastPreview: true } });
      }
      if (c.FastPreview) {
        MathJax.Ajax.Styles({
          '.MathJax_Preview .MJXf-math': { color: i.color }
        });
        b.Config({ 'HTML-CSS': i.Chunks, CommonHTML: i.Chunks, SVG: i.Chunks });
      }
      b.Register.MessageHook('Begin Math Output', function() {
        if (!h && d.Active()) {
          m = b.processUpdateTime;
          j = b.processUpdateDelay;
          k = b.config.messageStyle;
          b.processUpdateTime = i.updateTime;
          b.processUpdateDelay = i.updateDelay;
          b.Config({ messageStyle: i.messageStyle });
          MathJax.Message.Clear(0, 0);
          l = true;
        }
      });
      b.Register.MessageHook('End Math Output', function() {
        if (!h && l) {
          b.processUpdateTime = m;
          b.processUpdateDelay = j;
          b.Config({ messageStyle: k });
          h = true;
        }
      });
    },
    Disable: function() {
      this.enabled = false;
    },
    Enable: function() {
      this.enabled = true;
    },
    Active: function() {
      return (
        c.FastPreview && this.enabled && !(e[c.renderer] || {}).noFastPreview
      );
    },
    Preview: function(h) {
      if (!this.Active() || !h.script.parentNode) {
        return;
      }
      var i = h.script.MathJax.preview || h.script.previousSibling;
      if (!i || i.className !== MathJax.Hub.config.preRemoveClass) {
        i = g.Element('span', { className: MathJax.Hub.config.preRemoveClass });
        h.script.parentNode.insertBefore(i, h.script);
        h.script.MathJax.preview = i;
      }
      i.innerHTML = '';
      i.style.color = a ? 'black' : 'inherit';
      return this.postFilter(i, h);
    },
    postFilter: function(j, i) {
      if (!i.math.root.toPreviewHTML) {
        var h = MathJax.Callback.Queue();
        h.Push(
          [
            'Require',
            MathJax.Ajax,
            '[MathJax]/jax/output/PreviewHTML/config.js'
          ],
          ['Require', MathJax.Ajax, '[MathJax]/jax/output/PreviewHTML/jax.js']
        );
        b.RestartAfter(h.Push({}));
      }
      i.math.root.toPreviewHTML(j);
    },
    Register: function(h) {
      b.Register.StartupHook(h + ' Jax Require', function() {
        var i = MathJax.InputJax[h];
        i.postfilterHooks.Add(
          ['Preview', MathJax.Extension['fast-preview']],
          50
        );
      });
    }
  });
  d.Register('TeX');
  d.Register('MathML');
  d.Register('AsciiMath');
  b.Register.StartupHook('End Config', ['Config', d]);
  b.Startup.signal.Post('fast-preview Ready');
})(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
MathJax.Ajax.loadComplete('[MathJax]/extensions/fast-preview.js');
(function(a, e, b, f) {
  var c = b.config.menuSettings;
  var d = (MathJax.Extension.AssistiveMML = {
    version: '2.7.5',
    config: b.CombineConfig('AssistiveMML', {
      disabled: false,
      styles: {
        '.MJX_Assistive_MathML': {
          position: 'absolute!important',
          top: 0,
          left: 0,
          clip:
            b.Browser.isMSIE && (document.documentMode || 0) < 8
              ? 'rect(1px 1px 1px 1px)'
              : 'rect(1px, 1px, 1px, 1px)',
          padding: '1px 0 0 0!important',
          border: '0!important',
          height: '1px!important',
          width: '1px!important',
          overflow: 'hidden!important',
          display: 'block!important',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          '-khtml-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none'
        },
        '.MJX_Assistive_MathML.MJX_Assistive_MathML_Block': {
          width: '100%!important'
        }
      }
    }),
    Config: function() {
      if (!this.config.disabled && c.assistiveMML == null) {
        b.Config({ menuSettings: { assistiveMML: true } });
      }
      a.Styles(this.config.styles);
      b.Register.MessageHook('End Math', function(g) {
        if (c.assistiveMML) {
          return d.AddAssistiveMathML(g[1]);
        }
      });
    },
    AddAssistiveMathML: function(g) {
      var h = { jax: b.getAllJax(g), i: 0, callback: MathJax.Callback({}) };
      this.HandleMML(h);
      return h.callback;
    },
    RemoveAssistiveMathML: function(k) {
      var h = b.getAllJax(k),
        l;
      for (var j = 0, g = h.length; j < g; j++) {
        l = document.getElementById(h[j].inputID + '-Frame');
        if (l && l.getAttribute('data-mathml')) {
          l.removeAttribute('data-mathml');
          if (
            l.lastChild &&
            l.lastChild.className.match(/MJX_Assistive_MathML/)
          ) {
            l.removeChild(l.lastChild);
          }
        }
      }
    },
    HandleMML: function(l) {
      var g = l.jax.length,
        h,
        i,
        n,
        j;
      while (l.i < g) {
        h = l.jax[l.i];
        n = document.getElementById(h.inputID + '-Frame');
        if (
          h.outputJax !== 'NativeMML' &&
          h.outputJax !== 'PlainSource' &&
          n &&
          !n.getAttribute('data-mathml')
        ) {
          try {
            i = h.root
              .toMathML('')
              .replace(/\n */g, '')
              .replace(/<!--.*?-->/g, '');
          } catch (k) {
            if (!k.restart) {
              throw k;
            }
            return MathJax.Callback.After(['HandleMML', this, l], k.restart);
          }
          n.setAttribute('data-mathml', i);
          j = f.addElement(n, 'span', {
            isMathJax: true,
            unselectable: 'on',
            className:
              'MJX_Assistive_MathML' +
              (h.root.Get('display') === 'block'
                ? ' MJX_Assistive_MathML_Block'
                : '')
          });
          try {
            j.innerHTML = i;
          } catch (k) {}
          n.style.position = 'relative';
          n.setAttribute('role', 'presentation');
          n.firstChild.setAttribute('aria-hidden', 'true');
          j.setAttribute('role', 'presentation');
        }
        l.i++;
      }
      l.callback();
    }
  });
  b.Startup.signal.Post('AssistiveMML Ready');
})(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
MathJax.Callback.Queue(
  ['Require', MathJax.Ajax, '[MathJax]/extensions/toMathML.js'],
  ['loadComplete', MathJax.Ajax, '[MathJax]/extensions/AssistiveMML.js'],
  function() {
    MathJax.Hub.Register.StartupHook('End Config', [
      'Config',
      MathJax.Extension.AssistiveMML
    ]);
  }
);
!(function(a, b) {
  var c,
    d,
    e = a.config.menuSettings,
    f = Function.prototype.bind
      ? function(a, b) {
          return a.bind(b);
        }
      : function(a, b) {
          return function() {
            a.apply(b, arguments);
          };
        },
    g =
      Object.keys ||
      function(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b;
      },
    h = MathJax.Ajax.config.path;
  h.a11y || (h.a11y = a.config.root + '/extensions/a11y');
  var i = (b['accessibility-menu'] = {
      version: '1.5.0',
      prefix: '',
      defaults: {},
      modules: [],
      MakeOption: function(a) {
        return i.prefix + a;
      },
      GetOption: function(a) {
        return e[i.MakeOption(a)];
      },
      AddDefaults: function() {
        for (var a, b = g(i.defaults), c = 0; (a = b[c]); c++) {
          var d = i.MakeOption(a);
          void 0 === e[d] && (e[d] = i.defaults[a]);
        }
      },
      AddMenu: function() {
        for (
          var a, b = Array(this.modules.length), e = 0;
          (a = this.modules[e]);
          e++
        )
          b[e] = a.placeHolder;
        var f = d.FindId('Accessibility');
        if (f)
          b.unshift(c.RULE()), f.submenu.items.push.apply(f.submenu.items, b);
        else {
          var g = (d.FindId('Settings', 'Renderer') || {}).submenu;
          g &&
            (b.unshift(c.RULE()),
            b.unshift(g.items.pop()),
            b.unshift(g.items.pop())),
            b.unshift('Accessibility');
          var f = c.SUBMENU.apply(c.SUBMENU, b),
            h = d.IndexOfId('Locale');
          h ? d.items.splice(h, 0, f) : d.items.push(c.RULE(), f);
        }
      },
      Register: function(a) {
        (i.defaults[a.option] = !1), i.modules.push(a);
      },
      Startup: function() {
        (c = MathJax.Menu.ITEM), (d = MathJax.Menu.menu);
        for (var a, b = 0; (a = this.modules[b]); b++) a.CreateMenu();
        this.AddMenu();
      },
      LoadExtensions: function() {
        for (var b, c = [], d = 0; (b = this.modules[d]); d++)
          e[b.option] && c.push(b.module);
        return c.length ? a.Startup.loadArray(c) : null;
      }
    }),
    j = (MathJax.Extension.ModuleLoader = MathJax.Object.Subclass({
      option: '',
      name: ['', ''],
      module: '',
      placeHolder: null,
      submenu: !1,
      extension: null,
      Init: function(a, b, c, d, e) {
        (this.option = a),
          (this.name = [b.replace(/ /g, ''), b]),
          (this.module = c),
          (this.extension = d),
          (this.submenu = e || !1);
      },
      CreateMenu: function() {
        var a = f(this.Load, this);
        this.submenu
          ? (this.placeHolder = c.SUBMENU(
              this.name,
              c.CHECKBOX(['Activate', 'Activate'], i.MakeOption(this.option), {
                action: a
              }),
              c.RULE(),
              c.COMMAND(['OptionsWhenActive', '(Options when Active)'], null, {
                disabled: !0
              })
            ))
          : (this.placeHolder = c.CHECKBOX(
              this.name,
              i.MakeOption(this.option),
              { action: a }
            ));
      },
      Load: function() {
        a.Queue(['Require', MathJax.Ajax, this.module, ['Enable', this]]);
      },
      Enable: function(a) {
        var b = MathJax.Extension[this.extension];
        b && (b.Enable(!0, !0), MathJax.Menu.saveCookie());
      }
    }));
  i.Register(
    j('collapsible', 'Collapsible Math', '[a11y]/collapsible.js', 'collapsible')
  ),
    i.Register(
      j(
        'autocollapse',
        'Auto Collapse',
        '[a11y]/auto-collapse.js',
        'auto-collapse'
      )
    ),
    i.Register(j('explorer', 'Explorer', '[a11y]/explorer.js', 'explorer', !0)),
    i.AddDefaults(),
    a.Register.StartupHook(
      'End Extensions',
      function() {
        a.Register.StartupHook(
          'MathMenu Ready',
          function() {
            i.Startup(), a.Startup.signal.Post('Accessibility Menu Ready');
          },
          5
        );
      },
      5
    ),
    MathJax.Hub.Register.StartupHook('End Cookie', function() {
      MathJax.Callback.Queue(
        ['LoadExtensions', i],
        ['loadComplete', MathJax.Ajax, '[a11y]/accessibility-menu.js']
      );
    });
})(MathJax.Hub, MathJax.Extension);
MathJax.Ajax.loadComplete('[MathJax]/config/TeX-AMS_CHTML-full.js');
