const findSum = (numbers, target, result, combination, startIndex) => {
    // console.log("#", target, combination);

    if (target === 0) {
        result.push([...combination]);
    }

    if (target <= 0) {
        return;
    }

    for (let index = startIndex; index < numbers.length; index++) {
        if (index === startIndex || numbers[index] !== numbers[index - 1]) {
            const numbersWithoutThatIndex = numbers.slice();
            numbersWithoutThatIndex.splice(index, 1);

            findSum(numbersWithoutThatIndex, target - numbers[index], result, [...combination, numbers[index]], index);
        }
    }
}

const combinationSum = (numbers, target) => {
    const result = [];
    const sortedArray = numbers.sort((a, b) => a - b);

    findSum(sortedArray, target, result, [], 0);
    return result;
};


const _combinationSum3 = (numbers, target, startIndex = 0) => {
    if(target === 0) {
        return [[]];
    } else if(target < 0) {
        return false;
    }

    const allCombinations = [];

    for(let index = startIndex; index < numbers.length; index++) {
        if(true || numbers[index] !== numbers[index - 1]) {
            const subCombinations = _combinationSum3(numbers, target - numbers[index], index + 1);

            if(subCombinations !== false) {
                allCombinations.push(...subCombinations.map(subCombination => [numbers[index], ...subCombination]));
            }    
        }
    }

    return allCombinations;
}


const combinationSum3 = (numbers, target) => {
    const sortedNumbers = numbers.sort((a, b) => a - b);

    return _combinationSum3(sortedNumbers, target, 0);
}


// const numbers = [2, 4, 3, 5];
const numbers = [10, 1, 2, 7, 6, 1, 5];
// const numbers = [10, 1, 2, 7, 6, 1, 5];
console.log(combinationSum(numbers, 8));
console.log(combinationSum3(numbers, 8));