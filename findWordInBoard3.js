const hasVisited = (path, i, j) => path.has(`${i}-${j}`);
const isValidPath = (board, i, j) => i >= 0 && i < board.length && j >= 0 && j < board[0]?.length;

const traverse = (board, word, i = 0, j = 0, wordIndex = 0, path = new Set()) => {
    // console.log(i, j, wordIndex, path);

    if (wordIndex === word.length) {
        return true;
    }

    if (!isValidPath(board, i, j) || hasVisited(path, i, j) || board[i][j] !== word[wordIndex]) {
        return false;
    }

    path.add(`${i}-${j}`);
    const result = traverse(board, word, i, j + 1, wordIndex + 1, path)
        || traverse(board, word, i + 1, j, wordIndex + 1, path)
        || traverse(board, word, i, j - 1, wordIndex + 1, path)
        || traverse(board, word, i - 1, j, wordIndex + 1, path)

    path.delete(`${i}-${j}`);

    return result;
}

const exist = function (board, word) {
    const rowCount = board.length;
    const columnCount = board.length && board[0].length;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (traverse(board, word, i, j)) {
                return true;
            }
        }
    }

    return false;
};

// const board = [
//     ['A', 'B', 'C', 'E'],
//     ['S', 'F', 'C', 'S'],
//     ['A', 'D', 'E', 'E']
// ];
//
// console.log(exist(board, 'ABCCSEEDA'));

const board = [
    ['A', 'B'],
    ['C', 'D'],
];

console.log(exist(board, 'ACDB'));
