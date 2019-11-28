import { Request, Response, NextFunction } from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../common';

export function userIdExpirationUpdater(request: Request, response: Response, next: NextFunction) {
  const userIdCookieValue = request.signedCookies[userIdCookieKey];
  
  if (userIdCookieValue) {
    response.cookie(userIdCookieKey, userIdCookieValue, userIdCookieOptions);
  } else {
    response.clearCookie(userIdCookieKey);
  }

  next();
}
