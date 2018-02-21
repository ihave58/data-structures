/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    var sum,
        headIndex = 0,
        tailIndex = nums.length - 1;

    nums.sort();

    while(headIndex < tailIndex) {
        sum = nums[headIndex] + nums[tailIndex];

        if(sum < target) {
            headIndex++;
        } else if(sum > target) {
            tailIndex++;
        } else {
            return [headIndex, tailIndex];
        }
    }
}

