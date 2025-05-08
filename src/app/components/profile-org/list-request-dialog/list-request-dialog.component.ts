import { PetService } from './../../../services/pet.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pet } from 'src/app/models/pet';
import { User } from 'src/app/models/user';
import { DialogInformationWrapperComponent } from '../../dialog-information-wrapper/dialog-information-wrapper.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-request-dialog',
  templateUrl: './list-request-dialog.component.html',
  styleUrls: ['./list-request-dialog.component.scss']
})
export class ListRequestDialogComponent implements OnInit {
pet:Pet;
users:User[];
  constructor(
    public dialogRef: MatDialogRef<ListRequestDialogComponent>,
    private petService:PetService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.pet = data;
  }

  ngOnInit(): void {
    this.petService.getUserRequsts(this.pet.id).subscribe(data=>{
      this.users=data;
    })
  }

  isThereRequest():boolean{
    if(this.users[0]){
      return true
    }
    this.dialogRef.updateSize("400px")
    return false;
  }

  adoptPet(username:string):void{
    this.petService.adoptPet(username, this.pet.id).subscribe(text=>{
      const dialogInfo = this.dialog.open(DialogInformationWrapperComponent,{
        width: '400px',
        data: text,
        autoFocus:false,
      })
      dialogInfo.afterClosed().subscribe(()=>{
        this.dialogRef.close();
      })
    });
  }

  deleteUser(username:string):void{
    this.petService.deleteUserRequest(username, this.pet.id).subscribe(text=>{
      const dialogInfo = this.dialog.open(DialogInformationWrapperComponent, {
        width:'400px',
        data: text,
        autoFocus:false,
      })
      dialogInfo.afterClosed().subscribe(()=>{
        this.petService.getUserRequsts(this.pet.id).subscribe(data=>{
          this.users=data;
        })
      })
    })
  }

  goChat(){
    this.dialogRef.close();
    this.router.navigate(["chat"])
  }
}
