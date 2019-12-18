const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [500, 500]
};

const sketch = () => {
  let offset = -25;
  const createLines = () => {
    const lines_array = [];
    const count = 10;
    const gap = 500 / count;
    for (let x = 1; x <= count; x++) {
      const line = x * gap;
      lines_array.push(line + offset);
    }
    return lines_array;
  };

  const lines = createLines();

  return ({ context, width, height }) => {
    // draw canvas
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
    const grd = context.createLinearGradient(0, 0, 0, 170);
    grd.addColorStop(0, "black");
    grd.addColorStop(0.5, "#fff1cf");
    grd.addColorStop(1, "white");
    context.strokeStyle = grd;
    context.lineWidth = 2;

    // draw straight lines
    lines.forEach(line => {
      context.beginPath();
      context.moveTo(line, 0);
      context.lineTo(line, 500);
      context.stroke();
    });

    // draw cross
    lines.forEach(line => {
      let offset = -50;
      const position = random.range(50, 450);
      const path_visible = new Path2D(
        `M ${line + offset},${position} L ${line + 50 + offset},${position +
          25} M ${line + 50 + offset},${position} L ${line +
          offset},${position + 25}`
      );
      const path_invisible_l = new Path2D(
        `M ${line + offset}, ${position} L ${line + offset}, ${position + 25}`
      );
      const path_invisible_r = new Path2D(
        `M ${line + 50 + offset}, ${position} L ${line +
          50 +
          offset}, ${position + 25}`
      );

      // draw left line
      context.lineCap = "round";
      context.strokeStyle = "#000";
      context.stroke(path_invisible_l);
      context.strokeStyle = "#000";
      context.stroke(path_invisible_r);

      // draw the cross
      context.strokeStyle = "#fff";
      context.stroke(path_visible);
    });
  };
};

canvasSketch(sketch, settings);
