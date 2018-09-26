'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var buttonPopular = imgFilters.querySelector('#filter-popular');
  var buttonNew = imgFilters.querySelector('#filter-new');
  var buttonDiscussed = imgFilters.querySelector('#filter-discussed');

  var updateClassFilters = function (buttonTarget) {
    buttonPopular.classList.remove('img-filters__button--active');
    buttonNew.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    buttonTarget.classList.add('img-filters__button--active');
  };

  var onPopularClick = function (evt) {
    var target = evt.target;
    updateClassFilters(target);

  };
  var onNewClick = function (evt) {
    var target = evt.target;
    updateClassFilters(target);
    var photoArray = window.pictures.array.map(function (it) {
      return it;
    });
    window.pictures.create(photoArray);
  };
  var onDiscussedClick = function (evt) {
    var target = evt.target;
    updateClassFilters(target);

  };
  buttonPopular.addEventListener('click', onPopularClick);
  buttonNew.addEventListener('click', onNewClick);
  buttonDiscussed.addEventListener('click', onDiscussedClick);
})();
