const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  return ({ context, width, height }) => {
    const redPalette = ["#2b2e4a", "#e84545", "#903749", "#53354a"];
    const circles = 100;
    const cx = width / 2;
    const cy = height / 2;
    const offset = 400;
    const drawCircle = (cx, cy, radius, start, end) => {
      context.beginPath();
      context.arc(cx, cy, radius, start, end, false);
      context.stroke();
    };
    context.fillStyle = "#2b2e4a";
    context.fillRect(0, 0, width, height);

    let lineWidth = 1;
    let radius = 100;

    for (let i = 0; i < circles; i++) {
      const start = lerp(0, Math.PI * 2, Math.random());
      const end = lerp(0, Math.PI * 2, Math.random());

      // every circle has different line width, from small to big
      // the distance between each ring is consistant
      lineWidth = lineWidth + 5 + 2 * i;
      radius = radius + 10 + lineWidth;

      context.strokeStyle = random.pick(redPalette);
      context.lineWidth = lineWidth;
      drawCircle(cx - offset, cy + offset, radius, start, end);
    }
  };
};

canvasSketch(sketch, settings);
