'use strict';

(function () {

  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var body = document.querySelector('body');
  var templateError = document.querySelector('#error').content.querySelector('section');

  var createPhotoDOM = function (photosArray) {
    var picturesElements = document.createDocumentFragment();

    photosArray.forEach(function (item) {
      var element = templatePicture.cloneNode(true);
      element.querySelector('img').src = item.url;
      element.querySelector('.picture__likes').textContent = item.likes;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      picturesElements.appendChild(element);
      element.addEventListener('click', function (event) {
        event.preventDefault();
        window.bigPicture.show(item);
      });
    });
    pictureDIV.appendChild(picturesElements);
  };

  var onError = function (message) {
    var errorElements = document.createDocumentFragment();
    var errorElement = templateError.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = message;
    errorElements.appendChild(errorElement);
    body.appendChild(errorElements);
  };
  window.load(createPhotoDOM, onError);

})();
