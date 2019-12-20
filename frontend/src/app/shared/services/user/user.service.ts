import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from '../../models';
import { apiHost } from 'src/environments';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getMe(): Observable<User> {
    const url = `${apiHost}/api/users/me`;

    return this.http.get<Response<User>>(url, { withCredentials: true })
      .pipe(map(response => {
        if (response && response.payload) {
          return response.payload;
        }

        throw {
          message: 'incorrect response',
          payload: response,
        };
      }));
  }
}
