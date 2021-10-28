import {createPictureDescriptions} from './data-creator.js';
const container = document.querySelector('.pictures');
const renderPictures = () => {
  const fragment = document.createDocumentFragment();
  const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
  const randomPictures = createPictureDescriptions();
  randomPictures.forEach(({url, likes, comments}) => {
    const randomPicture = templateFragment.cloneNode(true);
    randomPicture.querySelector('.picture__img').src = url;
    randomPicture.querySelector('.picture__likes').textContent = likes;
    randomPicture.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(randomPicture);
  });
  return fragment;
};
container.appendChild(renderPictures());


