const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { degToRad } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = (x, y) => {
  return ({ context, width, height }) => {
    const radius = 400;
    const line = 100;

    const drawGradient = (cx, cy, width, height, startColor, endColor) => {
      const grd = context.createLinearGradient(cx, cy, width, height);
      grd.addColorStop(0, startColor);
      grd.addColorStop(1, endColor);
      return grd;
    };

    const drawCircle = (x, y, radius, start, end, clockwise) => {
      context.beginPath();
      context.arc(x, y, radius, start, end, clockwise);

      context.fill();
    };

    const drawLine = (x, y, hx, hy, color = "blue") => {
      context.save();
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(hx, hy);
      context.stroke();
      context.restore();
    };

    const drawHalfCirclePerpLines = (cx, cy, degree, startColor, endColor) => {
      const radian = degToRad(degree);
      const x = cx + Math.cos(radian) * radius;
      const y = cy + Math.sin(radian) * radius;
      const grd = drawGradient(cx, cy, width, height, startColor, endColor);

      const dx = x - cx;
      const dy = y - cy;
      const a = x - y + cy;
      const b = x + y - cx;
      const a2 = x + line * dy;
      const b2 = y - line * dx;
      // Draw perp down first
      // drawLine(x, y, a, b, "red");

      drawCircle(x, y, 1, 0, Math.PI, false);
      drawLine(x, y, a2, b2, grd);
    };
    context.fillRect(0, 0, width, height);

    // For Drawing sketch-003-a.png
    // Draw Half Circle with tangent lines
    for (let degree = 0; degree < 360; degree += 2) {
      const cx = width / 2 + 400;
      const cy = height / 2;
      drawHalfCirclePerpLines(cx, cy, degree, "#cadefc", "black");
    }

    // For Drawing sketch-003-b.png
    // Add Random Balls on the canvas
    for (let n = 0; n < 60; n++) {
      context.beginPath();
      context.arc(
        random.range(0, width),
        random.range(0, height),
        random.range(30, 100),
        0,
        Math.PI * 2,
        false
      );
      context.strokeStyle = "#cadefc";
      context.lineWidth = 2;
      context.stroke();
      context.fill();
    }

    // For Drawing sketch-003-a.png
    // Draw Half Circle with tangent lines

    // for (let degree = 180; degree < 360; degree += 2) {
    //   const cx = width / 2 - 400;
    //   const cy = height / 2 + 50;
    //   drawHalfCirclePerpLines(cx, cy, degree, "#c3bef0", "black");
    // }
    // drawLine(width / 2, 0, width / 2, height, "#c3bef0");
  };
};

canvasSketch(sketch, settings);
