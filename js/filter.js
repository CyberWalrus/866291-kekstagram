'use strict';

(function () {
  var NEW_PICTURE = 10;
  var imgFilters = document.querySelector('.img-filters');

  var updateClassFilters = function (evt) {
    evt.preventDefault();
    buttonPopular.element.classList.remove('img-filters__button--active');
    buttonNew.element.classList.remove('img-filters__button--active');
    buttonDiscussed.element.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  var updatePopular = window.data.debounce(function () {
    var photoArray = window.pictures.array.slice();
    window.pictures.clear();
    window.pictures.create(photoArray);
  });

  var updateNew = window.data.debounce(function () {
    var photoArray = window.pictures.array
      .slice()
      .sort(function () {
        return window.data.generateRandomNumber(1, -1);
      }).slice(0, NEW_PICTURE);
    window.pictures.clear();
    window.pictures.create(photoArray);
  });

  var updateDiscussed = window.data.debounce(function () {
    var photoArray = window.pictures.array
      .slice()
      .sort(function (left, right) {
        return right['comments'].length - left['comments'].length;
      });
    window.pictures.clear();
    window.pictures.create(photoArray);
  });

  var onPopularClick = function (evt) {
    updateClassFilters(evt);
    updatePopular();
  };

  var onNewClick = function (evt) {
    updateClassFilters(evt);
    updateNew();
  };

  var onDiscussedClick = function (evt) {
    updateClassFilters(evt);
    updateDiscussed();
  };

  var addEvents = function () {
    imgFilters.classList.remove('img-filters--inactive');
    buttonPopular.addEvent();
    buttonNew.addEvent();
    buttonDiscussed.addEvent();
  };

  var buttonPopular = new window.model.Button(imgFilters.querySelector('#filter-popular'), onPopularClick);
  var buttonNew = new window.model.Button(imgFilters.querySelector('#filter-new'), onNewClick);
  var buttonDiscussed = new window.model.Button(imgFilters.querySelector('#filter-discussed'), onDiscussedClick);

  window.filter = {
    addEvents: addEvents
  };
})();
