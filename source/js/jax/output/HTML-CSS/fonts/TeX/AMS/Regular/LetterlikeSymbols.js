
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_AMS'],
  {
    0x210F: [695,13,540,42,562],       // stix-/hbar - Planck's over 2pi
    0x2127: [684,22,722,44,675],       // INVERTED OHM SIGN
    0x2132: [695,1,556,55,497],        // TURNED CAPITAL F
    0x2136: [763,21,667,-22,687],      // BET SYMBOL
    0x2137: [764,43,444,-22,421],      // GIMEL SYMBOL
    0x2138: [764,43,667,54,640],       // DALET SYMBOL
    0x2141: [705,23,639,37,577]        // TURNED SANS-SERIF CAPITAL G
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/AMS/Regular/LetterlikeSymbols.js");
