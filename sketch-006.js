const canvasSketch = require('canvas-sketch');
const { random } = require("canvas-sketch-util");
const { lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");

const settings = {
  // Enable an animation loop
  // animate: true,
  // Set loop duration to 3 seconds
  // duration: 3,
  // Use a small size for our GIF output
  dimensions: [2048, 2048],
  // Optionally specify an export frame rate, defaults to 30
  // fps: 24
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 15;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          position: [u, v],
          rotation: random.pick([0, Math.PI * 0.5, Math.PI, Math.PI * 1.5])
        })
      }
    }
    return points;
  }

  const gridPoints = createGrid();
  const margin = 300;

  return ({ context, width, height, playhead }) => {
    context.lineWidth = 3;
    const female = (x, y, rotation) => {
      context.strokeStyle = "#555353";
      context.fillStyle = "#555353";
      context.save();
      context.beginPath();
      // context.moveTo(x, y);
      // context.arc(x, y, 30, 0, Math.PI * 2, true);
      // context.fill();

      context.moveTo(x - 20, y + 45);
      context.lineTo(x + 20, y + 45);
      context.stroke();

      context.moveTo(x, y - 25);
      context.lineTo(x, y + 65);
      context.stroke();

      context.restore();
      console.log(rotation);
      // context.rotate(rotation);
    };

    const male = (x, y, rotation) => {
      const color = random.pick(random.pick(palettes));
      context.strokeStyle = "#555353";
      context.fillStyle = "#555353";
      context.save();
      context.beginPath();
      // context.moveTo(x, y);
      // context.arc(x, y, 30, 0, Math.PI * 2, true);
      // context.fill();

      context.moveTo(x - 20, y + 45);
      context.lineTo(x, y + 70);
      context.lineTo(x + 20, y + 45);
      context.stroke();

      context.moveTo(x, y + 70);
      context.lineTo(x, y + 25);
      context.stroke();

      context.restore();
      // context.rotate(rotation);
    };

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Get a seamless 0..1 value for our loop
    const t = Math.sin(playhead * Math.PI);

    gridPoints.forEach((point, index) => {
      const { position, rotation } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      if (index % 2) {
        female(x, y, rotation)
      } else {
        male(x, y, rotation)
      }
    })
  };
};

canvasSketch(sketch, settings);


