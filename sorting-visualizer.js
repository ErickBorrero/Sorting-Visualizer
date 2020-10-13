let barsCanvas;
let ctx;
let unsortedArray;
let barStart = 1;
let size;

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
      await sleep(25);

      if (numsArray[count] > numsArray[count + 1]) {
        await swap(numsArray, count, count + 1);
        largestIndex = count + 1;
      }

      clearCanvas();

      for (let n = 0; n < numsArray.length; n++) {
        if (n == largestIndex) {
          animateSort(numsArray[n], "red");
        } else if (n == count) {
          animateSort(numsArray[n], "blue");
        } else {
          animateSort(numsArray[n], "green");
        }
      }
    }
  }

  return numsArray;
}

async function mergeSort(numsArray) {
  if (numsArray.length <= 1) {
    return numsArray;
  }

  document.getElementById("merge-sort-description").hidden = false;

  const mid = Math.floor(numsArray.length / 2);
  const left = numsArray.slice(0, mid);
  const right = numsArray.slice(mid);

  await sleep(100);
  clearCanvas();

  for (let n = 0; n < numsArray.length; n++) {
    if (n < mid) {
      animateSort(numsArray[n], "yellow");
    } else if (n == mid) {
      animateSort(numsArray[n], "red");
    } else if (n > mid) {
      animateSort(numsArray[n], "orange");
    }
  }
  return merge(mergeSort(left), mergeSort(right));
}

async function merge(a, b) {
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
    await sleep(100);
    clearCanvas();

    for (let n = 0; n < numsArray.length; n++) {
      if (n == current) {
        animateSort(numsArray[n], "red");
      } else if (n == partition) {
        animateSort(numsArray[n], "blue");
      } else {
        animateSort(numsArray[n], "green");
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

async function swap(array, first, second) {
  await sleep(100);
  [array[first], array[second]] = [array[second], array[first]];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
