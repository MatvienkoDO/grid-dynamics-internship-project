import { CookieOptions } from 'express';

import { mode, Mode } from '../../environment';

const isInProd = mode === Mode.Production;

export const userIdCookieOptions: CookieOptions = {
  maxAge: 30 * 60 * 1000, // 30 mins
  secure: isInProd,
  httpOnly: true,
  signed: true,
  sameSite: isInProd ? 'None' : 'Lax',
};

export const userIdCookieKey = 'USER_ID';
