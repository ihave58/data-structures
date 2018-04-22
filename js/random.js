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

function findMaximumProductTriplet(array) {
    let leftMaxArray = new Array(array.length),
        leftMinArray = new Array(array.length),
        rightMaxArray = new Array(array.length),
        rightMinArray = new Array(array.length),
        leftMinElement,
        leftMaxElement,
        rightMinElement,
        rightMaxElement,
        tripletProducts = [];

    for(let index = 1; index < array.length; index++) {
        leftMinElement = leftMinArray[index - 1] || array[0];
        leftMaxElement = leftMaxArray[index - 1] || array[0];

        leftMinArray[index] = Math.min(array[index - 1], leftMinElement);
        leftMaxArray[index] = Math.max(array[index - 1], leftMaxElement);
    }

    for(let index = array.length - 2; index >= 0; index--) {
        rightMinElement = rightMinArray[index + 1] || array[array.length - 1];
        rightMaxElement = rightMaxArray[index + 1] || array[array.length - 1];

        rightMinArray[index] = Math.min(array[index + 1], rightMinElement);
        rightMaxArray[index] = Math.max(array[index + 1], rightMaxElement);
    }

    for(let index = 1; index < array.length - 1; index++) {
        console.log(
            array[index] * leftMinArray[index] * rightMinArray[index],
            array[index] * leftMaxArray[index] * rightMaxArray[index],
            array[index] * leftMinArray[index] * rightMaxArray[index],
            array[index] * leftMaxArray[index] * rightMinArray[index]
        );

        tripletProducts.push(
            Math.max(
                array[index] * leftMinArray[index] * rightMinArray[index],
                array[index] * leftMaxArray[index] * rightMaxArray[index],
                array[index] * leftMinArray[index] * rightMaxArray[index],
                array[index] * leftMaxArray[index] * rightMinArray[index]
            )
        );
    }

    console.info(array);
    console.info(leftMinArray);
    console.info(rightMinArray);
    console.info(leftMaxArray);
    console.info(rightMaxArray);
    console.info(tripletProducts);

    return Math.max.apply(null, tripletProducts);
}
