// read the 2 svg from assets folder instead
const svgRightArrow = document.createElement('img');
svgRightArrow.src = './assets/arrows-right-svgrepo-com.svg';
svgRightArrow.setAttribute('data-name', 'FORWARD');

const svgTurnLeftArrow = document.createElement('img');
svgTurnLeftArrow.src = './assets/directions-round-svgrepo-com.svg';
svgTurnLeftArrow.setAttribute('data-name', 'ROTATE_LEFT');

export default {
    FORWARD: {
        element: svgRightArrow,
        action: (x, y, orientation) => {
            if (orientation === 'right') {
                return { x: x + 1, y, orientation };
            } else if (orientation === 'left') {
                return { x: x - 1, y, orientation };
            } else if (orientation === 'up') {
                return { x, y: y - 1, orientation };
            } else if (orientation === 'down') {
                return { x, y: y + 1, orientation };
            }
        },
    },
    ROTATE_LEFT: {
        element: svgTurnLeftArrow,
        action: (x, y, orientation) => {
            if (orientation === 'right') {
                return { x, y, orientation: 'up' };
            } else if (orientation === 'left') {
                return { x, y, orientation: 'down' };
            } else if (orientation === 'up') {
                return { x, y, orientation: 'left' };
            } else if (orientation === 'down') {
                return { x, y, orientation: 'right' };
            }
        },
    },
};
