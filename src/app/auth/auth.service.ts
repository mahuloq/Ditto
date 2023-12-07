import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { LocalizedString } from '@angular/compiler';

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

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}
  apiKey = 'AIzaSyDIVVW0j9RT0xUJoZJkHtJlYq2nyjF7gp4';
  signupEndPoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  loginEndPoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  // user = new Subject<User>()

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
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
        })
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

        // tap((resData) => {
        //   const expirationDate = new Date(
        //     new Date().getTime() + +resData.expiresIn * 1000
        //   );
        //   const user = new User(
        //     resData.email,
        //     resData.localId,
        //     resData.idToken,
        //     expirationDate
        //   );
        //   this.user.next(user);
        // })
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
    this.user.next(user);
  }
}
