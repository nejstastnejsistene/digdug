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

  var c = 4, r = 10, dir = 'up';
  var score = 0;
  setInterval(function() {
    if (dir == 'up')
      r -= 1/16;
    else
      c += 1/16;
    if (r == 3) dir = 'right';
    score += d.eat(r, c, dir);
    console.log('Score:', score);
  }, 50);
}

window.onblur = function() { p.stop() };
window.onfocus = function() { p.start() };
