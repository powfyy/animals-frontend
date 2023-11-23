import { Chat } from './../../models/chat';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats:Chat[]=[];
  messages: Message[]=[];
  selectedChat:Chat;
  form:any = {};
  constructor(public dialogRef: MatDialogRef<ChatComponent>,
    private chatService:ChatService,
    private tokenStorageService:TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit(): void {
    this.loadData();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  loadData(): void{
    this.chatService.getAllChats().subscribe((data) => {
      this.chats = data;
    })
  }
  loadMessages(chatId:number): void{
    this.chatService.getMessages(chatId).subscribe((data) => {
      this.messages = data;
    })
  }
  isOrg(): boolean{
    if(this.tokenStorageService.getAuthorities()==="ORG"){
      return true;
    }
    return false;
  }

  selectChat(chat:Chat): void{
    this.loadMessages(chat.id);
    this.selectedChat = chat;
  }

  isMyMessage(message:Message): boolean{
    if(this.tokenStorageService.getUsername()===message.organizationUsername && this.isOrg()){
      return true;
    }
    else if(this.tokenStorageService.getUsername()===message.userUsername && !this.isOrg()){
      return true;
    }
    return false;
  }

  toLocaleDate(date:string): string{
    const dateTimeObj = new Date(date);
    return dateTimeObj.toLocaleDateString()+'  '+dateTimeObj.toLocaleTimeString();
  }

  sendMessage(): void{
    if(this.form.text===undefined|| this.form.text ===''||this.form === null){
      return;
    }
    let newMessage:Message = new Message();
    newMessage.chatId = this.selectedChat.id;
    newMessage.message = this.form.text;
    const date = new Date();
    newMessage.date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    console.log(newMessage.date);
    const username = this.tokenStorageService.getUsername();
    if(this.isOrg() && username !== null){
      newMessage.organizationUsername = username;
    }
    else if(username !== null){
      newMessage.userUsername = username;
    }
    this.chatService.addMessage(newMessage).subscribe(() => {
      this.loadMessages(this.selectedChat.id);
    });
    this.form.text = null;
  }
}
