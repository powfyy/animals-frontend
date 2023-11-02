import { MinioService } from './../../services/minio.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-edit-pet-dialog-wrapper',
  templateUrl: './edit-pet-dialog-wrapper.component.html',
  styleUrls: ['./edit-pet-dialog-wrapper.component.scss']
})
export class EditPetDialogWrapperComponent implements OnInit {
  imagePaths: { name: string, url: SafeUrl }[] = [];
  deletedPhotoRefs: string[] = [];
  files: File[];
  formData= new FormData();
  pet=new Pet();
  constructor(private petService:PetService, private sanitizer: DomSanitizer,
              private minioService:MinioService,
    public dialogRef: MatDialogRef<EditPetDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet) {
      this.pet = {...data}
    }
  ngOnInit(): void {
  if(this.pet.photoRefs){
    this.pet.photoRefs.forEach((el)=>{
      this.minioService.getImage(this.pet.id, this.pet.typePet, el).subscribe((blob)=>{
        const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
         const fileName: string = el;
        this.imagePaths.push({ name: fileName, url: safeUrl });
       })
       });
     }
   }
  onFileSelected(event: any) {
     const file:File = event.target.files[0];
     const reader = new FileReader();
     reader.onload = (e: any) => {
      this.imagePaths.push({name:file.name,url:e.target.result});
     };
    reader.readAsDataURL(file);
    this.formData.append('files',file);
  }

  deleteImage(index:number):void{
    this.deletedPhotoRefs.push(this.imagePaths[index].name);
    this.imagePaths.splice(index,1);
  }
  updatePet(){
    if (!this.pet.name || !this.pet.gender || !this.pet.typePet || !this.pet.birthDay) {
      return;
      };
    if(this.pet.breed!==null){
      this.pet.breed.toLowerCase();
        this.pet.breed=this.pet.breed.replace("метис ","");
      }
    this.formData.append('name',this.pet.name);
    this.formData.append('typePet',this.pet.typePet);
    this.formData.append('birthDay',this.pet.birthDay);
    this.formData.append('gender',this.pet.gender);
    this.deletedPhotoRefs.forEach((el)=>{
      this.formData.append('deletedPhotoRefs', el);
      })
    if(this.pet.breed!=='' && this.pet.breed!==null){
      this.formData.append('breed',this.pet.breed);
      }
    if(this.pet.description!=='' && this.pet.description!==null && this.pet.description!==undefined){
        this.formData.append('description',this.pet.description);
    }
    this.petService.updatePet(this.formData, this.pet.id).subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
