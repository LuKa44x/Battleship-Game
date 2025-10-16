// 0 = water, 1 = ship, -1 = missed, -2 = hit

export class Ship {
  constructor(name, length) {
    this.name = name;
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

export class Gameboard {
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
  placeShip(x, y, ship) {
    this.ships.push(ship);

    this.board[x][y] = { value: 1, piece: ship }; //idea momentanea attraverso il nome prendo le ship in ships del player e vedo se li hits coincide con length e poi affondera
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

export class Player {
  constructor(name, isAI = false) {
    this.name = name;
    this.turn = false;
    this.isAI = isAI;
    this.gameboard = new Gameboard();
    this.ships = [];
    this.shots = []; //history of the shots

    this.createDefaultShip();
  }

  playTurn() {
    this.turn = true;
  }

  placeShip(x, y, ship, orientation) {
    this.gameboard.placeShip(x, y, ship, orientation);
  }

  createDefaultShip() {
    this.ships.push(new Ship('Carrier', 5));
    this.ships.push(new Ship('Battleship', 4));
    this.ships.push(new Ship('Destroyer', 3));
    this.ships.push(new Ship('Submarine', 3));
    this.ships.push(new Ship('Boat', 2));
  }
}
