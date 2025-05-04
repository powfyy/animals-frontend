import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, raceWith } from 'rxjs';
import { Pet } from '../models/pet';
import { User } from '../models/user';
import { MessageResponse } from '../models/message-response';
import { FilterFields } from '../models/filter-fields';

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
  getFilteredPets(filterFields:FilterFields, page:number, size:number):Observable<any>{
    if(filterFields.city==''||filterFields.city==undefined){
      filterFields.city=null;
    }
    if(filterFields.gender=='all'){
      filterFields.gender=null;
    }
    if(filterFields.name==''){
      filterFields.name=null;
    }
    if(filterFields.organizationName==''||filterFields.organizationName==undefined){
      filterFields.organizationName= null;
    }
    if(filterFields.type=='all'){
      filterFields.type=null;
    }
    return this.http.post<any>(`/api/home/pets?page=${page}&size=${size}`,filterFields,httpOptions);
  }
  getPet(petId:string|null):Observable<Pet>{
    return this.http.get<Pet>(`/api/home/pets/${petId}`, httpOptions);
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
