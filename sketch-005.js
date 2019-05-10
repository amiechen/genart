const canvasSketch = require("canvas-sketch");
const { drawDottedLine } = require("./helper.js");

const settings = {
  dimensions: [2048, 2048]
};

const count = 10;
const margin = 0;
const sketch = () => {
  return ({ context, width, height }) => {
    let x = 0;

    // canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < 40; i++) {
      for (let i = 0; i < count; i++) {
        drawDottedLine(x, 0 + margin, x, height / 3, 500, "white", context);
        x += 10;
      }

      for (let i = 0; i < count / 2; i++) {
        drawDottedLine(x, height / 3, x, height * 2 / 3, 300, "white", context);
        x += 10;
      }
      for (let i = 0; i < count / 4; i++) {
        drawDottedLine(x, height * 2 / 3, x, height - margin, 200, "white", context);
        x += 10;
      }
    }
  };
};

canvasSketch(sketch, settings);
