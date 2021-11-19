const BLOCK_CLASSNAME = 'js-notification';

const $container = document.querySelector(`.${BLOCK_CLASSNAME}`);
const $right = $container.querySelector(`.${BLOCK_CLASSNAME}__right`);
const $wrong = $container.querySelector(`.${BLOCK_CLASSNAME}__wrong`);

const defineNotification = ($notification) => () => {
    $notification.classList.add('is-shown');

    $notification.addEventListener('animationend', () => {
        $notification.classList.remove('is-shown');
    }, { once: true });
}

export const notifyRight = defineNotification($right)
export const notifyWrong = defineNotification($wrong)
