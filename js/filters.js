'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var buttonPopular = imgFilters.querySelector('#filter-popular');
  var buttonNew = imgFilters.querySelector('#filter-new');
  var buttonDiscussed = imgFilters.querySelector('#filter-discussed');

  var onPopularClick = function () {

  };
  var onNewClick = function () {
    var photoArray = window.pictures.array.map(function (it) {
      return it;
    });
    window.pictures.create(photoArray);
  };
  var onDiscussedClick = function () {

  };
  buttonPopular.addEventListener('click', onPopularClick);
  buttonNew.addEventListener('click', onNewClick);
  buttonDiscussed.addEventListener('click', onDiscussedClick);
})();
