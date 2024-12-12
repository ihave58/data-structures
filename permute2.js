function permute(nums, startIndex = 0) {
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

console.dir(permute([1, 2, 3]), { maxArrayLength: null });