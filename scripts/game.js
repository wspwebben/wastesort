import { initBoxes, setInteractivity } from './boxes'
import { addItem, getCurrentItem, getItemElement } from './item';
import { initScore } from './score';
import { initCountdown } from './countdown';
import { notifyRight, notifyWrong } from './notification';
import { animate } from './flip';

const { increaseRight, increaseWrong, reset, setVisibility } = initScore();

const BLOCK_CLASSNAME = 'js-game';
const GAME_TIME = 60;

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $item = $container.querySelector(`.${BLOCK_CLASSNAME}__item`)
const $start = $container.querySelector(`.${BLOCK_CLASSNAME}__start`)
const $restart = $container.querySelector(`.${BLOCK_CLASSNAME}__restart`)

const startGame = () => {
    $start.hidden = true
    $item.hidden = false

    initCountdown(GAME_TIME)
    setVisibility(true)
    addItem();
}

const restartGame = () => {
    console.log('restart')
}

const checkAnswer = (itemType, boxType) => {
    if (itemType === boxType) {
        increaseRight()
        notifyRight()
    } else {
        increaseWrong()
        notifyWrong()
    }
}

const selectBox = ({ type, moveToDump, removeFromDump }) => {
    const $item = getItemElement();
    const item = getCurrentItem();

    setInteractivity(false)

    checkAnswer(item.type, type);

    animate({
        element: $item,
        trigger: moveToDump,
        cleanup: removeFromDump,
    }).then(() => {
        addItem()
        setInteractivity(true)
    })
}

export const initGame = () => {
    initBoxes(selectBox)
    
    $start.addEventListener('click', startGame)
    $restart.addEventListener('click', restartGame)
}

