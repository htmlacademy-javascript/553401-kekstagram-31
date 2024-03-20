const pictureList = document.querySelector('.pictures');
const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const renderMiniatures = (array) => {
  array.forEach(({ url, description, likes, comments }) => {
    const miniatureItem = templatePicture.cloneNode(true);
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__img').alt = description;
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent =
      comments.length;
    pictureListFragment.append(miniatureItem);
  });

  pictureList.append(pictureListFragment);
};

export default renderMiniatures;
