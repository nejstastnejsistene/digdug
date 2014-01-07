function getFreq(note) {
  var i = 0;
  var offset = {A:0,B:2,C:3,D:5,E:7,F:8,G:10}[note[i++]];
  if (note[i] == '#') { offset++; i++; }
  else if (note[i] == 'b') { offset--; i++; }
  return 440 * Math.pow(2, (12 * note[i] + offset - 48) / 12);
}

function Oscillator(ctx) {
  this.ctx = ctx;
}

Oscillator.prototype = {
  stop: function() { if (this.osc) this.osc.disconnect(); },
  start: function(note) {
    this.stop();
    this.osc = this.ctx.createOscillator();
    if (note) {
      this.osc.connect(this.ctx.destination);
      this.osc.type = this.osc.SQUARE;
      this.osc.frequency.value = getFreq(note);
      this.osc.start(0);
    }
  }
};

function ChannelData(index, offset) {
  this.index = 0;
  this.offset = 0;
}

function Player() {
  this.ctx = new webkitAudioContext();
  this.lo = new Oscillator(this.ctx);
  this.hi = new Oscillator(this.ctx);
  this.tickLength = 1/32;
}

Player.prototype = {

  start: function(music, onFinish) {
    if (this.intervalId)
      throw Error("music is already playing");

    // If not argument is given, default to current music
    // so pausing/resuming is easier.
    if (!music)
      music = this.music;

    // If the music has changed, start from scratch.
    if (music != this.music) {
      this.music = music;
      this.loData = new ChannelData();
      this.hiData = new ChannelData();
    }

    // Default to resetting the player upon completion.
    if (onFinish)
      this.onFinish = onFinish || this.reset;

    if (!music)
      return;

    this.lo.start(music.lo[this.loData.index][0]);
    this.hi.start(music.hi[this.hiData.index][0]);

    var p = this;
    this.intervalId = setInterval(function() {
      p.loData.offset++;
      p.hiData.offset++;
      var loFinished = ! p.tickChannel(p.lo, p.loData, music.lo);
      var hiFinished = ! p.tickChannel(p.hi, p.hiData, music.hi);

      // The whole thing stops when either track finishes.
      if (loFinished || hiFinished) {
        p.stop();
        p.onFinish();
      } 
    }, 60000 / music.bpm * this.tickLength);
  },

  tickChannel: function(osc, data, notes) {
    var duration = notes[data.index][1];
    if (data.offset * this.tickLength >= duration) {
      data.offset %= duration * this.tickLength;
      if (++data.index < notes.length) {
        osc.start(notes[data.index][0]);
      } else {
        data.index = 0;
        return false; // Done playing.
      }
    }
    return true; // Continue playing.
  },

  stop: function() {
    clearInterval(this.intervalId);
    this.lo.stop();
    this.hi.stop();
    this.intervalId = null;
  },

  reset: function() {
    this.stop();
    this.music = null;
  },

  // Callback for onFinish() for looping. 
  loop: function() { this.start(this.music, this.loop); }
}
