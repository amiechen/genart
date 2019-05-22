const canvasSketch = require('canvas-sketch');
const Two = require('two.js');

const settings = {
  dimensions: [1280, 1280],
  animate: true
};

const sketch = ({ canvas, width, height }) => {
  const two = new Two({ domElement: canvas });

  const female = (x, y) => {
    let cross_horizontal = two.makeRectangle(x, y, 1, 20);
    let cross_vertical = two.makeRectangle(x, y, 20, 1);
    let dot_female = two.makeCircle(x, y - 30, 20);
    dot_female.fill = "black";
    return two.makeGroup(cross_horizontal, cross_vertical, dot_female);
  }

  const male = (x, y) => {
    let arrow = two.makePath(x - 10, y + 20, x, y + 10, x + 10, y + 20, x, y + 10);
    let line = two.makeLine(x, y + 10, x, y + 30);
    let dot_male = two.makeCircle(x, y + 50, 20);
    arrow.stroke = "black";
    dot_male.fill = "black";
    return two.makeGroup(arrow, line, dot_male);
  }

  const createGrid = () => {
    const points = [];
    const count = 20;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
          gender: [female, male]
        })
      }
    }
    return points;
  };

  const gridPoints = createGrid();
  const margin = 300;
  two.add(female, male);



  return {
    resize({ pixelRatio, width, height }) {
      gridPoints.forEach(point => {
        const { position } = point;
        const [u, v] = position;
      })
      // Update width and height of Two.js scene based on
      // canvas-sketch auto changing viewport parameters
      two.width = width;
      two.height = height;
      two.ratio = pixelRatio;

      // This needs to be passed down to the renderer's width and height as well
      two.renderer.width = width;
      two.renderer.height = height;

      // Orient the scene to make 0, 0 the center of the canvas
      two.scene.translation.set(two.width / 2, two.height / 2);
    },
    render({ time }) {

      // Update two.js via the `render` method - *not* the `update` method.
      two.render();
    }
  };
};

canvasSketch(sketch, settings);
