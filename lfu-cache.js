class LRUCache {
    data = {};
    frequency = {};
    size;

    constructor(size) {
        this.size = size;
    }

    get(key) {
        if (key in this.data) {
            const lfuKeyIndex = this.queue.indexOf(key);

            this.queue.splice(lfuKeyIndex, 1);
            this.queue.push(key);

            return this.data[key];
        } else {
            return -1;
        }
    }

    set(key, value) {
        if (key in this.data) {
            const lfuKeyIndex = this.queue.indexOf(key);

            this.queue.splice(lfuKeyIndex, 1);
        } else if (this.queue.length === this.size) {
            console.log("Least recently entry purged...");
            const lfuKey = this.queue.shift();
            delete this.data[lfuKey];
        }

		this.queue.push(key);
        this.data[key] = value;
    }
}

const cache = new LRUCache(3);

cache.set(1, "a");
cache.set(2, "b");
cache.set(3, "c");
console.log(cache.data, cache.queue);

cache.set(2, "d");
console.log(cache.data, cache.queue);

cache.set(4, "d");
console.log(cache.data, cache.queue);

cache.set(1, "e");
console.log(cache.data, cache.queue);

cache.set(2, "f");
console.log(cache.data, cache.queue);

cache.set(5, "g");
console.log(cache.data, cache.queue);

cache.get(2);
console.log(cache.data, cache.queue);