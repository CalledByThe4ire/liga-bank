document.addEventListener(`DOMContentLoaded`, () => {
  const clickHandler = ({target}) => {
    document
      .getElementById(target.dataset.modal)
      .classList.remove(`modal--invisible`);
    document.body.classList.add(`page--overlay`);
  };

  const keydownHandler = ({keyCode}) => {
    if (keyCode === 27) {
      document
        .querySelector(`#modal-page-header`)
        .classList.add(`modal--invisible`);
      document.body.classList.remove(`page--overlay`);
    }
  };

  const login = document.querySelector(`#page-header-login`);
  login.addEventListener(`click`, clickHandler);

  document.addEventListener(`keydown`, keydownHandler);
  document.addEventListener(`click`, ({target}) => {
    if (target.classList.contains(`page--overlay`)) {
      target.classList.remove(`page--overlay`);
      target.querySelector(`.modal`).classList.add(`modal--invisible`);
    }
  });
});
