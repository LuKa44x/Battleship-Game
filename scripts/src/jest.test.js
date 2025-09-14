/**
 * This file contains Jest test cases for the Battleship Game.
 *
 * It imports the `ship` and `gameboard` modules from the `gameManager.js` file
 * to test their functionality and ensure they work as expected.
 */
import { ship, gameboard } from './gameManager.js';

test('Ship takes a hit and records it', () => {
  const testShip = new ship(3); // Ship of length 3
  testShip.hit(0);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});

test('Ship does not sink if not all positions are hit', () => {
  const testShip = new ship(4); // Ship of length 4
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBe(false);
});

describe('Gameboard Module', () => {
  test('Place a ship on the gameboard', () => {
    const gameArea = new gameboard();
    const testShip = new ship(3);
    gameArea.placeShip(testShip, 1, 1, 'right');
    expect(gameArea.board[1][1]).toBe(1);
    expect(gameArea.board[1][2]).toBe(1);
    expect(gameArea.board[1][3]).toBe(1);
  });
});
test('Receive an attack and record a hit', () => {
  const board = new gameboard();
  const testShip = new ship(3);
  board.placeShip(testShip, 5, 6, 'right');
  board.receiveAttack(5, 6, testShip);
  expect(testShip.isSunk()).toBe(false);
  board.receiveAttack(6, 6, testShip);
  board.receiveAttack(7, 6, testShip);
  expect(testShip.isSunk()).toBe(true);
});

test('Receive an attack and record a miss', () => {
  const board = new gameboard();
  board.receiveAttack(5, 5);
  expect(board.board[5][5]).toBe(-1);
});
