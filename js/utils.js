const add = value1 => {
    let sum = value1;

    const addAndRepeat = value2 => {
        if(value2) {
            sum += value2;

            return addAndRepeat;
        } else {
            return sum;
        }
    };

    addAndRepeat.toString = function() {
        return sum;
    };

    addAndRepeat.valueOf = function() {
        return sum;
    };

    return addAndRepeat;
};

const debounce = (callback, wait, leading, trailing) => {
    let executionId,
        inDebounce = false;

    return function() {
        let context = this,
            args = arguments;

        const fn = () => {
            callback.apply(context, args);
        };

        if(!inDebounce && leading) {
            fn();
            inDebounce = true;
        }

        clearTimeout(executionId);
        executionId = setTimeout(() => {
            trailing && fn();

            inDebounce = false;
        }, wait);
    }
};

const throttle = (callback, limit, leading, trailing) => {
    let inThrottle = false;

    return function() {
        let context = this,
            args = arguments;

        const fn = () => {
            callback.apply(context, args);
        };

        if(!inThrottle) {
            leading && fn();

            setTimeout(() => {
                trailing && fn();

                inThrottle = false;
            }, limit);

            inThrottle = true;
        }
    };
};