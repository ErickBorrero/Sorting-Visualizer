function bubbleSort(numsArray) {
  let last = numsArray.length;

  while (last != 0) {
    last--;

    for (let count = 0; count < last; count++) {
      if (numsArray[count] > numsArray[count + 1]) {
        swap(numsArray, count, count + 1);
      }
    }
  }
  return numsArray;
}

function insertionSort(numsArray) {
  let length = numsArray.length;

  for (let unsortedIndex = 1; unsortedIndex < length; unsortedIndex++) {
    let current = numsArray[unsortedIndex];
    let sortedIndex = unsortedIndex - 1;

    while (sortedIndex >= 0 && numsArray[sortedIndex] > current) {
      numsArray[sortedIndex + 1] = numsArray[sortedIndex];
      sortedIndex--;
    }
    numsArray[sortedIndex + 1] = current;
  }

  return numsArray;
}

function bottomUpMergeSort(numbers) {
  var numsArray = [];

  if (numbers) {
    numsArray = numbers.map(function (number) {
      return number;
    });
  }

  bottomUpSort(numsArray, numsArray.length);

  return numsArray;
}

function bottomUpSort(numbers, n) {
  var width, i;

  for (width = 1; width < n; width = width * 2) {
    for (i = 0; i < n; i = i + 2 * width) {
      bottomUpMerge(
        numbers,
        i,
        Math.min(i + width, n),
        Math.min(i + 2 * width, n)
      );
    }
  }
}

function bottomUpMerge(numbers, left, right, end) {
  var n = left,
    m = right,
    currentSort = [],
    j;

  for (j = left; j < end; j++) {
    if (n < right && (m >= end || numbers[n] < numbers[m])) {
      currentSort.push(numbers[n]);
      n++;
    } else {
      currentSort.push(numbers[m]);
      m++;
    }
  }

  currentSort.map(function (number, i) {
    numbers[left + i] = number;
  });
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

var historyIndex = 0;
function draw() {
  background(51);
  for (i = 0; i < sortHist[historyIndex].length; i++) {
    let col = color(sortHist[historyIndex][i], height, height);
    stroke(col);
    fill(col);
    var location = map(i, 0, sortHist[historyIndex].length, 0, width);
    rect(
      location,
      height - sortHist[historyIndex][i],
      width / numLines,
      height
    );
  }
  historyIndex++;
  if (historyIndex > sortHist.length - 1) {
    noLoop();
  }
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

arr = [
  70,
  45,
  56,
  71,
  102,
  4,
  81,
  71,
  68,
  104,
  36,
  109,
  82,
  49,
  104,
  46,
  73,
  1,
  51,
  90,
  21,
  22,
  111,
  15,
  46,
];
let sortHist = mergeSort(arr);

console.log(sortHist);

var x = [1];

x[100] = 2;

console.log(x.length);
