function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) {
        return [];
    }

    const sortedNumbers = nums.sort((a, b) => a - b);
    const triplets = [];

    console.log(sortedNumbers);

    for (let i = 0; i < sortedNumbers.length - 2; i++) {
        let j = i + 1,
            k = sortedNumbers.length - 1;

        if (sortedNumbers[i] === sortedNumbers[i - 1]) {
            continue;
        }

        while (j < k) {
            console.log(i, j, k);
            const sum = sortedNumbers[i] + sortedNumbers[j] + sortedNumbers[k];

            if (sum === 0) {
                console.log('-');
                const triplet = [sortedNumbers[i], sortedNumbers[j], sortedNumbers[k]].sort((a, b) => a - b);

                triplets.push(triplet);
                do {
                    j++;
                } while (sortedNumbers[j] === sortedNumbers[j + 1])
            } else if (sum < 0) {
                do {
                    j++;
                } while (sortedNumbers[j] === sortedNumbers[j + 1])
            } else {
                k--;
            }
        }
    }

    return triplets;
}

// const nums = [0, 0, 0, 0, 0];
const nums = [-1, 0, 1, 2, -1, -4];
// const nums = [3, 0, -2, -1, 1, 2];
console.log(threeSum(nums));
