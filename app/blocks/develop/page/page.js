document.addEventListener(`DOMContentLoaded`, () => {
  const page = document.querySelector(`.page`);
  page.classList.remove(`page_no_js`);
  page.classList.add(`page_js`);

  const keydownHandler = ({keyCode}) => {
    if (keyCode === 27) {
      const modals = document.querySelectorAll(`.modal`);

      if (modals) {
        modals.forEach((modal) => {
          if (!modal.classList.contains(`modal--invisible`)) {
            modal.classList.add(`modal--invisible`);
          }
        });
      }

      document.body.classList.remove(`page--overlay`);
    }
  };

  document.addEventListener(`keydown`, keydownHandler);
  document.addEventListener(`click`, ({target}) => {
    if (target.classList.contains(`page--overlay`)) {
      target.classList.remove(`page--overlay`);
      const modals = target.querySelectorAll(`.modal`);
      modals.forEach((modal) => {
        if (!modal.classList.contains(`modal--invisible`)) {
          modal.classList.add(`modal--invisible`);
        }
      });
    }
  });
});
