export default function generateUI(level, onRunInstructions) {
    // Generate UI
    const inputRowTemplate = document.getElementById('input-row-template');
    const inputCellTemplate = document.getElementById('input-cell-template');
    const inputs = document.getElementById('inputs');
    inputs.innerHTML = '';

    const row = inputRowTemplate.content.cloneNode(true).lastElementChild;
    inputs.appendChild(row);
    row.querySelector('.input-row-label').textContent = 'Main';
    const rowElement = row.querySelector('.input-row');
    for (let i = 0; i < level.instructions.main.count; i++) {
        const cell = inputCellTemplate.content.cloneNode(true);
        rowElement.appendChild(cell);
    }

    for (let i = 0; i < level.instructions.functions?.length; i++) {
        const functionsRow = inputRowTemplate.content.cloneNode(true).lastElementChild;
        inputs.appendChild(functionsRow);
        functionsRow.querySelector('.input-row-label').textContent = `F${i + 1}`;
        const functionsRowElement = functionsRow.querySelector('.input-row');
        for (let j = 0; j < level.instructions.functions[0].count; j++) {
            const cell = inputCellTemplate.content.cloneNode(true);
            functionsRowElement.appendChild(cell);
        }
    }

    // add 2 option to options row, the content of the option is the svg
    const optionTemplate = document.getElementById('option-template');
    const optionsRow = document.getElementById('options-row');
    optionsRow.innerHTML = '';
    for (let i = 0; i < level.options.length; i++) {
        const option = optionTemplate.content.cloneNode(true);
        optionsRow.appendChild(option);
        const optionElement = optionsRow.lastElementChild;
        optionElement.appendChild(level.options[i].element);
    }

    for (let i = 0; i < level.instructions.functions?.length; i++) {
        const option = optionTemplate.content.cloneNode(true);
        optionsRow.appendChild(option);
        const optionElement = optionsRow.lastElementChild;
        const element = document.createElement('span');
        element.textContent = `F${i + 1}`;
        element.setAttribute('data-name', 'FUNCTION_CALL_' + i);
        optionElement.appendChild(element);
    }

    // Enable dragging of options
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        option.draggable = true;
        option.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', option.innerHTML);
            e.dataTransfer.setData('data-name', option.getAttribute('data-name'));
        });
    });

    // Enable dropping into input cells
    const inputCells = document.querySelectorAll('.input-cell');
    inputCells.forEach((cell, index) => {
        cell.draggable = true;
        cell.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', cell.innerHTML);
            e.dataTransfer.setData('data-name', cell.getAttribute('data-name'));
            e.dataTransfer.setData('source-index', index);
        });
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            const dataName = e.dataTransfer.getData('data-name');
            const sourceIndex = e.dataTransfer.getData('source-index');
            if (sourceIndex !== '') {
                const sourceCell = inputCells[sourceIndex];
                sourceCell.innerHTML = '';
            }
            cell.innerHTML = data;
            cell.setAttribute('data-name', dataName);
        });
    });

    // run button
    const runButton = document.getElementById('run');

    runButton.onclick = () => {
        const mainInstructionCount = level.instructions.main.count;
        const functionsInstructionCount = level.instructions.functions?.map((f) => f.count);
        const totalInstructionCount =
            mainInstructionCount + (functionsInstructionCount?.reduce((a, b) => a + b, 0) || 0);
        const [_, ...functionsInstructionStartIndex] =
            functionsInstructionCount?.reduce((a, b) => [...a, a[a.length - 1] + b], [mainInstructionCount]) || [];
        const groupedInputCells = { main: [] };
        for (let i = 0; i < totalInstructionCount; i++) {
            const cell = inputCells[i];
            if (!cell.innerHTML) {
                continue;
            }
            if (i < mainInstructionCount) {
                groupedInputCells.main.push(cell.children[0].getAttribute('data-name'));
            } else {
                const functionIndex = functionsInstructionStartIndex.findIndex((count) => i < count);
                const key = 'FUNCTION_CALL_' + functionIndex;
                if (!groupedInputCells[key]) {
                    groupedInputCells[key] = [];
                }
                groupedInputCells[key].push(cell.children[0].getAttribute('data-name'));
            }
        }
        onRunInstructions(groupedInputCells);
    };

    // reset button
    const resetButton = document.getElementById('reset');
    resetButton.onclick = () => {
        inputCells.forEach((cell) => {
            cell.innerHTML = '';
        });
        runButton.click();
    };
}
