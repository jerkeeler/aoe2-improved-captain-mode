const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const requestLogger = require('morgan');
const helmet = require('helmet');

const logger = require('./logger');
const dataRouter = require('./routes/data');
const { MORGAN_FORMAT, IS_PROD } = require('./consts');

logger.info('Configuring express application...');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (IS_PROD) {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(helmet.referrerPolicy(
  {policy: 'no-referrer'}
));

app.use(requestLogger(MORGAN_FORMAT, {stream: logger.morganStream}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// In development, serve up static assets, in reality these will be served by nginx or the ilk
if (!IS_PROD) {
  app.use('/static', express.static(path.join(__dirname, 'public')));
}

app.use('/api/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = !IS_PROD ? err : {};
  logger.error(err);

  // render the error page
  res.status(err.status || 404);
  res.render('error');
});

logger.info('Express application has been configured!');

module.exports = app;
