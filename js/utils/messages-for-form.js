import {isEscapeKey} from './functions.js';

const body = document.querySelector('body');

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  if (body.contains(document.querySelector('.success'))) {
    body.removeChild(document.querySelector('.success'));
  } else {
    body.removeChild(document.querySelector('.error'));
  }
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  document.removeEventListener('click', closeByDocumentClick);
}

function closeByDocumentClick (evt) {
  if (evt.target.className === 'success' || evt.target.className === 'error') {
    closeMessage();
  }
}

const addEventsForAlerts = (name) => {
  name.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onPopUpEscKeyDown);
  document.addEventListener('click', closeByDocumentClick);
};

const showSuccessAlert = () => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const successFragment = document.createDocumentFragment();
  const successMessage = templateSuccess.cloneNode(true);
  successFragment.appendChild(successMessage);
  body.appendChild(successFragment);
  const successButton = successMessage.querySelector('.success__button');
  addEventsForAlerts(successButton);
};

const showErrorAlert = () => {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const errorFragment = document.createDocumentFragment();
  const errorMessage = templateError.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  body.appendChild(errorFragment);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);
  addEventsForAlerts(errorButton);
};

export {showSuccessAlert, showErrorAlert};
