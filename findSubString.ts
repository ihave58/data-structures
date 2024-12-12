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

const findStringIndices = (string, needle, startIndex = 0) => {
    // console.log(string, startIndex);

    const indices = [];
    const subString = string.substring(startIndex);
    let index = subString.indexOf(needle);


    if (index > -1) {
        const absoluteIndex = startIndex + index;
        const otherIndices = findStringIndices(string, needle, absoluteIndex + 1);

        indices.push(absoluteIndex, ...otherIndices);
    }

    return indices;
}

const findMatches = (string, needles) => {
    const matches = [];

    needles.forEach(needle => {
        const indices = findStringIndices(string, needle);

        indices.forEach(index => {
            if (!matches.includes(index)) {
                matches.push(index);
            }
        });
    });

    return matches;
}

const findSubstring = function(string, words) {
    const permutationLength = words.length > 0 ? (words[0].length * words.length) : 0;
    console.log(string.length, permutationLength);

    let index = 0;
    let hasFound = false;

    do {
        hasFound = string.includes(words[index]);
        index++;
    } while (hasFound)

    if ((string.length < permutationLength) || (!hasFound)) {
        return [];
    }

    console.log("###");
    const permutations = permute(words);
    const permutationStrings = permutations.map(permutation => permutation.join(""));

    return findMatches(string, permutationStrings);
};


console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"]));
// console.log(findSubstring("fffffffffffffffffffffffffffffffff", ["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"]));
// console.log(permute(["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]).length);