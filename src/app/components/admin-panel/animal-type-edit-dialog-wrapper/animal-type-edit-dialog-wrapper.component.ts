import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AnimalTypeService } from 'src/app/services/animal/animaType.service';
import { AttributeDto } from 'src/app/models/AttributeDto';
import { AnimalTypeDto } from 'src/app/models/animal/AnimalType';

@Component({
  selector: 'app-animal-type-edit-dialog-wrapper',
  templateUrl: './animal-type-edit-dialog-wrapper.component.html',
  styleUrls: ['./animal-type-edit-dialog-wrapper.component.scss'],
})
export class AnimalTypeEditDialogWrapperComponent implements OnInit {
  animalType: AnimalTypeDto = new AnimalTypeDto();
  allAttributes: AttributeDto[] = [];

  selectedAttributes: AttributeDto[] = [];
  availableAttributes: AttributeDto[] = [];

  selectedAttributeValues: { [key: string]: string[] } = {};
  activeAttributeName: string | null = null;
  isReadOnlyValuesView: boolean = false;

  attributeValidationErrors: { [key: string]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<AnimalTypeEditDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { model: AnimalTypeDto; attributes: AttributeDto[] },
    private animalTypeService: AnimalTypeService
  ) {
    this.animalType = data.model ? { ...data.model } : new AnimalTypeDto();
    if (!this.animalType.attributes) {
      this.animalType.attributes = {};
    }
    this.allAttributes = data.attributes ? [...data.attributes] : [];
  }

  ngOnInit(): void {
    const selectedIds = Object.keys(this.animalType.attributes || {});
    this.selectedAttributes = this.allAttributes.filter(attr => (attr.name in this.animalType.attributes))
    this.availableAttributes = this.allAttributes.filter(attr => !(attr.name in this.animalType.attributes))

    selectedIds.forEach((attrName) => {
      this.selectedAttributeValues[attrName] = [
        ...(this.animalType.attributes[attrName] || []),
      ];
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.attributeValidationErrors = {};
    let hasErrors = false;

    const attributesObj: { [key: string]: string[] } = {};
    this.selectedAttributes.forEach((attr) => {
      const values = this.selectedAttributeValues[attr.name] || [];
      if (values.length === 0) {
        this.attributeValidationErrors[attr.name] = true;
        hasErrors = true;
      } else {
        attributesObj[attr.name] = values;
      }
    });

    if (hasErrors) {
      return;
    }
    this.animalType.attributes = attributesObj;
    this.animalTypeService.save(this.animalType).subscribe(() => {
      this.close();
    });
  }


  drop(event: CdkDragDrop<AttributeDto[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const movedAttr = event.container.data[event.currentIndex];
    this.selectedAttributeValues[movedAttr.name] = [];
    this.activeAttributeName =
      this.selectedAttributes.find(attr => attr.name === movedAttr.name) ? movedAttr.name : ''
  }

  onAttributeClick(attrName: string, isReadonly: boolean): void {
    if (this.attributeValidationErrors[attrName]) {
      delete this.attributeValidationErrors[attrName];
    }

    if (this.activeAttributeName === attrName) {
      this.activeAttributeName = null;
      return;
    }

    this.activeAttributeName = attrName;
    this.isReadOnlyValuesView = isReadonly;
  }

  get activeAttribute(): AttributeDto | null {
    return this.allAttributes.find(attr => attr.name === this.activeAttributeName) || new AttributeDto();
  }

  toggleAttributeValue(attrName: string, value: string): void {
    const values = this.selectedAttributeValues[attrName] || [];
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    this.selectedAttributeValues[attrName] = values;
  }

  isValueSelected(attrName: string, value: string): boolean {
    return this.selectedAttributeValues[attrName]?.includes(value);
  }
}
