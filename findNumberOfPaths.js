const getArray = (height, width, defaultValue = false) => {
    const array = [];

    for (let index = 0; index < height; index++) {
        const arrayChild = new Array(width);
        arrayChild.fill(defaultValue);

        array.push(arrayChild);
    }

    return array;
}

const isValidPath = (paths, x, y, visited) => {
    if (x < 0 || x >= paths.length || y < 0 || y >= paths[0].length || visited[x][y]) {
        return false;
    } else {
        return true;
    }
}


const _findNumberOfPaths = (paths, x, y, visited, cache) => {
    if (!isValidPath(paths, x, y, visited)) {
        return 0;
    }

    visited[x][y] = true;
    // console.log("#", x, y);

    let numberOfPaths = 0;
    if (paths[x][y] === 0) {
        numberOfPaths = 0;
    } else if ((x === paths.length - 1) && (y === paths.length - 1)) {
        numberOfPaths = 1;
    } else {
      numberOfPaths = _findNumberOfPaths(paths, x, y + 1, visited, cache) + _findNumberOfPaths(paths, x + 1, y, visited, cache) + _findNumberOfPaths(paths, x, y - 1, visited, cache);
    }

    visited[x][y] = false;
    return numberOfPaths;
}

const findNumberOfPaths = (paths, x = 0, y = 0) => {
    const visited = getArray(paths.length, paths[0].length, false);
    const cache = getArray(paths.length, paths[0].length, false);

    const allPaths = _findNumberOfPaths(paths, x, y, visited, cache);

    console.log("#cache", cache);
    // console.log("#visited", visited);

    return allPaths;
}

const matrix = [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1]
];

const numberOfPaths = findNumberOfPaths(matrix);
console.log("#path count:", numberOfPaths);