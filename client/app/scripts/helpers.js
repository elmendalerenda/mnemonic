(function (window) {
  'use strict';

  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.$on = function (target, type, callback, useCapture) {
    if(!target) { console.log('failed to add listener to element, target not found'); return; }

    target.addEventListener(type, callback, !!useCapture);
  };
})(window);

