const getRowSets = (board) => {
    const rowSets = [];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const rowSet = new Set();

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] !== '.') {
                rowSet.add(board[rowIndex][colIndex]);
            }
        }

        rowSets[rowIndex] = rowSet;
    }

    return rowSets;
}

const getColSets = (board) => {
    const colSets = [];

    for (let colIndex = 0; colIndex < board.length; colIndex++) {
        const colSet = new Set();

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            if (board[rowIndex][colIndex] !== '.') {
                colSet.add(board[rowIndex][colIndex]);
            }
        }

        colSets[colIndex] = colSet;
    }

    return colSets;
}

const getHouseSets = (board) => {
    const houseSets = [
        [new Set(), new Set(), new Set()],
        [new Set(), new Set(), new Set()],
        [new Set(), new Set(), new Set()]
    ];

    for (let boardRowIndex = 0; boardRowIndex < board.length; boardRowIndex += 3) {
        for (let boardColumnIndex = 0; boardColumnIndex < board[0].length; boardColumnIndex += 3) {
            const groupSet = new Set();

            for (let rowIndex = boardRowIndex; rowIndex < boardRowIndex + 3; rowIndex++) {
                for (let colIndex = boardColumnIndex; colIndex < boardColumnIndex + 3; colIndex++) {
                    const value = board[rowIndex][colIndex];

                    if (value !== '.') {
                        groupSet.add(value);
                    }
                }
            }

            const groupRowIndex = Math.floor(boardRowIndex / 3);
            const groupColIndex = Math.floor(boardColumnIndex / 3);

            houseSets[groupRowIndex][groupColIndex] = groupSet;
        }
    }

    return houseSets;
}

const getPossibleSolutionSet = (board, rowSets, colSets, houseSets) => {
    const possibleSets = [];
    const allPossibleNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const possibleRowSets = [];

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            const possibleCellSet = new Set();

            if (board[rowIndex][colIndex] === '.') {
                const groupRowIndex = Math.floor(rowIndex / 3);
                const groupColIndex = Math.floor(colIndex / 3);

                allPossibleNumbers.forEach(number => possibleCellSet.add(number));

                for (let value of rowSets[rowIndex].values()) {
                    possibleCellSet.delete(value);
                }

                for (let value of colSets[colIndex].values()) {
                    possibleCellSet.delete(value);
                }

                for (let value of houseSets[groupRowIndex][groupColIndex].values()) {
                    possibleCellSet.delete(value);
                }
            }

            possibleRowSets.push(possibleCellSet);
        }

        possibleSets.push(possibleRowSets);
    }

    return possibleSets;
}

const getDirectSetIndices = (possibleSets) => {
    const setIndices = [];

    for (let rowIndex = 0; rowIndex < possibleSets.length; rowIndex++) {
        for (let colIndex = 0; colIndex < possibleSets[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex].size === 1) {
                setIndices.push([rowIndex, colIndex]);
            }
        }
    }

    return setIndices;
}

const getSmallestSetIndex = (possibleSets) => {
    let smallestSetRowIndex = -1;
    let smallestSetColIndex = -1;

    for (let rowIndex = 0; rowIndex < possibleSets.length; rowIndex++) {
        for (let colIndex = 0; colIndex < possibleSets[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex].size > 0 &&
                ((smallestSetRowIndex < 0 && smallestSetColIndex < 0) ||
                    (possibleSets[rowIndex][colIndex].size < possibleSets[smallestSetRowIndex][smallestSetColIndex].size))
            ) {
                smallestSetRowIndex = rowIndex;
                smallestSetColIndex = colIndex;
            }
        }
    }

    return [smallestSetRowIndex, smallestSetColIndex];
}

const isCompleted = (board) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] === '.') {
                return false;
            }
        }
    }

    return true;
}

const isValid = (board) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const rowMap = new Map();

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] !== '.') {
                const count = rowMap.get(board[rowIndex][colIndex]) || 0;

                rowMap.set(board[rowIndex][colIndex], count + 1);
            }
        }

        for (let value of rowMap.values()) {
            if (value > 1) {
                return false;
            }
        }
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {
        const colMap = new Map();

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            if (board[rowIndex][colIndex] !== '.') {
                const count = colMap.get(board[rowIndex][colIndex]) || 0;

                colMap.set(board[rowIndex][colIndex], count + 1);
            }
        }

        for (let value of colMap.values()) {
            if (value > 1) {
                return false;
            }
        }
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex += 3) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex += 3) {
            const houseMap = new Map();

            for (let houseRowIndex = rowIndex; houseRowIndex < rowIndex + 3; houseRowIndex++) {
                for (let houseColIndex = colIndex; houseColIndex < colIndex + 3; houseColIndex++) {
                    if (board[houseRowIndex][houseColIndex] !== '.') {
                        const count = houseMap.get(board[houseRowIndex][houseColIndex]) || 0;

                        houseMap.set(board[houseRowIndex][houseColIndex], count + 1);
                    }
                }
            }

            for (let value of houseMap.values()) {
                if (value > 1) {
                    return false;
                }
            }
        }
    }

    return true;
}

