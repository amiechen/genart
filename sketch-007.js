const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  };
}

const sketch = ({ canvas, update }) => {
  // local state
  const mouse = createMouse(canvas, {
    onMove: () => update()
  });
  // return points on the grid
  const createGrid = () => {
    const points = [];
    const count = 5;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // u v represent x y inbetween 0 and 1
        const u = x / (count - 1);
        const v = y / (count - 1);

        points.push({
          position: [u, v],
          radius: 80
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
      const { context, width, height, styleWidth, styleHeight } = props;

      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);
      console.log(mouse.position[0], mouse.position[1]);
      points.forEach(point => {
        const { radius, position } = point;
        const [u, v] = position;
        // lerp(min, max, t) where t is expected to between 0 .. 1
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        context.beginPath();
        context.rect(x - 90, y - 90, 180, 180);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(x - 40, y - 40, radius, radius);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();

        // background(mouseY / 2, 100, 100);
        // fill(360 - mouseY / 2, 100, 100);
        // rect(360, 360, x + 1, y + 1);
      });
    },
    unload() {
      mouse.dispose();
    }
  };
};

canvasSketch(sketch, settings);

// using Matt's mouse template on https://codesandbox.io/s/canvas-sketch-mouse-movement-mkknt
function createMouse(canvas, opts = {}) {
  const mouse = {
    moved: false,
    position: [0, 0],
    normalized: [0, 0],
    dispose
  };

  window.addEventListener("mousemove", move);

  return mouse;

  function move(ev) {
    mouseEventOffset(ev, canvas, mouse.position);
    if (opts.onMove) opts.onMove();
  }

  function dispose() {
    window.removeEventListener("mousemove", move);
  }
}

function mouseEventOffset(ev, target, out = [0, 0]) {
  target = target || ev.currentTarget || ev.srcElement;
  const cx = ev.clientX || 0;
  const cy = ev.clientY || 0;
  const rect = target.getBoundingClientRect();
  out[0] = cx - rect.left;
  out[1] = cy - rect.top;
  return out;
}
