import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { apiHost } from 'src/environments/environment';
import { User } from '../../models';
import { signupDto } from '../../models/dto/signup.dto';
import { LocalizationService } from '../localization/localization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User|null>;
  public currentUser: Observable<User|null>;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private readonly localizationService: LocalizationService
  ) {
    let userFromLocalStorage: string|null = null;
    if (isPlatformBrowser(this.platformId)) {
      userFromLocalStorage = localStorage.getItem('currentUser');
    }
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
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          this.localizationService.setLocale(user.locale);
        }

        return user;
      }));
  }

  public logout() {
    const address = `${apiHost}/api/auth/logout`;
    const options = { withCredentials: true };

    return this.http.post<any>(address, {}, options)
      .subscribe(v => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('currentUser');
        }
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
      locale: this.localizationService.getLocale(),
    };
    const options = { withCredentials: true };

    return this.http.post<any>(url, body, options).pipe(map(user => {
      if (user.status === 'error') {
        return user;
      } else if (user) {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }
}
