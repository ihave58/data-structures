const findSum = (array, result, combination, target, startIndex = 0) => {
    // console.log("#", startIndex, target, combination);

    if (target === 0) {
        result.push([...combination]);
    }

    if (target <= 0) {
        return;
    }

    for (let index = startIndex; index < array.length; index++) {
        findSum(array, result, [...combination, array[index]], target - array[index], index + 1);

        while (array[index] === array[index + 1]) {
            index++;
        }
    }
}

const combinationSum = (array, target) => {
    const result = [];
    const sortedArray = array.sort((a, b) => a - b);
    console.log(sortedArray);


    findSum(sortedArray, result, [], target);
    return result;
};

const array = [10, 1, 2, 7, 6, 1, 5];
console.log(combinationSum(array, 8));