
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x2018: [708,-410,215,45,158],     // LEFT SINGLE QUOTATION MARK
    0x2019: [692,-395,215,49,163]      // RIGHT SINGLE QUOTATION MARK
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Fraktur/Regular/Other.js");
