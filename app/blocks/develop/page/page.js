/* global SmoothScroll */
/* eslint-disable no-unused-vars, no-undef */

document.addEventListener(`DOMContentLoaded`, () => {
  const scroll = new SmoothScroll(`a[href*="#"]`, {
    speed: 1000,
    speedAsDuration: true
  });

  document.body.classList.remove(`page_no_js`);
  document.body.classList.add(`page_js`);

  const modals = document.querySelectorAll(`.modal`);

  const keydownHandler = ({keyCode}) => {
    if (keyCode === 27) {
      if (modals) {
        modals.forEach((modal) => {
          if (!modal.classList.contains(`modal--invisible`)) {
            helpers.modal.hide(modal);
            helpers.scroll.enable();
          }
        });
      }
    }
  };

  document.addEventListener(`keydown`, keydownHandler);
});
