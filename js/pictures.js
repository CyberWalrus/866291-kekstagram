'use strict';

(function () {
  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');

  var createPhotoDOM = function (photosArray) {
    var picturesElements = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var element = templatePicture.cloneNode(true);
      element.addEventListener('click', window.bigPicture.onPictureClick);
      element.querySelector('img').src = photosArray[i]['url'];
      element.querySelector('.picture__likes').textContent = photosArray[i]['likes'];
      element.querySelector('.picture__comments').textContent = photosArray[i]['comments'].length;
      picturesElements.appendChild(element);
    }
    pictureDIV.appendChild(picturesElements);
  };
  createPhotoDOM(window.data.photosArr);
})();
