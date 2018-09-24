'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var buttonSubmit = imgUploadOverlay.querySelector('#upload-submit');

  var main = document.querySelector('main');
  var templateError = document.querySelector('#error').content.querySelector('section');
  var templateSuccess = document.querySelector('#success').content.querySelector('section');
  var data = {};

  var onCloseUploadFileKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseUploadFileClick);
  };

  var onCloseUploadFileClick = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.removeEventListener('click', onCloseUploadFileClick);
    window.form.removeEvents();
    uploadFile.addEventListener('change', onUploadFileChange);
  };

  var onUploadFileChange = function (event) {
    event.preventDefault();
    uploadFile.blur();
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.addEventListener('click', onCloseUploadFileClick);
    window.form.addEvents();
    uploadFile.removeEventListener('change', onUploadFileChange);
  };

  var onLoad = function (message) {
    mainAddElemnt(templateSuccess, message);
  };

  var onError = function (message) {
    mainAddElemnt(templateError, message);
  };

  var mainAddElemnt = function (template, message) {
    var element = template.cloneNode(true);
    var elementButton = element.querySelector('button')
    element.querySelector('h2').textContent = message;
    var onClickElement = function (event) {
      main.removeChild(element);
      removeEvents();
    };
    var removeEvents = function () {
      elementButton.removeEventListener('click', onClickElement);
    };
    elementButton.addEventListener('click', onClickElement);
    main.appendChild(element);
  };

  mainAddElemnt(templateError, 'test');

  buttonSubmit.addEventListener('click', function () {
    window.send(data, onLoad, onError);
  });

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown
  };
})();
