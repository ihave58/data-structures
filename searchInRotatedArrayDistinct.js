const _search = (nums, startIndex, endIndex, target) => {
    // console.log("#_search:", startIndex, endIndex);

    if(startIndex > endIndex) {
        return -1;
    }    

    const midIndex = Math.floor((startIndex + endIndex) / 2);

    if(nums[midIndex] === target) {
        return midIndex;
    } else if(nums[midIndex] > target) {
        return _search(nums, startIndex, midIndex - 1, target);
    } else {
        return _search(nums, midIndex + 1, endIndex, target);
    }
}

const searchPivot = (nums, startIndex = 0, endIndex = nums.length - 1) => {
    // console.log("#searchPivot:", startIndex, endIndex);

    if(startIndex > endIndex) {
        return 0;
    }

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    
    if(nums[midIndex - 1] > nums[midIndex]) {
        return midIndex;
    } else if(nums[endIndex] > nums[midIndex]) {
        return searchPivot(nums, startIndex, midIndex - 1)
    } else {
        return searchPivot(nums, midIndex + 1, endIndex);
    }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(!nums.length) {
        return -1;
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


// const array = [1,2,3,4,5,6];
const array = [4,5,6,1,2,3];

console.log(search(array, 2));