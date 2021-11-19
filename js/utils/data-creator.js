import {openBigPicture, onPictureCloseElementClick, onPopUpEscKeyDown} from './big-picture.js';

const closeElement = document.querySelector('.big-picture__cancel');
const containerForPicturesElement = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

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
    closeElement.addEventListener('click', onPictureCloseElementClick);
    document.addEventListener('keydown', onPopUpEscKeyDown);
  });
  containerForPicturesElement.appendChild(picturesListFragment);

};

export {renderPicturesList};
