
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_AMS'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0xA5: [683,0,750,11,738],          // YEN SIGN
    0xAE: [709,175,947,32,915],        // REGISTERED SIGN
    0xF0: [749,21,556,42,509]          // LATIN SMALL LETTER ETH
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/AMS/Regular/Latin1Supplement.js");
