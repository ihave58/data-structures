const howJumps = (numbers, debugInfo, cache) => {
    if (cache.has(numbers.length)) {
        // console.log("cache hit...", numbers.length);
        return cache.get(numbers.length);
    }

    debugInfo.counter++;

    if (numbers.length === 0) {
        return [];
    }

    if (numbers.length === 1) {
        return [
            [numbers[numbers.length - 1]]
        ];
    }

    let jumps = [];
    const minimumJump = Math.min(numbers[0], numbers.length);

    for (let index = 0; index < minimumJump; index++) {
        const _numbers = numbers.slice(index + 1);

        if (_numbers.length) {
            jumpsFromIndex = howJumps(_numbers, debugInfo, cache);

            jumps.push(...jumpsFromIndex.map(jumpFromIndex => [numbers[0], ...jumpFromIndex]));
        }
    }

    // cache.set(numbers.length, jumps);

    return jumps;
}

const numbers = [2, 3, 1, 1, 4];
// const numbers = [999999999, 99999999, 9999999, 999999, 99999, 9999, 999];
// const numbers = [3,2,1,0,4];

const debugInfo = {
    counter: 0
};

const cache = new Map();
const jumps = howJumps(numbers, debugInfo, cache);

console.log(jumps);