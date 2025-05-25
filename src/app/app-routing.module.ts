import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { SignupOrgComponent } from './components/signup-org/signup-org.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { PetPageComponent } from './components/petpage/petpage.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { AnimalTypeSettingsComponent } from './components/admin-panel/animal-type-settings/animal-type-settings.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',component: HomePageComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signup/user',component: SignupComponent},
  {path: 'signup/organization',component: SignupOrgComponent},
  {path: 'about',component: AboutComponent},
  {path: 'profile',component: ProfileUserComponent},
  {path: 'home/:animalId',component: PetPageComponent},
  {path: 'chat',component: ChatPageComponent},
  {path: 'chat/:chatId',component: MessagePageComponent},
  {path: 'animal-type-settings',component: AnimalTypeSettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
