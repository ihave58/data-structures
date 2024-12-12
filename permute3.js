const permute = (nums, startIndex = 0) => {
    if (nums.length - startIndex < 2) {
        return [nums];
    } else if (nums.length - startIndex === 2) {
        return [
            [nums[startIndex], nums[startIndex + 1]],
            [nums[startIndex + 1], nums[startIndex]]
        ];
    } else {
        const permutations = [];
        const first = nums[startIndex];
        const subPermutations = permute(nums, startIndex + 1);

        for (let i = 0; i < subPermutations.length; i++) {
            for (let j = 0; j <= subPermutations[i].length; j++) {
                const permutation = [...subPermutations[i]];
                permutation.splice(j, 0, first);

                permutations.push(permutation);
            }
        }

        return permutations;
    }
};


const getPermutation = (n, k) => {
    const array = [];
    let index = 1;

    while (index <= n) {
        array.push(index);
        index++;
    }

    const allPermutations = permute(array, 0);
    const sortedPermutations = allPermutations.sort((a, b) => Number(a.join("")) - Number(b.join("")));

    return sortedPermutations[k];
};

console.dir(getPermutation(9, 24), { maxArrayLength: null });