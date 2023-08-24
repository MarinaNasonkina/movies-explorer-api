const CODE_CREATED = 201;
const CODE_BAD_REQUEST = 400;
const CODE_UNAUTHORIZED = 401;
const CODE_FORBIDDEN = 403;
const CODE_NOT_FOUND = 404;
const CODE_CONFLICT = 409;
const CODE_INTERNAL_SERVER_ERR = 500;

const MSG_FORBIDDEN_DELETION = 'Нельзя удалить чужой сохраненный фильм';
const MSG_INCORRECT_EMAIL = 'Введен некорректный email';
const MSG_INCORRECT_URL = 'Введен некорректный URL';
const MSG_MIN_LENGTH = 'Минимальная длина поля - 2';
const MSG_MAX_LENGTH = 'Максимальная длина поля - 30';
const MSG_MOVIE_NOT_FOUND = 'Запрашиваемый фильм не найден';
const MSG_NEED_AUTH = 'Необходима авторизация';
const MSG_PAGE_NOT_FOUND = 'Страница не найдена';
const MSG_REQUIRED_FIELD = 'Поле должно быть заполнено';
const MSG_SERVER_ERR = 'На сервере произошла ошибка';
const MSG_SUCCESS_DELETION = 'Фильм успешно удален';
const MSG_SUCCESS_EXIT = 'Выход прошел успешно';
const MSG_USER_EXISTS = 'Пользователь с таким email уже зарегистрирован';
const MSG_USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const MSG_WRONG_USER_DATA = 'Неправильные почта или пароль';
const MSG_WRONG_DATA = 'Переданы некорректные данные';

module.exports = {
  CODE_CREATED,
  CODE_BAD_REQUEST,
  CODE_UNAUTHORIZED,
  CODE_FORBIDDEN,
  CODE_NOT_FOUND,
  CODE_CONFLICT,
  CODE_INTERNAL_SERVER_ERR,
  MSG_FORBIDDEN_DELETION,
  MSG_INCORRECT_EMAIL,
  MSG_INCORRECT_URL,
  MSG_MIN_LENGTH,
  MSG_MAX_LENGTH,
  MSG_MOVIE_NOT_FOUND,
  MSG_NEED_AUTH,
  MSG_PAGE_NOT_FOUND,
  MSG_REQUIRED_FIELD,
  MSG_SERVER_ERR,
  MSG_SUCCESS_DELETION,
  MSG_SUCCESS_EXIT,
  MSG_USER_EXISTS,
  MSG_USER_NOT_FOUND,
  MSG_WRONG_USER_DATA,
  MSG_WRONG_DATA,
};
