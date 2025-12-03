const getRowSets = (board) => {
    const rowSets = [];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const rowSet = new Set();

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] !== 0) {
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
            if (board[rowIndex][colIndex] !== 0) {
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

                    if (value !== 0) {
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
    const allPossibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const possibleRowSets = [];

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            const possibleCellSet = new Set();

            if (board[rowIndex][colIndex] === 0) {
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

                if (possibleCellSet.size === 0) {
                    return false; // Impossible state detected
                }
            }

            possibleRowSets.push(possibleCellSet);
        }

        possibleSets.push(possibleRowSets);
    }

    return possibleSets;
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
            if (board[rowIndex][colIndex] === 0) {
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
            if (board[rowIndex][colIndex] !== 0) {
                const count = rowMap.get(board[rowIndex][colIndex]) || 0;

                rowMap.set(board[rowIndex][colIndex], count + 1);
            }
        }

        for (let value of rowMap.values()) {
            if (value > 1) {
                console.error("Invalid row value:", value, rowMap);
                return false;
            }
        }
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {
        const colMap = new Map();

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            if (board[rowIndex][colIndex] !== 0) {
                const count = colMap.get(board[rowIndex][colIndex]) || 0;

                colMap.set(board[rowIndex][colIndex], count + 1);
            }
        }

        for (let value of colMap.values()) {
            if (value > 1) {
                console.error("Invalid column value:", value, colMap);
                return false;
            }
        }
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex += 3) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex += 3) {
            const houseMap = new Map();

            for (let houseRowIndex = rowIndex; houseRowIndex < rowIndex + 3; houseRowIndex++) {
                for (let houseColIndex = colIndex; houseColIndex < colIndex + 3; houseColIndex++) {
                    if (board[houseRowIndex][houseColIndex] !== 0) {
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

const solveSudoku = function (board, rowSets = getRowSets(board), colSets = getColSets(board), houseSets = getHouseSets(board), counter = 1) {
    console.log('Solving step:' + counter);


    if (isCompleted(board)) {
        return true;
    }

    if (!isValid(board)) {
        return false;
    }

    const possibleSets = getPossibleSolutionSet(board, rowSets, colSets, houseSets);
    
    if (possibleSets === false) {
        return false; // Impossible state detected
    }

    const [rowIndex, colIndex] = getSmallestSetIndex(possibleSets);
    const houseRowIndex = Math.floor(rowIndex / 3);
    const houseColIndex = Math.floor(colIndex / 3);

    if (rowIndex < 0 || colIndex < 0) {
        return false;
    }

    for (let value of possibleSets[rowIndex][colIndex].values()) {
        const lastValue = board[rowIndex][colIndex];
        board[rowIndex][colIndex] = value;

        rowSets[rowIndex].add(value);
        colSets[colIndex].add(value);
        houseSets[houseRowIndex][houseColIndex].add(value);

        if (solveSudoku(board, rowSets, colSets, houseSets, ++counter)) {
            return true;
        }

        board[rowIndex][colIndex] = lastValue;
        rowSets[rowIndex].delete(value);
        colSets[colIndex].delete(value);
        houseSets[houseRowIndex][houseColIndex].delete(value);
    }

    return false;
};

// const board = [
//     [7, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 9, 0, 0, 1, 0, 0, 3, 0],
//     [0, 0, 6, 0, 2, 0, 7, 0, 0],
//     [0, 0, 0, 3, 0, 4, 0, 0, 0],
//     [2, 1, 0, 0, 0, 0, 0, 9, 8],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 2, 5, 0, 6, 4, 0, 0],
//     [0, 8, 0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];

// const board = [
//     [0, 0, 0, 0, 5, 0, 8, 9, 0],
//     [0, 0, 0, 0, 6, 3, 7, 0, 0],
//     [0, 0, 0, 8, 1, 9, 0, 5, 6],

//     [5, 0, 0, 0, 0, 2, 4, 0, 3],
//     [4, 2, 8, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 7, 0, 4, 0, 0, 0, 0],
//     [0, 0, 4, 3, 8, 1, 6, 7, 0],
//     [0, 5, 3, 0, 0, 0, 1, 0, 0]
// ];

// const board = [
//     [4, 0, 0, 5, 0, 0, 3, 6, 0],
//     [0, 0, 6, 9, 4, 8, 0, 0, 5],
//     [0, 5, 0, 0, 0, 0, 0, 0, 0],

//     [0, 6, 9, 0, 0, 3, 5, 4, 8],
//     [0, 0, 2, 8, 5, 7, 6, 9, 1],
//     [0, 0, 1, 0, 9, 4, 7, 2, 3],

//     [0, 0, 3, 1, 2, 9, 4, 5, 6],
//     [9, 1, 5, 0, 8, 0, 2, 3, 7],
//     [6, 2, 4, 7, 3, 0, 0, 1, 0]
// ];

// const board = [
//     [5,0,7, 0,4,0, 0,0,0],
//     [0,1,0, 9,6,0, 0,5,7],
//     [0,9,0, 0,3,7, 6,4,1],

//     [0,0,5, 0,7,3, 1,0,2],
//     [0,0,9, 0,2,5, 7,0,4],
//     [7,0,0, 0,0,1, 5,0,8],

//     [6,0,0, 3,1,9, 4,0,0],
//     [2,0,3, 7,0,0, 0,1,0],
//     [9,4,0, 0,0,6, 0,0,0],
// ];

const board = [
    [4,0,0, 0,0,5, 6,7,0],
    [0,0,6, 0,9,8, 0,0,5],
    [0,0,0, 0,4,7, 0,0,0],

    [0,0,0, 7,0,9, 0,0,3],
    [6,5,0, 0,0,0, 0,0,0],
    [0,1,7, 4,0,0, 0,0,0],

    [9,4,3, 0,0,1, 7,2,0],
    [2,0,0, 0,0,0, 1,0,9],
    [0,8,0, 0,2,0, 0,0,4],
];

console.table(board);
console.time('program');
solveSudoku(board);
console.timeEnd('program');

console.log(isValid(board));
console.log(isCompleted(board));

console.table(board);
console.log('Done', Date().toString());