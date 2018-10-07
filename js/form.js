'use strict';

(function () {
  var MAX_LEFT = 100;
  var EFFEC_VALUE = '100';
  var DEFAULT_FILTER = 'none';
  var HASHTAG_MAX = 5;
  var HASHTAG_LENGTH = 20;
  var HASHTAG_MIN = 1;
  var HASHTAG_BEGIN = '#';

  var MESSEGE = {
    PERCENT: '%',
    BEGIN: 'Хэш-тег начинается с символа # (решётка)',
    MIN: 'Хеш-тег не может состоять только из одной решётки',
    LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    TWICE: 'Один и тот же хэш-тег не может быть использован дважды',
    MAX: 'Нельзя указать больше пяти хэш-тегов',
    MAXTEXT: 'Максимальная длина коментария 140 символов',
    DEFAULT: ' '
  };

  var EFFECT_OBJ = {
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

  var currentFilter = DEFAULT_FILTER;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelValue = imgUploadOverlay.querySelector('input[name=effect-level]');
  var inputEffect = imgUploadOverlay.querySelector('#effect-none');
  var inputHashtag = imgUploadOverlay.querySelector('input[name=hashtags]');
  var inputDescription = imgUploadOverlay.querySelector('textarea[name=description]');
  var maxEffectLevelPin = effectLevelLine.clientWidth;

  var cangeEfectValue = function (min, max, num) {
    return min + (max - min) * (num / 100);
  };

  var updateValues = function () {
    effectLevelValue.value = EFFEC_VALUE;
    inputHashtag.value = '';
    inputDescription.value = '';
    window.preview.clear();
    inputEffect.checked = true;
    window.preview.uploadFile.value = '';
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
      effectLevelPin.style.left = precentEffect + MESSEGE.PERCENT;
      effectLevelDepth.style.width = precentEffect + MESSEGE.PERCENT;
      updateStyleFilter();
    };
    document.addEventListener('mousemove', onEffectPinMouseMove);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', onEffectPinMouseMove);
    });
  };

  var updateStyleFilter = function () {
    if (currentFilter !== DEFAULT_FILTER) {
      var filterValue = cangeEfectValue(EFFECT_OBJ[currentFilter].min, EFFECT_OBJ[currentFilter].max, parseInt(effectLevelPin.style.left, 10));
      window.preview.preview.style.filter = EFFECT_OBJ[currentFilter].efect + '(' + filterValue + EFFECT_OBJ[currentFilter].type + ')';
    } else {
      window.preview.preview.style.filter = '';
    }
  };

  var updateSliderVision = function (effect) {
    effectLevelValue.value = EFFEC_VALUE;
    window.preview.preview.classList.remove('effects__preview--' + currentFilter);
    window.preview.preview.classList.add('effects__preview--' + effect);
    currentFilter = effect;
    window.preview.preview.style.filter = '';
    if (currentFilter !== DEFAULT_FILTER) {
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelPin.style.left = MAX_LEFT + MESSEGE.PERCENT;
      effectLevelDepth.style.width = MAX_LEFT + MESSEGE.PERCENT;
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

  var onInputHashtags = function (event) {
    var target = event.target;
    checkHashtag(target);
  };

  var checkHashtag = function (target) {
    var hashtags = target.value.toLowerCase();
    if (hashtags.length !== 0) {
      var hashtagsArr = hashtags.replace(/ {1,}/g, ' ').split(' ');
      if (hashtagsArr.length <= HASHTAG_MAX) {
        target.setCustomValidity(MESSEGE.DEFAULT);
        hashtagsArr.some(function (item, index) {
          if (item.length === 0) {
            target.setCustomValidity(MESSEGE.DEFAULT);
          } else if (item[0] !== HASHTAG_BEGIN) {
            target.setCustomValidity(MESSEGE.BEGIN);
          } else if (item.length <= HASHTAG_MIN) {
            target.setCustomValidity(MESSEGE.MIN);
          } else if (item.length > HASHTAG_LENGTH) {
            target.setCustomValidity(MESSEGE.LENGTH);
          } else if (hashtagsArr.some(function (itemAlt, indexAlt) {
            return item === itemAlt && index !== indexAlt;
          })) {
            target.setCustomValidity(MESSEGE.TWICE);
          } else {
            target.setCustomValidity(MESSEGE.DEFAULT);
          }
          return (target.validationMessage !== MESSEGE.DEFAULT);
        });
      } else {
        target.setCustomValidity(MESSEGE.MAX);
      }
    } else {
      target.setCustomValidity(MESSEGE.DEFAULT);
    }
    if (target.validationMessage !== MESSEGE.DEFAULT) {
      target.reportValidity();
      return false;
    }
    return true;
  };

  var onInputDescription = function (event) {
    var target = event.target;
    checkDescription(target);
  };

  var checkDescription = function (target) {
    var comment = target.value.toLowerCase();
    if (comment.length > 140) {
      target.setCustomValidity(MESSEGE.MAXTEXT);
      target.reportValidity();
      return false;
    }
    target.setCustomValidity(MESSEGE.DEFAULT);
    return true;
  };

  var checkValue = function () {
    return checkHashtag(inputHashtag) && checkDescription(inputDescription) ? true : false;
  };

  var onFocus = function () {
    document.removeEventListener('keydown', window.preview.onCloseUploadFileKeydown);
  };
  var onBlur = function () {
    document.addEventListener('keydown', window.preview.onCloseUploadFileKeydown);
  };

  var removeEvents = function () {
    uploadForm.removeEventListener('change', onUploadFormChange);
    effectLevelPin.removeEventListener('mousedown', onMouseDownPin);
    inputHashtag.removeEventListener('input', onInputHashtags);
    inputHashtag.removeEventListener('focus', onFocus);
    inputHashtag.removeEventListener('blur', onBlur);
    inputDescription.removeEventListener('input', onInputDescription);
    inputDescription.removeEventListener('focus', onFocus);
    inputDescription.removeEventListener('blur', onBlur);
  };

  var addEvents = function () {
    updateSliderVision('none');
    uploadForm.addEventListener('change', onUploadFormChange);
    effectLevelPin.addEventListener('mousedown', onMouseDownPin);
    inputHashtag.addEventListener('input', onInputHashtags);
    inputHashtag.addEventListener('focus', onFocus);
    inputHashtag.addEventListener('blur', onBlur);
    inputDescription.addEventListener('input', onInputDescription);
    inputDescription.addEventListener('focus', onFocus);
    inputDescription.addEventListener('blur', onBlur);
  };

  updateValues();

  window.form = {
    removeEvents: removeEvents,
    addEvents: addEvents,
    updateValues: updateValues,
    checkValue: checkValue
  };
})();
