
MathJAx.Extension["HTML-CSS/handle-floats"] = {
  version: "2.0"
};

//
//  Make the display DIV be a table-cell
//  Use padding to get the separation, since table cells don't do margin
//  Make the width large (it will shrink to fit the remaining room)
//
MathJax.Hub.Config({
  "HTML-CSS": {
    styles: {
      ".MathJax_Display": {
        display: "table-cell",
        padding: "1em 0 ! important",
        width: (MathJax.Hub.Browser.isMSIE && (document.documentMode || 0) < 8 ? "100%" : "1000em")
      }
    }
  }
});

//
//  Two consecutive equations would end up side-by-side, so force a separator
//  (Needed by IE8, IE9, and Firefox, at least).
//  
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
  var HTMLCSS = MathJax.OutputJax["HTML-CSS"],
    TRANSLATE = HTMLCSS.Translate;
  HTMLCSS.Augment({
    Translate: function (script, state) {
      TRANSLATE.call(this, script, state);
      if (script.MathJax.elementJax.HTMLCSS.display) {
        var next = script.nextSibling;
        if (!next || next.className !== "MathJax_MSIE_Separator") {
          var span = HTMLCSS.Element("span", { className: "MathJax_MSIE_Separator" });
          script.parentNode.insertBefore(span, next);
        }
      }
    }
  });
  MathJax.Hub.Startup.signal.Post("HTML-CSS handle-floats Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/HTML-CSS/handle-floats.js");
