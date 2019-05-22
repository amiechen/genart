const canvasSketch = require('canvas-sketch');
const { random } = require("canvas-sketch-util");
const { lerp } = require("canvas-sketch-util/math");

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
    const count = 20;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: Math.abs(random.gaussian(1, 40)),
          position: [u, v]
        })
      }
    }
    return points;
  }

  const gridPoints = createGrid();
  const margin = 300;

  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    // Get a seamless 0..1 value for our loop
    const t = Math.sin(playhead * Math.PI);

    gridPoints.forEach((point) => {
      const { radius, position } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.fillStyle = 'white';
      context.save();
      context.beginPath();
      console.log(x, y, radius)
      context.arc(x, y, radius * t, 0, Math.PI * 2, true);
      context.fill();
      context.restore();
    })
  };
};

canvasSketch(sketch, settings);


