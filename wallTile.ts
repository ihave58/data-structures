/*
Our website supports creating a 2D grid of videos we call wall, where each video in it is a tile. Before saving a wall, we must validate it.

The client sends a list of tiles, where each tile encodes its 2D coordinate(s) (x,y) inside the wall as integers. The wall can only include 1x1 fixed sized tiles, the coordinates pair identifies the starting corners of the tile in this case. An example follows (the notation is intended to be language agnostic, it is incidentally the same as python):

[[0,0],[0,1],[1,0],[1,1]]

Which means:
- the wall has 4 tiles;
- the first tile goes from (0,0) to (1,1);
- the second tile goes from (0,1) to (1,2);
- the third tile goes from (1,0) to (2,1);
- the fourth tile goes from (1,1) to (2,2);


Task
Write a function that validates a wall with only 1x1 tiles. You can assume all coordinates are >= 0.

A wall is valid if:
1. It has at least one tile;
2. The tiles form a square or rectangle starting at [0,0] with no holes;
3. The tiles don't overlap;

The function returns true if the wall is valid, false otherwise.

Note: you can model the wall and tiles as you wish.

Example of a valid wall: [[0,0],[0,1],[1,0],[1,1]]

Example of a valid wall: [[1,1],[0,1],[0,0],[1,0]]

Example of a valid wall: [[0,0],[0,1]]

Example of an invalid wall (containing holes): [[0,0],[1,1]]

Example of an invalid wall (containing holes): [[0,0],[0,1],[1,0]]

Example of an invalid wall (overlapping tiles): [[0,0],[0,1],[0,1],[1,1]]

 */
const mapToMatrix = (wall: Array<[number, number]>): Array<Array<boolean>> => {
    const matrix: Array<Array<boolean>> = [];

    for (const tile of wall) {
        if (matrix[tile[0]] === undefined) {
            matrix[tile[0]] = [];
        }

        matrix[tile[0]][tile[1]] = true;
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === undefined) {
                matrix[i][j] = false;
            }
        }
    }

    return matrix;
};

const hasMinimumLength = (wall: Array<[number, number]>) => wall.length >= 1;

const hasNoHole = (wall: Array<[number, number]>) => {
    let tilesWidth = 0;
    let tilesHeight = 0;

    for (const tile of wall) {
        tilesWidth = Math.max(tilesWidth, tile[1] + 1);
        tilesHeight = Math.max(tilesHeight, tile[0] + 1);
    }

    const totalTiles = tilesWidth * tilesHeight;

    return totalTiles === wall.length;
};

const hasNoOverlap = (wall: Array<[number, number]>) => {
    const visitedTiles = new Set<string>();

    for (const tile of wall) {
        const key = tile.toString();

        if (visitedTiles.has(key)) {
            return false;
        } else {
            visitedTiles.add(key);
        }
    }

    return true;
};

const validateWall = (wall: Array<[number, number]>) => {
    if (!hasMinimumLength(wall)) {
        console.log('empty found...');
        return false;
    }

    if (!hasNoHole(wall)) {
        console.log('holes found...');
        return false;
    }

    if (!hasNoOverlap(wall)) {
        console.log('overlap found...');
        return false;
    }

    return true;
};

console.log(
    validateWall([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ])
);

console.log(
    validateWall([
        [1, 1],
        [0, 1],
        [0, 0],
        [1, 0],
    ])
);

console.log(
    validateWall([
        [0, 0],
        [0, 1],
        [1, 0],
    ])
);

console.log(
    validateWall([
        [0, 0],
        [0, 1],
        [0, 1],
        [1, 1],
    ])
);
