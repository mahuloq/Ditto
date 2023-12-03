import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  kind:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  apiKey = 'AIzaSyDIVVW0j9RT0xUJoZJkHtJlYq2nyjF7gp4';
  authEndPoint ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.authEndPoint+this.apiKey , {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
