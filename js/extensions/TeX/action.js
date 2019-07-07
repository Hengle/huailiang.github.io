
MathJax.Extension["TeX/action"] = {
  version: "2.0"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX,
    MML = MathJax.ElementJax.mml;

  //
  //  Set up control sequenecs
  //
  TEX.Definitions.macros.toggle = 'Toggle';
  TEX.Definitions.macros.mathtip = 'Mathtip';
  TEX.Definitions.macros.texttip = ['Macro', '\\mathtip{#1}{\\text{#2}}', 2];

  TEX.Parse.Augment({

    //
    //  Implement \toggle {math1} {math2} ... \endtoggle
    //    (as an <maction actiontype="toggle">)
    //
    Toggle: function (name) {
      var data = [], arg;
      while ((arg = this.GetArgument(name)) !== "\\endtoggle") { data.push(TEX.Parse(arg, this.stack.env).mml()) }
      this.Push(MML.maction.apply(MML, data).With({ actiontype: MML.ACTIONTYPE.TOGGLE }));
    },

    //
    //  Implement \mathtip{math}{tip}
    //    (an an <maction actiontype="tooltip">)
    //
    Mathtip: function (name) {
      var arg = this.ParseArg(name), tip = this.ParseArg(name);
      this.Push(MML.maction(arg, tip).With({ actiontype: MML.ACTIONTYPE.TOOLTIP }));
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX action Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/action.js");
