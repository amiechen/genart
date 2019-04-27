const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048]
};

const count = 20;

const sketch = () => {
  const createGrid = () => {
    const points = [];

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: 5,
          position: [u, v],
          alpha: random.value(1)
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    points.forEach(point => {
      const { radius, position, alpha } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const dist = (width - 600) / (count - 1);
      const siblingDots = [
        { x, y },
        { x: x + dist, y: y },
        { x: x + dist, y: y + dist },
        { x: x, y: y + dist }
      ];
      const randomDot = random.pick(siblingDots);
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(x, y);
      context.globalAlpha = alpha;
      context.strokeStyle = random.pick(random.pick(palettes));
      context.lineWidth = 10;

      // draw line to random sibiling dots
      context.lineTo(randomDot.x, randomDot.y);
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
