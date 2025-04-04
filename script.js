document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector("#startGame");
    const restartBtn = document.querySelector("#restart");
    const name1Input = document.querySelector("#player1Name");
    const name2Input = document.querySelector("#player2Name");
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector("#message");
    const gameboard = document.querySelector("#gameboard");
    const setupScreen = document.querySelector("#setup");
  
    const updateBoard = () => {
      const board = Gameboard.getBoard();
      cells.forEach((cell, index) => {
        cell.textContent = board[index]; // This should update the cell content
      });
      console.log("Board updated: ", board); // Debugging
    };
  
    const updateMessage = (result) => {
      if (result) {
        message.textContent = result;
      } else {
        message.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
      }
    };
  
    const handleClick = (e) => {
      const index = e.target.dataset.index;
      const result = GameController.playRound(index);
      updateBoard();
      updateMessage(result);
    };
  
    const startGame = () => {
      const player1 = name1Input.value || "Player 1";
      const player2 = name2Input.value || "Player 2";
      
      // Start the game by initializing GameController with player names
      GameController.startGame(player1, player2);
  
      // Debugging: Log the current state after starting
      console.log("Game started with players:", player1, player2);
      
      // Hide setup screen and show the gameboard
      setupScreen.classList.add("hidden");
      gameboard.classList.remove("hidden");
  
      // Update the board and message
      updateBoard();
      updateMessage();
    };
  
    const restartGame = () => {
      GameController.resetGame();
      updateBoard();
      updateMessage();
  
      // Show setup screen and hide the gameboard
      gameboard.classList.add("hidden");
      setupScreen.classList.remove("hidden");
  
      // Debugging: Log restart event
      console.log("Game restarted");
    };
  
    // Event listeners
    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", restartGame);
    cells.forEach(cell => cell.addEventListener("click", handleClick));
  });
  
  // Step 1: Creating the Gameboard Module (Using IIFE)
  const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""]; // 3 by 3 grid
  
    const getBoard = () => board;
  
    const placeMarker = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker; // Updates the board array
        return true; // Return true if move was successful
      }
      return false; // Return false if cell is already taken
    };
  
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = ""; // Reset the board
      }
    };
  
    return {
      getBoard,
      placeMarker,
      resetBoard,
    };
  })();
  
  // Player Factory
  const createPlayer = (name, marker) => {
    return { name, marker };
  };
  
  // Game Controller Module (IIFE)
  const GameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
  
    const getCurrentPlayer = () => players[currentPlayerIndex];
  
    const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayerIndex = 0;
      gameOver = false;
    };
  
    const startGame = (name1, name2) => {
      players = [
        createPlayer(name1 || "Player 1", "X"),
        createPlayer(name2 || "Player 2", "O"),
      ];
      currentPlayerIndex = 0;
      gameOver = false;
      Gameboard.resetBoard();
    };
  
    const playRound = (position) => {
      if (gameOver) return;
  
      const success = Gameboard.placeMarker(position, getCurrentPlayer().marker);
      if (!success) return; // If the move was not valid, exit
  
      if (checkWinner()) {
        console.log(`${getCurrentPlayer().name} wins!`);
        gameOver = true;
        return `${getCurrentPlayer().name} wins!`;
      }
  
      if (Gameboard.getBoard().every((cell) => cell !== "")) {
        console.log("It's a tie!");
        gameOver = true;
        return "It's a tie!";
      }
  
      switchPlayer();
    };
  
    const switchPlayer = () => {
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
  
    const checkWinner = () => {
      const board = Gameboard.getBoard();
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winPatterns.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[b] === board[c];
      });
    };
  
    return {
      playRound,
      getCurrentPlayer,
      resetGame,
      startGame,
    };
  })();
  