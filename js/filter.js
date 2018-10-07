'use strict';

(function () {
  var NEW_PICTURE = 10;

  var imgFilters = document.querySelector('.img-filters');
  var buttonPopular = imgFilters.querySelector('#filter-popular');
  var buttonNew = imgFilters.querySelector('#filter-new');
  var buttonDiscussed = imgFilters.querySelector('#filter-discussed');

  var updateClassFilters = function (event) {
    event.preventDefault();
    buttonPopular.classList.remove('img-filters__button--active');
    buttonNew.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
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

  var onPopularClick = function (event) {
    updateClassFilters(event);
    updatePopular();
  };
  var onPopularKeydown = function (event) {
    window.data.isEnterEvent(event, onPopularClick);
  };

  var onNewClick = function (event) {
    updateClassFilters(event);
    updateNew();
  };
  var onNewKeydown = function (event) {
    window.data.isEnterEvent(event, onNewClick);
  };

  var onDiscussedClick = function (event) {
    updateClassFilters(event);
    updateDiscussed();
  };
  var onDiscussedKeydown = function (event) {
    window.data.isEnterEvent(event, onDiscussedClick);
  };

  var addEvents = function () {
    imgFilters.classList.remove('img-filters--inactive');
    buttonPopular.addEventListener('click', onPopularClick);
    buttonPopular.addEventListener('keydown', onPopularKeydown);
    buttonNew.addEventListener('click', onNewClick);
    buttonNew.addEventListener('keydown', onNewKeydown);
    buttonDiscussed.addEventListener('click', onDiscussedClick);
    buttonDiscussed.addEventListener('keydown', onDiscussedKeydown);
  };

  window.filter = {
    addEvents: addEvents
  };
})();
