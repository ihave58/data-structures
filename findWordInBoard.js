var exist = function (board, word, i = 0, j = 0, wordIndex = 0) {
    if (wordIndex === word.length) {
        return true;
    }

    if (i === board.length || j === board[0].length) {
        return false;
    }

    if (word[wordIndex] === board[i][j]) {
        return (
            exist(board, word, i + 1, j, wordIndex + 1)
            ||
            exist(board, word, i, j + 1, wordIndex + 1)
        );
    } else {
        return (
            exist(board, word, i + 1, j, wordIndex)
            ||
            exist(board, word, i, j + 1, wordIndex)
        );
    }
};

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(exist(board, 'ABCCSE'));
console.log(exist(board, 'ABCCSD'));
