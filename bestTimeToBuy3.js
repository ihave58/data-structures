const mergeProfits = (profits) => {
    let currentProfit = 0;
    let mergedProfitsIndex = 0;
    const mergedProfits = [];

    for (const profit of profits) {
        if (profit >= 0) {
            currentProfit += profit;
            mergedProfits[mergedProfitsIndex] = currentProfit;
        } else {
            mergedProfitsIndex = mergedProfits.push(profit);
            currentProfit = 0;
        }
    }

    return mergedProfits;
}

const mergeLosses = (profits) => {
    let currentLoss = 0;
    let mergedLossesIndex = 0;
    const mergedLosses = [];

    for (const profit of profits) {
        if (profit <= 0) {
            currentLoss += profit;
            mergedLosses[mergedLossesIndex] = currentLoss;
        } else {
            mergedLossesIndex = mergedLosses.push(profit);
            currentLoss = 0;
        }
    }

    return mergedLosses;
}

const getMaxProfit = (profits) => {
    let maxProfit1 = 0;
    let maxProfit2 = 0;

    for (const profit of profits) {
        if (profit > maxProfit1) {
            maxProfit2 = maxProfit1;
            maxProfit1 = profit;
        } else if (profit > maxProfit2) {
            maxProfit2 = profit;
        }
    }

    return maxProfit1 + maxProfit2;
}

const canMerge = (profits) => {
    let itCanMerge = false;
    let positiveProfitCount = 0;

    for(let index = 0; index < profits.length; index++) {
        if(profits[index] > 0) {
            positiveProfitCount++;
        }
    }

    let maxProfit1 = 0;
    let maxProfit2 = 0;

    for (const profit of profits) {
        if (profit > maxProfit1) {
            maxProfit2 = maxProfit1;
            maxProfit1 = profit;
        } else if (profit > maxProfit2) {
            maxProfit2 = profit;
        }
    }

    for(let index = 0; index < profits.length; index += 2) {
        if(profits[index] !== maxProfit1 && profits[index] !== maxProfit2) {
            const sum = profits[index] + (profits[index + 1] || 0) + (profits[index + 2] || 0);

            if(sum > 0 && (sum > profits[index]) && (sum > profits[index + 2])) {
                itCanMerge = true;
            }    
        }
    }

    return itCanMerge && positiveProfitCount > 2;
}

const _mergeProfitsWithLosses = (profits) => {
    const mergedProfits = [];
    let mergedProfitsIndex = 0;
    let index = profits[0] > 0 ? 0 : 1;

    while(index < profits.length) {
        const sum = profits[index] + (profits[index + 1] || 0) + (profits[index + 2] || 0);

        if(sum > 0 && (sum > profits[index]) && (sum > (profits[index + 2] || 0))) {
            mergedProfits[mergedProfitsIndex] = sum;
            
            if(index + 3 < profits.length) {
                mergedProfits[mergedProfitsIndex + 1] = profits[index + 3];    
            }
            
            mergedProfitsIndex += 2;
            index += 4;
        } else {
            mergedProfits[mergedProfitsIndex] = profits[index];
            if(index + 1 < profits.length) {
                mergedProfits[mergedProfitsIndex + 1] = profits[index + 1];
            }
            mergedProfitsIndex += 2;
            index += 2;
        }
    }
    
    return mergedProfits;
}

const mergeProfitsWithLosses = (profits) => {
    let mergedProfits = profits.slice();

    while(canMerge(mergedProfits)) {
        mergedProfits = _mergeProfitsWithLosses(mergedProfits);
    }

    return mergedProfits;
}

const merge = (profits) => {
    const mergedProfits = mergeProfits(profits);
    const mergedProfitsAndLosses = mergeLosses(mergedProfits);
    console.log("#mergedProfitsAndLosses:", mergedProfitsAndLosses);

    const mergedProfitsWithLosses = mergeProfitsWithLosses(mergedProfitsAndLosses);
    console.log("#mergedProfitsWithLosses:", mergedProfitsWithLosses);

    return mergedProfitsWithLosses;
}



var maxProfit = function (prices) {
    const profits = [];

    for (let i = 0; i < prices.length - 1; i++) {
        profits[i] = prices[i + 1] - prices[i];
    }

    console.log("#profits:", profits);
    const mergedProfits = merge(profits);
    
    let maxProfit1 = 0;
    let maxProfit2 = 0;

    for (const profit of mergedProfits) {
        if (profit > maxProfit1) {
            maxProfit2 = maxProfit1;
            maxProfit1 = profit;
        } else if (profit > maxProfit2) {
            maxProfit2 = profit;
        }
    }

    return maxProfit1 + maxProfit2;
};


// console.log(maxProfit([3,3,5,0,0,3,1,4])); // 6 
// console.log("------");
// console.log(maxProfit([1,2,4,2,5,7,2,4,9,0])) // 13
// console.log("------");
// console.log(maxProfit([1,2,4,2,5,7,2,4,9,0,9])) //17
// console.log(maxProfit([14,9,10,12,4,8,1,16])) // 19
// console.log(maxProfit([1,1,2,2,1,1,3,3,2,4,6,3,10,5,3])); // 12 1->6 & 3->10
console.log(maxProfit([1,3,5,4,3,7,6,9,2,4]));