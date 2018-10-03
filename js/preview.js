'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgFilters = imgUploadOverlay.querySelectorAll('.effects__preview');

  var onBiggerClick = function () {
    event.preventDefault();
    preview.incrScale();
  };
  var onSmallerClick = function () {
    event.preventDefault();
    preview.discScale();
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
    uploadFile.addEventListener('change', onUploadFileChange);
  };

  var onSubmitClick = function () {
    event.preventDefault();
    if (window.form.checkValue()) {
      onCloseUploadFileClick();
      window.uploadPicture.onButtonClick();
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
    buttonCancel.addEvent();
    buttonSmaller.addEvent();
    window.form.addEvents();
    buttonSubmit.addEvent();
    buttonBigger.addEvent();
    uploadFile.removeEventListener('change', onUploadFileChange);
  };

  var preview = new window.model.ImgPreview(imgUploadOverlay.querySelector('.img-upload__preview'), imgUploadOverlay.querySelector('input[name=scale]'), 25, 100, 25);
  var buttonBigger = new window.model.Button(document.querySelector('.scale__control--bigger'), onBiggerClick);
  var buttonSmaller = new window.model.Button(document.querySelector('.scale__control--smaller'), onSmallerClick);
  var buttonCancel = new window.model.Button(document.querySelector('.img-upload__cancel'), onCloseUploadFileClick);
  var buttonSubmit = new window.model.Button(document.querySelector('#upload-submit'), onSubmitClick);

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown,
    onUploadFileChange: onUploadFileChange,
    preview: preview,
    uploadFile: uploadFile
  };
})();
