'use strict';

(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  var Button = function (element, eventFun) {
    this.element = element;
    this.eventFun = eventFun;
  };

  Button.prototype = {
    onEnterElement: function (evt) {
      window.data.isEnterEvent(evt, this.eventFun);
    },
    addEvent: function () {
      this.element.addEventListener('click', this.eventFun);
      this.element.addEventListener('keydown', this.onEnterElement);
    },
    removeEvent: function () {
      this.element.removeEventListener('click', this.eventFun);
      this.element.removeEventListener('keydown', this.onEnterElement);
    }
  };

  var ImgPreview = function (element, elementScale, step, max, min) {
    this.element = element;
    this.elementScale = elementScale;
    this.value = parseInt(elementScale.value, 10);
    this.step = step;
    this.max = max;
    this.min = min;
  };

  ImgPreview.prototype = {
    changeScale: function (check) {
      if (check) {
        this.value += this.step;
      } else {
        this.value -= this.step;
      }
      if (this.value >= this.max) {
        this.value = this.max;
      } else if (this.value <= this.min) {
        this.value = this.min;
      }
      this.elementScale.value = this.value + '%';
      this.element.style.transform = 'scale(' + this.value / 100 + ')';
    },
    incrScale: function () {
      this.changeScale(true);
    },
    discScale: function () {
      this.changeScale(false);
    }
  };

  var preview = new ImgPreview(imgUploadOverlay.querySelector('img'), imgUploadOverlay.querySelector('.scale__control--value'), 25, 100, 25);
  var onBiggerClick = function () {
    preview.incrScale();
  };
  var onSmallerClick = function () {
    preview.discScale();
  };
  var buttonBigger = new Button(document.querySelector('.scale__control--bigger'), onBiggerClick);
  buttonBigger.addEvent();
  var buttonSmaller = new Button(document.querySelector('.scale__control--smaller'), onSmallerClick);
  buttonSmaller.addEvent();
  window.model = {
    Button: Button,
    ImgPreview: ImgPreview,
    preview: preview,
    buttonBigger: buttonBigger,
    buttonSmaller: buttonSmaller
  };


})();
