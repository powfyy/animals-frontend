import { AnimalTypeService } from 'src/app/services/animal/animaType.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalTypeDto } from 'src/app/models/animal/AnimalType';
import { PageEvent } from '@angular/material/paginator';
import { AttributeDto } from 'src/app/models/AttributeDto';
import { AttributeService } from 'src/app/services/attribute.service';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import { AttributeEditDialogWrapperComponent } from '../attribute-edit-dialog-wrapper/attribute-edit-dialog-wrapper.component';
import { AnimalTypeEditDialogWrapperComponent } from '../animal-type-edit-dialog-wrapper/animal-type-edit-dialog-wrapper.component';

@Component({
  selector: 'app-animal-type-settings',
  templateUrl: './animal-type-settings.component.html',
  styleUrls: ['./animal-type-settings.component.scss']
})
export class AnimalTypeSettingsComponent implements OnInit {

  animalTypes: AnimalTypeDto[] = [];
  animalTypesDisplayedColumns: string[] = ["action", "name", "priority", "attributes"]

  typePage: number = 0;
  typeSize: number = 10;
  typeTotalElements: number = 0;

  attributes: AttributeDto[] = [];
  attributeDisplayedColumns: string[] = ["action", "name", "priority", "values"]

  attributePage: number = 0;
  attributeSize: number = 10;
  attributeTotalElements: number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private animalTypeService: AnimalTypeService,
    private attributeService: AttributeService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
      this.animalTypes = data.content;
      this.typeTotalElements = data.totalElements;
    })
    this.attributeService.getAll(this.typePage, this.typeSize).subscribe(data => {
      this.attributes = data.content;
      this.attributeTotalElements = data.totalElements;
    })
  }

  createType() {
    const dialog = this.dialog.open(AnimalTypeEditDialogWrapperComponent, {
      width: '45vw',
      data: {
        model: new AnimalTypeDto(),
        attributes: this.attributes
      },
      autoFocus: false,
    });

    dialog.afterClosed().subscribe(() => {
      this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
        this.animalTypes = data.content;
      });
    });
  }

  editType(name: string): void {
    const animalType = this.animalTypes.find(type => type.name === name);
    if (!animalType) {
      console.warn(`Вид с названием "${name}" не найден`);
      return;
    }
    this.attributeService.getAll(0, 1000).subscribe(data => {

    const dialog = this.dialog.open(AnimalTypeEditDialogWrapperComponent, {
      width: '45vw',
      data: {
        model: animalType,
        attributes: data.content
      },
      autoFocus: false,
    });

    dialog.afterClosed().subscribe(() => {
      this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
        this.animalTypes = data.content;
      });
    });
    })

  }


  getTruncatedAttributes(attributes: { [key: string]: Set<string> }): string {
    const names = Object.keys(attributes);
    const joined = names.join(', ');
    return joined.length > 70 ? joined.slice(0, 70) + '…' : joined;
  }

  typePageLoad(event: PageEvent): void {
    this.typePage = event.pageIndex;
    this.typeSize = event.pageSize;
    this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
      this.animalTypes = data.content;
    })
  }

  typeDrop(event: CdkDragDrop<AnimalTypeDto[]>) {
    moveItemInArray(this.animalTypes, event.previousIndex, event.currentIndex);

    const offset = this.typePage * this.typeSize;

    this.animalTypes.forEach((item, index) => {
      item.priority = offset + index + 1;
    });

    this.animalTypeService.updatePriorities(this.animalTypes).subscribe(() => {
      this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
        this.animalTypes = data.content;
        this.typeTotalElements = data.totalElements;
      });
    });
  }

  deleteType(name: string) {
    this.animalTypeService.delete(name).subscribe(() => {
      this.animalTypeService.getAll(this.typePage, this.typeSize).subscribe(data => {
        this.animalTypes = data.content;
        this.typeTotalElements = data.totalElements;
      });
    });
  }

  attributePageLoad(event: PageEvent): void {
    this.attributePage = event.pageIndex;
    this.attributeSize = event.pageSize;
    this.attributeService.getAll(this.attributePage, this.attributeSize).subscribe(data => {
      this.attributes = data.content;
    })
  }

  createAttribute(): void {
    const dialog = this.dialog.open(AttributeEditDialogWrapperComponent, {
      width: '35vw',
      data: new AttributeDto(),
      autoFocus: false,
    });
    dialog.afterClosed().subscribe(() => {
      this.attributeService.getAll(this.attributePage, this.attributeSize).subscribe(data => {
        this.attributes = data.content;
      })
    });
  }

  editAttribute(name: string): void {
    const attribute = this.attributes.find(attr => attr.name === name);
    if (!attribute) {
      console.warn(`Атрибут с именем "${name}" не найден`);
      return;
    }
    const dialog = this.dialog.open(AttributeEditDialogWrapperComponent, {
      width: '35vw',
      data: attribute,
      autoFocus: false,
    });
    dialog.afterClosed().subscribe(() => {
      this.attributeService.getAll(this.attributePage, this.attributeSize).subscribe(data => {
        this.attributes = data.content;
      })
    });
  }

  deleteAttribute(name: string) {
    this.attributeService.delete(name).subscribe(() => {
      this.attributeService.getAll(this.attributePage, this.attributeSize).subscribe(data => {
        this.attributes = data.content;
      })
    });
  }

  getTruncatedAttributeValues(values: string[]): string {
    const result = values.join(', ');
    return result.length > 70 ? result.slice(0, 70) + '…' : result;
  }

  attributeDrop(event: CdkDragDrop<AttributeDto[]>) {
    moveItemInArray(this.attributes, event.previousIndex, event.currentIndex);

    const offset = this.attributePage * this.attributeSize;

    this.attributes.forEach((item, index) => {
      item.priority = offset + index + 1;
    });

    this.attributeService.updatePriorities(this.attributes).subscribe(() => {
      this.attributeService.getAll(this.attributePage, this.attributeSize).subscribe(data => {
        this.attributes = data.content;
        this.attributeTotalElements = data.totalElements;
      });
    });
  }

}
