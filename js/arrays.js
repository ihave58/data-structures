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
            (array1Index >= startIndex) && (array[array1Index] > array[array2Index]); array1Index--) {

            array[array1Index + 1] = array[array1Index];
        }

        if((array1Index != (midIndex - 1)) || (lastArray1Item > array[array2Index])) {
            array[array1Index + 1] = array[array2Index];
            array[array2Index] = lastArray1Item;
        }
    }
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
        minItemIndex;

    array = array.slice();

    for(i = 0; i < array.length; i++) {
        minItemIndex = i;

        for(j = i + 1; j < array.length; j++) {
            if(array[j] < array[minItemIndex]) {
                minItemIndex = j;
            }
        }

        swap(array, minItemIndex, i);
    }

    return array;
}

function bubbleSort(array) {
    let i = 0,
        j = i + 1,
        hasSwappedOnce = false;

    array = array.slice();

    for(i = 0; i < array.length; i++) {
        for(j = 0; j < array.length - 1; j++) {
            if(array[j] > array[j + 1]) {
                console.log('Swapping:', array[j], array[j + 1]);
                swap(array, j, j + 1);
            }
        }

        console.log(array);
    }

    return array;
}

function insertionSort(array) {
    let i,
        j,
        item;

    array = array.slice();

    for(i = 1; i < array.length; i++) {

        item = array[i];
        j = i - 1;

        while(j >= 0 && array[j] > item) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = item;
    }

    return array;
}

function _mergeSort(array, startIndex, endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);

    if(endIndex > startIndex) {
        _mergeSort(array, startIndex, midIndex);
        _mergeSort(array, midIndex + 1, endIndex);

        _mergeInPlace(array, startIndex, midIndex, endIndex);
    }
}

function mergeSort(array) {
    let startIndex = 0,
        endIndex = array.length - 1;

    array = array.slice();

    _mergeSort(array, startIndex, endIndex);

    return array;
}

function mergeInPlace(array1, array2) {
    let startIndex = 0,
        midIndex = array1.length - 1,
        endIndex = midIndex + array2.length,
        array = array1.concat(array2);

    _mergeInPlace(array, startIndex, midIndex, endIndex);

    return array;
}