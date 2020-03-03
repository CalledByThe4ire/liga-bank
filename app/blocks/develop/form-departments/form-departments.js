document.addEventListener(`DOMContentLoaded`, () => {
  const triggerClick = (element) => {
    element.addEventListener(`keydown`, (event) => {
      const {keyCode, target} = event;
      if (keyCode === 13 || keyCode === 32) {
        target.click();
      }
    });
  };

  document
    .querySelectorAll(`form#departments-form label`)
    .forEach((label) => triggerClick(label));
});
