document.addEventListener(`DOMContentLoaded`, () => {
  const links = document.querySelectorAll(`#services .services__link`);
  const sections = document.querySelectorAll(`#services .tab-service`);

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
    links.forEach((link) => {
      link.addEventListener(event, (e) => eventHandler(e, link));
    });
  });

  const removeActiveTab = () => {
    links.forEach((link) => {
      link
        .closest(`.services__list-item`)
        .classList.remove(`services__list-item--active`);
    });
    sections.forEach((section) => {
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
});
