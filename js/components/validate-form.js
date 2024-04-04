import { hasDuplicate, isEscapeKey } from '../util.js';
import { sendData } from '../data/api.js';

const AMOUNT_HASHTAGS = 5;
const AMOUNT_COMMENT_SYMBOLS = 140;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const inputHashtags = form.querySelector('.text__hashtags');
const inputText = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const renderMessage = (typeError, template) => {
  const messageFragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${typeError}__button`);

  function onPopupEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      closeMessage();
    }
  }

  function closeMessage() {
    message.remove();
    body.removeEventListener('keydown', onPopupEscKeydown);
  }
  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(typeError)) {
      closeMessage();
    }
  });
  button.addEventListener('click', closeMessage);
  body.addEventListener('keydown', onPopupEscKeydown);
  messageFragment.append(message);
  body.append(messageFragment);
};

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

const validateHashtagsDuplicate = (value) =>
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
  validateHashtagsDuplicate,
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

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          renderMessage('success', successTemplate);
        })
        .catch(() => {
          renderMessage('error', errorTemplate);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export default setUserFormSubmit;
