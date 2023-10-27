import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageResponse } from 'src/app/models/message-response';

@Component({
  selector: 'app-dialog-information-wrapper',
  templateUrl: './dialog-information-wrapper.component.html',
  styleUrls: ['./dialog-information-wrapper.component.scss']
})
export class DialogInformationWrapperComponent implements OnInit {
message:MessageResponse;
  constructor(public dialogRef: MatDialogRef<DialogInformationWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message=data;
    }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
}
