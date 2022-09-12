import { Request, Response, NextFunction } from 'express';

export const CatchAsync = (handler: (...args) => Promise<any>) => {
  return (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2]);
};
