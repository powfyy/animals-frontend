import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { AnimalDto } from '../models/animal/AnimalDto';
import { AnimalSaveDto } from '../models/animal/AnimalSaveDto';
import { AnimalFilterDto } from '../models/animal/AnimalFilterDto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "/animal"

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  constructor(private http:HttpClient) { }

  getAll(page:number, size:number): Observable<Page<AnimalDto>> {
    return this.http.get<Page<AnimalDto>>(`${url}?page=${page}&size=${size}`, httpOptions);
  }

  getById(id:number): Observable<AnimalDto> {
    return this.http.get<AnimalDto>(`${url}/${id}`, httpOptions)
  }

  search(filter: AnimalFilterDto): Observable<Page<AnimalDto>> {
    return this.http.post<Page<AnimalDto>>(`${url}/filter`, filter, httpOptions)
  }

  create(animal:AnimalSaveDto): Observable<AnimalDto> {
    return this.http.post<AnimalDto>(`${url}`, animal, httpOptions)
  }

  update(animal:AnimalSaveDto): Observable<AnimalDto> {
    return this.http.put<AnimalDto>(`${url}`, animal, httpOptions)
  }

  delete(id:number) {
    return this.http.delete<void>(`${url}/${id}`, httpOptions)
  }

  savePhoto(id: number, file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<void>(`${url}/photo/${id}`, formData);
  }

  deletePhoto(id: number, photoRef: string): Observable<void> {
    return this.http.delete<void>(`${url}/photo/${id}?photoRef=${photoRef}`, httpOptions);
  }
}
