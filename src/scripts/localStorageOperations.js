export function saveDataWithTimestamp(key, data) {
    const timestampedData = {
        data: data,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(timestampedData));
}

export function getDataWithExpirationCheck(key) {
    const oneDay = 24 * 60 * 60 * 1000;
    const timestampedData = JSON.parse(localStorage.getItem(key));

    if (timestampedData) {
        const currentTime = new Date().getTime();
        const dataAge = currentTime - timestampedData.timestamp;

        if (dataAge > oneDay) {
            localStorage.removeItem(key);
            return null;
        } else {
            return timestampedData.data;
        }
    }

    return null;
}

