import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models';
import { apiHost } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getMe(): Observable<User> {
    const url = `${apiHost}/api/users/me`;
    return this.http.get<User>(url, { withCredentials: true });
  }

}
