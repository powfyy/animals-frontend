import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUser():Observable<User>{
    return this.http.get<User>('/api/profile/user', httpOptions);
  }
  updateUser(user:User):Observable<any>{
    return this.http.put('/api/profile/user', user, httpOptions);
  }
  deleteUser():Observable<any>{
    return this.http.delete('/api/profile/user',httpOptions);
  }
  sendRequest(petId:number):Observable<any>{
    return this.http.post(`/api/home/pets/${petId}`,httpOptions);
  }
  checkRequest(petId:number):Observable<any>{
    return this.http.get<any>(`/api/home/pets/${petId}/request`, httpOptions);
  }
}
