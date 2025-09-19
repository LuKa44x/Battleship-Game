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
  if (!player1Input.value) player1Input.value = 'Player 1';
  player1.name = player1Input.value;
  console.log(AICheckboxControl());
  if (!AICheckboxControl()) {
    const player2Input = document.querySelector('#player2Name');
    if (!player2Input.value) player2Input.value = 'Player 2';
    player2.name = player2Input.value;
  } else {
    player2.isAI = true;
    player2.name = 'AI';
  }
  removeBlur();

  createBoard(document.querySelector('.player1-gameboard-container'));
  createBoard(document.querySelector('.player2-gameboard-container'));
}

function removeBlur() {
  document.querySelector('.modal-overlay').style.pointerEvents = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  document.body.classList.add('no-blur');
}

function AICheckboxControl() {
  const checkbox = document.querySelector('.ai-checkbox');
  if (checkbox.checked) return true;
  else return false;
}
//check quando clicco checkbox disable input2, se clicco di nuovo abilita
export function AICheckboxChecked() {
  const checkbox = document.querySelector('.ai-checkbox');
  const player2Input = document.querySelector('#player2Name');
  checkbox.addEventListener('change', (e) => {
    player2Input.disabled = e.target.checked;
    if (e.target.checked) {
      player2Input.value = ''; // Svuota quando disabilitato
    }
  });
}
