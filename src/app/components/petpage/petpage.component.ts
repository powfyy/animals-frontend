import { AnimalDto } from './../../models/animal/AnimalDto';
import { MinioService } from './../../services/minio.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FindAgeAnimalService } from 'src/app/services/find-age-animal.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EditPetDialogWrapperComponent } from '../edit-pet-dialog-wrapper/edit-pet-dialog-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { RequestDialogWrapperComponent } from '../request-dialog-wrapper/request-dialog-wrapper.component';
import { ChatService } from 'src/app/services/chat.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { OrganizationDto } from 'src/app/models/organization/OrganizationDto';

@Component({
  selector: 'app-petpage',
  templateUrl: './petpage.component.html',
  styleUrls: ['./petpage.component.scss']
})
export class PetPageComponent implements OnInit {
  images:SafeUrl[] = [];
  currentImage:SafeUrl;
  animal:AnimalDto;
  org:OrganizationDto;
  IsThereRequest: boolean = true;

  constructor(private animalService:AnimalService,
    private minioService:MinioService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer,
    private findAgeAnimal:FindAgeAnimalService,
    private tokenStorageService:TokenStorageService,
    private dialog:MatDialog,
    private userService:UserService,
    private chatService:ChatService,
    private router:Router) { }

  ngOnInit(): void {
    this.animal = new AnimalDto;
    this.loadData();
  }

  loadData(){
    if (this.route.snapshot.paramMap.get('animalId') !== null) {
      const animalId = this.route.snapshot.paramMap.get('animalId');
      this.animalService.getById(Number(animalId)).subscribe((data) => {
        this.animal = data;
        this.checkRequest();

        if (this.animal.photoRefs.length > 0) {
          this.animal.photoRefs.forEach((reference) => {
            this.minioService.getImage(this.animal.id, reference).subscribe((blob) => {
              this.images.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
              this.currentImage = this.images[0];
            });
          });
        }
      });
    }
  }

  checkRequest(): void {
    if(this.tokenStorageService.getAuthorities()==='USER'){
      this.userService.checkRequest(this.animal.id).subscribe((data) => {
        this.IsThereRequest= data.isThereRequest;
      });
    }
    else{
      this.IsThereRequest = false;
    }
  }

  isOrg():boolean{
    if(this.tokenStorageService.getAuthorities()==='ORG'){
      if(this.tokenStorageService.getUsername() !== this.animal.organizationUsername){
        return false;
      }
      return true;
    }
    return false;
  }

  getPetBreed(breed:string|null):string{
    if(breed===null){
      return "Нет породы";
    }
    return "Метис "+ breed;
  }

  getGender(gender:string):string{
    if(gender==='M') return 'Мальчик'
    return 'Девочка'
  }

  getPetAge(date:string):string{
    return this.findAgeAnimal.getAge(date);
  }

  setCurrentImage(image:SafeUrl):boolean{
    if(image!==null){
      this.currentImage = image;
      return true;
    }
    return false;
  }

  updatePet(){
    const dialogEditPet = this.dialog.open(EditPetDialogWrapperComponent,{
      width: '900px',
      data: this.animal,
      autoFocus: false,
    })
    dialogEditPet.afterClosed().subscribe(()=>{
      this.images = [];
      this.loadData();
    })
  }

  sendRequest(){
    if(this.tokenStorageService.getAuthorities()==="USER"){
      this.userService.sendRequest(this.animal.id).subscribe(()=>{
        const dialogInfo = this.dialog.open(RequestDialogWrapperComponent,{
          width: "400px",
          autoFocus:false,
        })
        dialogInfo.afterClosed().subscribe(()=>{
          this.IsThereRequest=true;
        })
      })
      const userUsername = this.tokenStorageService.getUsername();
      if(userUsername!==null){
        this.chatService.addRequestMessage(this.animal.id, userUsername, this.animal.organizationUsername).subscribe(() => {})
      }
    }
    else{
      this.router.navigate(['login']);
    }
  }
}
