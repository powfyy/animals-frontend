import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
  goHome(){
    this.router.navigate(['home']);
  }
  goChatPage() {
    this.router.navigate(['chat']);
  }
  goProfilePage() {
    this.router.navigate(['profile']);
  }
  goAbout(){
    this.router.navigate(['about']);
  }
}
