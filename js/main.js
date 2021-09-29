const getRandomNumber = function (min, max) {
  return (min < 0 || min >= max) ? 'Диапазон задан некорректно' : Math.floor(min + Math.random() * (max + 1 - min));
};
const isAcceptableLength = function (line, maxSize) {
  return line.length < maxSize;
};

getRandomNumber(30, 110);
isAcceptableLength('Всем привет от Кекса!', 100);
