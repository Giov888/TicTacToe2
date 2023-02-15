const cells = document.querySelectorAll('.cell');
let turn = 'X';

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  window.location.reload();
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  cell.textContent = turn;
  cell.classList.add(turn);
  checkWin();
  turn = turn === 'X' ? 'O' : 'X';
  document.getElementById('turn-indicator').textContent = `It's ${turn}'s turn`;
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
  cells.forEach(cell => {
    if (!cell.textContent) {
      cell.addEventListener('click', handleClick, { once: true });
    }
  });
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      alert(`${turn} wins!`);
      cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
      });
      return;
    }
  }
}
