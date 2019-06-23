
(function(c, g) {
  var f = '2.7.0';
  var a = MathJax.Hub.CombineConfig('MMLorHTML', {
    prefer: {
      MSIE: 'MML',
      Firefox: 'HTML',
      Opera: 'HTML',
      Chrome: 'HTML',
      Safari: 'HTML',
      other: 'HTML'
    }
  });
  var e = {
    Firefox: 3,
    Opera: 9.52,
    MSIE: 6,
    Chrome: 0.3,
    Safari: 2,
    Konqueror: 4
  };
  var b = g.version === '0.0' || g.versionAtLeast(e[g] || 0);
  var d =
    (g.isFirefox && g.versionAtLeast('1.5')) ||
    (g.isMSIE && g.hasMathPlayer) ||
    (g.isSafari && g.versionAtLeast('5.0')) ||
    (g.isOpera && g.versionAtLeast('9.52'));
  c.Register.StartupHook('End Config', function() {
    var h =
      a.prefer && typeof a.prefer === 'object'
        ? a.prefer[MathJax.Hub.Browser] || a.prefer.other || 'HTML'
        : a.prefer;
    if (b || d) {
      if (d && (h === 'MML' || !b)) {
        if (MathJax.OutputJax.NativeMML) {
          MathJax.OutputJax.NativeMML.Register('jax/mml');
        } else {
          c.config.jax.unshift('output/NativeMML');
        }
        c.Startup.signal.Post('NativeMML output selected');
      } else {
        if (MathJax.OutputJax['HTML-CSS']) {
          MathJax.OutputJax['HTML-CSS'].Register('jax/mml');
        } else {
          c.config.jax.unshift('output/HTML-CSS');
        }
        c.Startup.signal.Post('HTML-CSS output selected');
      }
    } else {
      c.PreProcess.disabled = true;
      c.prepareScripts.disabled = true;
      MathJax.Message.Set(
        ['MathJaxNotSupported', 'Your browser does not support MathJax'],
        null,
        4000
      );
      c.Startup.signal.Post('MathJax not supported');
    }
  });
})(MathJax.Hub, MathJax.Hub.Browser);
MathJax.Ajax.loadComplete('[MathJax]/config/MMLorHTML.js');
