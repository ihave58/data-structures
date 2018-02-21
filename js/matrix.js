// https://leetcode.com/discuss/20589/a-common-method-to-rotate-the-image
'use strict';

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
            console.log(rowIndex, columnIndex, ' -> ', matrix[rowIndex][columnIndex]);

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
            console.log(rowIndex, columnIndex, ' -> ', matrix[rowIndex][columnIndex]);

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
        bottomIndex = (matrixHeight - 1);

    function print() {
        let index;

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

    while((leftIndex < rightIndex) && (topIndex < bottomIndex)) {
        print();
    }

    return visualBuffer;
}
