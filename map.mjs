export default function drawMap(level) {
    // Draw the grid
    const cellTemplate = document.getElementById('cell-template');
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    // Set the grid template column and rows
    grid.style.gridTemplateColumns = `repeat(${level.map[0].length}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${level.map.length}, 1fr)`;

    for (let i = 0; i < level.map.length; i++) {
        for (let j = 0; j < level.map[i].length; j++) {
            const cell = cellTemplate.content.cloneNode(true);
            if (level.map[i][j] === 0) {
                cell.querySelector('.cell').classList.add('wall');
            }
            grid.appendChild(cell);
        }
    }

    // Draw start and end positions
    const gridCells = document.querySelectorAll('.cell');
    const startingPosition = level.start.y * level.map.length + level.start.x;
    const startingOrientation = level.start.orientation;
    const endPosition = level.end.y * level.map.length + level.end.x;
    gridCells[startingPosition].classList.add('robot');
    gridCells[startingPosition].classList.add(startingOrientation);
    gridCells[endPosition].classList.add('goal');
}
