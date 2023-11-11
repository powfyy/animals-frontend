import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { SignupOrgComponent } from './components/signup-org/signup-org.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { PetPageComponent } from './components/petpage/petpage.component';




const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',component: HomePageComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signup/user',component: SignupComponent},
  {path: 'signup/organization',component: SignupOrgComponent},
  {path: 'about',component: AboutComponent},
  {path: 'profile',component: ProfileUserComponent},
  {path: 'home/:petId',component: PetPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
