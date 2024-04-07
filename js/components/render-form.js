import { isEscapeKey } from '../util.js';
import { pristine } from './validate-form.js';
import {
  changeSize as onScaleBlockClick,
  onEffectChange as onEffectListChange,
  resetUploadForm,
} from './upload-image-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCloseBtn = form.querySelector('.img-upload__cancel');
const scaleBlock = document.querySelector('.scale');
const effectList = form.querySelector('.effects');

const onDocumentKeydown = (evt) => {
  if (
    isEscapeKey(evt) &&
    !document.activeElement.closest('.img-upload__text')
  ) {
    evt.preventDefault();
    onUploadCloseBtnClick();
  }
};

const onOverlayMousedown = (evt) => {
  if (evt.target.classList.contains('img-upload__overlay')) {
    evt.preventDefault();
    onUploadCloseBtnClick();
  }
};

function onUploadInputChange() {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadOverlay.addEventListener('mousedown', onOverlayMousedown);
  uploadCloseBtn.addEventListener('click', onUploadCloseBtnClick);
  scaleBlock.addEventListener('click', onScaleBlockClick);
  effectList.addEventListener('change', onEffectListChange);
}

function onUploadCloseBtnClick() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.removeEventListener('mousedown', onOverlayMousedown);
  uploadCloseBtn.removeEventListener('click', onUploadCloseBtnClick);
  form.reset();
  scaleBlock.removeEventListener('click', onScaleBlockClick);
  resetUploadForm();
  pristine.reset();
}

uploadInput.addEventListener('change', onUploadInputChange);

export default onUploadCloseBtnClick;
