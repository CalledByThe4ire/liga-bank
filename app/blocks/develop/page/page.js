/* global SmoothScroll */
/* eslint-disable no-unused-vars */

document.addEventListener(`DOMContentLoaded`, () => {
  const scroll = new SmoothScroll(`a[href*="#"]`, {
    speed: 1000,
    speedAsDuration: true
  });
  const page = document.querySelector(`.page`);
  page.classList.remove(`page_no_js`);
  page.classList.add(`page_js`);

  const keydownHandler = ({keyCode}) => {
    if (keyCode === 27) {
      const modals = document.querySelectorAll(`.modal`);

      if (modals) {
        modals.forEach((modal) => {
          if (!modal.classList.contains(`modal--invisible`)) {
            modal.classList.add(`modal--invisible`, `fadeOut`);
            modal.classList.remove(`fadeIn`);
          }
          document.body.style.cssText = `padding-right: ''; overflow: ''`;
        });
      }

      document.body.classList.remove(`page--overlay`);
    }
  };

  const clickHandler = ({target}) => {
    if (target.classList.contains(`page--overlay`)) {
      target.classList.remove(`page--overlay`);
      const modals = target.querySelectorAll(`.modal`);
      modals.forEach((modal) => {
        if (!modal.classList.contains(`modal--invisible`)) {
          modal.classList.add(`modal--invisible`, `fadeOut`);
          modal.classList.remove(`fadeIn`);
        }
        document.body.style.cssText = `padding-right: ''; overflow: ''`;
      });
    }
  };

  document.addEventListener(`keydown`, keydownHandler);
  document.addEventListener(`click`, clickHandler);
});
