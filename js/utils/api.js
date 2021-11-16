import {showLoadAlert} from './functions.js';
import {showErrorAlert} from './messages-for-form.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((pictures) => {
            onSuccess(pictures);
          });
      } else {
        throw new Error('К сожалению, не удалось загрузить изображения. Сервер временно недоступен.');
      }
    })
    .catch(() => {
      showLoadAlert('К сожалению, не удалось загрузить изображения. Сервер временно недоступен.');
    });
};

const sendData = (onSuccess, onFail, formData) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagra',
    {
      method:'POST',
      body: formData,
    },
  ).then((responce) => {
    if (responce.ok) {
      onSuccess();
    } else {
      onFail(showErrorAlert);
    }
  })
    .catch(() => {
      onFail(showErrorAlert);
    });
};

export {getData, sendData};
