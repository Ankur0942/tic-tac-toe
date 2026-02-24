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

    const printBoard = () => {
        const b = Gameboard.getBoard();
        console.log(`
            ${b[0] || 0} | ${b[1] || 1} | ${b[2] || 2}
            ${b[3] || 3} | ${b[4] || 4} | ${b[5] || 5}
            ${b[6] || 6} | ${b[7] || 7} | ${b[8] || 8}
            `);
    };

    const playRound = (index) => {
        const success = Gameboard.placeMaker(index, currentPlayer.marker);

        if (!success) {
            console.log("This square is already taken");
            return;
        }

        printBoard();

        const winner = checkWinner();
        if (winner) {
            console.log(`${winner.name} wins!`);
            Gameboard.reset();
            currentPlayer = playerX;
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            Gameboard.reset();
            currentPlayer = playerX;
            return;
        }

        switchPlayer();
        console.log(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    };

    //start the game
    console.log("Game started! Player X goes first");
    console.log("Call GameController.playRound(index) with index 0-8 to play.");
    printBoard();

    return { playRound };
})();

