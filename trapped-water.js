// var trap = function(height) {
//     let totalWater = 0;
//     let stack = [];

//     for (let index = 0; index < height.length; index++) {
//         while (!!stack.length && height[index] > height[stack[stack.length - 1]]) {
//             const topIndex = stack.pop();

//             if (stack.length) {
//             	const distance = index - stack[stack.length - 1] - 1;
//                 const boundedHeight = Math.min(height[index], height[stack[stack.length - 1]]) - height[topIndex];

//                 totalWater += distance * boundedHeight;
//             }
//         }

//         stack.push(index);
//     }

//     return totalWater;
// };

const trap = (height) => {
    let leftMax = -1, 
        rightMax = -1, 
        leftIndex = 0, 
        rightIndex = height.length - 1, 
        totalWater = 0;
  
    while (leftIndex <= rightIndex) {
        leftMax = Math.max(height[leftIndex], leftMax);
        rightMax = Math.max(height[rightIndex], rightMax);
        
        if (leftMax > rightMax) {
            totalWater += rightMax - height[rightIndex];
            rightIndex--;
        } else {
            totalWater += leftMax - height[leftIndex];
            leftIndex++;
        }
    }
  
    return totalWater;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));