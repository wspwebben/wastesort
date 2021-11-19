const BLOCK_CLASSNAME = 'js-item';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`)
const $template = $container.querySelector(`.${BLOCK_CLASSNAME}__template`)

let currentItem = {
    label: 'Салфетка',
    type: 'paper',
}

const createItemBlock = (item) => {
    const $block = $template.content.cloneNode(true)

    const $content = $block.querySelector(`.${BLOCK_CLASSNAME}__content`)

    $content.textContent = item.label;
    $content.dataset.type = item.type;

    return $block;
}

export const addItem = () => {
    const $item = createItemBlock(currentItem)

    $container.append($item)
}

export const getCurrentItem = () => currentItem
export const getItemElement = () => $container.querySelector(`.${BLOCK_CLASSNAME}__content`)
