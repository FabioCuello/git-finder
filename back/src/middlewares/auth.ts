import { NextFunction, Request, Response } from 'express';
import { CatchAsync } from './error';
import { customRedisClient } from '../session';

export const RequireAuth = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const uuidCookie = req.cookies[`test_hb`];
  let userInRedis: string;

  if (uuidCookie) {
    userInRedis = await customRedisClient.getAsync(uuidCookie);
  }

  if (!userInRedis || !uuidCookie) {
    return res.accessDenied();
  }

  // set user information in headers
  req.headers.uuidCookie = uuidCookie;
  req.headers.user = JSON.parse(userInRedis);
  next();
});

export const RequireNotAuth = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const uuidCookie = req.cookies[`test_hb`];
  let userInRedis: string;

  if (uuidCookie) {
    userInRedis = await customRedisClient.getAsync(uuidCookie);
  }

  if (!!userInRedis && !!uuidCookie) {
    return res.accessDenied();
  }

  next();
});
