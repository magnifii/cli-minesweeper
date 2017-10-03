export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] != ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        };
        this._numberOfTiles--;
    };

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1, 1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = this._rowIndex + offset[0];
            const neighborColumnIndex = this._columnIndex + offset[1];
            if(this._neighborRowIndex >= 0 && this._neighborRowIndex < this._numberOfRows && this._neighborColumnIndex >= 0 && this._neighborColumnIndex < this._numberOfColumns) {
                if(this._bombBoard[this._neighborRowIndex][this._neighborColumnIndex] == 'B') {
                    this._numberOfBombs++;
                };
            };
        });
        return this._numberOfBombs;
    };
    
    hasSafeTiles() {
        return this.numberOfTiles !== this.numberOfBombs
    }
    
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    };  

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(' ');
            };
            board.push(row);
        };
        return board;
    };

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(null);
            };
            board.push(row);
        };
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if(board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            };
        };
    
        return board;
    };

}