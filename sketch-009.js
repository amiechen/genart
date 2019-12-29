
const canvasSketch = require("canvas-sketch");
const svg = require("./canvas-to-svg.js");

const settings = {
  scaleToView: true,
  dimensions: "A4",
  units: "in",
  animate: false,
  time: 1.5,
  duration: 5,
  pixelsPerInch: 300
};

const sketch = async () => {
  // Setup your font assets here
  const fontName = "Suprapower-Heavy";
  const fontFormat = ".otf";
  const fontPath = "assets/fonts/";

  try {
    // We ensure the font is loaded before rendering,
    // otherwise the first frame might not draw the correct font.
    const fontUrl = `${fontPath}${fontName}${fontFormat}`;
    const font = new window.FontFace(fontName, `url(${fontUrl})`);
    await font.load();
    document.fonts.add(font);
  } catch (err) {
    console.warn(`Font not loaded, will fall back to another sans-serif.`);
  }

  return svg(({ context, width, height, playhead }) => {
    const margin = 0.5; // half inch margin

    // fill paper white bg
    context.fillStyle = "hsl(0, 0%, 100%)";
    context.fillRect(0, 0, width, height);

    // fill gray ink bg
    context.fillStyle = "hsl(0, 0%, 90%)";
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);

    // draw some rect shape
    context.save();
    context.fillStyle = "tomato";
    const size = width * 0.5;
    context.translate(width / 2, height / 2);
    context.rotate(playhead * Math.PI * 2);
    context.translate(-size / 2, -size / 2);
    context.fillRect(0, 0, size, size);
    context.restore();

    // draw some path shape
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      width / 4,
      0,
      Math.PI * 2 * playhead,
      false
    );
    context.lineWidth = width * 0.1;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = "rebeccapurple";
    context.globalAlpha = 0.85;
    context.stroke();
    context.globalAlpha = 1;

    // draw some text - which will be exported as <text>
    // (i.e. no fonts embedded!)
    context.font = `${width * 0.075}px "${fontName}", "Helvetica", sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.fillText("SVG", width / 2, height / 2);
  });
};

canvasSketch(sketch, settings);
