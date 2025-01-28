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

const getSmallestSetIndex = (possibleSets) => {
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

const hasSolutionCheck = (possibleSets) => {
    for (let rowIndex = 0; rowIndex < possibleSets.length; rowIndex++) {
        for (let colIndex = 0; colIndex < possibleSets[rowIndex].length; colIndex++) {
            if (possibleSets[rowIndex][colIndex] !== null) {
                return true;
            }
        }
    }

    return false;
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

const solveSudoku = function (board) {
    const rowSets = getRowSets(board);
    const colSets = getColSets(board);
    const houseSets = getHouseSets(board);

    let possibleSets = getPossibleSets(board, rowSets, colSets, houseSets);
    let hasSolution = hasSolutionCheck(possibleSets);

    while (hasSolution) {
        const [rowIndex, colIndex] = getSmallestSetIndex(possibleSets);
        const houseRowIndex = Math.floor(rowIndex / 3);
        const houseColIndex = Math.floor(colIndex / 3);

        const value = board[rowIndex][colIndex] = Array.from(possibleSets[rowIndex][colIndex].values())[0];

        rowSets[rowIndex].add(value);
        colSets[colIndex].add(value);
        houseSets[houseRowIndex][houseColIndex].add(value);

        possibleSets = getPossibleSets(board, rowSets, colSets, houseSets);
        hasSolution = hasSolutionCheck(possibleSets);
    }

    console.log(possibleSets);
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

solveSudoku(board);

console.log(isValid(board));
console.table(board);
