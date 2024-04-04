import { getShuffleArray } from '../util.js';

const AMOUNT_RANDOM_PHOTOCARDS = 10;

const filterBlock = document.querySelector('.img-filters');
const activeBtnClass = 'img-filters__button--active';

const setActiveFilterClick = (cb) => {
  filterBlock.classList.remove('img-filters--inactive');
  filterBlock.addEventListener('click', (evt) => {
    if (
      evt.target.nodeName === 'BUTTON' &&
      !evt.target.classList.contains(activeBtnClass)
    ) {
      const activeFilterBtn = document.querySelector(`.${activeBtnClass}`);
      activeFilterBtn.classList.remove(activeBtnClass);
      evt.target.classList.add(activeBtnClass);
      cb();
    }
  });
};

const getFilteredArray = (array) => {
  const activeFilterBtn = document.querySelector(`.${activeBtnClass}`);
  const arrayDefault = array.slice();

  const compareQuantityComments = (imgA, imgB) =>
    imgB.comments.length - imgA.comments.length;

  switch (activeFilterBtn.id) {
    case 'filter-default':
      return arrayDefault;
    case 'filter-random':
      return getShuffleArray(arrayDefault).slice(0, AMOUNT_RANDOM_PHOTOCARDS);
    case 'filter-discussed':
      return arrayDefault.sort(compareQuantityComments);
  }
};

export { setActiveFilterClick, getFilteredArray };
