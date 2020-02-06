/* global IMask */
/* eslint-disable no-unused-vars, new-cap, max-nested-callbacks */

document.addEventListener(`DOMContentLoaded`, () => {
  const calculator = document.querySelector(`#calculator`);
  let creditSelectionForm = null;
  let creditSelectionTitle = null;
  let creditSelectionFormField = null;
  let creditCalculationForms = null;
  let creditOfferingForm = null;
  let creditRegistrationForm = null;

  if (calculator) {
    creditSelectionForm = calculator.querySelector(`#credit-selection`);
    if (creditSelectionForm) {
      creditSelectionTitle = creditSelectionForm.querySelector(`input`);
      creditSelectionFormField = creditSelectionForm.querySelector(
          `.calculator__form-field`
      );
    }

    creditCalculationForms = calculator.querySelectorAll(
        `.calculator__credit-form--calculation form`
    );
    creditOfferingForm = calculator.querySelector(`#credit-offer`);
    creditRegistrationForm = calculator.querySelector(`#credit-registration`);
  }

  // remove after code completion
  creditCalculationForms[0].hidden = false;

  const toggleFocus = (element, parentElement, selector) => {
    element.addEventListener(`focus`, () => {
      if (!parentElement.classList.contains(`${selector}--focus`)) {
        parentElement.classList.add(`${selector}--focus`);
      }
    });

    element.addEventListener(`blur`, () => {
      if (parentElement.classList.contains(`${selector}--focus`)) {
        parentElement.classList.remove(`${selector}--focus`);
      }
    });
  };

  const triggerClick = (element) => {
    element.addEventListener(`keydown`, (event) => {
      const {keyCode, target} = event;
      if (keyCode === 13 || keyCode === 32) {
        target.click();
      }
    });
  };

  // Шаг 1 (Цель кредита)
  if (creditSelectionFormField) {
    creditSelectionFormField.addEventListener(`click`, (evt) => {
      const {currentTarget} = evt;
      currentTarget.classList.toggle(`calculator__form-field--open`);

      document.addEventListener(`click`, (event) => {
        const rect = currentTarget.getBoundingClientRect();
        const isInFormField =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInFormField) {
          if (
            currentTarget.classList.contains(`calculator__form-field--open`)
          ) {
            currentTarget.classList.remove(`calculator__form-field--open`);
          }
        }
      });
    });
  }

  if (creditSelectionForm) {
    creditSelectionForm
      .querySelectorAll(`.calculator__forms-list-item`)
      .forEach((item) => {
        item.addEventListener(`click`, (event) => {
          const {target} = event;
          event.stopPropagation();
          if (creditCalculationForms) {
            creditCalculationForms.forEach((form) => {
              if (form.name !== target.dataset.creditType) {
                form.hidden = true;
              } else {
                form.hidden = false;
              }
            });
          }
          if (creditSelectionTitle) {
            creditSelectionTitle.value = target.textContent;
            creditSelectionTitle.parentElement.classList.remove(
                `calculator__form-field--open`
            );
          }
        });
        toggleFocus(
            item,
            item.parentElement.previousElementSibling,
            `calculator__form-field`
        );
        triggerClick(item);
      });
  }

  // Шаг 2 (параметры кредита)
  const getMaskOptions = (unit, state) => {
    switch (state) {
      case `valid`:
        return {
          mask: `VALUE${unit}`,
          lazy: false,
          blocks: {
            VALUE: {
              mask: Number,
              scale: 0,
              signed: false,
              thousandsSeparator: ` `
            }
          }
        };
      case `invalid`:
        return {
          mask: `VALUE${unit}`,
          blocks: {
            VALUE: {
              mask: String
            }
          }
        };
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  };

  const getMaskPluralForm = (element, elementType) => {
    let fieldModifier = ``;
    let unit = ``;
    let val = ``;
    if (elementType === `unmasked`) {
      [, fieldModifier] = element.id.split(`-credit-`);
      val = element.value;
    } else if (elementType === `masked`) {
      [, fieldModifier] = element.el.input.id.split(`-credit-`);
      val = element.unmaskedValue;
    }

    switch (fieldModifier) {
      case `cost`:
      case `initial-payment`:
        unit = ` ${num2str(Number(val), nounRublePlurals)}`;
        break;

      case `period`:
        unit = ` ${num2str(Number(val), nounYearPlurals)}`;
        break;

      case `initial-payment-range`:
      case `period-range`:
        unit = ``;
        break;

      default:
        throw new Error(`Unknown field's modifier: ${fieldModifier}`);
    }
    return unit;
  };

  const getPercentage = (partialValue, totalValue) =>
    (100 * partialValue) / totalValue;

  const round = (x, multiplier) => {
    if (x % multiplier === 0) {
      return Math.floor(x / multiplier) * multiplier;
    }
    return Math.floor(x / multiplier) * multiplier + multiplier;
  };

  const makeInactive = (list) => {
    list.forEach((item) => {
      item.value = `0`;
      item.el.input.disabled = true;
    });
  };

  const makeActive = (list) =>
    list.forEach((item) => (item.el.input.disabled = false));

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

  const nounRublePlurals = [`рубль`, `рубля`, `рублей`];
  const nounYearPlurals = [`год`, `года`, `лет`];

  const masks = [];
  if (creditCalculationForms) {
    creditCalculationForms.forEach((form) => {
      const inputs = form.querySelectorAll(
          `input[type="text"], input[type="range"]`
      );
      const buttons = form.querySelectorAll(`button`);
      inputs.forEach((input) => {
        const unit = getMaskPluralForm(input, `unmasked`);
        masks.push(IMask(input, getMaskOptions(unit, `valid`)));
      });

      buttons.forEach((button, index, btns) => {
        button.addEventListener(`click`, (event) => {
          const {target} = event;
          const formField = target.closest(`.calculator__form-field`);
          const {name} = target;
          const mask = masks.find(
              (item) => item.el.input.id === formField.querySelector(`input`).id
          );
          const {
            dataset: {min, max, step}
          } = mask.el.input;

          let maskedInputNewValue = ``;
          if (name === `plus`) {
            maskedInputNewValue = Number(mask.unmaskedValue) + Number(step);
          } else if (name === `minus`) {
            maskedInputNewValue = Number(mask.unmaskedValue) - Number(step);
          }
          mask.value = `${maskedInputNewValue}`;
          mask.el.input.dispatchEvent(new Event(`change`));

          if (
            Number(mask.unmaskedValue) < Number(min) ||
            Number(mask.unmaskedValue) > Number(max)
          ) {
            mask.updateOptions(getMaskOptions(``, `invalid`));
            mask.value = `Некорректное значение`;
            if (
              formField &&
              !formField.classList.contains(`calculator__form-field--invalid`)
            ) {
              formField.classList.add(`calculator__form-field--invalid`);
            }
            btns.forEach((btn) => (btn.disabled = true));
          }
        });
      });

      form
        .querySelectorAll(
            `.calculator__form-field > button, .calculator__form-field > input`
        )
        .forEach((item) => {
          toggleFocus(item, item.parentElement, `calculator__form-field`);
        });

      form.querySelectorAll(`label`).forEach((label) => triggerClick(label));
    });
  }

  masks.forEach((mask) => {
    const input = mask.el.input;
    const formField = input.closest(`.calculator__form-field`);
    let buttons = null;
    if (formField) {
      buttons = formField.querySelectorAll(`button`);
    }

    const focusHandler = ({target}) => {
      if (
        formField &&
        formField.classList.contains(`calculator__form-field--invalid`)
      ) {
        formField.classList.remove(`calculator__form-field--invalid`);
      }
    };

    const inputHandler = ({target}) => {
      const unit = getMaskPluralForm(mask, `masked`);
      mask.updateOptions(getMaskOptions(unit, `valid`));
    };

    const changeHandler = ({target}) => {
      const {
        dataset: {min = ``, max = ``, step = ``}
      } = target;
      const divider = `-credit-`;
      const [formModifier, fieldModifier] = target.id.split(`${divider}`);

      const [cost] = masks.filter(
          (item) => item.el.input.id === `${formModifier}${divider}cost`
      );

      const [initialPayment] = masks.filter(
          (item) => item.el.input.id === `${formModifier}${divider}initial-payment`
      );
      const [initialPaymentRange] = masks.filter(
          (item) =>
            item.el.input.id === `${formModifier}${divider}initial-payment-range`
      );

      const [period] = masks.filter(
          (item) => item.el.input.id === `${formModifier}${divider}period`
      );
      const [periodRange] = masks.filter(
          (item) => item.el.input.id === `${formModifier}${divider}period-range`
      );

      switch (fieldModifier) {
        case `cost`:
          if (
            Number(mask.unmaskedValue) < Number(min) ||
            Number(mask.unmaskedValue) > Number(max)
          ) {
            mask.updateOptions(getMaskOptions(``, `invalid`));
            mask.value = `Некорректное значение`;
            if (initialPayment) {
              initialPayment.value = `0`;
            }
            if (
              formField &&
              !formField.classList.contains(`calculator__form-field--invalid`)
            ) {
              formField.classList.add(`calculator__form-field--invalid`);
            }
            if (buttons) {
              buttons.forEach((button) => (button.disabled = true));
            }
            if (initialPayment && initialPaymentRange) {
              makeInactive([initialPayment, initialPaymentRange]);
            }
          } else {
            if (initialPayment) {
              initialPayment.value = `${Number(cost.unmaskedValue) *
                (Number(initialPayment.el.input.dataset.min) / 100)}`;

              if (initialPaymentRange) {
                initialPaymentRange.value = `${Number(
                    initialPaymentRange.el.input.min
                )}`;
              }
            }

            if (buttons) {
              buttons.forEach((button) => (button.disabled = false));
            }
            if (initialPayment && initialPaymentRange) {
              makeActive([initialPayment, initialPaymentRange]);
            }
          }
          break;

        case `initial-payment`:
          if (
            getPercentage(Number(mask.unmaskedValue), cost.unmaskedValue) >
            Number(max)
          ) {
            mask.value = `${Number(cost.unmaskedValue)}`;
            const unit = getMaskPluralForm(mask, `masked`);
            mask.updateOptions(getMaskOptions(unit, `valid`));
            if (initialPaymentRange) {
              initialPaymentRange.value = `${max}`;
            }
          } else if (
            getPercentage(Number(mask.unmaskedValue), cost.unmaskedValue) <
            Number(min)
          ) {
            mask.value = `${Number(cost.unmaskedValue) / Number(min)}`;

            const unit = getMaskPluralForm(mask, `masked`);
            mask.updateOptions(getMaskOptions(unit, `valid`));
            if (initialPaymentRange) {
              initialPaymentRange.value = `${min}`;
            }
          }
          if (initialPaymentRange) {
            initialPaymentRange.value = `${round(
                getPercentage(
                    Number(mask.unmaskedValue),
                    Number(cost.unmaskedValue)
                ),
                Number(step)
            )}`;
            initialPaymentRange.updateValue();
          }
          break;

        case `initial-payment-range`:
          if (initialPayment) {
            initialPayment.value = `${Number(cost.unmaskedValue) *
              (Number(mask.unmaskedValue) / 100)}`;
          }
          break;

        case `period`:
          if (Number(mask.unmaskedValue) > Number(max)) {
            mask.value = `${Number(max)}`;
            const unit = getMaskPluralForm(mask, `masked`);
            mask.updateOptions(getMaskOptions(unit, `valid`));
            if (periodRange) {
              periodRange.value = `${max}`;
            }
          } else if (Number(mask.unmaskedValue) < Number(min)) {
            mask.value = `${Number(min)}`;
            const unit = getMaskPluralForm(mask, `masked`);
            mask.updateOptions(getMaskOptions(unit, `valid`));
            if (periodRange) {
              periodRange.value = `${min}`;
            }
          }
          if (periodRange) {
            periodRange.value = `${round(
                Number(mask.unmaskedValue),
                Number(step)
            )}`;
            periodRange.updateValue();
          }
          break;

        case `period-range`:
          if (period) {
            period.unmaskedValue = `${Number(mask.unmaskedValue)}`;
            period.updateValue();
          }
          break;

        default:
          throw new Error(`Unknown field's modifier: ${fieldModifier}`);
      }
    };

    input.addEventListener(`input`, inputHandler);
    input.addEventListener(`change`, changeHandler);
    input.addEventListener(`focus`, focusHandler);
  });
});
