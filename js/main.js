import {getData} from './utils/api.js';
import {renderPicturesList} from './utils/data-creator.js';
import {initPictureFilters} from './utils/filters.js';
import {initImgEffects, initSliderChange} from './utils/img-effects.js';
import {initValidation} from './utils/validation.js';
import {initLoadForm, setFormSubmit} from './utils/load-new-picture-form.js';

const RERENDER_DELAY = 1000;
document.querySelector('.img-filters').classList.remove('img-filters--inactive');

getData((picturesData) => {
  renderPicturesList(picturesData);
  initPictureFilters (picturesData, RERENDER_DELAY, renderPicturesList);
});

initLoadForm();
initImgEffects();
initSliderChange();
initValidation();
setFormSubmit ();


