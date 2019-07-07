
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur-bold'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x2018: [708,-411,254,53,187],     // LEFT SINGLE QUOTATION MARK
    0x2019: [692,-394,254,58,193]      // RIGHT SINGLE QUOTATION MARK
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Fraktur/Bold/Other.js");
