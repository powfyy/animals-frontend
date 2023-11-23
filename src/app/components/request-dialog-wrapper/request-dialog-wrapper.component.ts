import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-request-dialog-wrapper',
  templateUrl: './request-dialog-wrapper.component.html',
  styleUrls: ['./request-dialog-wrapper.component.scss']
})
export class RequestDialogWrapperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestDialogWrapperComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit(): void {
  }
  goChat(){
    this.dialogRef.close();
    const dialogAddingNewStudent = this.dialog.open(ChatComponent, {
      width: '1000px',
      data: null,
      autoFocus: false
    });
  }
}
