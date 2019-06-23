
MathJax.Extension.mml2jax = {
  version: '2.7.5',
  config: { preview: 'mathml' },
  MMLnamespace: 'http://www.w3.org/1998/Math/MathML',
  PreProcess: function(e) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig('mml2jax', this.config);
      if (this.config.Augment) {
        MathJax.Hub.Insert(this, this.config.Augment);
      }
      this.InitBrowser();
      this.configured = true;
    }
    if (typeof e === 'string') {
      e = document.getElementById(e);
    }
    if (!e) {
      e = document.body;
    }
    var h = [];
    this.PushMathElements(h, e, 'math');
    this.PushMathElements(h, e, 'math', this.MMLnamespace);
    var d, b;
    if (typeof document.namespaces !== 'undefined') {
      try {
        for (d = 0, b = document.namespaces.length; d < b; d++) {
          var f = document.namespaces[d];
          if (f.urn === this.MMLnamespace) {
            this.PushMathElements(h, e, f.name + ':math');
          }
        }
      } catch (g) {}
    } else {
      var c = document.getElementsByTagName('html')[0];
      if (c) {
        for (d = 0, b = c.attributes.length; d < b; d++) {
          var a = c.attributes[d];
          if (
            a.nodeName.substr(0, 6) === 'xmlns:' &&
            a.nodeValue === this.MMLnamespace
          ) {
            this.PushMathElements(h, e, a.nodeName.substr(6) + ':math');
          }
        }
      }
    }
    this.ProcessMathArray(h);
  },
  PushMathElements: function(f, d, a, c) {
    var h,
      g = MathJax.Hub.config.preRemoveClass;
    if (c) {
      if (!d.getElementsByTagNameNS) {
        return;
      }
      h = d.getElementsByTagNameNS(c, a);
    } else {
      h = d.getElementsByTagName(a);
    }
    for (var e = 0, b = h.length; e < b; e++) {
      var j = h[e].parentNode;
      if (j && j.className !== g && !j.isMathJax && !h[e].prefix === !c) {
        f.push(h[e]);
      }
    }
  },
  ProcessMathArray: function(c) {
    var b,
      a = c.length;
    if (a) {
      if (this.MathTagBug) {
        for (b = 0; b < a; b++) {
          if (c[b].nodeName === 'MATH') {
            this.ProcessMathFlattened(c[b]);
          } else {
            this.ProcessMath(c[b]);
          }
        }
      } else {
        for (b = 0; b < a; b++) {
          this.ProcessMath(c[b]);
        }
      }
    }
  },
  ProcessMath: function(e) {
    var d = e.parentNode;
    if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
      return;
    }
    var a = document.createElement('script');
    a.type = 'math/mml';
    d.insertBefore(a, e);
    if (this.AttributeBug) {
      var b = this.OuterHTML(e);
      if (this.CleanupHTML) {
        b = b
          .replace(/<\?import .*?>/i, '')
          .replace(/<\?xml:namespace .*?\/>/i, '');
        b = b.replace(/&nbsp;/g, '&#xA0;');
      }
      MathJax.HTML.setScript(a, b);
      d.removeChild(e);
    } else {
      var c = MathJax.HTML.Element('span');
      c.appendChild(e);
      MathJax.HTML.setScript(a, c.innerHTML);
    }
    if (this.config.preview !== 'none') {
      this.createPreview(e, a);
    }
  },
  ProcessMathFlattened: function(f) {
    var d = f.parentNode;
    if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
      return;
    }
    var b = document.createElement('script');
    b.type = 'math/mml';
    d.insertBefore(b, f);
    var c = '',
      e,
      a = f;
    while (f && f.nodeName !== '/MATH') {
      e = f;
      f = f.nextSibling;
      c += this.NodeHTML(e);
      e.parentNode.removeChild(e);
    }
    if (f && f.nodeName === '/MATH') {
      f.parentNode.removeChild(f);
    }
    b.text = c + '</math>';
    if (this.config.preview !== 'none') {
      this.createPreview(a, b);
    }
  },
  NodeHTML: function(e) {
    var c, b, a;
    if (e.nodeName === '#text') {
      c = this.quoteHTML(e.nodeValue);
    } else {
      if (e.nodeName === '#comment') {
        c = '<!--' + e.nodeValue + '-->';
      } else {
        c = '<' + e.nodeName.toLowerCase();
        for (b = 0, a = e.attributes.length; b < a; b++) {
          var d = e.attributes[b];
          if (d.specified && d.nodeName.substr(0, 10) !== '_moz-math-') {
            c +=
              ' ' +
              d.nodeName.toLowerCase().replace(/xmlns:xmlns/, 'xmlns') +
              '=';
            var f = d.nodeValue;
            if (f == null && d.nodeName === 'style' && e.style) {
              f = e.style.cssText;
            }
            c += '"' + this.quoteHTML(f) + '"';
          }
        }
        c += '>';
        if (e.outerHTML != null && e.outerHTML.match(/(.<\/[A-Z]+>|\/>)$/)) {
          for (b = 0, a = e.childNodes.length; b < a; b++) {
            c += this.OuterHTML(e.childNodes[b]);
          }
          c += '</' + e.nodeName.toLowerCase() + '>';
        }
      }
    }
    return c;
  },
  OuterHTML: function(d) {
    if (d.nodeName.charAt(0) === '#') {
      return this.NodeHTML(d);
    }
    if (!this.AttributeBug) {
      return d.outerHTML;
    }
    var c = this.NodeHTML(d);
    for (var b = 0, a = d.childNodes.length; b < a; b++) {
      c += this.OuterHTML(d.childNodes[b]);
    }
    c += '</' + d.nodeName.toLowerCase() + '>';
    return c;
  },
  quoteHTML: function(a) {
    if (a == null) {
      a = '';
    }
    return a
      .replace(/&/g, '&#x26;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;');
  },
  createPreview: function(g, f) {
    var e = this.config.preview;
    if (e === 'none') {
      return;
    }
    var i = false;
    var c = MathJax.Hub.config.preRemoveClass;
    if ((f.previousSibling || {}).className === c) {
      return;
    }
    if (e === 'mathml') {
      i = true;
      if (this.MathTagBug) {
        e = 'alttext';
      } else {
        e = g.cloneNode(true);
      }
    }
    if (e === 'alttext' || e === 'altimg') {
      i = true;
      var d = this.filterPreview(g.getAttribute('alttext'));
      if (e === 'alttext') {
        if (d != null) {
          e = MathJax.HTML.TextNode(d);
        } else {
          e = null;
        }
      } else {
        var a = g.getAttribute('altimg');
        if (a != null) {
          var b = {
            width: g.getAttribute('altimg-width'),
            height: g.getAttribute('altimg-height')
          };
          e = MathJax.HTML.Element('img', { src: a, alt: d, style: b });
        } else {
          e = null;
        }
      }
    }
    if (e) {
      var h;
      if (i) {
        h = MathJax.HTML.Element('span', { className: c });
        h.appendChild(e);
      } else {
        h = MathJax.HTML.Element('span', { className: c }, e);
      }
      f.parentNode.insertBefore(h, f);
    }
  },
  filterPreview: function(a) {
    return a;
  },
  InitBrowser: function() {
    var b = MathJax.HTML.Element('span', {
      id: '<',
      className: 'mathjax',
      innerHTML: '<math><mi>x</mi><mspace /></math>'
    });
    var a = b.outerHTML || '';
    this.AttributeBug =
      a !== '' &&
      !(
        a.match(/id="&lt;"/) &&
        a.match(/class="mathjax"/) &&
        a.match(/<\/math>/)
      );
    this.MathTagBug = b.childNodes.length > 1;
    this.CleanupHTML = MathJax.Hub.Browser.isMSIE;
  }
};
MathJax.Hub.Register.PreProcessor(['PreProcess', MathJax.Extension.mml2jax], 5);
MathJax.Ajax.loadComplete('[MathJax]/extensions/mml2jax.js');
