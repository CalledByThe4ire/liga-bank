/* global Swiper */
/* eslint-disable no-unused-vars */

document.addEventListener(`DOMContentLoaded`, () => {
  // tab' switch behaviour
  const servicesLinks = document.querySelectorAll(`#services .services__link`);
  const servicesTabs = document.querySelectorAll(`#services .tab-service`);

  if (servicesLinks && servicesTabs) {
    const eventHandler = (event, activeElement) => {
      const {type, keyCode} = event;

      if (type === `click`) {
        event.preventDefault();
        removeActiveTab();
        addActiveTab(activeElement);
      } else if (type === `keyup` && keyCode === 9) {
        removeActiveTab();
        addActiveTab(activeElement);
      }
    };

    [`click`, `keyup`].forEach((event) => {
      servicesLinks.forEach((link) => {
        link.addEventListener(event, (e) => eventHandler(e, link));
      });
    });

    const removeActiveTab = () => {
      servicesLinks.forEach((link) => {
        link
          .closest(`.services__list-item`)
          .classList.remove(`services__list-item--active`);
      });
      servicesTabs.forEach((section) => {
        section.classList.remove(`tab-service--active`);
      });
    };

    const addActiveTab = (link) => {
      link
        .closest(`.services__list-item`)
        .classList.add(`services__list-item--active`);
      const href = link.getAttribute(`href`);
      const matchingSection = document.querySelector(href);
      matchingSection.classList.add(`tab-service--active`);
    };
  }

  // slider
  const breakpoint = window.matchMedia(`only screen and (max-width: 1023px)`);
  let servicesSlider = null;

  const enableSlider = () => {
    servicesSlider = new Swiper(`#services`, {
      loop: true,
      speed: 500,
      spaceBetween: 10,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: `.swiper-pagination`,
        type: `bullets`,
        clickable: `false`
      }
    });
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      enableSlider();
      if (servicesTabs) {
        Array.from(servicesTabs).forEach((section) =>
          section.classList.contains(`tab-service--active`)
            ? section.classList.remove(`tab-service--active`)
            : section
        );
      }
    } else {
      if (servicesSlider) {
        servicesSlider.destroy();
        if (servicesTabs) {
          Array.from(servicesTabs).forEach((section, index) =>
            index === 0
              ? section.classList.add(`tab-service--active`)
              : section.classList.remove(`tab-service--active`)
          );
        }
      }
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);
});
