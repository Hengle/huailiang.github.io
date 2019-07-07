
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold-italic'],
  {
    0x20A3: [669,0,668,-13,661],       // FRENCH FRANC SIGN
    0x20A4: [683,12,500,-32,510],      // LIRA SIGN
    0x20A7: [669,13,1229,-28,1173],    // PESETA SIGN
    0x20AC: [681,17,562,34,546]        // EURO SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/BoldItalic/CurrencySymbols.js");
