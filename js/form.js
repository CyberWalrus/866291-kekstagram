'use strict';

(function () {
  var typeEffect = 'none';

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelValue = imgUploadOverlay.querySelector('input[name=effect-level]');
  var inputHashtags = imgUploadOverlay.querySelector('input[name=hashtags]');
  var maxEffectLevelPin = effectLevelLine.clientWidth;

  var effectPhoto = [{
    dom: imgUploadOverlay.querySelector('#effect-none'),
    addClass: function () {
      addNewEffectClassImg('none');
    }
  }, {
    dom: imgUploadOverlay.querySelector('#effect-chrome'),
    addClass: function () {
      addNewEffectClassImg('chrome');
    }
  }, {
    dom: imgUploadOverlay.querySelector('#effect-sepia'),
    addClass: function () {
      addNewEffectClassImg('sepia');
    }
  }, {
    dom: imgUploadOverlay.querySelector('#effect-marvin'),
    addClass: function () {
      addNewEffectClassImg('marvin');
    }
  }, {
    dom: imgUploadOverlay.querySelector('#effect-phobos'),
    addClass: function () {
      addNewEffectClassImg('phobos');
    }
  }, {
    dom: imgUploadOverlay.querySelector('#effect-heat'),
    addClass: function () {
      addNewEffectClassImg('heat');
    }
  }];

  var addNewEffectClassImg = function (text) {
    if (text === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      maxEffectLevelPin = effectLevelLine.clientWidth;
      effectLevelPin.style.left = maxEffectLevelPin + 'px';
      effectLevelDepth.style.width = maxEffectLevelPin + 'px';
    }
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.classList.add('effects__preview--' + text);
    imgUploadPreview.style.filter = '';
    effectLevelValue.value = 100;
    typeEffect = text;
  };
  var removePhotoEvents = function () {
    for (var i = 0; i < effectPhoto.length; i++) {
      effectPhoto[i]['dom'].removeEventListener('click', effectPhoto[i]['addClass']);
    }
  };
  var takeEffectFilter = function (type, precentEffect) {
    var filterReturn = '';
    switch (type) {
      case 'chrome':
        filterReturn = 'grayscale(' + precentEffect + ')';
        break;
      case 'sepia':
        filterReturn = 'sepia(' + precentEffect + ')';
        break;
      case 'marvin':
        filterReturn = 'invert(' + 100 * precentEffect + '%)';
        break;
      case 'phobos':
        filterReturn = 'blur(' + 3 * precentEffect + 'px)';
        break;
      case 'heat':
        var brightnessValue = 1 + 2 * precentEffect;
        filterReturn = 'brightness(' + brightnessValue + ')';
        break;
      default:
        filterReturn = '';
    }
    return filterReturn;
  };
  var onInputHashtagsInput = function (evt) {
    var target = evt.target;
    var hashtags = target.value.toLowerCase();
    var hashtagsArr = hashtags.split(' ');
    if (hashtagsArr.length <= 5) {
      target.setCustomValidity('');
      for (var i = 0; i < hashtagsArr.length; i++) {
        var numberСoincidences = 0;
        for (var e = 0; e < hashtagsArr.length; e++) {
          if (hashtagsArr[i] === hashtagsArr[e]) {
            numberСoincidences++;
          }
        }
        if (hashtagsArr[i][0] !== '#') {
          target.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        } else if (hashtagsArr[i].length <= 1) {
          target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsArr[i].length > 20) {
          target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (numberСoincidences > 1) {
          target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        } else {
          target.setCustomValidity('');
        }
      }
    } else {
      target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }
  };
  var changePhotoEvents = function () {
    addNewEffectClassImg('none');
    effectLevelPin.addEventListener('mousedown', function (a) {
      var xShift = a.clientX - effectLevelPin.offsetLeft;
      maxEffectLevelPin = effectLevelLine.clientWidth;
      var onEffectPinMouseMove = function (e) {
        var current = e.clientX - xShift;
        if (current < 0) {
          current = 0;
        } else if (current > maxEffectLevelPin) {
          current = maxEffectLevelPin;
        }
        effectLevelPin.style.left = current + 'px';
        effectLevelDepth.style.width = current + 'px';
        var precentEffect = current / maxEffectLevelPin;
        var filterEffect = takeEffectFilter(typeEffect, precentEffect);
        imgUploadPreview.style.filter = filterEffect;
        effectLevelValue.value = Math.round(100 * precentEffect);
      };
      document.addEventListener('mousemove', onEffectPinMouseMove);
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onEffectPinMouseMove);
      });
    });
    for (var i = 0; i < effectPhoto.length; i++) {
      effectPhoto[i]['dom'].addEventListener('click', effectPhoto[i]['addClass']);
    }
    inputHashtags.addEventListener('input', onInputHashtagsInput);
    inputHashtags.addEventListener('focus', function () {
      document.removeEventListener('keydown', window.preview.onCloseUploadFileKeydown);
    });
    inputHashtags.addEventListener('blur', function () {
      document.addEventListener('keydown', window.preview.onCloseUploadFileKeydown);
    });
  };
  window.form = {
    removePhotoEvents: removePhotoEvents,
    changePhotoEvents: changePhotoEvents
  };
})();
