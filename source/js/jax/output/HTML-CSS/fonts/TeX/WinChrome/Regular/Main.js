
MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_WinChrome'] = {
  directory: 'WinChrome/Regular',
  family: 'MathJax_WinChrome',
  testString: "> T d \u23A6 \u2A00",
  skew: {
    0x54: 0.0278,
    0xE2F0: 0.0319
  },
  0x20: [0,0,250,0,0],               // SPACE
  0x3E: [540,40,778,83,694],         // GREATER-THAN SIGN
  0x54: [717,68,545,34,833],         // LATIN CAPITAL LETTER T
  0x64: [694,11,511,101,567],        // LATIN SMALL LETTER D
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x22C3: [750,249,833,55,777],      // N-ARY UNION
  0x23A6: [1155,644,667,0,347],      // RIGHT SQUARE BRACKET LOWER CORNER
  0x2A00: [949,449,1511,56,1454],    // N-ARY CIRCLED DOT OPERATOR
  0xE2F0: [720,69,644,38,947],       // stix-lowercase u italic slashed
  0xE2F1: [587,85,894,96,797]        // stix-lowercase u bold italic slashed
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_WinChrome"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/WinChrome/Regular/Main.js"]
);
