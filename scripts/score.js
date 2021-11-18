const BLOCK_CLASSNAME = 'js-score';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $right = $container.querySelector(`.${BLOCK_CLASSNAME}__right`)
const $wrong = $container.querySelector(`.${BLOCK_CLASSNAME}__wrong`)
const $badges = $container.querySelectorAll(`.${BLOCK_CLASSNAME}__badge`)

const defineScore = () => ({
    right: 0,
    wrong: 0,  
})

let score = defineScore();

const increaseRight = () => {
    score.right += 1

    $right.textContent = score.right
}

const increaseWrong = () => {
    score.wrong += 1

    $wrong.textContent = score.wrong
}

const reset = () => {
    score = defineScore()

    $right.textContent = 0
    $wrong.textContent = 0
}

const setVisibility = (visible) => {
    $badges.forEach($badge => $badge.hidden = !visible)
}

export const initScore = () => {
    return {
        getScore: () => score,
        increaseRight,
        increaseWrong,
        reset,
        setVisibility,
    }
}
