function permute(nums, startIndex = 0) {
    if (nums.length - startIndex === 2) {
        return [
            [nums[startIndex]],
            [nums[startIndex + 1]],
            [nums[startIndex], nums[startIndex + 1]],
            [nums[startIndex + 1], nums[startIndex]]
        ];
    } else {
        const first = nums[startIndex];
        const subPermutations = permute(nums, startIndex + 1);
        const permutations = [...subPermutations, [first]];

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

const array = [1, 2, 3, 4];
const permutations = permute(array);
console.log(permutations.map(permutation => permutation.join("")).sort((a, b) => Number(a) - Number(b)), permutations.length);