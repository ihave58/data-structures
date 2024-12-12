const _howSum = (numbers, target, counter, result, combination = [], startIndex = 0) => {
    // console.log("#", target, combination, startIndex);
    counter.value++;

    if (target === 0) {
        result.push([...combination]);
    }

    if (target <= 0) {
        return;
    }

    for (let index = startIndex; index < numbers.length; index++) {
        _howSum(numbers, target - numbers[index], counter, result, [...combination, numbers[index]], index);
    }
}

const howSum = (numbers, target) => {
    const result = [];
    const counter = { value: 0 };

    _howSum(numbers, target, counter, result);

    console.log("#counter", counter.value)
    return result;
};

const numbers = [2, 4, 3,];
// const numbers = [10,1,2,7,6,1,5];
console.log(howSum(numbers, 6));