import { User } from './../../models/user';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  errorMessage = '';
  errorMessageLogin='';
  user:User;
  constructor(private router: Router, public dialog: MatDialog, private tokenStorageService:TokenStorageService,
    private userService:UserService) { }

  ngOnInit() {
    if(this.tokenStorageService.getAuthorities()!=='ORG'){
      this.user = new User;
    this.loadData();
    }
  }
  loadData(){
    this.userService.getUser().subscribe((data)=>{
      this.user = data;
    })
  }
  onSubmit() {
    }

  editInfo(){
    const dialogEdit = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: this.user
    });
    dialogEdit.afterClosed().subscribe((result:User) => {
      this.userService.updateUser(result).subscribe(()=>{
      this.loadData();
      })
    });
  }
  deleteAccount(){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этот аккаунт?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        this.userService.deleteUser().subscribe(()=>{
          this.tokenStorageService.signOut();
          this.router.navigate(['home']);
        })
      }
    })
  }
  isAuthenticatedOrg(){
    if(this.tokenStorageService.getAuthorities()==="ORG"){
      return true;
    }
    return false;
  }
}
