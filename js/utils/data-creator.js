import {getNumbersForId, getRandomNumber, getUniqueRandomNumber} from './functions.js';

const DESCRIPTIONS_NUMBER = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATAR_START_NUM = 1;
const AVATAR_STOP_NUM = 6;
const COMMENTS_MIN = 1;
const COMMENTS_MAX = 3;
const DESCRIPTIONS_TEXT = [
  'Утро кота',
  'Рыбов красивое',
  'Птичья охота',
  'Сладкие сны',
  'Миска не бывает полной',
  'Кошачьи радости',
  'Ночной тыгыдык',
  'Отдай мне свою еду',
  'Мягкие лапки',
  'Самый голодный в мире кот',
  'Хочу есть!',
  'Поиграй со мной',
  'Купи рыбов!',
  'Дневной сон',
  'Хочу играть!',
  'Кусь',
  'В миске видно дно!',
  'Кошачьи нежности',
  'И снова кусь!',
  'За завтраком',
  'Вижу птичек во сне',
  'Береги свои ноги',
  'Не зли меня!',
  'Я снова голоден',
  'Где рыбов?',
];

const PHRASES_FOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTATOR_NAMES = [
  'Снежинка',
  'Василиса',
  'Тиффани',
  'Томас',
  'Маркиза',
  'Пушинка',
  'Мурка',
  'Кекс',
  'Феликс',
  'Борис',
  'Барсик',
];

const commentsId = getNumbersForId (1000);
const descriptionsId = getNumbersForId (DESCRIPTIONS_NUMBER);

const createComment = function () {
  return {
    id: getUniqueRandomNumber(commentsId),
    avatar: `img/avatar-${getRandomNumber(AVATAR_START_NUM, AVATAR_STOP_NUM)}.svg`,
    message: PHRASES_FOR_COMMENTS[getRandomNumber(0, PHRASES_FOR_COMMENTS.length - 1)],
    name: COMMENTATOR_NAMES[getRandomNumber(0, COMMENTATOR_NAMES.length - 1)],
  };
};

const getCommentsArray = function () {
  return Array.from({
    length: getRandomNumber(COMMENTS_MIN, COMMENTS_MAX),
  }, createComment);
};

const createPictureDescription = function() {
  const idNumber = getUniqueRandomNumber(descriptionsId);
  return {
    id: idNumber,
    url: `photos/${idNumber}.jpg`,
    description: getUniqueRandomNumber(DESCRIPTIONS_TEXT),
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getCommentsArray(),
  };
};

export {DESCRIPTIONS_NUMBER, createPictureDescription};
