let timerId = null;
let subscribers = [];

let time = 0;

const tick = () => {
    time += 1;

    subscribers.forEach(notify => notify(time));
}

const startTimer = (interval) => {
    timerId = setInterval(tick, interval);
}

const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
}

const subscribe = (callback) => {
    subscribers.push(callback)

    const unsubscribe = () => {
        subscribers = subscribers.filter(subscriber => subscriber !== callback);
    }

    return unsubscribe;
};

export const createTimer = (interval) => {
    startTimer(interval)

    return {
        stop: stopTimer,
        subscribe,
    }
}
