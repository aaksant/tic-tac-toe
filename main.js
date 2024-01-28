// TODO: complete basic gameplay
const init = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const boxNodes = document.querySelectorAll('.box');
  let currentMark = 'X';

  const fillBox = () => {
    boxNodes.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (board[i] === '') {
          board[i] = currentMark;
          box.textContent = currentMark;
          currentMark = (currentMark === 'X') ? 'O' : 'X';
        }
      });
    });
  };

  return { fillBox };
})();

const game = init;
game.fillBox();