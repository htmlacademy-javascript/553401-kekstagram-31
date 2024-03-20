import createPhotoDescriptions from './data.js';

const pictureList = document.querySelector('.pictures');
const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createPictures = createPhotoDescriptions();

const pictureListFragment = document.createDocumentFragment();

createPictures.forEach(({ url, description, likes, comments }) => {
  const miniatureItem = templatePicture.cloneNode(true);
  miniatureItem.querySelector('.picture__img').src = url;
  miniatureItem.querySelector('.picture__img').alt = description;
  miniatureItem.querySelector('.picture__likes').textContent = likes;
  miniatureItem.querySelector('.picture__comments').textContent =
    comments.length;
  pictureListFragment.append(miniatureItem);
});

const renderMiniatures = pictureList.append(pictureListFragment);

export default renderMiniatures;
