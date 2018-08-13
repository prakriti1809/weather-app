const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Error 1!');
        // reject('Error 2 Something went wrong!');
    }, 2500);
});

promise.then((response) => {
    console.log('Success: ', response);
}).catch((error) => {
    console.log('Catch 1', error);
});

const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        });
    }, 1500);
};

asyncAdd(2, 5).then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, 33);
}).catch((error) => {
    console.log(error);
});