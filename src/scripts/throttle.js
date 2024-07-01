export function throttle(func, wait) {
    let timeout;

    function throttled(...args) {
        if (!timeout) {
            func.apply(this, args);
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
        }
    }

    throttled.cancel = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return throttled;
}
