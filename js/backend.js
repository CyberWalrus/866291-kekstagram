'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var STATUS_LOAD = 200;
  var MESSEGE = {
    STATUS: 'Статус ответа: ',
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    MS: 'мс'
  };

  var loadEenets = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError(MESSEGE.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(MESSEGE.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(MESSEGE.TIMEOUT + xhr.timeout + MESSEGE.MS);
    });

    xhr.timeout = TIMEOUT;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    loadEenets(xhr, onLoad, onError);

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    loadEenets(xhr, onLoad, onError);

    xhr.open('POST', URL_POST);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: sendData
  };

})();
