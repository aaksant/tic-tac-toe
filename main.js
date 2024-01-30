// TODO: 1 - DONE - CORE - Complete basic gameplay
// TODO: 2 - DONE - CORE - Add check winner feature
// TODO: 2.1 - DONE - OPTIONAL - Alert when winner have found
// TODO: 3 - DONE - Add reset feature

const init = (() => {
  const filledBox = ['', '', '', '', '', '', '', '', ''];
  const boxNodes = document.querySelectorAll('.box');
  let currentMove = 'X';
  let isWin = false;

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (filledBox[i] === '') {
          filledBox[i] = currentMove;
          box.textContent = currentMove;
          currentMove = (currentMove === 'X') ? 'O' : 'X';
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
        filledBox[condition[0]] === filledBox[condition[1]] &&
        filledBox[condition[1]] === filledBox[condition[2]] &&
        filledBox[condition[0]] !== ''
      ) {
        isWin = true;
        setTimeout(showMessage, 100);
      }
    });
  };
  
  const showMessage = () => {
    if (isWin) {
      alert('Winner has found!');
    }
    reset();
  };

  const reset = () => {
    boxNodes.forEach((box) => {
      box.textContent = '';
    });
    filledBox.fill('');
    currentMove = 'X';
    isWin = false;
  };

  return { fillBox };
})();

init.fillBox();