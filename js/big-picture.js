'use strict';

(function () {
  var newCommentImgWidth = 35;
  var newCommentImgHeight = 35;

  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocial = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureImg = bigPicture.querySelector('img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentContainer = bigPicture.querySelector('.social__comments');

  var createCommentDOM = function (textContent) {
    var newComment = document.createElement('li');
    var newCommentImg = document.createElement('img');
    var newCommentP = document.createElement('p');
    newComment.classList.add('social__comment');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = 'img/avatar-' + window.data.generateRandomNumber(6, 1) + '.svg';
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
  var onCloseBigPictureKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseBigPictureClick);
  };
  var onCloseBigPictureClick = function () {
    bigPicture.classList.add('hidden');
    removeBigPictureEvent();
  };
  var removeBigPictureEvent = function () {
    document.removeEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.removeEventListener('click', onCloseBigPictureClick);
  };
  var onPictureClick = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.addEventListener('click', onCloseBigPictureClick);
  };
  var createPhotoDOM = function (photosArray) {
    var picturesElements = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var element = templatePicture.cloneNode(true);
      element.addEventListener('click');
      element.querySelector('img').src = photosArray[i]['url'];
      element.querySelector('.picture__likes').textContent = photosArray[i]['likes'];
      element.querySelector('.picture__comments').textContent = photosArray[i]['comments'].length;
      picturesElements.appendChild(element);
    }
    pictureDIV.appendChild(picturesElements);
  };
  createPhotoDOM(window.data.photosArr);
  window.bigPicture = {
    onPictureClick: onPictureClick,
    changeBigPicture: changeBigPicture
  };
})();
