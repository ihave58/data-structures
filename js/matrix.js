// https://leetcode.com/discuss/20589/a-common-method-to-rotate-the-image
'use strict';

function isValidPath(matrix, i, j, x, y) {
    return (
        (i >= 0) && (i <= x)
        && (j >= 0) && (j <= y)
        && (matrix[i][j] === 1)
    );
}

function rotateClockwise90(matrix) {
    let rowIndex,
        columnIndex;

    matrix = JSON.parse(JSON.stringify(matrix)); // deep-copy the original array

    // reverse the rows
    matrix = matrix.reverse();
    console.table(matrix);

    // swap the symmetric elements
    for(rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for(columnIndex = 0; columnIndex < rowIndex; columnIndex++) {
            // console.log(rowIndex, columnIndex, ' -> ', matrix[rowIndex][columnIndex]);

            let temp = matrix[rowIndex][columnIndex];
            matrix[rowIndex][columnIndex] = matrix[columnIndex][rowIndex];
            matrix[columnIndex][rowIndex] = temp;
        }
    }

    return matrix;
}

function rotateCounterClockwise90(matrix) {
    let rowIndex,
        columnIndex;

    matrix = JSON.parse(JSON.stringify(matrix)); // deep-copy the original array

    // reverse the individual rows
    matrix = matrix.map(function(row) {
        return row.reverse();
    });

    // swap the symmetric elements
    for(rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for(columnIndex = 0; columnIndex < rowIndex; columnIndex++) {
            // console.log(rowIndex, columnIndex, ' -> ', matrix[rowIndex][columnIndex]);

            let temp = matrix[rowIndex][columnIndex];
            matrix[rowIndex][columnIndex] = matrix[columnIndex][rowIndex];
            matrix[columnIndex][rowIndex] = temp;
        }
    }

    return matrix;
}

function printSpiral(matrix) {
    matrix = JSON.parse(JSON.stringify(matrix)); // deep-copy the original array

    let visualBuffer = [],
        matrixWidth = matrix[0].length,
        matrixHeight = matrix.length,
        topIndex = 0,
        leftIndex = 0,
        rightIndex = (matrixWidth - 1),
        bottomIndex = (matrixHeight - 1),
        index;

    while((leftIndex <= rightIndex) && (topIndex <= bottomIndex)) {
        // printing Top row
        for(index = leftIndex; index <= rightIndex; index++) {
            visualBuffer.push(matrix[topIndex][index]);
        }
        topIndex++;

        // printing the Right column
        for(index = topIndex; index <= bottomIndex; index++) {
            visualBuffer.push(matrix[index][rightIndex]);
        }
        rightIndex--;

        // printing the Bottom column
        for(index = rightIndex; index >= leftIndex; index--) {
            visualBuffer.push(matrix[bottomIndex][index]);
        }
        bottomIndex--;

        // printing the Left column
        for(index = bottomIndex; index >= topIndex; index--) {
            visualBuffer.push(matrix[index][leftIndex]);
        }
        leftIndex++;
    }

    return visualBuffer;
}

function printPath(path) {
    var pathString = '';

    path.forEach(point => {
        pathString += `->(${point.i},${point.j})`;
    });

    return pathString;
}

function countAllPossiblePathsRecursive(matrix, i, j, x, y, path) {
    //made path pass by value
    path = path.slice();

    if(!isValidPath(matrix, i, j, x, y)) {
        return 0;
    }

    path.push({
        i,
        j
    });

    if((i === x) && (j === y)) {
        // console.log(printPath(path));

        return 1;
    }

    return countAllPossiblePathsRecursive(matrix, i, j + 1, x, y, path)
        + countAllPossiblePathsRecursive(matrix, i + 1, j, x, y, path);
}

function countAllPossiblePathsDP(matrix, i, j, x, y) {
    let rowIndex,
        colIndex,
        isConnectedPath,
        height = matrix.length,
        width = matrix[0].length,
        results = new ArrayClass(height, width);

    results[0][0] = 1;

    isConnectedPath = true;
    for(rowIndex = 0; rowIndex < height; rowIndex++) {
        colIndex = 0;

        isConnectedPath = isConnectedPath && isValidPath(matrix, rowIndex, colIndex, x, y);

        if(isConnectedPath) {
            results[rowIndex][colIndex] = 1;
        } else {
            results[rowIndex][colIndex] = 0;
        }
    }

    isConnectedPath = true;
    for(colIndex = 0; colIndex < width; colIndex++) {
        rowIndex = 0;

        isConnectedPath = isConnectedPath && isValidPath(matrix, rowIndex, colIndex, x, y);

        if(isConnectedPath) {
            results[rowIndex][colIndex] = 1;
        } else {
            results[rowIndex][colIndex] = 0;
        }
    }

    for(rowIndex = 1; rowIndex < height; rowIndex++) {
        for(colIndex = 1; colIndex < width; colIndex++) {

            if(isValidPath(matrix, rowIndex, colIndex, x, y)) {
                results[rowIndex][colIndex] = results[rowIndex - 1][colIndex] + results[rowIndex][colIndex - 1];
            } else {
                results[rowIndex][colIndex] = 0;
            }
        }
    }

    console.debug('results:', results);

    return results[height - 1][width - 1];
}

function countZeroes(matrix) {
    let rowIndex = matrix.length - 1,
        count = 0;

    for(let colIndex = 0; colIndex < matrix.length; colIndex++) {

        // move up until you find a 0
        while(rowIndex >= 0 && matrix[rowIndex][colIndex] > 0) {
            rowIndex--;
        }

        // add 0s present in current column to result
        count += (rowIndex + 1);
    }

    return count;
}

function countNegativeNumbers1(matrix) {
    let rowIndex = matrix.length - 1,
        count = 0;

    for(let colIndex = 0; colIndex < matrix.length; colIndex++) {

        // move up until you find a number lesser than 0
        while(rowIndex >= 0 && matrix[rowIndex][colIndex] >= 0) {
            // console.info(
            //     'rowIndex:', rowIndex,
            //     'colIndex:', colIndex,
            //     'matrix[rowIndex][colIndex]:', matrix[rowIndex][colIndex]
            // );

            rowIndex--;
        }

        // add 0s present in current column to result
        count += (rowIndex + 1);
    }

    return count;
}

function countNegativeNumbers2(matrix) {
    let matrixLength = matrix.length,
        matrixHeight = matrix[0].length,
        rowIndex = 0,
        colIndex = matrixLength - 1,
        count = 0;

    while(rowIndex < matrixHeight && colIndex >= 0) {
        // console.info(
        //     'rowIndex:', rowIndex,
        //     'colIndex:', colIndex,
        //     'matrix[rowIndex][colIndex]:', matrix[rowIndex][colIndex]
        // );

        if(matrix[rowIndex][colIndex] < 0) {
            count += colIndex + 1;

            rowIndex++;
        } else {
            colIndex--;
        }
    }

    return count;
}
