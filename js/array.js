function ArrayClass(height, width, initializer) {
    let array = [],
        row;

    for(let i = 0; i < height; i++) {
        row = new Array(width);

        for(let j = 0; j < width; j++) {
            row[j] = (initializer && initializer(j, i));
        }

        array.push(row);
    }

    return array;
}