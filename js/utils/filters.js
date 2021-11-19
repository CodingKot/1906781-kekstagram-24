const filterDiscussedElement = document.querySelector('#filter-discussed');
const filterRandomElement = document.querySelector('#filter-random');
const filterDefaultElement = document.querySelector('#filter-default');

const compareComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const mixPictures = () => Math.random() > 0.5 ? 1 : -1;


const initPictureFilters = (picturesData, RERENDER_DELAY, renderPicturesList) => {
  filterDiscussedElement.addEventListener('click',
    () => {
      if(filterDefaultElement.classList.contains('img-filters__button--active')) {
        filterDefaultElement.classList.remove('img-filters__button--active');
      } else if (filterRandomElement.classList.contains('img-filters__button--active')) {
        filterRandomElement.classList.remove('img-filters__button--active');
      }
      filterDiscussedElement.classList.add('img-filters__button--active');
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(compareComments);
      const delayDisscussedUpload = _.debounce(() => {
        renderPicturesList(sortedPictureData);
      },
      RERENDER_DELAY);
      delayDisscussedUpload ();
    });

  filterRandomElement.addEventListener('click', () => {
    if(filterDefaultElement.classList.contains('img-filters__button--active')) {
      filterDefaultElement.classList.remove('img-filters__button--active');
    } else if (filterDiscussedElement.classList.contains('img-filters__button--active')) {
      filterDiscussedElement.classList.remove('img-filters__button--active');
    }
    filterRandomElement.classList.add('img-filters__button--active');
    const sortedPictureData = [...picturesData];
    sortedPictureData.sort(mixPictures);
    const delayRandomUpload = _.debounce(() => {
      renderPicturesList(sortedPictureData.slice(0,10));
    },
    RERENDER_DELAY);
    delayRandomUpload();
  });

  filterDefaultElement.addEventListener('click', () => {
    if(filterRandomElement.classList.contains('img-filters__button--active')) {
      filterRandomElement.classList.remove('img-filters__button--active');
    } else if (filterDiscussedElement.classList.contains('img-filters__button--active')) {
      filterDiscussedElement.classList.remove('img-filters__button--active');
    }
    filterDefaultElement.classList.add('img-filters__button--active');
    const delayDefaultUpload = _.debounce(() => {
      renderPicturesList(picturesData);
    },
    RERENDER_DELAY);
    delayDefaultUpload();
  });
};

export {initPictureFilters};
