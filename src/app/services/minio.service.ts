import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinioService {
  getImage(petId:number, petType:string, photoRef:string):Observable<Blob>{
    petType = petType.toLowerCase();
    return this.http.get(`http://localhost:9000/${petId}-${petType}/${photoRef}`, { responseType: 'blob' });
  }
  constructor(private http: HttpClient){};
}
