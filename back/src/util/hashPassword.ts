import crypto from 'crypto';
import { PASSWORD_SALT } from '../config';

export const hashPassword = (password: string) =>
  crypto.createHmac('SHA256', PASSWORD_SALT).update(password).digest('base64');
