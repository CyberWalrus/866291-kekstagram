'use strict';

(function () {
  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');

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
  createPhotoDOM(window.data.photosArr);
})();
