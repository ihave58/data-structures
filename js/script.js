function testMatrix() {
    let original = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];

    console.log('Original:');
    console.table(original);

    console.log('Spiral:');
    printSpiral(original);

    let clockwise = JSON.parse(JSON.stringify(original)); // deep-copy the original array
    rotateClockwise90(clockwise);
    console.log('Clockwise');
    console.table(clockwise);

    let counterClockwise = JSON.parse(JSON.stringify(original)); // deep-copy the original array
    rotateCounterClockwise90(counterClockwise);
    console.log('AntiClockwise');
    console.table(counterClockwise);

}

function testFibonacci() {
    // generateFibbonacciIterative(10);
    generateFibbonacciRecursive(10);
}

function testRandom() {
    console.log(twoSum([3, 2, 4], 6));
}

function testLengthOfLongestSubstringWithUniqueCharacters() {
    console.log(lengthOfLongestSubstringWithUniqueCharacters('abcabcbb'));
    console.log(lengthOfLongestSubstringWithUniqueCharacters('abcdbcefab'));
}

function testLengthOfLongestSubstring() {
    console.log(lengthOfLongestSubstring('ABCD', 'BACDBDCD'));
    // console.log(lengthOfLongestSubstring('GeeksforGeeks', 'GeeksQuiz'));
    // console.log(lengthOfLongestSubstring('zxabcdezy', 'yzabcdezx'));
}

function testPalindromic() {
    console.log('abbacbba', longestPalindromicSubString('abbacbba'));
}

function testStringPermutation() {
    console.log(getStringPermutation('abc'));
    console.log(getStringPermutation('abcd'));
}

function testFindAllSubString() {
    console.log(getAllSubString('abcd'));
}

function testGetLongestSubSequencePalindrome() {
    console.log('BBABCBCAB', getLongestPalindromicSubSequence('BBABCBCAB'));
}

function testFindPattern() {
    console.log('AABAACAADAABAABA', findPattern('AABA', 'AABAACAADAABAABA'));
    console.log('AAAAAB', findPattern('AAAAB', 'AAAAAB'))
}

function testSubSequencesPermutation() {
    console.log(getSubSequencePermutation('1234'));
}

function testShortestPath() {
    let
        matrix = [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 1, 1]
        ],
        // matrix = [
        //     [1, 0, 1, 0, 1],
        //     [1, 1, 1, 1, 0],
        //     [0, 1, 1, 0, 0],
        //     [0, 1, 1, 1, 0],
        //     [0, 1, 1, 1, 1]
        // ],
        // matrix = [
        //     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        //     [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        //     [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        //     [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        //     [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        //     [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        //     [1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
        // ],
        width = matrix.length,
        height = matrix[0].length;

    console.log('countAllPossiblePathsRecursive:', countAllPossiblePathsRecursive(matrix, 0, 0, width - 1, height - 1, []));
    console.log('countAllPossiblePathsDP:', countAllPossiblePathsDP(matrix, 0, 0, width - 1, height - 1));

    debugger;
    console.log('shortestPath:', getShortestPath(matrix, 0, 0, width - 1, height - 1, []));
}

function testCountAllPossiblePaths() {
    let
        matrix = [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 1, 1]
        ],
        // matrix = [
        //     [1, 0, 1, 0, 1],
        //     [1, 1, 1, 1, 0],
        //     [0, 1, 1, 0, 0],
        //     [0, 1, 1, 1, 0],
        //     [0, 1, 1, 1, 1]
        // ],
        // matrix = [
        //     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        //     [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        //     [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        //     [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        //     [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        //     [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        //     [1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
        // ],
        width = matrix.length,
        height = matrix[0].length;

    console.log('countAllPossiblePathsRecursive:', countAllPossiblePathsRecursive(matrix, 0, 0, width - 1, height - 1, []));
    console.log('countAllPossiblePathsDP:', countAllPossiblePathsDP(matrix, 0, 0, width - 1, height - 1));
}

function getDictionaryWords() {
    return [
        'A',
        'Aditya',
        'Aaditya',
        'And',
        'Basket',
        'Baas'
    ];
}

function testAutoComplete() {
    let oTrie = new Trie();

    let words = getDictionaryWords();

    words.forEach(word => {
        oTrie.addPath(word);
    });

    console.log(oTrie.find('A'));
}

function testSum123() {
    let sum = add(1)(2)(3)(4);
    console.log('add(1)(2)(3)(4):', sum);

    sum = add(1)(2);
    console.log('add(1)(2):', sum);

    sum = add(1) + 10;
    console.log('add(1):', sum);
}

// testMatrix();
// testFibonacci();
// testRandom();
// testLengthOfLongestSubstringWithUniqueCharacters();
// testLengthOfLongestSubstring();
// testFindAllSubString();
// testPalindromic();
// testStringPermutation();
// testFindAllSubString();
// testFindPattern();
// testSubSequencesPermutation();
testGetLongestSubSequencePalindrome();

// testCountAllPossiblePaths();
// testShortestPath();

// testAutoComplete();

// testSum123();