const board = (() => {
  const filledBox = ['', '', '', '', '', '', '', '', ''];
  const boxNodes = document.querySelectorAll('.box');
  let currentMark = 'X';
  let isWin = false;

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (filledBox[i] === '') {
          filledBox[i] = currentMark;
          box.textContent = currentMark;
          currentMark = (currentMark === 'X') ? 'O' : 'X';
          controller.displayTurn(currentMark);
          checkWinner();
        }
      });
    });
  };

  const checkWinner = () => {
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

    winConditions.forEach((condition) => {
      if (
        filledBox[condition[0]] !== '' &&
        filledBox[condition[0]] === filledBox[condition[1]] &&
        filledBox[condition[1]] === filledBox[condition[2]]
      ) {
        isWin = true;
        controller.displayWinner(filledBox[condition[0]]);
      }
    });
  };

  return { fillBox, checkWinner };
})();

const Player = (mark) => {
  const getMark = () => {
    return mark;
  };

  return { getMark };
};

const controller = (() => {
  const message = document.querySelector('.message');

  const displayTurn = (mark) => {
    message.textContent = `${mark}'s turn`;
  };

  const displayWinner = (mark) => {
    message.textContent = `${mark} wins!`;
  };

  return { displayTurn, displayWinner };
})();

const game = (() => {
  const startRound = () => {
    board.fillBox();
  };

  return { startRound };
})();

game.startRound();
