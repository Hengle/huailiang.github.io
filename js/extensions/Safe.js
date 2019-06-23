
(function(d, c) {
  var f = '2.7.5';
  var a = MathJax.Hub.CombineConfig('Safe', {
    allow: {
      URLs: 'safe',
      classes: 'safe',
      cssIDs: 'safe',
      styles: 'safe',
      fontsize: 'all',
      require: 'safe'
    },
    sizeMin: 0.7,
    sizeMax: 1.44,
    lengthMax: 3,
    safeProtocols: { http: true, https: true, file: true, javascript: false },
    safeStyles: {
      color: true,
      backgroundColor: true,
      border: true,
      cursor: true,
      margin: true,
      padding: true,
      textShadow: true,
      fontFamily: true,
      fontSize: true,
      fontStyle: true,
      fontWeight: true,
      opacity: true,
      outline: true
    },
    safeRequire: {
      action: true,
      amscd: true,
      amsmath: true,
      amssymbols: true,
      autobold: false,
      'autoload-all': false,
      bbox: true,
      begingroup: true,
      boldsymbol: true,
      cancel: true,
      color: true,
      enclose: true,
      extpfeil: true,
      HTML: true,
      mathchoice: true,
      mhchem: true,
      newcommand: true,
      noErrors: false,
      noUndefined: false,
      unicode: true,
      verb: true
    },
    styleParts: { border: true, padding: true, margin: true, outline: true },
    styleLengths: {
      borderTop: 'borderTopWidth',
      borderRight: 'borderRightWidth',
      borderBottom: 'borderBottomWidth',
      borderLeft: 'borderLeftWidth',
      paddingTop: true,
      paddingRight: true,
      paddingBottom: true,
      paddingLeft: true,
      marginTop: true,
      marginRight: true,
      marginBottom: true,
      marginLeft: true,
      outlineTop: true,
      outlineRight: true,
      outlineBottom: true,
      outlineLeft: true,
      fontSize: [0.7, 1.44]
    }
  });
  var e = a.allow;
  if (e.fontsize !== 'all') {
    a.safeStyles.fontSize = false;
  }
  var b = (MathJax.Extension.Safe = {
    version: f,
    config: a,
    div1: document.createElement('div'),
    div2: document.createElement('div'),
    filter: {
      href: 'filterURL',
      src: 'filterURL',
      altimg: 'filterURL',
      class: 'filterClass',
      style: 'filterStyles',
      id: 'filterID',
      fontsize: 'filterFontSize',
      mathsize: 'filterFontSize',
      scriptminsize: 'filterFontSize',
      scriptsizemultiplier: 'filterSizeMultiplier',
      scriptlevel: 'filterScriptLevel'
    },
    filterURL: function(g) {
      var h = (g.match(/^\s*([a-z]+):/i) || [null, ''])[1].toLowerCase();
      if (e.URLs === 'none' || (e.URLs !== 'all' && !a.safeProtocols[h])) {
        g = null;
      }
      return g;
    },
    filterClass: function(g) {
      if (
        e.classes === 'none' ||
        (e.classes !== 'all' && !g.match(/^MJX-[-a-zA-Z0-9_.]+$/))
      ) {
        g = null;
      }
      return g;
    },
    filterID: function(g) {
      if (
        e.cssIDs === 'none' ||
        (e.cssIDs !== 'all' && !g.match(/^MJX-[-a-zA-Z0-9_.]+$/))
      ) {
        g = null;
      }
      return g;
    },
    filterStyles: function(l) {
      if (e.styles === 'all') {
        return l;
      }
      if (e.styles === 'none') {
        return null;
      }
      try {
        var k = this.div1.style,
          j = this.div2.style,
          m;
        k.cssText = l;
        j.cssText = '';
        for (var g in a.safeStyles) {
          if (a.safeStyles.hasOwnProperty(g)) {
            if (a.styleParts[g]) {
              for (var h = 0; h < 4; h++) {
                var o = g + ['Top', 'Right', 'Bottom', 'Left'][h];
                m = this.filterStyle(o, k);
                if (m) {
                  j[o] = m;
                }
              }
            } else {
              m = this.filterStyle(g, k);
              if (m) {
                j[g] = m;
              }
            }
          }
        }
        l = j.cssText;
      } catch (n) {
        l = null;
      }
      return l;
    },
    filterStyle: function(g, h) {
      var i = h[g];
      if (typeof i !== 'string' || i === '') {
        return null;
      }
      if (i.match(/^\s*expression/)) {
        return null;
      }
      if (i.match(/javascript:/)) {
        return null;
      }
      var j = g.replace(/Top|Right|Left|Bottom/, '');
      if (!a.safeStyles[g] && !a.safeStyles[j]) {
        return null;
      }
      if (!a.styleLengths[g]) {
        return i;
      }
      return this.filterStyleLength(g, i, h) ? i : null;
    },
    filterStyleLength: function(g, i, h) {
      if (typeof a.styleLengths[g] === 'string') {
        i = h[a.styleLengths[g]];
      }
      i = this.length2em(i);
      if (i == null) {
        return false;
      }
      var j = [-a.lengthMax, a.lengthMax];
      if (MathJax.Object.isArray(a.styleLengths[g])) {
        j = a.styleLengths[g];
      }
      return i >= j[0] && i <= j[1];
    },
    unit2em: {
      em: 1,
      ex: 0.5,
      ch: 0.5,
      rem: 1,
      px: 1 / 16,
      mm: 96 / 25.4 / 16,
      cm: 96 / 2.54 / 16,
      in: 96 / 16,
      pt: 96 / 72 / 16,
      pc: 96 / 6 / 16
    },
    length2em: function(h) {
      var g = h.match(/(.+)(em|ex|ch|rem|px|mm|cm|in|pt|pc)/);
      if (!g) {
        return null;
      }
      return parseFloat(g[1]) * this.unit2em[g[2]];
    },
    filterSize: function(g) {
      if (e.fontsize === 'none') {
        return null;
      }
      if (e.fontsize !== 'all') {
        g = Math.min(Math.max(g, a.sizeMin), a.sizeMax);
      }
      return g;
    },
    filterFontSize: function(g) {
      return e.fontsize === 'all' ? g : null;
    },
    filterSizeMultiplier: function(g) {
      if (e.fontsize === 'none') {
        g = null;
      } else {
        if (e.fontsize !== 'all') {
          g = Math.min(1, Math.max(0.6, g)).toString();
        }
      }
      return g;
    },
    filterScriptLevel: function(g) {
      if (e.fontsize === 'none') {
        g = null;
      } else {
        if (e.fontsize !== 'all') {
          g = Math.max(0, g).toString();
        }
      }
      return g;
    },
    filterRequire: function(g) {
      if (
        e.require === 'none' ||
        (e.require !== 'all' && !a.safeRequire[g.toLowerCase()])
      ) {
        g = null;
      }
      return g;
    }
  });
  d.Register.StartupHook('TeX HTML Ready', function() {
    var g = MathJax.InputJax.TeX;
    g.Parse.Augment({
      HREF_attribute: function(j) {
        var i = b.filterURL(this.GetArgument(j)),
          h = this.GetArgumentMML(j);
        if (i) {
          h.With({ href: i });
        }
        this.Push(h);
      },
      CLASS_attribute: function(i) {
        var j = b.filterClass(this.GetArgument(i)),
          h = this.GetArgumentMML(i);
        if (j) {
          if (h['class'] != null) {
            j = h['class'] + ' ' + j;
          }
          h.With({ class: j });
        }
        this.Push(h);
      },
      STYLE_attribute: function(i) {
        var j = b.filterStyles(this.GetArgument(i)),
          h = this.GetArgumentMML(i);
        if (j) {
          if (h.style != null) {
            if (j.charAt(j.length - 1) !== ';') {
              j += ';';
            }
            j = h.style + ' ' + j;
          }
          h.With({ style: j });
        }
        this.Push(h);
      },
      ID_attribute: function(j) {
        var i = b.filterID(this.GetArgument(j)),
          h = this.GetArgumentMML(j);
        if (i) {
          h.With({ id: i });
        }
        this.Push(h);
      }
    });
  });
  d.Register.StartupHook('TeX Jax Ready', function() {
    var i = MathJax.InputJax.TeX,
      h = i.Parse,
      g = b.filter;
    h.Augment({
      Require: function(j) {
        var k = this.GetArgument(j)
          .replace(/.*\//, '')
          .replace(/[^a-z0-9_.-]/gi, '');
        k = b.filterRequire(k);
        if (k) {
          this.Extension(null, k);
        }
      },
      MmlFilterAttribute: function(j, k) {
        if (g[j]) {
          k = b[g[j]](k);
        }
        return k;
      },
      SetSize: function(j, k) {
        k = b.filterSize(k);
        if (k) {
          this.stack.env.size = k;
          this.Push(
            i.Stack.Item.style().With({ styles: { mathsize: k + 'em' } })
          );
        }
      }
    });
  });
  d.Register.StartupHook('TeX bbox Ready', function() {
    var g = MathJax.InputJax.TeX;
    g.Parse.Augment({
      BBoxStyle: function(h) {
        return b.filterStyles(h);
      },
      BBoxPadding: function(i) {
        var h = b.filterStyles('padding: ' + i);
        return h ? i : 0;
      }
    });
  });
  d.Register.StartupHook('MathML Jax Ready', function() {
    var h = MathJax.InputJax.MathML.Parse,
      g = b.filter;
    h.Augment({
      filterAttribute: function(i, j) {
        if (g[i]) {
          j = b[g[i]](j);
        }
        return j;
      }
    });
  });
  d.Startup.signal.Post('Safe Extension Ready');
  c.loadComplete('[MathJax]/extensions/Safe.js');
})(MathJax.Hub, MathJax.Ajax);
