'use strict';

(function () {
  var newCommentImgWidth = 35;
  var newCommentImgHeight = 35;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocial = bigPicture.querySelector('.social__comment-count');
  var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
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
    bigPictureImg.src = photo['url'];
    bigPictureLikesCount.textContent = photo['likes'];
    bigPictureCommentsCount.textContent = photo['comments'].length;
    bigPictureSocialCaption.textContent = photo['description'];

    var newCommentArr = [];
    var newCommentArrArr = [];
    var index = 0;
    var indexArr = 5;
    var minIndex = 0;
    var indexArrArr = 1;

    while (commentContainer.firstChild) {
      commentContainer.removeChild(commentContainer.firstChild);
    }

    photo['comments'].forEach(function (item) {
      var newComment = createCommentDOM(item);
      newCommentArr.push(newComment);
      if (photo['comments'].length < indexArr) {
        indexArr = photo['comments'].length;
      }
      if (index === indexArr - 1) {
        newCommentArrArr.push(newCommentArr.slice(minIndex, indexArr));
        minIndex = indexArr;
        indexArr += 5;
      }
      index++;
    });

    newCommentArrArr[0].forEach(function (item) {
      commentContainer.appendChild(item);
    });

    var commentsCountNow = newCommentArrArr[0].length;
    bigPictureSocial.textContent = commentsCountNow + ' из ' + newCommentArr.length + ' комментариев';

    window.bigPicture.onCommentsLoaderClick = function (evt) {
      evt.preventDefault();
      if (indexArrArr < newCommentArrArr.length) {
        commentsCountNow += newCommentArrArr[indexArrArr].length;
        bigPictureSocial.textContent = commentsCountNow + ' из ' + newCommentArr.length + ' комментариев';
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

  var onCloseBigPictureKeydown = function (evt) {
    window.data.isEscEvent(evt, onCloseBigPictureClick);
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
