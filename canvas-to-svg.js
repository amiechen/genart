const canvasSketch = require("canvas-sketch");
const Canvas2SVG = require("canvas2svg");
const Color = require("canvas-sketch-util/color");

module.exports = canvasToSVG;
function canvasToSVG(sketch) {
  const obj = typeof sketch === "function" ? {} : sketch;
  const render = typeof sketch === "function" ? sketch : obj.render;
  return {
    ...obj,
    render(props) {
      render(props);
      if (props.exporting && !props.recording) {
        return [props.canvas, serialize(render, props)];
      }
    }
  };
}

function fix(node, name) {
  if (!node.hasAttribute(name) || !node.getAttribute(name)) return;
  const attr = node.getAttribute(name);
  const parsed = Color.parse(attr);
  if (parsed) node.setAttribute(name, parsed.hex);
}

function serialize(draw, props) {
  const {
    canvasWidth,
    canvasHeight,
    width,
    height,
    units,
    scaleX,
    scaleY
  } = props;
  const context = new Canvas2SVG(canvasWidth, canvasHeight);
  draw({ ...props, context });
  const svg = context.getSvg().cloneNode(true);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  [...svg.querySelectorAll("*")].forEach(node => {
    fix(node, "fill");
    fix(node, "stroke");
  });
  svg.setAttribute("width", width + units);
  svg.setAttribute("height", height + units);
  return {
    data: new XMLSerializer().serializeToString(svg),
    extension: ".svg"
  };
}
