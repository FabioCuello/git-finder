import { CookieOptions } from 'express';

const DAY_IN_MILLI = 1000 * 60 * 60 * 24;

export const NODE_ENV = process.env.NODE_ENV || 'DEV';
export const IN_PROD = NODE_ENV === 'PROD';

export const APP_PORT = process.env.APP_PORT || '8080';
export const PASSWORD_SALT = process.env.PASSWORD_SALT || 'notAGreatPassword';

export const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING || 'redis://localhost:6379/1';
export const PG_CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || 'postgres://postgres:pass@localhost/local';

export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_PASS = process.env.EMAIL_PASS || '';
export const EMAIL_HOST = process.env.EMAIL_HOST || '';
export const EMAIL_PORT = process.env.EMAIL_PORT || 465;
export const EMAIL_SENDER = process.env.EMAIL_SENDER || '';

export const EXPIRE_TOKEN_PASSWORD_IN_DAYS: any = process.env.EXPIRE_TOKEN_PASSWORD_IN_DAYS || 1;
export const EXPIRE_TOKEN_PASSWORD_IN_SECONDS = 60 * 60 * 24 * EXPIRE_TOKEN_PASSWORD_IN_DAYS;

export const SESSION_TTL_IN_DAYS = process.env.SESSION_TTL_IN_DAYS || 30;

export const COOKIE_OPTIONS: () => CookieOptions = () => ({
  path: '/',
  expires: new Date(Date.now() + DAY_IN_MILLI * +SESSION_TTL_IN_DAYS),
  sameSite: 'none',
  secure: true
});
