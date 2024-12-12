const searchPivot = (nums, startIndex = 0, endIndex = nums.length - 1) => {
    console.log("#searchPivot:", startIndex, endIndex);

    if(startIndex > endIndex) {
        return 0;
    }

    const midIndex = Math.floor((startIndex + endIndex) / 2);

    if(nums[midIndex - 1] > nums[midIndex]) {
        return midIndex;
    } else if((nums[endIndex] > nums[midIndex])) {
        return searchPivot(nums, startIndex, midIndex - 1)
    } else {
        return searchPivot(nums, midIndex + 1, endIndex);
    }
}

const _search = (nums, startIndex, endIndex, target) => {
    console.log("#_search:", startIndex, endIndex);

    if(startIndex > endIndex) {
        return false;
    }    

    const midIndex = Math.floor((startIndex + endIndex) / 2);

    if(nums[startIndex] === target) {
        return startIndex;
    } else if(nums[midIndex] === target) {
        return midIndex;
    } else if((nums[midIndex] > target) || (nums[endIndex] === nums[startIndex])) {
        return _search(nums, startIndex, midIndex - 1, target);
    } else {
        return _search(nums, midIndex + 1, endIndex, target);
    }
}


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(!nums.length) {
        return false;
    } else if (nums.length === 1) {
        return nums[0] === target;
    }

    const pivotIndex = searchPivot(nums);
    const endIndex = nums.length - 1;

    console.log("#pivotIndex:", pivotIndex);

    if(target > nums[endIndex]) {
        return _search(nums, 0, pivotIndex - 1, target);
    } else {
        return _search(nums, pivotIndex, endIndex, target);
    }
};

// const array = [4,5,0,0,1,2,3];
// const array = [1,0,1,1,1];
// const array = [1];
// const array = [2,2,2,2,2];
const array = [2,2,2,3,2,2,2];
// const array = [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1];


console.log(search(array, 3));