import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-dialog-wrapper',
  templateUrl: './request-dialog-wrapper.component.html',
  styleUrls: ['./request-dialog-wrapper.component.scss']
})
export class RequestDialogWrapperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestDialogWrapperComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  goChat(): void {
    this.dialogRef.close();
    this.router.navigate(["chat"]);
  }
}
