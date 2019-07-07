
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur'],
  {
    0xE300: [683,32,497,75,430],       // stix-capital Gamma, Greek slashed
    0xE301: [616,30,498,35,432],       // stix-MATHEMATICAL BOLD CAPITAL GAMMA SLASHED
    0xE302: [680,215,333,29,339],      // stix-capital Delta, Greek slashed
    0xE303: [679,224,329,28,318],      // stix-MATHEMATICAL BOLD CAPITAL DELTA SLASHED
    0xE304: [471,214,503,52,449],      // stix-capital Epsilon, Greek slashed
    0xE305: [686,20,333,26,315],       // stix-MATHEMATICAL BOLD CAPITAL EPSILON SLASHED
    0xE306: [577,21,334,29,347],       // stix-capital Zeta, Greek slashed
    0xE307: [475,22,501,10,514]        // stix-MATHEMATICAL BOLD CAPITAL ZETA SLASHED
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Fraktur/Regular/PUA.js");
