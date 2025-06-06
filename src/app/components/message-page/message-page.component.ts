import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  page = 0;
  size = 100;
  chat!: Chat;
  newMessageText: string = '';
  groupedMessages: { date: Date; messages: Message[] }[] = [];
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const chatId = Number(this.route.snapshot.paramMap.get('chatId')!);

    this.chatService.getChatById(chatId).subscribe((response) => {
      this.chat = response;
      this.loadData();
      this.intervalId = setInterval(() => {
        this.loadData();
      }, 3000);
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadData(): void {
    this.chatService
      .getMessages(this.chat.id, this.page, this.size)
      .subscribe((response) => {
        this.groupMessagesByDate(response.content);
      });
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  groupMessagesByDate(messages: Message[]): void {
    const grouped: { [key: string]: Message[] } = {};

    for (const message of messages) {
      const date = new Date(message.date!);
      const dateKey = date.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    }

    this.groupedMessages = Object.keys(grouped)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((key) => ({
        date: new Date(key),
        messages: grouped[key],
      }));
  }

  isUser(): boolean {
    return this.tokenStorageService.getAuthorities() === 'USER';
  }

  sendMessage(): void {
    const newMsg = new Message();
    newMsg.chatId = this.chat.id;
    newMsg.message = this.newMessageText;
    debugger
    if(this.isUser()) {
      newMsg.userUsername = this.tokenStorageService.getUsername()!
    } else {
      newMsg.organizationUsername = this.tokenStorageService.getUsername()!
    }

    this.chatService.addMessage(newMsg).subscribe();
    this.newMessageText = ''
    this.loadData()
  }

  goChatPage(): void {
    this.router.navigate(['chat']);
  }
}
