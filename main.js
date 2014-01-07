var p;

window.onload = function() {
  p = new Player();
  p.start(music.gameStart, function(){
    p.start(music.mainTheme);
  });
}

window.onblur = function() { p.stop() };
window.onfocus = function() { p.start() };
