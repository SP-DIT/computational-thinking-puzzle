import options from './options.mjs';

function isOutOfBounds(x, y, map) {
    return x < 0 || x >= map.length || y < 0 || y >= map.length || map[y][x] === 0;
}

export default function runInstructions(level, instructions, onWin) {
    const delay = options.delay || 200;
    instructions.main = ['reset', ...instructions.main];
    let i = 0;
    let win = false;
    executeNextInstruction(i, win, 'main', instructions, delay, level, options, (win) => {
        if (win) {
            alert('You win!');
            return onWin();
        }
        return;
    });
}

function executeNextInstruction(i, win, toRun, instructions, delay, level, options, onComplete) {
    console.log(i, win, toRun, instructions);
    const instructionsToRun = instructions[toRun];
    if (i >= instructionsToRun.length) {
        return onComplete(win);
    }
    const instruction = instructionsToRun[i];
    console.log(instruction);
    if (instruction.startsWith('FUNCTION_CALL')) {
        return executeNextInstruction(0, win, instruction, instructions, delay, level, options, (isWin) =>
            executeNextInstruction(i + 1, isWin, toRun, instructions, delay, level, options, onComplete),
        );
    }
    const result = executionOptionInstruction(instruction, level, options, instructionsToRun, i, win);
    setTimeout(
        () => executeNextInstruction(result.i, result.win, toRun, instructions, delay, level, options, onComplete),
        delay,
    );
}

function executionOptionInstruction(instruction, level, options, instructionsToRun, i, win) {
    const option = options[instruction];
    const robotCell = grid.querySelector('.robot');
    const { x, y, orientation } = level.robot || level.start;
    const {
        x: newX,
        y: newY,
        orientation: newOrientation,
    } = instruction === 'reset' ? level.start : option.action(x, y, orientation);
    if (win) {
        grid.querySelector('.goal').classList.add('error');
        alert('Extra step after winning!');
        i = instructionsToRun.length;
        return { i, win: false };
    }
    if (isOutOfBounds(newX, newY, level.map)) {
        alert('Out of bounds!');
        i = instructionsToRun.length;
        return { i, win: false };
    }

    grid.querySelector('.goal').classList.remove('error');
    const newCell = grid.querySelector(`.cell:nth-child(${newY * level.map.length + newX + 1})`);
    newCell.classList.add('robot');
    newCell.classList.remove(orientation);
    newCell.classList.add(newOrientation);
    level.robot = { x: newX, y: newY, orientation: newOrientation };

    if (robotCell.classList.contains('goal')) {
        robotCell.className = 'cell goal';
    } else if (newCell === robotCell) {
        // do nothing
    } else {
        robotCell.className = 'cell';
    }

    // check if the robot is on the goal
    if (newX === level.end.x && newY === level.end.y) {
        i = instructionsToRun.length;
        win = true;
        return { i, win };
    }

    i++;
    return { i, win };
}
