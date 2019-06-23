
MathJax.Extension['TeX/verb'] = { version: '2.7.5' };
MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
  var a = MathJax.ElementJax.mml;
  var c = MathJax.InputJax.TeX;
  var b = c.Definitions;
  b.Add({ macros: { verb: 'Verb' } }, null, true);
  c.Parse.Augment({
    Verb: function(d) {
      var g = this.GetNext();
      var f = ++this.i;
      if (g == '') {
        c.Error(['MissingArgFor', 'Missing argument for %1', d]);
      }
      while (this.i < this.string.length && this.string.charAt(this.i) != g) {
        this.i++;
      }
      if (this.i == this.string.length) {
        c.Error(['NoClosingDelim', "Can't find closing delimiter for %1", d]);
      }
      var e = this.string.slice(f, this.i).replace(/ /g, '\u00A0');
      this.i++;
      this.Push(a.mtext(e).With({ mathvariant: a.VARIANT.MONOSPACE }));
    }
  });
  MathJax.Hub.Startup.signal.Post('TeX verb Ready');
});
MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/verb.js');
