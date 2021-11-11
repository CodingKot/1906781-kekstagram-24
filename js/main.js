import {closeElement, showBigPicture, closeBigPicture} from './utils/big-picture.js';
import {showForm, stopEsc} from './utils/load-form.js';
import {hashtagsContainer, commentsContainer, initValidation} from './utils/form-validation.js';

showBigPicture();
closeElement.addEventListener('click', closeBigPicture);
showForm();
hashtagsContainer.addEventListener('keydown', stopEsc);
commentsContainer.addEventListener('keydown', stopEsc);
initValidation();


