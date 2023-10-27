import { BrowserModule } from '@angular/platform-browser';
import { FindAgeAnimalService } from './../../services/find-age-animal.service';
import { MinioService } from './../../services/minio.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NewPetInfo } from 'src/app/models/newPet-info';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-pet-dialog-wrapper',
  templateUrl: './add-pet-dialog-wrapper.component.html',
  styleUrls: ['./add-pet-dialog-wrapper.component.scss'],
})
export class AddPetDialogWrapperComponent implements OnInit {
  imagePaths: string[] = [];
  files: FileList;
  form: any = {};
  newPet: NewPetInfo;
  constructor(
    private minioService:MinioService,  private petService:PetService,
    public dialogRef: MatDialogRef<AddPetDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  onFileSelected(event: any) {
    this.files= event.target.files;
    for (let i = 0; i < this.files.length; i++) {
      const file: File = this.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePaths.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage(index:number):void{
    this.imagePaths.splice(index,1);
  }
  savePet(){
    this.form.breed.toLowerCase();
    this.form.breed.replace("метис ","")
    this.newPet = new NewPetInfo(
    this.form.name,
    this.form.typePet,
    this.form.birthDay,
    this.form.gender,
    this.form.breed,
    null,
    )
    debugger
    this.petService.addPet(this.newPet).subscribe((pet)=>{
      // this.minioService.minioClient.makeBucket(`${pet.id}_${pet.typePet}_${pet.name}`, 'us-east-1', function (err) {
      //   if (err) return console.log('Error creating bucket.', err)
      //   console.log('Bucket created successfully in "us-east-1".')
      // })
    })
  }
}
