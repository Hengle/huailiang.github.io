
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold'],
  {
    0x20A3: [676,0,611,11,583],        // FRENCH FRANC SIGN
    0x20A4: [684,16,500,21,477],       // LIRA SIGN
    0x20A7: [676,14,1369,16,1341],     // PESETA SIGN
    0x20AC: [672,12,500,29,478]        // EURO SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/CurrencySymbols.js");
