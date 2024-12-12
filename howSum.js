const howSum = (numbers, target, counter) => {
    // console.log("#target", target);
    counter.value++;
    if (target === 0) return [[]];
    if (target < 0) return null;

    let allPaths = [];
    for (let number of numbers) {
        // console.log("#number", number);
        const subPaths = howSum(numbers, target - number, counter); // [[1,2,3], [2,3,4]]
        // console.log("<-");
        if (subPaths !== null) {
            const numberSubPaths = subPaths.map(subPath => [...subPath, number]);
            allPaths.push(...numberSubPaths);
        }
    }

    // console.log("#allPaths", allPaths);
    return allPaths;
}

const array = [2, 4, 3];
const counter = { value: 0 };
// const array = [10,1,2,7,6,1,5];
console.log(howSum(array, 6, counter), counter.value);