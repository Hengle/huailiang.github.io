
MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Greek-bold'] = {
  directory: 'Greek/Bold',
  family: 'MathJax_Greek',
  weight: 'bold',
  testString: "\u0393 \u03A5 \u039B",
  0x20: [0,0,250,0,0],               // SPACE
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x393: [680,0,692,39,643],         // GREEK CAPITAL LETTER GAMMA
  0x394: [698,0,958,56,901],         // GREEK CAPITAL LETTER DELTA
  0x398: [696,10,894,64,829],        // GREEK CAPITAL LETTER THETA
  0x39B: [698,0,806,40,765],         // GREEK CAPITAL LETTER LAMDA
  0x39E: [675,0,767,48,718],         // GREEK CAPITAL LETTER XI
  0x3A0: [680,0,900,39,860],         // GREEK CAPITAL LETTER PI
  0x3A3: [686,0,831,64,766],         // GREEK CAPITAL LETTER SIGMA
  0x3A5: [697,0,894,64,829],         // GREEK CAPITAL LETTER UPSILON
  0x3A6: [686,0,831,64,766],         // GREEK CAPITAL LETTER PHI
  0x3A8: [686,0,894,64,829],         // GREEK CAPITAL LETTER PSI
  0x3A9: [696,1,831,51,779]          // GREEK CAPITAL LETTER OMEGA
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Greek-bold"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Greek/Bold/Main.js"]
);
