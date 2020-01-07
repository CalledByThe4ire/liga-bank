document.addEventListener(`DOMContentLoaded`, () => {
  const trigger = document.querySelector(`.main-nav__trigger`);
  const mq = window.matchMedia(`only screen and (min-width: 768px)`);

  const toggleMenu = (state, selector) => {
    const nav = selector.closest(`.main-nav`).querySelector(`.main-nav-list`);

    switch (state) {
      case `close`:
        selector.classList.remove(`main-nav__trigger--open-menu`);
        selector.classList.add(`main-nav__trigger--close-menu`);
        selector.setAttribute(`aria-label`, `Close menu`);
        selector
          .querySelector(`use`)
          .setAttribute(`xlink:href`, `#main-nav__close`);
        nav.classList.add(`main-nav-list--phone`);
        break;
      case `open`:
        selector.classList.remove(`main-nav__trigger--close-menu`);
        selector.classList.add(`main-nav__trigger--open-menu`);

        selector.setAttribute(`aria-label`, `Open menu`);
        selector
          .querySelector(`use`)
          .setAttribute(`xlink:href`, `#main-nav__menu`);
        nav.classList.remove(`main-nav-list--phone`);
        break;
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  };

  const matchMedia = () => {
    if (mq.matches) {
      const triggerAttr = trigger
        .querySelector(`use`)
        .getAttribute(`xlink:href`);
      if (triggerAttr.endsWith(`close`)) {
        toggleMenu(`open`, trigger);
      }
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

  matchMedia();
  window.addEventListener(`resize`, matchMedia);
  trigger.addEventListener(`click`, clickHandler);
});
