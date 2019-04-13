const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const circles = 6;
  const offset = 400;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < circles; i++) {
      // every circle has different length of radian
      const start = lerp(0, Math.PI * 2, Math.random());
      const end = lerp(0, Math.PI * 2, Math.random());

      // every circle has different line width, from small to big
      const lineWidth = 20 + i * 60;
      const radius = lerp(280, width, i / 10);
      const x = width / 2;
      const y = height / 2;

      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = lineWidth;
      context.arc(x - offset, y + offset, radius, start, end, false);
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
