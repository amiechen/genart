const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 8;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: "#e7e7e7",
          radius: 80,
          rotation: random.pick([0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]),
          position: [u, v]
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = "#1919c6";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { color, radius, rotation, position } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.save();
      context.fillStyle = color;
      // rotate each context before drawing
      context.translate(x, y);
      context.rotate(rotation);

      // Draw wedges at each point
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 1.5, false);
      context.lineTo(0, 0);
      context.lineTo(0 + radius, 0);
      context.fill();

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
