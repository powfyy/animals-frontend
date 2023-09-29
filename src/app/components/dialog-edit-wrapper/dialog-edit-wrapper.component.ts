import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.scss']
})
export class DialogEditWrapperComponent implements OnInit {

  editingStudent: any;
  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     //this.editingStudent=new Student();
     }

  ngOnInit(): void {
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  isOrg(){
    if(this.data.role==="ORG"){
      return true;
    }
    return false;
  }
}
