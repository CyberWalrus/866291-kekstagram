'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var buttonSubmit = document.querySelector('#upload-submit');

  var onCloseUploadFileKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseUploadFileClick);
  };

  var onCloseUploadFileClick = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.removeEventListener('click', onCloseUploadFileClick);
    window.form.removeEvents();
    buttonSubmit.removeEventListener('click', onButtonClick);
    uploadFile.addEventListener('change', onUploadFileChange);
  };

  var onButtonClick = function () {
    event.preventDefault();
    onCloseUploadFileClick();
    window.uploadPicture.onButtonClick();
  };

  var onUploadFileChange = function (event) {
    event.preventDefault();
    uploadFile.blur();
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.addEventListener('click', onCloseUploadFileClick);
    window.form.addEvents();
    buttonSubmit.addEventListener('click', onButtonClick);
    uploadFile.removeEventListener('change', onUploadFileChange);
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown,
    onUploadFileChange: onUploadFileChange
  };
})();
