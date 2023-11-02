import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { raceWith } from 'rxjs';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-pet-dialog-wrapper',
  templateUrl: './add-pet-dialog-wrapper.component.html',
  styleUrls: ['./add-pet-dialog-wrapper.component.scss'],
})
export class AddPetDialogWrapperComponent implements OnInit {
  imagePaths: string[] = [];
  files: File[];
  form: any ={};
  formData= new FormData();
  constructor(
    private petService:PetService,
    public dialogRef: MatDialogRef<AddPetDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form.breed = "метис сиамской"
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePaths.push(e.target.result);
    };
    reader.readAsDataURL(file);
    this.formData.append('files',file);
  }

  deleteImage(index:number):void{
    this.imagePaths.splice(index,1);
  }
  savePet(){
    if (!this.form.name || !this.form.gender || !this.form.typePet || !this.form.birthDay) {
      return;
      };
    if(this.form.breed!==null){
      this.form.breed.toLowerCase();
      this.form.breed=this.form.breed.replace("метис ","");
    };
    this.formData.append('name',this.form.name);
    this.formData.append('typePet',this.form.typePet);
    this.formData.append('birthDay',this.form.birthDay);
    this.formData.append('gender',this.form.gender);
    if(this.form.breed!=='' && this.form.breed!==null){
    this.formData.append('breed',this.form.breed);
    }
    if(this.form.description!=='' && this.form.description!==null && this.form.description!==undefined){
      this.formData.append('description',this.form.description);
    }
    this.petService.addPet(this.formData).subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
