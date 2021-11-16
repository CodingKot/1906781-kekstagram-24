import {getData} from './utils/api.js';
import {renderPicturesList, filterDiscussed, filterRandom, filterDefault} from './utils/data-creator.js';
import {compareComments, mixPictures} from './utils/filters.js';
import {formForPictureLoad, onEffectChange} from './utils/img-effects.js';
import {hashtagsContainer, commentsContainer, initValidation} from './utils/validation.js';
import {newFileLoad, formCloseButton, openPictureLoadForm, setFormSubmit, closePictureLoadForm, stopEsc} from './utils/load-new-picture-form.js';

const RERENDER_DELAY = 500;
document.querySelector('.img-filters').classList.remove('img-filters--inactive');

getData((picturesData) => {
  renderPicturesList(picturesData);

  filterDiscussed.addEventListener('click', _.debounce(
    () => {
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(compareComments);
      renderPicturesList(sortedPictureData);
    },
    RERENDER_DELAY,
  ));

  filterRandom.addEventListener('click', _.debounce(
    () => {
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(mixPictures);
      renderPicturesList(sortedPictureData.slice(0,10));
    },
    RERENDER_DELAY,
  ));

  filterDefault.addEventListener('click', _.debounce(
    () => {
      renderPicturesList(picturesData);
    },
    RERENDER_DELAY,
  ));
});

newFileLoad.addEventListener('change', openPictureLoadForm);
formCloseButton.addEventListener('click', closePictureLoadForm);
formForPictureLoad.addEventListener('change', onEffectChange);
hashtagsContainer.addEventListener('keydown', stopEsc);
commentsContainer.addEventListener('keydown', stopEsc);

initValidation();
setFormSubmit ();


