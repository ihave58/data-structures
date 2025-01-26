var isMatch = function(string, pattern) {
	let index = 0;
	let matchLength = 0;

    while(index < pattern.length) {
    	
    }
};

const string1 = "aabccdef";
const pattern1 = "a?bc*e?";
console.log(isMatch(string1, pattern1));

const string2 = "aabccdef";
const pattern2 = "a*bc*e?";
console.log(isMatch(string2, pattern2));

const string3 = "aabccdef";
const pattern3 = "a?bc*f";
console.log(isMatch(string3, pattern3));

