
MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Greek'] = {
  directory: 'Greek/Regular',
  family: 'MathJax_Greek',
  testString: "\u0393 \u03A5 \u039B",
  0x20: [0,0,250,0,0],               // SPACE
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x393: [680,0,625,25,582],         // GREEK CAPITAL LETTER GAMMA
  0x394: [716,0,833,46,786],         // GREEK CAPITAL LETTER DELTA
  0x398: [705,22,778,56,722],        // GREEK CAPITAL LETTER THETA
  0x39B: [716,0,694,32,661],         // GREEK CAPITAL LETTER LAMDA
  0x39E: [677,0,667,42,624],         // GREEK CAPITAL LETTER XI
  0x3A0: [680,0,750,25,724],         // GREEK CAPITAL LETTER PI
  0x3A3: [683,0,722,55,666],         // GREEK CAPITAL LETTER SIGMA
  0x3A5: [705,0,778,55,722],         // GREEK CAPITAL LETTER UPSILON
  0x3A6: [683,0,722,56,665],         // GREEK CAPITAL LETTER PHI
  0x3A8: [683,0,778,55,722],         // GREEK CAPITAL LETTER PSI
  0x3A9: [704,0,722,44,677]          // GREEK CAPITAL LETTER OMEGA
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Greek"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Greek/Regular/Main.js"]
);
