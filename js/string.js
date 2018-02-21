function _isPalindromic(string) {
    let isPalindromicString = true,
        index = 0,
        stringLength = string.length;

    while((index < stringLength / 2) && isPalindromicString) {
        if(string[index] === string[stringLength - index - 1]) {
            index++;
        } else {
            isPalindromicString = false;
        }
    }

    return isPalindromicString;
}

function _addCharToString(string, char, index) {
    let newString = string.split('');

    newString.splice(index, 0, char);
    return newString.join('');
}

function getPermutation(string) {
    let combinations = [],
        char,
        substring,
        substringCombinations;

    if(string.length === 1) {
        combinations.push(string);
    } else {
        char = string[0];
        substring = string.substring(1);

        substringCombinations = getPermutation(substring);
        substringCombinations.forEach(function(substring) {
            for(let index = 0; index <= substring.length; index++) {
                combinations.push(_addCharToString(substring, char, index));
            }
        });
    }

    return combinations;
}

function getAllSubString(string) {
    let startIndex,
        endIndex,
        collection = [];

    for(startIndex = 0; startIndex < string.length; startIndex++) {
        for(endIndex = string.length; endIndex > startIndex; endIndex--) {
            collection.push(string.slice(startIndex, endIndex));
        }
    }

    return collection;
}

function getSubSequencePermutation(string) {
    let solutionLength = Math.pow(2, string.length),
        permutations = [];

    for(let counter = 1; counter < solutionLength; counter++) {
        let subSequence = [];

        for(let index = 0; index < string.length; index++) {
            if(counter & (1 << index)) {
                subSequence.push(string[index]);
            }
        }

        permutations.push(subSequence.join(''));
    }

    return permutations;
}

function findPattern(pattern, string) {
    let stringIndex = 0,
        patternIndex = 0;

    while(stringIndex < string.length) {
        if(string[stringIndex] === pattern[patternIndex]) {
            patternIndex++;
            stringIndex++;
        } else {
            stringIndex = stringIndex - patternIndex + 1;
            patternIndex = 0;
        }

        if(patternIndex === pattern.length) {
            console.log('pattern match:', stringIndex - patternIndex);

            stringIndex = stringIndex - patternIndex + 1;
            patternIndex = 0;
        }
    }
}

function getLongestPalindromicSubSequence(string) {
    let startIndex = 0,
        endIndex = string.length - 1,
        counter = 0;

    function _getLongestSubSequencePalindrome(string, startIndex, endIndex) {
        let palindromeLength;

        counter++;

        if(startIndex === endIndex) {
            palindromeLength = 1;
        } else if(string[startIndex] === string[endIndex]) {
            if(endIndex - startIndex === 1) {
                palindromeLength = 2;
            } else {
                palindromeLength = _getLongestSubSequencePalindrome(string, startIndex + 1, endIndex - 1) + 2;
            }
        } else {
            palindromeLength = Math.max(_getLongestSubSequencePalindrome(string, startIndex, endIndex - 1),
                _getLongestSubSequencePalindrome(string, startIndex + 1, endIndex));
        }

        return palindromeLength;
    }

    console.log('counter:', counter);
    return _getLongestSubSequencePalindrome(string, startIndex, endIndex);
}

function lengthOfLongestSubstring(subSequenceSubject, subStringSubject) {
    let i;

    while(i < subSequenceSubject.length) {

        i++;
    }

}

function lengthOfLongestSubstringWithUniqueCharacters(string) {
    let start = 0,
        current = start,
        collection = [];

    while(current < string.length) {
        if(string.slice(start, current).indexOf(string[current]) >= 0) {
            collection[start] = string.slice(start, current);
            start++;
        } else {
            current++
        }
    }

    return collection;
}

function longestPalindromicSubString(string) {
    let subString,
        index = 0,
        current = 0,
        collection = [];

    while(current < string.length) {
        while(((current - index) >= 0) && ((current + index) < string.length)) {
            subString = string.slice(current - index, current + index + 1);

            if(_isPalindromic(subString)) {
                collection[current] = subString;
                index++;
            } else {
                current++;
                index = 0;
            }
        }

        current++;
        index = 0;
    }

    return collection;
}