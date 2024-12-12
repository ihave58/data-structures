const getAllSubSequences = (input, output, allSubSequences) => {
    // console.log("#", input, output);
    // console.log("#output:", output);

    if (input.length === 0) {
        if (output.length === 3 && ((1 * output[1]) === (2 * output[0])) && ((1 * output[2]) === (2 * output[1]))) {
            allSubSequences.push(output);
        }

        return;
    }

    getAllSubSequences(input.slice(1), [...output, input[0]], allSubSequences);
    getAllSubSequences(input.slice(1), output, allSubSequences);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// const numbers = [1, 2, 3, 4, 5, 6];
const allSubSequences = [];

getAllSubSequences(numbers, "", allSubSequences)

console.log(allSubSequences.length, allSubSequences);