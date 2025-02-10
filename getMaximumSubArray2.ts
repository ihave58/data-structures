const getProduct = (nums: Array<number>, startIndex: number, endIndex: number): number => {
    let product = 1;

    for (let index = startIndex; index <= endIndex; index++) {
        product = product * nums[index];
    }

    return product;
};

const getPossibleSubArrayIndices = (
    partitionIndices: Array<number>,
    startIndex: number,
    endIndex: number
) => {
    const possibleSubArrayIndices = [];

    for (const index of partitionIndices) {
        if (index > startIndex) {
            possibleSubArrayIndices.push([startIndex, index - 1]);
        }

        if (index < endIndex - 1) {
            possibleSubArrayIndices.push([index + 1, endIndex - 1]);
        }
    }

    return possibleSubArrayIndices;
};

const getIndicesInRange = (indices: Array<number>, startIndex: number, endIndex: number) => {
    return indices.filter((index) => index >= startIndex && index <= endIndex);
};

const getMaxProduct = (
    nums: Array<number>,
    zeroIndices: Array<number>,
    negativeIndices: Array<number>,
    startIndex: number,
    endIndex: number
): number => {
    console.log('#getMaxProduct', startIndex, endIndex);

    const numsInRange = nums.slice(startIndex, endIndex + 1);
    const zeroIndicesInRange = getIndicesInRange(zeroIndices, startIndex, endIndex);
    const negativeIndicesInRange = getIndicesInRange(negativeIndices, startIndex, endIndex);

    if (zeroIndicesInRange.length) {
        if (numsInRange.length === zeroIndicesInRange.length) {
            return 0;
        }

        const possibleSubArrayIndices = getPossibleSubArrayIndices(
            zeroIndicesInRange,
            startIndex,
            endIndex
        );

        let maxProduct = Number.NEGATIVE_INFINITY;
        for (const [possibleStartIndex, possibleEndIndex] of possibleSubArrayIndices) {
            const product = getMaxProduct(
                nums,
                zeroIndices,
                negativeIndices,
                startIndex + possibleStartIndex,
                startIndex + possibleEndIndex
            );

            if (product > maxProduct) {
                maxProduct = product;
            }
        }

        return maxProduct < 0 ? 0 : maxProduct;
    }

    if (negativeIndicesInRange.length) {
        if (negativeIndicesInRange.length % 2) {
            if (negativeIndicesInRange.length === 1 && numsInRange.length === 1) {
                return getProduct(nums, startIndex, endIndex);
            }

            const possibleSubArrayIndices = getPossibleSubArrayIndices(
                negativeIndicesInRange,
                startIndex,
                endIndex
            );

            let maxProduct = Number.NEGATIVE_INFINITY;
            for (const [possibleStartIndex, possibleEndIndex] of possibleSubArrayIndices) {
                const product = getProduct(
                    nums,
                    startIndex + possibleStartIndex,
                    startIndex + possibleEndIndex
                );

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }

            return maxProduct;
        } else {
            return getProduct(nums, startIndex, endIndex);
        }
    }

    return getProduct(nums, startIndex, endIndex);
};

const maxProduct = (nums: Array<number>): number => {
    const negativeIndices = [];
    const zeroIndices = [];

    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 0) {
            zeroIndices.push(index);
        } else if (nums[index] < 0) {
            negativeIndices.push(index);
        }
    }

    console.log(nums.length, zeroIndices, negativeIndices);

    return getMaxProduct(nums, zeroIndices, negativeIndices, 0, nums.length - 1);
};

// const nums = [1, 2, -1, 3, 0, 4, -2, 6, 1, -5, 4];
// const nums = [-2, 0, -1];

// const nums = [0, 0, 0, 0];

