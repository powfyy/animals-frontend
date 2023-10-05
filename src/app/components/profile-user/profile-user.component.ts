import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  errorMessageLogin='';
  constructor(private router: Router, public dialog: MatDialog, private tokenStorageService:TokenStorageService) { }

  userInfo:any={
  name:'Имя',
  lastname:'Фамилия',
  phoneNumber: '79999999999',
  role: 'USERs',
  login:'username',
  }

  ngOnInit() {

  }

  onSubmit() {
    }

  editInfo(){
    const dialogEdit = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: this.userInfo
    });
    // dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
    //   if(result != null) {
    //     console.log("adding new student: " + result.fio);
    //     this.baseService.addNewStudent(result).subscribe(k=>
    //       this.baseService.getAllStudents().subscribe(data => this.dataSource.data = data));
    //   }
    // });
  }
  deleteAccount(){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этот аккаунт?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        console.log("delete account");
      }
      else{

      }
    })
  }
  isAuthenticatedUser(){

    if(this.tokenStorageService.getAuthorities()==="USER"){
      return true;
    }
    return false;
  }
}
