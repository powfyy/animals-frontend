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
      this.formData.append(`${e.target.result}`,file);
    };
    reader.readAsDataURL(file);
  }

  deleteImage(index:number):void{
    this.formData.delete(this.imagePaths[index]);
    this.imagePaths.splice(index,1);
  }

  savePet(){
    debugger
    const resultForm= new FormData();
    this.imagePaths.forEach((el) => {
      resultForm.append("files", this.formData.get(`${el}`) as File)
    })
    if (!this.form.name || !this.form.gender || !this.form.typePet || !this.form.birthDay) {
      return;
      };

    if(this.form.breed!==null){
      this.form.breed.toLowerCase();
      this.form.breed=this.form.breed.replace("метис ","");
    };
    resultForm.append('name',this.form.name);
    resultForm.append('typePet',this.form.typePet);
    resultForm.append('birthDay',this.form.birthDay);
    resultForm.append('gender',this.form.gender);
    if(this.form.breed!=='' && this.form.breed!==null){
      resultForm.append('breed',this.form.breed);
    }
    if(this.form.description!=='' && this.form.description!==null && this.form.description!==undefined){
      resultForm.append('description',this.form.description);
    }
    this.petService.addPet(resultForm).subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
