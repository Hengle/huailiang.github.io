
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-italic'],
  {
    0x2013: [285,-248,511,91,554],     // EN DASH
    0x2014: [285,-248,1022,117,1038],  // EM DASH
    0x2018: [694,-379,307,197,362],    // LEFT SINGLE QUOTATION MARK
    0x2019: [694,-379,307,213,377],    // RIGHT SINGLE QUOTATION MARK
    0x201C: [694,-379,514,243,606],    // LEFT DOUBLE QUOTATION MARK
    0x201D: [694,-379,514,176,538]     // RIGHT DOUBLE QUOTATION MARK
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Italic/GeneralPunctuation.js");
