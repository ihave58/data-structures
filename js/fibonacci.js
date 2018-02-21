function generateFibbonacciIterative(count) {
    let i = 0,
        n = 0,
        series = [];

    while(i < count) {
        if(i < 2) {
            series.push(i);
        } else {
            series.push(series[i - 1] + series[i - 2]);
        }

        i++;
    }

    console.log(series);
}

function generateFibbonacciRecursive(count) {
    let i = 0,
        _cache = {},
        timeComplexity = 0,
        series = [];

    function _generateFibonacci(i) {
        let elem;

        if(_cache[i]) {
            return _cache[i];
        } else {
            timeComplexity++;

            if(i < 2) {
                return i;
            } else {
                elem = _generateFibonacci(i - 1) + _generateFibonacci(i - 2);
                _cache[i] = elem;

                return elem;
            }
        }
    }

    while(i < count) {
        series.push(_generateFibonacci(i));

        i++;
    }

    console.log(series);
    console.log(timeComplexity);
}