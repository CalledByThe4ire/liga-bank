/* global SmoothScroll */

/* eslint-disable no-unused-vars */
document.addEventListener("DOMContentLoaded", function () {
  var scroll = new SmoothScroll("a[href*=\"#\"]", {
    speed: 1000,
    speedAsDuration: true
  });
  var page = document.querySelector(".page");
  page.classList.remove("page_no_js");
  page.classList.add("page_js");

  var keydownHandler = function keydownHandler(_ref) {
    var keyCode = _ref.keyCode;

    if (keyCode === 27) {
      var modals = document.querySelectorAll(".modal");

      if (modals) {
        modals.forEach(function (modal) {
          if (!modal.classList.contains("modal--invisible")) {
            modal.classList.add("modal--invisible", "fadeOut");
            modal.classList.remove("fadeIn");
          }

          document.body.style.cssText = "padding-right: ''; overflow: ''";
        });
      }

      document.body.classList.remove("page--overlay");
    }
  };

  var clickHandler = function clickHandler(_ref2) {
    var target = _ref2.target;

    if (target.classList.contains("page--overlay")) {
      target.classList.remove("page--overlay");
      var modals = target.querySelectorAll(".modal");
      modals.forEach(function (modal) {
        if (!modal.classList.contains("modal--invisible")) {
          modal.classList.add("modal--invisible", "fadeOut");
          modal.classList.remove("fadeIn");
        }

        document.body.style.cssText = "padding-right: ''; overflow: ''";
      });
    }
  };

  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("click", clickHandler);
});
document.addEventListener("DOMContentLoaded", function () {
  var trigger = document.querySelector(".main-nav__trigger");

  var toggleMenu = function toggleMenu(state, selector) {
    var nav = selector.closest(".main-nav").querySelector(".main-nav-list");

    switch (state) {
      case "close":
        selector.classList.remove("main-nav__trigger--open-menu");
        selector.classList.add("main-nav__trigger--close-menu");
        selector.setAttribute("aria-label", "Close menu");
        selector.querySelector("use").setAttribute("xlink:href", "#main-nav__close");

        if (nav) {
          nav.classList.remove("main-nav-list--hidden", "fadeOut");
          nav.classList.add("animated", "fadeIn");
        }

        break;

      case "open":
        selector.classList.remove("main-nav__trigger--close-menu");
        selector.classList.add("main-nav__trigger--open-menu");
        selector.setAttribute("aria-label", "Open menu");
        selector.querySelector("use").setAttribute("xlink:href", "#main-nav__menu");

        if (nav) {
          nav.classList.add("main-nav-list--hidden", "fadeOut");
          nav.classList.remove("main-nav-list--hidden", "fadeIn");
        }

        break;

      default:
        throw new Error("Unknown state: ".concat(state));
    }
  };

  var clickHandler = function clickHandler(_ref) {
    var currentTarget = _ref.currentTarget;

    if (currentTarget.classList.contains("main-nav__trigger--open-menu")) {
      toggleMenu("close", currentTarget);
    } else if (currentTarget.classList.contains("main-nav__trigger--close-menu")) {
      toggleMenu("open", currentTarget);
    }
  };

  if (trigger) {
    trigger.addEventListener("click", clickHandler);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var pageHeaderLogin = document.querySelector("#page-header-login");

  var getScrollbarWidth = function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  var clickHandler = function clickHandler(_ref) {
    var target = _ref.target;
    var form = document.querySelector("#".concat(target.dataset.modal, " form"));
    var formSubmit = null;
    var formLogin = null;

    if (form) {
      formSubmit = form.querySelector("[type=\"submit\"]");
      formLogin = form.elements.login;
    }

    var modal = document.getElementById(target.dataset.modal);

    if (modal) {
      modal.classList.remove("modal--invisible", "fadeOut");
      modal.classList.add("animated", "fadeIn");
    }

    if (!document.body.classList.contains("page--overlay")) {
      document.body.classList.add("page--overlay");
    }

    var scrollbarWidth = getScrollbarWidth();
    document.body.style.cssText = "background-color: #f6f7ff; padding-right: ".concat(scrollbarWidth, "px; overflow: hidden");

    if (localStorage.getItem("loginFormData")) {
      if (formSubmit) {
        formSubmit.focus();
      }
    } else {
      if (formLogin) {
        formLogin.focus();
      }
    }
  };

  if (pageHeaderLogin) {
    pageHeaderLogin.addEventListener("click", clickHandler);
  }
});
/* global Swiper */

/* eslint-disable no-unused-vars */
document.addEventListener("DOMContentLoaded", function () {
  var mainSlider = new Swiper(".about", {
    loop: true,
    speed: 500,
    spaceBetween: 10,
    noSwiping: false,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: "false"
    },
    breakpoints: {
      1024: {
        noSwiping: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        },
        autoplay: {
          delay: 4000
        }
      }
    }
  });
});
/* global Swiper */

/* eslint-disable no-unused-vars */
document.addEventListener("DOMContentLoaded", function () {
  // tab' switch behaviour
  var servicesListItems = document.querySelectorAll("#services .services__list-item");
  var servicesLinks = document.querySelectorAll("#services .services__link");
  var servicesTabs = document.querySelectorAll("#services .tab-service");

  if (servicesLinks && servicesTabs) {
    var eventHandler = function eventHandler(event, activeElement, activeElementIndex) {
      var type = event.type,
          keyCode = event.keyCode;

      if (type === "click") {
        event.preventDefault();
        removeActiveTab();
        addActiveTab(activeElement, activeElementIndex);
      } else if (type === "keyup" && keyCode === 9) {
        removeActiveTab();
        addActiveTab(activeElement, activeElementIndex);
      }
    };

    ["click", "keyup"].forEach(function (eventName) {
      servicesLinks.forEach(function (link, linkIndex) {
        link.addEventListener(eventName, function (e) {
          return eventHandler(e, link, linkIndex);
        });
      });
    });

    var removeActiveTab = function removeActiveTab() {
      servicesLinks.forEach(function (link) {
        link.closest(".services__list-item").classList.remove("services__list-item--active");
      });
      servicesTabs.forEach(function (section) {
        section.classList.remove("tab-service--active");
      });
    };

    var addActiveTab = function addActiveTab(link, linkIndex) {
      link.closest(".services__list-item").classList.add("services__list-item--active");
      var tabIndex = Array.from(servicesTabs).findIndex(function (tab, index) {
        return index === linkIndex;
      });
      servicesTabs.forEach(function (tab, index) {
        if (index === tabIndex) {
          tab.classList.add("tab-service--active");
        }
      });
    };
  } // slider


  var breakpoint = window.matchMedia("only screen and (max-width: 1023px)");
  var servicesSlider = null;

  var enableSlider = function enableSlider() {
    servicesSlider = new Swiper("#services", {
      loop: true,
      speed: 500,
      spaceBetween: 10,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: "false"
      }
    });
  };

  var removeActveClass = function removeActveClass(list, cls) {
    list.forEach(function (item) {
      return item.classList.contains("".concat(cls)) ? item.classList.remove("".concat(cls)) : item;
    });
  };

  var makeFirstElementActive = function makeFirstElementActive(list, cls) {
    list.forEach(function (item, index) {
      return index === 0 ? item.classList.add("".concat(cls)) : item.classList.remove("".concat(cls));
    });
  };

  var breakpointChecker = function breakpointChecker() {
    if (breakpoint.matches) {
      enableSlider();

      if (servicesTabs && servicesListItems) {
        removeActveClass(servicesTabs, "tab-service--active");
        removeActveClass(servicesListItems, "services__list-item--active");
      }
    } else {
      if (servicesSlider) {
        servicesSlider.destroy();

        if (servicesTabs && servicesListItems) {
          makeFirstElementActive(servicesTabs, "tab-service--active");
          makeFirstElementActive(servicesListItems, "services__list-item--active");
        }
      }
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);
});
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global Map, IMask */

