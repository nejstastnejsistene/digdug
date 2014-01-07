var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var p;

window.onload = function() {
  p = new Player();
  p.start(music.gameStart, function(){
    p.start(music.mainTheme);
  });

  drawSprite(ctx, 'carrot', 0, 0);
  drawSprite(ctx, 'turnip', 16, 0);
  drawSprite(ctx, 'rock3', 32, 0);
  drawSprite(ctx, 'cucumber', 48, 0);
  drawSprite(ctx, 'pineapple', 64, 0);
  drawSprite(ctx, 'flower', 80, 0);
  drawSprite(ctx, 'redFlower', 96, 0);
  drawSprite(ctx, 'yellowFlower', 112, 0);
  drawSprite(ctx, 'smallFlame', 0, 16);
  drawSprite(ctx, 'mediumFlame', 16, 16);
  drawSprite(ctx, 'largeFlame', 48, 16);
  drawSprite(ctx, 'pooka0', 0, 32);
  drawSprite(ctx, 'pooka1', 16, 32);
  drawSprite(ctx, 'pookaMask0', 32, 32);
  drawSprite(ctx, 'pookaMask1', 48, 32);
  drawSprite(ctx, 'pookaFlat', 64, 32);
  drawSprite(ctx, 'pookaHit0', 80, 32);
  drawSprite(ctx, 'pookaHit1', 0, 48);
  drawSprite(ctx, 'pookaHit2', 32, 48);
  drawSprite(ctx, 'pookaHit3', 64, 48);
  drawSprite(ctx, 'fygar0', 0, 80);
  drawSprite(ctx, 'fygar1', 16, 80);
  drawSprite(ctx, 'fygarMask0', 32, 80);
  drawSprite(ctx, 'fygarMask1', 48, 80);
  drawSprite(ctx, 'fygarFlat', 64, 80);
  drawSprite(ctx, 'fygarHit0', 80, 80);
  drawSprite(ctx, 'fygarHit1', 0, 100);
  drawSprite(ctx, 'fygarHit2', 32, 100);
  drawSprite(ctx, 'fygarHit3', 64, 100);
  
  var i = 0;
  setInterval(function() {
   i = (i + 1) % 4;
   drawSprite(ctx, 'fygarHit' + i, 0, 100); 
  }, 1000);
}

window.onblur = function() { p.stop() };
window.onfocus = function() { p.start() };
