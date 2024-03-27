import createPhotoDescriptions from './data.js';
import renderMiniatures from './components/render-miniatures.js';
import openUploadImg from './components/render-form.js';

const uploadInput = document.querySelector('.img-upload__input');
const photoArray = createPhotoDescriptions();

renderMiniatures(photoArray);
uploadInput.addEventListener('change', openUploadImg);

////////////////////////////////////////////

// effect: filter, rangeMin, rangeMax, rangeStep, unit
const EFFECTS = {
  chrome: ['grayscale', 0, 1, 0.1, ''],
  sepia: ['sepia', 0, 1, 0.1, ''],
  marvin: ['invert', 0, 100, 1, '%'],
  phobos: ['blur', 0, 3, 0.1, 'px'],
  heat: ['brightness', 1, 3, 0.1, ''],
  none: ['none', 0, 0, 0, ''],
};

const imagePreview = document.querySelector('.img-upload__preview img');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
const effectList = document.querySelector('.effects');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = sliderFieldset.querySelector('.effect-level__value');
let currentEffect = effectList.querySelector('input:checked').value;

const getEffectClass = (value) => `effects__preview--${value}`;
let effectClass = getEffectClass(currentEffect);

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectValue.value = 100;

effectSlider.noUiSlider.on('update', () => {
  if (currentEffect !== 'none') {
    effectValue.value = effectSlider.noUiSlider.get();
    const currentFilter = EFFECTS[currentEffect][0];

    console.log(`value: ${effectValue.value}`);
    console.log(effectSlider.noUiSlider.get());
    imagePreview.style.filter = `${currentFilter}(${effectValue.value})`;
  }
});

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;

  imagePreview.classList.remove(effectClass);
  effectClass = getEffectClass(evt.target.value);
  imagePreview.classList.add(effectClass);

  const [effect, rangeMin, rangeMax, rangeStep, unit] = EFFECTS[currentEffect];

  const filterParams = {
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    start: rangeMax,
    step: rangeStep,
    format: {
      to: function (value) {
        return `${value + unit}`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };

  if (currentEffect === 'none') {
    imagePreview.style.removeProperty('filter');
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(filterParams);
  }
};

effectList.addEventListener('change', onEffectChange);

////////////////////////////////////////////
