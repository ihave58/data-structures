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

function _replaceAt(string, index, character) {
    return string.substr(0, index) + character + string.substr(index + character.length);
}

function getPermutation(string) {
    let combinations = [],
        char,
        substring,
        substringCombinations;

    console.info('string:', string);

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

    console.info('combinations:', combinations);

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

            console.info(
                'counter:', counter,
                'index:', index,
                '1 << index:', 1 << index,
                'counter & (1 << index):', counter & (1 << index),
                'subSequence:', subSequence
            );
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

function _getLongestSubSequencePalindrome(string, startIndex, endIndex, complexity) {
    let palindromeLength;

    complexity.time++;

    console.log(
        'string:', string,
        'startIndex:', startIndex,
        'endIndex:', endIndex
    );

    if(startIndex === endIndex) {
        palindromeLength = 1;
    } else if(string[startIndex] === string[endIndex]) {
        if(endIndex - startIndex === 1) {
            palindromeLength = 2;
        } else {
            palindromeLength = _getLongestSubSequencePalindrome(string, startIndex + 1, endIndex - 1, complexity) + 2;
        }
    } else {
        palindromeLength = Math.max(
            _getLongestSubSequencePalindrome(string, startIndex, endIndex - 1, complexity),
            _getLongestSubSequencePalindrome(string, startIndex + 1, endIndex, complexity)
        );
    }

    console.log('palindromeLength:', palindromeLength);

    return palindromeLength;
}

function getLongestPalindromicSubSequence(string) {
    let longestSubSequence,
        complexity = {
            time: 0
        };

    longestSubSequence = _getLongestSubSequencePalindrome(string, 0, string.length - 1, complexity);

    console.log('Time complexity:', complexity.time);
    return longestSubSequence;
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
        index,
        current = 0,
        collection = [];

    while(current < string.length) {
        index = 0;

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
    }

    return collection;
}

function removeDuplicates(string) {
    let uniqueStringIndex,
        uniqueStringLength = 1;

    for(let stringIndex = 1; stringIndex < string.length; stringIndex++) {
        for(uniqueStringIndex = 0; uniqueStringIndex < uniqueStringLength; uniqueStringIndex++) {

            if(string[uniqueStringIndex] === string[stringIndex]) {
                break;
            }
        }

        if(uniqueStringIndex === uniqueStringLength) {
            string = _replaceAt(string, uniqueStringLength, string[stringIndex]);
            uniqueStringLength++;
        }
    }

    string = _replaceAt(string, uniqueStringLength, 0);

    return string;
}