let barsCanvas;
let ctx;
let unsortedArray;
let barStart = 1;
let size;
let sortHist;
var historyIndex = 0;
let countUp = 0;
let countDown = 0;
let buttonsArray = [
  "new-array",
  "bubble-sort",
  "insertion-sort",
  "merge-sort",
  "quick-sort",
];

function createCanvas() {
  barsCanvas = document.getElementById("myCanvas");
  ctx = barsCanvas.getContext("2d");

  barsCanvas.width = 1500;
  barsCanvas.height = 500;
}

function clearCanvas() {
  ctx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
  barStart = 1;
}

async function createArray() {
  var selection = document.getElementById(
    "algorithm-modifiers__select--array-size"
  );
  size = selection.options[selection.selectedIndex].value;

  clearCanvas();

  unsortedArray = [];

  for (let length = 0; length < size; length++) {
    await sleep(15);
    let number = Math.floor(Math.random() * 120 + 1);
    unsortedArray.push(number);

    animateSort(number, "#250253");
  }
  return unsortedArray;
}

function animateSort(number, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(barStart, 0);
  ctx.lineTo(barStart, number * 4);
  ctx.stroke();

  barStart += 11;
}

async function bubbleSort(numsArray) {
  let last = numsArray.length;
  let largestIndex;

  document.getElementById("bubble-sort-description").hidden = false;

  while (last != 0) {
    last--;

    for (let count = 0; count < last; count++) {
      await sleep(20);

      if (numsArray[count] > numsArray[count + 1]) {
        await swap(numsArray, count, count + 1);
        largestIndex = count + 1;
      }

      clearCanvas();

      for (let length = 0; length < numsArray.length; length++) {
        if (length == largestIndex) {
          animateSort(numsArray[length], "red");
        } else if (length > last) {
          animateSort(numsArray[length], "green");
        } else {
          animateSort(numsArray[length], "#250253");
        }
      }
    }
  }

  finalArray(numsArray);
  enableButtonClicking();

  return numsArray;
}

async function drawMergeSort() {
  document.getElementById("merge-sort-description").hidden = false;

  sortHist = await Promise.all(mergeSort(unsortedArray));

  while (historyIndex < sortHist.length) {
    clearCanvas();
    if (historyIndex == sortHist.length - 1) {
      for (i = 0; i < sortHist[historyIndex].length; i++) {
        await sleep(50);
        animateSort(sortHist[historyIndex][i], "green");
      }
    } else if (historyIndex >= 0) {
      for (i = 0; i < sortHist[historyIndex].length; i++) {
        await sleep(50);
        if (countUp < 2 ** historyIndex) {
          animateSort(sortHist[historyIndex][i], "blue");
          countDown++;
          countUp++;
        } else {
          animateSort(sortHist[historyIndex][i], "red");
          countDown--;
          if (countDown == 0) {
            countUp = 0;
          }
        }
      }
    }
    historyIndex++;
    (countDown = 0), (countUp = 0);
  }
  enableButtonClicking();
}

function mergeSort(array) {
  var arrays = [array.slice()],
    n = array.length,
    array0 = array,
    array1 = new Array(n);

  for (var m = 1; m < n; m <<= 1) {
    for (var i = 0; i < n; i += m << 1) {
      merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
    }
    arrays.push(array1.slice());
    (array = array0), (array0 = array1), (array1 = array);
  }

  function merge(left, right, end) {
    for (var i0 = left, i1 = right, j = left; j < end; ++j) {
      array1[j] =
        array0[
          i0 < right && (i1 >= end || array0[i0] <= array0[i1]) ? i0++ : i1++
        ];
    }
  }
  return arrays;
}

async function callQuickSort(numsArray) {
  document.getElementById("quick-sort-description").hidden = false;

  await quickSort(numsArray, 0, unsortedArray.length - 1);
  finalArray(numsArray);
  enableButtonClicking();
}

async function quickSort(numsArray, start, last) {
  document.getElementById("quick-sort-description").hidden = false;
  if (start >= last) {
    return;
  }
  let splitIndex = await sortArray(numsArray, start, last);

  await Promise.all([
    quickSort(numsArray, start, splitIndex - 1),
    quickSort(numsArray, splitIndex + 1, last),
  ]);
}

async function sortArray(numsArray, start, last) {
  let pivot = numsArray[last];
  let partition = start - 1;

  for (let current = start; current < last; current++) {
    await sleep(50);
    clearCanvas();

    for (let length = 0; length < numsArray.length; length++) {
      if (length == current) {
        animateSort(numsArray[length], "red");
      } else if (length == partition) {
        animateSort(numsArray[length], "blue");
      } else {
        animateSort(numsArray[length], "#250253");
      }
    }

    if (numsArray[current] <= pivot) {
      partition++;
      await swap(numsArray, current, partition);
    }
  }

  await swap(numsArray, partition + 1, last);
  return partition + 1;
}

async function insertionSort(numsArray) {
  document.getElementById("insertion-sort-description").hidden = false;

  let length = numsArray.length;

  for (let unsortedIndex = 1; unsortedIndex < length; unsortedIndex++) {
    let current = numsArray[unsortedIndex];
    let sortedIndex = unsortedIndex - 1;

    while (sortedIndex >= 0 && numsArray[sortedIndex] > current) {
      numsArray[sortedIndex + 1] = numsArray[sortedIndex];
      sortedIndex--;

      await sleep(100);
      clearCanvas();

      for (let length = 0; length < numsArray.length; length++) {
        if (length == sortedIndex) {
          animateSort(numsArray[length], "red");
        } else if (length < unsortedIndex) {
          animateSort(numsArray[length], "green");
        } else {
          animateSort(numsArray[length], "#250253");
        }
      }
    }
    numsArray[sortedIndex + 1] = current;
  }

  finalArray(numsArray);
  enableButtonClicking();
  return numsArray;
}

async function swap(array, first, second) {
  await sleep(100);
  [array[first], array[second]] = [array[second], array[first]];
}

async function finalArray(numsArray) {
  clearCanvas();

  for (let length = 0; length < numsArray.length; length++) {
    await sleep(50);
    animateSort(numsArray[length], "green");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function disableButtonClicking() {
  for (let index = 0; index < buttonsArray.length; index++) {
    document.getElementById(buttonsArray[index]).style.pointerEvents = "none";
  }
}

function enableButtonClicking() {
  for (let index = 0; index < buttonsArray.length; index++) {
    document.getElementById(buttonsArray[index]).style.pointerEvents = "auto";
  }
}
