import { initBoxes } from './boxes'
import { initScore } from './score';

const { increaseRight, increaseWrong, reset, setVisibility } = initScore();

const BLOCK_CLASSNAME = 'js-game';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $item = $container.querySelector(`.${BLOCK_CLASSNAME}__item`)
const $start = $container.querySelector(`.${BLOCK_CLASSNAME}__start`)
const $restart = $container.querySelector(`.${BLOCK_CLASSNAME}__restart`)

const startGame = () => {
    $start.hidden = true;
    $item.hidden = false;
    setVisibility(true);
}

const restartGame = () => {
    console.log('restart');
}

const selectBox = (type) => {
    console.log(type)
}

export const initGame = () => {
    initBoxes(selectBox);
    
    $start.addEventListener('click', startGame)
    $restart.addEventListener('click', restartGame)
}

