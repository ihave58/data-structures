const charList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const ladderLength = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    const queue = new Array(beginWord);
    const visited = new Set([beginWord]);
    let changes = 1;

    while (queue.length) {
        // console.log('#', queue, visited);

        const queueSize = queue.length;

        for (let index = 0; index < queueSize; index++) {
            const word = queue.shift();
            // console.log("#", word);

            if (word === endWord) {
                return changes;
            }

            for (let charIndex = 0; charIndex < word.length; charIndex++) {
                for (let char of charList) {
                    let newWord = word.split('');
                    newWord.splice(charIndex, 1, char);
                    newWord = newWord.join('');

                    if (wordSet.has(newWord) && !visited.has(newWord)) {
                        queue.push(newWord);
                        visited.add(newWord);
                    }
                }
            }
        }

        changes++;
    }

    return 0;
};

// const beginWord = 'hit',
//     endWord = 'cog',
//     wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

// const beginWord = 'hot',
//     endWord = 'dog',
//     wordList = ['hot', 'dog', 'dot'];

// const beginWord = 'hog',
//     endWord = 'cog',
//     wordList = ['cog'];

const beginWord = 'ta',
    endWord = 'if',
    wordList = ["ts","sc","ph","ca","jr","hf","to","if","ha","is","io","cf","ta"];

// const beginWord = 'qa',
//     endWord = 'sq',
//     wordList = ['si', 'go', 'se', 'cm', 'so', 'ph', 'mt', 'db', 'mb', 'sb', 'kr', 'ln', 'tm', 'le', 'av', 'sm', 'ar', 'ci', 'ca', 'br', 'ti', 'ba', 'to', 'ra', 'fa', 'yo', 'ow', 'sn', 'ya', 'cr', 'po', 'fe', 'ho', 'ma', 're', 'or', 'rn', 'au', 'ur', 'rh', 'sr', 'tc', 'lt', 'lo', 'as', 'fr', 'nb', 'yb', 'if', 'pb', 'ge', 'th', 'pm', 'rb', 'sh', 'co', 'ga', 'li', 'ha', 'hz', 'no', 'bi', 'di', 'hi', 'qa', 'pi', 'os', 'uh', 'wm', 'an', 'me', 'mo', 'na', 'la', 'st', 'er', 'sc', 'ne', 'mn', 'mi', 'am', 'ex', 'pt', 'io', 'be', 'fm', 'ta', 'tb', 'ni', 'mr', 'pa', 'he', 'lr', 'sq', 'ye'];

console.log(ladderLength(beginWord, endWord, wordList));
