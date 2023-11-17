import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.scss']
})
export class DialogEditWrapperComponent implements OnInit {
  user:User;
  organization: Organization;
  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,private tokenStorageService:TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
        if(this.isOrg()){
          this.organization = {...data};
        }
        else{
          this.user = {...data}
        }
      }

  ngOnInit(): void {

  }
  onNoClick(): void{
    this.dialogRef.close();
  }

  isOrg(){
    if(this.tokenStorageService.getAuthorities() ==="ORG"){
      return true;
    }
    return false;
  }

}
