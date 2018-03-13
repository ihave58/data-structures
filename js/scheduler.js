class Scheduler {
    constructor(batchSize) {
        this.queue = [];
        this.batchIndex = 0;
        this.batchSize = batchSize;
    }

    _fetch(id) {
        return new Promise((resolve, reject) => {
            const wait = Math.floor(Math.random() * 5000);

            setTimeout(() => {
                console.log('request:', id, wait);
                resolve(id, wait);
            }, wait);
        });
    }

    checkAndExecute() {

    }

    load(id) {
        this.queue.push(id);

        this.checkAndExecute();
    }
}