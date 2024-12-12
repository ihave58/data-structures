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


const _findAllPaths = (paths, x, y, visited, cache) => {
    if (!isValidPath(paths, x, y, visited)) {
        return 0;
    }

    visited[x][y] = true;
    console.log("#", x, y);

    // if (x < paths.length && y < paths.length && cache[x][y] !== false) {
    //     visited[x][y] = false;
    //     return cache[x][y];
    // }

    let currentPath = [];
    if (paths[x][y] === 0) {
        currentPath = 0;
    } else if ((x === paths.length - 1) && (y === paths.length - 1)) {
        currentPath = [
            [{ x, y }]
        ];
    } else {
        const rightPaths = _findAllPaths(paths, x, y + 1, visited, cache);
        const bottomPaths = _findAllPaths(paths, x + 1, y, visited, cache);
        const leftPaths = _findAllPaths(paths, x, y - 1, visited, cache);

        if (Array.isArray(leftPaths)) {
            currentPath = [
                ...currentPath,
                ...leftPaths.map(path => [{ x, y }, ...path])
            ];
        }

        if (Array.isArray(rightPaths)) {
            currentPath = [
                ...currentPath,
                ...rightPaths.map(path => [{ x, y }, ...path])
            ];
        }

        if (Array.isArray(bottomPaths)) {
            currentPath = [
                ...currentPath,
                ...bottomPaths.map(path => [{ x, y }, ...path])
            ];
        }

        if (x === 0 && y === 1) {
            debugger;
        }
    }

    visited[x][y] = false;
    // cache[x][y] = currentPath;
    return currentPath;
}

const findAllPaths = (paths, x = 0, y = 0) => {
    const visited = getArray(paths.length, paths[0].length, false);
    const cache = getArray(paths.length, paths[0].length, false);

    const allPaths = _findAllPaths(paths, x, y, visited, cache);

    console.log("#cache", cache);
    // console.log("#visited", visited);

    return allPaths;
}

const matrix = [
    [1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1]
];

const allPaths = findAllPaths(matrix);
console.log("#path count:", allPaths.length);
console.log("#paths:", allPaths);