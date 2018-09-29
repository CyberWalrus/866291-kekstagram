'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var STATUS_LOAD = 200;
  var MESSEGE_STATUS = 'Статус ответа: ';
  var MESSEGE_ERROR = 'Произошла ошибка соединения';
  var MESSEGE_TIMEOUT = 'Запрос не успел выполниться за ';
  var MESSEGE_MS = 'мс';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError(MESSEGE_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(MESSEGE_ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(MESSEGE_TIMEOUT + xhr.timeout + MESSEGE_MS);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError(MESSEGE_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(MESSEGE_ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(MESSEGE_TIMEOUT + xhr.timeout + MESSEGE_MS);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL_POST);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: sendData
  };

})();
