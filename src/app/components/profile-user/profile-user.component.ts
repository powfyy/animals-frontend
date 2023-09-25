import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogEditWrapperComponent } from './dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  errorMessageLogin='';
  role: string = 'USER';
  name:string='Имя';
  lastname:string='Фамилия';
  phoneNumber:string = '79999999999';
  login:string='username';
  constructor(private router: Router, public dialog: MatDialog) { }

  userInfo:any={
    name:'Имя',
  lastname:'Фамилия',
  phoneNumber: '79999999999'
  }

  ngOnInit() {

  }

  onSubmit() {
    }

  editInfo(){
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
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

  }
  isAuthenticatedUser(){
    if(this.role==='USER'){
      return true;
    }
    return false;
  }
}
