require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret-key';

const allowedCors = [
  'https://mn-movies-explorer.nomoredomainsicu.ru',
  'http://mn-movies-explorer.nomoredomainsicu.ru',
  'http://localhost:3000',
];

const corsOptions = { origin: allowedCors, credentials: true };

const mongooseOptions = { useNewUrlParser: true };

module.exports = {
  JWT_SECRET,
  PORT,
  DB_URL,
  corsOptions,
  mongooseOptions,
};
