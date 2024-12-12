function spiralOrder(matrix) {
    const height = matrix.length;
    const width = (height > 0) ? matrix[0].length : 0;

    let topIndex = 0;
    let leftIndex = 0;
    let rightIndex = width - 1;
    let bottomIndex = height - 1;

    const display = [];
    let i;

    while ((leftIndex <= rightIndex) || (topIndex <= bottomIndex)) {
        console.log(leftIndex, topIndex, rightIndex, bottomIndex);

        if (topIndex <= bottomIndex) {
            i = leftIndex;
            while (i <= rightIndex) {
                display.push(matrix[topIndex][i]);

                i++;
            }
            topIndex++;
        }


        if (leftIndex <= rightIndex) {
            i = topIndex;
            while (i <= bottomIndex) {
                display.push(matrix[i][rightIndex]);

                i++;
            }
            rightIndex--;
        }

        if (topIndex <= bottomIndex) {
            i = rightIndex;
            while (i >= leftIndex) {
                display.push(matrix[bottomIndex][i]);

                i--;
            }
            bottomIndex--;
        }

        if (leftIndex <= rightIndex) {
            i = bottomIndex;
            while (i >= topIndex) {
                display.push(matrix[i][leftIndex]);

                i--;
            }
            leftIndex++;
        }
    }

    return display;
};