import {onPopUpEscStop} from './load-new-picture-form.js';

const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_INVALIDITY_MESSAGE =
`Хэш-тэги должны соответствовать следующим требовагиям:
- хэш-тег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;
- хэш-теги разделяются пробелами;
- допускается ввод не более пяти хэштэгов.
- один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.`;

const MAX_HASHTAGS_QUANTITY = 5;
const COMMENT_MAX_LENGTH = 140;

const hashtagsContainerElement = document.querySelector('.text__hashtags');
const commentsContainerElement = document.querySelector('.text__description');

let wrongHashtag = '';
let hashtags = [];
let doubles = [];

const onNewHashtagInput = () => {

  hashtags = hashtagsContainerElement.value.split(' ').filter((item) => item!=='');

  wrongHashtag = hashtags.find((hashtagString) => !RE.test(hashtagString));

  hashtags.forEach((item) => {
    doubles.push(item.toLowerCase());
  });

  doubles = doubles.filter((item, i, arr) =>  i !== arr.indexOf(item) || i !== arr.lastIndexOf(item));

  if (wrongHashtag) {
    hashtagsContainerElement.setCustomValidity(HASHTAGS_INVALIDITY_MESSAGE);
    wrongHashtag = '';
  } else if (doubles.length > 0){
    hashtagsContainerElement.setCustomValidity(HASHTAGS_INVALIDITY_MESSAGE);
    doubles = [];
  } else if (hashtags.length > MAX_HASHTAGS_QUANTITY ) {
    hashtagsContainerElement.setCustomValidity(HASHTAGS_INVALIDITY_MESSAGE);
  } else {
    hashtagsContainerElement.setCustomValidity('');
  }
  hashtagsContainerElement.reportValidity();
};

const onNewCommentInput = () => {
  const commentLength = commentsContainerElement.value.length;
  if (commentLength > COMMENT_MAX_LENGTH) {
    commentsContainerElement.setCustomValidity(`Удалите лишние ${commentLength - COMMENT_MAX_LENGTH} симв.`);
  } else {
    commentsContainerElement.setCustomValidity('');
  }
  commentsContainerElement.reportValidity();
};

const initValidation = () => {
  commentsContainerElement.addEventListener('input', onNewCommentInput);
  hashtagsContainerElement.addEventListener('input', onNewHashtagInput);
  hashtagsContainerElement.addEventListener('keydown', onPopUpEscStop);
  commentsContainerElement.addEventListener('keydown', onPopUpEscStop);
};

export {initValidation};
