const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMaker = (marker, index) => {
        if (board[index] === ""){
            board[index] = marker;
            return true;
        }
        return false; //square was taken
    }

    const reset = () => {
        board.forEach((_, i) => board[i] = "");
    };

    return {getBoard, placeMaker, reset};

})();

const createPlayer = () => {
    const playerX = ;
    const playerO = ;
};

const gameController = (() => {

    const playRound = () => { };

    const checkWinner = () => {
    const winMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
};

    const currentPlayer = () => { };

    const switchPlayer = () => { };

    const checkIfEmpty = () => { };
})()

