const getNumbersForId = (lastItem) => {
  const numbersForId = [];
  for (let counter = 1; counter <= lastItem; counter++) {
    numbersForId.push(counter);
  }
  return numbersForId;
};

const getRandomNumber = function(min, max) {
  return (min < 0 || min >= max) ? 'Диапазон задан некорректно' : Math.floor(min + Math.random() * (max + 1 - min));
};

const getUniqueRandomNumber = function(arr) {
  return arr.splice(getRandomNumber(0, arr.length - 1), 1)[0];
};

const isEscapeKey = (evt) => evt.key === 'Escape';


export {getNumbersForId, getRandomNumber, getUniqueRandomNumber, isEscapeKey};
