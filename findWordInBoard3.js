const hasVisited = (path, i, j) => path.has(`${i}-${j}`);

const isValidPath = (board, i, j) => i >= 0 && i < board.length && j >= 0 && j < board[0]?.length;

const traverse = (board, word, i = 0, j = 0, wordIndex = 0, path = new Set()) => {
    console.log(i, j, wordIndex, path);

    if (wordIndex === word.length - 1) {
        return true;
    }

    if (word[wordIndex] === board[i][j]) {
        const results = [];

        const newPath = new Set(path);
        newPath.add(`${i}-${j}`);

        if (isValidPath(board, i, j + 1) && !hasVisited(path, i, j + 1)) {
            results[0] = traverse(board, word, i, j + 1, wordIndex + 1, newPath);
        }

        if (isValidPath(board, i + 1, j) && !hasVisited(path, i + 1, j)) {
            results[1] = traverse(board, word, i + 1, j, wordIndex + 1, newPath);
        }

        if (isValidPath(board, i, j - 1) && !hasVisited(path, i, j - 1)) {
            results[2] = traverse(board, word, i, j - 1, wordIndex + 1, newPath);
        }

        return results[0] || results[1] || results[2];
    }

    return false;
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
};

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(exist(board, 'ABCESCEE'));
