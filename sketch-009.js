const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 10;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: 80,
          position: [u, v],
          rotation: random.pick([0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]),
          index: [x, y],
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((point) => {
      let circles = point.index[0];
      let arcs = point.index[1];
      const { radius, position } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      if (circles % 2 == arcs % 2) {
        // draw circles
        context.fillStyle = "#5C527F";
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
      } else {
        // draw arcs
        context.fillStyle = "#6E85B2";
        context.moveTo(x - radius, y + radius);
        context.arc(
          x - radius,
          y + radius,
          radius * 2,
          Math.PI * 1.5,
          Math.PI * 2,
          false
        );
        context.lineTo(x - radius, y - radius);
        context.lineTo(x + radius, y + radius);
        context.fill();
        console.log(point.rotation);
      }
    });
  };
};

canvasSketch(sketch, settings);
