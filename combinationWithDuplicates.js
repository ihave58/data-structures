const exists = (collection, arrayElem) => {
    const foundElement = collection.find(elem => {
        let matchIndex = 0;

        elem.forEach(num => {
            if (num === arrayElem[matchIndex]) {
                matchIndex++;
            } else {
                matchIndex = 0;
            }
        });

        return matchIndex === arrayElem.length;
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
