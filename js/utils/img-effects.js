import {minimizeValue, maximizeValue} from './functions.js';

const formForPictureLoadElement = document.querySelector('.img-upload__form');
const scaleControlSmallerElement = formForPictureLoadElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = formForPictureLoadElement.querySelector('.scale__control--bigger');
const scaleControlElement = formForPictureLoadElement.querySelector('.scale__control--value');
const previewElement = document.querySelector('.img-upload__preview').querySelector('img');
const sliderElement = formForPictureLoadElement.querySelector('.effect-level__slider');
const effectLevelElement = formForPictureLoadElement.querySelector('.effect-level__value');
const areaForSliderElement = formForPictureLoadElement.querySelector('.img-upload__effect-level');

const initImgEffects = () => {
  areaForSliderElement.classList.add('hidden');

  scaleControlSmallerElement.addEventListener ('click', () =>{
    minimizeValue (scaleControlElement, previewElement);
  });

  scaleControlBiggerElement.addEventListener ('click', () => {
    maximizeValue (scaleControlElement, previewElement);
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
  if (evt.target.name !== 'effect') {
    return false;
  }

  if (effectClassName !== '') {
    previewElement.removeAttribute('class');
  }

  if(evt.target.value === 'chrome') {
    effectClassName = 'effects__preview--chrome';
    previewElement.classList.add(effectClassName);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    areaForSliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelElement.value = unencoded[handle];
      previewElement.style.filter = `grayscale(${effectLevelElement.value})`;
    });
  }

  if(evt.target.value === 'sepia') {
    effectClassName = 'effects__preview--sepia';
    previewElement.classList.add(effectClassName);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    areaForSliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelElement.value = unencoded[handle];
      previewElement.style.filter = `sepia(${effectLevelElement.value})`;
    });

  }

  if(evt.target.value === 'marvin') {
    effectClassName = 'effects__preview--marvin';
    previewElement.classList.add(effectClassName);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    areaForSliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelElement.value = unencoded[handle];
      previewElement.style.filter = `invert(${effectLevelElement.value}%)`;
    });
  }

  if(evt.target.value === 'phobos') {
    effectClassName = 'effects__preview--phobos';
    previewElement.classList.add(effectClassName);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    areaForSliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelElement.value = unencoded[handle];
      previewElement.style.filter = `blur(${effectLevelElement.value}px)`;
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
    effectClassName = 'effects__preview--heat';
    previewElement.classList.add(effectClassName);
    areaForSliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelElement.value = unencoded[handle];
      previewElement.style.filter = `brightness(${effectLevelElement.value})`;
    });
  }

  if (evt.target.value === 'none') {
    previewElement.style.filter = 'none';
    areaForSliderElement.classList.add('hidden');
  }
}

const initSliderChange = () => {
  formForPictureLoadElement.addEventListener('change', onEffectChange);
};

const resetForm = () => {
  formForPictureLoadElement.reset();
  document.getElementById('effect-none').checked = true;
  previewElement.removeAttribute('class');
  previewElement.style.filter = 'none';
  previewElement.style.transform = 'scale(1)';
  areaForSliderElement.classList.add('hidden');
};

export {resetForm, initImgEffects, initSliderChange};
