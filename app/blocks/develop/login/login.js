document.addEventListener(`DOMContentLoaded`, () => {
  const pageHeaderLogin = document.querySelector(`#page-header-login`);

  const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

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
      modal.classList.remove(`modal--invisible`, `fadeOut`);
      modal.classList.add(`animated`, `fadeIn`);
    }
    if (!document.body.classList.contains(`page--overlay`)) {
      document.body.classList.add(`page--overlay`);
    }
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.cssText = `background-color: #f6f7ff; padding-right: ${scrollbarWidth}px; overflow: hidden`;

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
