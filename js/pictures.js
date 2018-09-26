'use strict';

(function () {

  var photosArray = [];

  var pictureDIV = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var imgFilters = document.querySelector('.img-filters');

  var createPhotoDOM = function (photosArr) {
    var nodeLength = pictureDIV.childNodes.length;
    for (var index = nodeLength; index > 0; index--) {
      if (pictureDIV.childNodes[index] && pictureDIV.childNodes[index].classList && pictureDIV.childNodes[index].classList.contains('picture')) {
        pictureDIV.removeChild(pictureDIV.childNodes[index]);
      }
    }
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
    window.pictures.array = photosArr.map(function (it) {
      return it;
    });
    imgFilters.classList.remove('img-filters--inactive');
    createPhotoDOM(photosArr);
  };

  window.backend.load(onLoad, onError);

  window.pictures = {
    array: photosArray,
    create: createPhotoDOM
  };

})();
