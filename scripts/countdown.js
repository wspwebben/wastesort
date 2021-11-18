const BLOCK_CLASSNAME = 'js-countdown';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $elapsed = $container.querySelector(`.${BLOCK_CLASSNAME}__elapsed`);
const $remaining = $container.querySelector(`.${BLOCK_CLASSNAME}__remaining`);

export const initCountdown = (timeLimit) => {
    const circleLength = Math.ceil($elapsed.getTotalLength());

    let countdownEndCallback = () => {};
    
    const subscribeToEnd = (callback) => countdownEndCallback = callback;

    $remaining.setAttribute('stroke-dasharray', `${circleLength} ${circleLength}`)
    
    requestAnimationFrame(() => {
        $remaining.style.transitionDuration = `${timeLimit}s`
        $remaining.setAttribute('stroke-dasharray', `0 ${circleLength}`)
    })

    $remaining.addEventListener('transitionend', () => {
        $container.classList.add('is-done');

        countdownEndCallback();
    }, { once: true })

    return {
        subscribeToEnd,
    }
}
