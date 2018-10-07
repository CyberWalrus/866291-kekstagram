'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };


  var generateRandomNumber = function (max, min) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    generateRandomNumber: generateRandomNumber,
    debounce: debounce
  };
})();
