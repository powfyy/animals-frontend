import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinioService {

  private readonly BUCKET_PREFIX: string = 'animal-';

  getImage(animalId:number, photoRef:string):Observable<Blob>{
    return this.http.get(`http://localhost:9000/${this.BUCKET_PREFIX}${animalId}/${photoRef}`, { responseType: 'blob' });
  }
  constructor(private http: HttpClient){};
}
