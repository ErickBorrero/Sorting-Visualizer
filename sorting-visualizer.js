let barsCanvas;
let ctx;
let unsortedArray;
let barStart = 1;
let size;

function createCanvas() {
  barsCanvas = document.getElementById("myCanvas");
  ctx = barsCanvas.getContext("2d");

  barsCanvas.width = 5000;
  barsCanvas.height = 5000;
}

function clearCanvas() {
  ctx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
  barStart = 1;
}

function createArray() {
  var selection = document.getElementById(
    "algorithm-modifiers__select--array-size"
  );
  size = selection.options[selection.selectedIndex].value;

  clearCanvas();

  unsortedArray = [];

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
  var delay = 1;

  while (last != 0) {
    last--;
    largestIndex = 0;
    var count = 0;

    var drawPortion = function () {
      if (numsArray[count] > numsArray[count + 1]) {
        swap(numsArray, count, count + 1);
        largestIndex = count + 1;
      }

      clearCanvas();

      for (let n = 0; n < numsArray.length; n++) {
        if (n == largestIndex) {
          animateSort(numsArray[n], "red");
        } else {
          animateSort(numsArray[n], "green");
        }
      }
      count++;
      delay++;

      if (count < last) {
        setTimeout(drawPortion, delay * 100);
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

  if (size == numsArray.length) {
    clearCanvas();
  }

  const mid = Math.floor(numsArray.length / 2);
  const left = numsArray.slice(0, mid);
  const right = numsArray.slice(mid);

  let leftCount = 0;
  let rightCount = 0;

  var drawLeftSplit = function () {
    animateSort(left[leftCount], "blue");
    leftCount++;
    if (leftCount < left.length) {
      setTimeout(drawLeftSplit, 100);
    }
  };

  var drawRightSplit = function () {
    animateSort(right[rightCount], "yellow");
    rightCount++;
    if (rightCount < left.length) {
      setTimeout(drawRightSplit, mid * 100);
    }
  };
  drawLeftSplit();
  setTiameout(drawRightSplit(), mid * 100);
  // for (n = 0; n < right.length; n++) {
  //   animateSort(right[n], "red");
  // }

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

  // var drawmergingPortion = function () {
  //   clearCanvas();

  //   if (a[aIndex] < b[bIndex]) {
  //     merged.push(a[aIndex]);
  //     aIndex++;
  //   } else {
  //     merged.push(b[bIndex]);
  //     bIndex++;
  //   }

  //   for (n = 0; n < merged.length; n++) {
  //     animateSort(merged[n], "yellow");
  //   }
  // };

  // while (aIndex < a.length && bIndex < b.length) {
  //   setTimeout(drawmergingPortion, 500);
  // }

  var count = 0;
  var drawPortion = function () {
    clearCanvas();

    animateSort(merged[count], "green");

    count++;

    if (count < merged.length) {
      setTimeout(drawPortion, 100);
    }
  };
  // setTimeout(drawPortion(), 10000);

  return merged.concat(a.slice(aIndex)).concat(b.slice(bIndex));
}

function quickSort(numsArray) {
  quickSortSplit(numsArray, 0, numsArray.length - 1);

  return numsArray;
}

function quickSortSplit(numsArray, start, last) {
  if (start < last) {
   let splitIndex = sortArray(numsArray, start, last);

    quickSortSplit(numsArray, start, splitIndex - 1);
    quickSortSplit(numsArray, splitIndex + 1, last);
  }
}

function sortArray(numsArray, start, last) {
  let pivot = numsArray[last];
  let partition = start - 1;

  for (let current = start; current < last; current++) {
    if (numsArray[current] <= pivot) {
      partition++;
      swap(numsArray, current, partition);
    }
  }
  swap(numsArray, partition + 1, last);
  return partition + 1;
}

function swap(array, first, second) {
  [array[first], array[second]] = [array[second], array[first]];
}
