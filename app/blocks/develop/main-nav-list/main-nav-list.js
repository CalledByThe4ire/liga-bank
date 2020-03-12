document.addEventListener(`DOMContentLoaded`, () => {
  const breakpoint = window.matchMedia(`only screen and (max-width: 767px)`);
  const trigger = document.querySelector(`.main-nav__trigger`);
  const nav = document.querySelector(`.main-nav-list`);

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

  const clickHandler = ({currentTarget}) => {
    if (currentTarget.classList.contains(`main-nav__trigger--open-menu`)) {
      toggleMenu(`close`, currentTarget);
    } else if (
      currentTarget.classList.contains(`main-nav__trigger--close-menu`)
    ) {
      toggleMenu(`open`, currentTarget);
    }
  };

  trigger.addEventListener(`click`, clickHandler);

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      if (trigger) {
        toggleMenu(`open`, trigger);
      }

      if (nav.classList.contains(`fadeIn`)) {
        nav.classList.remove(`fadeIn`);
        nav.classList.add(`fadeOut`);
      }
    } else {
      if (trigger) {
        toggleMenu(`close`, trigger);
      }
      if (nav.classList.contains(`fadeOut`)) {
        nav.classList.remove(`fadeOut`);
        nav.classList.add(`fadeIn`);
      }
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);

  [`click`, `keydown`].forEach((event) => {
    document.addEventListener(event, (e) => {
      const {type, target} = e;
      if (type === `click`) {
        if (!target.closest(`.main-nav`)) {
          toggleMenu(`open`, document.querySelector(`.main-nav__trigger`));
        }
      }
      if (type === `keydown` && e.keyCode === 27) {
        toggleMenu(`open`, document.querySelector(`.main-nav__trigger`));
      }
    });
  });
});
