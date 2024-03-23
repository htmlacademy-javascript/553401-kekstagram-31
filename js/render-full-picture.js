import { isEscapeKey } from './util.js';
import renderComments from './render-comments.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
// const commentCountBlock = bigPicture.querySelector('.social__comment-count');
// const commentLoadBtn = bigPicture.querySelector('.comments-loader');

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent =
    comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(item) {
  renderBigPicture(item);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  // commentCountBlock.classList.add('hidden'); // временная заглушка
  // commentLoadBtn.classList.add('hidden'); // временная заглушка
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseBtn.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  // commentCountBlock.classList.remove('hidden'); // временная заглушка
  // commentLoadBtn.classList.remove('hidden'); // временная заглушка
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseBtn.removeEventListener('click', closeBigPicture);
}

export default openBigPicture;
