MathJax.Extension.tex2jax = {
  version: "2.0",
  config: {
    inlineMath: [              // The start/stop pairs for in-line math
      //    ['$','$'],               //  (comment out any you don't want, or add your own, but
      ['\\(', '\\)']            //  be sure that you don't have an extra comma at the end)
    ],

    displayMath: [             // The start/stop pairs for display math
      ['$$', '$$'],             //  (comment out any you don't want, or add your own, but
      ['\\[', '\\]']            //  be sure that you don't have an extra comma at the end)
    ],

    balanceBraces: true,       
    skipTags: ["script", "noscript", "style", "textarea", "pre", "code"],

    ignoreClass: "tex2jax_ignore",    

    processClass: "tex2jax_process",  

    processEscapes: false,    

    processEnvironments: true, 

    processRefs: true,   

    preview: "TeX"            
  },

  PreProcess: function (element) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("tex2jax", this.config);
      if (this.config.Augment) { MathJax.Hub.Insert(this, this.config.Augment) }
      if (typeof (this.config.previewTeX) !== "undefined" && !this.config.previewTeX) { this.config.preview = "none" } // backward compatibility for previewTeX parameter
      this.configured = true;
    }
    if (typeof (element) === "string") { element = document.getElementById(element) }
    if (!element) { element = document.body }
    if (this.createPatterns()) { this.scanElement(element, element.nextSibling) }
  },

  createPatterns: function () {
    var starts = [], parts = [], i, m, config = this.config;
    this.match = {};
    for (i = 0, m = config.inlineMath.length; i < m; i++) {
      starts.push(this.patternQuote(config.inlineMath[i][0]));
      this.match[config.inlineMath[i][0]] = {
        mode: "",
        end: config.inlineMath[i][1],
        pattern: this.endPattern(config.inlineMath[i][1])
      };
    }
    for (i = 0, m = config.displayMath.length; i < m; i++) {
      starts.push(this.patternQuote(config.displayMath[i][0]));
      this.match[config.displayMath[i][0]] = {
        mode: "; mode=display",
        end: config.displayMath[i][1],
        pattern: this.endPattern(config.displayMath[i][1])
      };
    }
    if (starts.length) { parts.push(starts.sort(this.sortLength).join("|")) }
    if (config.processEnvironments) { parts.push("\\\\begin\\{([^}]*)\\}") }
    if (config.processEscapes) { parts.push("\\\\*\\\\\\\$") }
    if (config.processRefs) { parts.push("\\\\(eq)?ref\\{[^}]*\\}") }
    this.start = new RegExp(parts.join("|"), "g");
    this.skipTags = new RegExp("^(" + config.skipTags.join("|") + ")$", "i");
    this.ignoreClass = new RegExp("(^| )(" + config.ignoreClass + ")( |$)");
    this.processClass = new RegExp("(^| )(" + config.processClass + ")( |$)");
    return (parts.length > 0);
  },

  patternQuote: function (s) { return s.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1') },

  endPattern: function (end) {
    return new RegExp(this.patternQuote(end) + "|\\\\.|[{}]", "g");
  },

  sortLength: function (a, b) {
    if (a.length !== b.length) { return b.length - a.length }
    return (a == b ? 0 : (a < b ? -1 : 1));
  },

  scanElement: function (element, stop, ignore) {
    var cname, tname, ignoreChild, process;
    while (element && element != stop) {
      if (element.nodeName.toLowerCase() === '#text') {
        if (!ignore) { element = this.scanText(element) }
      } else {
        cname = (typeof (element.className) === "undefined" ? "" : element.className);
        tname = (typeof (element.tagName) === "undefined" ? "" : element.tagName);
        if (typeof (cname) !== "string") { cname = String(cname) } // jsxgraph uses non-string class names!
        process = this.processClass.exec(cname);
        if (element.firstChild && !cname.match(/(^| )MathJax/) &&
          (process || !this.skipTags.exec(tname))) {
          ignoreChild = (ignore || this.ignoreClass.exec(cname)) && !process;
          this.scanElement(element.firstChild, stop, ignoreChild);
        }
      }
      if (element) { element = element.nextSibling }
    }
  },

  scanText: function (element) {
    if (element.nodeValue.replace(/\s+/, '') == '') { return element }
    var match, prev;
    this.search = { start: true };
    this.pattern = this.start;
    while (element) {
      this.pattern.lastIndex = 0;
      while (element && element.nodeName.toLowerCase() === '#text' &&
        (match = this.pattern.exec(element.nodeValue))) {
        if (this.search.start) { element = this.startMatch(match, element) }
        else { element = this.endMatch(match, element) }
      }
      if (this.search.matched) { element = this.encloseMath(element) }
      if (element) {
        do { prev = element; element = element.nextSibling }
        while (element && (element.nodeName.toLowerCase() === 'br' ||
          element.nodeName.toLowerCase() === '#comment'));
        if (!element || element.nodeName !== '#text') { return (this.search.close ? this.prevEndMatch() : prev) }
      }
    }
    return element;
  },

  startMatch: function (match, element) {
    var delim = this.match[match[0]];
    if (delim != null) {                              // a start delimiter
      this.search = {
        end: delim.end, mode: delim.mode, pcount: 0,
        open: element, olen: match[0].length, opos: this.pattern.lastIndex - match[0].length
      };
      this.switchPattern(delim.pattern);
    } else if (match[0].substr(0, 6) === "\\begin") {  // \begin{...}
      this.search = {
        end: "\\end{" + match[1] + "}", mode: "; mode=display", pcount: 0,
        open: element, olen: 0, opos: this.pattern.lastIndex - match[0].length,
        isBeginEnd: true
      };
      this.switchPattern(this.endPattern(this.search.end));
    } else if (match[0].substr(0, 4) === "\\ref" || match[0].substr(0, 6) === "\\eqref") {
      this.search = {
        mode: "", end: "", open: element, pcount: 0,
        olen: 0, opos: this.pattern.lastIndex - match[0].length
      }
      return this.endMatch([""], element);
    } else {                                         // escaped dollar signs
      // put $ in a span so it doesn't get processed again
      // split off backslashes so they don't get removed later
      var slashes = match[0].substr(0, match[0].length - 1), n, span;
      if (slashes.length % 2 === 0) { span = [slashes.replace(/\\\\/g, "\\")]; n = 1 }
      else { span = [slashes.substr(1).replace(/\\\\/g, "\\"), "$"]; n = 0 }
      span = MathJax.HTML.Element("span", null, span);
      var text = MathJax.HTML.TextNode(element.nodeValue.substr(0, match.index));
      element.nodeValue = element.nodeValue.substr(match.index + match[0].length - n);
      element.parentNode.insertBefore(span, element);
      element.parentNode.insertBefore(text, span);
      this.pattern.lastIndex = n;
    }
    return element;
  },

  endMatch: function (match, element) {
    var search = this.search;
    if (match[0] == search.end) {
      if (!search.close || search.pcount === 0) {
        search.close = element;
        search.cpos = this.pattern.lastIndex;
        search.clen = (search.isBeginEnd ? 0 : match[0].length);
      }
      if (search.pcount === 0) {
        search.matched = true;
        element = this.encloseMath(element);
        this.switchPattern(this.start);
      }
    }
    else if (match[0] === "{") { search.pcount++ }
    else if (match[0] === "}" && search.pcount) { search.pcount-- }
    return element;
  },
  prevEndMatch: function () {
    this.search.matched = true;
    var element = this.encloseMath(this.search.close);
    this.switchPattern(this.start);
    return element;
  },

  switchPattern: function (pattern) {
    pattern.lastIndex = this.pattern.lastIndex;
    this.pattern = pattern;
    this.search.start = (pattern === this.start);
  },

  encloseMath: function (element) {
    var search = this.search, close = search.close, CLOSE, math;
    if (search.cpos === close.length) { close = close.nextSibling }
    else { close = close.splitText(search.cpos) }
    if (!close) { CLOSE = close = MathJax.HTML.addText(search.close.parentNode, "") }
    search.close = close;
    math = (search.opos ? search.open.splitText(search.opos) : search.open);
    while (math.nextSibling && math.nextSibling !== close) {
      if (math.nextSibling.nodeValue !== null) {
        if (math.nextSibling.nodeName === "#comment") {
          math.nodeValue += math.nextSibling.nodeValue.replace(/^\[CDATA\[((.|\n|\r)*)\]\]$/, "$1");
        } else {
          math.nodeValue += math.nextSibling.nodeValue;
        }
      } else if (this.msieNewlineBug) {
        math.nodeValue += (math.nextSibling.nodeName.toLowerCase() === "br" ? "\n" : " ");
      } else {
        math.nodeValue += " ";
      }
      math.parentNode.removeChild(math.nextSibling);
    }
    var TeX = math.nodeValue.substr(search.olen, math.nodeValue.length - search.olen - search.clen);
    math.parentNode.removeChild(math);
    if (this.config.preview !== "none") { this.createPreview(search.mode, TeX) }
    math = this.createMathTag(search.mode, TeX);
    this.search = {}; this.pattern.lastIndex = 0;
    if (CLOSE) { CLOSE.parentNode.removeChild(CLOSE) }
    return math;
  },

  insertNode: function (node) {
    var search = this.search;
    search.close.parentNode.insertBefore(node, search.close);
  },

  createPreview: function (mode, tex) {
    var preview;
    if (this.config.preview === "TeX") { preview = [this.filterPreview(tex)] }
    else if (this.config.preview instanceof Array) { preview = this.config.preview }
    if (preview) {
      preview = MathJax.HTML.Element("span", { className: MathJax.Hub.config.preRemoveClass }, preview);
      this.insertNode(preview);
    }
  },

  createMathTag: function (mode, tex) {
    var script = document.createElement("script");
    script.type = "math/tex" + mode;
    MathJax.HTML.setScript(script, tex);
    this.insertNode(script);
    return script;
  },

  filterPreview: function (tex) { return tex },

  msieNewlineBug: (MathJax.Hub.Browser.isMSIE && document.documentMode < 9)

};

MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.tex2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/tex2jax.js");
