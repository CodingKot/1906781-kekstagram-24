import {isEscapeKey} from './functions.js';

const FIRST_FIVE_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = document.querySelector('.social__comments');
const commentsShownElement = document.querySelector('.comments-shown');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const likesQuantityElement = bigPictureElement.querySelector('.likes-count');
const socialCommentsQuantityElement = bigPictureElement.querySelector('.comments-count');
const bigBictureSocialCaptionElement = bigPictureElement.querySelector('.social__caption');
const bodyElement = document.querySelector('body');

let newComments = [];
let numberForCommentsQuantityCompare = 10;
let commentsCounter = 0;

const increaseNumberForCommentsQuantityCompare = () => {
  numberForCommentsQuantityCompare+=5;
};
const hideItems = (item, itemNumber) => {
  if(itemNumber > 4) {
    item.classList.add ('hidden');
  }
};

const showNewItems = (item, itemNumber) => {
  if(item.classList.contains('hidden') && itemNumber < numberForCommentsQuantityCompare) {
    item.classList.remove ('hidden');
    commentsCounter = itemNumber + 1;
    commentsShownElement.textContent = commentsCounter;
  }
};

const onSocialCommentsLoaderClick = () => {
  newComments.forEach(showNewItems);
  increaseNumberForCommentsQuantityCompare();
  if (commentsCounter === newComments.length) {
    socialCommentsLoaderElement.classList.add('hidden');
  }
};

function openBigPicture ({url, comments, likes, description}) {
  bigPictureElement.classList.remove('hidden');
  bigPictureImgElement.src = url;
  likesQuantityElement.textContent = likes;
  socialCommentsQuantityElement.textContent = comments.length;
  bigBictureSocialCaptionElement.textContent = description;
  bodyElement.classList.add('modal-open');
  socialCommentsElement.textContent = '';
  comments.forEach((comment) => {
    const htmlCode = `<li class='social__comment'>
    <img class='social__picture' src= ${comment.avatar} alt=${comment.name} width='35' height='35'>
    <p class='social__text'> ${comment.message} </p></li>`;
    socialCommentsElement.insertAdjacentHTML ('beforeend', htmlCode);
  });

  newComments = socialCommentsElement.querySelectorAll('.social__comment');
  if(comments.length <= FIRST_FIVE_COMMENTS) {
    commentsShownElement.textContent = comments.length;
    socialCommentsLoaderElement.classList.add ('hidden');
  } else {
    newComments.forEach(hideItems);
    commentsShownElement.textContent = FIRST_FIVE_COMMENTS;
    socialCommentsLoaderElement.addEventListener('click', onSocialCommentsLoaderClick);
  }
}

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onPictureCloseElementClick();
  }
};

function onPictureCloseElementClick () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  socialCommentsLoaderElement.classList.remove ('hidden');
  commentsShownElement.textContent = '';
  commentsCounter = 0;
  numberForCommentsQuantityCompare = 10;
}

export {openBigPicture, onPictureCloseElementClick, onPopUpEscKeyDown};

