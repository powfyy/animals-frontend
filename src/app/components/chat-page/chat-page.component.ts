import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  page: number = 0;
  size: number = 30;
  chats: Chat[] = [];

  loginErrorMessage = 'Войдите или зарегистрируйтесь, чтобы начать общение';

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.getChats(this.page, this.size).subscribe(data => {
      this.chats = data.content;
    })
  }

  isOrg(): boolean {
    if(this.tokenStorageService.getAuthorities()==="ORG"){
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    if(this.tokenStorageService.getToken()){
      return true
    }
    return false;
  }

  openChat(chatId: number) {
    this.router.navigate([`chat/${chatId}`]);
  }
}
