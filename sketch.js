const canvasSketch = require("canvas-sketch");
const { degToRad } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = (x, y) => {
  return ({ context, width, height }) => {
    const radius = 400;
    const cx = width / 2;
    const cy = height / 2;

    const drawCircle = (x, y) => {
      const radius = 5;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = "Yellow";
      context.fill();
    };

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let degree = 0; degree < 360; degree += 10) {
      const radian = degToRad(degree);
      const x = cx + Math.cos(radian) * radius;
      const y = cy + Math.sin(radian) * radius;

      drawCircle(x, y);
    }
  };
};

canvasSketch(sketch, settings);
