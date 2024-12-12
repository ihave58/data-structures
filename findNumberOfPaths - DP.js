const getArray = (height, width, defaultValue = false) => {
    const array = [];

    for (let index = 0; index < height; index++) {
        const arrayChild = new Array(width);
        arrayChild.fill(defaultValue);

        array.push(arrayChild);
    }

    return array;
}

const findNumberOfPaths = (paths, x = 0, y = 0) => {
    const visited = getArray(paths.length, paths[0].length, false);
    const dp = getArray(paths.length, paths[0].length, 0);
    let isConnected = paths[0][0] === 1;

    for(let index = 0; index < paths[0].length; index++) {
      dp[0][index] = isConnected && paths[0][index]; 
      isConnected = dp[0][index];
    }

    for(let index = 0; index < paths.length; index++) {
      dp[index][0] = isConnected && paths[index][0]; 
      isConnected = dp[0][index];
    }

    for(let rowIndex = 1; rowIndex < paths.length; rowIndex++) {
      for(let colIndex = 1; colIndex < paths[0].length; colIndex++) {
        if(paths[rowIndex][colIndex] === 1) {
          dp[rowIndex][colIndex] = dp[rowIndex - 1][colIndex] + dp[rowIndex][colIndex - 1];  
        }
      }      
    }

    console.log("#dp", dp);
    // console.log("#visited", visited);

    return dp[paths.length - 1][paths[0].length - 1];
}

const matrix = [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1]
];

const numberOfPaths = findNumberOfPaths(matrix);
console.log("#path count:", numberOfPaths);