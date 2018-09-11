'use strict';
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

var generateRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
var generateComments = function () {
  var comments = [];
  var quantityComments = generateRandomNumber(20, 0);
  for (var i = 0; i < quantityComments; i++) {
    var comment = '';
    var quantityComment = generateRandomNumber(2, 1);
    for (var e = 0; e < quantityComment; e++) {
      var numberCumments = generateRandomNumber(defaultComments.length - 1, 0);
      if (e > 0) {
        comment += ' ';
      }
      comment += defaultComments[numberCumments];
    }
    comments.push(comment);
  }
  return comments;
}
var generateDescription = function () {
  var numberDescription = generateRandomNumber(defaultDescription.length - 1, 0);
  var description = defaultDescription[numberDescription];
  return description;
}
var generatePhotosArray = function () {
  var photosArray = [];
  for (var i = 1; i <= 25; i++) {
    var photos = {};
    photos['url'] = "photos/" + i + ".jpg";
    photos['likes'] = generateRandomNumber(200, 15);
    photos['comments'] = generateComments();
    photos['description'] = generateDescription();
    photosArray.push(photos);
  }
  return photosArray;
}

var createPhotoDOM = function (photosArray) {
  var pictureDIV = document.querySelector('.pictures');

  var picturesElements = document.createDocumentFragment();

  var templatePicture = document.querySelector('#picture').content.querySelector('a');

  for (var i = 0; i < photosArray.length; i++) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('img').src = photosArray[i]['url'];
    element.querySelector('.picture__likes').textContent = photosArray[i]['likes'];
    element.querySelector('.picture__comments').textContent = photosArray[i]['comments'].length;
    picturesElements.appendChild(element);
  }
  pictureDIV.appendChild(picturesElements);
}
var createCommentDOM = function (textContent) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.innerHTML = '<img class="social__picture" src="img/avatar-' + generateRandomNumber(6, 1) + '.svg" ' +
    'alt="Аватар комментатора фотографии" width="35" height="35">' +
    '<p class="social__text">' + textContent + '</p>';
  return newComment;
}
var changeBigPicture = function (photosArray) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  bigPicture.querySelector('img').src = photosArray[0]['url'];
  bigPicture.querySelector('.likes-count').textContent = photosArray[0]['likes'];
  bigPicture.querySelector('.comments-count').textContent = photosArray[0]['comments'].length;
  bigPicture.querySelector('.social__caption').textContent = photosArray[0]['description'];
  var quantityComments = photosArray[0]['comments'].length;
  var commentContainer = bigPicture.querySelector('.social__comments');
  for (var i = 0; i < quantityComments; i++) {
    var textContent = photosArray[0]['comments'][i];
    var newComment = createCommentDOM(textContent);
    commentContainer.appendChild(newComment);
  }
}
var photosArray = generatePhotosArray();
createPhotoDOM(photosArray);
changeBigPicture(photosArray);