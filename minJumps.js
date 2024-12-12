function minJumps(nums) {
    const dp = new Array(nums.length);
    dp.fill([]);

    dp[0] = (nums[0] === 0) ? [] : [
        [0]
    ];

    for (let i = 0; i < nums.length; i++) {
        if (dp[i].length > 0) {
            for (let jump = 1; jump <= nums[i]; jump++) {
                if ((i + jump) < nums.length) {
                    dp[i + jump] = [...dp[i + jump], ...dp[i].map(path => [...path, i + jump])];
                }
            }
        }
    }

    let minimumJump = 0;

    dp[nums.length - 1].forEach((path) => {
        if (minimumJump === 0 || path.length < minimumJump) {
            minimumJump = path.length - 1;
        }
    });


    return minimumJump;
};

// const nums = [2,3,1,1,4];
const nums = [6, 2, 6, 1, 7, 9, 3, 5, 3, 7, 2, 8, 9, 4, 7, 7, 2, 2, 8, 4, 6, 6, 1, 3, 0, 0];
console.log(minJumps(nums));