console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 1000);

setTimeout(() => {
    console.log('Second timeout works');
}, 0);

console.log('Finishing up');