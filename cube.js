class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}


// sliders

function toRads(degs) {
  return (degs * Math.PI) / 180;
}

var angleFromSlider = new Point(
  document.getElementById("Xslider"),
  document.getElementById("Yslider"),
  document.getElementById("Zslider")
);

var slidersValues = new Point(0, 0, 0);

angleFromSlider.x.oninput = function () {
  document.getElementById("Xnumber").value = this.value;
  rotate("x", toRads(this.value - slidersValues.x));
  slidersValues.x = this.value;
};
angleFromSlider.y.oninput = function () {
  document.getElementById("Ynumber").value = this.value;
  rotate("y", toRads(this.value - slidersValues.y));
  slidersValues.y = this.value;
};
angleFromSlider.z.oninput = function () {
  document.getElementById("Znumber").value = this.value;
  rotate("z", toRads(this.value - slidersValues.z));
  slidersValues.z = this.value;
};


var angleFromNumber = new Point(
  document.getElementById("Xnumber"),
  document.getElementById("Ynumber"),
  document.getElementById("Znumber")
);

angleFromNumber.x.oninput = function () {
  document.getElementById("Xslider").value = this.value;
  rotate("x", toRads(this.value - slidersValues.x));
  slidersValues.x = this.value;
};
angleFromNumber.y.oninput = function () {
  document.getElementById("Yslider").value = this.value;
  rotate("y", toRads(this.value - slidersValues.y));
  slidersValues.y = this.value;
};
angleFromNumber.z.oninput = function () {
  document.getElementById("Zslider").value = this.value;
  rotate("z", toRads(this.value - slidersValues.z));
  slidersValues.z = this.value;
};


// ctx

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

// style

ctx.fillStyle = "black";
ctx.strokeStyle = "thistle";
ctx.lineWidth = w / 300;
ctx.lineCap = "round";

// initial

var c = new Point(w / 2, h / 2, 0); // initial coordinates (center)
var curAngle = new Point(120, 120, 120); // initial rotation (isometrical)
slidersValues.x = 120;
slidersValues.y = 120;
slidersValues.z = 120;
var size = h / 4;
var vertices = [
  new Point(c.x - size, c.y - size, c.z - size),
  new Point(c.x + size, c.y - size, c.z - size),
  new Point(c.x + size, c.y + size, c.z - size),
  new Point(c.x - size, c.y + size, c.z - size),
  new Point(c.x - size, c.y - size, c.z + size),
  new Point(c.x + size, c.y - size, c.z + size),
  new Point(c.x + size, c.y + size, c.z + size),
  new Point(c.x - size, c.y + size, c.z + size),
];


// edges connection
// prettier-ignore
var edges = [
  [0, 1],[1, 2],[2, 3],[3, 0],[4, 5],[5, 6],
  [6, 7],[7, 4],[0, 4],[1, 5],[2, 6],[3, 7],
];


function rotate(axes, angle) {
  if (axes === "x") {
    for (let v of vertices) {
      let dy = v.y - c.y;
      let dz = v.z - c.z;
      let y = dy * Math.cos(angle) - dz * Math.sin(angle);
      let z = dy * Math.sin(angle) + dz * Math.cos(angle);
      v.y = y + c.y;
      v.z = z + c.z;
    }
  }
  if (axes === "y") {
    for (let v of vertices) {
      let dx = v.x - c.x;
      let dz = v.z - c.z;
      let x = dz * Math.sin(angle) + dx * Math.cos(angle);
      let z = dz * Math.cos(angle) - dx * Math.sin(angle);
      v.x = x + c.x;
      v.z = z + c.z;
    }
  }
  if (axes === "z") {
    for (let v of vertices) {
      let dx = v.x - c.x;
      let dy = v.y - c.y;
      let x = dx * Math.cos(angle) - dy * Math.sin(angle);
      let y = dx * Math.sin(angle) + dy * Math.cos(angle);
      v.x = x + c.x;
      v.y = y + c.y;
    }
  }
}

function drawCube() {
  for (let edge of edges) {
    ctx.beginPath();
    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
    ctx.stroke();
  }
}

// prettier-ignore
var timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow) {
  timeDelta = timeNow - timeLast;
  timeLast = timeNow;

  ctx.fillRect(0, 0, w, h); // background

  drawCube();
  requestAnimationFrame(loop);
}
