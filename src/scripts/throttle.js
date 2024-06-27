export function throttle(func, wait) {
    let timeout;
    return function(...args) {
        if (!timeout) {
            func.apply(this, args);
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
        }
    };
}
