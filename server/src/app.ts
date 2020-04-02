import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import requestLogger from 'morgan';
import helmet from 'helmet';

import logger from './logger';
import apiRouter from './routes/api';
import { MORGAN_FORMAT, IS_PROD } from './consts';

logger.info('Configuring express application...');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

if (IS_PROD) {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

app.use(
  requestLogger(MORGAN_FORMAT, {
    stream: {
      write: (msg) => logger.info(msg),
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/ping', (_, res: Response) => res.send('Pong!'));

// In development, serve up static assets, in reality these will be served by nginx or the ilk
if (!IS_PROD) {
  app.use('/static', express.static(path.join(__dirname, '..', 'public')));
}

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = !IS_PROD ? err : {};
  logger.error(err);

  // render the error page
  res.status(err.status || 404);
  res.render('error');
});

logger.info('Express application has been configured!');

export default app;
