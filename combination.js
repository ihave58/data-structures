const findCombination = (array, startIndex = 0, combinations, selection) => {
    if (startIndex > array.length) {
        return;
    }

    combinations.push(selection);

    for (let index = startIndex; index <= array.length; index++) {
        findCombination(array, index + 1, combinations, [...selection, array[index]]);
    }
};

function subsets(nums) {
    const combinations = [];
    findCombination(nums, 0, combinations, []);

    return combinations;
};

const array = [1,2,3];
console.log(subsets(array));
