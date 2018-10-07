'use strict';

(function () {
  var IMG_WIDTH = 35;
  var IMG_HEIGHT = 35;
  var COMMENT_NUMBER = 5;
  var MESSEGE = {
    SRC: 'img/avatar-',
    SVG: '.svg',
    ALT: 'Аватар комментатора фотографии',
    MS: 'мс',
    OF: ' из ',
    COMMENT: ' комментариев'
  };

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocial = bigPicture.querySelector('.social__comment-count');
  var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureImg = bigPicture.querySelector('img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentContainer = bigPicture.querySelector('.social__comments');

  var addTextContetn = function (commentsCountNow, newCommentArr) {
    return commentsCountNow + MESSEGE.OF + newCommentArr.length + MESSEGE.COMMENT;
  };

  var createCommentDOM = function (textContent) {
    var newComment = document.createElement('li');
    var newCommentImg = document.createElement('img');
    var newCommentP = document.createElement('p');
    newComment.classList.add('social__comment');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = MESSEGE.SRC + window.data.generateRandomNumber(6, 1) + MESSEGE.SVG;
    newCommentImg.alt = MESSEGE.ALT;
    newCommentImg.width = IMG_WIDTH;
    newCommentImg.height = IMG_HEIGHT;
    newCommentP.classList.add('social__text');
    newCommentP.textContent = textContent;
    newComment.appendChild(newCommentImg);
    newComment.appendChild(newCommentP);
    return newComment;
  };

  var openBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = photo['url'];
    bigPictureLikesCount.textContent = photo['likes'];
    bigPictureCommentsCount.textContent = photo['comments'].length;
    bigPictureSocialCaption.textContent = photo['description'];

    var newCommentArr = [];
    var newCommentArrArr = [];
    var index = 0;
    var indexArr = COMMENT_NUMBER;
    var minIndex = 0;
    var indexArrArr = 1;

    while (commentContainer.firstChild) {
      commentContainer.removeChild(commentContainer.firstChild);
    }

    photo['comments'].forEach(function (item) {
      var newComment = createCommentDOM(item);
      newCommentArr.push(newComment);
      indexArr = photo['comments'].length < indexArr ? photo['comments'].length : indexArr;
      if (index === indexArr - 1) {
        newCommentArrArr.push(newCommentArr.slice(minIndex, indexArr));
        minIndex = indexArr;
        indexArr += COMMENT_NUMBER;
      }
      index++;
    });

    newCommentArrArr[0].forEach(function (item) {
      commentContainer.appendChild(item);
    });

    var commentsCountNow = newCommentArrArr[0].length;
    bigPictureSocial.textContent = addTextContetn(commentsCountNow, newCommentArr);

    window.bigPicture.onCommentsLoaderClick = function (event) {
      event.preventDefault();
      if (indexArrArr < newCommentArrArr.length) {
        commentsCountNow += newCommentArrArr[indexArrArr].length;
        bigPictureSocial.textContent = addTextContetn(commentsCountNow, newCommentArr);
        newCommentArrArr[indexArrArr].forEach(function (item) {
          commentContainer.appendChild(item);
        });
        indexArrArr++;
      }
      if (indexArrArr >= newCommentArrArr.length) {
        buttonCommentsLoader.classList.add('visually-hidden');
        buttonCommentsLoader.removeEventListener('click', window.bigPicture.onCommentsLoaderClick);
      }
    };

    if (indexArrArr < newCommentArrArr.length) {
      buttonCommentsLoader.classList.remove('visually-hidden');
      buttonCommentsLoader.addEventListener('click', window.bigPicture.onCommentsLoaderClick);
    } else {
      buttonCommentsLoader.classList.add('visually-hidden');
      buttonCommentsLoader.removeEventListener('click', window.bigPicture.onCommentsLoaderClick);
    }

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.addEventListener('click', onCloseBigPictureClick);
  };

  var onCloseBigPictureKeydown = function (event) {
    window.data.isEscEvent(event, onCloseBigPictureClick);
  };

  var onCloseBigPictureClick = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPictureKeydown);
    bigPictureCancel.removeEventListener('click', onCloseBigPictureClick);
    buttonCommentsLoader.removeEventListener('click', window.bigPicture.onCommentsLoaderClick);
  };

  window.bigPicture = {
    show: openBigPicture,
    onCommentsLoaderClick: ''
  };
})();
