const canJump = (numbers) => {
    const dp = new Array(numbers.length).fill(false);

    if (numbers.length === 0) {
        return false;
    }

    if (numbers.length === 1) {
        return true;
    }

    if (numbers[0] === 0) {
        return false;
    }

    dp[0] = true;

    for (let index = 0; index < dp.length - 1; index++) {
        if (dp[index]) {
            for (let counter = 1; counter <= numbers[index]; counter++) {
                dp[index + counter] = true;
            }
        }
    }
    console.log("#", dp);
    return dp[numbers.length - 1];
}

// const numbers = [2,3,1,1,4];
// const numbers = [3,2,1,0,4];
const numbers = [1, 0, 1, 0];
console.log(canJump(numbers));