const nums = [
    0, -1, 3, 1, 0, 2, 1, -1, 0, 5, -1, -3, -6, -5, 0, 6, 6, -6, -5, 4, -2, -1, 0, 4, 6, -3, 1,
    -1, 0, 1, -5, 5, -3, -3, -3, -1, -1, 4, 0, -2, -4, 3, 5, 5, -1, -1, -5, -2, -4, -4, 6, 0,
    -3, -1, -5, -1, 0, 1, -4, -5, 0, 0, 0, -3,
];
//
// const nums = [
//     1, -5, 6, -5, 2, -4, -5, 0, 3, 2, -4, 0, -5, -3, -1, -4, -1, 4, 1, -1, -3, -1, 1, 3, -4, -6,
//     -2, 5, 1, -5, 0, -1, -5, 0, 1, 2, 6, 1, 2, -6, 5, 5, 0, 1, 0, 1, 1, -1, -1, 3, 1, 0, 4, -3,
//     0, 4, -4, -1, 6, 5, 5, 6, -6, 1, 1, 3, 4, 3, -1, -3, 0, -5, -4, 1, 5, -2, 3, -1, 2, 1, 1, 6,
//     0, 5, -5, 6, -6, 3, 0, 4, -1, 3, 6, 0, -2, 0, -1, 6, 4, 1, -5, 1, 0, 1, -1, -1, 3, 5, 5, 4,
//     2, 5, 0, -1, 5, 2, 2, -3, -1, -1, 0, -6, -2, -5, 1, -2, 2, 0, 0, 2, -3, -2, -4, 1, 1, -4,
//     -3, -1, 0, 0, 1, -3, -2, 3, -4, 5, 2, -1, 4, 1, 5, 6, 0, 1, 1, -2, -1, 0, -1, -5, 5, 6, 6,
//     -1, -1, 0, -4, 2, 1, 3, -5, 6, -5, -1, -1, -3, -1, -4, -2, -1, -1, 1, -3, -4, 0, 1, -3, 4,
//     3, 2, -2, 6, -3, -6, -6, -2, -5, 1, 2, 0, -1, 0, 0, -2, 3, -4, 2, 4, 3, -1, 3, 1, 0, 2, 1,
//     -1, 0, 5, -1, -3, -6, -5, 0, 6, 6, -6, -5, 4, -2, -1, 0, 4, 6, -3, 1, -1, 0, 1, -5, 5, -3,
//     -3, -3, -1, -1, 4, 0, -2, -4, 3, 5, 5, -1, -1, -5, -2, -4, -4, 6, 0, -3, -1, -5, -3, -1, 6,
//     1, -5, -1, 0, 1, -4, -5, 0, 0, 0, -3, -5, -1, -4, -1, 5, 5, -4, 4, -1, 6, -1, 1, -1, 2, -2,
//     -3, 0, 1, 0, 0, -3, 0, 2, 5, -6, -3, -3, 3, -4, -2, -6, -1, 1, 4, 4, 0, -6, -5, -6, -3, 5,
//     -3, 1, -4, 6, -2, 0, -4, -1, 0, -1, 0, 6, -6, 0, 5, 0, 1, -3, 6, 1, -1, 1, 0, -1, 1, -1, -6,
//     -3, 4, -1, -4, 6, 4, -1, -3, 2, -6, 5, 0, 4, -2, 1, 0, 4, -2, 2, 0, 0, 5, 5, -3, 4, 3, -5,
//     2, 2, 6, -1, -2, 1, -3, 1, -1, 6, -4, 0, 0, 0, 2, -5, -4, 2, 6, -3, -6, -1, -6, 0, 0, 2, -1,
//     6, -4, -5, -1, 0, -3, -3, -1, 0, -4, 3, 1, 5, 0, 2, 5, 0, 4, -5, -1, 3, 1, -1, -1, 1, 1, -2,
//     3, 5, 4, 6, 2, 6, -6, 5, 2, -3, 0, -1, -1, 3, 1, 1, 1, -2, -5, 3, -1, 3, 0, -1, 3, 1, 1, -2,
//     6, 3, -6, 5, -5, -5, 0, -2, -3, -3, -4, 6, -1, -6, 6, -3, -5, 1, -1, 0, 0, 1, 4, -5, 0, 1,
//     -2, 6, 1, -3, -5, 0, 4, -2, 1, -5, -4, 0, 0, -1, -2, 0, 2, -2, 5, 6,
// ];
console.log(maxProduct(nums));