/* eslint-disable no-unused-vars, new-cap, max-nested-callbacks */
document.addEventListener("DOMContentLoaded", function () {
  var calculator = document.querySelector("#calculator");
  var creditSelectionForm = null;
  var creditSelectionTitle = null;
  var creditSelectionFormField = null;
  var creditCalculationForms = null;
  var creditOfferingForm = null;
  var creditRegistrationForm = null;
  var messages = null;
  var rejectMessage = null;
  var errorMessage = null;

  if (calculator) {
    creditSelectionForm = calculator.querySelector("#credit-selection");

    if (creditSelectionForm) {
      creditSelectionTitle = creditSelectionForm.querySelector("input");
      creditSelectionFormField = creditSelectionForm.querySelector(".calculator__form-field");
    }

    creditCalculationForms = calculator.querySelectorAll(".calculator__credit-form--calculation form");
    creditOfferingForm = calculator.querySelector("#credit-offer");
    creditRegistrationForm = calculator.querySelector("#credit-registration");
    messages = calculator.querySelectorAll(".calculator__message");

    if (messages) {
      var _Array$from$filter = Array.from(messages).filter(function (item) {
        if (item.classList.contains("calculator__message--reject")) {
          return item;
        }

        return false;
      });

      var _Array$from$filter2 = _slicedToArray(_Array$from$filter, 1);

      rejectMessage = _Array$from$filter2[0];

      var _Array$from$filter3 = Array.from(messages).filter(function (item) {
        if (item.classList.contains("calculator__message--error")) {
          return item;
        }

        return false;
      });

      var _Array$from$filter4 = _slicedToArray(_Array$from$filter3, 1);

      errorMessage = _Array$from$filter4[0];
    }
  }

  var toggleFocus = function toggleFocus(element, parentElement, selector) {
    element.addEventListener("focus", function () {
      if (!parentElement.classList.contains("".concat(selector, "--focus"))) {
        parentElement.classList.add("".concat(selector, "--focus"));
      }
    });
    element.addEventListener("blur", function () {
      if (parentElement.classList.contains("".concat(selector, "--focus"))) {
        parentElement.classList.remove("".concat(selector, "--focus"));
      }
    });
  };

  var triggerClick = function triggerClick(element) {
    element.addEventListener("keydown", function (event) {
      var keyCode = event.keyCode,
          target = event.target;

      if (keyCode === 13 || keyCode === 32) {
        target.click();
      }
    });
  }; // вспомогательные функции


  var num2str = function num2str(n, textForms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;

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

  var getPercentage = function getPercentage(partialValue, totalValue) {
    return 100 * partialValue / totalValue;
  };

  var round = function round(x, multiplier) {
    if (x % multiplier === 0) {
      return Math.floor(x / multiplier) * multiplier;
    }

    return Math.floor(x / multiplier) * multiplier + multiplier;
  };

  var getScrollbarWidth = function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }; // маски


  var getUnitPluralForm = function getUnitPluralForm(unit, value) {
    switch (unit) {
      case "currency":
        unit = " ".concat(num2str(Number(value), nounRublePlurals));
        break;

      case "percent":
        unit = "%";
        break;

      case "numero-sign":
        unit = "\u2116";
        break;

      case "period":
        unit = " ".concat(num2str(Number(value), nounYearPlurals));
        break;

      case "empty":
        unit = "";
        break;

      default:
        throw new Error("Unknown unit: ".concat(unit));
    }

    return unit;
  };

  var getMaskOptions = function getMaskOptions(unit, format) {
    switch (format) {
      case "integer":
        return {
          mask: "VALUE".concat(unit),
          lazy: false,
          blocks: {
            VALUE: {
              mask: Number,
              scale: 0,
              signed: false,
              thousandsSeparator: " "
            }
          }
        };

      case "4-digit integer":
        return {
          mask: "".concat(unit, " VALUE"),
          blocks: {
            VALUE: {
              mask: /^\d+$/,
              commit: function commit(value, masked) {
                return masked._value = value.padStart(4, "0");
              }
            }
          }
        };

      case "fractional":
        return {
          mask: "VALUE".concat(unit),
          lazy: false,
          blocks: {
            VALUE: {
              mask: Number,
              scale: 2,
              signed: false,
              padFractionalZeros: true,
              radix: ","
            }
          }
        };

      case "string":
        return {
          mask: "VALUE",
          blocks: {
            VALUE: {
              mask: String
            }
          }
        };

      case "tel":
        return {
          mask: "+{7}(000)000-00-00",
          lazy: true
        };

      case "full-name":
        return {
          mask: /^[a-zA-Zа-яА-ЯёЁ ]+$/
        };

      case "email":
        return {
          mask: /^\S*@?\S*$/
        };

      default:
        throw new Error("Unknown mask's format: ".concat(format));
    }
  }; // склонение числительных окончаний слов


  var nounRublePlurals = ["\u0440\u0443\u0431\u043B\u044C", "\u0440\u0443\u0431\u043B\u044F", "\u0440\u0443\u0431\u043B\u0435\u0439"];
  var nounYearPlurals = ["\u0433\u043E\u0434", "\u0433\u043E\u0434\u0430", "\u043B\u0435\u0442"]; // Шаг 1 (Цель кредита)

  if (creditSelectionFormField) {
    creditSelectionFormField.addEventListener("click", function (evt) {
      event.stopPropagation();
      var currentTarget = evt.currentTarget;
      currentTarget.classList.toggle("calculator__form-field--open");
      document.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        var rect = currentTarget.getBoundingClientRect();
        var isInFormField = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;

        if (!isInFormField) {
          if (currentTarget.classList.contains("calculator__form-field--open")) {
            currentTarget.classList.remove("calculator__form-field--open");
          }
        }
      });
    });
  }

  if (creditSelectionForm) {
    creditSelectionForm.querySelectorAll(".calculator__forms-list-item").forEach(function (item) {
      item.addEventListener("click", function (event) {
        var target = event.target;

        if (creditCalculationForms) {
          creditCalculationForms.forEach(function (form) {
            if (form.name !== target.dataset.creditType) {
              form.hidden = true;
            } else {
              form.hidden = false;
              form.dispatchEvent(new Event("change"));
            }
          });
        }

        if (creditRegistrationForm) {
          creditRegistrationForm.hidden = true;
        }

        if (creditSelectionTitle) {
          creditSelectionTitle.value = target.textContent;
          creditSelectionTitle.parentElement.classList.remove("calculator__form-field--open");
        }
      });
      toggleFocus(item, item.parentElement.previousElementSibling, "calculator__form-field");
      triggerClick(item);
    });
  } // Шаг 2 (параметры кредита)


  var makeInactive = function makeInactive(list) {
    list.forEach(function (item) {
      item.value = "0";
      item.el.input.disabled = true;
    });
  };

  var makeActive = function makeActive(list) {
    return list.forEach(function (item) {
      return item.el.input.disabled = false;
    });
  };

  var masks = [];

  if (creditCalculationForms) {
    creditCalculationForms.forEach(function (form) {
      var inputs = form.querySelectorAll("input[type=\"text\"], input[type=\"range\"]");
      var buttons = form.querySelectorAll("button");

      if (inputs) {
        inputs.forEach(function (input) {
          var unit = getUnitPluralForm(input.dataset.unit, input.value);
          masks.push(IMask(input, getMaskOptions(unit, input.dataset.format)));
        });
      }

      if (buttons) {
        buttons.forEach(function (button) {
          button.addEventListener("click", function (event) {
            var target = event.target;
            var formField = target.closest(".calculator__form-field");
            var name = target.name;
            var mask = masks.find(function (item) {
              return item.el.input.id === formField.querySelector("input").id;
            });
            var _mask$el$input$datase = mask.el.input.dataset,
                _mask$el$input$datase2 = _mask$el$input$datase.min,
                min = _mask$el$input$datase2 === void 0 ? "" : _mask$el$input$datase2,
                _mask$el$input$datase3 = _mask$el$input$datase.max,
                max = _mask$el$input$datase3 === void 0 ? "" : _mask$el$input$datase3,
                _mask$el$input$datase4 = _mask$el$input$datase.step,
                step = _mask$el$input$datase4 === void 0 ? "" : _mask$el$input$datase4,
                _mask$el$input$datase5 = _mask$el$input$datase.unit,
                unit = _mask$el$input$datase5 === void 0 ? "" : _mask$el$input$datase5,
                _mask$el$input$datase6 = _mask$el$input$datase.format,
                format = _mask$el$input$datase6 === void 0 ? "" : _mask$el$input$datase6;

            if (Number.isNaN(Number(mask.unmaskedValue))) {
              var maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
              mask.updateOptions(getMaskOptions(maskUnit, format));
              mask.value = "".concat(Number(min));
              mask.el.input.dispatchEvent(new Event("change", {
                bubbles: true
              }));

              if (formField && formField.classList.contains("calculator__form-field--invalid")) {
                formField.classList.remove("calculator__form-field--invalid");
              }
            } else {
              var maskedInputNewValue = 0;

              if (name === "plus") {
                maskedInputNewValue = Number(mask.unmaskedValue) + Number(step);

                if (maskedInputNewValue > Number(max)) {
                  maskedInputNewValue = "".concat(Number(max));
                }
              } else if (name === "minus") {
                maskedInputNewValue = Number(mask.unmaskedValue) - Number(step);

                if (maskedInputNewValue < Number(min)) {
                  maskedInputNewValue = "".concat(Number(min));
                }
              }

              mask.value = "".concat(maskedInputNewValue);
              mask.el.input.dispatchEvent(new Event("change", {
                bubbles: true
              }));
            }
          });
        });
      }

      form.querySelectorAll(".calculator__form-field > button, .calculator__form-field > input").forEach(function (item) {
        toggleFocus(item, item.parentElement, "calculator__form-field");
      });
      form.querySelectorAll("label").forEach(function (label) {
        return triggerClick(label);
      });
    });
  }

  masks.forEach(function (mask) {
    var input = mask.el.input;
    var formField = input.closest(".calculator__form-field");
    var buttons = null;

    if (formField) {
      buttons = formField.querySelectorAll("button");
    }

    var focusHandler = function focusHandler() {
      if (formField && formField.classList.contains("calculator__form-field--invalid")) {
        formField.classList.remove("calculator__form-field--invalid");
      }
    };

    var creditCalculationFormInputHandler = function creditCalculationFormInputHandler() {
      var maskUnit = getUnitPluralForm(input.dataset.unit, mask.unmaskedValue);
      mask.updateOptions(getMaskOptions(maskUnit, input.dataset.format));
    };

    var creditCalculationFormChangeHandler = function creditCalculationFormChangeHandler(_ref) {
      var target = _ref.target;
      var _target$dataset = target.dataset,
          _target$dataset$min = _target$dataset.min,
          min = _target$dataset$min === void 0 ? "" : _target$dataset$min,
          _target$dataset$max = _target$dataset.max,
          max = _target$dataset$max === void 0 ? "" : _target$dataset$max,
          _target$dataset$step = _target$dataset.step,
          step = _target$dataset$step === void 0 ? "" : _target$dataset$step,
          _target$dataset$unit = _target$dataset.unit,
          unit = _target$dataset$unit === void 0 ? "" : _target$dataset$unit,
          _target$dataset$forma = _target$dataset.format,
          format = _target$dataset$forma === void 0 ? "" : _target$dataset$forma;
      var divider = "-credit-";

      var _target$name$split = target.name.split("".concat(divider)),
          _target$name$split2 = _slicedToArray(_target$name$split, 2),
          formModifier = _target$name$split2[0],
          fieldModifier = _target$name$split2[1];

      var _masks$filter = masks.filter(function (item) {
        return item.el.input.name === "".concat(formModifier).concat(divider, "cost");
      }),
          _masks$filter2 = _slicedToArray(_masks$filter, 1),
          cost = _masks$filter2[0];

      var _masks$filter3 = masks.filter(function (item) {
        return item.el.input.name === "".concat(formModifier).concat(divider, "initial-payment");
      }),
          _masks$filter4 = _slicedToArray(_masks$filter3, 1),
          initialPayment = _masks$filter4[0];

      var _masks$filter5 = masks.filter(function (item) {
        return item.el.input.name === "".concat(formModifier).concat(divider, "initial-payment-range");
      }),
          _masks$filter6 = _slicedToArray(_masks$filter5, 1),
          initialPaymentRange = _masks$filter6[0];

      var initialPaymentPercent = document.querySelector("#".concat(formModifier).concat(divider, "initial-payment-percent"));

      var _masks$filter7 = masks.filter(function (item) {
        return item.el.input.name === "".concat(formModifier).concat(divider, "period");
      }),
          _masks$filter8 = _slicedToArray(_masks$filter7, 1),
          period = _masks$filter8[0];

      var _masks$filter9 = masks.filter(function (item) {
        return item.el.input.name === "".concat(formModifier).concat(divider, "period-range");
      }),
          _masks$filter10 = _slicedToArray(_masks$filter9, 1),
          periodRange = _masks$filter10[0];

      var maskUnit = "";

      switch (fieldModifier) {
        case "cost":
          if (Number(mask.unmaskedValue) < Number(min) || Number(mask.unmaskedValue) > Number(max)) {
            mask.updateOptions(getMaskOptions("", "string"));
            mask.value = "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435";

            if (initialPayment) {
              initialPayment.value = "0";
            }

            if (formField && !formField.classList.contains("calculator__form-field--invalid")) {
              formField.classList.add("calculator__form-field--invalid");
            }

            if (initialPayment && initialPaymentRange) {
              makeInactive([initialPayment, initialPaymentRange]);
            }
          } else {
            if (initialPayment) {
              initialPayment.value = "".concat(Number(cost.unmaskedValue) * (Number(initialPayment.el.input.dataset.min) / 100));

              if (initialPaymentRange) {
                initialPaymentRange.value = "".concat(Number(initialPaymentRange.el.input.min));
              }
            }

            if (buttons) {
              buttons.forEach(function (button) {
                return button.disabled = false;
              });
            }

            if (initialPayment && initialPaymentRange) {
              makeActive([initialPayment, initialPaymentRange]);
            }
          }

          break;

        case "initial-payment":
          if (Number(mask.unmaskedValue) >= Number(cost.unmaskedValue)) {
            mask.value = "".concat(Number(cost.unmaskedValue));

            if (initialPaymentRange) {
              initialPaymentRange.value = "".concat(max);
            }
          } else if (getPercentage(Number(mask.unmaskedValue), cost.unmaskedValue) < Number(min)) {
            mask.value = "".concat(Number(cost.unmaskedValue) / Number(min));

            if (initialPaymentRange) {
              initialPaymentRange.value = "".concat(min);
            }
          }

          if (initialPaymentRange) {
            initialPaymentRange.value = "".concat(round(getPercentage(Number(mask.unmaskedValue), Number(cost.unmaskedValue)), Number(step)));
          }

          maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
          mask.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case "initial-payment-range":
          if (initialPayment) {
            initialPayment.value = "".concat(Number(cost.unmaskedValue) * (Number(mask.unmaskedValue) / 100));
            initialPayment.el.input.dispatchEvent(new Event("change", {
              bubbles: true
            }));

            if (initialPaymentPercent) {
              initialPaymentPercent.textContent = "".concat(Number(mask.unmaskedValue), "%");
            }
          }

          break;

        case "period":
          if (Number(mask.unmaskedValue) > Number(max)) {
            mask.value = "".concat(Number(max));
            mask.updateOptions(getMaskOptions(mask, format));

            if (periodRange) {
              periodRange.value = "".concat(max);
            }
          } else if (Number(mask.unmaskedValue) < Number(min)) {
            mask.value = "".concat(Number(min));
            mask.updateOptions(getMaskOptions(unit, format));

            if (periodRange) {
              periodRange.value = "".concat(min);
            }
          }

          if (periodRange) {
            periodRange.value = "".concat(round(Number(mask.unmaskedValue), Number(step)));
          }

          maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
          mask.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case "period-range":
          if (period) {
            period.value = "".concat(Number(mask.unmaskedValue));
            period.el.input.dispatchEvent(new Event("change", {
              bubbles: true
            }));
          }

          break;

        default:
          throw new Error("Unknown field's modifier: ".concat(fieldModifier));
      }

      if (creditRegistrationForm) {
        if (!creditRegistrationForm.hidden) {
          creditRegistrationForm.hidden = true;
        }
      }
    };

    input.addEventListener("input", creditCalculationFormInputHandler);
    input.addEventListener("change", creditCalculationFormChangeHandler);
    input.addEventListener("focus", focusHandler);
  }); // Секция «Наше предложение»

  var calcAnnuityPayment = function calcAnnuityPayment(creditSum, monthlyInterestRate, periods) {
    return Math.ceil(creditSum * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, Math.abs(periods) * -1))));
  };

  var calcRequiredIncome = function calcRequiredIncome(monthlyPayment) {
    return Math.ceil(monthlyPayment / 45 * 100);
  };

  var calcMonthlyInterestRate = function calcMonthlyInterestRate(interestRate) {
    return Number((interestRate / 100 / 12).toFixed(5));
  };

  var calcPeriods = function calcPeriods(period) {
    return period * 12;
  };

  var toggleMessage = function toggleMessage(type, currentValue, minValue) {
    var creditSumMinThreshold = 200000;
    var modifiers = new Map([["mortgage", "\u0438\u043F\u043E\u0442\u0435\u0447\u043D\u044B\u0435"], ["auto", "\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0435"], ["personal", "\u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435"]]);

    if (currentValue < minValue) {
      var messageData = rejectMessage.querySelectorAll("span");

      var _messageData = _slicedToArray(messageData, 2),
          modifier = _messageData[0],
          value = _messageData[1];

      modifier.textContent = modifiers.get("".concat(type));
      value.textContent = "".concat(minValue.toLocaleString("en-US").replace(/,/g, " "), " ").concat(num2str(minValue, nounRublePlurals));
      rejectMessage.classList.remove("calculator__message--invisible");
      creditOfferingForm.hidden = true;
    } else {
      rejectMessage.classList.add("calculator__message--invisible");
      creditOfferingForm.hidden = false;
    }

    if (Number.isNaN(currentValue)) {
      errorMessage.classList.remove("calculator__message--invisible");
      creditOfferingForm.hidden = true;
    } else {
      errorMessage.classList.add("calculator__message--invisible");
    }
  };

  var creditTypeNames = new Map([["mortgage", "\u0421\u0443\u043C\u043C\u0430 \u0438\u043F\u043E\u0442\u0435\u043A\u0438"], ["auto", "\u0421\u0443\u043C\u043C\u0430 \u0430\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442\u0430"], ["period", "\u0421\u0443\u043C\u043C\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u0430"]]);

  if (creditOfferingForm) {
    var inputs = creditOfferingForm.querySelectorAll("input");

    if (inputs) {
      inputs.forEach(function (input) {
        var unit = getUnitPluralForm(input.dataset.unit, input.value);
        masks.push(IMask(input, getMaskOptions(unit, input.dataset.format)));
      });
    }

    creditOfferingForm.querySelector("button").addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      creditRegistrationForm.hidden = false;
    });
  }

  var fillInCreditOfferingForm = function fillInCreditOfferingForm(elements, data) {
    var creditSum = data.creditSum,
        interestRate = data.interestRate,
        annuityPayment = data.annuityPayment,
        requiredIncome = data.requiredIncome;
    elements.forEach(function (element) {
      var divider = "-offer-";
      var _element$el$input$dat = element.el.input.dataset,
          unit = _element$el$input$dat.unit,
          format = _element$el$input$dat.format;
      var name = element.el.input.name;

      var _name$split = name.split("".concat(divider)),
          _name$split2 = _slicedToArray(_name$split, 2),
          fieldName = _name$split2[1];

      var maskUnit = "";

      switch (fieldName) {
        case "credit-sum":
          element.value = "".concat(creditSum);
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case "interest-rate":
          element.value = "".concat(interestRate);
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case "annuity-payment":
          element.value = "".concat(annuityPayment);
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;

        case "required-income":
          element.value = "".concat(requiredIncome);
          maskUnit = getUnitPluralForm(unit, element.unmaskedValue);
          element.updateOptions(getMaskOptions(maskUnit, format));
          break;

        default:
          throw new Error("Unknown field's name: ".concat(name));
      }
    });
  };

  var renderCreditOfferingFormData = function renderCreditOfferingFormData(_ref2) {
    var currentTarget = _ref2.currentTarget;
    var divider = "-credit-";

    var _currentTarget$name$s = currentTarget.name.split("-"),
        _currentTarget$name$s2 = _slicedToArray(_currentTarget$name$s, 2),
        formModifier = _currentTarget$name$s2[1];

    var _masks$filter11 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formModifier).concat(divider, "cost");
    }),
        _masks$filter12 = _slicedToArray(_masks$filter11, 1),
        cost = _masks$filter12[0];

    var _masks$filter13 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formModifier).concat(divider, "initial-payment");
    }),
        _masks$filter14 = _slicedToArray(_masks$filter13, 1),
        initialPayment = _masks$filter14[0];

    var _masks$filter15 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formModifier).concat(divider, "period");
    }),
        _masks$filter16 = _slicedToArray(_masks$filter15, 1),
        period = _masks$filter16[0];

    if (creditOfferingForm) {
      creditOfferingForm.querySelector("label[for=\"credit-offer-credit-sum\"]").textContent = creditTypeNames.get("".concat(formModifier));
    }

    var periods = calcPeriods(Number(period.unmaskedValue));
    var filteredMasks = Array.from(masks).filter(function (mask) {
      return mask.el.input.name.includes("offer");
    });

    if (cost && period) {
      switch (formModifier) {
        case "mortgage":
          var _Array$from$filter5 = Array.from(currentTarget.elements).filter(function (element) {
            return element.name === "".concat(formModifier).concat(divider, "maternity-capital");
          }),
              _Array$from$filter6 = _slicedToArray(_Array$from$filter5, 1),
              maternityCapital = _Array$from$filter6[0];

          if (initialPayment && maternityCapital) {
            var maternityCapitalSum = maternityCapital.checked ? 470000 : 0;
            var creditSum = Number(cost.unmaskedValue) - Number(initialPayment.unmaskedValue) - maternityCapitalSum;
            var percentage = getPercentage(Number(initialPayment.unmaskedValue), Number(cost.unmaskedValue));
            var percentageRateThreshold = 15;
            var interestRate = 0;

            if (percentage < percentageRateThreshold) {
              interestRate = 9.4;
            } else if (percentage >= percentageRateThreshold) {
              interestRate = 8.5;
            }

            var monthlyInterestRate = calcMonthlyInterestRate(interestRate);
            var annuityPayment = calcAnnuityPayment(creditSum, monthlyInterestRate, periods);
            var requiredIncome = calcRequiredIncome(annuityPayment);
            toggleMessage(formModifier, creditSum, 500000);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum: creditSum,
              interestRate: interestRate,
              annuityPayment: annuityPayment,
              requiredIncome: requiredIncome
            });
          }

          break;

        case "auto":
          var _Array$from$filter7 = Array.from(currentTarget.elements).filter(function (element) {
            return element.name === "".concat(formModifier).concat(divider, "car-insurance");
          }),
              _Array$from$filter8 = _slicedToArray(_Array$from$filter7, 1),
              carInsurance = _Array$from$filter8[0];

          var _Array$from$filter9 = Array.from(currentTarget.elements).filter(function (element) {
            return element.name === "".concat(formModifier).concat(divider, "life-insurance");
          }),
              _Array$from$filter10 = _slicedToArray(_Array$from$filter9, 1),
              lifeInsurance = _Array$from$filter10[0];

          if (initialPayment && carInsurance && lifeInsurance) {
            var _creditSum = Number(cost.unmaskedValue) - Number(initialPayment.unmaskedValue);

            var costThreshold = 2000000;
            var _interestRate = 0;

            if (Number(cost.unmaskedValue) < costThreshold) {
              _interestRate = 16;
            } else if (Number(cost.unmaskedValue) > costThreshold) {
              _interestRate = 15;
            }

            if (carInsurance.checked || lifeInsurance.checked) {
              _interestRate = 8.5;
            }

            if (carInsurance.checked && lifeInsurance.checked) {
              _interestRate = 3.5;
            }

            var _monthlyInterestRate = calcMonthlyInterestRate(_interestRate);

            var _annuityPayment = calcAnnuityPayment(_creditSum, _monthlyInterestRate, periods);

            var _requiredIncome = calcRequiredIncome(_annuityPayment);

            toggleMessage(formModifier, _creditSum, 200000);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum: _creditSum,
              interestRate: _interestRate,
              annuityPayment: _annuityPayment,
              requiredIncome: _requiredIncome
            });
          }

          break;

        case "personal":
          var _Array$from$filter11 = Array.from(currentTarget.elements).filter(function (element) {
            return element.name === "".concat(formModifier).concat(divider, "project-member");
          }),
              _Array$from$filter12 = _slicedToArray(_Array$from$filter11, 1),
              projectMember = _Array$from$filter12[0];

          if (projectMember) {
            var _creditSum2 = Number(cost.unmaskedValue);

            var projectMemberPercentage = projectMember.checked ? 0.5 : 0;
            var personalMinThreshold = 750000;
            var personalMaxThreshold = 2000000;
            var _interestRate2 = 0;

            if (Number(cost.unmaskedValue) < personalMinThreshold) {
              _interestRate2 = 15 - projectMemberPercentage;
            } else if (Number(cost.unmaskedValue) <= personalMinThreshold && Number(cost.unmaskedValue) < personalMaxThreshold) {
              _interestRate2 = 12.5 - projectMemberPercentage;
            } else if (Number(cost.unmaskedValue) > personalMaxThreshold) {
              _interestRate2 = 9.5 - projectMemberPercentage;
            }

            var _monthlyInterestRate2 = calcMonthlyInterestRate(_interestRate2);

            var _annuityPayment2 = calcAnnuityPayment(_creditSum2, _monthlyInterestRate2, periods);

            var _requiredIncome2 = calcRequiredIncome(_annuityPayment2);

            toggleMessage(formModifier, _creditSum2, 0);
            fillInCreditOfferingForm(filteredMasks, {
              creditSum: _creditSum2,
              interestRate: _interestRate2,
              annuityPayment: _annuityPayment2,
              requiredIncome: _requiredIncome2
            });
          }

          break;

        default:
          throw new Error("Unknown form's modifier: ".concat(formModifier));
      }
    }
  }; // Шаг 3 (оформление заявки)


  if (creditRegistrationForm) {
    var formRegistrationName = creditRegistrationForm.name;

    var _inputs = creditRegistrationForm.querySelectorAll("input");

    if (_inputs) {
      _inputs.forEach(function (input) {
        var unit = getUnitPluralForm(input.dataset.unit, input.value);
        masks.push(IMask(input, getMaskOptions(unit, input.dataset.format)));
      });
    }

    var _masks$filter17 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-full-name");
    }),
        _masks$filter18 = _slicedToArray(_masks$filter17, 1),
        creditRegistrationFullNameInput = _masks$filter18[0];

    var _masks$filter19 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-email");
    }),
        _masks$filter20 = _slicedToArray(_masks$filter19, 1),
        creditRegistrationEmailInput = _masks$filter20[0];

    var _masks$filter21 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-tel");
    }),
        _masks$filter22 = _slicedToArray(_masks$filter21, 1),
        creditRegistrationTelInput = _masks$filter22[0];

    var _masks$filter23 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-application-number");
    }),
        _masks$filter24 = _slicedToArray(_masks$filter23, 1),
        formRegistrationApplicationNumber = _masks$filter24[0];

    var registrationFormData = localStorage.getItem("registrationFormData") ? JSON.parse(localStorage.getItem("registrationFormData")) : {
      fullName: "",
      tel: "",
      email: ""
    };
    var fullName = registrationFormData.fullName,
        tel = registrationFormData.tel,
        email = registrationFormData.email;

    if (creditRegistrationFullNameInput) {
      creditRegistrationFullNameInput.value = fullName;
    }

    if (creditRegistrationEmailInput) {
      creditRegistrationEmailInput.value = email;
    }

    if (creditRegistrationTelInput) {
      creditRegistrationTelInput.value = tel;
    }

    if (formRegistrationApplicationNumber) {
      formRegistrationApplicationNumber.value = "1";
    }
  }

  var renderCreditRegistrationFormData = function renderCreditRegistrationFormData(_ref3) {
    var currentTarget = _ref3.currentTarget;

    var updateMask = function updateMask(mask) {
      var _mask$el$input$datase7 = mask.el.input.dataset,
          unit = _mask$el$input$datase7.unit,
          format = _mask$el$input$datase7.format;
      var maskUnit = getUnitPluralForm(unit, mask.unmaskedValue);
      mask.updateOptions(getMaskOptions(maskUnit, format));
    }; // поля формы с параметрами кредита


    var divider = "-credit-";

    var _currentTarget$name$s3 = currentTarget.name.split("-"),
        _currentTarget$name$s4 = _slicedToArray(_currentTarget$name$s3, 2),
        formCalculationModifier = _currentTarget$name$s4[1];

    var _masks$filter25 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formCalculationModifier).concat(divider, "cost");
    }),
        _masks$filter26 = _slicedToArray(_masks$filter25, 1),
        creditRegistrationCostMask = _masks$filter26[0];

    var _masks$filter27 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formCalculationModifier).concat(divider, "initial-payment");
    }),
        _masks$filter28 = _slicedToArray(_masks$filter27, 1),
        creditRegistrationInitialPaymentMask = _masks$filter28[0];

    var _masks$filter29 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formCalculationModifier).concat(divider, "period");
    }),
        _masks$filter30 = _slicedToArray(_masks$filter29, 1),
        creditRegistrationPeriodMask = _masks$filter30[0]; // поля формы оформления заявки


    var formRegistrationName = creditRegistrationForm && creditRegistrationForm.name;

    var _masks$filter31 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-purpose");
    }),
        _masks$filter32 = _slicedToArray(_masks$filter31, 1),
        formRegistrationPurposeInput = _masks$filter32[0];

    var formRegistrationCostLabel = creditRegistrationForm && creditRegistrationForm.querySelector("[for=\"credit-registration-cost\"]");

    var _masks$filter33 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-cost");
    }),
        _masks$filter34 = _slicedToArray(_masks$filter33, 1),
        costInput = _masks$filter34[0];

    var _masks$filter35 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-initial-payment");
    }),
        _masks$filter36 = _slicedToArray(_masks$filter35, 1),
        formRegistrationInitialPaymentInput = _masks$filter36[0];

    var creditRegistrationInitialPaymentGroup = creditRegistrationForm && creditRegistrationForm.querySelector("input[name=\"".concat(formRegistrationName, "-initial-payment\"]")).closest(".calculator__form-field");

    var _masks$filter37 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(formRegistrationName, "-period");
    }),
        _masks$filter38 = _slicedToArray(_masks$filter37, 1),
        formRegistrationPeriodInput = _masks$filter38[0];

    switch (formCalculationModifier) {
      case "mortgage":
        formRegistrationPurposeInput.value = "\u0418\u043F\u043E\u0442\u0435\u043A\u0430";

        if (creditRegistrationCostMask) {
          formRegistrationCostLabel.textContent = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438";
        }

        break;

      case "auto":
        formRegistrationPurposeInput.value = "\u0410\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442";

        if (creditRegistrationCostMask) {
          formRegistrationCostLabel.textContent = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F";
        }

        break;

      case "personal":
        formRegistrationPurposeInput.value = "\u041F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u0440\u0435\u0434\u0438\u0442";

        if (creditRegistrationCostMask) {
          formRegistrationCostLabel.textContent = "\u0421\u0443\u043C\u043C\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u0430";
        }

        break;

      default:
        throw new Error("Unknown modifier: ".concat(formCalculationModifier));
    }

    if (creditRegistrationCostMask) {
      costInput.value = creditRegistrationCostMask.unmaskedValue;
      updateMask(costInput);
    }

    if (creditRegistrationInitialPaymentMask) {
      formRegistrationInitialPaymentInput.value = creditRegistrationInitialPaymentMask.unmaskedValue;
      creditRegistrationInitialPaymentGroup.classList.remove("calculator__form-field--invisible");
      updateMask(formRegistrationInitialPaymentInput);
    } else {
      creditRegistrationInitialPaymentGroup.classList.add("calculator__form-field--invisible");
    }

    if (creditRegistrationPeriodMask) {
      formRegistrationPeriodInput.value = creditRegistrationPeriodMask.unmaskedValue;
      updateMask(formRegistrationPeriodInput);
    }
  };

  if (creditCalculationForms) {
    creditCalculationForms.forEach(function (form) {
      form.addEventListener("change", renderCreditOfferingFormData);
      form.addEventListener("change", renderCreditRegistrationFormData);
    });
  }

  if (creditRegistrationForm) {
    var _formRegistrationName = creditRegistrationForm.name;

    var _masks$filter39 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(_formRegistrationName, "-full-name");
    }),
        _masks$filter40 = _slicedToArray(_masks$filter39, 1),
        _fullName = _masks$filter40[0];

    var _masks$filter41 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(_formRegistrationName, "-tel");
    }),
        _masks$filter42 = _slicedToArray(_masks$filter41, 1),
        _tel = _masks$filter42[0];

    var _masks$filter43 = masks.filter(function (mask) {
      return mask.el.input.name === "".concat(_formRegistrationName, "-email");
    }),
        _masks$filter44 = _slicedToArray(_masks$filter43, 1),
        _email = _masks$filter44[0];

    var toggleInvalid = function toggleInvalid(element, state) {
      var parent = element.parentElement;

      var _parent$classList = _slicedToArray(parent.classList, 1),
          parentclassName = _parent$classList[0];

      if (state === "valid") {
        if (parent && parent.classList.contains("".concat(parentclassName, "--invalid"))) {
          parent.classList.remove("".concat(parentclassName, "--invalid"));
          parent.classList.remove("animated", "shake");
        }
      } else if (state === "invalid") {
        if (parent && !parent.classList.contains("".concat(parentclassName, "--invalid"))) {
          parent.classList.add("".concat(parentclassName, "--invalid"));
          parent.classList.add("animated", "shake");
        }
      }
    };

    var creditRegistrationFormInvalidHandler = function creditRegistrationFormInvalidHandler(_ref4) {
      var target = _ref4.target;

      if (!target.validity.valid) {
        toggleInvalid(target, "invalid");
      }
    };

    var creditRegistrationFormInputHandler = function creditRegistrationFormInputHandler(_ref5) {
      var target = _ref5.target;
      toggleInvalid(target, "valid");
    };

    [_fullName, _email, _tel].forEach(function (mask) {
      mask.el.input.addEventListener("invalid", creditRegistrationFormInvalidHandler);
      mask.el.input.addEventListener("input", creditRegistrationFormInputHandler);
    });

    var submitHandler = function submitHandler(event) {
      event.preventDefault();
      var target = event.target;
      toggleInvalid(target, "valid");
      var modalCalculator = document.querySelector(".modal--calculator");

      var _masks$filter45 = masks.filter(function (mask) {
        return mask.el.input.name === "".concat(_formRegistrationName, "-application-number");
      }),
          _masks$filter46 = _slicedToArray(_masks$filter45, 1),
          formRegistrationApplicationNumber = _masks$filter46[0];

      var formData = Object.fromEntries(new FormData(target));
      localStorage.setItem("registrationFormData", JSON.stringify({
        fullName: formData["".concat(_formRegistrationName, "-full-name")],
        email: formData["".concat(_formRegistrationName, "-email")],
        tel: formData["".concat(_formRegistrationName, "-tel")]
      }));

      if (formRegistrationApplicationNumber) {
        formRegistrationApplicationNumber.unmaskedValue = "".concat(Number(formRegistrationApplicationNumber.unmaskedValue) + 1);
      }

      creditRegistrationForm.hidden = true;

      if (modalCalculator.classList.contains("modal--invisible")) {
        modalCalculator.classList.remove("modal--invisible", "fadeOut");
        modalCalculator.classList.add("animated", "fadeIn");
      }

      var scrollbarWidth = getScrollbarWidth();
      document.body.classList.add("page--overlay");
      document.body.style.cssText = "background-color: #f6f7ff; padding-right: ".concat(scrollbarWidth, "px; overflow: hidden");

      if (creditCalculationForms) {
        creditCalculationForms.forEach(function (form) {
          if (!form.hidden) {
            form.hidden = !form.hidden;
          }
        });
      }

      if (creditOfferingForm) {
        creditOfferingForm.hidden = true;
      }
    };

    creditRegistrationForm.addEventListener("submit", submitHandler);
  }
});
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global ymaps */
document.addEventListener("DOMContentLoaded", function () {
  var map;
  var objectManager;
  var mapContainer = document.querySelector("#map");

  var init = function init() {
    var departments = mapContainer && JSON.parse(mapContainer.dataset.departments);
    var russiaCoords = [61.698653, 99.505405];
    map = new ymaps.Map(mapContainer, {
      center: russiaCoords,
      zoom: [9],
      controls: []
    }, {
      autoFitToViewport: "always"
    });
    objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
      clusterDisableClickZoom: true
    });
    objectManager.objects.options.set({
      iconLayout: "default#image",
      iconImageHref: "./static/departments/map_marker.svg",
      iconImageSize: [35, 40],
      iconImageOffset: [-17, -20]
    });
    fetch("./static/departments/departments.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      objectManager.add(data["features"] = data["features"].filter(function (item) {
        return departments.includes(item.group);
      }));
      map.geoObjects.add(objectManager);
      var bounds = objectManager.getBounds();

      if (bounds) {
        map.setBounds(objectManager.getBounds());
      }
    });
    map.behaviors.disable("scrollZoom");
  };

  var handleChange = function handleChange(_ref) {
    var currentTarget = _ref.currentTarget;
    var names = Array.from(currentTarget.elements.department).map(function (department) {
      if (department.checked) {
        var _department$id$split = department.id.split("-"),
            _department$id$split2 = _slicedToArray(_department$id$split, 2),
            name = _department$id$split2[1];

        return name;
      }

      return false;
    }).filter(function (name) {
      return name;
    });

    if (mapContainer) {
      mapContainer.dataset.departments = JSON.stringify(names);
    }

    if (map) {
      map.destroy();
    }

    ymaps.ready(init);
  };

  document.querySelector("#departments-form").addEventListener("change", handleChange);
  window.addEventListener("resize", function () {
    if (map && objectManager) {
      map.setBounds(objectManager.getBounds());
      map.container.fitToViewport();
    }
  });
  ymaps.ready(init);
});
document.addEventListener("DOMContentLoaded", function () {
  var triggerClick = function triggerClick(element) {
    element.addEventListener("keydown", function (event) {
      var keyCode = event.keyCode,
          target = event.target;

      if (keyCode === 13 || keyCode === 32) {
        target.click();
      }
    });
  };

  document.querySelectorAll("form#departments-form label").forEach(function (label) {
    return triggerClick(label);
  });
});
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global WatchJS */
var _WatchJS = WatchJS,
    watch = _WatchJS.watch;
