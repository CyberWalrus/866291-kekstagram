'use strict';

(function () {
  var MAX_LEFT = 100;
  var currentFilter = 'none';

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelValue = imgUploadOverlay.querySelector('input[name=effect-level]');
  var inputScale = imgUploadOverlay.querySelector('input[name=scale]');
  var inputEffect = imgUploadOverlay.querySelector('#effect-none');
  var maxEffectLevelPin = effectLevelLine.clientWidth;

  var effectObj = {
    chrome: {
      min: 0,
      max: 1,
      type: '',
      efect: 'grayscale'
    },
    sepia: {
      min: 0,
      max: 1,
      type: '',
      efect: 'sepia'
    },
    marvin: {
      min: 0,
      max: 100,
      type: '%',
      efect: 'invert'
    },
    phobos: {
      min: 0,
      max: 3,
      type: 'px',
      efect: 'blur'
    },
    heat: {
      min: 1,
      max: 3,
      type: '',
      efect: 'brightness'
    }
  };

  var cangeEfectValue = function (min, max, num) {
    return min + (max - min) * (num / 100);
  };

  var updateValues = function () {
    effectLevelValue.value = '100';
    inputHashtag.clear();
    inputDescription.clear();
    inputScale.value = '100%';
    inputEffect.checked = true;
  };

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
      window.preview.preview.setFilter(effectObj[currentFilter].efect + '(' + filterValue + effectObj[currentFilter].type + ')');
    } else {
      window.preview.preview.setFilter('');
    }
  };

  var updateSliderVision = function (effect) {
    effectLevelValue.value = '100';
    window.preview.preview.removeClass('effects__preview--' + currentFilter);
    window.preview.preview.addClass('effects__preview--' + effect);
    currentFilter = effect;
    window.preview.preview.setFilter('');
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
      updateSliderVision(effect);
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

  var removeEvents = function () {
    uploadForm.removeEventListener('change', onUploadFormChange);
    effectLevelPin.removeEventListener('mousedown', onMouseDownPin);
    inputHashtag.removeEvent();
    inputDescription.removeEvent();
  };

  var addEvents = function () {
    updateValues();
    updateSliderVision('none');
    uploadForm.addEventListener('change', onUploadFormChange);
    effectLevelPin.addEventListener('mousedown', onMouseDownPin);
    inputHashtag.addEvent();
    inputDescription.addEvent();
  };
  var inputHashtag = new window.model.TextInput(imgUploadOverlay.querySelector('input[name=hashtags]'), window.preview.onCloseUploadFileKeydown, onInputHashtagsInput);

  var inputDescription = new window.model.TextInput(imgUploadOverlay.querySelector('textarea[name=description]'), window.preview.onCloseUploadFileKeydown);

  window.form = {
    removeEvents: removeEvents,
    addEvents: addEvents,
    updateValues: updateValues
  };
})();
