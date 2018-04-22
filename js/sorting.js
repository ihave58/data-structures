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
        array1LastItem;

    const array1 = array.slice(startIndex, midIndex + 1);
    const array2 = array.slice(midIndex + 1, endIndex + 1);

    for(array2Index = endIndex; array2Index > midIndex; array2Index--) {

        array1LastItem = array[midIndex];
        for(array1Index = midIndex - 1;
            (array1Index >= startIndex) && (array[array1Index] > array[array2Index]);
            array1Index--) {

            array[array1Index + 1] = array[array1Index];
        }

        if((array1Index != (midIndex - 1)) || (array1LastItem > array[array2Index])) {
            array[array1Index + 1] = array[array2Index];
            array[array2Index] = array1LastItem;
        }
    }

    console.info('mergeInPlace:', array1, array2, array);
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

        console.info(array, i, j);
    }

    console.info('timeComplexity:', timeComplexity);
    return array;
}

function bubbleSort(array) {
    let i = 0,
        j = i + 1,
        hasSwapped,
        timeComplexity = 0;

    array = array.slice();

    for(i = 0; i < array.length; i++) {

        hasSwapped = false;
        for(j = 0; j < (array.length - 1); j++) {
            if(array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                hasSwapped = true;
            }

            timeComplexity++;
        }

        if(!hasSwapped) {
            break;
        }

        console.info(array, i, j);
    }

    console.info('timeComplexity:', timeComplexity);
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

        console.info(array, i, j);
    }

    console.info('timeComplexity:', timeComplexity);
    return array;
}

function _mergeSort(array, startIndex, endIndex, complexity) {
    console.info('sort:', array.slice(startIndex, endIndex + 1));

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

    console.info('timeComplexity:', complexity.time);
    return array;
}

function partitionPivot(array, startIndex, endIndex) {
    let index = startIndex,
        sortedPartitionIndex = index - 1,
        pivot = array[endIndex];

    while(index < endIndex) {
        if(array[index] < pivot) {

            sortedPartitionIndex++;
            swap(array, sortedPartitionIndex, index);
            console.info('swap:', array[index], array[sortedPartitionIndex], array);
        }

        index++;
    }

    sortedPartitionIndex++;
    swap(array, sortedPartitionIndex, endIndex);
    console.info('swap-:', array[endIndex], array[sortedPartitionIndex], array);

    console.info(array);
    return sortedPartitionIndex;
}

function _quickSort(array, startIndex, endIndex, complexity) {
    if(endIndex > startIndex) {
        let pivotIndex = partitionPivot(array, startIndex, endIndex);

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

    console.info('timeComplexity:', complexity.time);
    return array;
}

function heapify(array, heapSize, index, complexity) {
    let smallestElemIndex = index,
        leftChildIndex = 2 * index + 1,
        rightChildIndex = 2 * index + 2;

    complexity.time++;

    // If left child is larger than root
    if(leftChildIndex < heapSize && array[leftChildIndex] > array[smallestElemIndex])
        smallestElemIndex = leftChildIndex;

    // If right child is larger than largest so far
    if(rightChildIndex < heapSize && array[rightChildIndex] > array[smallestElemIndex])
        smallestElemIndex = rightChildIndex;

    // If largest is not root
    if(smallestElemIndex != index) {
        swap(array, index, smallestElemIndex);

        // Recursively heapify the affected sub-tree
        heapify(array, heapSize, smallestElemIndex, complexity);
    }
}

function heapSort(array) {
    let heapIndex,
        complexity = {
            time: 0
        };

    array = array.slice();

    for(heapIndex = (Math.floor(array.length / 2) - 1); heapIndex >= 0; heapIndex--) {
        heapify(array, array.length, heapIndex, complexity);
    }

    for(heapIndex = array.length - 1; heapIndex >= 0; heapIndex--) {
        // Move current root to end
        swap(array, 0, heapIndex);

        // call max heapify on the reduced heap
        heapify(array, heapIndex, 0, complexity);
    }

    console.info('timeComplexity:', complexity.time);
    return array;
}

function findPivot(array, startIndex, endIndex) {
    if(startIndex > endIndex) {
        return -1;
    } else if(startIndex === endIndex) {
        return startIndex;
    }

    const midIndex = divideByTwo(endIndex + startIndex);

    if((midIndex < endIndex) && (array[midIndex] > array[midIndex + 1])) {
        return midIndex;
    } else if((midIndex > startIndex) && (array[midIndex - 1] > array[midIndex])) {
        return midIndex - 1;
    } else if(array[startIndex] >= array[midIndex]) {
        return findPivot(array, startIndex, midIndex - 1);
    } else {
        return findPivot(array, midIndex + 1, endIndex);
    }
}

function pivotBinarySearch(array, item) {
    const pivotIndex = findPivot(array, 0, array.length - 1);

    if(pivotIndex === -1) {
        return _binarySearch(array, item, 0, array.length - 1);
    }

    if(array[pivotIndex] === item) {
        return pivotIndex;
    } else if(array[0] < item) {
        return _binarySearch(array, item, 0, pivotIndex - 1);
    } else {
        return _binarySearch(array, item, pivotIndex + 1, array.length - 1);
    }
}
