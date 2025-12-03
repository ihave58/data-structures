function concatenate(...strings) {
    return strings.join(' ');
}

function curry(fn) {
    const curried = (...args) => {
        return (...nextArgs) => {
            if (nextArgs.length === 0) {
                return fn(...args);
            }

            return curried(...[...args, ...nextArgs]);
        };
    };

    return curried;
}

const curriedConcatenate = curry(concatenate);
console.log(curriedConcatenate('Hello')('world!')('!')('!')('How', 'are', 'you?')()); // Outputs: "Hello world! How are you?"
