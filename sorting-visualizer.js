var barsCanvas;
var ctx;

function createCanvas() {
  barsCanvas = document.getElementById("myCanvas");
  ctx = barsCanvas.getContext("2d");

  barsCanvas.width = 5000;
  barsCanvas.height = 5000;
}

function createArray() {
  var selection = document.getElementById(
    "algorithm-modifiers__select--array-size"
  );
  var size = selection.options[selection.selectedIndex].value;

  ctx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
  let numbers = [];
  let barStart = 1;

  for (let n = 0; n <= size; n++) {
    let number = Math.floor(Math.random() * 120 + 1);
    numbers.push(number);

    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(barStart, 0);
    ctx.lineTo(barStart, number * 4);
    ctx.stroke();

    barStart += 8;
  }
}
