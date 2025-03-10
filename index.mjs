import OPTIONS from './options.mjs';
import generateUI from './ui.mjs';
import drawMap from './map.mjs';
import runInstructions from './runner.mjs';

const levels = [
    {
        map: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        start: { x: 0, y: 2, orientation: 'right' },
        end: { x: 4, y: 2 },
        instructions: { main: { count: 10 } },
        options: [OPTIONS.FORWARD, OPTIONS.ROTATE_LEFT],
    },
    {
        map: [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        start: { x: 4, y: 4, orientation: 'up' },
        end: { x: 0, y: 0 },
        instructions: { main: { count: 10 } },
        options: [OPTIONS.FORWARD, OPTIONS.ROTATE_LEFT],
    },
    {
        map: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        start: { x: 0, y: 2, orientation: 'right' },
        end: { x: 4, y: 2 },
        instructions: { main: { count: 2 }, functions: [{ count: 2 }] },
        options: [OPTIONS.FORWARD, OPTIONS.ROTATE_LEFT],
    },
    {
        map: [
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1],
        ],
        start: { x: 0, y: 2, orientation: 'right' },
        end: { x: 0, y: 0 },
        instructions: { main: { count: 3 }, functions: [{ count: 2 }, { count: 2 }] },
        options: [OPTIONS.FORWARD, OPTIONS.ROTATE_LEFT],
    },
    {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: { x: 1, y: 4, orientation: 'right' },
        end: { x: 12, y: 7 },
        instructions: { main: { count: 1 } },
        options: [],
    },
];

function generateLevel(levelNumber) {
    if (levelNumber > levels.length - 1) {
        return;
    }
    const level = levels[levelNumber];
    generateUI(level, (instructions) => {
        runInstructions(level, instructions, () => generateLevel(levelNumber + 1));
    });
    drawMap(level);
}

generateLevel(2);
