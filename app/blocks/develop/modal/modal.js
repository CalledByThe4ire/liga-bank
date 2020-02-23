/* global WatchJS */
const {watch} = WatchJS;

document.addEventListener(`DOMContentLoaded`, () => {
  // Modal Form Validation (Observer Pattern, MVC)
  const modalPageHeader = document.querySelector(`#modal-page-header`);
  const modalCloseButtons = document.querySelectorAll(`.modal__trigger`);

  const form = modalPageHeader.querySelector(`form`);
  const fieldElements = {
    login: form.querySelector(`.login-modal-form-field input`),
    password: form.querySelector(`.password-modal-form-field input`)
  };
  const submitButton = form.querySelector(`button[type="submit"]`);

  const errorMessages = {
    login: {
      empty: `Обязательно к заполнению`
    },
    password: {
      empty: `Обязательно к заполнению`,
      length: `Минимальная длина пароля — 6 символов`
    }
  };

  const validate = (fields, name) => {
    const errors = {};
    switch (name) {
      case `login`:
        if (!fields.login) {
          errors.login = errorMessages.login.empty;
        } else {
          errors.login = ``;
        }
        break;
      case `password`:
        if (!fields.password) {
          errors.password = errorMessages.password.empty;
        } else if (fields.password.length < 6) {
          errors.password = errorMessages.password.length;
        } else {
          errors.password = ``;
        }
        break;

      default:
        throw new Error(`Unknown field's name: ${name}`);
    }
    return {...state.form.errors, ...errors};
  };

  const updateStateErrors = (state, name) => {
    const errors = validate(state.form.fields, name);
    state.form.errors = errors;
  };

  const updateValidationState = (errors) => {
    state.form.valid = Object.keys(errors).every((key) => {
      return errors[key].length === 0;
    });
  };

  const loginFormData = localStorage.getItem(`loginFormData`)
    ? JSON.parse(localStorage.getItem(`loginFormData`))
    : {login: ``, password: ``};

  const {login, password} = loginFormData;

  const state = {
    form: {
      processState: `filling`, // sending, finished
      fields: {
        login,
        password
      },
      valid: true,
      errors: {
        login: ``,
        password: ``
      }
    }
  };

  if (modalPageHeader && form) {
    if (fieldElements[`login`] && fieldElements[`password`]) {
      Object.entries(fieldElements).forEach(([name, element]) => {
        element.value = state.form.fields[name];
        element.addEventListener(`input`, (e) => {
          state.form.fields[name] = e.target.value;
          updateStateErrors(state, name);
          updateValidationState(state.form.errors);
        });
      });

      watch(state.form, `errors`, () => {
        Object.entries(fieldElements).forEach(([name, element]) => {
          const rootElementClassName = `${name}-modal-form-field`;
          const rootElement = element.closest(`.${rootElementClassName}`);

          if (rootElement) {
            const feedbackElement = rootElement.querySelector(
                `.${rootElementClassName}__feedback`
            );
            const errorMessage = state.form.errors[name];

            if (
              feedbackElement.querySelector(
                  `.${rootElementClassName}__error-message`
              )
            ) {
              rootElement.classList.remove(`${rootElementClassName}--invalid`);
              feedbackElement.innerHTML = ``;
            }

            if (!errorMessage) {
              return;
            }
            const errorMessageElement = document.createElement(`span`);
            errorMessageElement.classList.add(
                `${rootElementClassName}__error-message`
            );
            errorMessageElement.innerHTML = errorMessage;
            feedbackElement.append(errorMessageElement);
            rootElement.classList.add(`${rootElementClassName}--invalid`);
          }
        });
      });
    }

    if (submitButton) {
      watch(state.form, `processState`, () => {
        const {processState} = state.form;
        switch (processState) {
          case `filling`:
            submitButton.disabled = true;
            break;
          case `sending`:
            submitButton.disabled = true;
            break;
          case `finished`:
            modalPageHeader.classList.add(`modal--invisible`);
            break;
          default:
            throw new Error(`Unknown state: ${processState}`);
        }
      });

      watch(state.form, `valid`, () => {
        submitButton.disabled = !state.form.valid;
      });
    }

    form.addEventListener(`submit`, (event) => {
      event.preventDefault();
      const {target} = event;
      state.form.processState = `sending`;
      const formData = new FormData(target);
      localStorage.setItem(
          `loginFormData`,
          JSON.stringify(Object.fromEntries(formData))
      );

      Object.entries(fieldElements).forEach(([name]) => {
        updateStateErrors(state, name);
      });
      updateValidationState(state.form.errors);

      if (state.form.valid) {
        state.form.processState = `finished`;
      } else {
        const {errors} = state.form;
        state.form.processState = `filling`;
        for (const name of Object.keys(errors)) {
          if (errors[name] !== 0) {
            fieldElements[name].focus();
            break;
          }
        }
      }
    });

    // show / hide password
    const showPassword = (event) => {
      const {target, type} = event;
      const input = target.previousElementSibling;
      if (type === `mousedown`) {
        input.setAttribute(`type`, `text`);
      } else if (
        (type === `keydown` && event.keyCode === 13) ||
        (type === `keydown` && event.keyCode === 32)
      ) {
        input.setAttribute(`type`, `text`);
      }
    };

    const hidePassword = ({target}) => {
      const input = target.previousElementSibling;
      input.setAttribute(`type`, `password`);
    };

    [`mousedown`, `keydown`].forEach((event) => {
      fieldElements[`password`].nextElementSibling.addEventListener(
          event,
          showPassword
      );
    });

    [`mouseup`, `keyup`].forEach((event) =>
      fieldElements[`password`].nextElementSibling.addEventListener(
          event,
          hidePassword
      )
    );

    // Modal Visibility
    if (modalCloseButtons) {
      [`mousedown`, `keydown`].forEach((event) =>
        modalCloseButtons.forEach((modalCloseButton) =>
          modalCloseButton.addEventListener(event, (e) => {
            const {type, target} = e;
            if (type === `keydown`) {
              if (e.keyCode === 32 || e.keyCode === 13) {
                target
                  .closest(`#${target.dataset.modal}`)
                  .classList.add(`modal--invisible`);
                document.body.classList.add(`page--overlay`);
              }
            } else {
              target
                .closest(`#${target.dataset.modal}`)
                .classList.add(`modal--invisible`);
              document.body.classList.add(`page--overlay`);
            }
          })
        )
      );
    }
  }
});
