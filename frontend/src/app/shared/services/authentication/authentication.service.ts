import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models';
import { apiHost } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User|null>;
  public currentUser: Observable<User|null>;

  constructor(private http: HttpClient) {
    const userFromLocalStorage = localStorage.getItem('currentUser');
    if (userFromLocalStorage) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userFromLocalStorage));  
    } else {
      this.currentUserSubject = new BehaviorSubject<User|null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User|null {
      return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
      return this.http.post<any>(`${apiHost}/api/auth/login`, { email, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  public logout() {
    return this.http.post<any>(`${apiHost}/api/auth/logout`, {})
        .subscribe(v => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        });
      // remove user from local storage to log user out
  }
}
