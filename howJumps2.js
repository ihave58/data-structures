const howJumps = (numbers) => {
    if (numbers.length <= 1) {
        return [
            [numbers[numbers.length - 1]]
        ];
    }

    let jumps = [];
    for (let index = 0; index < numbers[0]; index++) {
        jumpsFromIndex = howJumps(numbers.slice(1 + index));
        jumps.push(...jumpsFromIndex.map(jumpFromIndex => [numbers[0], ...jumpFromIndex]));
    }

    return jumps;
}

const numbers = [2, 3, 1, 1, 4];
// const numbers = [3,2,1,0,4];
const jumps = howJumps(numbers);
console.log(JSON.stringify(jumps));