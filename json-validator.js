const top = (stack) => stack[stack.length - 1];

function validate(json) {
    const stack = [];
    let isString = false;

    for (let index = 0; index < json.length; index++) {
        if (isString && json[index] !== '"') {
            continue;
        }

        switch (json[index]) {
            case "{":
                console.log(json[index], isString)
                stack.push(json[index]);
                break;

            case "}":
                console.log(json[index], isString)
                if (top(stack) === "{") {
                    stack.pop();
                } else {
                    stack.push(json[index]);
                }
                break;

            case "[":
                console.log(json[index], isString)
                stack.push(json[index]);
                break;

            case "]":
                console.log(json[index], isString)
                if (top(stack) === '[') {
                    stack.pop();
                } else {
                    stack.push(json[index]);
                }
                break;

            case '"':
                if (top(stack) === '"') {
                    stack.pop();
                    isString = false;
                } else {
                    stack.push(json[index]);
                    isString = true;
                }
                console.log(json[index], isString)
                break;

            default:
        }
    }

    console.log(stack);
    return !stack.length;
}


// const json = '{"a":10,"b":"20","c":[10,20,"30"],"d":"2023-01-19T04:52:15.572Z","e":{"f":"some string"}}';
// const json = '{"prop":{"value{": 10}}';
const json = '{"prop": ["10"]}';
console.log(validate(json));