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

  signin(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>("/api/login", credentials, httpOptions);
  }

  signupUser(info: SignupUserInfo): Observable<string> {
    return this.http.post<string>("/api/signup/user", info, httpOptions);
  }

  signupOrg(info: SignupOrgInfo): Observable<string> {
    return this.http.post<string>("/api/signup/organization", info, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
