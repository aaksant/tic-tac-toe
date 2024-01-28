// TODO: complete basic gameplay
const init = (() => {
  const X_MARK = 'X';
  const O_MARK = 'O';
  const boxes = document.querySelectorAll('.box');

  // fill
  const fillBox = () => {
    boxes.forEach((box, i) => {
      if (i % 2 === 0) {
        box.addEventListener('click', () => (box.textContent = X_MARK));
      } else {
        box.addEventListener('click', () => (box.textContent = O_MARK));
      }
    });
  };

  return { fillBox };
})();

const game = init;
game.fillBox();
