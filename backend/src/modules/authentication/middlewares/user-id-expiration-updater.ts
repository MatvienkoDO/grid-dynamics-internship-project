import { Request, Response, NextFunction } from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../../../shared/constants';

export function userIdExpirationUpdater(request: Request, response: Response, next: NextFunction) {
  const userIdCookieValue = request.signedCookies[userIdCookieKey];
  
  if (userIdCookieValue) {
    response.cookie(userIdCookieKey, userIdCookieValue, userIdCookieOptions);
  } else if (userIdCookieValue === false) {
    // It is case of incorrect signature
    // Just clear the fake cookie away
    response.clearCookie(userIdCookieKey);
  }

  next();
}
