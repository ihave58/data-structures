function permute(array, startIndex = 0, length, selection, permutations) {
    if (array.length - startIndex < 2) {
        return array;
    }


    if (startIndex === array.length - 2) {
        return [
            [array[startIndex], array[startIndex + 1]],
            [array[startIndex + 1], array[startIndex]],
        ];
    }

    for (let index = startIndex; index < array.length; index++) {
        const subPermutations = permute(array, index + 1, selection, permutations);

        for (let i = 0; i < subPermutations.length; i++) {
            for (let j = 0; j <= subPermutations[i].length; j++) {
                const permutation = [...subPermutations[i]];
                permutation.splice(j, 0, array[startIndex]);

                permutations.push(permutation);
            }
        }
    }
}

const getPermutation = (n, k) => {
    const array = [];
    let index = 1;

    while (index <= n) {
        array.push(index);
        index++;
    }

    const permutations = [];
    permute(array, 0, k, [], permutations);

    return permutations;
};

console.dir(getPermutation(6, 4), { maxArrayLength: null });