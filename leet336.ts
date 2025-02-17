function palindromePairs(words: string[]): number[][] {
    const suffixMap = new Map<string, number>();
    const prefixMap = new Map<string, number>();

    const wordPairs: Array<Array<number>> = [];

    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        const reverseWord = word.split('').reverse().join('');

        suffixMap.set(reverseWord, index);
        suffixMap.set(reverseWord.substring(1), index);

        prefixMap.set(reverseWord, index);
        prefixMap.set(reverseWord.substring(0, reverseWord.length - 1), index);
    }

    for (let index = 0; index < words.length; index++) {
        const word = words[index];

        if (prefixMap.has(word)) {
            const prefixIndex = prefixMap.get(word)!;

            if (prefixIndex !== index) {
                wordPairs.push([index, prefixIndex]);
            }

        }

        if (suffixMap.has(word)) {
            const suffixIndex = suffixMap.get(word)!;

            if (suffixIndex !== index) {
                wordPairs.push([suffixIndex, index]);
            }
        }
    }

    console.log(prefixMap, suffixMap);

    return wordPairs;
};

const words = ['abcd', 'dcba', 'lls', 's', 'sssll'];

console.log(palindromePairs(words));
