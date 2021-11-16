import {isEscapeKey} from './functions.js';

const bigPictureSection = document.querySelector('.big-picture');
const closeElement = bigPictureSection.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const commentsShown = document.querySelector('.comments-shown');
const commentsLoadButton = bigPictureSection.querySelector('.social__comments-loader');
let newComments = [];
let count = 10;
let commentsCounter = 0;

const increaseCount = () => {
  count+=5;
};
const hideItems = (item, i) => {
  if(i > 4) {
    item.classList.add ('hidden');

  }
};

const showItems = (item, i) => {
  if(item.classList.contains('hidden') && i < count) {
    item.classList.remove ('hidden');
    commentsCounter = i + 1;
    commentsShown.textContent = commentsCounter;
  }
};

const showMoreItems = () => {
  newComments.forEach(showItems);
  increaseCount();
  if (commentsCounter === newComments.length) {
    commentsLoadButton.classList.add('hidden');
  }
};

function openBigPicture ({url, comments, likes, description}) {
  bigPictureSection.classList.remove('hidden');
  bigPictureSection.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureSection.querySelector('.likes-count').textContent = likes;
  bigPictureSection.querySelector('.comments-count').textContent = comments.length;
  bigPictureSection.querySelector('.social__caption').textContent = description;
  document.querySelector('body').classList.add('modal-open');
  socialComments.textContent = '';
  comments.forEach((comment) => {
    const htmlCode = `<li class='social__comment'>
    <img class='social__picture' src= ${comment.avatar} alt=${comment.name} width='35' height='35'>
    <p class='social__text'> ${comment.message} </p></li>`;
    socialComments.insertAdjacentHTML ('beforeend', htmlCode);
  });

  newComments = socialComments.querySelectorAll('.social__comment');
  if(comments.length <= 5) {
    commentsShown.textContent = comments.length;
    commentsLoadButton.classList.add ('hidden');
  } else {
    newComments.forEach(hideItems);
    commentsShown.textContent = 5;
    commentsLoadButton.addEventListener('click', showMoreItems);
  }
}

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPictureSection.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoadButton.classList.remove ('hidden');
  commentsShown.textContent = '';
  commentsCounter = 0;
  count = 10;
}

export {closeElement, openBigPicture, closeBigPicture, onPopUpEscKeyDown};

