const getProduct = (nums: Array<number>): number => {
    let product = 1;

    for (const num of nums) {
        product = product * num;
    }

    return product;
};

const getPossibleSubArrays = (nums: Array<number>, negativeIndices: Array<number>) => {
    const possibleSubArrays = [];

    for (const index of negativeIndices) {
        if (index > 0) {
            possibleSubArrays.push(nums.slice(0, index));
        }

        if (index < nums.length - 1) {
            possibleSubArrays.push(nums.slice(index + 1));
        }
    }

    return possibleSubArrays;
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

    if (zeroIndices.length) {
        const allPossibleSubArrays = getPossibleSubArrays(nums, zeroIndices);
        console.log(zeroIndices);

        let _maxProduct = Number.NEGATIVE_INFINITY;
        for (const subArray of allPossibleSubArrays) {
            const product = maxProduct(subArray);

            if (product > _maxProduct) {
                _maxProduct = product;
            }
        }

        return _maxProduct < 0 ? 0 : _maxProduct;
    }

    if (negativeIndices.length % 2) {
        if (negativeIndices.length === 1 && nums.length === 1) {
            return getProduct(nums);
        }

        const allPossibleSubArrays = getPossibleSubArrays(nums, negativeIndices);

        let maxProduct = Number.NEGATIVE_INFINITY;
        for (const subArray of allPossibleSubArrays) {
            const product = getProduct(subArray);

            if (product > maxProduct) {
                maxProduct = product;
            }
        }

        return maxProduct;
    } else {
        return getProduct(nums);
    }
};

// const nums = [1, 2, -1, 3, 0, 4, -2, 6, 1, -5, 4];
const nums = [0, 0];
console.log(maxProduct(nums));
