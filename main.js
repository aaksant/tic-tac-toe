const board = (() => {
  const filledBox = ['', '', '', '', '', '', '', '', ''];
  const boxNodes = document.querySelectorAll('.box');
  let currentMark = 'X';

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (filledBox[i] === '') {
          filledBox[i] = currentMark;
          box.textContent = currentMark;
          currentMark = currentMark === 'X' ? 'O' : 'X';
          controller.displayTurnMessage(currentMark);
          checkWinner();
        }
      });
    });
  };

  const checkWinner = () => {
    const winnerMark = board.getWinnerMark();
  
    if (winnerMark === 'draw') {
      controller.displayWinnerMessage(winnerMark);
    } else if (winnerMark) {
      controller.displayWinnerMessage(winnerMark);
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

    return null;
  };

  const reset = () => {
    boxNodes.forEach((box) => box.textContent = '');
    filledBox.fill('');
    currentMark = 'X';
    controller.displayTurnMessage(currentMark);
  };

  return { fillBox, reset, getWinnerMark };
})();

const Player = (mark) => {
  const getMark = () => {
    return mark;
  };

  return { getMark };
};

const controller = (() => {
  const message = document.querySelector('.message');

  const displayTurnMessage = (mark) => {
    message.textContent = `It's ${mark}'s turn!`;
  };

  const displayWinnerMessage = (mark) => {
    if (mark === 'draw') {
      message.textContent = "It's a tie!";
    } else {
      message.textContent = `${mark} wins!`;
    }
  };

  return { displayTurnMessage, displayWinnerMessage };
})();

const game = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let currentRound = 1;

  const startRound = () => {
    board.fillBox();
  };

  return { startRound };
})();

game.startRound();
