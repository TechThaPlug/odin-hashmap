export class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #size = 0;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#buckets = this.#createBuckets(capacity);
  }

  #createBuckets(count) {
    return Array.from({ length: count }, () => []);
  }

  // Every access to a bucket goes through here, so the bounds check
  // from the assignment always runs
  #getBucket(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.#buckets[index];
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings.");
    }

    const bucket = this.#getBucket(this.hash(key));
    const existing = bucket.find((entry) => entry[0] === key);

    if (existing) {
      existing[1] = value;
      return;
    }

    bucket.push([key, value]);
    this.#size++;

    if (this.#size > this.#loadFactor * this.#capacity) {
      this.#grow();
    }
  }

  #grow() {
    const oldEntries = this.entries();

    this.#capacity *= 2;
    this.#buckets = this.#createBuckets(this.#capacity);

    for (const [key, value] of oldEntries) {
      this.#getBucket(this.hash(key)).push([key, value]);
    }
  }

  get(key) {
    const bucket = this.#getBucket(this.hash(key));
    const entry = bucket.find((item) => item[0] === key);
    return entry ? entry[1] : undefined;
  }

  has(key) {
    const bucket = this.#getBucket(this.hash(key));
    return bucket.some((entry) => entry[0] === key);
  }

  remove(key) {
    const bucket = this.#getBucket(this.hash(key));
    const position = bucket.findIndex((entry) => entry[0] === key);

    if (position === -1) {
      return false;
    }

    bucket.splice(position, 1);
    this.#size--;
    return true;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets = this.#createBuckets(this.#capacity);
    this.#size = 0;
  }

  keys() {
    return this.entries().map(([key]) => key);
  }

  values() {
    return this.entries().map(([, value]) => value);
  }

  entries() {
    const result = [];

    for (const bucket of this.#buckets) {
      for (const [key, value] of bucket) {
        result.push([key, value]);
      }
    }

    return result;
  }

  // Helpers for testing
  capacity() {
    return this.#capacity;
  }

  loadLevel() {
    return this.#size / this.#capacity;
  }

  bucketSizes() {
    return this.#buckets.map((bucket) => bucket.length);
  }
}

// Extra credit: a HashSet stores keys only
export class HashSet {
  #map = new HashMap();

  add(key) {
    this.#map.set(key, true);
  }

  has(key) {
    return this.#map.has(key);
  }

  remove(key) {
    return this.#map.remove(key);
  }

  length() {
    return this.#map.length();
  }

  clear() {
    this.#map.clear();
  }

  keys() {
    return this.#map.keys();
  }
}