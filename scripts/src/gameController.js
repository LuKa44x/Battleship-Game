import { Player } from './gameManager.js';
import { initializeEventListener } from './DOMManager.js';

export function game() {
  const player1 = new Player();
  const player2 = new Player();
  initializeEventListener(player1, player2);
}
