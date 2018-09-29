'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var preview = imgUploadOverlay.querySelector('img');
  var imgFilters = imgUploadOverlay.querySelectorAll('.effects__preview');
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
  
  var addPhotoPreview = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onLoadFile = function () {
        preview.src = reader.result;
        imgFilters.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        reader.removeEventListener('load', onLoadFile);
      };

      reader.addEventListener('load', onLoadFile);

      reader.readAsDataURL(file);
    }
  };

  var onUploadFileChange = function (event) {
    event.preventDefault();
    addPhotoPreview();
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
