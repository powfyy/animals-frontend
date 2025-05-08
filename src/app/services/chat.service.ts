import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { Page } from '../models/Page';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getChats(page:number, size:number): Observable<Page<Chat>> {
    return this.http.get<Page<Chat>>(`/api/chat?page=${page}&size=${size}`, httpOptions);
  }

  getChatById(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`/api/chat/${chatId}`, httpOptions);
  }

  getMessages(chatId:number, page:number, size:number): Observable<Page<Message>>{
    return this.http.get<Page<Message>>(`/api/chat/message/${chatId}/?page=${page}&size=${size}`, httpOptions);
  }

  addMessage(message:Message): Observable<void>{
    return this.http.post<void>("/api/chat/message", message, httpOptions);
  }

  addRequestMessage(petId:number, userUsername:string, orgUsername:string): Observable<any>{
    return this.http.post<any>(`/api/chat?orgUsername=${orgUsername}&userUsername=${userUsername}&petId=${petId}`, httpOptions);
  }
}
