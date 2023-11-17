import { TokenStorageService } from './../../services/token-storage.service';
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
  constructor(private router:Router, public dialog: MatDialog, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
  isAuthenticated(){
    if(this.tokenStorageService.getToken()){
      return true
    }
    return false;
  }
  logout(){
    this.tokenStorageService.signOut();
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
      data: null,
      autoFocus: false
    });
  }
}
