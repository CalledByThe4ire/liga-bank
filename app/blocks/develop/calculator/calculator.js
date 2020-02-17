/* global Map, IMask */
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

  // вспомогательные функции
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

  const getPercentage = (partialValue, totalValue) =>
    (100 * partialValue) / totalValue;

  const round = (x, multiplier) => {
    if (x % multiplier === 0) {
      return Math.floor(x / multiplier) * multiplier;
    }
    return Math.floor(x / multiplier) * multiplier + multiplier;
  };

  // маски
  const getUnitPluralForm = (unit, value) => {
    switch (unit) {
      case `currency`:
        unit = ` ${num2str(Number(value), nounRublePlurals)}`;
        break;
      case `percent`:
        unit = `%`;
        break;

      case `period`:
        unit = ` ${num2str(Number(value), nounYearPlurals)}`;
        break;

      case `empty`:
        unit = ``;
        break;

      default:
        throw new Error(`Unknown unit: ${unit}`);
    }
    return unit;
  };

  const getMaskOptions = (unit, format) => {
    switch (format) {
      case `integer`:
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
      case `fractional`:
        return {
          mask: `VALUE${unit}`,
          lazy: false,
          blocks: {
            VALUE: {
              mask: Number,
              scale: 2,
              signed: false,
              padFractionalZeros: true,
              radix: `.`
            }
          }
        };
      case `string`:
        return {
          mask: `VALUE${unit}`,
          blocks: {
            VALUE: {
              mask: String
            }
          }
        };
      default:
        throw new Error(`Unknown mask's format: ${format}`);
    }
  };

  // склонение числительных окончаний слов
  const nounRublePlurals = [`рубль`, `рубля`, `рублей`];
  const nounYearPlurals = [`год`, `года`, `лет`];

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
          if (creditCalculationForms) {
            creditCalculationForms.forEach((form) => {
              if (form.name !== target.dataset.creditType) {
                form.hidden = true;
              } else {
                form.hidden = false;
                form.dispatchEvent(new Event(`change`));
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
  const makeInactive = (list) => {
    list.forEach((item) => {
      item.value = `0`;
      item.el.input.disabled = true;
    });
  };

  const makeActive = (list) =>
    list.forEach((item) => (item.el.input.disabled = false));

  const masks = [];
  if (creditCalculationForms) {
    creditCalculationForms.forEach((form) => {
      const inputs = form.querySelectorAll(
          `input[type="text"], input[type="range"]`
      );
      const buttons = form.querySelectorAll(`button`);
      if (inputs) {
        inputs.forEach((input) => {
          const unit = getUnitPluralForm(input.dataset.unit, input.value);
          masks.push(IMask(input, getMaskOptions(unit, input.dataset.format)));
        });
      }

      if (buttons) {
        buttons.forEach((button, index, btns) => {
          button.addEventListener(`click`, (event) => {
            const {target} = event;
            const formField = target.closest(`.calculator__form-field`);
            const {name} = target;
            const mask = masks.find(
                (item) => item.el.input.id === formField.querySelector(`input`).id
            );
            const {
              dataset: {min = ``, max = ``, step = ``, format = ``}
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
              mask.updateOptions(getMaskOptions(``, mask.format));
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
      }

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
      const maskUnit = getUnitPluralForm(
          input.dataset.unit,
          mask.unmaskedValue
      );
      mask.updateOptions(getMaskOptions(maskUnit, input.dataset.format));
    };

    const changeHandler = ({target}) => {
      const {
        dataset: {min = ``, max = ``, step = ``, unit = ``, format = ``}
      } = target;
      const divider = `-credit-`;
      const [formModifier, fieldModifier] = target.name.split(`${divider}`);

      const [cost] = masks.filter(
          (item) => item.el.input.name === `${formModifier}${divider}cost`
      );

      const [initialPayment] = masks.filter(
          (item) =>
            item.el.input.name === `${formModifier}${divider}initial-payment`
      );
      const [initialPaymentRange] = masks.filter(
          (item) =>
            item.el.input.name ===
          `${formModifier}${divider}initial-payment-range`
      );

      const [period] = masks.filter(
          (item) => item.el.input.name === `${formModifier}${divider}period`
      );
      const [periodRange] = masks.filter(
          (item) => item.el.input.name === `${formModifier}${divider}period-range`
      );

      let maskUnit = ``;

      switch (fieldModifier) {
        case `cost`:
          if (
            Number(mask.unmaskedValue) < Number(min) ||
            Number(mask.unmaskedValue) > Number(max)
          ) {
            mask.updateOptions(getMaskOptions(``, `string`));
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
          if (Number(mask.unmaskedValue) >= Number(cost.unmaskedValue)) {
            mask.value = `${Number(cost.unmaskedValue)}`;
            if (initialPaymentRange) {
              initialPaymentRange.value = `${max}`;
            }
          } else if (
            getPercentage(Number(mask.unmaskedValue), cost.unmaskedValue) <
            Number(min)
          ) {
            mask.value = `${Number(cost.unmaskedValue) / Number(min)}`;
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
          }

          maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
          mask.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case `initial-payment-range`:
          if (initialPayment) {
            initialPayment.value = `${Number(cost.unmaskedValue) *
              (Number(mask.unmaskedValue) / 100)}`;
            initialPayment.el.input.dispatchEvent(new Event(`change`));
          }
          break;

        case `period`:
          if (Number(mask.unmaskedValue) > Number(max)) {
            mask.value = `${Number(max)}`;
            mask.updateOptions(getMaskOptions(mask, format));
            if (periodRange) {
              periodRange.value = `${max}`;
            }
          } else if (Number(mask.unmaskedValue) < Number(min)) {
            mask.value = `${Number(min)}`;
            mask.updateOptions(getMaskOptions(unit, format));
            if (periodRange) {
              periodRange.value = `${min}`;
            }
          }

          if (periodRange) {
            periodRange.value = `${round(
                Number(mask.unmaskedValue),
                Number(step)
            )}`;
          }
          maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
          mask.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case `period-range`:
          if (period) {
            period.value = `${Number(mask.unmaskedValue)}`;
            period.el.input.dispatchEvent(new Event(`change`));
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

  // Секция «Наше предложение»
  const calcAnnuityPayment = (creditSum, monthlyInterestRate, periods) =>
    Math.ceil(
        creditSum *
        (monthlyInterestRate /
          (1 - (1 + monthlyInterestRate) ** (Math.abs(periods) * -1)))
    );
  const calcRequiredIncome = (monthlyPayment) =>
    Math.ceil((monthlyPayment / 45) * 100);
  const calcMonthlyInterestRate = (interestRate) =>
    Number((interestRate / 100 / 12).toFixed(5));
  const calcPeriods = (period) => period * 12;

  const creditTypeNames = new Map([
    [`mortgage`, `Сумма ипотеки`],
    [`auto`, `Сумма автокредита`],
    [`period`, `Сумма кредита`]
  ]);

  if (creditOfferingForm) {
    const inputs = creditOfferingForm.querySelectorAll(`input`);
    if (inputs) {
      inputs.forEach((input) => {
        const unit = getUnitPluralForm(input.dataset.unit, input.value);
        masks.push(IMask(input, getMaskOptions(unit, input.dataset.format)));
      });
    }
  }

  const fillInCreditOfferingForm = (elements, data) => {
    const {creditSum, interestRate, annuityPayment, requiredIncome} = data;
    elements.forEach((element) => {
      const divider = `-offer-`;
      const {unit, format} = element.el.input.dataset;
      const {name} = element.el.input;
      const [, fieldName] = name.split(`${divider}`);
      let maskUnit = ``;
      switch (fieldName) {
        case `credit-sum`:
          element.value = `${creditSum}`;
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;
        case `interest-rate`:
          element.value = `${interestRate}`;
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;
        case `annuity-payment`:
          element.value = `${annuityPayment}`;
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;
        case `required-income`:
          element.value = `${requiredIncome}`;
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;

        default:
          throw new Error(`Unknown field's name: ${name}`);
      }
    });
  };

  const renderCreditOfferingFormData = ({currentTarget}) => {
    const divider = `-credit-`;
    const [, formModifier] = currentTarget.name.split(`-`);

    const [cost] = masks.filter((mask) => {
      return mask.el.input.name === `${formModifier}${divider}cost`;
    });
    const [initialPayment] = masks.filter(
        (mask) => mask.el.input.name === `${formModifier}${divider}initial-payment`
    );
    const [period] = masks.filter(
        (mask) => mask.el.input.name === `${formModifier}${divider}period`
    );

    if (creditOfferingForm) {
      creditOfferingForm.querySelector(
          `label[for="credit-offer-credit-sum"]`
      ).textContent = creditTypeNames.get(`${formModifier}`);
    }

    let periods = calcPeriods(Number(period.unmaskedValue));
    const filteredMasks = Array.from(masks).filter((mask) =>
      mask.el.input.name.includes(`offer`)
    );

    if (cost && period) {
      switch (formModifier) {
        case `mortgage`:
          const [maternityCapital] = Array.from(currentTarget.elements).filter(
              (element) =>
                element.name === `${formModifier}${divider}maternity-capital`
          );

          if (initialPayment && maternityCapital) {
            const maternityCapitalSum = maternityCapital.checked ? 470000 : 0;
            const creditSum =
              Number(cost.unmaskedValue) -
              Number(initialPayment.unmaskedValue) -
              maternityCapitalSum;

            const percentage = getPercentage(
                Number(initialPayment.unmaskedValue),
                Number(cost.unmaskedValue)
            );
            const percentageRateThreshold = 15;
            let interestRate = 0;

            if (percentage < percentageRateThreshold) {
              interestRate = 9.4;
            } else if (percentage >= percentageRateThreshold) {
              interestRate = 8.5;
            }
            const monthlyInterestRate = calcMonthlyInterestRate(interestRate);
            const annuityPayment = calcAnnuityPayment(
                creditSum,
                monthlyInterestRate,
                periods
            );
            const requiredIncome = calcRequiredIncome(annuityPayment);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum,
              interestRate,
              annuityPayment,
              requiredIncome
            });
          }
          break;

        case `auto`:
          const [carInsurance] = Array.from(currentTarget.elements).filter(
              (element) => element.name === `${formModifier}${divider}car-insurance`
          );
          const [lifeInsurance] = Array.from(currentTarget.elements).filter(
              (element) =>
                element.name === `${formModifier}${divider}life-insurance`
          );

          if (initialPayment && carInsurance && lifeInsurance) {
            const creditSum =
              Number(cost.unmaskedValue) - Number(initialPayment.unmaskedValue);

            let costThreshold = 2000000;
            let interestRate = 0;
            if (Number(cost.unmaskedValue) < costThreshold) {
              interestRate = 16;
            } else if (Number(cost.unmaskedValue) > costThreshold) {
              interestRate = 15;
            } else if (carInsurance.checked || lifeInsurance.checked) {
              interestRate = 8.5;
            } else if (carInsurance.checked && lifeInsurance.checked) {
              interestRate = 3.5;
            }

            const monthlyInterestRate = calcMonthlyInterestRate(interestRate);
            const annuityPayment = calcAnnuityPayment(
                creditSum,
                monthlyInterestRate,
                periods
            );
            const requiredIncome = calcRequiredIncome(annuityPayment);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum,
              interestRate,
              annuityPayment,
              requiredIncome
            });
          }
          break;

        case `personal`:
          const [projectMember] = Array.from(currentTarget.elements).filter(
              (element) =>
                element.name === `${formModifier}${divider}project-member`
          );

          if (projectMember) {
            const creditSum = Number(cost.unmaskedValue);
            const projectMemberPercentage = projectMember.checked ? 0.5 : 0;
            const personalMinThreshold = 750000;
            const personalMaxThreshold = 2000000;
            let interestRate = 0;

            if (Number(cost.unmaskedValue) < personalMinThreshold) {
              interestRate = 15 - projectMemberPercentage;
            } else if (
              Number(cost.unmaskedValue) <= personalMinThreshold &&
              Number(cost.unmaskedValue) < personalMaxThreshold
            ) {
              interestRate = 12.5 - projectMemberPercentage;
            } else if (Number(cost.unmaskedValue) > personalMaxThreshold) {
              interestRate = 9.5 - projectMemberPercentage;
            }

            const monthlyInterestRate = calcMonthlyInterestRate(interestRate);
            const annuityPayment = calcAnnuityPayment(
                creditSum,
                monthlyInterestRate,
                periods
            );
            const requiredIncome = calcRequiredIncome(annuityPayment);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum,
              interestRate,
              annuityPayment,
              requiredIncome
            });
          }
          break;

        default:
          throw new Error(`Unknown form's modifier: ${formModifier}`);
      }
    }
  };

  if (creditCalculationForms) {
    creditCalculationForms.forEach((form) =>
      form.addEventListener(`change`, renderCreditOfferingFormData)
    );
  }
});
