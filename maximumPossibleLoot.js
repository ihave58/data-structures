function maximumPossibleLoot(loots, index = 0) {
    if (index === loots.length) {
        return 0;
    } else if (index === loots.length - 1) {
        return loots[index];
    }

    const firstElementPickLoot = loots[index] + maximumPossibleLoot(loots, index + 2);
    const firstElementNoPickLoot = maximumPossibleLoot(loots, index + 1);

    return Math.max(firstElementPickLoot, firstElementNoPickLoot);
}

function maximumPossibleLoot2(loots, index = loots.length - 1) {
    if (index < 0) {
        return 0;
    } else if (index === 0) {
        return loots[0];
    }

    const firstElementPickLoot = loots[index] + maximumPossibleLoot2(loots, index - 2);
    const firstElementNoPickLoot = maximumPossibleLoot2(loots, index - 1);

    return Math.max(firstElementPickLoot, firstElementNoPickLoot);
}

function maximumPossibleLoot3(loots, n = loots.length - 1, dp = new Array(n + 1).fill(-1)) {
    // base case 
    if (n < 0) {
        return 0;
    }

    if (n == 0) {
        return loots[0];
    }
    
    // If the subproblem is already solved then return its value 
    if (dp[n] != -1) {
    	console.log("cached");
        return dp[n];
    }

    //if current element is pick then previous cannot be picked 
    let pick = loots[n] + maximumPossibleLoot3(loots, n - 2, dp);

    //if current element is not picked then previous element is picked 
    let notPick = maximumPossibleLoot3(loots, n - 1, dp);

    // return max of picked and not picked 
    return dp[n] = Math.max(pick, notPick);
}

function maximumPossibleLoot4(loots, n = loots.length - 1, dp = new Array(n + 1).fill(-1)) {
    if (n < 0) {
        return 0;
    }

    if (n == 0) {
        return loots[0];
    }
    
    // If the subproblem is already solved then return its value 
    if (dp[n] != -1) {
    	console.log("cached");
        return dp[n];
    }

    let pick = loots[n] + maximumPossibleLoot4(loots, n - 2, dp);
    let notPick = maximumPossibleLoot4(loots, n - 1, dp);

    return dp[n] = Math.max(pick, notPick);
}

function maximumPossibleLoot5(loots) {
    if (loots.length == 1 || loots.length == 2) {
        return Math.max(...loots);
    }

    const dp = new Array(loots.length).fill(-2);

    dp[0] = loots[0];
    dp[1] = loots[1];

    for (let i = 2; i < loots.length; i++) {
        dp[i] = loots[i];

        let money = 0;
        for (let j = i - 2; j >= 0; j--) {
            money = Math.max(money, dp[j]);
        }

        dp[i] += money;
    }

    return Math.max(...dp);
}


// const loots = [6, 7, 1, 3, 8, 2, 4];
// const loots = [5, 3, 4, 11, 2];
// const loots = [5, 3, 4, 11, 2, 10, 20];
const loots = [6, 7, 1, 3, 8, 2, 4, 2];
// const loots = [3, 5];


console.log(maximumPossibleLoot2(loots));
console.log(maximumPossibleLoot4(loots));