import {isEscapeKey} from './functions.js';

const bodyElement = document.querySelector('body');


const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onMessageButtonClick();
  }
};

function onMessageButtonClick () {
  if (bodyElement.contains(document.querySelector('.success'))) {
    bodyElement.removeChild(document.querySelector('.success'));
  } else {
    bodyElement.removeChild(document.querySelector('.error'));
  }
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  document.removeEventListener('click', onCloseByDocumentClick);
}

function onCloseByDocumentClick (evt) {
  if (evt.target.className === 'success' || evt.target.className === 'error') {
    onMessageButtonClick();
  }
}

const addEventsForAlerts = (name) => {
  name.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onPopUpEscKeyDown);
  document.addEventListener('click', onCloseByDocumentClick);
};

const showSuccessAlert = () => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const successFragment = document.createDocumentFragment();
  const successMessageElement = templateSuccess.cloneNode(true);
  successFragment.appendChild(successMessageElement);
  bodyElement.appendChild(successFragment);
  const successButtonElement = successMessageElement.querySelector('.success__button');
  addEventsForAlerts(successButtonElement);
};

const showErrorAlert = () => {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const errorFragment = document.createDocumentFragment();
  const errorMessageElement = templateError.cloneNode(true);
  errorFragment.appendChild(errorMessageElement);
  bodyElement.appendChild(errorFragment);
  const errorButtonElement = errorMessageElement.querySelector('.error__button');
  errorButtonElement.addEventListener('click', onMessageButtonClick);
  addEventsForAlerts(errorButtonElement);
};

export {showSuccessAlert, showErrorAlert};
