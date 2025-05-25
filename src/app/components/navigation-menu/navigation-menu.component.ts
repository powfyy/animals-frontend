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

  isAuthenticated(): boolean {
    if(this.tokenStorageService.getToken()){
      return true
    }
    return false;
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.tokenStorageService.getAuthorities() === 'ADMIN';
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['home']);
  }

  goHome(): void {
    this.router.navigate(['home']);
  }

  goChatPage(): void {
    this.router.navigate(['chat']);
  }

  goProfilePage(): void {
    if(this.isAuthenticated()) {
      this.router.navigate(['profile']);
    } else {
      this.router.navigate(['login'])
    }
  }

  goAbout(): void {
    this.router.navigate(['about']);
  }

  goAnimalTypeSettings(): void {
    this.router.navigate(['animal-type-settings']);
  }
}
