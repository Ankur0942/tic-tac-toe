const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMaker = (index, marker) => {
        if (board[index] === ""){
            board[index] = marker;
            return true;
        }
        return false; //square was taken
    };

    const reset = () => {
        board.forEach((_, i) => board[i] = "");
    };

    return {getBoard, placeMaker, reset};

})();

const createPlayer = (name, marker) => {
    return {name, marker};
};

const GameController = (() => {

    const playerX = createPlayer("Player X", "X");
    const playerO = createPlayer("Player O", "O");

    let currentPlayer = playerX;

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6]             //diagonals
    ];

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        for (combo of winCombos) { // for..in will give me the "index" of each element ("[0], [1], [2]..") so I used for..of to get the "value" of each element [0, 1, 2]
            const [a, b, c] = combo;
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return currentPlayer; //this player just won
            }
        }
        return null;
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(square => square !== "")
    }; 

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const resetGame = () => { currentPlayer = playerX; }

    const playRound = (index) => {
        const success = Gameboard.placeMaker(index, currentPlayer.marker);

        if (!success) {
            DisplayController.updateMessage("This square is already taken");
            return;
        }

        DisplayController.renderBoard();

        const winner = checkWinner();
        if (winner) {
            DisplayController.updateMessage(`${winner.name} wins!`);
            return;
        }

        if (checkTie()) {
            DisplayController.updateMessage("It's a tie!");
            return;
        }

        switchPlayer();
        DisplayController.updateMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    };

    return { playRound, resetGame };
})();

const DisplayController = (() => {

    const boardDiv = document.querySelector('.board');
    const messageDiv = document.querySelector('.message');
    const restartBtn = document.getElementById('restart')

    const renderBoard = () => {
        boardDiv.innerHTML = "";
        
        const boardArray = Gameboard.getBoard();

        boardArray.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.index = index;
            cellDiv.textContent = cell; // "X", "O", ""
            cellDiv.addEventListener('click', () => {
                GameController.playRound(index);
            });
            boardDiv.appendChild(cellDiv);
        })

    };
    
    const updateMessage = (text) => { 
        messageDiv.textContent = text;
    };

    restartBtn.addEventListener('click', () => {
        Gameboard.reset();
        GameController.resetGame();
        renderBoard();
        updateMessage("Player X's turn");
    })

    return {renderBoard, updateMessage};
})();
