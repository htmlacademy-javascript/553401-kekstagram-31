import { isEscapeKey } from '../util.js';
import { pristine } from './validate-form.js';
import {
  changeSize,
  onEffectChange,
  resetUploadForm,
} from './upload-image-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
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
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadOverlay.addEventListener('mousedown', onOverlayClick);
  uploadOverlayCloseBtn.addEventListener('click', closeUploadImg);
  scaleBlock.addEventListener('click', changeSize);
  effectList.addEventListener('change', onEffectChange);
}

function closeUploadImg() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.removeEventListener('mousedown', onOverlayClick);
  uploadOverlayCloseBtn.removeEventListener('click', closeUploadImg);
  form.reset();
  scaleBlock.removeEventListener('click', changeSize);
  resetUploadForm();
  pristine.reset();
}

uploadInput.addEventListener('change', openUploadImg);

export default closeUploadImg;
