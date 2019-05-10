const random = require("canvas-sketch-util/random");
const interceptOnCircle = (p1, p2, c, r) => {
  //p1 is the first line point
  //p2 is the second line point
  //c is the circle's center
  //r is the circle's radius

  var p3 = { x: p1.x - c.x, y: p1.y - c.y }; //shifted line points
  var p4 = { x: p2.x - c.x, y: p2.y - c.y };

  var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
  var b = p3.y - m * p3.x; //y-intercept of line

  var underRadical = Math.pow(r, 2) * Math.pow(m, 2) + Math.pow(r, 2) - Math.pow(b, 2); //the value under the square root sign 

  if (underRadical < 0) {
    //line completely missed
    return false;
  } else {
    var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //one of the intercept x's
    var t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //other intercept's x
    var i1 = { x: t1 + c.x, y: m * t1 + b + c.y }; //intercept point 1
    var i2 = { x: t2 + c.x, y: m * t2 + b + c.y }; //intercept point 2
    return [i1, i2];
  }
};

const drawStraightLine = (x1, y1, x2, y2, strokeStyle, context) => {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

const drawDottedLine = (x1, y1, x2, y2, dotCount, dotColor, context) => {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var spaceX = dx / dotCount;//random.range(5, 200);
  var spaceY = dy / dotCount;//random.range(5, 200);
  var newX = x1;
  var newY = y1;
  for (var i = 0; i < dotCount; i++) {
    drawDot(newX, newY, dotColor, context);
    newX += spaceX;
    newY += spaceY;
  }
};

const drawDot = (x, y, dotColor, context) => {
  const dotRadius = Math.abs(random.gaussian(0.01, 1.5));
  // context.globalCompositeOperation = "lighter";
  context.globalAlpha = random.range(0.25, 0.8);
  context.fillStyle = dotColor;
  context.beginPath();
  context.arc(x, y, dotRadius, 0, 2 * Math.PI, false);
  context.fill();
};

module.exports = { interceptOnCircle, drawStraightLine, drawDottedLine };