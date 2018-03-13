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

function findMedian(sortedArray) {
    let median,
        arrayLength = sortedArray.length;

    if(isEven(arrayLength)) {
        median = (sortedArray[Math.floor(arrayLength / 2)] + sortedArray[Math.floor(arrayLength / 2) - 1]) / 2;
    } else {
        median = sortedArray[Math.floor(arrayLength / 2)];
    }

    return median;
}

function _getMedian(sortedArray1, sortedArray2, length) {
    let median1,
        median2;

    console.info(sortedArray1, sortedArray2, length);

    if(length <= 0) {
        throw new Error('invalidLengthException');
    }

    if(length === 1) {
        return Math.floor((sortedArray1[0] + sortedArray2[0]) / 2);
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
                sortedArray1.slice(Math.floor(length / 2) - 1),
                sortedArray2.slice(0, (Math.floor(length / 2) - 1) + 1),
                length - (Math.floor(length / 2) - 1)
            );
        } else {
            return _getMedian(
                sortedArray1.slice(Math.floor(length / 2)),
                sortedArray2.slice(0, Math.floor(length / 2) + 1),
                length - Math.floor(length / 2)
            );
        }

    } else if(median1 > median2) {
        if(isEven(length)) {
            return _getMedian(
                sortedArray1.slice(0, Math.floor(length / 2) + 1),
                sortedArray2.slice(Math.floor(length / 2) - 1),
                length - Math.floor(length / 2) + 1
            );
        } else {
            return _getMedian(
                sortedArray1.slice(0, Math.floor(length / 2) + 1),
                sortedArray2.slice(Math.floor(length / 2)),
                length - Math.floor(length / 2)
            );
        }

    } else {
        return median1;
    }
}

function getMedian(sortedArray1, sortedArray2) {
    return _getMedian(sortedArray1, sortedArray2, sortedArray1.length);
}