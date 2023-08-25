const {
  CastError,
  ValidationError,
  DocumentNotFoundError,
} = require('mongoose').Error;

const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const {
  CODE_CREATED,
  MSG_FORBIDDEN_DELETION,
  MSG_SUCCESS_DELETION,
  MSG_MOVIE_NOT_FOUND,
  MSG_WRONG_DATA,
} = require('../utils/constants');

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const movieData = req.body;
  movieData.owner = req.user._id;

  Movie.create(movieData)
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(CODE_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(MSG_WRONG_DATA));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner._id.toString();

      if (ownerId !== req.user._id) {
        throw new ForbiddenError(MSG_FORBIDDEN_DELETION);
      }

      return Movie.deleteOne(movie)
        .then(() => res.send({ message: MSG_SUCCESS_DELETION }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(MSG_WRONG_DATA));
      } else if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MSG_MOVIE_NOT_FOUND));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
