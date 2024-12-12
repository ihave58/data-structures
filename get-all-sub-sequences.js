const getAllSubSequences = (input, output, allSubSequences) => {
    // console.log("#", input, output);

    if (input.length === 0) {
        allSubSequences.push(output);
        return;
    }


    getAllSubSequences(input.substring(1), output + input[0], allSubSequences);
    getAllSubSequences(input.substring(1), output, allSubSequences);
}

const input = "abcde";
const allSubSequences = [];

getAllSubSequences(input, "", allSubSequences)

console.log(allSubSequences.length, allSubSequences);