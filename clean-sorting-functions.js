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

console.log(quickSort(arr));
