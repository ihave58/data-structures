function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) {
        return [];
    }

    const sortedNumbers = nums.sort((a, b) => a - b);
    const visitedKeys = new Set();
    const triplets = [];

    // console.log(sortedNumbers);

    for (let i = 0; i < sortedNumbers.length; i++) {
        let j = i + 1,
            k = sortedNumbers.length - 1;

        while (j < k) {
            // console.log(i, j, k);

            const sum = sortedNumbers[i] + sortedNumbers[j] + sortedNumbers[k];

            if (sum === 0) {
                const triplet = [sortedNumbers[i], sortedNumbers[j], sortedNumbers[k]].sort((a, b) => a - b);
                const tripletKey = triplet.join('');

                if (!visitedKeys.has(tripletKey)) {
                    triplets.push(triplet);
                    visitedKeys.add(tripletKey);
                }

                j++;
            } else if (sum < 0) {
                j++;
            } else {
                k--;
            }
        }
    }

    return triplets;
};

const nums = [3, 0, -2, -1, 1, 2];
console.log(threeSum(nums));
