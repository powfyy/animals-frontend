import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationShortDto } from '../models/organization/OrganizationShortDto';
import { Observable, throwError } from 'rxjs';
import { OrganizationDto } from '../models/organization/OrganizationDto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "/api/organization"

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrganizationShortDto[]> {
    return this.http.get<OrganizationShortDto[]>(url, httpOptions);
  }

  getByUsername(username:string|null): Observable<OrganizationDto> {
    if(username === null) {
      return throwError(() => new Error('Username is required'));
    }
    return this.http.get<OrganizationDto>(`${url}/${username}`, httpOptions)
  }

  update(org:OrganizationDto):Observable<OrganizationDto>{
    return this.http.put<OrganizationDto>(url, org, httpOptions);
  }

  delete():Observable<void>{
    return this.http.delete<void>(url, httpOptions);
  }
}
