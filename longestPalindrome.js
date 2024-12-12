var longestPalindrome = function(string) {
    
    if(string.length === 0 || string.length === 1) {
        return string;
    }
    
    let longestPalindrome = string[0];

    for (let index = 0; index < string.length; index++) {
        let leftIndex = index - 1;
        let rightIndex = index + 1;

        while ((leftIndex >= 0) && (rightIndex < string.length) && (string[leftIndex] === string[rightIndex])) {
            if (rightIndex - leftIndex + 1 > longestPalindrome.length) {
                longestPalindrome = string.substring(leftIndex, rightIndex + 1);
                // console.log("#longestPalindrome:", longestPalindrome, leftIndex, rightIndex);
            }

            leftIndex--;
            rightIndex++;
        }


        leftIndex = index;
        rightIndex = index + 1;

        while ((leftIndex >= 0) && (rightIndex < string.length) && (string[leftIndex] === string[rightIndex])) {
            if (rightIndex - leftIndex + 1 > longestPalindrome.length) {
                longestPalindrome = string.substring(leftIndex, rightIndex + 1);
                // console.log("##longestPalindrome:", longestPalindrome, leftIndex, rightIndex);
            }

            leftIndex--;
            rightIndex++;
        }
    }

    return longestPalindrome;
};

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("ccd"));