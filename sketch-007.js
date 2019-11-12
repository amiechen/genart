const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = ({ canvas, update }) => {
  // return points on the grid
  const createGrid = () => {
    const points = [];
    const count = 80;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // u v represent x y inbetween 0 and 1
        const u = x / (count - 1);
        const v = y / (count - 1);
        const hue = 220 + random.range(0, 100);
        points.push({
          position: [u, v],
          hue
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 400;

  // render function
  return {
    render(props) {
      const { context, width, height } = props;
      context.fillStyle = "hsla(260, 40%, 5%, 1)";
      context.fillRect(0, 0, width, height);
      points.forEach(point => {
        const { position, hue } = point;
        const [u, v] = position;
        // lerp(min, max, t) where t is expected to between 0 .. 1
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        // draw each point on a grid, then randomize stroke width, hue, opacity and point size
        context.beginPath();
        context.lineWidth = random.range(1, 10);
        context.strokeStyle = `hsla(${hue}, 100%, 60%, ${random.range(
          0.5,
          1
        )})`;
        context.arc(x, y, random.range(0, 10), 0, Math.PI * 2, false);

        // rotate each point randomly so they aren't in their grid position
        context.rotate((Math.PI * 2) / random.range(0, 10));

        // give each point some glow
        context.shadowColor = "#a200ff";
        context.shadowBlur = 40;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.stroke();
      });
    }
  };
};

canvasSketch(sketch, settings);
