const rateLimiter = (fn, maxConcurrentRequests = 5) => {
    let activeRequestCount = 0;
    const requestPool = [];

    const processRequestPool = () => {
        while (activeRequestCount < maxConcurrentRequests && requestPool.length > 0) {
            const nextTask = requestPool.shift();
            nextTask();
        }
    };

    return (...args) => {
        return new Promise(async (resolve, reject) => {
            const task = async () => {
                activeRequestCount++;

                try {
                    const result = await fn(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    activeRequestCount--;
                    setTimeout(() => {
                        processRequestPool();
                    });
                }
            };

            // console.log(activeRequestCount, requestPool.length);
            if (activeRequestCount < maxConcurrentRequests) {
                task();
            } else {
                requestPool.push(task);
            }
        });
    };
};

const fetch = async (id) => {
    const max = 8000;
    const min = 1000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log('Fetching', id);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(id);
        }, delay);
    });
};

const rateLimitedFetch = rateLimiter(fetch, 2);

for (let counter = 0; counter < 20; counter++) {
    rateLimitedFetch(counter).then((id) => {
        console.log('Completed', id);
    });
}
