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

const getPossibleSets = (board, rowSets, colSets, houseSets) => {
    const possibleSets = [];
    const allPossibleNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const possibleRowSets = [];

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] === '.') {
                const groupRowIndex = Math.floor(rowIndex / 3);
                const groupColIndex = Math.floor(colIndex / 3);

                const possibleCellSet = new Set(allPossibleNumbers);

                for (let value of rowSets[rowIndex].values()) {
                    possibleCellSet.delete(value);
                }

                for (let value of colSets[colIndex].values()) {
                    possibleCellSet.delete(value);
                }

                for (let value of houseSets[groupRowIndex][groupColIndex].values()) {
                    possibleCellSet.delete(value);
                }

                possibleRowSets.push(possibleCellSet.size === 0 ? null : possibleCellSet);
            } else {
                possibleRowSets.push(null);
            }
        }

        possibleSets.push(possibleRowSets);
    }

    return possibleSets;
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

const getSmallestSet = (possibleSets) => {
    let smallestSetRowIndex = 0;
    let smallestSetColIndex = 0;

    for (let rowIndex = 0; rowIndex < possibleSets.length; rowIndex++) {
        for (let colIndex = 0; colIndex < possibleSets[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex] == null) {
                continue;
            }

            if ((possibleSets[smallestSetRowIndex][smallestSetColIndex] == null) ||
                (possibleSets[rowIndex][colIndex].size < possibleSets[smallestSetRowIndex][smallestSetColIndex].size)) {

                smallestSetRowIndex = rowIndex;
                smallestSetColIndex = colIndex;
            }
        }
    }

    return [smallestSetRowIndex, smallestSetColIndex];
}

const hasSolved = (possibleSets) => {
    for (let rowIndex = 0; rowIndex < possibleSets.length; rowIndex++) {
        for (let colIndex = 0; colIndex < possibleSets[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex] !== null && possibleSets[rowIndex][colIndex].size === 1) {
                return true;
            }
        }
    }

    return false;
}

const solveEachCell = (board, rowSets, colSets, groupSets, possibleSets) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex] !== null && possibleSets[rowIndex][colIndex].size === 1) {
                const groupRowIndex = Math.floor(rowIndex / 3);
                const groupColIndex = Math.floor(colIndex / 3);

                const value = board[rowIndex][colIndex] = Array.from(possibleSets[rowIndex][colIndex].values())[0];

                rowSets[rowIndex].add(value);
                colSets[colIndex].add(value);
                groupSets[groupRowIndex][groupColIndex].add(value)
            }
        }
    }
}

const solveSudoku = function (board) {
    const rowSets = getRowSets(board);
    const colSets = getColSets(board);
    const houseSets = getHouseSets(board);

    let possibleSets = getPossibleSets(board, rowSets, colSets, houseSets);
    let hasSolution = hasSolved(possibleSets);

    while (hasSolution) {
        solveEachCell(board, rowSets, colSets, houseSets, possibleSets);

        possibleSets = getPossibleSets(board, rowSets, colSets, houseSets);
        hasSolution = hasSolved(possibleSets);
    }

    const stack = [];
    const [backtrackRowIndex, backtrackColIndex] = getSmallestSet(possibleSets);

    console.log(backtrackRowIndex, backtrackColIndex);

    // console.log(rowSets, colSets, groupSets);
    console.table(board);
    console.dir(possibleSets);
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

solveSudoku(board)
