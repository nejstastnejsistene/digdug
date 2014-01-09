var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var p, d;

window.onload = function() {
  p = new Player();
  p.start(music.gameStart, function(){
    p.start(music.mainTheme, p.loop);
  });

  d = new Dirt();
  setInterval(function() { d.draw(ctx); }, 100);
}

window.onblur = function() { p.stop() };
window.onfocus = function() { p.start() };
