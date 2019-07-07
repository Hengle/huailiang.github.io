
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-bold'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0xA8: [695,-535,575,96,478],       // DIAERESIS
    0xAC: [371,-61,767,64,702],        // NOT SIGN
    0xAF: [607,-540,575,80,494],       // MACRON
    0xB0: [702,-536,575,160,414],      // DEGREE SIGN
    0xB1: [728,35,894,64,829],         // PLUS-MINUS SIGN
    0xB4: [706,-503,575,236,460],      // ACUTE ACCENT
    0xD7: [530,28,894,168,726],        // MULTIPLICATION SIGN
    0xF7: [597,96,894,64,828]          // DIVISION SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/Latin1Supplement.js");
