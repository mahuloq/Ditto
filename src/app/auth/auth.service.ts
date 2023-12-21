import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  // kind: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  idToken: string;
}
interface LoginResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
interface resetResponseData {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}
  apiKey = 'AIzaSyDIVVW0j9RT0xUJoZJkHtJlYq2nyjF7gp4';
  signupEndPoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  loginEndPoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  passwordResetEndPoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=';




  // user = new Subject<User>()
getEmail() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData ? userData.email : null;
  setTimeout(this.getEmail,5000)
}





  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupEndPoint + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An Unknown Error has Occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = "You've already signed up!";
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDurtion =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDurtion);
    }
  }
  reset(requestType: string, email: string) {
    return this.http.post<resetResponseData>(
      this.passwordResetEndPoint + this.apiKey,
      {
        requestType: requestType,
        email: email,
      }
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(this.loginEndPoint + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An Unknown Error has Occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'INVALID_LOGIN_CREDENTIALS':
              errorMessage = 'Invalid Login';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log(user);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
