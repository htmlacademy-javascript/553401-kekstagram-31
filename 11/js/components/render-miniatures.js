import openBigPicture from './render-full-picture.js';
import { getFilteredArray } from './filtered-miniatures.js';

const pictureList = document.querySelector('.pictures');
const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const errorDataTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const pictureListFragment = document.createDocumentFragment();

const renderMiniatures = (array) => {
  getFilteredArray(array).forEach(
    ({ id, url, description, likes, comments }) => {
      const miniatureItem = templatePicture.cloneNode(true);
      miniatureItem.dataset.photoId = id;
      miniatureItem.querySelector('.picture__img').src = url;
      miniatureItem.querySelector('.picture__img').alt = description;
      miniatureItem.querySelector('.picture__likes').textContent = likes;
      miniatureItem.querySelector('.picture__comments').textContent =
        comments.length;

      pictureListFragment.append(miniatureItem);
    }
  );

  while (pictureList.querySelector('.picture')) {
    pictureList.removeChild(pictureList.querySelector('.picture'));
  }

  pictureList.append(pictureListFragment);

  pictureList.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      const picture = evt.target.closest('.picture');
      const index = array.findIndex(
        (item) => item.id === Number(picture.dataset.photoId)
      );
      openBigPicture(array[index]);
    }
  });
};

export { renderMiniatures, errorDataTemplate };
