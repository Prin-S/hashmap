function createHashMap(loadFactor) {
    let buckets = new Array(16);
    const bucketsLoadFactor = loadFactor;
    const capacity = buckets.length;
    let numOfStoredKeys = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }

    function set(key, value) {
        const hashCode = hash(key);

        if (!buckets[hashCode]) { // If the bucket is empty,
            buckets[hashCode] = [{ key, value }]; // Insert key and value as an object inside an array and assign it to the bucket.
            numOfStoredKeys++;
        } else if (buckets[hashCode].find(element => element.key == key)) { // If key already exists in the bucket,
            buckets[hashCode].find(element => element.key == key).value = value; // Change the value of that key to entered value. (find() returns the first element with key == entered key.)
            console.log(`An existing key has been updated in ${hashCode}. Content of bucket ${hashCode}:`);

            return buckets[hashCode];
        } else { // If the bucket is not empty and key does not already exist in the bucket,
            buckets[hashCode].push({ key, value }); // Push a new object into the bucket.
            numOfStoredKeys++;
        }

        console.log(`A new key has been added to bucket ${hashCode}. Content of bucket ${hashCode}:`);

        return buckets[hashCode];
    }

    function get(key) {
        const hashCode = hash(key);

        if (buckets[hashCode] && buckets[hashCode].find(element => element.key == key)) { // If buckets[hashCode] is truthy and key exists in the bucket,
            return `The value of ${key} is ${buckets[hashCode].find(element => element.key == key).value}.`; // Return value in { key, value }.
        } else {
            return null;
        }
    }

    function has(key) {
        const hashCode = hash(key);

        if (buckets[hashCode] && buckets[hashCode].find(element => element.key == key)) { // If buckets[hashCode] is truthy and key exists in the bucket,
            return true;
        } else {
            return false;
        }
    }

    function remove(key) {
        const hashCode = hash(key);

        if (buckets[hashCode] && buckets[hashCode].find(element => element.key == key)) { // If buckets[hashCode] is truthy and key exists in the bucket,
            const elementToRemoveIndex = buckets[hashCode].findIndex(element => element.key == key); // Find the index of the element containing key so that we can splice it from the bucket.
            numOfStoredKeys--;

            console.log('Removed the following key-value pair from the bucket:');
            console.log(buckets[hashCode].splice(elementToRemoveIndex, 1)[0]); // Splicing returns an array of the deleted element, so [0] is used to show just the removed object.
            console.log(`Content of bucket ${hashCode}:`);
            console.log(buckets[hashCode]);

            return true;
        } else {
            return false;
        }
    }

    function length() {
        console.log('Number of stored keys in the hashmap:');

        return numOfStoredKeys;
    }

    function clear() {
        buckets = [];
        buckets = new Array(16);

        return 'All entries have been removed from the hashmap.';
    }

    function keys() {
        const returnArray = [];
        
        buckets.forEach(element => { // element = each bucket in the hashmap
            if (element) {
                element.forEach(bucketElement => returnArray.push(bucketElement.key)); // bucketElement = each element in a bucket
            }
        });

        console.log('Keys in the hashmap:');

        return returnArray;
    }

    function values() {
        const returnArray = [];
        
        buckets.forEach(element => { // element = each bucket in the hashmap
            if (element) {
                element.forEach(bucketElement => returnArray.push(bucketElement.value)); // bucketElement = each element in a bucket
            }
        });

        console.log('Values in the hashmap:');

        return returnArray;
    }

    function entries() {
        const returnArray = [];
        
        buckets.forEach(element => { // element = each bucket in the hashmap
            if (element) {
                element.forEach(bucketElement => returnArray.push([bucketElement.key, bucketElement.value])); // bucketElement = each element in a bucket
            }
        });

        console.log('Key-value pairs in the hashmap:');

        return returnArray;
    }

    return { set, get, has, remove, length, clear, keys, values, entries };
}

const newHashMap = createHashMap(0.75);

console.log(newHashMap.set('Carlos', 'I am the old value.'));
console.log(newHashMap.set('Carlos', 'I am the new value.'));
console.log(newHashMap.set('Cart', 'test'));
console.log(newHashMap.set('Card', 'test 2'));
console.log(newHashMap.set('Cat', '123'));
console.log(newHashMap.get('Dog'));
console.log(newHashMap.has('Cat'));
console.log(newHashMap.keys());
console.log(newHashMap.values());
console.log(newHashMap.entries());
console.log(newHashMap.remove('Cart'));
console.log(newHashMap.length());
console.log(newHashMap.clear());