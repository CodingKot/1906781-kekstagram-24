const filterDiscussedElement = document.querySelector('#filter-discussed');
const filterRandomElement = document.querySelector('#filter-random');
const filterDefaultElement = document.querySelector('#filter-default');

const compareComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const mixPictures = () => Math.random() > 0.5 ? 1 : -1;

let filterTimer = null;

const setActiveFilterButton = (nextActiveButtonElement) => {
  const prevActiveButtonElement = document.querySelector('.img-filters__button--active');
  prevActiveButtonElement.classList.remove('img-filters__button--active');
  nextActiveButtonElement.classList.add('img-filters__button--active');
};

const initPictureFilters = (picturesData, RERENDER_DELAY, renderPicturesList) => {
  filterDiscussedElement.addEventListener('click',
    () => {
      clearTimeout(filterTimer);
      setActiveFilterButton(filterDiscussedElement);

      filterTimer = setTimeout(() => {
        const sortedPictureData = [...picturesData];
        sortedPictureData.sort(compareComments);

        renderPicturesList(sortedPictureData);
      }, RERENDER_DELAY);
    });

  filterRandomElement.addEventListener('click', () => {
    clearTimeout(filterTimer);
    setActiveFilterButton(filterRandomElement);

    filterTimer = setTimeout(() => {
      const sortedPictureData = [...picturesData];
      sortedPictureData.sort(mixPictures);

      renderPicturesList(sortedPictureData.slice(0,10));
    }, RERENDER_DELAY);
  });

  filterDefaultElement.addEventListener('click', () => {
    clearTimeout(filterTimer);
    setActiveFilterButton(filterDefaultElement);

    filterTimer = setTimeout(() => {
      renderPicturesList(picturesData);
    }, RERENDER_DELAY);
  });
};

export {initPictureFilters};
