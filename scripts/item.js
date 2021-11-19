import { ITEMS } from './consts'
import { shuffle } from './random'
import { takeRandomElement } from './array';

const BLOCK_CLASSNAME = 'js-item'
const REFILL_COUNT = 2;

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`)
const $template = $container.querySelector(`.${BLOCK_CLASSNAME}__template`)

let itemsPool = shuffle([...ITEMS])
let currentItem = takeRandomElement(itemsPool);

const takeNewElement = () => {
    currentItem = takeRandomElement(itemsPool);
    
    if (itemsPool.length <= REFILL_COUNT) {
        itemsPool.push(...ITEMS)
        shuffle(itemsPool)
    }
}

const createItemBlock = (item) => {
    const $block = $template.content.cloneNode(true)

    const $content = $block.querySelector(`.${BLOCK_CLASSNAME}__content`)

    $content.textContent = item.label;
    $content.dataset.type = item.type;

    return $block;
}

export const addItem = () => {
    takeNewElement();
    const $item = createItemBlock(currentItem)

    $container.replaceChildren($item)
}

export const getCurrentItem = () => currentItem
export const getItemElement = () => $container.querySelector(`.${BLOCK_CLASSNAME}__content`)
