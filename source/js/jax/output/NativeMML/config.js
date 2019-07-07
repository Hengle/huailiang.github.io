

MathJax.OutputJax.NativeMML = MathJax.OutputJax({
  id: "NativeMML",
  version: "2.0",
  directory: MathJax.OutputJax.directory + "/NativeMML",
  extensionDir: MathJax.OutputJax.extensionDir + "/NativeMML",

  config: {
    scale: 100,              // scaling factor for all math
    minScaleAdjust: 50,      // minimum scaling to adjust to surrounding text
    //  (since the code for that is a bit delicate)
    styles: {
      "DIV.MathJax_MathML": {
        "text-align": "center",
        margin: ".75em 0px"
      }
    }
  }
});

if (!MathJax.Hub.config.delayJaxRegistration)
  MathJax.OutputJax.NativeMML.Register("jax/mml");

MathJax.OutputJax.NativeMML.loadComplete("config.js");
