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

    animateSort(number, "green");
  }
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
}

function mergeSort(numsArray) {
  if (numsArray.length <= 1) {
    return nums;
  }

  mid = numsArray.length / 2;
  left = mergeSort(numsArray.slice(0, mid));
  right = mergeSort(numsArray.slice(mid));

  return left;
  return right;
  return merge(left, right);
}

function merge(a, b) {
  merged = [];
  aIndex, (bIndex = 0), 0;

  while (aIndex < len(a) && bIndex < len(b)) {
    if (a[aIndex] < b[bIndex]) {
      merged.append(a[aIndex]);
      aIndex += 1;
    } else {
      merged.append(b[bIndex]);
      bIndex += 1;
    }
  }

  if (aIndex == len(a)) {
    merged.concat(b.splice[bIndex]);
  } else {
    merged.concat(a.splice[aIndex]);
  }

  for ((i, sorted_val) in enumerate(merged)) {
    a[i] = sorted_val;
    return a;
  }
}
