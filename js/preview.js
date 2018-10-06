'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgFilters = imgUploadOverlay.querySelectorAll('.effects__preview');

  var onBiggerClick = function (event) {
    event.preventDefault();
    preview.incrScale();
  };
  var onBiggerKeydown = function (event) {
    window.data.isEnterEvent(event, onBiggerClick);
  };

  var onSmallerClick = function (event) {
    event.preventDefault();
    preview.discScale();
  };
  var onSmallerKeydown = function (event) {
    window.data.isEnterEvent(event, onSmallerClick);
  };

  var onCloseUploadFileKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseUploadFileClick);
  };

  var onCloseUploadFileClick = function () {
    event.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadFileKeydown);
    buttonCancel.removeEvent();
    buttonSmaller.removeEvent();
    window.form.removeEvents();
    buttonSubmit.removeEvent();
    buttonBigger.removeEvent();
    window.form.updateValues();
    uploadFile.addEventListener('change', onUploadFileChange);
  };

  var onSubmitClick = function () {
    event.preventDefault();
    if (window.form.checkValue()) {
      window.uploadPicture.onButtonClick();
      onCloseUploadFileClick();
    }
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
        preview.setSrc(reader.result);
        imgFilters.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        reader.removeEventListener('load', onLoadFile);
      };

      reader.addEventListener('load', onLoadFile);

      reader.readAsDataURL(file);
    }
  };

  var onUploadFileChange = function () {
    addPhotoPreview();
    uploadFile.blur();
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadFileKeydown);
    buttonBigger.addEventListener('click', onPopularClick);
    buttonBigger.addEventListener('keydown', onPopularKeydown);
    buttonSmaller.addEventListener('click', onNewClick);
    buttonSmaller.addEventListener('keydown', onNewKeydown);
    buttonCancel.addEventListener('click', onDiscussedClick);
    buttonCancel.addEventListener('keydown', onDiscussedKeydown);
    buttonSubmit.addEventListener('click', onDiscussedClick);
    buttonSubmit.addEventListener('keydown', onDiscussedKeydown);
    window.form.addEvents();
    uploadFile.removeEventListener('change', onUploadFileChange);
  };

  var preview = new window.model.ImgPreview(imgUploadOverlay.querySelector('.img-upload__preview'), imgUploadOverlay.querySelector('input[name=scale]'), 25, 100, 25);
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonCancel = document.querySelector('.img-upload__cancel');
  var buttonSubmit = document.querySelector('#upload-submit');

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown,
    onUploadFileChange: onUploadFileChange,
    preview: preview,
    uploadFile: uploadFile
  };
})();
