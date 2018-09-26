'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var buttonPopular = imgFilters.querySelector('#filter-popular');
  var buttonNew = imgFilters.querySelector('#filter-new');
  var buttonDiscussed = imgFilters.querySelector('#filter-discussed');

  var updateClassFilters = function (evt) {
    buttonPopular.classList.remove('img-filters__button--active');
    buttonNew.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
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
      }).slice(0, 10);
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
    buttonPopular.addEventListener('click', onPopularClick);
    buttonNew.addEventListener('click', onNewClick);
    buttonDiscussed.addEventListener('click', onDiscussedClick);
  };

  window.filter = {
    addEvents: addEvents
  };
})();
