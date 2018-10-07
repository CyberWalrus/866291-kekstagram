'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var STEP_SCALE = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgScale = imgUploadOverlay.querySelector('input[name=scale]');
  var valueScale = parseInt(imgScale.value, 10);
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var img = imgPreview.querySelector('img');
  var imgFilters = imgUploadOverlay.querySelectorAll('.effects__preview');

  var changeScale = function (event, check) {
    event.preventDefault();
    if (check) {
      valueScale += STEP_SCALE;
    } else {
      valueScale -= STEP_SCALE;
    }
    if (valueScale >= MAX_SCALE) {
      valueScale = MAX_SCALE;
    } else if (valueScale <= MIN_SCALE) {
      valueScale = MIN_SCALE;
    }
    imgScale.value = valueScale + '%';
    imgPreview.style.transform = 'scale(' + valueScale / 100 + ')';
  };

  var clear = function () {
    valueScale = MAX_SCALE;
    imgScale.value = valueScale + '%';
    imgPreview.style.transform = '';
  };

  var onBiggerClick = function (event) {
    changeScale(event, true);
  };
  var onBiggerKeydown = function (event) {
    window.data.isEnterEvent(event, onBiggerClick);
  };

  var onSmallerClick = function (event) {
    changeScale(event, false);
  };
  var onSmallerKeydown = function (event) {
    window.data.isEnterEvent(event, onSmallerClick);
  };


  var onCloseUploadFileClick = function (event) {
    if (event !== undefined) {
      event.preventDefault();
    }
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadFileKeydown);
    buttonBigger.removeEventListener('click', onBiggerClick);
    buttonBigger.removeEventListener('keydown', onBiggerKeydown);
    buttonSmaller.removeEventListener('click', onSmallerClick);
    buttonSmaller.removeEventListener('keydown', onSmallerKeydown);
    buttonCancel.removeEventListener('click', onCloseUploadFileClick);
    buttonCancel.removeEventListener('keydown', onCloseKeydown);
    buttonSubmit.removeEventListener('click', onSubmitClick);
    buttonSubmit.removeEventListener('keydown', onSubmitKeydown);
    window.form.removeEvents();
    window.form.updateValues();
    uploadFile.addEventListener('change', onUploadFileChange);
  };
  var onCloseKeydown = function (event) {
    window.data.isEnterEvent(event, onCloseUploadFileClick);
  };
  var onCloseUploadFileKeydown = function (event) {
    window.data.isEscEvent(event, onCloseUploadFileClick);
  };

  var onSubmitClick = function (event) {
    event.preventDefault();
    if (window.form.checkValue()) {
      window.uploadPicture.onButtonClick();
      onCloseUploadFileClick();
    }
  };
  var onSubmitKeydown = function (event) {
    window.data.isEnterEvent(event, onSubmitClick);
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
        img.src = reader.result;
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
    buttonBigger.addEventListener('click', onBiggerClick);
    buttonBigger.addEventListener('keydown', onBiggerKeydown);
    buttonSmaller.addEventListener('click', onSmallerClick);
    buttonSmaller.addEventListener('keydown', onSmallerKeydown);
    buttonCancel.addEventListener('click', onCloseUploadFileClick);
    buttonCancel.addEventListener('keydown', onCloseKeydown);
    buttonSubmit.addEventListener('click', onSubmitClick);
    buttonSubmit.addEventListener('keydown', onSubmitKeydown);
    window.form.addEvents();
    uploadFile.removeEventListener('change', onUploadFileChange);
  };

  var buttonBigger = document.querySelector('.scale__control--bigger');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonCancel = document.querySelector('.img-upload__cancel');
  var buttonSubmit = document.querySelector('#upload-submit');

  uploadFile.addEventListener('change', onUploadFileChange);

  window.preview = {
    onCloseUploadFileKeydown: onCloseUploadFileKeydown,
    onUploadFileChange: onUploadFileChange,
    preview: imgPreview,
    clear: clear,
    uploadFile: uploadFile
  };
})();
