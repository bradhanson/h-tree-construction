'use strict';

function drawHTree(context, x, y, length, depth) {
  if (Number(depth) === 0) {
    return;
  }

  const lineSegment = length / 2;

  // draw horizontal line
  let leftPointX = x - lineSegment;
  let leftPointY = y;
  let rightPointX = x + lineSegment;
  let rightPointY = y;
  drawLine(context, leftPointX, leftPointY, rightPointX, rightPointY);

  const nextLength = length / Math.sqrt(2);
  const nextSegment = nextLength / 2;

  // draw left vertical line
  let upPointX = x - lineSegment; // also starting points for next calls
  let upPointY = y + nextSegment;
  let downPointX = x - lineSegment;
  let downPointY = y - nextSegment;
  drawLine(context, upPointX, upPointY, downPointX, downPointY);

  // draw right vertical line
  let upPoint2X = x + lineSegment; // also starting points for next calls
  let upPoint2Y = y + nextSegment;
  let downPoint2X = x + lineSegment;
  let downPoint2Y = y - nextSegment;
  drawLine(context, upPoint2X, upPoint2Y, downPoint2X, downPoint2Y);

  if (depth > 1) {
    const newLength = nextLength / Math.sqrt(2);
    drawHTree(context, upPointX, upPointY, newLength, depth - 1);
    drawHTree(context, downPointX, downPointY, newLength, depth - 1);
    drawHTree(context, upPoint2X, upPoint2Y, newLength, depth - 1);
    drawHTree(context, downPoint2X, downPoint2Y, newLength, depth - 1);
  }
}

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(context.canvas.width / 2 + x1, context.canvas.height / 2 + y1);
  context.lineTo(context.canvas.width / 2 + x2, context.canvas.height / 2 + y2);
  context.stroke();
}

function main() {
  const canvas = document.getElementById('game');
  if (canvas.getContext) {
    const context = canvas.getContext('2d');

    context.canvas.width = 800;
    context.canvas.height = 600;

    // draw border
    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

    const decrementButton = document.getElementById('decrementButton');
    const incrementButton = document.getElementById('incrementButton');
    const depthView = document.getElementById('depthView');

    decrementButton.addEventListener('click', function() {
      if (depthView.innerHTML === '0') {
        return;
      }
      depthView.innerHTML = Number(depthView.innerHTML) - 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
      drawHTree(context, 0, 0, 350, depthView.innerHTML);
    });

    incrementButton.addEventListener('click', function() {
      if (depthView.innerHTML === '7') {
        return;
      }
      depthView.innerHTML = Number(depthView.innerHTML) + 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
      drawHTree(context, 0, 0, 350, depthView.innerHTML);
    });

    drawHTree(context, 0, 0, 350, depthView.innerHTML);
  }
}
window.onload = main;

module.exports = { drawHTree, drawLine };
