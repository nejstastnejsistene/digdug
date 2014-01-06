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
  this.stopped = true;
  this.tickLength = 1/32;
}

Player.prototype = {

  start: function(music, onFinish) {
    if (!this.stopped)
      throw Error("music is already playing");
    if (!music)
      music = this.music;
    if (!onFinish) {
      var p = this;
      onFinish = function(){ p.start(); }
    }

    if (music != this.music) {
      this.music = music;
      this.loData = new ChannelData();
      this.hiData = new ChannelData();
      this.onFinish = onFinish;
    }

    this.stopped = false;
    this.lo.start(music.lo[this.loData.index][0]);
    this.hi.start(music.hi[this.hiData.index][0]);
    this.tick(music);
  },

  tick: function(music) {
    if (this.stopped) {
      this.lo.stop();
      this.hi.stop();
      if (this.onStop)
        this.onStop();
      return;
    }

    this.tickChannel(this.lo, this.loData, music.lo);
    this.tickChannel(this.hi, this.hiData, music.hi);
    
    var p = this;
    setTimeout(function() {
      p.loData.offset++;
      p.hiData.offset++;
      p.tick(music);
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
        this.stop(this.onFinish);
      }
    }
  },

  stop: function(onStop) {
    this.stopped = true;
    this.onStop = onStop;
  },

  switchMusic: function(newMusic) {
    var p = this;
    this.stop(function(){ p.start(newMusic); });
  }
}


p = new Player();
p.start(music.gameStart, function(){
  p.start(music.mainTheme);
});
