import { MinioService } from './../../services/minio.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AnimalDto } from 'src/app/models/animal/AnimalDto';
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
  animal=new AnimalDto();
  constructor(private petService:PetService, private sanitizer: DomSanitizer,
              private minioService:MinioService,
    public dialogRef: MatDialogRef<EditPetDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnimalDto) {
      this.animal = {...data}
    }
  ngOnInit(): void {
  if(this.animal.photoRefs){
    this.animal.photoRefs.forEach((el)=>{
      this.minioService.getImage(this.animal.id, el).subscribe((blob)=>{
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
    if (!this.animal.name || !this.animal.gender || !this.animal.type || !this.animal.birthDay) {
      return;
      };
    if(this.animal.breed!==null){
      this.animal.breed.toLowerCase();
        this.animal.breed=this.animal.breed.replace("метис ","");
      }
    this.formData.append('name',this.animal.name);
    this.formData.append('type',this.animal.type);
    this.formData.append('birthDay',this.animal.birthDay);
    this.formData.append('gender',this.animal.gender);
    this.deletedPhotoRefs.forEach((el)=>{
      this.formData.append('deletedPhotoRefs', el);
      })
    if(this.animal.breed!=='' && this.animal.breed!==null){
      this.formData.append('breed',this.animal.breed);
      }
    if(this.animal.description!=='' && this.animal.description!==null && this.animal.description!==undefined){
        this.formData.append('description',this.animal.description);
    }
    this.petService.updatePet(this.formData, this.animal.id).subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
