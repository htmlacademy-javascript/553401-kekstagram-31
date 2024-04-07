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
let filteredArray = [];

const renderMiniatures = (array) => {
  filteredArray = getFilteredArray(array);
  filteredArray.forEach(({ id, url, description, likes, comments }) => {
    const miniatureItem = templatePicture.cloneNode(true);
    miniatureItem.dataset.photoId = id;
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__img').alt = description;
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent =
      comments.length;

    pictureListFragment.append(miniatureItem);
  });

  pictureList.querySelectorAll('.picture').forEach((node) => node.remove());
  pictureList.append(pictureListFragment);
};

const onPictureListClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const picture = evt.target.closest('.picture');
    const index = filteredArray.findIndex(
      (item) => item.id === Number(picture.dataset.photoId)
    );
    openBigPicture(filteredArray[index]);
  }
};

pictureList.addEventListener('click', onPictureListClick);

export { renderMiniatures, errorDataTemplate };
