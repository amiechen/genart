const canvasSketch = require('canvas-sketch');
const { lerp } = require("canvas-sketch-util/math");
const WebFont = require('webfontloader');

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const countx = 3;
    const county = 3;
    let order = 1;
    for (let x = 0; x < countx; x++) {
      for (let y = 0; y < county; y++) {
        const u = countx <= 1 ? 0.5 : x / (countx - 1);
        const v = county <= 1 ? 0.5 : y / (county - 1);
        order += 1;
        points.push({
          order,
          text: ["o", "r"],
          position: [u, v]
        });
      }
    }
    return points;
  };
  const points = createGrid();
  const margin = 500;
  return ({ context, width, height }) => {
    WebFont.load({
      google: {
        families: ['Hammersmith One']
      }
    });

    context.fillStyle = 'white';
    context.font = "bold 100px Hammersmith One";
    context.fillRect(0, 0, width, height);

    points.forEach((point) => {
      const { order, text, position } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.fillStyle = "black";
      if (order % 2) {
        context.fillText(text[1], x, y);
      } else {
        context.fillText(text[0], x, y);
      }
    })
  };
};

canvasSketch(sketch, settings);