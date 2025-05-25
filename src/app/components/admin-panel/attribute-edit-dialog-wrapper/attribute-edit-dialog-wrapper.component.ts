import { AttributeService } from './../../../services/attribute.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeDto } from 'src/app/models/AttributeDto';

@Component({
  selector: 'app-attribute-edit-dialog-wrapper',
  templateUrl: './attribute-edit-dialog-wrapper.component.html',
  styleUrls: ['./attribute-edit-dialog-wrapper.component.scss']
})
export class AttributeEditDialogWrapperComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  attribute: AttributeDto = new AttributeDto();
  newValue: string

  constructor(
    public dialogRef: MatDialogRef<AttributeEditDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttributeDto,
    private attributeService: AttributeService,
  ) {
    this.attribute = data ? { ...data } : new AttributeDto();
    if (!this.attribute.values) {
      this.attribute.values = [];
    }
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  addValue(value: string): void {
    const trimmedValue = value?.trim();
    if (trimmedValue && !this.attribute.values.includes(trimmedValue)) {
      this.attribute.values.push(trimmedValue);
    }
    if (this.newValue) {
      this.newValue = '';
    }
  }

  removeValue(value: string): void {
    const index = this.attribute.values.indexOf(value);
    if (index >= 0) {
      this.attribute.values.splice(index, 1);
    }
  }

  get valuesArray(): string[] {
    return Array.from(this.attribute.values);
  }

  save(): void {
    this.attributeService.save(this.attribute).subscribe(() => {
      this.close();
    })
  }

}
