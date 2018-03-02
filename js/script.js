function testFibonacci() {
    // generateFibbonacciIterative(10);
    generateFibbonacciRecursive(10);
}

function testRandom() {
    console.log(twoSum([3, 2, 4], 6));
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
