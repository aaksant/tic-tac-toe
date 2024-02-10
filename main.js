const MAX_ROUND = 3;

const Player = (mark) => {
  let score = 0;

  const getMark = () => {
    return mark;
  };

  const getScore = () => {
    return score;
  };

  const addScore = () => {
    score++;
  };

  return { getMark, getScore, addScore };
};

const board = (() => {
  const filledBox = ['', '', '', '', '', '', '', '', ''];
  const boxNodes = document.querySelectorAll('.box');
  let currentMark = 'X';
  let isRoundFinished = false;

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (filledBox[i] === '' && !isRoundFinished && !game.isGameFinished()) {
          filledBox[i] = currentMark;
          box.textContent = currentMark;
          currentMark = currentMark === 'X' ? 'O' : 'X';
          textHandler.displayTurnMessage(currentMark);
          checkWinner();
        }
      });
    });
  };

  const checkWinner = () => {
    const winnerMark = getWinnerMark();

    if (winnerMark === 'draw' || winnerMark) {
      isRoundFinished = true;
      game.setNextRound(winnerMark);
    }
  };

  const getWinnerMark = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const condition of winConditions) {
      if (
        filledBox[condition[0]] !== '' &&
        filledBox[condition[0]] === filledBox[condition[1]] &&
        filledBox[condition[1]] === filledBox[condition[2]]
      ) {
        return filledBox[condition[0]];
      }
    }

    if (!filledBox.includes('')) {
      return 'draw';
    }
  };

  const reset = () => {
    boxNodes.forEach((box) => (box.textContent = ''));
    filledBox.fill('');
    currentMark = 'X';
    textHandler.displayTurnMessage(currentMark);
    isRoundFinished = false;
  };

  return { fillBox, reset, getWinnerMark };
})();

const textHandler = (() => {
  const message = document.querySelector('.message');

  const setPlayersName = (playerXName, playerOName) => {
    const playerXElem = document.querySelector('.player-x .player-name');
    const playerOElem = document.querySelector('.player-o .player-name');

    playerXElem.textContent = playerXName;
    playerOElem.textContent = playerOName;
  };

  const displayTurnMessage = (mark) => {
    if (mark === 'draw') {
      message.textContent = "It's a tie!";
    } else {
      message.textContent = `${mark}'s turn`;
    }
  };

  const displayWinnerMessage = (mark) => {
    if (mark !== 'draw') {
      message.textContent = `${mark} wins!`;
    }
  };

  const displayNewScore = (mark) => {
    let playerXScore = document.querySelector('.player-x .player-score');
    let playerOScore = document.querySelector('.player-o .player-score');

    if (mark === 'X') {
      playerXScore.textContent = game.getNewScore(mark);
    } else if (mark === 'O') {
      playerOScore.textContent = game.getNewScore(mark);
    }
  };

  const displayFinalResult = () => {
    const playerXFinalScore = game.getNewScore('X');
    const playerOFinalScore = game.getNewScore('O');

    if (playerXFinalScore > playerOFinalScore) {
      message.textContent = 'Player X wins the game!';
    } else if (playerXFinalScore < playerOFinalScore) {
      message.textContent = 'Player O wins the game!';
    } else {
      message.textContent = "It's a tie! The game ends in a draw.";
    }
  };

  return {
    setPlayersName,
    displayTurnMessage,
    displayWinnerMessage,
    displayNewScore,
    displayFinalResult
  };
})();

const game = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let currentRound = 1;

  const startRound = () => {
    board.fillBox();
  };

  const updateRound = () => {
    currentRound++;
  };

  const getNewScore = (mark) => {
    if (mark === 'X') {
      playerX.addScore();
      return playerX.getScore();
    } else if (mark === 'O') {
      playerO.addScore();
      return playerO.getScore();
    }
  };

  const isGameFinished = () => {
    return currentRound > MAX_ROUND;
  };

  const setNextRound = (winnerMark) => {
    textHandler.displayTurnMessage(winnerMark);

    setTimeout(() => {
      board.reset();

      if (winnerMark === 'draw') {
        if (isGameFinished()) {
          textHandler.displayFinalResult();
        }
      } else {
        if (isGameFinished()) {
          textHandler.displayFinalResult();
        }

        textHandler.displayWinnerMessage(winnerMark);
        textHandler.displayNewScore(winnerMark);
        updateRound();
      }
    }, 500);
  };

  return {
    startRound,
    updateRound,
    getNewScore,
    isGameFinished,
    setNextRound
  };
})();

const page = (() => {
  const getDialogData = () => {
    const dialog = document.getElementById('dialog');
    document.addEventListener('DOMContentLoaded', () => {
      dialog.showModal();
      const submitBtn = document.getElementById('submitBtn');

      submitBtn.addEventListener('click', () => {
        const playerXName = document.getElementById('playerX').value;
        const playerOName = document.getElementById('playerO').value;

        textHandler.setPlayersName(playerXName, playerOName);
        dialog.close();
      });
    });
  };

  return { getDialogData };
})();

game.startRound();
page.getDialogData();
