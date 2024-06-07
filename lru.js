class LRUCache {
  // The reason to use Map in javascript is because it maintains the order of insertion.
  // So, we can use this to maintain the order of the cache.
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    //first we check if the key exists in the cache,
    //if it does, we delete the key and set it again to maintain the order of the cache.
    // Since we are using a map, the order of insertion is maintained.
    if (!this.cache.has(key)) return undefined;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    //If the key already exists, we delete the key and set it again to maintain the order of the cache.
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    //If the cache size is equal to the capacity, we delete the first key in the cache.
    if (this.cache.size === this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }

  getLeastRecent() {
    return Array.from(this.cache)[0];
  }

  getMostRecent() {
    return Array.from(this.cache)[this.cache.size - 1];
  }
}

const lru = new LRUCache(3);
lru.put(1, 1);
lru.put(2, 2);
lru.put(3, 3);
lru.put(4, 4);
console.log(lru.get(1)); //undefined
console.log(lru.get(2)); //2
console.log(lru.get(3)); //3
console.log(lru.get(4)); //4
console.log(lru.getLeastRecent()); //2
console.log(lru.getMostRecent()); //4