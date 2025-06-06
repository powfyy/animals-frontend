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
import { AnimalSaveDto } from 'src/app/models/animal/AnimalSaveDto';

@Component({
  selector: 'app-petpage',
  templateUrl: './petpage.component.html',
  styleUrls: ['./petpage.component.scss']
})
export class PetPageComponent implements OnInit {

  images:SafeUrl[] = [];
  currentImage:SafeUrl;
  animal:AnimalDto = new AnimalDto();
  org:OrganizationDto;

  requestButtonDisabled: boolean = true;

  constructor(
    private animalService:AnimalService,
    private minioService:MinioService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer,
    private findAgeAnimal:FindAgeAnimalService,
    private tokenStorageService:TokenStorageService,
    private dialog:MatDialog,
    private chatService:ChatService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    if (this.route.snapshot.paramMap.get('animalId') !== null) {
      const animalId = this.route.snapshot.paramMap.get('animalId');
      this.animalService.getById(Number(animalId)).subscribe((data) => {
        this.animal = data;
        this.requestButtonDisabled = this.userRequestExists();
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

  userRequestExists(): boolean {
    const bool = this.tokenStorageService.getAuthorities() === 'USER' &&
      this.animal.adoptionRequestUsers.some(user => user.username === this.tokenStorageService.getUsername())
    return bool;
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

  getBreed(breed:string|null):string{
    if(breed === null){
      return "Нет породы";
    }
    return breed;
  }

  getGender(gender:string):string{
    if(gender==='M') return 'Мальчик'
    return 'Девочка'
  }

  getAge(date:string):string{
    return this.findAgeAnimal.getAge(date);
  }

  setCurrentImage(image:SafeUrl):boolean{
    if(image!==null){
      this.currentImage = image;
      return true;
    }
    return false;
  }

  updateAnimal(){
    const dialogEditPet = this.dialog.open(EditPetDialogWrapperComponent,{
      width: '85vw',
      height: '90vh',
      data: this.animal,
      autoFocus: false,
    })
    dialogEditPet.afterClosed().subscribe(()=>{
      this.images = [];
      this.loadData();
    })
  }

  sendUserRequest() {
    if(this.tokenStorageService.getAuthorities() === "USER") {
      const userUsername = this.tokenStorageService.getUsername();
      if(userUsername !== null) {
        this.animalService.createAdoptionRequest(this.animal.id).subscribe(()=>{
          const dialogInfo = this.dialog.open(RequestDialogWrapperComponent,{
            width: "400px",
            autoFocus:false,
          })
        })
        this.chatService.addRequestMessage(this.animal.id, userUsername, this.animal.organizationUsername).subscribe(() => {})
        this.requestButtonDisabled = true;
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  mapToSaveDto(dto: AnimalDto | undefined): AnimalSaveDto{
    if(dto === undefined) {
      console.log("mapToSaveDto: передан undefined")
      return new AnimalSaveDto();
    }
    const toSaveAnimal: AnimalSaveDto = new AnimalSaveDto();
    toSaveAnimal.id = dto.id
    toSaveAnimal.name = dto.name
    toSaveAnimal.gender = dto.gender
    toSaveAnimal.type = dto.type
    toSaveAnimal.birthDay = dto.birthDay
    toSaveAnimal.breed = dto.breed
    toSaveAnimal.description = dto.description
    toSaveAnimal.status = dto.status
    toSaveAnimal.organizationUsername = this.tokenStorageService.getUsername()!;
    toSaveAnimal.attributes = dto.attributes
    toSaveAnimal.adoptionRequestUserUsernames = dto.adoptionRequestUsers.map(user => user.username);
    if(dto.userOwner) {
      toSaveAnimal.userUsername = dto.userOwner.username
    }
    return toSaveAnimal
  }
}
