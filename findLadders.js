const distance = (word1, word2) => {
    let matchCount = 0;

    if (word1.length !== word2.length) {
        return false;
    }

    for (let index = 0; index < word1.length; index++) {
        if (word1[index] === word2[index]) {
            matchCount++;
        }
    }

    return word1.length - matchCount;
}

const everyDistance = (wordList) => {
    for (let index = 0; index < wordList.length - 1; index++) {
        if (distance(wordList[index], wordList[index + 1]) !== 1) {
            return false;
        }
    }

    return true;
}

const traverse = (wordList, endWord, selection, ladders) => {
    // console.log('#', selection);

    if (selection.length > wordList.length + 1) {
        return;
    }

    if (everyDistance(selection) && selection[selection.length - 1] === endWord) {
        ladders.push(selection);
    }

    for (let index = 0; index < wordList.length; index++) {
        const newSelection = [...selection, wordList[index]];

        if (!selection.includes(wordList[index]) && everyDistance(newSelection)) {
            traverse(wordList, endWord, newSelection, ladders);
        }
    }
}

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
    const ladders = [];

    traverse(wordList, endWord, [beginWord], ladders);
    // return ladders;
    // console.log(ladders);

    let minLength = Math.min(...ladders.map(l => l.length));
    return ladders.filter(l => l.length === minLength);
};

const beginWord = 'hit',
    endWord = 'cog',
    wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

// const beginWord = 'hot',
//     endWord = 'dog',
//     wordList = ['hot', 'dog', 'dot'];

// const beginWord = 'hog',
//     endWord = 'cog',
//     wordList = ['cog'];

// const beginWord = 'ta',
//     endWord = 'if',
//     wordList = ['ts', 'sc', 'ph', 'ca', 'jr', 'hf', 'to', 'if', 'ha', 'is', 'io', 'cf', 'ta'];

console.log(findLadders(beginWord, endWord, wordList));
