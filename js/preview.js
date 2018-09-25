'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

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

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown
  };
})();
