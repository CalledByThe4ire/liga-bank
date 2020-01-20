document.addEventListener(`DOMContentLoaded`, () => {
  const pageHeaderLogin = document.querySelector(`#page-header-login`);

  const clickHandler = ({target}) => {
    const form = document.querySelector(`#${target.dataset.modal} form`);
    let formSubmit = null;
    let formLogin = null;

    if (form) {
      formSubmit = form.querySelector(`[type="submit"]`);
      formLogin = form.elements.login;
    }

    const modal = document.getElementById(target.dataset.modal);

    if (modal) {
      modal.classList.remove(`modal--invisible`);
    }
    document.body.classList.add(`page--overlay`);

    if (localStorage.getItem(`loginFormData`)) {
      if (formSubmit) {
        formSubmit.focus();
      }
    } else {
      if (formLogin) {
        formLogin.focus();
      }
    }
  };

  const keydownHandler = ({keyCode}) => {
    if (keyCode === 27) {
      const modal = document.querySelector(`#modal-page-header`);

      if (modal) {
        modal.classList.add(`modal--invisible`);
      }

      document.body.classList.remove(`page--overlay`);
    }
  };

  if (pageHeaderLogin) {
    pageHeaderLogin.addEventListener(`click`, clickHandler);
  }

  document.addEventListener(`keydown`, keydownHandler);
  document.addEventListener(`click`, ({target}) => {
    if (target.classList.contains(`page--overlay`)) {
      target.classList.remove(`page--overlay`);
      target.querySelector(`.modal`).classList.add(`modal--invisible`);
    }
  });
});
