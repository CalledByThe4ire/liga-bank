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


  if (pageHeaderLogin) {
    pageHeaderLogin.addEventListener(`click`, clickHandler);
  }
});
