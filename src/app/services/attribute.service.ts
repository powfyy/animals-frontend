import { AttributeDto } from './../models/AttributeDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "/api/attribute"

@Injectable({
  providedIn: 'root'
})

export class AttributeService {

  constructor(private http:HttpClient) { }

  getAll(page:number, size:number): Observable<Page<AttributeDto>> {
    return this.http.get<Page<AttributeDto>>(`${url}?page=${page}&size=${size}`, httpOptions);
  }

  getByName(name:string): Observable<AttributeDto> {
    return this.http.get<AttributeDto>(`${url}/${name}`, httpOptions)
  }

  save(attribute:AttributeDto): Observable<void> {
    return this.http.post<void>(`${url}`, attribute, httpOptions)
  }

  updatePriorities(attributes: AttributeDto[]): Observable<void> {
    return this.http.put<void>(`${url}/priority`, attributes, httpOptions)
  }

  delete(name:string) {
    return this.http.delete<void>(`${url}/${name}`, httpOptions)
  }
}
