import { hasDuplicate } from '../util.js';

const AMOUNT_HASHTAGS = 5;
const AMOUNT_COMMENT_SYMBOLS = 140;

const form = document.querySelector('.img-upload__form');
const inputHashtags = form.querySelector('.text__hashtags');
const inputText = form.querySelector('.text__description');
const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getArrayOfHashtags = (value) => value.split(' ');

const validateHashtagsRe = (value) => {
  if (value.length === 0) {
    return true;
  }
  const arrayOfHashtags = getArrayOfHashtags(value);
  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (!hashtagRegexp.test(arrayOfHashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagsDublicate = (value) =>
  !hasDuplicate(getArrayOfHashtags(value));
const validateHashtagsLength = (value) =>
  getArrayOfHashtags(value).length <= AMOUNT_HASHTAGS;
const validateComment = (value) => value.length <= AMOUNT_COMMENT_SYMBOLS;

pristine.addValidator(
  inputHashtags,
  validateHashtagsRe,
  'Хештеги начинаются с #, разделяются пробелом, до 20 символов'
);

pristine.addValidator(
  inputHashtags,
  validateHashtagsDublicate,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  inputHashtags,
  validateHashtagsLength,
  `Максимум можно ${AMOUNT_HASHTAGS} хештегов`
);

pristine.addValidator(
  inputText,
  validateComment,
  `До ${AMOUNT_COMMENT_SYMBOLS} символов`
);

const validateForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

export default validateForm;
