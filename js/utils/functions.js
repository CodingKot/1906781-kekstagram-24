const isEscapeKey = (evt) =>  evt.key === 'Escape';

const getNumberWithoutPercent = function (obj) {
  return +(obj.value.substring(0, obj.value.length - 1));
};

const minimizeValue = function (obj1, obj2) {
  let changingValue = getNumberWithoutPercent(obj1);
  if(changingValue > 25) {
    obj1.value = `${changingValue-=25}%`;
  } else {
    obj1.value = '25%';
  }
  obj2.style.transform = `scale(${changingValue/100})`;
};

const maximizeValue = function (obj1, obj2) {
  let changingValue = getNumberWithoutPercent(obj1);
  if(changingValue < 100) {
    obj1.value = `${changingValue+=25}%`;

  } else {
    obj1.value = '100%';
  }
  obj2.style.transform = `scale(${changingValue/100})`;
};

const showLoadAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export {isEscapeKey, minimizeValue, maximizeValue, showLoadAlert};
