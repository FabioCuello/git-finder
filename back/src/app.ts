import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { login, logout, register, profile, repositories } from './controllers';
import { customResponses } from './middlewares/responses';

export default () => {
  const app = express();

  const corsOptions = {
    origin: function (origin, callback) {
      callback(null, [origin]);
    },
    credentials: true
  };

  // middlewares
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(customResponses);

  // routes
  app.use('/api', login);
  app.use('/api', logout);
  app.use('/api', register);
  app.use('/api', profile);
  app.use('/api/repositories', repositories);

  // not found route
  app.use((_: Request, res: Response) => {
    return res.notFound();
  });

  // handle error
  app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
    console.log('Server internal error : ' + err.stack);
    return res.internal();
  });

  return app;
};
