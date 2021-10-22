const getNumbersForCommentsId = () => {
  const numbersForCommentsId = [];
  for (let counter = 1; counter <= 1000; counter++) {
    numbersForCommentsId.push(counter);
  }

  return numbersForCommentsId;
};

const getAnyRandomNumber = function(min, max) {
  return (min < 0 || min >= max) ? 'Диапазон задан некорректно' : Math.floor(min + Math.random() * (max + 1 - min));
};

const getUniqueRandomNumber = function(data) {
  return data.splice(getAnyRandomNumber(0, data.length - 1), 1)[0];
};

export {getNumbersForCommentsId, getAnyRandomNumber, getUniqueRandomNumber};
