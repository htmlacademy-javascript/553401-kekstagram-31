const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleValue = document.querySelector('.scale__control--value');
const scaleDownBtn = document.querySelector('.scale__control--smaller');
const scaleUpBtn = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const changeSize = (evt) => {
  let value = parseInt(scaleValue.value, 10);

  if (evt.target === scaleDownBtn && value > SCALE_MIN) {
    value -= SCALE_STEP;
  } else if (evt.target === scaleUpBtn && value < SCALE_MAX) {
    value += SCALE_STEP;
  }

  scaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const resetScale = () => {
  imagePreview.style.transform = `scale(${SCALE_MAX / 100})`;
};

export { changeSize, resetScale };
