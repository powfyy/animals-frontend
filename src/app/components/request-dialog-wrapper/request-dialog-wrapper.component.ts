import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-dialog-wrapper',
  templateUrl: './request-dialog-wrapper.component.html',
  styleUrls: ['./request-dialog-wrapper.component.scss']
})
export class RequestDialogWrapperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
}
