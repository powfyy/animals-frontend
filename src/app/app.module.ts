import { NgModule, LOCALE_ID } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
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
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AnimalTypeSettingsComponent } from './components/admin-panel/animal-type-settings/animal-type-settings.component';
import { AdminPanelNavigationMenuComponent } from './components/admin-panel/admin-panel-navigation-menu/admin-panel-navigation-menu.component';
import { AttributeEditDialogWrapperComponent } from './components/admin-panel/attribute-edit-dialog-wrapper/attribute-edit-dialog-wrapper.component';
import { AnimalTypeEditDialogWrapperComponent } from './components/admin-panel/animal-type-edit-dialog-wrapper/animal-type-edit-dialog-wrapper.component';

registerLocaleData(localeRu);

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
    DeleteConfirmDialogComponent,
    AddPetDialogWrapperComponent,
    ListRequestDialogComponent,
    DialogInformationWrapperComponent,
    EditPetDialogWrapperComponent,
    PetPageComponent,
    FooterComponent,
    RequestDialogWrapperComponent,
    ChatPageComponent,
    MessagePageComponent,
    AnimalTypeSettingsComponent,
    AdminPanelNavigationMenuComponent,
    AttributeEditDialogWrapperComponent,
    AnimalTypeEditDialogWrapperComponent,
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
    MatChipsModule,
    MatRadioModule,
    MatDividerModule,
    MatTableModule,
    DragDropModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
