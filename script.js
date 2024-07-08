const board = document.getElementById("sudoku-board");

const createBoard = () => {
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "9";
        input.dataset.index = i;
        board.appendChild(input);
    }
}
createBoard();

const loadPuzzle = () => {
    const puzzle = [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9]
    ];
    for(let i = 0;i<81;i++){
        const input = board.children[i];
        const row = Math.floor(i / 9);
        const col = i % 9;
        input.value = puzzle[row][col];
    }
};
const puzzle = [];
const solvePuzzle = () => {
    for(let i = 0;i<81;i++){
        const input = board.children[i];
        puzzle.push(input.value ? parseInt(input.value) : 0);
    }
    if(solve(puzzle)){
        for (let i = 0; i < 81; i++) {
            const input = board.children[i];
            input.value = puzzle[i];
        }
    }
};
const solve = () => {
    const empty = findEmpty(puzzle);
    if (!empty) return true;
    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
        if (isValid(puzzle, num, row, col)) {
            puzzle[row * 9 + col] = num;
            if (solve(puzzle)) return true;
            puzzle[row * 9 + col] = 0;
        }
    }
    return false;
};
function findEmpty(puzzle) {
    for (let i = 0; i < 81; i++) {
        if (puzzle[i] === 0) {
            return [Math.floor(i / 9), i % 9];
        }
    }
    return null;
}

function isValid(puzzle, num, row, col) {
    for (let i = 0; i < 9; i++) {
        if (puzzle[row * 9 + i] === num || puzzle[i * 9 + col] === num) return false;
        const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const boxCol = Math.floor(col / 3) * 3 + i % 3;
        if (puzzle[boxRow * 9 + boxCol] === num) return false;
    }
    return true;
}

function saveGame() {
    const puzzle = [];
    for (let i = 0; i < 81; i++) {
        const input = board.children[i];
        puzzle.push(input.value ? parseInt(input.value) : 0);
    }
    localStorage.setItem('savedPuzzle', JSON.stringify(puzzle));
}

function loadGame() {
    const savedPuzzle = JSON.parse(localStorage.getItem('savedPuzzle'));
    if (savedPuzzle) {
        for (let i = 0; i < 81; i++) {
            const input = board.children[i];
            input.value = savedPuzzle[i] ? savedPuzzle[i] : '';
        }
    }
}

function getHint() {
    const puzzle = [];
    for (let i = 0; i < 81; i++) {
        const input = board.children[i];
        puzzle.push(input.value ? parseInt(input.value) : 0);
    }
    if (solve(puzzle)) {
        for (let i = 0; i < 81; i++) {
            const input = board.children[i];
            if (input.value === '') {
                input.value = puzzle[i];
                break;
            }
        }
    } else {
        alert('No solution found');
    }
}
document.getElementById('load-puzzle').addEventListener('click', loadPuzzle);
document.getElementById('solve-puzzle').addEventListener('click', solvePuzzle);
document.getElementById('save-game').addEventListener('click', saveGame);
document.getElementById('load-game').addEventListener('click', loadGame);
document.getElementById('get-hint').addEventListener('click', getHint);
