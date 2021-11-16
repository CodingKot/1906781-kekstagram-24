const filterDiscussed = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');
const filterDefault = document.querySelector('#filter-default');

const compareComments = (pictureA, pictureB) => {

  if(pictureA.comments.length > pictureB.comments.length) {
    return -1;
  }
  if (pictureB.comments.length > pictureA.comments.length) {
    return 1;
  }
  return 0;
};

const mixPictures = () => Math.random() > 0.5 ? 1 : -1;

const initPictureFilters = (picturesData, RERENDER_DELAY, renderPicturesList) => {
  filterDiscussed.addEventListener('click', _.debounce(
    () => {
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(compareComments);
      renderPicturesList(sortedPictureData);
    },
    RERENDER_DELAY,
  ));

  filterRandom.addEventListener('click', _.debounce(
    () => {
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(mixPictures);
      renderPicturesList(sortedPictureData.slice(0,10));
    },
    RERENDER_DELAY,
  ));

  filterDefault.addEventListener('click', _.debounce(
    () => {
      renderPicturesList(picturesData);
    },
    RERENDER_DELAY,
  ));
};

export {initPictureFilters};
