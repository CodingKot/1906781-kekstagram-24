import {sendData } from './api.js';
import {showSuccessAlert, showErrorAlert} from './messages-for-form.js';
import {isEscapeKey} from './functions.js';
import {resetForm} from './img-effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const formForPictureLoadElement = document.querySelector('.img-upload__form');
const loadFormElement = formForPictureLoadElement.querySelector('.img-upload__overlay');
const newFileLoadElement = formForPictureLoadElement.querySelector('#upload-file');
const formCloseButtonElement = formForPictureLoadElement.querySelector('.img-upload__cancel');
const previewElement = document.querySelector('.img-upload__preview').querySelector('img');
const bodyElement = document.querySelector('body');

const onFileLoadClick = () => {
  const file = newFileLoadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
  loadFormElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopUpEscKeyDown);
};

function onPopUpEscKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onFormCloseElementClick();
  }
}

function onFormCloseElementClick  () {
  loadFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  resetForm();
}

const onPopUpEscStop = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const initLoadForm = () => {
  newFileLoadElement.addEventListener('change', onFileLoadClick);
  formCloseButtonElement.addEventListener('click', onFormCloseElementClick);
};

const setFormSubmit = () => {
  formForPictureLoadElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData (formForPictureLoadElement);

    sendData(
      () => showSuccessAlert(),
      () => showErrorAlert(),
      formData,
    );
    onFormCloseElementClick();
  });
};

export {initLoadForm, setFormSubmit, onPopUpEscStop};
