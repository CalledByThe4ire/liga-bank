document.addEventListener(`DOMContentLoaded`, () => {
  const breakpoint = window.matchMedia(`only screen and (max-width: 767px)`);
  const trigger = document.querySelector(`.main-nav__trigger`);
  const nav = document.querySelector(`.main-nav-list`);
  const events = [`click`, `keydown`];

  const toggleMenu = (state, element) => {
    switch (state) {
      case `close`:
        element.classList.remove(`main-nav__trigger--open-menu`);
        element.classList.add(`main-nav__trigger--close-menu`);
        element.setAttribute(`aria-label`, `Close menu`);
        element
          .querySelector(`use`)
          .setAttribute(`xlink:href`, `#main-nav__close`);
        if (nav) {
          nav.classList.remove(`main-nav-list--hidden`, `fadeOut`);
          nav.classList.add(`animated`, `fadeIn`);
        }
        break;
      case `open`:
        element.classList.remove(`main-nav__trigger--close-menu`);
        element.classList.add(`main-nav__trigger--open-menu`);

        element.setAttribute(`aria-label`, `Open menu`);
        element
          .querySelector(`use`)
          .setAttribute(`xlink:href`, `#main-nav__menu`);
        if (nav) {
          nav.classList.add(`main-nav-list--hidden`, `fadeOut`);
          nav.classList.remove(`main-nav-list--hidden`, `fadeIn`);
        }
        break;
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  };

  const triggerClickHandler = ({currentTarget}) => {
    if (currentTarget.classList.contains(`main-nav__trigger--open-menu`)) {
      toggleMenu(`close`, currentTarget);
    } else if (
      currentTarget.classList.contains(`main-nav__trigger--close-menu`)
    ) {
      toggleMenu(`open`, currentTarget);
    }
  };

  const documentClickHandler = (event) => {
    const {type, target} = event;
    if (type === `click`) {
      if (!target.closest(`.main-nav`)) {
        if (trigger) {
          toggleMenu(`open`, trigger);
        }
      }
    }
    if (type === `keydown` && event.keyCode === 27) {
      if (trigger) {
        toggleMenu(`open`, trigger);
      }
    }
  };

  trigger.addEventListener(`click`, triggerClickHandler);

  const breakpointChecker = () => {
    if (trigger && nav) {
      if (breakpoint.matches) {
        toggleMenu(`open`, trigger);
        events.forEach((event) => {
          document.addEventListener(event, documentClickHandler);
        });
      } else {
        toggleMenu(`close`, trigger);
        events.forEach((event) => {
          document.removeEventListener(event, documentClickHandler);
        });
      }
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);
});

