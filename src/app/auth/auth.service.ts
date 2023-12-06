import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
interface LoginResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
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
              errorMessage = 'You\'ve already signed up!';
          }
          return throwError(errorMessage);
        })
      );
  }
  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(this.loginEndPoint + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
