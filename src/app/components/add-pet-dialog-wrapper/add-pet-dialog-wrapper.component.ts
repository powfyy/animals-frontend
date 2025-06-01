import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AnimalDto } from 'src/app/models/animal/AnimalDto';
import { AnimalSaveDto } from 'src/app/models/animal/AnimalSaveDto';
import { AttributeDto } from 'src/app/models/AttributeDto';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AttributeService } from 'src/app/services/attribute.service';
import { MinioService } from 'src/app/services/minio.service';
import { EditPetDialogWrapperComponent } from '../edit-pet-dialog-wrapper/edit-pet-dialog-wrapper.component';
import { AnimalTypeDto } from 'src/app/models/animal/AnimalType';
import { AnimalTypeService } from 'src/app/services/animal/animaType.service';

@Component({
  selector: 'app-add-pet-dialog-wrapper',
  templateUrl: './add-pet-dialog-wrapper.component.html',
  styleUrls: ['./add-pet-dialog-wrapper.component.scss'],
})
export class AddPetDialogWrapperComponent implements OnInit {
  files: File[];
  formData = new FormData();
  animal: AnimalDto = new AnimalDto();
  animalAttributes: { [key: string]: string } = {};

  images: { name: string; url: SafeUrl } [] = [];
  currentImage: { name: string; url: SafeUrl } | undefined;
  toDeleteImageFileNames: string[] = [];

  availableAttributes: AttributeDto[] = []
  selectedAttribute: AttributeDto | null = null;

  animalTypes: AnimalTypeDto[] = []

  constructor(
    private animalService: AnimalService,
    private attributeService: AttributeService,
    private sanitizer: DomSanitizer,
    private minioService: MinioService,
    private animalTypeService: AnimalTypeService,
    private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<EditPetDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnimalDto
  ) {
    this.animal = { ...data };
    if (data.attributes) {
      this.animalAttributes = data.attributes;
    }
  }

  ngOnInit(): void {
    if(this.animal.photoRefs) {
      this.animal.photoRefs.forEach((el) => {
        this.minioService.getImage(this.animal.id, el).subscribe((blob) => {
          this.images.push({ name: el, url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)) });
          this.currentImage = this.images[0];
        });
      });
    }
    this.attributeService.getByTypeName(this.animal.type).subscribe((attributes) => {
      this.availableAttributes = attributes;
    })
    this.animalTypeService.getAll(0, 1000).subscribe((types) => {
      this.animalTypes = types.content;
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images.push({ name: file.name, url: e.target.result });
    };
    reader.readAsDataURL(file);
    this.formData.append('files', file);
  }

  onAnimalTypeChange(type: string): void {
    this.animal.type = type;
    this.attributeService.getByTypeName(type).subscribe((attributes) => {
      this.availableAttributes = attributes;
      const allowedAttributesMap = new Map<string, string[]>(
        this.availableAttributes.map(attr => [attr.name, attr.values])
      );

      this.animalAttributes = Object.fromEntries(
        Object.entries(this.animalAttributes).filter(([key, value]) => {
          const allowedValues = allowedAttributesMap.get(key);
          return allowedValues?.includes(value);
        })
      );
    });
  }


  addAttributeValue(selected: { name: string, value: string }): void {
    if (!this.animalAttributes) {
      this.animalAttributes = {};
    }

    this.animalAttributes[selected.name] = selected.value;
  }

  deleteAttributeValue(attrName: string): void {
    delete this.animalAttributes[attrName];
  }

  setCurrentImage(image: { name: string; url: SafeUrl }): boolean{
    if(image !== null) {
      this.currentImage = image;
      return true;
    }
    return false;
  }

  deleteImage(image: { name: string; url: SafeUrl }): void {
    const index = this.images.findIndex(img => img.name === image.name);
    if (index > -1) {
      this.toDeleteImageFileNames.push(image.name);
      this.images.splice(index, 1);

      if (this.currentImage?.name === image.name) {
        this.currentImage = this.images.length > 0 ? this.images[0] : undefined;
      }
    }
  }


  createAnimal() {
    if(!this.animal.name || !this.animal.gender || !this.animal.type || !this.animal.birthDay) {
      return;
    }

    if(this.animal.breed !== null) {
      this.animal.breed.toLowerCase();
      this.animal.breed = this.animal.breed.replace('метис ', '');
    }

    const toSaveAnimal: AnimalSaveDto = new AnimalSaveDto();
    toSaveAnimal.id = this.animal.id
    toSaveAnimal.name = this.animal.name
    toSaveAnimal.gender = this.animal.gender
    toSaveAnimal.type = this.animal.type
    toSaveAnimal.birthDay = this.animal.birthDay
    toSaveAnimal.breed = this.animal.breed
    toSaveAnimal.description = this.animal.description
    toSaveAnimal.status = this.animal.status
    toSaveAnimal.organizationUsername = this.tokenStorageService.getUsername()!;
    toSaveAnimal.attributes = this.animalAttributes

    this.animalService.create(toSaveAnimal).subscribe((savedAnimal) => {
      this.animal = savedAnimal
      this.uploadPhotos();
      this.deletePhotos();
      this.dialogRef.close();
    });
  }

  uploadPhotos(): void {
    if (this.formData.has('files')) {
      const files = this.formData.getAll('files') as File[];
      files.forEach(file => {
        this.animalService.savePhoto(this.animal.id, file).subscribe();
      });
    }
  }

  deletePhotos(): void {
    if (this.toDeleteImageFileNames?.length > 0) {
      this.toDeleteImageFileNames.forEach(photoRef => {
        this.animalService.deletePhoto(this.animal.id, photoRef).subscribe();
      });
    }
  }
}
