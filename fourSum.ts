function fourSum(nums: number[], target: number): number[][] {
    if (nums.length < 3) {
        return [];
    }

    const numbers = nums.sort((a, b) => a - b);
    const result = [];

    console.log(numbers);

    for (let i = 0; i < numbers.length - 3; i++) {
        if (numbers[i] === numbers[i - 1]) {
            continue;
        }

        for (let j = i + 1; j < numbers.length - 2; j++) {
            let k = j + 1,
                l = numbers.length - 1;

            while (k < l) {
                console.log(i, j, k, l);
                const sum = numbers[i] + numbers[j] + numbers[k] + numbers[l];

                if (sum === target) {
                    console.log('-');
                    const pair = [numbers[i], numbers[j], numbers[k], numbers[l]].sort(
                        (a, b) => a - b
                    );

                    result.push(pair);
                    do {
                        k++;
                    } while (numbers[k] === numbers[k - 1]);
                } else if (sum < target) {
                    do {
                        k++;
                    } while (numbers[k] === numbers[k - 1]);
                } else {
                    l--;
                }
            }

            while (numbers[j] === numbers[j + 1]) {
                j++;
            }
        }
    }

    return result;
}

// const numbers = [0, 0, 0, 0, 0];
// const numbers = [1, 0, -1, 0, -2, 2];
// const numbers = [0, 0, 4, -2, -3, -2, -2, -3];

const numbers = [
    -479, -472, -469, -461, -456, -420, -412, -403, -391, -377, -362, -361, -340, -336, -336, -323, -315,
    -301, -288, -272, -271, -246, -244, -227, -226, -225, -210, -194, -190, -187, -183, -176, -167, -143, -140, -123,
    -120, -74, -60, -40, -39, -37, -34, -33, -29, -26, -23, -18, -17, -11, -9, 6, 8, 20, 29, 35, 45, 48, 58, 65,
    122, 124, 127, 129, 145, 164, 182, 198, 199, 206, 207, 217, 218, 226, 267, 274, 278, 278, 309, 322, 323, 327,
    350, 361, 372, 376, 387, 391, 434, 449, 457, 465, 488
];
console.log(fourSum(numbers, 1979));
