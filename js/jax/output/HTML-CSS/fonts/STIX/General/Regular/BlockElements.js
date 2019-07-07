
MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral'],
  {
    0x2580: [910,-304,1213,0,1213],    // UPPER HALF BLOCK
    0x2584: [303,303,1213,0,1213],     // LOWER HALF BLOCK
    0x2588: [910,303,1213,0,1213],     // FULL BLOCK
    0x258C: [910,303,1212,0,606],      // LEFT HALF BLOCK
    0x2590: [910,303,1212,606,1212],   // RIGHT HALF BLOCK
    0x2591: [860,258,1200,0,1200],     // LIGHT SHADE
    0x2592: [874,273,1200,0,1200],     // MEDIUM SHADE
    0x2593: [874,273,1200,0,1200]      // DARK SHADE
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Regular/BlockElements.js");
