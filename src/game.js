import { Board } from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('GAME OVER SUCKA!');
            this._board.print();
        } else if (this._board.hasSafeTiles === 0) {
            console.log('Congratulations! You Won...just.');
            this._board.print();
        } else {
            console.log('Current Board: ');
            this._board.print();
        }
    }

}