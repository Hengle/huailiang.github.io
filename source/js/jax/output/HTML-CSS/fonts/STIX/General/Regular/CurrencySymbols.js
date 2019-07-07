
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral'],
  {
    0x20A3: [662,0,556,11,546],        // FRENCH FRANC SIGN
    0x20A4: [676,8,500,12,490],        // LIRA SIGN
    0x20A7: [662,10,1182,16,1141],     // PESETA SIGN
    0x20AC: [664,12,500,38,462]        // EURO SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Regular/CurrencySymbols.js");
