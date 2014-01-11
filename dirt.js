var width = 14;
var height = 16;
function Dirt() {
  this.dirt = [];
  for (var r = 0; r < 4*height; r++) {
    var row = [];
    for (var c = 0; c < 4*width; c++)
      row.push(true);
    this.dirt.push(row);
  }
}

Dirt.prototype = {
  draw: function(ctx) {
    for (var r = 0; r < d.dirt.length; r++) {
      for (var c = 0; c < d.dirt[r].length; c++) {
        ctx.setFillColor(d.dirt[r][c] ? 'green' : 'red');
        ctx.fillRect(4*c, 4*r, 4, 4);
      }
    }
    ctx.setStrokeColor('black');
    ctx.lineWidth = 0.5;
    for (var r = 0; r < height; r++) {
      ctx.beginPath();
      ctx.moveTo(0,        16*r);
      ctx.lineTo(16*width, 16*r);
      ctx.stroke();
    }
    for (var c = 0; c < width; c++) {
      ctx.beginPath();
      ctx.moveTo(16*c, 0);
      ctx.lineTo(16*c, 16*height);
      ctx.stroke();
    }
  },

  eat: function(r, c, dir) {
    // Eating down or to the right will
    // actually eat in the next tile over.
    if (dir == 'down') r += 1;
    if (dir == 'right') c += 1;

    // Check whether this tile is eaten,
    // for keeping track of score.
    var rFloor = Math.floor(r);
    var cFloor = Math.floor(c);
    var wasEaten = this.isEaten(rFloor, cFloor);

    // Truncate to 1/4.
    r = Math.floor(r * 4);
    c = Math.floor(c * 4);

    // Eat the 4 bits of dirt in front of you.
    var vertical = (dir == 'up' || dir == 'down');
    for (var i = 0; i < 4; i++)
      this.dirt[r+!vertical*i][c+vertical*i] = false;

    // Give 10 points for finishing a tile.
    return 10 * (this.isEaten(rFloor, cFloor) && !wasEaten);
  },
 
  isEaten: function(r, c) {
    console.log(r, c);
    if (r % 1 != 0 || c % 1 != 0)
      throw Error('isEaten expecting integer arguments');
    // Return true if all of the bits in this tile are false;
    for (var i = 4*r; i < 4*r+4; i++)
      for (var j = 4*c; j < 4*c+4; j++)
        if (this.dirt[i][j])
          return false;
    return true;
  }
};
