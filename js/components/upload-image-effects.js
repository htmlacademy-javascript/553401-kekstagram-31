const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
// params: rangeMin, rangeMax, rangeStep, unit
const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    params: [0, 1, 0.1, ''],
  },
  sepia: {
    filter: 'sepia',
    params: [0, 1, 0.1, ''],
  },
  marvin: {
    filter: 'invert',
    params: [0, 100, 1, '%'],
  },
  phobos: {
    filter: 'blur',
    params: [0, 3, 0.1, 'px'],
  },
  heat: {
    filter: 'brightness',
    params: [1, 3, 0.1, ''],
  },
  none: {
    filter: 'none',
    params: [0, 0, 0, ''],
  },
};

const scaleValue = document.querySelector('.scale__control--value');
const scaleDownBtn = document.querySelector('.scale__control--smaller');
const scaleUpBtn = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = sliderFieldset.querySelector('.effect-level__value');
let currentEffect = document.querySelector('input[name=effect]:checked').value;

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

const getEffectClass = (value) => `effects__preview--${value}`;
sliderFieldset.classList.add('hidden');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.setAttribute(
    'value',
    parseFloat(effectSlider.noUiSlider.get(), 10)
  );
  const currentFilter = EFFECTS[currentEffect].filter;
  imagePreview.style.filter = `${currentFilter}(${effectSlider.noUiSlider.get()})`;
});

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  const effectClass = getEffectClass(evt.target.value);

  imagePreview.removeAttribute('class');
  imagePreview.classList.add(effectClass);

  const [rangeMin, rangeMax, rangeStep, unit] = EFFECTS[currentEffect].params;

  const filterParams = {
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    start: rangeMax,
    step: rangeStep,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `${value.toFixed(0) + unit}`;
        }
        return `${value.toFixed(1) + unit}`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };

  if (currentEffect === 'none') {
    imagePreview.style.removeProperty('filter');
    effectValue.setAttribute('value', '');
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(filterParams);
  }
};

const resetUploadForm = () => {
  imagePreview.removeAttribute('class');
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  sliderFieldset.classList.add('hidden');
  effectValue.setAttribute('value', '');
};

export { changeSize, onEffectChange, resetUploadForm };