document.addEventListener("DOMContentLoaded", function () {
  // Modal Form Validation (Observer Pattern, MVC)
  var modalPageHeader = document.querySelector("#modal-page-header");
  var modalCloseButtons = document.querySelectorAll(".modal__trigger");
  var form = modalPageHeader.querySelector("form");
  var fieldElements = {
    login: form.querySelector(".login-modal-form-field input"),
    password: form.querySelector(".password-modal-form-field input")
  };
  var submitButton = form.querySelector("button[type=\"submit\"]");
  var errorMessages = {
    login: {
      empty: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E"
    },
    password: {
      empty: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E",
      length: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F \u2014 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
    }
  };

  var validate = function validate(fields, name) {
    var errors = {};

    switch (name) {
      case "login":
        if (!fields.login) {
          errors.login = errorMessages.login.empty;
        } else {
          errors.login = "";
        }

        break;

      case "password":
        if (!fields.password) {
          errors.password = errorMessages.password.empty;
        } else if (fields.password.length < 6) {
          errors.password = errorMessages.password.length;
        } else {
          errors.password = "";
        }

        break;

      default:
        throw new Error("Unknown field's name: ".concat(name));
    }

    return _objectSpread({}, state.form.errors, errors);
  };

  var updateStateErrors = function updateStateErrors(state, name) {
    var errors = validate(state.form.fields, name);
    state.form.errors = errors;
  };

  var updateValidationState = function updateValidationState(errors) {
    state.form.valid = Object.keys(errors).every(function (key) {
      return errors[key].length === 0;
    });
  };

  var loginFormData = localStorage.getItem("loginFormData") ? JSON.parse(localStorage.getItem("loginFormData")) : {
    login: "",
    password: ""
  };
  var login = loginFormData.login,
      password = loginFormData.password;
  var state = {
    form: {
      processState: "filling",
      // sending, finished
      fields: {
        login: login,
        password: password
      },
      valid: true,
      errors: {
        login: "",
        password: ""
      }
    }
  };

  if (modalPageHeader && form) {
    if (fieldElements["login"] && fieldElements["password"]) {
      Object.entries(fieldElements).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            element = _ref2[1];

        element.value = state.form.fields[name];
        element.addEventListener("input", function (e) {
          state.form.fields[name] = e.target.value;
          updateStateErrors(state, name);
          updateValidationState(state.form.errors);
        });
      });
      watch(state.form, "errors", function () {
        Object.entries(fieldElements).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              name = _ref4[0],
              element = _ref4[1];

          var rootElementClassName = "".concat(name, "-modal-form-field");
          var rootElement = element.closest(".".concat(rootElementClassName));

          if (rootElement) {
            var feedbackElement = rootElement.querySelector(".".concat(rootElementClassName, "__feedback"));
            var errorMessage = state.form.errors[name];

            if (feedbackElement.querySelector(".".concat(rootElementClassName, "__error-message"))) {
              rootElement.classList.remove("".concat(rootElementClassName, "--invalid"));
              feedbackElement.innerHTML = "";
            }

            if (!errorMessage) {
              return;
            }

            var errorMessageElement = document.createElement("span");
            errorMessageElement.classList.add("".concat(rootElementClassName, "__error-message"));
            errorMessageElement.innerHTML = errorMessage;
            feedbackElement.append(errorMessageElement);
            rootElement.classList.add("".concat(rootElementClassName, "--invalid"));
          }
        });
      });
    }

    if (submitButton) {
      watch(state.form, "processState", function () {
        var processState = state.form.processState;

        switch (processState) {
          case "filling":
            submitButton.disabled = true;
            break;

          case "sending":
            submitButton.disabled = true;
            break;

          case "finished":
            modalPageHeader.classList.add("modal--invisible", "fadeOut");
            modalPageHeader.classList.remove("fadeIn");
            document.body.style.cssText = "padding-right: ''; overflow: ''";
            document.body.classList.remove("page--overlay");
            break;

          default:
            throw new Error("Unknown state: ".concat(processState));
        }
      });
      watch(state.form, "valid", function () {
        submitButton.disabled = !state.form.valid;
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var target = event.target;
      state.form.processState = "sending";
      var formData = new FormData(target);
      localStorage.setItem("loginFormData", JSON.stringify(Object.fromEntries(formData)));
      Object.entries(fieldElements).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            name = _ref6[0];

        updateStateErrors(state, name);
      });
      updateValidationState(state.form.errors);

      if (state.form.valid) {
        state.form.processState = "finished";
      } else {
        var errors = state.form.errors;
        state.form.processState = "filling";

        var _arr2 = Object.keys(errors);

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var name = _arr2[_i2];

          if (errors[name] !== 0) {
            fieldElements[name].focus();
            break;
          }
        }
      }
    }); // show / hide password

    var showPassword = function showPassword(event) {
      var target = event.target,
          type = event.type;
      var input = target.previousElementSibling;

      if (type === "mousedown") {
        input.setAttribute("type", "text");
      } else if (type === "keydown" && event.keyCode === 13 || type === "keydown" && event.keyCode === 32) {
        input.setAttribute("type", "text");
      }
    };

    var hidePassword = function hidePassword(_ref7) {
      var target = _ref7.target;
      var input = target.previousElementSibling;
      input.setAttribute("type", "password");
    };

    ["mousedown", "keydown"].forEach(function (event) {
      fieldElements["password"].nextElementSibling.addEventListener(event, showPassword);
    });
    ["mouseup", "keyup"].forEach(function (event) {
      return fieldElements["password"].nextElementSibling.addEventListener(event, hidePassword);
    }); // Modal Visibility

    var hideModal = function hideModal(modal) {
      modal.classList.add("modal--invisible", "fadeOut");
      modal.classList.remove("fadeIn");

      if (document.body.classList.contains("page--overlay")) {
        document.body.classList.remove("page--overlay");
      }

      document.body.style.cssText = "background-color: ''; padding-right: ''; overflow: ''";
    };

    if (modalCloseButtons) {
      ["click", "keydown"].forEach(function (event) {
        return modalCloseButtons.forEach(function (modalCloseButton) {
          return modalCloseButton.addEventListener(event, function (e) {
            var type = e.type,
                target = e.target;

            if (type === "keydown") {
              if (e.keyCode === 32 || e.keyCode === 13) {
                hideModal(target.closest("#".concat(target.dataset.modal)));
              }
            } else if (type === "click") {
              hideModal(target.closest("#".concat(target.dataset.modal)));
            }
          });
        });
      });
    }
  }
});
//# sourceMappingURL=app.js.map