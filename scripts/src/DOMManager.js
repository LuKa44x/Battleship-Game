import { game } from './gameController.js';
//in qualche modo controllando game.turn devo dare la classe place invalid alla board corretta
export function initializeEventListener(player1, player2) {
  AICheckboxChecked();
  initializeRotateButton();
  initializeFinishRoundButton(player1, player2);
  startGameBtn(player1, player2);
}

function createBoard(playerDiv, player) {
  const board = document.createElement('div');
  board.classList.add('gameBoard');
  for (let j = 0; j < 10; j++) {
    const row = document.createElement('div');

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.dataset.row = j + 1;
      cell.dataset.col = i + 1;
      cell.id = playerDiv.id;
      cell.addEventListener('mouseenter', function () {
        if (selectedShip) {
          const shipLength = player.ships.find(
            (ship) => ship.name === selectedShip.textContent
          ).length;
          const startRow = parseInt(this.dataset.row, 10);
          const startCol = parseInt(this.dataset.col, 10);

          clearShipPreview(); // Pulisci preview precedenti
          showShipPreview(startRow, startCol, shipLength, isHorizontal, board);
        }
      });

      cell.addEventListener('mouseleave', function () {
        if (selectedShip) {
          clearShipPreview();
        }
      });

      cell.addEventListener('click', function () {
        gameBoardValidation(this, player);
      });
      resetBoard(cell, player);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  playerDiv.appendChild(board);
}

function startGameBtn(player1, player2) {
  const startGameBtn = document.querySelector('.startGameBtn');
  startGameBtn.addEventListener('click', () => {
    startGame(player1, player2);
    console.log(player1, player2);
  });
}

function startGame(player1, player2) {
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
  switchTurnDisplay();
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
function AICheckboxChecked() {
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

function switchTurnDisplay() {
  const turnDisplay = document.querySelector('.turnDisplay-container > h4');
  turnDisplay.textContent = `${game.turn.name}'s Turn`;
}

function initializeFinishRoundButton(player1, player2) {
  const finishRoundButton = document.querySelector('.finish-round-button');
  finishRoundButton.addEventListener('click', () => {
    if (game.phase === 'placement' && game.turn === player1) {
      [...document.querySelectorAll('.gameBoard > div > div#Player\\ 1')]
        .filter((div) => div.textContent.trim() !== '')
        .forEach((div) => {
          //push nell array della board
          game.player1.placeShip(
            div.dataset.row,
            div.dataset.col,
            div.textContent
          );
          div.textContent = ''; //clean the board
          div.classList = '';
        });
      alert('Round Finished! Switching turns.');
      game.switchTurn(player1, player2);
      switchTurnDisplay();
      createShips(player2); //future check
      return;
    }
    if (game.phase === 'placement' && game.turn === player2) {
      [...document.querySelectorAll('.gameBoard > div > div#Player\\ 2')]
        .filter((div) => div.textContent.trim() !== '')
        .forEach((div) => {
          //push nell array della board
          game.player2.placeShip(
            div.dataset.row,
            div.dataset.col,
            div.textContent
          );
          div.textContent = '';
          div.classList = '';
        });
      alert('Round Finished! Switching turns.');
      game.switchTurn(player1, player2);
      switchTurnDisplay();
      game.battle();
      return;
    }
    alert('Round Finished! Switching turns.');
    game.switchTurn(player1, player2);
    //creare di nuovo le ship nel div + dare abilita al player due di eseguire
  });
}

function resetBoard(cell, player) {
  const resetBoardBtn = document.querySelector('.reset-board-button');

  resetBoardBtn.addEventListener('click', () => {
    // rimuove tutto il contenuto delle celle
    resetPlacedShip(cell, player);
  });
}

function createShips(player) {
  const shipsContainer = document.querySelector('.ships-container');
  shipsContainer.textContent = '';
  player.ships.forEach((ship) => {
    createShip(ship.name, player);
  });
}

function createShip(shipName, player) {
  const div = document.createElement('div');
  div.textContent = shipName;
  div.classList.add(`${shipName}`);
  div.id = player.name;
  document.querySelector('.ships-container').appendChild(div);
  div.addEventListener('click', () => {
    if (selectedShip !== null) selectedShip.classList.remove('ship-selected');
    selectedShip = div;
    div.classList.add('ship-selected');
  });
}

function gameBoardValidation(cell, player) {
  if (!selectedShip) {
    alert('No ship selected! Please select a ship before placing it.');
    return;
  }
  const board = cell.closest('.gameBoard'); //risale ai genitori fino a quando matcha il selector
  const shipLength = player.ships.find(
    (ship) => ship.name === selectedShip.textContent
  ).length;
  const startRow = parseInt(cell.dataset.row, 10);
  const startCol = parseInt(cell.dataset.col, 10);

  const positions = getShipPositions(
    startRow,
    startCol,
    shipLength,
    isHorizontal
  );

  if (!canPlaceShip(positions, board)) {
    alert('Ship cannot be placed here!');
    return;
  }

  // Piazza la nave
  clearShipPreview(); // Rimuovi preview
  positions.forEach((pos) => {
    const targetCell = board.querySelector(
      `[data-row="${pos.row}"][data-col="${pos.col}"]`
    );
    targetCell.textContent = selectedShip.textContent;
    targetCell.classList.add('ship-placed');
  });

  selectedShip.remove();
  selectedShip = null;
}

// Mostra preview della nave
function showShipPreview(startRow, startCol, shipLength, isHorizontal, board) {
  const positions = getShipPositions(
    startRow,
    startCol,
    shipLength,
    isHorizontal
  );
  const canPlace = canPlaceShip(positions, board);

  positions.forEach((pos) => {
    const cell = board.querySelector(
      `[data-row="${pos.row}"][data-col="${pos.col}"]`
    );
    if (cell) {
      cell.classList.add(
        canPlace ? 'ship-preview-valid' : 'ship-preview-invalid'
      );
    }
  });
}

// Rimuovi preview
function clearShipPreview() {
  document
    .querySelectorAll('.ship-preview-valid, .ship-preview-invalid')
    .forEach((cell) => {
      cell.classList.remove('ship-preview-valid', 'ship-preview-invalid');
    });
}
// Funzione per ottenere le posizioni della nave
function getShipPositions(startRow, startCol, shipLength, isHorizontal) {
  const positions = [];

  for (let i = 0; i < shipLength; i++) {
    if (isHorizontal) {
      positions.push({ row: startRow, col: startCol + i });
    } else {
      positions.push({ row: startRow + i, col: startCol });
    }
  }

  return positions;
}

// Funzione per validare il piazzamento
function canPlaceShip(positions, board) {
  return positions.every((pos) => {
    // Controllo bounds
    if (pos.row < 1 || pos.row > 10 || pos.col < 1 || pos.col > 10) {
      return false;
    }

    // Controllo collisione
    const cell = board.querySelector(
      `[data-row="${pos.row}"][data-col="${pos.col}"]`
    );
    return cell && !cell.textContent;
  });
}

function resetPlacedShip(cell, player) {
  const shipName = cell.textContent;

  // se non c'è niente nella cella, esci
  if (!shipName) return;

  // ricrea la nave nella lista
  createShip(shipName, player);

  // rimuovi la nave da tutte le celle che la contengono
  document.querySelectorAll('.ship-placed').forEach((c) => {
    if (c.textContent === shipName) {
      c.textContent = '';
      c.classList.remove('ship-placed');
    }
  });
}
