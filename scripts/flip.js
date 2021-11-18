const calculateTransform = (first, last) => {
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    return `
        translate(${deltaX}px, ${deltaY}px)
        scale(${deltaW}, ${deltaH})
    `
}

export const animate = ({ element, trigger, cleanup }) => {
    return new Promise((resolve) => {
        // First: get the current bounds
        const first = element.getBoundingClientRect();
    
        // execute the script that causes layout change
        trigger(element);
    
        // Last: get the final bounds
        const last = element.getBoundingClientRect();
    
        
        element.addEventListener('transitionend', () => {
            cleanup(element);
            resolve();
        }, { once: true })
    
        // Play: animate the final element from its first bounds
        // to its last bounds (which is no transform)
        element.style.transformOrigin = 'top left',
        element.style.transform = calculateTransform(first, last);
    
        requestAnimationFrame(() => {
            element.style.transition = `transform 0.7s ease-out`;
            element.style.transform = 'none';
        })
    })
}
