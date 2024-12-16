const getDefaultVisited = (matrix) => {
    const height = matrix.length;
    const width = matrix.length ? matrix[0].length : 0;

    return new Array(height).fill(new Array(width).fill(false));
}

const clone = (array) => {
    return JSON.parse(JSON.stringify(array));
}

const isVisited = (visited, i, j) => {
    const height = visited.length;
    const width = visited.length ? visited[0].length : 0;

    if (i < 0 || i >= height || j < 0 || j >= width) {
        return false;
    }

    return visited[i][j];
}

const exist = function (board, word, i = 0, j = 0, wordIndex = 0, visited = getDefaultVisited(board)) {
    if (wordIndex === word.length) {
        return true;
    }

    if (i >= board.length || j >= board[0].length || i < 0 || j < 0) {
        return false;
    }

    const clonedVisited = clone(visited);
    clonedVisited[i][j] = true;

    if (word[wordIndex] === board[i][j]) {
        const results = [];

        if (!isVisited(visited, i + 1, j)) {
            results[0] = exist(board, word, i + 1, j, wordIndex + 1, clonedVisited);
        }

        if (!isVisited(visited, i, j + 1)) {
            results[1] = exist(board, word, i, j + 1, wordIndex + 1, clonedVisited);
        }

        if (!isVisited(visited, i - 1, j)) {
            results[2] = exist(board, word, i - 1, j, wordIndex + 1, clonedVisited);
        }

        return results[0] || results[1] || results[2];
    } else {
        const results = [];

        if (!isVisited(visited, i + 1, j)) {
            results[0] = exist(board, word, i + 1, j, wordIndex, clonedVisited);
        }

        if (!isVisited(visited, i, j + 1)) {
            results[1] = exist(board, word, i, j + 1, wordIndex, clonedVisited);
        }

        if (!isVisited(visited, i - 1, j)) {
            results[2] = exist(board, word, i - 1, j, wordIndex, clonedVisited);
        }

        return results[0] || results[1] || results[2];
    }
};

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(exist(board, 'ABCESEE'));
