/* global Swiper */
/* eslint-disable no-unused-vars */

document.addEventListener(`DOMContentLoaded`, () => {
  // tab' switch behaviour
  const servicesListItems = document.querySelectorAll(
      `#services .services__list-item`
  );
  const servicesLinks = document.querySelectorAll(`#services .services__link`);
  const servicesTabs = document.querySelectorAll(`#services .tab-services`);

  if (servicesLinks && servicesTabs) {
    const eventHandler = (event, activeElement, activeElementIndex) => {
      const {type, keyCode} = event;

      if (type === `click`) {
        event.preventDefault();
        removeActiveTab();
        addActiveTab(activeElement, activeElementIndex);
      } else if (type === `keyup` && keyCode === 9) {
        removeActiveTab();
        addActiveTab(activeElement, activeElementIndex);
      }
    };

    [`click`, `keyup`].forEach((eventName) => {
      servicesLinks.forEach((link, linkIndex) => {
        link.addEventListener(eventName, (e) => eventHandler(e, link, linkIndex));
      });
    });

    const removeActiveTab = () => {
      servicesLinks.forEach((link) => {
        link
          .closest(`.services__list-item`)
          .classList.remove(`services__list-item--active`);
      });
      servicesTabs.forEach((section) => {
        section.classList.remove(`tab-services--active`);
      });
    };

    const addActiveTab = (link, linkIndex) => {
      link
        .closest(`.services__list-item`)
        .classList.add(`services__list-item--active`);
      const tabIndex = Array.from(servicesTabs).findIndex(
          (tab, index) => index === linkIndex
      );
      servicesTabs.forEach((tab, index) => {
        if (index === tabIndex) {
          tab.classList.add(`tab-services--active`);
        }
      });
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

  const removeActveClass = (list, cls) => {
    list.forEach((item) =>
      item.classList.contains(`${cls}`)
        ? item.classList.remove(`${cls}`)
        : item
    );
  };

  const makeFirstElementActive = (list, cls) => {
    list.forEach((item, index) =>
      index === 0
        ? item.classList.add(`${cls}`)
        : item.classList.remove(`${cls}`)
    );
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      enableSlider();
      if (servicesTabs && servicesListItems) {
        removeActveClass(servicesTabs, `tab-service--active`);
        removeActveClass(servicesListItems, `services__list-item--active`);
      }
    } else {
      if (servicesSlider) {
        servicesSlider.destroy();

        if (servicesTabs && servicesListItems) {
          makeFirstElementActive(servicesTabs, `tab-service--active`);
          makeFirstElementActive(servicesListItems, `services__list-item--active`);
        }
      }
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);
});
