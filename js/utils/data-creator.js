import {openBigPicture, closeElement, closeBigPicture, onPopUpEscKeyDown} from './big-picture.js';

const container = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');
const filterDefault = document.querySelector('#filter-default');

const renderPicturesList = (picturesData) => {
  document.querySelectorAll('.picture').forEach ((pictureNode) => {
    pictureNode.remove();
  });
  const picturesListFragment = document.createDocumentFragment();
  picturesData.forEach(({url, likes, comments, description, id}) => {
    const pictureNode = templateFragment.cloneNode(true);
    pictureNode.querySelector('.picture__comments').textContent = comments.length;
    pictureNode.querySelector('.picture__description').textContent = description;
    pictureNode.querySelector('.picture__id').textContent = id;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    pictureNode.querySelector('.picture__img').src = url;
    picturesListFragment.appendChild(pictureNode);
    pictureNode.addEventListener('click', ()=> {
      openBigPicture ({url, comments, likes, description});
    });
    closeElement.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onPopUpEscKeyDown);
  });
  container.appendChild(picturesListFragment);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

export {renderPicturesList, filterDiscussed, filterRandom, filterDefault};
