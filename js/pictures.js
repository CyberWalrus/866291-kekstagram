'use strict';
var ESC_KEYCODE = 27;
var newCommentImgWidth = 35;
var newCommentImgHeight = 35;
var typeEffect = 'none';
var defaultComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var defaultDescription = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var bigPicture = document.querySelector('.big-picture');
var bigPictureSocial = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
var bigPictureImg = bigPicture.querySelector('img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var commentContainer = bigPicture.querySelector('.social__comments');
var pictureDIV = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('a');
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var effectLevelValue = imgUploadOverlay.querySelector('input[name=effect-level]');
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

var generateRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
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
var generateComments = function () {
  var comments = [];
  var quantityComments = generateRandomNumber(20, 0);
  for (var i = 0; i < quantityComments; i++) {
    var comment = '';
    var quantityComment = generateRandomNumber(2, 1);
    var numberCummentsOne = generateRandomNumber(defaultComments.length - 1, 0);
    comment += defaultComments[numberCummentsOne];
    if (quantityComment === 2) {
      var numberCummentsTwo = generateRandomNumber(defaultComments.length - 1, 0);
      comment += ' ' + defaultComments[numberCummentsTwo];
    }
    comments.push(comment);
  }
  return comments;
};
var generateDescription = function () {
  var numberDescription = generateRandomNumber(defaultDescription.length - 1, 0);
  var description = defaultDescription[numberDescription];
  return description;
};
var generatePhotosArray = function () {
  var photosArray = [];
  for (var i = 1; i <= 25; i++) {
    var photos = {};
    photos['url'] = 'photos/' + i + '.jpg';
    photos['likes'] = generateRandomNumber(200, 15);
    photos['comments'] = generateComments();
    photos['description'] = generateDescription();
    photosArray.push(photos);
  }
  return photosArray;
};
var onCloseBigPictureKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
    removeBigPictureEvent();
  }
};
var onCloseBigPictureClick = function () {
  bigPicture.classList.add('hidden');
  removeBigPictureEvent();
};
var removeBigPictureEvent = function () {
  document.removeEventListener('keydown', onCloseBigPictureKeydown);
  bigPictureCancel.removeEventListener('click', onCloseBigPictureClick);
};
var createPhotoDOM = function (photosArray) {
  var picturesElements = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    var element = templatePicture.cloneNode(true);
    element.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onCloseBigPictureKeydown);
      bigPictureCancel.addEventListener('click', onCloseBigPictureClick);
    });
    element.querySelector('img').src = photosArray[i]['url'];
    element.querySelector('.picture__likes').textContent = photosArray[i]['likes'];
    element.querySelector('.picture__comments').textContent = photosArray[i]['comments'].length;
    picturesElements.appendChild(element);
  }
  pictureDIV.appendChild(picturesElements);
};
var createCommentDOM = function (textContent) {
  var newComment = document.createElement('li');
  var newCommentImg = document.createElement('img');
  var newCommentP = document.createElement('p');
  newComment.classList.add('social__comment');
  newCommentImg.classList.add('social__picture');
  newCommentImg.src = 'img/avatar-' + generateRandomNumber(6, 1) + '.svg';
  newCommentImg.alt = 'Аватар комментатора фотографии';
  newCommentImg.width = newCommentImgWidth;
  newCommentImg.height = newCommentImgHeight;
  newCommentP.classList.add('social__text');
  newCommentP.textContent = textContent;
  newComment.appendChild(newCommentImg);
  newComment.appendChild(newCommentP);
  return newComment;
};

var changeBigPicture = function (photosArray) {
  var quantityComments = photosArray[0]['comments'].length;
  bigPicture.classList.remove('hidden');
  bigPictureSocial.classList.add('visually-hidden');
  bigPictureCommentsLoader.classList.add('visually-hidden');
  bigPictureImg.src = photosArray[0]['url'];
  bigPictureLikesCount.textContent = photosArray[0]['likes'];
  bigPictureCommentsCount.textContent = photosArray[0]['comments'].length;
  bigPictureSocialCaption.textContent = photosArray[0]['description'];
  for (var i = 0; i < quantityComments; i++) {
    var textContent = photosArray[0]['comments'][i];
    var newComment = createCommentDOM(textContent);
    commentContainer.appendChild(newComment);
  }
};
var onCloseUploadFileKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
    removeUploadFileEvent();
  }
};
var onCloseUploadFileClick = function () {
  imgUploadOverlay.classList.add('hidden');
  removeUploadFileEvent();
};
var removeUploadFileEvent = function () {
  document.removeEventListener('keydown', onCloseUploadFileKeydown);
  imgUploadCancel.removeEventListener('click', onCloseUploadFileClick);
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
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
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
  document.addEventListener('keydown', onCloseUploadFileKeydown);
  imgUploadCancel.addEventListener('click', onCloseUploadFileClick);

});
var photosArray = generatePhotosArray();
createPhotoDOM(photosArray);

