import { Chat } from './../../models/chat';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
  pageMessages:number = 0;
  sizeMessages:number = 35;
  totalMessages:number = 0;
  pageChats:number = 0;
  sizeChats:number = 35;
  totalChats:number = 0;

  @ViewChild('chatBody') chatBody: ElementRef;

  constructor(public dialogRef: MatDialogRef<ChatComponent>,
    private chatService:ChatService,
    private tokenStorageService:TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  loadData(): void{
    this.chatService.getChats(this.pageChats, this.sizeChats).subscribe((data) => {
      this.chats = data.content;
      this.totalChats = data.totalElements;
    })
  }

  loadMessages(chatId:number): void{
    this.chatService.getMessages(chatId,this.pageMessages,this.sizeMessages).subscribe((data) => {
      this.messages = data.content;
      this.totalMessages = data.totalElements;
    })
  }

  uploadChats():void {
    this.pageChats++;
    this.chatService.getChats(this.pageChats, this.sizeChats).subscribe((data) => {
      data.content.forEach((element:Chat) => {
        this.chats.push(element)
      });
      this.totalChats = data.totalElements;
    });
  }


  uploadMsg():void {
    this.pageMessages++;
    this.chatService.getMessages(this.selectedChat.id,this.pageMessages,this.sizeMessages).subscribe((data) => {
      data.content.forEach((element:Message) => {
        this.messages.push(element)
      });
      this.totalMessages = data.totalElements;
    });
  }


  handleScroll(): void {
    if (this.chatBody.nativeElement.scrollTop === 0) {
      this.pageMessages++;
      this.loadMessages(this.selectedChat.id);
    }
  }

  scrollToBottom(): void {
    if(this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
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
      this.pageMessages = 0;
      this.loadMessages(this.selectedChat.id);
    });
    this.form.text = null;
  }
}
