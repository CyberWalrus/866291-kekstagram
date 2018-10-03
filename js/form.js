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
  var maxEffectLevelPin = effectLevelLine.clientWidth;

  var cangeEfectValue = function (min, max, num) {
    return min + (max - min) * (num / 100);
  };

  var updateValues = function () {
    effectLevelValue.value = EFFEC_VALUE;
    inputHashtag.clear();
    inputDescription.clear();
    window.preview.preview.clear();
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
      window.preview.preview.setFilter(EFFECT_OBJ[currentFilter].efect + '(' + filterValue + EFFECT_OBJ[currentFilter].type + ')');
    } else {
      window.preview.preview.setFilter('');
    }
  };

  var updateSliderVision = function (effect) {
    effectLevelValue.value = EFFEC_VALUE;
    window.preview.preview.removeClass('effects__preview--' + currentFilter);
    window.preview.preview.addClass('effects__preview--' + effect);
    currentFilter = effect;
    window.preview.preview.setFilter('');
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

  var onInputHashtags = function (evt) {
    var target = evt.target;
    checkHashtag(target);
  };

  var checkHashtag = function (target) {
    var hashtags = target.value.toLowerCase();
    if (hashtags.length !== 0) {
      var hashtagsArr = hashtags.split(' ');
      if (hashtagsArr.length <= HASHTAG_MAX) {
        target.setCustomValidity(MESSEGE.DEFAULT);
        hashtagsArr.forEach(function (item, index) {
          if (item[0] !== HASHTAG_BEGIN) {
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
        });
      } else {
        target.setCustomValidity();
      }
    } else {
      target.setCustomValidity(MESSEGE.DEFAULT);
    }
    if (target.validationMessage !== MESSEGE.DEFAULT) {
      target.reportValidity(MESSEGE.MAX);
      return false;
    }
    return true;
  };

  var onInputDescription = function (evt) {
    var target = evt.target;
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
    if (checkHashtag(inputHashtag.element) && checkDescription(inputDescription.element)) {
      return true;
    }
    return false;
  };

  var removeEvents = function () {
    uploadForm.removeEventListener('change', onUploadFormChange);
    effectLevelPin.removeEventListener('mousedown', onMouseDownPin);
    inputHashtag.removeEvent();
    inputDescription.removeEvent();
  };

  var addEvents = function () {
    updateSliderVision('none');
    uploadForm.addEventListener('change', onUploadFormChange);
    effectLevelPin.addEventListener('mousedown', onMouseDownPin);
    inputHashtag.addEvent();
    inputDescription.addEvent();
  };

  var inputHashtag = new window.model.TextInput(imgUploadOverlay.querySelector('input[name=hashtags]'), window.preview.onCloseUploadFileKeydown, onInputHashtags);
  var inputDescription = new window.model.TextInput(imgUploadOverlay.querySelector('textarea[name=description]'), window.preview.onCloseUploadFileKeydown, onInputDescription);
  updateValues();

  window.form = {
    removeEvents: removeEvents,
    addEvents: addEvents,
    updateValues: updateValues,
    checkValue: checkValue
  };
})();
