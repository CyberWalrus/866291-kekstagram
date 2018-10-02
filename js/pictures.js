'use strict';

(function () {

  var photosArray = [];

  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var imgFilters = document.querySelector('.img-filters');

  var clearPhotoDOM = function () {
    var nodeLength = pictureDIV.childNodes.length - 1;
    for (var index = nodeLength; index > 0; index--) {
      if (pictureDIV.childNodes[index] && pictureDIV.childNodes[index].classList && pictureDIV.childNodes[index].classList.contains('picture')) {
        pictureDIV.removeChild(pictureDIV.childNodes[index]);
      }
    }
  };

  var createPhotoDOM = function (photosArr) {
    var picturesElements = document.createDocumentFragment();

    photosArr.forEach(function (item) {
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

  var onError = function () {
  };

  var onLoad = function (photosArr) {
    window.pictures.array = photosArr.slice();
    imgFilters.classList.remove('img-filters--inactive');
    window.filter.addEvents();
    createPhotoDOM(photosArr);
  };

  window.backend.load(onLoad, onError);

  window.pictures = {
    array: photosArray,
    create: createPhotoDOM,
    clear: clearPhotoDOM
  };

})();
