
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-italic'],
  {
    0x20A3: [653,0,611,8,645],         // FRENCH FRANC SIGN
    0x20A4: [670,8,500,10,517],        // LIRA SIGN
    0x20A7: [653,13,1149,0,1126],      // PESETA SIGN
    0x20AC: [664,12,500,16,538]        // EURO SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Italic/CurrencySymbols.js");
