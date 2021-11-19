import { BOXES } from './consts'

import { body, top } from '../images/boxes'

const BLOCK_CLASSNAME = 'js-boxes'

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`)
const $template = $container.querySelector(`.${BLOCK_CLASSNAME}__template`)

const createBoxBlock = (box) => {
    const $block = $template.content.cloneNode(true)

    const $button = $block.querySelector(`.${BLOCK_CLASSNAME}__button`)
    const $label = $block.querySelector(`.${BLOCK_CLASSNAME}__label`)
    const $top = $block.querySelector(`.${BLOCK_CLASSNAME}__top`)
    const $body = $block.querySelector(`.${BLOCK_CLASSNAME}__body`)

    $button.dataset.type = box.type;
    $button.classList.add(`is-${box.color}`);
    $label.textContent = box.label;
    $top.src = top[box.color];
    $body.src = body[box.color];

    return $block;
}

const fillBoxesContainer = () => {
    const $boxes = BOXES.map(createBoxBlock);

    $container.replaceChildren(...$boxes);
}

const defineBoxSelectionHandler = (selectBox) => ({ target }) => {
    const $box = target.closest(`.${BLOCK_CLASSNAME}__button`)
    if (!$box) {
        return;
    }

    const $dump = $box.querySelector(`.${BLOCK_CLASSNAME}__dump`)

    const moveToDump = ($item) => {
        $dump.appendChild($item)
        $box.classList.add('is-dumping')
    }

    const removeFromDump = ($item) => {
        $box.classList.remove('is-dumping')
        $dump.removeChild($item)
    }

    const { type } = $box.dataset;

    selectBox({
        type,
        moveToDump,
        removeFromDump,
    });
}

export const initBoxes = (onBoxSelect) => {
    fillBoxesContainer();

    $container.addEventListener('click', defineBoxSelectionHandler(onBoxSelect))
}

export const setInteractivity = (enabled) => {
    $container.classList.toggle('is-disabled', !enabled)
}
