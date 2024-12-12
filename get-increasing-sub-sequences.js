const getIncreasingSubSequences = (input, increasingSubSequence, increasingSubSequences) => {
    // console.log("#", input, increasingSubSequence);

    if (input.length === 0) {
        increasingSubSequences.push(increasingSubSequence);
        return;
    }


    if (increasingSubSequence === "" || increasingSubSequence[increasingSubSequence.length - 1] <= input[0]) {
        getIncreasingSubSequences(input.substring(1), increasingSubSequence + input[0], increasingSubSequences);
    }

    getIncreasingSubSequences(input.substring(1), increasingSubSequence, increasingSubSequences);
}

const input = "681223";
const increasingSubSequences = [];

getIncreasingSubSequences(input, "", increasingSubSequences);
console.log(increasingSubSequences.length, increasingSubSequences);