/*
    There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4]. Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.
 */

var search = function (nums, target, startIndex = 0, endIndex = nums.length - 1) {
    if (endIndex < startIndex) {
        return false;
    }

    const pivotIndex = Math.floor((startIndex + endIndex) / 2);

    if (nums[pivotIndex] === target) {
        return true;
    }

    // Can't determine which half is sorted due to duplicates; shrink both ends
    if (nums[startIndex] === nums[pivotIndex] && nums[pivotIndex] === nums[endIndex]) {
        return search(nums, target, startIndex + 1, endIndex - 1);
    }

    // Left half is sorted
    if (nums[startIndex] <= nums[pivotIndex]) {
        if (target >= nums[startIndex] && target < nums[pivotIndex]) {
            return search(nums, target, startIndex, pivotIndex - 1);
        } else {
            return search(nums, target, pivotIndex + 1, endIndex);
        }
    } else {
        // Right half is sorted
        if (target > nums[pivotIndex] && target <= nums[endIndex]) {
            return search(nums, target, pivotIndex + 1, endIndex);
        } else {
            return search(nums, target, startIndex, pivotIndex - 1);
        }
    }
};

module.exports = search;
