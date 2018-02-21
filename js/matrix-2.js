function ArrayClass(width, height) {
    let array = [];

    for(let i = 0; i < height; i++) {
        array.push(new Array(width));
    }

    return array;
}

function isValidPath(matrix, i, j, x, y) {
    return (
        (i >= 0) && (i <= x)
        && (j >= 0) && (j <= y)
        && (matrix[i][j] === 1)
    );
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
    path = Array.prototype.slice.call(path);

    if(!isValidPath(matrix, i, j, x, y)) {
        return 0;
    }

    path.push({
        i: i,
        j: j
    });

    if((i === x) && (j === y)) {
        console.log(printPath(path));

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
        results = new ArrayClass(width, height);

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

    return results[height - 1][width - 1];
}

function getShortestPath(matrix, i, j, x, y, path) {
    path = Array.prototype.slice.call(path);

    if(!isValidPath(matrix, i, j, x, y)) {
        return 0;
    }

    path.push({
        i: i,
        j: j
    });

    if((i === x) && (j === y)) {
        console.log(printPath(path));

        return 1;
    }

    return getShortestPath(matrix, i, j + 1, x, y, path)
        + getShortestPath(matrix, i + 1, j, x, y, path);
}

function countZeroes(matrix) {
    let matrixLength = matrix.length,
        rowIndex = matrixLength - 1,
        colIndex = 0,
        count = 0;

    while(colIndex < matrixLength) {

        // move up until you find a 0
        while(rowIndex >= 0 && matrix[rowIndex][colIndex] > 0) {
            rowIndex--;
        }

        // add 0s present in current column to result
        count += (rowIndex + 1);

        // move right to next column
        colIndex++;
    }

    return count;
}

function countNegativeNumbers1(matrix) {
    let matrixLength = matrix.length,
        rowIndex = matrixLength - 1,
        colIndex = 0,
        count = 0;

    while(colIndex < matrixLength) {

        // move up until you find a number lesser than 0
        while(rowIndex >= 0 && matrix[rowIndex][colIndex] >= 0) {
            rowIndex--;
        }

        // add 0s present in current column to result
        count += (rowIndex + 1);

        // move right to next column
        colIndex++;
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
        console.log(rowIndex, colIndex, ' -> ', matrix[rowIndex][colIndex]);

        if(matrix[rowIndex][colIndex] < 0) {
            count += colIndex + 1;

            rowIndex++;
        } else {
            colIndex--;
        }
    }

    return count;
}