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
  let isWin = false;

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (filledBox[i] === '' && !isWin) {
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
      isWin = true;
      
      if (winnerMark === 'draw') {
        textHandler.displayTurnMessage(winnerMark);
      } else {
        textHandler.displayWinnerMessage(winnerMark);
      }
      
      textHandler.displayNewScore(winnerMark);
      game.updateRound();
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
    isWin = false;
  };

  return { fillBox, reset, getWinnerMark };
})();

const textHandler = (() => {
  const message = document.querySelector('.message');
  let playerXScore = document.querySelector('.x');
  let playerOScore = document.querySelector('.o');

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
    if (mark === 'X') {
      playerXScore.textContent = game.getNewScore(mark) 
    } else if (mark === 'O') {
      playerOScore.textContent = game.getNewScore(mark);
    }
  };

  return { displayTurnMessage, displayWinnerMessage, displayNewScore };
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

  return { startRound, updateRound, getNewScore };
})();

game.startRound();
