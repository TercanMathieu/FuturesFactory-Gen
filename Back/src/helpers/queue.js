exports.queue = function(fn) {
    let queue = Promise.resolve();

    return function (...args) {
        queue = queue.then(() => {
            return fn(...args);
        });
        return queue;
    }
}
