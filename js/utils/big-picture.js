import {container, randomPictures, renderPictures} from './draw-pictures.js';
import {isEscapeKey} from './functions.js';
container.appendChild(renderPictures());
const pictures = container.querySelectorAll('.picture');
const bigPictureSection = document.querySelector('.big-picture');
const closeElement = bigPictureSection.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
function openBigPicture (randomPicture) {
  bigPictureSection.classList.remove('hidden');
  bigPictureSection.querySelector('.big-picture__img').querySelector('img').src = randomPicture.url;
  bigPictureSection.querySelector('.likes-count').textContent = randomPicture.likes;
  bigPictureSection.querySelector('.comments-count').textContent = randomPicture.comments.length;
  bigPictureSection.querySelector('.social__caption').textContent = randomPicture.description;
  bigPictureSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureSection.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  socialComments.textContent = '';
  for (let i = 0; i< randomPicture.comments.length; i++) {
    const htmlCode = `<li class='social__comment'>
    <img class='social__picture' src= ${randomPicture.comments[i].avatar} alt=${randomPicture.comments[i].name} width='35' height='35'>
    <p class='social__text'> ${randomPicture.comments[i].message} </p></li>`;
    socialComments.insertAdjacentHTML ('beforeend', htmlCode);
  }
}

function closeBigPicture () {
  bigPictureSection.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPopUpEscKeyDown);

}

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = () => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', () => {
      openBigPicture (randomPictures[i]);
      document.addEventListener('keydown', onPopUpEscKeyDown);
    });
  }
};

export {closeElement, showBigPicture, closeBigPicture};
