'use strict';

(function () {
  var MAX_LEFT = 100;
  var currentFilter = 'none';

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelValue = imgUploadOverlay.querySelector('input[name=effect-level]');
  var inputHashtags = imgUploadOverlay.querySelector('input[name=hashtags]');
  var maxEffectLevelPin = effectLevelLine.clientWidth;

  var effectObj = {
    chrome: {
      min: 0,
      max: 1,
      efect: 'grayscale'
    },
    sepia: {
      min: 0,
      max: 1,
      efect: 'sepia'
    },
    marvin: {
      min: 0,
      max: 100,
      efect: 'invert'
    },
    phobos: {
      min: 0,
      max: 3,
      efect: 'blur'
    },
    heat: {
      min: 1,
      max: 3,
      efect: 'brightness'
    }
  };

  function cangeEfectValue(min, max, num) {
    return min + (max - min) * (num / 100);
  }

  var onMouseDownPin = function (a) {
    var xShift = a.clientX - effectLevelPin.offsetLeft;
    maxEffectLevelPin = effectLevelLine.clientWidth;
    var onEffectPinMouseMove = function (e) {
      var current = e.clientX - xShift;
      if (current < 0) {
        current = 0;
      } else if (current > maxEffectLevelPin) {
        current = maxEffectLevelPin;
      }
      var precentEffect = Math.round(100 * current / maxEffectLevelPin);
      effectLevelValue.value = precentEffect;
      effectLevelPin.style.left = precentEffect + '%';
      effectLevelDepth.style.width = precentEffect + '%';
      updateStyleFilter();
    };
    document.addEventListener('mousemove', onEffectPinMouseMove);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', onEffectPinMouseMove);
    });
  };

  var updateStyleFilter = function () {
    if (currentFilter !== 'none') {
      var filterValue = cangeEfectValue(effectObj[currentFilter].min, effectObj[currentFilter].max, parseInt(effectLevelPin.style.left, 10));
      imgUploadPreview.style.filter = effectObj[currentFilter].efect + '(' + filterValue + ')';
    } else {
      imgUploadPreview.style.filter = '';
    }
  };

  var updateSliderVision = function () {
    imgUploadPreview.style.filter = '';
    if (currentFilter !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelPin.style.left = MAX_LEFT + '%';
      effectLevelDepth.style.width = MAX_LEFT + '%';
      effectLevelPin.addEventListener('mousedown', onMouseDownPin);
    } else {
      imgUploadEffectLevel.classList.add('hidden');
      effectLevelPin.removeEventListener('mousedown', onMouseDownPin);
    }
  };

  var onUploadFormChange = function (event) {
    event.preventDefault();
    var target = event.target;
    if (target.name === 'effect' && target.type === 'radio') {
      var effect = target.value;
      imgUploadPreview.classList.remove('effects__preview--' + currentFilter);
      imgUploadPreview.classList.add('effects__preview--' + effect);
      currentFilter = effect;
      updateSliderVision();
    }
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

  var onFocusHashtags = function () {
    document.removeEventListener('keydown', window.preview.onCloseUploadFileKeydown);
  };

  var onBlurHashtags = function () {
    document.addEventListener('keydown', window.preview.onCloseUploadFileKeydown);
  };

  var removeEvents = function () {
    uploadForm.removeEventListener('change', onUploadFormChange);
    effectLevelPin.removeEventListener('mousedown', onMouseDownPin);
    inputHashtags.removeEventListener('input', onInputHashtagsInput);
    inputHashtags.removeEventListener('focus', onFocusHashtags);
    inputHashtags.removeEventListener('blur', onBlurHashtags);
  };

  var addEvents = function () {
    currentFilter = 'none';
    updateSliderVision();
    uploadForm.addEventListener('change', onUploadFormChange);
    effectLevelPin.addEventListener('mousedown', onMouseDownPin);
    inputHashtags.addEventListener('input', onInputHashtagsInput);
    inputHashtags.addEventListener('focus', onFocusHashtags);
    inputHashtags.addEventListener('blur', onBlurHashtags);
  };

  window.form = {
    removeEvents: removeEvents,
    addEvents: addEvents
  };
})();
