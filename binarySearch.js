var search = function(nums, target, startIndex = 0, endIndex = nums.length - 1) {
    const middleIndex = Math.floor(nums.length / 2);

    if(nums[middleIndex] === target) {
        return middleIndex;
    }

    const leftIndex = search(nums, target, startIndex, middleIndex - 1);
    if(leftIndex > -1) {
        return leftIndex;
    }
    
    const rightIndex = search(nums, target, middleIndex + 1, endIndex);
    if(rightIndex > -1) {
        return rightIndex;
    }

    return -1;
};

const nums = [-1,0,3,5,9,12];
console.log(search(nums, 9));