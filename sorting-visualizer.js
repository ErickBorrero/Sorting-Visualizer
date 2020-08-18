let barsCanvas;
let ctx;
let numsArray;
let barStart = 1;

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

  numsArray = [];
  barStart = 1;

  for (let n = 0; n < size; n++) {
    let number = Math.floor(Math.random() * 120 + 1);
    numsArray.push(number);

    animateSort(number);
  }
}

function animateSort(number) {
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(barStart, 0);
  ctx.lineTo(barStart, number * 4);
  ctx.stroke();

  barStart += 8;
}

function bubbleSort(numsArray) {
  let last = numsArray.length;
  let largestIndex = 0;

  while (last != 0) {
    last--;
    for (n = 0; n <= last; n++) {
      if (numsArray[n] > numsArray[n + 1]) {
        [numsArray[n], numsArray[n + 1]] = [numsArray[n + 1], numsArray[n]];
        largestIndex = n + 1;
      }

      let count = 0;
      ctx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
      barStart = 1;
      var drawPortion = function () {
        if (count == largestIndex) {
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.moveTo(barStart, 0);
          ctx.lineTo(barStart, numsArray[count] * 4);
          ctx.stroke();

          barStart += 8;
        }
        animateSort(numsArray[count]);
        count++;

        if (count < numsArray.length) {
          setTimeout(drawPortion, 100);
        }
      };

      drawPortion();
    }
  }
}
