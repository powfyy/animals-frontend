import { Injectable } from '@angular/core';
import { JwtResponse } from '../models/jwt-response';
import { LoginInfo } from '../models/login-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupUserInfo } from '../models/signupUser-info';
import { SignupOrgInfo } from '../models/signupOrg-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'http://localhost:8080/login';
  private signupUserUrl = 'http://localhost:8080/signup/user';
  private signupOrgUrl = 'http://localhost:8080/signup/organization'

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUpUser(info: SignupUserInfo): Observable<string> {
    return this.http.post<string>(this.signupUserUrl, info, httpOptions);
  }

  signUpOrg(info: SignupOrgInfo): Observable<string> {
    return this.http.post<string>(this.signupOrgUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