const markValue = (board, rowSets, colSets, houseSets, rowIndex, colIndex, value) => {
    const houseRowIndex = Math.floor(rowIndex / 3);
    const houseColIndex = Math.floor(colIndex / 3);

    board[rowIndex][colIndex] = value;

    rowSets[rowIndex].add(value);
    colSets[colIndex].add(value);
    houseSets[houseRowIndex][houseColIndex].add(value);
}

const unmarkValue = (board, rowSets, colSets, houseSets, rowIndex, colIndex, value) => {
    const houseRowIndex = Math.floor(rowIndex / 3);
    const houseColIndex = Math.floor(colIndex / 3);

    board[rowIndex][colIndex] = '.';

    rowSets[rowIndex].delete(value);
    colSets[colIndex].delete(value);
    houseSets[houseRowIndex][houseColIndex].delete(value);
}

const solveSudoku = function (board, rowSets = getRowSets(board), colSets = getColSets(board), houseSets = getHouseSets(board)) {
    if (isCompleted(board)) {
        return true;
    }

    if (!isValid(board)) {
        return false;
    }

    let possibleSolutionSets = getPossibleSolutionSet(board, rowSets, colSets, houseSets);
    let solutionSetIndices = getDirectSetIndices(possibleSolutionSets);

    while(solutionSetIndices.length) {
        for (const [rowIndex, colIndex] of solutionSetIndices) {
            const value = Array.from(possibleSolutionSets[rowIndex][colIndex].values())[0];

            markValue(board, rowSets, colSets, houseSets, rowIndex, colIndex, value);
        }

        possibleSolutionSets = getPossibleSolutionSet(board, rowSets, colSets, houseSets);
        solutionSetIndices = getDirectSetIndices(possibleSolutionSets);
    }

    const [rowIndex, colIndex] = getSmallestSetIndex(possibleSolutionSets);

    if (rowIndex < 0 || colIndex < 0) {
        return false;
    }

    for (let value of possibleSolutionSets[rowIndex][colIndex].values()) {
        markValue(board, rowSets, colSets, houseSets, rowIndex, colIndex, value);

        if (solveSudoku(board, rowSets, colSets, houseSets)) {
            return true;
        }

        unmarkValue(board, rowSets, colSets, houseSets, rowIndex, colIndex, value);
    }

    return false;
};


// const board = [
//     ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
//     ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//     ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//     ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//     ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//     ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//     ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//     ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//     ['.', '.', '.', '.', '8', '.', '.', '7', '9']
// ];

const board = [
    ['.', '.', '9', '7', '4', '8', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '2', '.', '1', '.', '9', '.', '.', '.'],
    ['.', '.', '7', '.', '.', '.', '2', '4', '.'],
    ['.', '6', '4', '.', '1', '.', '5', '9', '.'],
    ['.', '9', '8', '.', '.', '.', '3', '.', '.'],
    ['.', '.', '.', '8', '.', '3', '.', '2', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
    ['.', '.', '.', '2', '7', '5', '9', '.', '.']
];

// const board = [
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '9', '.', '.', '1', '.', '.', '3', '.'],
//     ['.', '.', '6', '.', '2', '.', '7', '.', '.'],
//     ['.', '.', '.', '3', '.', '4', '.', '.', '.'],
//     ['2', '1', '.', '.', '.', '.', '.', '9', '8'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '.', '2', '5', '.', '6', '4', '.', '.'],
//     ['.', '8', '.', '.', '.', '.', '.', '1', '.'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.']
// ];

// const board = [
//     ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '9', '.', '.', '1', '.', '.', '3', '.'],
//     ['.', '.', '6', '.', '2', '.', '7', '.', '.'],
//     ['.', '.', '.', '3', '.', '4', '.', '.', '.'],
//     ['2', '1', '.', '.', '.', '.', '.', '9', '8'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '.', '2', '5', '.', '6', '4', '.', '.'],
//     ['.', '8', '.', '.', '.', '.', '.', '1', '.'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.']
// ];

console.time('program');
solveSudoku(board);
console.timeEnd('program');

console.log(isValid(board));
console.log(isCompleted(board));
console.table(board);
