// 0 = water, 1 = ship, -1 = missed, -2 = hit

export class ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    console.log('heu');
    this.isSunk();
  }
  isSunk() {
    if (this.length === this.hits) {
      return (this.sunk = true);
    } else return (this.sunk = false);
  }
}

export class gameboard {
  constructor() {
    this.board = this.createGrid();
    this.ships = [];
  }

  createGrid() {
    //grid 10x10 with null borders
    return Array(12)
      .fill(null)
      .map((_, i) =>
        Array(12)
          .fill(null)
          .map((_, j) =>
            i === 0 || i === 11 || j === 0 || j === 11 ? null : { value: 0 }
          )
      );
  }
  placeShip(ship, x, y, orientation) {
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      switch (orientation) {
        case 'right':
          this.board[y][x + i] = { value: 1, piece: ship, shipIndex: i }; //added 3 values to the placed ship square in the board
          break;

        case 'down':
          this.board[y + i][x] = { value: 1, piece: ship, shipIndex: i }; //value 1 = ship
          break;

        case 'left':
          this.board[y][x - i] = { value: 1, piece: ship, shipIndex: i }; //piece = ship object reference (plan is to get which ship was hit)(maybe change to ship name or id)
          break;

        case 'up':
          this.board[y - i][x] = { value: 1, piece: ship, shipIndex: i }; //shipIndex = which part of the ship was hit (maybe useful)
          break;
      }
    }
  }

  receiveAttack(x, y, ship) {
    switch (this.board[y][x].value) {
      case 0:
        console.log('Water');
        this.board[y][x].value = -1;
        break;

      case 1:
        console.log('Hit');
        ship.hit();
        this.board[y][x].value = -2;
        this.gameOver();
        break;
    }
  }

  gameOver() {
    if (!this.ships.length) console.log('game over'); //function reset board
  }
}
