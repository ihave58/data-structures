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

            if (numbers[j] === numbers[j + 1]) {
                j++;
            }
        }
    }

    return result;
}

// const numbers = [0, 0, 0, 0, 0];
// const numbers = [1, 0, -1, 0, -2, 2];
const numbers = [0, 0, 4, -2, -3, -2, -2, -3];
console.log(fourSum(numbers, -1));
