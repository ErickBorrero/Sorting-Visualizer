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

function swap(array, first, second) {
  [array[first], array[second]] = [array[second], array[first]];
}

// function mergeSort(numsArray) {
//   if (numsArray.length <= 1) {
//     return numsArray;
//   }

//   const mid = Math.floor(numsArray.length / 2);
//   const left = numsArray.slice(0, mid);
//   const right = numsArray.slice(mid);

//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge(a, b) {
//   let merged = [];
//   let aIndex = 0;
//   let bIndex = 0;

//   while (aIndex < a.length && bIndex < b.length) {
//     if (a[aIndex] < b[bIndex]) {
//       merged.push(a[aIndex]);
//       aIndex++;
//     } else {
//       merged.push(b[bIndex]);
//       bIndex++;
//     }
//   }

//   return merged.concat(a.slice(aIndex)).concat(b.slice(bIndex));
// }

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

console.log(bottomUpMergeSort(arr));

// document.getElementById("merge-sort-description").hidden = false;
