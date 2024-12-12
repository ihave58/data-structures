const getLargestIncreasingSubSequence = (string) => {
    const dp = new Array(string.length);
    dp[0] = 1;

    for (let i = 1; i < string.length; i++) {
        let maxLength = 0;

        for (let j = 0; j < i; j++) {
            if (string[j] <= string[i] && ((dp[j] + 1) > dp[i])) {
                dp[i] = dp[j] + 1;
            }
        }

        // dp[i] = maxLength + 1;
    }

    console.log(dp);
    return Math.max(...dp);
}

const input = "6181223";

console.log(getLargestIncreasingSubSequence(input));