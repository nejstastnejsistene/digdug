var ctx = new webkitAudioContext();
var lo, hi;

var getFreq = function (note) {
  var i = 0;
  var offset = {A:0,B:2,C:3,D:5,E:7,F:8,G:10}[note[i++]];
  if (note[i] == '#') { offset++; i++; }
  else if (note[i] == 'b') { offset--; i++; }
  return 440 * Math.pow(2, (12 * note[i] + offset - 48) / 12);
}

var startNote = function (which, note) {
  osc = ctx.createOscillator();
  if (which == 'hi') {
    if (hi) { hi.stop(0); hi.disconnect(); }
    hi = osc;
  } else {
    if (lo) { lo.stop(0); lo.disconnect(); }
    lo = osc;
  }
  if (note) {
    osc.connect(ctx.destination);
    osc.type = lo.SQUARE;
    osc.frequency.value = getFreq(note);
    osc.start(0);
  }
}

var mainTheme = {
  bpm: 120,

  lo: [
    ['C2', 1/4], ['G2', 1/4],
    ['C2', 1/4], ['G2', 1/4],
    ['B2', 1/4], ['G2', 1/4],
    ['B2', 1/4], ['G2', 1/4],

    ['Bb2', 1/4], ['G2', 1/4],
    ['Bb2', 1/4], ['G2', 1/4],
    ['A2', 1/4], ['G2', 1/4],
    ['A2', 1/4], ['G2', 1/4],

    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],

    ['G1', 1/4], ['F2', 1/4],
    ['G1', 1/4], ['F2', 1/4],
    ['A2', 1/4], ['F2', 1/4],
    ['B2', 1/4], ['F2', 1/4],


    ['C2', 1/4], ['G2', 1/4],
    ['C2', 1/4], ['G2', 1/4],
    ['B2', 1/4], ['G2', 1/4],
    ['B2', 1/4], ['G2', 1/4],

    ['Bb2', 1/4], ['G2', 1/4],
    ['Bb2', 1/4], ['G2', 1/4],
    ['A2', 1/4], ['G2', 1/4],
    ['A2', 1/4], ['G2', 1/4],

    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],
    ['Ab2', 1/4], ['F2', 1/4],

    ['G1', 1/4], ['F2', 1/4],
    ['G1', 1/4], ['F2', 1/4],
    ['A2', 1/4], ['F2', 1/4],
    ['B2', 1/4], ['F2', 1/4],
  ],

  hi: [
    ['G4', 4],

    ['E4', 1/4],
    [null, 1/4],
    ['D4', 1/4],
    ['E4', 1/4],

    [null, 1/4],
    ['D4', 1/4],
    ['E4', 1/4],
    ['D4', 1/4],

    ['E4', 1/4],
    [null, 3/4],

    ['D4', 1/4],
    [null, 5/8],
    ['Eb4', 1/8],


    ['E4', 31/8],
    [null, 1/8],

    ['E4', 1/4],
    [null, 1/4],
    ['D4', 1/4],
    ['E4', 1/4],

    [null, 1/4],
    ['D4', 1/4],
    ['E4', 1/4],
    ['D4', 1/4],

    ['G4', 1/4],
    [null, 13/8],
    ['Gb4', 1/8]
  ]
}

var playMusic = function (music) {
  var waiting = false;
  var nextNote = function (which, notes, i) {
    var note = notes[i][0];
    var duration = notes[i][1];
    startNote(which, note);
    setTimeout(function () {
      if (i + 1 < notes.length) {
        nextNote(which, notes, i + 1); 
      } else if (waiting) {
        nextNote('lo', music.lo, 0);
        nextNote('hi', music.hi, 0);
        waiting = false;
      } else {
        waiting = true;
      }
    }, 60000 / music.bpm * duration);
  }
  nextNote('lo', music.lo, 0);
  nextNote('hi', music.hi, 0);
}

playMusic(mainTheme);
