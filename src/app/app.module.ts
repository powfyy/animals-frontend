import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { SignupOrgComponent } from './components/signup-org/signup-org.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfileOrgComponent } from './components/profile-org/profile-org.component';
import { DialogEditWrapperComponent } from './components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { ChatComponent } from './components/chat/chat.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddPetDialogWrapperComponent } from './components/add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';
import { ListRequestDialogComponent } from './components/profile-org/list-request-dialog/list-request-dialog.component';
import { DialogInformationWrapperComponent } from './components/dialog-information-wrapper/dialog-information-wrapper.component';
import { EditPetDialogWrapperComponent } from './components/edit-pet-dialog-wrapper/edit-pet-dialog-wrapper.component';

import { httpInterceptorProviders } from './services/auth-interceptor';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { PetPageComponent } from './components/petpage/petpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestDialogWrapperComponent } from './components/request-dialog-wrapper/request-dialog-wrapper.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    SignupOrgComponent,
    NavigationMenuComponent,
    ProfileUserComponent,
    ProfileOrgComponent,
    DialogEditWrapperComponent,
    ChatComponent,
    DeleteConfirmDialogComponent,
    AddPetDialogWrapperComponent,
    ListRequestDialogComponent,
    DialogInformationWrapperComponent,
    EditPetDialogWrapperComponent,
    PetPageComponent,
    FooterComponent,
    RequestDialogWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
