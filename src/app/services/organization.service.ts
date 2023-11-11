import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../models/organization';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getCurrentOrganization(): Observable<Organization> {
    return this.http.get<Organization>("/api/profile/organization", httpOptions);
  }
  getAllOrganization():Observable<Organization[]>{
    return this.http.get<Organization[]>("api/home/organizations", httpOptions);
  }
  updateOrganization(org:Organization):Observable<Organization>{
    return this.http.put<Organization>("/api/profile/organization", org, httpOptions);
  }
  deleteOrganization():Observable<any>{
    return this.http.delete("/api/profile/organization", httpOptions);
  }
}
