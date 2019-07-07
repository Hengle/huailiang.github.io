
(function (HUB, HTML, AJAX, CALLBACK, OUTPUT) {
  var VERSION = "2.0";

  var SIGNAL = MathJax.Callback.Signal("menu")  // signal for menu events

  MathJax.Extension.MathMenu = {
    version: VERSION,
    signal: SIGNAL
  };

  var isPC = HUB.Browser.isPC, isMSIE = HUB.Browser.isMSIE, isIE9 = ((document.documentMode || 0) > 8);
  var ROUND = (isPC ? null : "5px");

  var CONFIG = HUB.CombineConfig("MathMenu", {
    delay: 150,                                    // the delay for submenus
    helpURL: "http://www.mathjax.org/help-v2/user/",  // the URL for the "MathJax Help" menu
    closeImg: AJAX.fileURL(OUTPUT.imageDir + "/CloseX-31.png"), // image for close "X" for mobiles

    showRenderer: false,                            //  show the "Math Renderer" menu?
    showMathPlayer: false,                          //  show the "MathPlayer" menu?
    showFontMenu: false,                           //  show the "Font Preference" menu?
    showContext: false,                           //  show the "Context Menu" menu?
    showDiscoverable: false,                       //  show the "Discoverable" menu?

    windowSettings: {                              // for source window
      status: "no", toolbar: "no", locationbar: "no", menubar: "no",
      directories: "no", personalbar: "no", resizable: "yes", scrollbars: "yes",
      width: 100, height: 50
    },

    styles: {
      "#MathJax_About": {
        position: "fixed", left: "50%", width: "auto", "text-align": "center",
        border: "3px outset", padding: "1em 2em", "background-color": "#DDDDDD", color: "black",
        cursor: "default", "font-family": "message-box", "font-size": "120%",
        "font-style": "normal", "text-indent": 0, "text-transform": "none",
        "line-height": "normal", "letter-spacing": "normal", "word-spacing": "normal",
        "word-wrap": "normal", "white-space": "nowrap", "float": "none", "z-index": 201,

        "border-radius": "15px",                     // Opera 10.5 and IE9
        "-webkit-border-radius": "15px",             // Safari and Chrome
        "-moz-border-radius": "15px",                // Firefox
        "-khtml-border-radius": "15px",              // Konqueror

        "box-shadow": "0px 10px 20px #808080",         // Opera 10.5 and IE9
        "-webkit-box-shadow": "0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow": "0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow": "0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },

      ".MathJax_Menu": {
        position: "absolute", "background-color": "white", color: "black",
        width: "auto", padding: (isPC ? "2px" : "5px 0px"),
        border: "1px solid #CCCCCC", margin: 0, cursor: "default",
        font: "menu", "text-align": "left", "text-indent": 0, "text-transform": "none",
        "line-height": "normal", "letter-spacing": "normal", "word-spacing": "normal",
        "word-wrap": "normal", "white-space": "nowrap", "float": "none", "z-index": 201,

        "border-radius": ROUND,                     // Opera 10.5 and IE9
        "-webkit-border-radius": ROUND,             // Safari and Chrome
        "-moz-border-radius": ROUND,                // Firefox
        "-khtml-border-radius": ROUND,              // Konqueror

        "box-shadow": "0px 10px 20px #808080",         // Opera 10.5 and IE9
        "-webkit-box-shadow": "0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow": "0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow": "0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },

      ".MathJax_MenuItem": {
        padding: (isPC ? "2px 2em" : "1px 2em"),
        background: "transparent"
      },

      ".MathJax_MenuTitle": {
        "background-color": "#CCCCCC",
        margin: (isPC ? "-1px -1px 1px -1px" : "-5px 0 0 0"),
        "text-align": "center", "font-style": "italic", "font-size": "80%", color: "#444444",
        padding: "2px 0", overflow: "hidden"
      },

      ".MathJax_MenuArrow": {
        position: "absolute", right: ".5em", color: "#666666",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },
      ".MathJax_MenuActive .MathJax_MenuArrow": { color: "white" },

      ".MathJax_MenuCheck": {
        position: "absolute", left: ".7em",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },

      ".MathJax_MenuRadioCheck": {
        position: "absolute", left: (isPC ? "1em" : ".7em")
      },

      ".MathJax_MenuLabel": {
        padding: (isPC ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em"),
        "font-style": "italic"
      },

      ".MathJax_MenuRule": {
        "border-top": (isPC ? "1px solid #CCCCCC" : "1px solid #DDDDDD"),
        margin: (isPC ? "4px 1px 0px" : "4px 3px")
      },

      ".MathJax_MenuDisabled": {
        color: "GrayText"
      },

      ".MathJax_MenuActive": {
        "background-color": (isPC ? "Highlight" : "#606872"),
        color: (isPC ? "HighlightText" : "white")
      },

      ".MathJax_Menu_Close": {
        position: "absolute",
        width: "31px", height: "31px",
        top: "-15px", left: "-15px"
      }
    }
  });

  var FALSE, HOVER;
  HUB.Register.StartupHook("MathEvents Ready", function () {
    FALSE = MathJax.Extension.MathEvents.Event.False;
    HOVER = MathJax.Extension.MathEvents.Hover;
  });

  /*************************************************************/
  /*
   *  The main menu class
   */
  var MENU = MathJax.Menu = MathJax.Object.Subclass({
    version: VERSION,
    items: [],
    posted: false,
    title: null,
    margin: 5,

    Init: function (def) { this.items = [].slice.call(arguments, 0) },
    With: function (def) { if (def) { HUB.Insert(this, def) }; return this },

    /*
     *  Display the menu
     */
    Post: function (event, parent) {
      if (!event) { event = window.event };
      return FALSE(event);
    },

    /*
     *  Remove the menu from the screen
     */
    Remove: function (event, menu) {
      SIGNAL.Post(["unpost", MENU.jax]);
      var div = document.getElementById("MathJax_MenuFrame");
      if (div) {
        div.parentNode.removeChild(div);
        if (this.msieFixedPositionBug) { detachEvent("onresize", MENU.Resize) }
      }
      if (MENU.jax.hover) {
        delete MENU.jax.hover.nofade;
        HOVER.UnHover(MENU.jax);
      }
      return FALSE(event);
    },

    /*
     *  Find a named item in a menu (or submenu).
     *  A list of names means descend into submenus.
     */
    Find: function (name) {
      var names = [].slice.call(arguments, 1);
      for (var i = 0, m = this.items.length; i < m; i++) {
        if (this.items[i].name === name) {
          if (names.length) {
            if (!this.items[i].menu) { return null }
            return this.items[i].menu.Find.apply(this.items[i].menu, names);
          }
          return this.items[i];
        }
      }
      return null;
    },

    /*
     *  Find the index of a menu item (so we can insert before or after it)
     */
    IndexOf: function (name) {
      for (var i = 0, m = this.items.length; i < m; i++) { if (this.items[i].name === name) { return i } }
      return null;
    }

  }, {

      config: CONFIG,

      div: null,     // the DOM elements for the menu and submenus

      Close: function (event) { return MENU.Event(event, this.menu || this.parentNode, (this.menu ? "Touchend" : "Remove")) },
      Remove: function (event) { return MENU.Event(event, this, "Remove") },
      Mouseover: function (event) { return MENU.Event(event, this, "Mouseover") },
      Mouseout: function (event) { return MENU.Event(event, this, "Mouseout") },
      Mousedown: function (event) { return MENU.Event(event, this, "Mousedown") },
      Mouseup: function (event) { return MENU.Event(event, this, "Mouseup") },
      Touchstart: function (event) { return MENU.Event(event, this, "Touchstart") },
      Touchend: function (event) { return MENU.Event(event, this, "Touchend") },
      Event: function (event, menu, type, force) { return null; },

      /*
       *  Style for the background DIV
       */
      BGSTYLE: {
        position: "absolute", left: 0, top: 0, "z-index": 200,
        width: "100%", height: "100%", border: 0, padding: 0, margin: 0
      },

      Background: function (menu) {
        var div = HTML.addElement(document.body, "div", { style: this.BGSTYLE, id: "MathJax_MenuFrame" },
          [["div", { style: this.BGSTYLE, menuItem: menu, onmousedown: this.Remove }]]);
        return div;
      },
      Resize: function () { setTimeout(MENU.SetWH, 0) },
      SetWH: function () { },

      saveCookie: function () { HTML.Cookie.Set("menu", this.cookie) },
      getCookie: function () { this.cookie = HTML.Cookie.Get("menu") },

      //
      //  Preload images so they show up with the menu
      //
      getImages: function () { }

    });

  /*************************************************************/
  /*
   *  The menu item root subclass
   */
  var ITEM = MENU.ITEM = MathJax.Object.Subclass({
    name: "", // the menu item's label

    Create: function (menu) {
      if (!this.hidden) {
        var def = {
          onmouseover: MENU.Mouseover, onmouseout: MENU.Mouseout,
          onmouseup: MENU.Mouseup, onmousedown: MENU.Mousedown,
          ondragstart: FALSE, onselectstart: FALSE, onselectend: FALSE,
          ontouchstart: MENU.Touchstart, ontouchend: MENU.Touchend,
          className: "MathJax_MenuItem", menuItem: this
        };
        if (this.disabled) { def.className += " MathJax_MenuDisabled" }
        HTML.addElement(menu, "div", def, this.Label(def, menu));
      }
    },

    Mouseover: function (event, menu) {
    },
    Mouseout: function (event, menu) {
      if (!this.menu || !this.menu.posted) { this.Deactivate(menu) }
      if (this.timer) { clearTimeout(this.timer); delete this.timer }
    },
    Mouseup: function (event, menu) { return this.Remove(event, menu) },

    Touchstart: function (event, menu) { return this.TouchEvent(event, menu, "Mousedown") },
    Touchend: function (event, menu) { return this.TouchEvent(event, menu, "Mouseup") },
    TouchEvent: function (event, menu, type) {
      if (this !== ITEM.lastItem) {
        if (ITEM.lastMenu) { MENU.Event(event, ITEM.lastMenu, "Mouseout") }
        MENU.Event(event, menu, "Mouseover", true);
        ITEM.lastItem = this; ITEM.lastMenu = menu;
      }
      if (this.nativeTouch) { return null }
      MENU.Event(event, menu, type);
      return false;
    },

    Remove: function (event, menu) {
      menu = menu.parentNode.menuItem;
      return menu.Remove(event, menu);
    },

    Activate: function (menu) { this.Deactivate(menu); menu.className += " MathJax_MenuActive" },
    Deactivate: function (menu) { menu.className = menu.className.replace(/ MathJax_MenuActive/, "") },

    With: function (def) { if (def) { HUB.Insert(this, def) }; return this }
  });

  /*************************************************************/
  /*
   *  A menu item that performs a command when selected
   */
  MENU.ITEM.COMMAND = MENU.ITEM.Subclass({
    action: function () { },

    Init: function (name, action, def) {
      this.name = name; this.action = action;
      this.With(def);
    },

    Label: function (def, menu) { return [this.name] },
    Mouseup: function (event, menu) {
      if (!this.disabled) {
        this.Remove(event, menu);
        SIGNAL.Post(["command", this]);
        this.action.call(this, event);
      }
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that posts a submenu
   */
  MENU.ITEM.SUBMENU = MENU.ITEM.Subclass({
    menu: null,        // the submenu
    marker: (isPC && !HUB.Browser.isSafari ? "\u25B6" : "\u25B8"),  // the menu arrow

    Init: function (name, def) {
      this.name = name; var i = 1;
      if (!(def instanceof MENU.ITEM)) { this.With(def), i++ }
      this.menu = MENU.apply(MENU, [].slice.call(arguments, i));
    },
    Label: function (def, menu) {
      this.menu.posted = false;
      return [this.name + " ", ["span", { className: "MathJax_MenuArrow" }, [this.marker]]];
    },
    Timer: function (event, menu) {
      if (this.timer) { clearTimeout(this.timer) }
      event = { clientX: event.clientX, clientY: event.clientY }; // MSIE can't pass the event below
      this.timer = setTimeout(CALLBACK(["Mouseup", this, event, menu]), CONFIG.delay);
    },
    Touchend: function (event, menu) {
      var forceout = this.menu.posted;
      var result = this.SUPER(arguments).Touchend.apply(this, arguments);
      if (forceout) { this.Deactivate(menu); delete ITEM.lastItem; delete ITEM.lastMenu }
      return result;
    },
    Mouseup: function (event, menu) {
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is one of several radio buttons
   */
  MENU.ITEM.RADIO = MENU.ITEM.Subclass({
    variable: null,     // the variable name
    marker: (isPC ? "\u25CF" : "\u2713"),   // the checkmark

    Init: function (name, variable, def) {
      this.name = name; this.variable = variable; this.With(def);
      if (this.value == null) { this.value = this.name }
    },
    Label: function (def, menu) {
      var span = { className: "MathJax_MenuRadioCheck" };
      if (CONFIG.settings[this.variable] !== this.value) { span = { style: { display: "none" } } }
      return [["span", span, [this.marker]], " " + this.name];
    },
    Mouseup: function (event, menu) {
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is checkable
   */
  MENU.ITEM.CHECKBOX = MENU.ITEM.Subclass({
    variable: null,     // the variable name
    marker: "\u2713",   // the checkmark

    Init: function (name, variable, def) {
      this.name = name; this.variable = variable; this.With(def);
    },
    Label: function (def, menu) {
      var span = { className: "MathJax_MenuCheck" };
      if (!CONFIG.settings[this.variable]) { span = { style: { display: "none" } } }
      return [["span", span, [this.marker]], " " + this.name];
    },
    Mouseup: function (event, menu) {
      if (!this.disabled) {
        menu.firstChild.display = (CONFIG.settings[this.variable] ? "none" : "");
        CONFIG.settings[this.variable] = !CONFIG.settings[this.variable];
        MENU.cookie[this.variable] = CONFIG.settings[this.variable]; MENU.saveCookie();
        SIGNAL.Post(["checkbox", this]);
      }
      this.Remove(event, menu);
      if (this.action && !this.disabled) { this.action.call(MENU, this) }
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is a label
   */
  MENU.ITEM.LABEL = MENU.ITEM.Subclass({
    Init: function (name, def) { this.name = name; this.With(def) },
    Label: function (def, menu) {
      delete def.onmouseover, delete def.onmouseout; delete def.onmousedown;
      def.className += " MathJax_MenuLabel";
      return [this.name];
    }
  });

  /*************************************************************/
  /*
   *  A rule in a menu
   */
  MENU.ITEM.RULE = MENU.ITEM.Subclass({
    Label: function (def, menu) {
      delete def.onmouseover, delete def.onmouseout; delete def.onmousedown;
      def.className += " MathJax_MenuRule";
      return null;
    }
  });

  /*************************************************************/
  /*************************************************************/

  /*
   *  Handle the ABOUT box
   */
  MENU.About = function () { };
  MENU.About.Remove = function (event) {
    if (MENU.About.div) { document.body.removeChild(MENU.About.div); delete MENU.About.div }
  };
  MENU.About.GetJax = function (jax, JAX, type, noTypeCheck) {
    var info = [];
    for (var id in JAX) {
      if (JAX.hasOwnProperty(id) && JAX[id]) {
        if ((noTypeCheck && JAX[id].version) || (JAX[id].isa && JAX[id].isa(JAX))) { info.push((JAX[id].id || id) + " " + type + " v" + JAX[id].version) }
      }
    }
    info.sort();
    for (var i = 0, m = info.length; i < m; i++) { jax.push(info[i], ["br"]) }
    return jax;
  };


  /*
   *  Handle the MathJax HELP menu
   */
  MENU.Help = function () { };

  /*
   *  Handle showing of element's source
   */
  MENU.ShowSource = function (event) { };
  MENU.ShowSource.Window = function (event) { return MENU.ShowSource.w; };
  MENU.ShowSource.Text = function (text, event) { };

  /*
   *  Handle rescaling all the math
   */
  MENU.Scale = function () { };

  /*
   *  Handle loading the zoom code
   */
  MENU.Zoom = function () { };

  /*
   *  Handle changing the renderer
   */
  MENU.Renderer = function () { };
  MENU.Renderer.Messages = {};

  /*
   *  Handle setting the HTMLCSS fonts
   */
  MENU.Font = function () { };

  /*
   *  Handle setting MathPlayer events
   */
  MENU.MPEvents = function (item) { };
  MENU.MPEvents.Messages = {};

  /*************************************************************/
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      MENU.Augment({
        margin: 20,
        msieBackgroundBug: true,
        msieFixedPositionBug: (quirks || !isIE8),
        msieAboutBug: quirks
      });
      if (isIE9) {
        delete CONFIG.styles["#MathJax_About"].filter;
        delete CONFIG.styles[".MathJax_Menu"].filter;
      }
    },
    Firefox: function (browser) {
      MENU.skipMouseover = browser.isMobile && browser.versionAtLeast("6.0");
      MENU.skipMousedown = browser.isMobile;
    }
  });
  MENU.isMobile = HUB.Browser.isMobile;
  MENU.noContextMenu = HUB.Browser.noContextMenu;

  /*************************************************************/

  HUB.Register.StartupHook("End Config", function () { });

  MENU.showRenderer = function (show) { };
  MENU.showMathPlayer = function (show) { };
  MENU.showFontMenu = function (show) { };
  MENU.showContext = function (show) { };
  MENU.showDiscoverable = function (show) { };

  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
    if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) { MENU.menu.Find("Math Settings", "Font Preference", "TeX (image)").disabled = true }
  });

  /*************************************************************/

  CALLBACK.Queue(
    HUB.Register.StartupHook("End Config", {}), // wait until config is complete
    ["getImages", MENU],
    ["Styles", AJAX, CONFIG.styles],
    ["Post", HUB.Startup.signal, "MathMenu Ready"]
  );

})(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.CallBack, MathJax.OutputJax);
