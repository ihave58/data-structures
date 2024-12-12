const _howSum = (numbers, target, result, combination, startIndex) => {
    // console.log("#", target, combination);

    if (target === 0) {
        result.push([...combination]);
    }

    if (target <= 0) {
        return;
    }

    for (let index = startIndex; index < numbers.length; index++) {
        const numbersWithoutThatIndex = numbers.slice();
        numbersWithoutThatIndex.splice(index, 1);

        _howSum(numbersWithoutThatIndex, target - numbers[index], result, [...combination, numbers[index]], index);
    }
}

const howSum = (numbers, target) => {
    const result = [];

    _howSum(numbers, target, result, [], 0);
    return result;
};

const numbers = [2, 4, 3, 5, 6, 7];
// const numbers = [10, 1, 2, 7, 6, 1, 5];
console.log(howSum(numbers, 16));