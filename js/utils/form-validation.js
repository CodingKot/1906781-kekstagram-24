const hashtagsContainer = document.querySelector('.text__hashtags');
const commentsContainer = document.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashtagAllIsWrongMessage =
`необходимо исправить в соответствии с установленными требованиями:
- хэш-тег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;
- хэш-теги разделяются пробелами;
- допускается ввод не более пяти хэштэгов.`;
const incorrectHashtagsTypeMessage =
`необходимо исправить в соответствии с установленными требованиями:
- хэш-тег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;
- хэш-теги разделяются пробелами;`;
const incorrectHashtagsNumberMessage = 'Допускается ввод не более пяти хэштэгов.';
const similarHashtagsMessage =
'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.';
const COMMENT_MAX_LENGTH = 140;
let incorrectHashtags = [];
let hashtagsString = '';
let hashtagsArray = [];
let similarHashtags = [];

const checkHashtagArea = () => {
  hashtagsString = hashtagsContainer.value;
  hashtagsArray = hashtagsString.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!re.test(hashtagsArray[i])) {
      incorrectHashtags.push(hashtagsArray[i]);
    }
  }
  hashtagsArray.forEach((item) => {
    similarHashtags.push(item.toLowerCase());
  });

  similarHashtags = similarHashtags.filter((item, i, arr) => i !== arr.indexOf(item) || i !== arr.lastIndexOf(item));
  if (hashtagsArray.length > 5 && incorrectHashtags.length > 0) {
    hashtagsContainer.setCustomValidity(`${incorrectHashtags} ${hashtagAllIsWrongMessage}`);
    incorrectHashtags = [];
    similarHashtags = [];
  } else if (incorrectHashtags.length > 0) {
    hashtagsContainer.setCustomValidity(`${incorrectHashtags} ${incorrectHashtagsTypeMessage}`);
    incorrectHashtags = [];
    similarHashtags = [];
  } else if (hashtagsArray.length > 5) {
    hashtagsContainer.setCustomValidity(incorrectHashtagsNumberMessage);
  } else if (similarHashtags.length > 0){
    hashtagsContainer.setCustomValidity(similarHashtagsMessage);
    similarHashtags = [];
  } else {
    hashtagsContainer.setCustomValidity('');
  }
  if (!hashtagsContainer.value) {
    hashtagsContainer.setCustomValidity('');
  }
  hashtagsContainer.reportValidity();
};

const checkCommentsArea = () => {
  const commentLength = commentsContainer.value.length;
  if (commentLength > COMMENT_MAX_LENGTH) {
    commentsContainer.setCustomValidity(`Удалите лишние ${commentLength - COMMENT_MAX_LENGTH} симв.`);
  } else {
    commentsContainer.setCustomValidity('');
  }
  commentsContainer.reportValidity();
};


const initValidation = () => {
  commentsContainer.addEventListener('input', checkCommentsArea);
  hashtagsContainer.addEventListener('blur', checkHashtagArea);
};

export {hashtagsContainer, commentsContainer, initValidation};
