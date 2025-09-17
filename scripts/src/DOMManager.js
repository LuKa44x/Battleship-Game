export function createBoard(player) {
  const board = document.createElement('div');
  board.classList.add('gameBoard');
  for (let j = 0; j < 10; j++) {
    const row = document.createElement('div');

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  player.appendChild(board);
}
