console.log("hello");
var defaultComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var defaultDescription = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var generateRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
var generateComments = function () {
  var comments = [];  
  var quantityComments = generateRandomNumber(20, 0);
  for (var i = 0; i < quantityComments; i++) {
    var comment = '';
    var quantityComment = generateRandomNumber(2, 1);
    for (var e = 0; e < quantityComment; e++) {
      var numberCumments = generateRandomNumber(defaultComments.length - 1, 0);
      if(e > 0){
        comment += ' ';
      }
      comment += defaultComments[numberCumments];
    }
    comments.push(comment);
  }
  return comments;
}
var generateDescription = function () {
  var numberDescription = generateRandomNumber(defaultDescription.length - 1, 0);
  var description = defaultDescription[numberDescription];
  return description;
}
var generatePhotosArray = function () {
  var photosArray = [];
  for (var i = 1; i <= 25; i++) {
    var photos = {};
    photos['url'] = "photos/" + i + ".jpg";
    photos['likes'] = generateRandomNumber(200, 15);
    photos['comments'] = generateComments();
    photos['description'] = generateDescription();
    photosArray.push(photos);
  }
  console.log(photosArray);
}
generatePhotosArray();