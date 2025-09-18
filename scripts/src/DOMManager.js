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

export function startGame(player1, player2) {
  const player1Input = document.querySelector('#player1Name');
  const player2Input = document.querySelector('#player2Name');
  removeBlur();
  if (!player1Input.value) player1Input.value = 'Player 1';
  if (!player2Input.value) player2Input.value = 'Player 2';
  player1.name = player1Input.value;
  player2.name = player2Input.value;
  createBoard(document.querySelector('.player1-gameboard-container'));
  createBoard(document.querySelector('.player2-gameboard-container'));
}

function removeBlur() {
  document.querySelector('.modal-overlay').style.pointerEvents = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  document.body.classList.add('no-blur');
}
