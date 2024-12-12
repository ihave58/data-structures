const findSum = (array, result, combination, target, startIndex) => {
	// console.log("#", startIndex, target, combination);

    if (target === 0) {
        result.push([...combination]);
    }

    if (target <= 0) {
        return;
    }

    for (let index = startIndex; index < array.length; index++) {
        findSum(array, result, [...combination, array[index]], target - array[index], index);
    }
}

const combinationSum = (array, target) => {
    const result = [];

    findSum(array, result, [], target, 0);
    return result;
};

const array = [2, 4, 3, 5];
// const array = [10, 1, 2, 7, 6, 1, 5];
console.log(combinationSum(array, 8));