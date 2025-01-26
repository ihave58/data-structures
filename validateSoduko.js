const getUniqueValidator = (initialValues = []) => {
    const uniqueSet = new Set();

    const add = (value) => uniqueSet.add(value);
    const has = (value) => uniqueSet.has(value);

    return {
        add,
        has
    }
}

function isValidSudoku(board) {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const validator = getUniqueValidator();

        for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
            const value = board[rowIndex][colIndex];

            if (value !== ".") {
                if (validator.has(value)) {
                    return false;
                } else {
                    validator.add(value);
                }
            }
        }
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const validator = getUniqueValidator();

        for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
            const value = board[colIndex][rowIndex];

            if (value !== ".") {
                if (validator.has(value)) {
                    return false;
                } else {
                    validator.add(value);
                }
            }
        }
    }

    for (let boardRowIndex = 0; boardRowIndex < board.length; boardRowIndex += 3) {
        for (let boardColumnIndex = 0; boardColumnIndex < board[0].length; boardColumnIndex += 3) {
            const validator = getUniqueValidator();

            for (let rowIndex = boardRowIndex; rowIndex < boardRowIndex + 3; rowIndex++) {
                for (let colIndex = boardColumnIndex; colIndex < boardColumnIndex + 3; colIndex++) {
                    const value = board[rowIndex][colIndex];

                    if (value !== ".") {
                        if (validator.has(value)) {
                            return false;
                        } else {
                            validator.add(value);
                        }
                    }
                }
            }
        }
    }

    return true;
};


const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];

// const board = [
//     [".", ".", ".", ".", "5", ".", ".", "1", "."],
//     [".", "4", ".", "3", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "3", ".", ".", "1"],
//     ["8", ".", ".", ".", ".", ".", ".", "2", "."],
//     [".", ".", "2", ".", "7", ".", ".", ".", "."],
//     [".", "1", "5", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "2", ".", ".", "."],
//     [".", "2", ".", "9", ".", ".", ".", ".", "."],
//     [".", ".", "4", ".", ".", ".", ".", ".", "."]
// ];
console.log(isValidSudoku(board))