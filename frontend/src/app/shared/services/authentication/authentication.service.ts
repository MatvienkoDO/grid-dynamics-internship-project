import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models';
import { apiHost } from 'src/environments/environment';
import { signupDto } from '../../models/dto/signup.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User|null>;
  public currentUser: Observable<User|null>;

  constructor(
    private readonly http: HttpClient,
  ) {
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
    const address = `${apiHost}/api/auth/login`;
    const body = { email, password };
    const options = { withCredentials: true };

    return this.http.post<any>(address, body, options)
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  public logout() {
    const address = `${apiHost}/api/auth/logout`;
    const options = { withCredentials: true };

    return this.http.post<any>(address, {}, options)
      .subscribe(v => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      });
  }

  public signup(signupDto: signupDto) {
    const url = `${apiHost}/api/auth/signup`;
    const body = {
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      email: signupDto.email,
      password: signupDto.password,
    };
    const options = { withCredentials: true };

    return this.http.post<any>(url, body, options).pipe(map(user => {
      if (user.status === 'error') {
        return user;
      } else if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }
}
