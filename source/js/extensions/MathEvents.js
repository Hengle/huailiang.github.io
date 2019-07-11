(function (HUB, HTML, AJAX, CALLBACK, OUTPUT, INPUT) {
  var VERSION = "2.0";

  var EXTENSION = MathJax.Extension;
  var ME = EXTENSION.MathEvents = { version: VERSION };

  var SETTINGS = HUB.config.menuSettings;

  var CONFIG = {
    hover: 500,              // time required to be considered a hover
    frame: {
      x: 3.5, y: 5,          // frame padding and
      bwidth: 1,             // frame border width (in pixels)
      bcolor: "#A6D",        // frame border color
      hwidth: "15px",        // haze width
      hcolor: "#83A"         // haze color
    },
    button: {
      x: -4, y: -3,          // menu button offsets
      wx: -2,                // button offset for full-width equations
      src: AJAX.fileURL(OUTPUT.imageDir + "/MenuArrow-15.png")  // button image
    },
    fadeinInc: .2,           // increment for fade-in
    fadeoutInc: .05,         // increment for fade-out
    fadeDelay: 50,           // delay between fade-in or fade-out steps
    fadeoutStart: 400,       // delay before fade-out after mouseout
    fadeoutDelay: 15 * 1000,   // delay before automatic fade-out

    styles: {
      ".MathJax_Hover_Frame": {
        "border-radius": ".25em",                   // Opera 10.5 and IE9
        "-webkit-border-radius": ".25em",           // Safari and Chrome
        "-moz-border-radius": ".25em",              // Firefox
        "-khtml-border-radius": ".25em",            // Konqueror
        "box-shadow": "0px 0px 15px #83A",          // Opera 10.5 and IE9
        "-webkit-box-shadow": "0px 0px 15px #83A",  // Safari and Chrome
        "-moz-box-shadow": "0px 0px 15px #83A",     // Forefox
        "-khtml-box-shadow": "0px 0px 15px #83A",   // Konqueror
        border: "1px solid #A6D ! important",
        display: "inline-block", position: "absolute"
      },

      ".MathJax_Hover_Arrow": {
        position: "absolute",
        width: "15px", height: "11px",
        cursor: "pointer"
      }
    }
  };

  var Event = ME.Event = {

    LEFTBUTTON: 0,           // the event.button value for left button
    RIGHTBUTTON: 2,          // the event.button value for right button
    MENUKEY: "altKey",       // the event value for alternate context menu

    Mousedown: function (event) { return Event.Handler(event, "Mousedown", this) },
    Mouseup: function (event) { return Event.Handler(event, "Mouseup", this) },
    Mousemove: function (event) { return Event.Handler(event, "Mousemove", this) },
    Mouseover: function (event) { return Event.Handler(event, "Mouseover", this) },
    Mouseout: function (event) { return Event.Handler(event, "Mouseout", this) },
    Click: function (event) { return Event.Handler(event, "Click", this) },
    DblClick: function (event) { return Event.Handler(event, "DblClick", this) },
    Menu: function (event) { return Event.Handler(event, "ContextMenu", this) },
    Handler: function (event, type, math) {
      var jax = OUTPUT[math.jaxID];
      if (!event) { event = window.event }
      event.isContextMenu = (type === "ContextMenu");
      if (jax[type]) { return jax[type](event, math) }
      if (EXTENSION.MathZoom) { return EXTENSION.MathZoom.HandleEvent(event, type, math) }
    },

    False: function (event) {
      if (!event) { event = window.event }
      if (event) {
        if (event.preventDefault) { event.preventDefault() }
        if (event.stopPropagation) { event.stopPropagation() }
        event.cancelBubble = true;
        event.returnValue = false;
      }
      return false;
    },

    ContextMenu: function (event, math, force) { },

    AltContextMenu: function (event, math) { },

    ClearSelection: function () {
      if (ME.safariContextMenuBug) { setTimeout("window.getSelection().empty()", 0) }
      if (document.selection) { setTimeout("document.selection.empty()", 0) }
    },

    getBBox: function (span) {
      span.appendChild(ME.topImg);
      var h = ME.topImg.offsetTop, d = span.offsetHeight - h, w = span.offsetWidth;
      span.removeChild(ME.topImg);
      return { w: w, h: h, d: d };
    }

  };

  var Hover = ME.Hover = {

    Mouseover: function (event, math) {
      if (SETTINGS.discoverable || SETTINGS.zoom === "Hover") {
        var from = event.fromElement || event.relatedTarget,
          to = event.toElement || event.target;
        if (from && to && (from.isMathJax != to.isMathJax ||
          HUB.getJaxFor(from) !== HUB.getJaxFor(to))) {
          var jax = this.getJaxFromMath(math);
          if (jax.hover) { Hover.ReHover(jax) } else { Hover.HoverTimer(jax, math) }
          return Event.False(event);
        }
      }
    },
    Mouseout: function (event, math) {
      if (SETTINGS.discoverable || SETTINGS.zoom === "Hover") {
        var from = event.fromElement || event.relatedTarget,
          to = event.toElement || event.target;
        if (from && to && (from.isMathJax != to.isMathJax ||
          HUB.getJaxFor(from) !== HUB.getJaxFor(to))) {
          var jax = this.getJaxFromMath(math);
          if (jax.hover) { Hover.UnHover(jax) } else { Hover.ClearHoverTimer() }
          return Event.False(event);
        }
      }
    },
    Mousemove: function (event, math) {
      if (SETTINGS.discoverable || SETTINGS.zoom === "Hover") {
        var jax = this.getJaxFromMath(math); if (jax.hover) return;
        if (Hover.lastX == event.clientX && Hover.lastY == event.clientY) return;
        Hover.lastX = event.clientX; Hover.lastY = event.clientY;
        Hover.HoverTimer(jax, math);
        return Event.False(event);
      }
    },

    HoverTimer: function (jax, math) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(CALLBACK(["Hover", this, jax, math]), CONFIG.hover);
    },
    ClearHoverTimer: function () {
      if (this.hoverTimer) { clearTimeout(this.hoverTimer); delete this.hoverTimer }
    },

    Hover: function (jax, math) {
      if (EXTENSION.MathZoom && EXTENSION.MathZoom.Hover({}, math)) return;
      var JAX = OUTPUT[jax.outputJax],
        span = JAX.getHoverSpan(jax, math),
        bbox = JAX.getHoverBBox(jax, span, math),
        show = (JAX.config.showMathMenu != null ? JAX : HUB).config.showMathMenu;
      var dx = CONFIG.frame.x, dy = CONFIG.frame.y, dd = CONFIG.frame.bwidth;  // frame size
      if (ME.msieBorderWidthBug) { dd = 0 }
      jax.hover = { opacity: 0, id: jax.inputID + "-Hover" };
      var frame = HTML.Element("span", {
        id: jax.hover.id, isMathJax: true,
        style: { display: "inline-block", width: 0, height: 0, position: "relative" }
      }, [["span", {
        className: "MathJax_Hover_Frame", isMathJax: true,
        style: {
          display: "inline-block", position: "absolute",
          top: this.Px(-bbox.h - dy - dd - (bbox.y || 0)), left: this.Px(-dx - dd + (bbox.x || 0)),
          width: this.Px(bbox.w + 2 * dx), height: this.Px(bbox.h + bbox.d + 2 * dy),
          opacity: 0, filter: "alpha(opacity=0)"
        }
      }
      ]]
      );
      var button = HTML.Element("span", {
        isMathJax: true, id: jax.hover.id + "Menu",
        style: { display: "inline-block", "z-index": 1, width: 0, height: 0, position: "relative" }
      }, [["img", {
        className: "MathJax_Hover_Arrow", isMathJax: true, math: math,
        src: CONFIG.button.src, onclick: this.HoverMenu, jax: JAX.id,
        style: {
          left: this.Px(bbox.w + dx + dd + (bbox.x || 0) + CONFIG.button.x),
          top: this.Px(-bbox.h - dy - dd - (bbox.y || 0) - CONFIG.button.y),
          opacity: 0, filter: "alpha(opacity=0)"
        }
      }]]
      );
      if (bbox.width) {
        frame.style.width = button.style.width = bbox.width;
        frame.style.marginRight = button.style.marginRight = "-" + bbox.width;
        frame.firstChild.style.width = bbox.width;
        button.firstChild.style.left = "";
        button.firstChild.style.right = this.Px(CONFIG.button.wx);
      }
      span.parentNode.insertBefore(frame, span);
      if (show) { span.parentNode.insertBefore(button, span) }
      if (span.style) { span.style.position = "relative" } // so math is on top of hover frame
      this.ReHover(jax);
    },
    ReHover: function (jax) {
      if (jax.hover.remove) { clearTimeout(jax.hover.remove) }
      jax.hover.remove = setTimeout(CALLBACK(["UnHover", this, jax]), CONFIG.fadeoutDelay);
      this.HoverFadeTimer(jax, CONFIG.fadeinInc);
    },
    UnHover: function (jax) {
      if (!jax.hover.nofade) { this.HoverFadeTimer(jax, -CONFIG.fadeoutInc, CONFIG.fadeoutStart) }
    },
    HoverFade: function (jax) {
      delete jax.hover.timer;
      jax.hover.opacity = Math.max(0, Math.min(1, jax.hover.opacity + jax.hover.inc));
      jax.hover.opacity = Math.floor(1000 * jax.hover.opacity) / 1000;
      var frame = document.getElementById(jax.hover.id),
        button = document.getElementById(jax.hover.id + "Menu");
      frame.firstChild.style.opacity = jax.hover.opacity;
      frame.firstChild.style.filter = "alpha(opacity=" + Math.floor(100 * jax.hover.opacity) + ")";
      if (button) {
        button.firstChild.style.opacity = jax.hover.opacity;
        button.firstChild.style.filter = frame.style.filter;
      }
      if (jax.hover.opacity === 1) { return }
      if (jax.hover.opacity > 0) { this.HoverFadeTimer(jax, jax.hover.inc); return }
      frame.parentNode.removeChild(frame);
      if (button) { button.parentNode.removeChild(button) }
      if (jax.hover.remove) { clearTimeout(jax.hover.remove) }
      delete jax.hover;
    },
    HoverFadeTimer: function (jax, inc, delay) {
      jax.hover.inc = inc;
      if (!jax.hover.timer) {
        jax.hover.timer = setTimeout(CALLBACK(["HoverFade", this, jax]), (delay || CONFIG.fadeDelay));
      }
    },
    HoverMenu: function (event) {
      if (!event) { event = window.event }
      return OUTPUT[this.jax].ContextMenu(event, this.math, true);
    },
    ClearHover: function (jax) {
      if (jax.hover.remove) { clearTimeout(jax.hover.remove) }
      if (jax.hover.timer) { clearTimeout(jax.hover.timer) }
      Hover.ClearHoverTimer();
      delete jax.hover;
    },
    Px: function (m) {
      if (Math.abs(m) < .006) { return "0px" }
      return m.toFixed(2).replace(/\.?0+$/, "") + "px";
    },
    getImages: function () { }

  };

  var TOUCH = ME.Touch = {

    last: 0,          // time of last tap event
    delay: 500,       // delay time for double-click

    start: function (event) {
      var now = new Date().getTime();
      var dblTap = (now - TOUCH.last < TOUCH.delay);
      TOUCH.last = now;
      if (dblTap) {
        TOUCH.timeout = setTimeout(TOUCH.menu, TOUCH.delay, event, this);
        event.preventDefault();
      }
    },

    end: function (event) {
      if (TOUCH.timeout) {
        clearTimeout(TOUCH.timeout);
        delete TOUCH.timeout; TOUCH.last = 0;
        event.preventDefault();
        return Event.Handler((event.touches[0] || event.touch), "DblClick", this);
      }
    },

    menu: function (event, math) {
      delete TOUCH.timeout; TOUCH.last = 0;
      return Event.Handler((event.touches[0] || event.touch), "ContextMenu", math);
    }

  };

  if (HUB.Browser.isMobile) {
    var arrow = CONFIG.styles[".MathJax_Hover_Arrow"];
    arrow.width = "25px"; arrow.height = "18px";
    CONFIG.button.x = -6;
  }
  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode = (document.documentMode || 0);
      var isIE8 = browser.versionAtLeast("8.0");
      ME.msieBorderWidthBug = (document.compatMode === "BackCompat");  // borders are inside offsetWidth/Height
      ME.msieEventBug = browser.isIE9;           // must get event from window even though event is passed
      ME.msieAlignBug = (!isIE8 || mode < 8);    // inline-block spans don't rest on baseline
      if (mode < 9) { Event.LEFTBUTTON = 1 }       // IE < 9 has wrong event.button values
    },
    Safari: function (browser) {
      ME.safariContextMenuBug = true;  // selection can be started by contextmenu event
    },
    Opera: function (browser) {
      ME.operaPositionBug = true;      // position is wrong unless border is used
    },
    Konqueror: function (browser) {
      ME.noContextMenuBug = true;      // doesn't produce contextmenu event
    }
  });

  ME.topImg = (ME.msieAlignBug ?
    HTML.Element("img", { style: { width: 0, height: 0, position: "relative" }, src: "about:blank" }) :
    HTML.Element("span", { style: { width: 0, height: 0, display: "inline-block" } })
  );
  if (ME.operaPositionBug) { ME.topImg.style.border = "1px solid" }

  ME.config = CONFIG = HUB.CombineConfig("MathEvents", CONFIG);
  var SETFRAME = function () {
    var haze = CONFIG.styles[".MathJax_Hover_Frame"];
    haze.border = CONFIG.frame.bwidth + "px solid " + CONFIG.frame.bcolor + " ! important";
    haze["box-shadow"] = haze["-webkit-box-shadow"] =
      haze["-moz-box-shadow"] = haze["-khtml-box-shadow"] =
      "0px 0px " + CONFIG.frame.hwidth + " " + CONFIG.frame.hcolor;
  };
  CALLBACK.Queue(
    HUB.Register.StartupHook("End Config", {}), // wait until config is complete
    [SETFRAME],
    ["getImages", Hover],
    ["Styles", AJAX, CONFIG.styles],
    ["Post", HUB.Startup.signal, "MathEvents Ready"],
    ["loadComplete", AJAX, "[MathJax]/extensions/MathEvents.js"]
  );

})(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.Callback, MathJax.OutputJax, MathJax.InputJax);
