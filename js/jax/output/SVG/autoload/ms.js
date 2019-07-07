
MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  var VERSION = "2.0";
  var MML = MathJax.ElementJax.mml,
      SVG = MathJax.OutputJax.SVG;
  
  MML.ms.Augment({
    toSVG: function () {
      var svg = this.SVG(); this.SVGhandleSpace(svg);
      var values = this.getValues("lquote","rquote");
      var variant = this.SVGgetVariant(), scale = this.SVGgetScale();
      var text = this.data.join("");  // FIXME:  handle mglyph?
      var pattern = [];
      if (values.lquote.length === 1) {pattern.push(this.SVGquoteRegExp(values.lquote))}
      if (values.rquote.length === 1) {pattern.push(this.SVGquoteRegExp(values.rquote))}
      if (pattern.length) {text = text.replace(RegExp("("+pattern.join("|")+")","g"),"\\$1")}
      svg.Add(this.SVGhandleVariant(variant,scale,values.lquote+text+values.rquote));
      svg.Clean();
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    SVGquoteRegExp: function (string) {
      return string.replace(/([.*+?|{}()\[\]\\])/g,"\\$1");
    }
  });
  MML.ms.prototype.defaults.mathvariant = 'monospace';
  
  MathJax.Hub.Startup.signal.Post("SVG ms Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/ms.js");

});

