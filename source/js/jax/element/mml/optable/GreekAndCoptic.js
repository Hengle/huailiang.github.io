
(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;

  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u03F6': MO.REL       // greek reversed lunate epsilon symbol
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir + "/GreekAndCoptic.js");

})(MathJax.ElementJax.mml);
