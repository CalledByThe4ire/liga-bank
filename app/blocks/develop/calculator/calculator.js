document.addEventListener(`DOMContentLoaded`, () => {
  const calculator = document.querySelector(`#calculator`);


  const creditSelectionForm = calculator.querySelector(`#credit-selection`);
  const creditSelectionTitle = creditSelectionForm.querySelector(`legend`);

  const creditCalculationForms = calculator.querySelectorAll(`.calculator__credit-form--calculation form`);
  const creditOfferingForm = calculator.querySelector(`#credit-offer`);
  const creditRegistrationForm = calculator.querySelector(`#credit-registration`);

  // remove after code completion
  creditCalculationForms[0].hidden = false;

  const num2str = (n, textForms) => {
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
  };

  creditSelectionForm.addEventListener(`click`, ({ target }) => {
    target
      .closest(`.calculator__form-field`)
      .classList.toggle(`calculator__form-field--open`);
  });

  creditSelectionForm
    .querySelectorAll(`.calculator__forms-list-item`)
    .forEach(item =>
      item.addEventListener(`click`, event => {
        const { target } = event;
        event.stopPropagation();
        creditCalculationForms.forEach(form => {
          if (form.name !== target.dataset.creditType) {
            form.hidden = true;
          } else {
            form.hidden = false;
          }
        });
        creditSelectionTitle.value = target.textContent;
        creditSelectionTitle.parentElement.classList.remove(
          `calculator__form-field--open`
        );
      })
    );
});
