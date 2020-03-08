/* eslint-disable no-unused-vars */
const helpers = {
  modal: {
    hide(modal) {
      modal.classList.add(`modal--invisible`, `fadeOut`);
      modal.classList.remove(`fadeIn`);
    },
    show(modal) {
      modal.classList.remove(`modal--invisible`, `fadeOut`);
      modal.classList.add(`fadeIn`);
    }
  },
  scroll: {
    disable() {
      document.body.classList.add(`page--no-scroll`);
      document.body.classList.remove(`page--transparent`);
      document.body.style.paddingRight = `${helpers.getScrollbarWidth()}px`;
    },
    enable() {
      document.body.classList.remove(`page--no-scroll`);
      document.body.classList.add(`page--transparent`);
      document.body.style.paddingRight = ``;
    }
  },
  hideModal(modal) {
    if (!modal.classList.contains(`modal--invisible`)) {
      modal.classList.add(`modal--invisible`, `fadeOut`);
      modal.classList.remove(`fadeIn`);
    }

    document.body.classList.remove(`page--no-scroll`);
    document.body.classList.add(`page--transparent`);
    document.body.style.paddingRight = ``;
  },
  num2str(n, textForms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) {
      return textForms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return textForms[1];
    }
    if (n1 === 1) {
      return textForms[0];
    }
    return textForms[2];
  },
  getPercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  },
  round(x, multiplier) {
    if (x % multiplier === 0) {
      return Math.floor(x / multiplier) * multiplier;
    }
    return Math.floor(x / multiplier) * multiplier + multiplier;
  },
  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
};
