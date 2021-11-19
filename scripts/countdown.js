const BLOCK_CLASSNAME = 'js-countdown';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $elapsed = $container.querySelector(`.${BLOCK_CLASSNAME}__elapsed`);
const $remaining = $container.querySelector(`.${BLOCK_CLASSNAME}__remaining`);

export const initCountdown = (timeLimit) => {
    const circleLength = Math.ceil($elapsed.getTotalLength());
    $container.classList.remove('is-done')
    $remaining.setAttribute('stroke-dasharray', `${circleLength} ${circleLength}`)
    
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {
            $remaining.style.transitionDuration = `${timeLimit}s`
            $remaining.setAttribute('stroke-dasharray', `0 ${circleLength}`)
        })
    })

    return new Promise((resolve) => {
        $remaining.addEventListener('transitionend', () => {
            $remaining.style.transitionDuration = ''

            $container.classList.add('is-done')
    
            resolve()
        }, { once: true })
    })
}
