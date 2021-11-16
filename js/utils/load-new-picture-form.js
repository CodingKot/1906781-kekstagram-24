import {sendData } from './api.js';
import {showSuccessAlert, showErrorAlert} from './messages-for-form.js';
import {isEscapeKey} from './functions.js';
import {resetForm} from './img-effects.js';

const formForPictureLoad = document.querySelector('.img-upload__form');
const loadForm = formForPictureLoad.querySelector('.img-upload__overlay');
const newFileLoad = formForPictureLoad.querySelector('#upload-file');
const formCloseButton = formForPictureLoad.querySelector('.img-upload__cancel');

const openPictureLoadForm = () => {
  loadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopUpEscKeyDown);
};

function onPopUpEscKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureLoadForm();
  }
}

function closePictureLoadForm  () {
  loadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  resetForm();
}

const stopEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const setFormSubmit = () => {
  formForPictureLoad.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData (formForPictureLoad);

    sendData(
      () => showSuccessAlert(),
      () => showErrorAlert(),
      formData,
    );
    closePictureLoadForm();
  });
};

export {newFileLoad, formCloseButton, openPictureLoadForm, setFormSubmit, closePictureLoadForm, stopEsc, formForPictureLoad};
