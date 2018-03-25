/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    var sum,
        headIndex = 0,
        tailIndex = nums.length - 1;

    nums.sort();

    while(headIndex < tailIndex) {
        sum = nums[headIndex] + nums[tailIndex];

        if(sum < target) {
            headIndex++;
        } else if(sum > target) {
            tailIndex++;
        } else {
            return [headIndex, tailIndex];
        }
    }
}

function isEven(number) {
    return !(number % 2);
}

function divideByTwo(number) {
    return Math.floor(number / 2);
}

function findMedian(sortedArray) {
    let median,
        arrayLength = sortedArray.length;

    if(isEven(arrayLength)) {
        median = (sortedArray[divideByTwo(arrayLength)] + sortedArray[divideByTwo(arrayLength) - 1]) / 2;
    } else {
        median = sortedArray[divideByTwo(arrayLength)];
    }

    return median;
}

function _getMedian(sortedArray1, sortedArray2) {
    let median1,
        median2,
        length = sortedArray1.length;

    console.info(sortedArray1, sortedArray2);

    if(length <= 0) {
        throw new Error('invalidArrayLengthException');
    }

    if(length === 1) {
        return divideByTwo(sortedArray1[0] + sortedArray2[0]);
    }

    if(length === 2) {
        return (Math.max(sortedArray1[0], sortedArray2[0]) + Math.min(sortedArray1[1], sortedArray2[1])) / 2;
    }

    median1 = findMedian(sortedArray1);
    median2 = findMedian(sortedArray2);
    console.log('medians:', median1, median2);

    if(median1 < median2) {
        if(isEven(length)) {
            return _getMedian(
                sortedArray1.slice(divideByTwo(length) - 1),
                sortedArray2.slice(0, divideByTwo(length))
            );
        } else {
            return _getMedian(
                sortedArray1.slice(divideByTwo(length)),
                sortedArray2.slice(0, divideByTwo(length) + 1)
            );
        }

    } else if(median1 > median2) {
        if(isEven(length)) {
            return _getMedian(
                sortedArray1.slice(0, divideByTwo(length) + 1),
                sortedArray2.slice(divideByTwo(length) - 1)
            );
        } else {
            return _getMedian(
                sortedArray1.slice(0, divideByTwo(length) + 1),
                sortedArray2.slice(divideByTwo(length))
            );
        }

    } else {
        return median1;
    }
}

function getMedian(sortedArray1, sortedArray2) {
    return _getMedian(sortedArray1, sortedArray2, sortedArray1.length);
}