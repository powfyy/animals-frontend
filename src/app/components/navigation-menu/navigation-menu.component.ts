import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  IsAuthenticated:boolean = true;
  constructor(private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  isAuthenticated(){
    return this.IsAuthenticated;
  }
  logout(){
    this.IsAuthenticated=false;
    this.router.navigate(['home']);
  }
  goProfile(){
    this.router.navigate(['profile']);
  }
  goHome(){
    this.router.navigate(['home']);
  }
  goAbout(){
    this.router.navigate(['about']);
  }
  openChats(){
    const dialogAddingNewStudent = this.dialog.open(ChatComponent, {
      width: '1000px',
      data: null
    });
  }
}
