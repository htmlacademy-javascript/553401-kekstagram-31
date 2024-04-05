import { isEscapeKey } from '../util.js';
import renderComments from './render-comments.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

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

const onOverlayClick = (evt) => {
  if (evt.target.classList.contains('overlay')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(item) {
  renderBigPicture(item);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('mousedown', onOverlayClick);
  bigPictureCloseBtn.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  const button = bigPicture.querySelector('.comments-loader');
  button.replaceWith(button.cloneNode(true));
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('mousedown', onOverlayClick);
  bigPictureCloseBtn.removeEventListener('click', closeBigPicture);
}

export default openBigPicture;
