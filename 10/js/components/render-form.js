import { isEscapeKey } from '../util.js';
import {
  changeSize,
  onEffectChange,
  resetUploadForm,
} from './upload-image-effects.js';

const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadOverlayCloseBtn = form.querySelector('.img-upload__cancel');
const scaleBlock = document.querySelector('.scale');
const effectList = form.querySelector('.effects');

const onDocumentKeydown = (evt) => {
  if (
    isEscapeKey(evt) &&
    !document.activeElement.closest('.img-upload__text')
  ) {
    evt.preventDefault();
    closeUploadImg();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target.classList.contains('img-upload__overlay')) {
    evt.preventDefault();
    closeUploadImg();
  }
};

function openUploadImg() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadOverlay.addEventListener('click', onOverlayClick);
  uploadOverlayCloseBtn.addEventListener('click', closeUploadImg);
  scaleBlock.addEventListener('click', changeSize);
  effectList.addEventListener('change', onEffectChange);
}

function closeUploadImg() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.removeEventListener('click', onOverlayClick);
  uploadOverlayCloseBtn.removeEventListener('click', closeUploadImg);
  form.reset();
  scaleBlock.removeEventListener('click', changeSize);
  resetUploadForm();
}

uploadInput.addEventListener('change', openUploadImg);

export default closeUploadImg;
