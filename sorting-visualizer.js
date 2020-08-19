let barsCanvas;
let ctx;
let unsortedArray;
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

  unsortedArray = [];
  barStart = 1;

  for (let n = 0; n < size; n++) {
    let number = Math.floor(Math.random() * 120 + 1);
    unsortedArray.push(number);

    animateSort(number, "green");
  }
  return unsortedArray;
}

function animateSort(number, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(barStart, 0);
  ctx.lineTo(barStart, number * 4);
  ctx.stroke();

  barStart += 11;
}

function bubbleSort(numsArray) {
  let last = numsArray.length;
  let largestIndex;

  while (last != 0) {
    last--;
    largestIndex = 0;
    var count = 0;

    var drawPortion = function () {
      if (numsArray[count] > numsArray[count + 1]) {
        [numsArray[count], numsArray[count + 1]] = [
          numsArray[count + 1],
          numsArray[count],
        ];
        largestIndex = count + 1;
      }

      ctx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
      barStart = 1;

      for (let n = 0; n < numsArray.length; n++) {
        if (n == largestIndex) {
          animateSort(numsArray[n], "red");
        } else {
          animateSort(numsArray[n], "green");
        }
      }
      count++;

      if (count < last) {
        setTimeout(drawPortion, 1000);
      }
    };
    drawPortion();
  }
  return numsArray;
}

function mergeSort(numsArray) {
  if (numsArray.length <= 1) {
    return numsArray;
  }

  const mid = Math.floor(numsArray.length / 2);
  const left = numsArray.slice(0, mid);
  const right = numsArray.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(a, b) {
  let merged = [];
  let aIndex = 0;
  let bIndex = 0;

  while (aIndex < a.length && bIndex < b.length) {
    if (a[aIndex] < b[bIndex]) {
      merged.push(a[aIndex]);
      aIndex++;
    } else {
      merged.push(b[bIndex]);
      bIndex++;
    }
  }
  return merged.concat(a.slice(aIndex)).concat(b.slice(bIndex));
}
