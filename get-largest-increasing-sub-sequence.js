const getLargestIncreasingSubSequences = (numbers, increasingSubSequence = []) => {
    // console.log("#", numbers, increasingSubSequence);

    if (numbers.length === 0) {
        return increasingSubSequence;
    }


    let withCharacterLargestSubSequence;
    if (increasingSubSequence.length === 0 || increasingSubSequence[increasingSubSequence.length - 1] <= numbers[0]) {
        withCharacterLargestSubSequence = getLargestIncreasingSubSequences(numbers.slice(1), [...increasingSubSequence, numbers[0]]);
    }

    const withoutCharacterLargestSubSequence = getLargestIncreasingSubSequences(numbers.slice(1), increasingSubSequence);

    if (withCharacterLargestSubSequence && withoutCharacterLargestSubSequence) {
        return withCharacterLargestSubSequence.length > withoutCharacterLargestSubSequence.length ? withCharacterLargestSubSequence : withoutCharacterLargestSubSequence;
    } else if (!withCharacterLargestSubSequence) {
        return withoutCharacterLargestSubSequence;
    } else if (!withoutCharacterLargestSubSequence) {
        return withCharacterLargestSubSequence;
    } else {
        return;
    }
}

const numbers = [1, 2, 3, 4, 6, 8, 2, 2, 3, 3];
console.log(getLargestIncreasingSubSequences(numbers));