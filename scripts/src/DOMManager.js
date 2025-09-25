export function createBoard(playerDiv, player) {
  const board = document.createElement('div');
  board.classList.add('gameBoard');
  for (let j = 0; j < 10; j++) {
    const row = document.createElement('div');

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.dataset.row = j;
      cell.dataset.col = i;
      cell.id = playerDiv.id;
      cell.addEventListener('click', function () {
        console.log('Cella cliccata!', this.dataset.row, this.dataset.col);

        gameBoardValidation(cell, player);
      });
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  playerDiv.appendChild(board);
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
  document.querySelector('.player1-gameboard-container').id = player1.name;
  document.querySelector('.player2-gameboard-container').id = player2.name;
  createBoard(document.querySelector('.player1-gameboard-container'), player1);
  createBoard(document.querySelector('.player2-gameboard-container'), player2);
  addPlayerStats(player1, player2);
  initializeRotateButton();
  createShips(player1);
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
function addPlayerStats(player1, player2) {
  const player1Stats = document.querySelector('.player1-stats-container');
  const player2Stats = document.querySelector('.player2-stats-container');

  player1Stats.innerHTML = ` <h3>${player1.name}</h3>`;
  player2Stats.innerHTML = ` <h3>${player2.name}</h3>`;
}

let selectedShip = null;
let isHorizontal = true;

function initializeRotateButton() {
  const rotateButton = document.querySelector('.rotate-ship-button');
  rotateButton.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
    alert(`Ship rotation set to ${isHorizontal ? 'horizontal' : 'vertical'}`);
  });
}

function createShips(player) {
  player.ships.forEach((ship) => {
    const div = document.createElement('div');
    div.textContent = ship.name;
    div.classList.add(`${ship.name}`);
    div.id = player.name;
    document.querySelector('.ships-container').appendChild(div);
    div.addEventListener('click', () => {
      if (selectedShip !== null) selectedShip.classList.remove('ship-selected');
      selectedShip = div;
      div.classList.add('ship-selected');
    });
  });
}

function gameBoardValidation(cell, player) {
  if (!selectedShip) {
    alert('No ship selected! Please select a ship before placing it.');
    return;
  }

  const shipLength = player.ships.find(
    (ship) => ship.name === selectedShip.textContent
  ).length;

  const startRow = parseInt(cell.dataset.row, 10);
  const startCol = parseInt(cell.dataset.col, 10);

  if (isHorizontal) {
    // Bound check
    if (startCol + shipLength > 10) {
      alert('Ship cannot be placed here, out of bounds!');
      return;
    }

    // Collision check
    for (let i = 0; i < shipLength; i++) {
      const targetCell = document.querySelector(
        `[data-row="${startRow}"][data-col="${startCol + i}"]`
      );
      if (targetCell.textContent) {
        alert('Ship cannot be placed here, cells are already occupied!');
        return;
      }
    }

    // Place ship
    for (let i = 0; i < shipLength; i++) {
      const targetCell = document.querySelector(
        `[data-row="${startRow}"][data-col="${startCol + i}"]`
      );
      targetCell.textContent = selectedShip.textContent;
      targetCell.classList.add('ship-placed');
      if (i === shipLength - 1) {
        selectedShip.remove();
        selectedShip = null;
      }
    }
  } else {
    // Bound check
    if (startRow + shipLength > 10) {
      alert('Ship cannot be placed here, out of bounds!');
      return;
    }

    // Collision check
    for (let i = 0; i < shipLength; i++) {
      const targetCell = document.querySelector(
        `[data-row="${startRow + i}"][data-col="${startCol}"]`
      );
      if (targetCell.textContent) {
        alert('Ship cannot be placed here, cells are already occupied!');
        return;
      }
    }
    // Place ship
    for (let i = 0; i < shipLength; i++) {
      const targetCell = document.querySelector(
        `[data-col="${startCol}"][data-row="${startRow + i}"]`
      );
      targetCell.textContent = selectedShip.textContent;
      targetCell.classList.add('ship-placed');
      if (i === shipLength - 1) {
        selectedShip.remove();
        selectedShip = null;
      }
    }
  }
}
