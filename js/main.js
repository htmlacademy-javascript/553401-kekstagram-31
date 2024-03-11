const AMOUNT_AVATARS = 6;
const AMOUNT_COMMENTS_MAX = 30;
const AMOUNT_LIKES_MIN = 15;
const AMOUNT_LIKES_MAX = 200;
const AMOUNT_PHOTOCARDS = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Супер виды.',
  'Лучше уже быть не может.',
  'Получился удачный кадр.',
  'Позавидуйте немножко.',
  'Наполним жизнь впечатлениями.',
  'Никто бы не поверил, если б не это фото.',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// неповторяющийся id из заданного диапазона
const createRandomIdFromRangeGenerator = (min, max) => {
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

const generatePhotoId = createRandomIdFromRangeGenerator(1, AMOUNT_PHOTOCARDS);
const generateUrlId = createRandomIdFromRangeGenerator(1, AMOUNT_PHOTOCARDS);
const generateCommentId = createRandomIdFromRangeGenerator(
  0,
  AMOUNT_COMMENTS_MAX
);

const createCommentForCard = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AMOUNT_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX),
  comments: Array.from(
    { length: getRandomInteger(0, AMOUNT_COMMENTS_MAX) },
    createCommentForCard
  ),
});

const createPhotoDescriptionArray = () =>
  Array.from({ length: AMOUNT_PHOTOCARDS }, createPhotoDescription);

createPhotoDescriptionArray();
