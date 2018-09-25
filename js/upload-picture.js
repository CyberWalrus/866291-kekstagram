'use strict';

(function () {

  var main = document.querySelector('main');
  var templateError = document.querySelector('#error').content.querySelector('section');
  var templateSuccess = document.querySelector('#success').content.querySelector('section');
  var templateMessages = document.querySelector('#messages').content.querySelector('div');
  var form = document.querySelector('#upload-select-image');
  var elementMessage = templateMessages.cloneNode(true);


  var addElemnt = function (template, message, addFunction) {
    var element = template.cloneNode(true);
    var elementButton = element.querySelector('button');
    if (message !== undefined) {
      element.querySelector('h2').textContent = message;
    }

    var onClickElement = function (event) {
      event.preventDefault();
      var target = event.target;
      if (target.type === 'button') {
        onCloseElement();
        if (addFunction !== undefined) {
          addFunction();
        }
      }
    };

    var onCloseElement = function () {
      main.removeChild(element);
      removeElementEvents();
      window.form.updateValues();
    };

    var onEnterElement = function (evt) {
      window.data.isEnterEvent(evt, onCloseElement);
    };

    var onEscElement = function (evt) {
      window.data.isEscEvent(evt, onCloseElement);
    };

    var onClickDocument = function (evt) {
      if (element === evt.target) {
        onCloseElement();
      }
    };

    var removeElementEvents = function () {
      element.removeEventListener('click', onClickElement);
      elementButton.removeEventListener('keydown', onEnterElement);
      document.removeEventListener('keydown', onEscElement);
      document.removeEventListener('mousedown', onClickDocument);
    };

    element.addEventListener('click', onClickElement);
    elementButton.addEventListener('keydown', onEnterElement);
    document.addEventListener('keydown', onEscElement);
    document.addEventListener('mousedown', onClickDocument);
    main.appendChild(element);
  };

  var onLoad = function () {
    addElemnt(templateSuccess);
  };

  var onError = function (message) {
    addElemnt(templateError, message, window.preview.onUploadFileChange);
  };

  var onButtonClick = function () {
    var data = new FormData(form);
    main.appendChild(elementMessage);
    window.backend.send(data, onLoad, onError);
    main.removeChild(elementMessage);
  };

  window.uploadPicture = {
    onButtonClick: onButtonClick
  };
})();
