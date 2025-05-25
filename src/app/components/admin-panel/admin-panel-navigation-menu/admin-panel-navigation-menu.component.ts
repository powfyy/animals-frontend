import { TokenStorageService } from './../../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-navigation-menu',
  templateUrl: './admin-panel-navigation-menu.component.html',
  styleUrls: ['./admin-panel-navigation-menu.component.scss']
})
export class AdminPanelNavigationMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return !!this.tokenStorageService.getToken();
  }

  goAnimalTypeSettings() {
    this.router.navigate(['animal-type-settings']);
  }

  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
