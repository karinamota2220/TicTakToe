// Step 1: Creating the Gameboard Object
const Gameboard = {
    board: ["", "", "", "", "", "", "", "", ""], // is an array of 9 elements representing a 3x3 tic-tac-toe grid.
    printBoard() {
      console.log(this.board); // Just to check in console
    }
  };
  
  //Step 2: Creating Player Objects with createPlayer Function
  const createPlayer = (name, marker) => {
    return { name, marker };
  }; // This is a factory function that creates and returns player objects.

// Step 3: Creating the GameController Object
  const GameController = {
    players: [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")], //The players array stores two player objects created using createPlayer().
    currentPlayerIndex: 0, // currentPlayerIndex keeps track of whose turn it is (0 = Player 1, 1 = Player 2).
  
    // Step 4: Getting the Current Player
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    },
  
    // Step 5: Switching Players
    switchPlayer() {
      this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    },
  
    //Step 6: Playing a Move
    playMove(position) {
      if (Gameboard.board[position] === "") {
        Gameboard.board[position] = this.getCurrentPlayer().marker;
        this.switchPlayer();
      } else {
        console.log("Position already taken!");
      }
    }
  };
  
  //Step 7: Testing the Game in the Console
  // Example Usage:
  GameController.playMove(0); // Player 1 places "X" at position 0
  Gameboard.printBoard();
  GameController.playMove(1); // Player 2 places "O" at position 1
  Gameboard.printBoard();
  
