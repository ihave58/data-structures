var maxProfit = function(prices) {
    let buy1 = -prices[0];
    let sell1 = 0;
    let buy2 = -prices[0];
    let sell2 = 0;

    for (let i = 1; i < prices.length; i++) {
        let price = prices[i];
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }

    return sell2;    
};

console.log(maxProfit([3,3,5,0,0,3,1,4])); // 6 
// console.log("------");
// console.log(maxProfit([1,2,4,2,5,7,2,4,9,0])) // 13
// console.log("------");
// console.log(maxProfit([1,2,4,2,5,7,2,4,9,0,9])) //17
// console.log(maxProfit([14,9,10,12,4,8,1,16])) // 19
// console.log(maxProfit([1,1,2,2,1,1,3,3,2,4,6,3,10,5,3])); // 12 1->6 & 3->10