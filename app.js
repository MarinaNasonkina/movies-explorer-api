const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const centralErrHandler = require('./middlewares/central-err-handler');

const {
  PORT,
  DB_URL,
  corsOptions,
  mongooseOptions,
} = require('./utils/config');

const app = express();

mongoose.connect(DB_URL, mongooseOptions);

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(cors(corsOptions));

app.use(requestLogger);

app.use(limiter);

app.use(errorLogger);

app.use(errors());
app.use(centralErrHandler);

app.listen(PORT);
