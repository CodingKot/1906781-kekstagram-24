import {minimizeValue, maximizeValue} from './functions.js';

const formForPictureLoad = document.querySelector('.img-upload__form');
const scaleControlSmaller = formForPictureLoad.querySelector('.scale__control--smaller');
const scaleControlBigger = formForPictureLoad.querySelector('.scale__control--bigger');
const scaleControl = formForPictureLoad.querySelector('.scale__control--value');
const imagePreview = formForPictureLoad.querySelector('.img-upload__preview');
const sliderElement = formForPictureLoad.querySelector('.effect-level__slider');
const effectLevel = formForPictureLoad.querySelector('.effect-level__value');

const initImgEffects = () => {
  formForPictureLoad.querySelector('.img-upload__effect-level').classList.add('hidden');

  scaleControlSmaller.addEventListener ('click', () =>{
    minimizeValue (scaleControl, imagePreview);
  });

  scaleControlBigger.addEventListener ('click', () => {
    maximizeValue (scaleControl, imagePreview);
  });

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step:1,
    connect: 'lower',
  });
};

let effectClassName = '';
function onEffectChange (evt) {

  if (effectClassName !== '') {
    imagePreview.classList.remove(effectClassName);
  }
  effectClassName = `effects__preview--${evt.target.value}`;
  imagePreview.classList.add(effectClassName);

  if(evt.target.value === 'chrome') {

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      imagePreview.style.filter = `grayscale(${effectLevel.value})`;
    });
  }

  if(evt.target.value === 'sepia') {

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      imagePreview.style.filter = `sepia(${effectLevel.value})`;
    });

  }

  if(evt.target.value === 'marvin') {

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      imagePreview.style.filter = `invert(${effectLevel.value}%)`;
    });
  }

  if(evt.target.value === 'phobos') {

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      imagePreview.style.filter = `blur(${effectLevel.value}px)`;
    });
  }

  if(evt.target.value === 'heat') {

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      imagePreview.style.filter = `brightness(${effectLevel.value})`;
    });
  }

  if (evt.target.value === 'none') {
    imagePreview.style.filter = 'none';
    formForPictureLoad.querySelector('.img-upload__effect-level').classList.add('hidden');
  }
}

const initSliderChange = () => {
  formForPictureLoad.addEventListener('change', onEffectChange);
};

const resetForm = () => {
  formForPictureLoad.reset();
  document.getElementById('effect-none').checked = true;
  imagePreview.classList.remove(effectClassName);
  imagePreview.classList.add('effects__preview--none');
  imagePreview.style.filter = 'none';
  imagePreview.style.transform = 'scale(1)';
  formForPictureLoad.querySelector('.img-upload__effect-level').classList.add('hidden');
};

export {resetForm, initImgEffects, initSliderChange};
