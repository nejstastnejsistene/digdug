var spriteSheet = new Image();
spriteSheet.src = "sprites.png";

function drawSprite(ctx, name, x, y) {
  var s = sprites[name];
  if (!s) throw Error('invalid sprite name: ' + name);
  var sx = 16 * s[1] + Math.floor(s[1]) + 3;
  var sy = 16 * s[0] + Math.floor(s[0]) + 3;
  var sw = s[2];
  var sh = s[3];
  var w = sw;
  var h = sh;
  ctx.drawImage(spriteSheet, sx, sy, sw, sh, x, y, w, h);
}

//              [row  col  w    h]
var sprites = {
  pooka0:       [3,   0,   16,  16],
  pooka1:       [3,   1,   16,  16],
  pookaMask0:   [4,   2,   16,  16],
  pookaMask1:   [4,   3,   16,  16],
  pookaFlat:    [3,   2,   16,  16],
  pookaHit0:    [3,   3,   16,  16],
  pookaHit1:    [3.25,4,   32,  24],
  pookaHit2:    [3.25,6,   32,  24],
  pookaHit3:    [3.25,8,   32,  24],

  fygar0:       [5,   0,   16,  16],
  fygar1:       [5,   1,   16,  16],
  fygarMask0:   [4,   0,   16,  16],
  fygarMask1:   [4,   1,   16,  16],
  fygarFlat:    [5,   2,   16,  16],
  fygarHit0:    [5,   3,   16,  16],
  fygarHit1:    [5,   4,   32,  24],
  fygarHit2:    [5,   6,   32,  24],
  fygarHit3:    [5,   8,   32,  24],

  smallFlame:   [6,   0,   16,  16],
  largeFlame:   [6,   1,   48,  16],
  mediumFlame:  [7,   0,   32,  16],

  rock:         [7,   2,   16,  16],
  rock1:        [7,   3,   16,  16],
  rock2:        [7,   4,   16,  16],
  rock3:        [7,   5,   16,  16],

  yellowFlower: [6.5625,6, 16,  24],
  redFlower:    [6.5625,7, 16,  24],
  flower:       [7,   8,   16,  16],

  carrot:       [7,   9,   16,  16],
  turnip:       [8,   0,   16,  16],
  mushroom:     [8,   1,   16,  16],
  cucumber:     [8,   2,   16,  16],
  eggplant:     [8,   3,   16,  16],
  pepper:       [8,   4,   16,  16],
  tomato:       [8,   5,   16,  16],
  garlic:       [8,   6,   16,  16],
  watermelon:   [8,   7,   16,  16],
  galaxian:     [8,   8,   16,  16],
  pineapple:    [8,   9,   16,  16],
}
