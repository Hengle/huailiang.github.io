
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-bold'],
  {
    0x210F: [694,8,668,45,642],        // stix-/hbar - Planck's over 2pi
    0x2111: [702,8,831,64,798],        // BLACK-LETTER CAPITAL I
    0x2113: [702,19,474,-1,446],       // SCRIPT SMALL L
    0x2118: [461,210,740,72,726],      // SCRIPT CAPITAL P
    0x211C: [711,16,831,42,824],       // BLACK-LETTER CAPITAL R
    0x2135: [694,0,703,64,638]         // ALEF SYMBOL
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/LetterlikeSymbols.js");
