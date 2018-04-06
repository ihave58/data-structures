function ArrayClass(height, width) {
    let array = [];

    for(let i = 0; i < height; i++) {
        array.push(new Array(width));
    }

    return array;
}