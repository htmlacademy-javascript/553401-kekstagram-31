import openBigPicture from './render-full-picture.js';

const pictureList = document.querySelector('.pictures');
const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const renderMiniatures = (array) => {
  array.forEach(({ id, url, description, likes, comments }) => {
    const miniatureItem = templatePicture.cloneNode(true);
    miniatureItem.dataset.photoId = id;
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__img').alt = description;
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent =
      comments.length;

    pictureListFragment.append(miniatureItem);
  });

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

export default renderMiniatures;
