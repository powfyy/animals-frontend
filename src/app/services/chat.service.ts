import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>("/api/chats", httpOptions);
  }

  getMessages(chatId:number, page:number, size:number): Observable<any>{
    return this.http.get<any>(`/api/chats/messages/${chatId}/?page=${page}&size=${size}`, httpOptions);
  }

  addMessage(message:Message): Observable<any>{
    return this.http.post<any>("/api/chats/messages", message, httpOptions);
  }

  addRequestMessage(petId:number, userUsername:string, orgUsername:string): Observable<any>{
    return this.http.post<any>(`/api/chats?orgUsername=${orgUsername}&userUsername=${userUsername}&petId=${petId}`, httpOptions);
  }
}
