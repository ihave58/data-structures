const swap = (array, sourceIndex, targetIndex) => {
    const newArray = array.slice(0);

    const temp = newArray[targetIndex];
    newArray[targetIndex] = newArray[sourceIndex];
    newArray[sourceIndex] = temp;

    return newArray;
}

// function permute(array, startIndex = 0) {
//     const permutations = [];

//     for(let i = 0; i < array.length; i++) {

//     } 

//     return permutations;
// };


function permute(array, startIndex = 0, permutations = []) {
    // Base case
    if (startIndex === array.length - 1) {
        // console.log(array);
        permutations.push(array);
        return;
    }

    for (let index = startIndex; index < array.length; index++) {

        // Swapping
        array = swap(array, startIndex, index);

        // First startIndex+1 characters fixed
        permute(array, startIndex + 1, permutations);

        // Backtrack
        array = swap(array, startIndex, index);
    }
}



// console.log(permute(["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"]))
const result = [];
permute(["a","a","a","a","a","a","a","a","a","a"], 0, result)
console.log(result.length);