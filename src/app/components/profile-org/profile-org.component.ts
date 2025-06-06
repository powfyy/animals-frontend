import { AnimalService } from 'src/app/services/animal/animal.service';
import { OrganizationDto } from './../../models/organization/OrganizationDto';
import { OrganizationService } from './../../services/organization.service';
import { FindAgeAnimalService } from './../../services/find-age-animal.service';
import { Component, OnInit } from '@angular/core';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import {AddPetDialogWrapperComponent} from '../add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';
import { ListRequestDialogComponent } from './list-request-dialog/list-request-dialog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { EditPetDialogWrapperComponent } from '../edit-pet-dialog-wrapper/edit-pet-dialog-wrapper.component';
import { AnimalDto } from 'src/app/models/animal/AnimalDto';
import { AnimalSaveDto } from 'src/app/models/animal/AnimalSaveDto';
import { AnimalStatusType } from 'src/app/models/type/animal/AnimalStatusType';

@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.scss']
})
export class ProfileOrgComponent implements OnInit {

  displayedColumns: string[] = ['status', 'type', 'name', 'gender', 'age', 'breed', 'actions'];
  animals:AnimalDto[];
  filterAnimals:AnimalDto[];
  showFrozenAnimal:boolean = true;
  showActiveAnimal: boolean = true;
  showAdoptedAnimal: boolean = true;
  org:OrganizationDto;

  constructor(public dialog: MatDialog,
    public findAgeAnimal:FindAgeAnimalService,
    private organizationService:OrganizationService,
    private animalService: AnimalService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadData();

  }

  loadData(){
    this.org = new OrganizationDto;
    this.organizationService.getByUsername(this.tokenStorageService.getUsername()).subscribe(data => {
      this.org = data;
    });
    this.animalService.getAllByOrganization().subscribe(data=>{
      this.animals= data;
      this.filterAnimals = data;
      this.filterAnimal("");
    })
  }

  filterAnimal(text:string) {
    if (!text) {
      this.filterAnimals=this.animals;
      this.statusFilterAnimals();
      return;
    }
    this.filterAnimals = this.animals.filter(animal => {
      return animal?.name.toLowerCase().includes(text.toLowerCase())
    });
    this.statusFilterAnimals();
  }

  statusFilterAnimals(){
    this.filterAnimals = this.filterAnimals.filter(animal=>{
      if(this.showActiveAnimal && animal.status === AnimalStatusType.ACTIVE){
        return animal;
      }
      if(this.showFrozenAnimal && animal.status === AnimalStatusType.FREEZE){
        return animal;
      }
      if(this.showAdoptedAnimal && animal.status === AnimalStatusType.ADOPTED){
        return animal;
      }
      return null;
    })
  }

  setStatusDotColor(status:string):string{
    if(status==="ACTIVE"){
      return "rgb(65, 175, 65)";
    }
    if(status==="FREEZE"){
      return "rgb(24, 214, 228)";
    }
    if(status==="ADOPTED"){
      return "orange";
    }
    return "black";
  }

  isGenderMan(gender:string){
    if(gender==="M"){
      return true;
    }
    return false;
  }

  isDog(type:string){
    if(type==="DOG"){
    return true;
    }
    return false;
  }

  isActiveAnimal(status:string){
    if(status==="ACTIVE"){
      return true;
    }
    return false;
  }

  isAdoptedAnimal(status:string):boolean{
    if(status==="ADOPTED"){
      return true;
    }
    return false
  }

  activeAnimal(animalId:number) {
    const animal = this.mapToSaveDto(this.animals.find(animal => animal.id === animalId))
    animal.status = AnimalStatusType.ACTIVE
    this.animalService.update(animal).subscribe(()=>{
      this.animalService.getAllByOrganization().subscribe(data=>{
        this.animals= data;
        this.filterAnimals = data;
        this.filterAnimal('');
      })
    });
  }

  freezePet(animalId:number){
    const animal = this.mapToSaveDto(this.animals.find(animal => animal.id === animalId))
    animal.status = AnimalStatusType.FREEZE
    this.animalService.update(animal).subscribe(()=>{
      this.animalService.getAllByOrganization().subscribe(data=>{
        this.animals= data;
        this.filterAnimals = data;
        this.filterAnimal('');
      })
    });
  }

  getAnimalAge(date:string):string{
    return this.findAgeAnimal.getAge(date);
  }

  getAnimalBreed(breed:string|null):string{
    if(breed===null){
      return "Нет породы";
    }
    return breed;
  }

  editInfo(){
    const dialogEdit = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: this.org,
      autoFocus:false,
    });
    dialogEdit.afterClosed().subscribe((result:OrganizationDto)=>{
      if(result!=null){
      this.organizationService.update(result).subscribe(()=>
      this.organizationService.getByUsername(this.tokenStorageService.getUsername()).subscribe(data=>this.org = data));
      }
    })

  }

  deleteAccount(){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этот аккаунт?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        this.organizationService.delete().subscribe(()=>{
        this.tokenStorageService.signOut();
        this.router.navigate(['home']);
        });
      }
    })
  }

  addAnimal(){
    const dialogAddAnimal = this.dialog.open (AddPetDialogWrapperComponent, {
      width: '85vw',
      height: '90vh',
      data: new AnimalDto(),
      autoFocus: false,
    });
    dialogAddAnimal.afterClosed().subscribe(()=>{
      this.animalService.getAllByOrganization().subscribe(data=>{
        this.animals= data;
        this.filterAnimals = data;
        this.filterAnimal('');
      })
    });
  };

  updateAnimal(animal: AnimalDto){
    const dialogEditAnimal = this.dialog.open(EditPetDialogWrapperComponent,{
      width: '85vw',
      height: '90vh',
      data: animal,
      autoFocus: false,
    })
    dialogEditAnimal.afterClosed().subscribe(()=>{
      this.animalService.getAllByOrganization().subscribe(data=>{
        this.animals= data;
        this.filterAnimals = data;
        this.filterAnimal('');
      })
    })
  }

  listRequest(animal: AnimalDto){
    const dialogListRequest = this.dialog.open (ListRequestDialogComponent, {
      width: '800px',
      data:animal,
      autoFocus: false,
    });
    dialogListRequest.afterClosed().subscribe(()=>{
      this.animalService.getAllByOrganization().subscribe(data=>{
        this.animals= data;
        this.filterAnimals = data;
        this.filterAnimal('');
      })
    })
  }

  deleteAnimal(id: number){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этого питомца?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        this.animalService.delete(id).subscribe(()=>{
          this.animalService.getAllByOrganization().subscribe(data => {
            this.animals= data;
            this.filterAnimals = data;
            this.filterAnimal('');
          })
          });
      }

    })
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
