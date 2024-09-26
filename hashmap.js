function createHashMap() {
    const arr = new Array(16);
    const loadFactor = 0.75;
    const capacity = arr.length;

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

        if (!arr[hashCode]) { // If the bucket is empty,
            arr[hashCode] = [{ key, value }]; // Insert key and value as an object inside an array.
        } else if (arr[hashCode].find(element => element.key == key)) { // If key already exists in the bucket,
            arr[hashCode].find(element => element.key == key).value = value; // Change the value of that key to entered value. (find() returns the first element with key == entered key.)
            console.log(`An existing key has been updated. Content of bucket ${hashCode}:`);
            return arr[hashCode];
        } else {
            arr[hashCode].push({ key, value }); // Push a new object into the array.
        }

        console.log(`A new key has been added. Content of bucket ${hashCode}:`);
        return arr[hashCode];
    }

    function get(key) {
        const hashCode = hash(key);

        if (arr[hashCode] && arr[hashCode].find(element => element.key == key)) { // If arr[hashCode] is truthy and key exists in the bucket,
            return `The value of ${key} is ${arr[hashCode].find(element => element.key == key).value}.`; // Return value in { key, value }.
        } else {
            return null;
        }
    }

    function has(key) {
        const hashCode = hash(key);

        if (arr[hashCode] && arr[hashCode].find(element => element.key == key)) { // If arr[hashCode] is truthy and key exists in the bucket,
            return true;
        } else {
            return false;
        }
    }

    return { set, get, has };
}

const newHashMap = createHashMap();

console.log(newHashMap.set('Carlos', 'I am the old value.'));
console.log(newHashMap.set('Carlos', 'I am the new value.'));
console.log(newHashMap.set('Cart', 'test'));
console.log(newHashMap.set('Card', 'test 2'));
console.log(newHashMap.set('Cat', '123'));
console.log(newHashMap.get('Cat'));
console.log(newHashMap.has('Carla'));