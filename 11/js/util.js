const ALERT_SHOW_TIME = 5000;

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// неповторяющийся id из заданного диапазона
export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const hasDuplicate = (array) => new Set(array).size !== array.length;

export const showAlert = (template) => {
  const alertContainer = template.cloneNode(true);

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i + 1);
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
