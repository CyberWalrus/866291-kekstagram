'use strict';

(function () {
  var newCommentImgWidth = 35;
  var newCommentImgHeight = 35;

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

  var openBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bigPictureSocial.classList.add('visually-hidden');
    bigPictureCommentsLoader.classList.add('visually-hidden');
    bigPictureImg.src = photo['url'];
    bigPictureLikesCount.textContent = photo['likes'];
    bigPictureCommentsCount.textContent = photo['comments'].length;
    bigPictureSocialCaption.textContent = photo['description'];
    photo['comments'].forEach(function (item) {
      var newComment = createCommentDOM(item);
      commentContainer.appendChild(newComment);
    });
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.addEventListener('click', onCloseBigPictureClick);
  };

  var onCloseBigPictureKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseBigPictureClick);
  };

  var onCloseBigPictureClick = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.removeEventListener('click', onCloseBigPictureClick);
  };

  window.bigPicture = {
    show: openBigPicture
  };
})();
