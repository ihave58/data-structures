function swap(array, sourceIndex, targetIndex) {
    let temp;

    temp = array[sourceIndex];
    array[sourceIndex] = array[targetIndex];
    array[targetIndex] = temp;
}

function _binarySearch(array, item, startIndex, endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);

    if(item === array[midIndex]) {
        return midIndex;

    } else if(item < array[midIndex]) {
        return _binarySearch(
            array,
            item,
            startIndex,
            midIndex
        );

    } else if(item > array[midIndex]) {
        return _binarySearch(
            array,
            item,
            midIndex + 1,
            endIndex
        );

    }
}

function _mergeInPlace(array, startIndex, midIndex, endIndex) {
    let array1Index,
        array2Index,
        lastArray1Item;

    for(array2Index = endIndex; array2Index > midIndex; array2Index--) {

        lastArray1Item = array[midIndex];
        for(array1Index = midIndex - 1;
            (array1Index >= startIndex) && (array[array1Index] > array[array2Index]);
            array1Index--) {

            array[array1Index + 1] = array[array1Index];
        }

        if((array1Index != (midIndex - 1)) || (lastArray1Item > array[array2Index])) {
            array[array1Index + 1] = array[array2Index];
            array[array2Index] = lastArray1Item;
        }
    }
}

function mergeInPlace(array1, array2) {
    let startIndex = 0,
        midIndex = array1.length - 1,
        endIndex = midIndex + array2.length,
        array = array1.concat(array2);

    _mergeInPlace(array, startIndex, midIndex, endIndex);

    return array;
}

function merge(array1, array2) {
    let array1Index = 0,
        array2Index = 0,
        targetArray = [];

    while(array1Index < array1.length || array2Index < array2.length) {
        if(array1[array1Index] < array2[array2Index]) {
            targetArray.push(array1[array1Index]);

            array1Index++;
        } else {
            targetArray.push(array2[array2Index]);

            array2Index++;
        }
    }

    return targetArray;
}

function binarySearch(array, item) {
    let startIndex = 0,
        endIndex = array.length - 1;

    return _binarySearch(array, item, startIndex, endIndex);
}

function selectionSort(array) {
    let i,
        j,
        minItemIndex,
        timeComplexity = 0;

    array = array.slice();

    for(i = 0; i < array.length; i++) {
        minItemIndex = i;

        for(j = i + 1; j < array.length; j++) {
            if(array[j] < array[minItemIndex]) {
                minItemIndex = j;
            }

            timeComplexity++;
        }

        swap(array, minItemIndex, i);
    }

    console.log('timeComplexity:', timeComplexity);
    return array;
}

function bubbleSort(array) {
    let i = 0,
        j = i + 1,
        hasSwappedAtleastOnce,
        timeComplexity = 0;

    array = array.slice();

    for(i = 0; i < array.length; i++) {
        hasSwappedAtleastOnce = false;

        for(j = 0; j < (array.length - 1) && (hasSwappedAtleastOnce === false); j++) {
            if(array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                hasSwappedAtleastOnce = true;
            }

            timeComplexity++;
        }
    }

    console.log('timeComplexity:', timeComplexity);
    return array;
}

function insertionSort(array) {
    let i,
        j,
        item,
        timeComplexity = 0;

    array = array.slice();

    for(i = 1; i < array.length; i++) {

        item = array[i];
        for(j = i - 1; j >= 0 && array[j] > item; j--) {
            array[j + 1] = array[j];

            timeComplexity++;
        }

        array[j + 1] = item;
    }

    console.log('timeComplexity:', timeComplexity);
    return array;
}

function _mergeSort(array, startIndex, endIndex, complexity) {
    if(endIndex > startIndex) {
        let midIndex = Math.floor((startIndex + endIndex) / 2);

        _mergeSort(array, startIndex, midIndex, complexity);
        _mergeSort(array, midIndex + 1, endIndex, complexity);

        _mergeInPlace(array, startIndex, midIndex, endIndex);
    }

    complexity.time++;
}

function mergeSort(array) {
    let startIndex = 0,
        endIndex = array.length - 1,
        complexity = {
            time: 0
        };

    array = array.slice();

    _mergeSort(array, startIndex, endIndex, complexity);

    console.log('timeComplexity:', complexity.time);
    return array;
}

function doPartition(array, startIndex, endIndex) {
    let index = startIndex,
        sortedPartitionIndex = index - 1,
        pivot = array[endIndex];

    while(index < endIndex) {
        if(array[index] < pivot) {
            sortedPartitionIndex++;
            swap(array, sortedPartitionIndex, index);
        }

        index++;
    }

    sortedPartitionIndex++;
    swap(array, sortedPartitionIndex, endIndex);

    // console.log(array);
    return sortedPartitionIndex;
}

function _quickSort(array, startIndex, endIndex, complexity) {
    console.log(startIndex, endIndex);

    if(endIndex > startIndex) {
        let pivotIndex = doPartition(array, startIndex, endIndex);

        _quickSort(array, startIndex, pivotIndex - 1, complexity);
        _quickSort(array, pivotIndex + 1, endIndex, complexity);
    }

    complexity.time++;
}

function quickSort(array) {
    let startIndex = 0,
        endIndex = array.length - 1,
        complexity = {
            time: 0
        };

    array = array.slice();

    _quickSort(array, startIndex, endIndex, complexity);

    console.log('timeComplexity:', complexity.time);
    return array;
}