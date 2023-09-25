import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  IsAuthenticated:boolean = true;
  constructor(private router:Router) { }

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
}
