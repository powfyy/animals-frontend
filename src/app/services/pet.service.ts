import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, raceWith } from 'rxjs';
import { Pet } from '../models/pet';
import { User } from '../models/user';
import { MessageResponse } from '../models/message-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsForFormData = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
}
@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http:HttpClient) { }

  getAllPets():Observable<Pet[]>{
    return this.http.get<Pet[]>("/api/profile/organization/pets", httpOptions );
  }
  addPet(form:FormData):Observable<any>{
    return this.http.post("/api/profile/organization/pets", form);
  }
  deletePet(id:number):Observable<any>{
    return this.http.delete(`/api/profile/organization/pets/${id}`, httpOptions);
  }
  updateStatusPet(newStatus:string, petId:number):Observable<any>{
    return this.http.patch(`/api/profile/organization/pets/${petId}/status?newStatus=${newStatus}`, httpOptions)
  }
  updatePet(form:FormData, petId:number):Observable<any>{
    return this.http.put<any>(`/api/profile/organization/pets/${petId}`, form);
  }
  getUserRequsts(petId:number):Observable<User[]>{
    return this.http.get<User[]>(`/api/profile/organization/pets/${petId}/userRequest`,httpOptions);
  }
  adoptPet(username:string, petId:number):Observable<any>{
    return this.http.post<any>(`/api/profile/organization/pets/${petId}/adopt`, username, httpOptions);
  }
  deleteUserRequest(username:string, petId:number):Observable<MessageResponse>{
    return this.http.delete<MessageResponse>(`/api/profile/organization/pets/${petId}/delUserRequest?username=${username}`, httpOptions);
  }
}
