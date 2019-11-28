import { CookieOptions } from 'express';

import { mode, Mode } from '../../environment';

export const userIdCookieOptions: CookieOptions = {
  maxAge: 30 * 60 * 1000, // 30 mins
  secure: mode === Mode.Production,
  httpOnly: true,
  signed: true,
};

export const userIdCookieKey = 'USER_ID';
