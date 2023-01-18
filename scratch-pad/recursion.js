const sum = (arr) => {
    if (arr.length === 0) {
        return 0;
    }
    return arr[0] + sum(arr.slice(1));
};

const count = (arr) => {
    if (arr.length === 0) {
        return 0;
    }

    return 1 + count(arr.slice(1));
};

const max = (arr) => {
    if (arr.length === 2) {
        return arr[0] > arr[1] ? arr[0] : arr[1];
    }

    const subMax = max(arr.slice(1));
    return arr[0] > subMax ? arr[0] : subMax;
};

const binarySearch = (arr, val) => {
    if (arr.length === 0) {
        return false;
    }

    const mid = Math.floor(arr.length / 2);
    if (arr[mid] === val) {
        return true;
    }

    if (arr[mid] > val) {
        return binarySearch(arr.slice(0, mid), val);
    }

    return binarySearch(arr.slice(mid + 1), val);
};

console.log(binarySearch([1, 2, 3, 4], 1));
