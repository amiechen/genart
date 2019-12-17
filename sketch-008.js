const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [500, 500]
};

const sketch = () => {
  const createLines = () => {
    const lines_array = [];
    const count = 10;
    const gap = 500 / count;
    for (let x = 0; x < count; x++) {
      const line = x * gap;
      if (x !== 0) {
        lines_array.push(line);
      }
    }
    return lines_array;
  };

  // const createCrossMask = () => {
  //   const mask = new Path2D('M 100,100 h 50 v 50 h 50');
  //   context.stroke(path);
  //   return mask;
  // };

  const lines = createLines();

  return ({ context, width, height }) => {
    let previous = {};
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
    console.log(lines);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    lines.forEach(line => {
      const position = random.range(50, 450);
      const path_visible = new Path2D(
        `M ${line},${position} L ${line + 50},${position + 25} M ${line +
          50},${position} L ${line},${position + 25}`
      );
      const path_invisible_l = new Path2D(
        `M ${line}, ${position} L ${line}, ${position + 25}`
      );
      const path_invisible_r = new Path2D(
        `M ${previous.line + 50}, ${previous.position} L ${previous.line +
          50}, ${previous.position + 25}`
      );
      // save the line and position for next line draw
      previous.line = line;
      previous.position = position;

      // draw straight line
      context.beginPath();
      context.moveTo(line, 0);
      context.lineTo(line, 500);
      context.stroke();

      // draw the cross
      context.stroke(path_visible);

      // draw left line
      context.strokeStyle = "#000";
      context.stroke(path_invisible_l);

      // draw right line of previous
      context.stroke(path_invisible_r);
      context.lineCap = "round";
      context.strokeStyle = "#fff";
    });
  };
};

canvasSketch(sketch, settings);
