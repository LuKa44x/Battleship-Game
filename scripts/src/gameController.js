import { Player } from './gameManager.js';
import { initializeEventListener } from './DOMManager.js';

class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.phase = 'placement'; //placement, battle, gameOver
    this.turn = this.player1;
  }

  start() {
    initializeEventListener(this.player1, this.player2);
    this.player1.turn = true;
  }

  switchTurn(player1, player2) {
    if (player1.turn === true) {
      player1.turn = false;
      player2.playTurn();
      this.turn = this.player2;
      alert(`It's ${player2.name}'s turn!`);
    } else if (player2.turn === true) {
      player2.turn = false;
      player1.playTurn();
      this.turn = this.player1;
      alert(`It's ${player1.name}'s turn!`);
    }
  }

  battle() {
    this.phase = 'battle';
    console.log('Battle');
  }

  gameOver() {
    this.phase = 'gameOver';
  }
}

export const game = new Game();
