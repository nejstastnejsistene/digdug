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

  eat: function() {

  },
};
