alert("Welcome to Tic Tac Toe! In order to Play using the Arrows please Click TAB button and then use the arrows to Hover over the cells and Enter or Space to select one.");

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill(null);

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setTimeout(() => {
                alert(currentPlayer + ' wins!');
                resetGame();
            }, 100);
            return true;
        }
    }

    if (!board.includes(null)) {
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 100);
        return true;
    }
    return false;
}

function makeMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].classList.add(currentPlayer);
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
}

cells.forEach((cell, index) => {
    cell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            makeMove(index);
        } else if (event.key === 'ArrowRight' && index % 3 < 2) {
            cells[index + 1].focus();
        } else if (event.key === 'ArrowLeft' && index % 3 > 0) {
            cells[index - 1].focus();
        } else if (event.key === 'ArrowDown' && index < 6) {
            cells[index + 3].focus();
        } else if (event.key === 'ArrowUp' && index > 2) {
            cells[index - 3].focus();
        }
    });
});