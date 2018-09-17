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
    removeUploadFileEvent();
  };
  var removeUploadFileEvent = function () {
    document.removeEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.removeEventListener('click', onCloseUploadFileClick);
    window.form.removePhotoEvents();
  };
  var onUploadFileChange = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadFileKeydown);
    imgUploadCancel.addEventListener('click', onCloseUploadFileClick);
    window.form.changePhotoEvents();
  };
  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown
  };
})();
