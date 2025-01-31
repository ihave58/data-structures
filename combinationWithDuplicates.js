const exists = (collection, searchArray) => {
    const foundElement = collection.find(array => {
        let startIndex = 0;

        while(startIndex < searchArray.length && startIndex < array.length && array[startIndex] === searchArray[startIndex]) {
            startIndex++;
        }

        return startIndex === searchArray.length && startIndex === array.length;
    });

    return !!foundElement;
}

const findCombination = (array, startIndex = 0, combinations, selection) => {
    if (startIndex > array.length) {
        return;
    }

    if(!exists(combinations, selection)) {
        combinations.push(selection);
    }

    for (let index = startIndex; index <= array.length; index++) {
        findCombination(array, index + 1, combinations, [...selection, array[index]]);

        if (array[index] === array[index + 1]) {
            index++;
        }
    }
};

var subsetsWithDup = function (nums) {
    const combinations = [];
    const sortedNumbers = nums.sort((a, b) => a - b);

    findCombination(sortedNumbers, 0, combinations, []);

    return combinations;
};

// const array = [1, 1, 1, 1, 1];
const array = [1, 2, 2];
console.log(subsetsWithDup(array));


