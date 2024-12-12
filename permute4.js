const permute = (nums, startIndex = 0, size, permutations, selection) => {
    if()
};


const getPermutation = (n, size) => {
    const array = [];
    let index = 1;

    while (index <= n) {
        array.push(index);
        index++;
    }
    const permutations = [];
    permute(array, 0, size, permutations, []);

    return permutations;
};

console.dir(getPermutation(4, 2), { maxArrayLength: null });