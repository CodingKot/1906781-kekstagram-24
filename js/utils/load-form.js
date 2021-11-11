import {isEscapeKey} from './functions.js';

const form = document.querySelector('.img-upload__form');
const loadForm = form.querySelector('.img-upload__overlay');
const newFileLoad = form.querySelector('#upload-file');
const formCloseButton = form.querySelector('.img-upload__cancel');

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureLoadForm();
  }
};

const openPictureLoadForm = () => {
  loadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopUpEscKeyDown);

};

function closePictureLoadForm () {
  loadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  newFileLoad.value = '';
}
const showForm = () => {
  newFileLoad.addEventListener('change', openPictureLoadForm);
  formCloseButton.addEventListener('click', closePictureLoadForm);
};


const stopEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export{showForm, stopEsc};
