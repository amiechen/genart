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
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 300;

  return ({ context, width, height }) => {
    let current = true; //point.position[1] * 10;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((point) => {
      let blah1 = Math.round(point.position[0] * 10);
      let blah2 = Math.round(point.position[1] * 10);
      const { radius, position } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();

      if (blah1 % 2 == blah2 % 2) {
        context.fillStyle = "black";
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        current = false;
      } else {
        context.fillStyle = "red";
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        current = true;
      }

      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
