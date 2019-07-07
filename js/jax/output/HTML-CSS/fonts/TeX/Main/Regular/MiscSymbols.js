
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main'],
  {
    0x2660: [727,130,778,55,723],      // BLACK SPADE SUIT
    0x2661: [716,33,778,55,723],       // WHITE HEART SUIT
    0x2662: [727,162,778,55,723],      // WHITE DIAMOND SUIT
    0x2663: [726,130,778,28,750],      // BLACK CLUB SUIT
    0x266D: [750,22,389,55,332],       // MUSIC FLAT SIGN
    0x266E: [734,223,389,65,324],      // MUSIC NATURAL SIGN
    0x266F: [723,223,389,55,333]       // MUSIC SHARP SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Regular/MiscSymbols.js");
