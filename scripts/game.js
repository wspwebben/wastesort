import { initBoxes, setInteractivity } from './boxes'
import { addItem, getCurrentItem, getItemElement } from './item';
import { initScore } from './score';
import { initCountdown } from './countdown';
import { notifyRight, notifyWrong } from './notification';
import { animate } from './flip';

const score = initScore();

const BLOCK_CLASSNAME = 'js-game';
const GAME_TIME = 60;

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $item = $container.querySelector(`.${BLOCK_CLASSNAME}__item`)
const $start = $container.querySelector(`.${BLOCK_CLASSNAME}__start`)
const $restart = $container.querySelector(`.${BLOCK_CLASSNAME}__restart`)

const stopGame = () => {
    $item.hidden = true
    $restart.hidden = false
    setInteractivity(false)
}

const startGame = () => {
    $start.hidden = true
    $item.hidden = false

    score.setVisibility(true)
    setInteractivity(true)
    addItem();
    initCountdown(GAME_TIME).then(() => {
        stopGame()
    })
}

const restartGame = () => {
    $restart.hidden = true
    score.reset()
    
    startGame()
}

const checkAnswer = (itemType, boxType) => {
    if (itemType === boxType) {
        score.increaseRight()
        notifyRight()
    } else {
        score.increaseWrong()
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
    setInteractivity(false)
    
    $start.addEventListener('click', startGame)
    $restart.addEventListener('click', restartGame)
}

