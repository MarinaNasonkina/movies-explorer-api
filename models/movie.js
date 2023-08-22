const { Schema, model } = require('mongoose');
const validator = require('validator');

const {
  MSG_REQUIRED_FIELD,
  MSG_INCORRECT_URL,
} = require('../utils/constants');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
    director: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
    duration: {
      type: Number,
      required: [true, MSG_REQUIRED_FIELD],
    },
    year: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
    description: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
    image: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
      validate: {
        validator: (v) => validator.isURL(v),
        message: MSG_INCORRECT_URL,
      },
    },
    trailerLink: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
      validate: {
        validator: (v) => validator.isURL(v),
        message: MSG_INCORRECT_URL,
      },
    },
    thumbnail: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
      validate: {
        validator: (v) => validator.isURL(v),
        message: MSG_INCORRECT_URL,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, MSG_REQUIRED_FIELD],
    },
    movieId: {
      type: Number,
      required: [true, MSG_REQUIRED_FIELD],
    },
    nameRU: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
    nameEN: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
    },
  },
  { versionKey: false },
);

module.exports = model('movie', movieSchema);
