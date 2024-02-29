const MAX_LENGTH = 4;

// Функция для проверки длины строки
const isStringLength = (string, length) => string.length <= length;

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let invertedString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString.at(i);
  }

  return normalizeString === invertedString;
};

// Функция извлекает цифры из строки
const getNumber = (string) => {
  const stringWithNumber = string.toString();
  let number = '';

  for (let i = 0; i < stringWithNumber.length; i++) {
    const symbol = parseInt(stringWithNumber.at(i), 10);

    if (!Number.isNaN(symbol)) {
      number += symbol;
    }
  }

  return parseInt(number, 10);
};

// console.log(isStringLength('Топор', MAX_LENGTH));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));
// console.log(getNumber('ECMAScript 2020'));

isStringLength('Топор', MAX_LENGTH);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber('ECMAScript 2020');
