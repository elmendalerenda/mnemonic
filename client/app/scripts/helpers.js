(function (window) {
  'use strict';

  // Get element(s) by CSS selector:
  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  // addEventListener wrapper:
  window.$on = function (target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
  };
})(window);

