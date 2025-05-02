import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/Page';
import { AnimalDto } from '../../models/animal/AnimalDto';
import { AnimalTypeDto } from 'src/app/models/animal/AnimalType';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "/api/animal/type"

@Injectable({
  providedIn: 'root'
})

export class AnimalTypeService {

  constructor(private http:HttpClient) { }

  getAll(page:number, size:number): Observable<Page<AnimalTypeDto>> {
    return this.http.get<Page<AnimalTypeDto>>(`${url}?page=${page}&size=${size}`, httpOptions);
  }

  getById(id:number): Observable<AnimalDto> {
    return this.http.get<AnimalDto>(`${url}/${id}`, httpOptions)
  }

  save(type:AnimalTypeDto): Observable<AnimalTypeDto> {
    return this.http.post<AnimalTypeDto>(`${url}`, type, httpOptions)
  }

  delete(name:string) {
    return this.http.delete<void>(`${url}/${name}`, httpOptions)
  }
}
