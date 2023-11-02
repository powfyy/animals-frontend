import { PetService } from './../../services/pet.service';
import { OrganizationService } from './../../services/organization.service';
import { Organization } from './../../models/organization';
import { FindAgeAnimalService } from './../../services/find-age-animal.service';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from 'src/app/models/pet';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import {AddPetDialogWrapperComponent} from '../add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';
import { ListRequestDialogComponent } from './list-request-dialog/list-request-dialog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { EditPetDialogWrapperComponent } from '../edit-pet-dialog-wrapper/edit-pet-dialog-wrapper.component';

@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.scss']
})
export class ProfileOrgComponent implements OnInit {

  pets:Pet[];
  filterPets:Pet[];
  showFrozenPet:boolean = false;
  showActivePet: boolean = true;
  showAdoptedPet: boolean = false;
  org:Organization;
  constructor(public dialog: MatDialog, public findAgeAnimal:FindAgeAnimalService, private organizationService:OrganizationService,
              private petService:PetService, private tokenStorageService: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();

  }

  loadData(){
    this.org = new Organization;
    this.organizationService.getOrganization().subscribe(data => {
      this.org = data;
    });
    this.petService.getAllPets().subscribe(data=>{
      this.pets= data;
      this.filterPets = data;
      this.filterPet("");
    })
  }

  filterPet(text:string) {
    if (!text) {
      this.filterPets=this.pets;
      this.statusFilterPets();
      return;
    }
    this.filterPets = this.pets.filter(pet =>{

      return pet?.name.toLowerCase().includes(text.toLowerCase())
    });
    this.statusFilterPets();
  }

  statusFilterPets(){
    this.filterPets = this.filterPets.filter(pet=>{
      if(this.showActivePet && pet.status==="ACTIVE"){
        return pet;
      }
      if(this.showFrozenPet && pet.status==="FREEZE"){
        return pet;
      }
      if(this.showAdoptedPet && pet.status==="ADOPTED"){
        return pet;
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
  isActivePet(status:string){
    if(status==="ACTIVE"){
      return true;
    }
    return false;
  }
  isAdoptedPet(status:string):boolean{
    if(status==="ADOPTED"){
      return true;
    }
    return false
  }
  activePet(petId:number){
    this.petService.updateStatusPet("ACTIVE",petId).subscribe(()=>{
      this.petService.getAllPets().subscribe(data=>{
        this.pets=data;
        this.filterPets=data;
        this.filterPet("");
      })
    });
  }
  freezePet(petId:number){
    this.petService.updateStatusPet("FREEZE",petId).subscribe(()=>{
      this.petService.getAllPets().subscribe(data=>{
        this.pets=data;
        this.filterPets=data;
        this.filterPet("");
      })
    });
  }
  getAgePet(date:string):string{
    return this.findAgeAnimal.getAge(date);
  }
  getPetBreed(breed:string|null):string{
    if(breed===null){
      return "Нет породы";
    }
    return "Метис "+ breed;
  }
  editInfo(){
    const dialogEdit = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: this.org,
      autoFocus:false,
    });
    dialogEdit.afterClosed().subscribe((result:Organization)=>{
      if(result!=null){
      this.organizationService.updateOrganization(result).subscribe(()=>
      this.organizationService.getOrganization().subscribe(data=>this.org = data));
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
        this.organizationService.deleteOrganization().subscribe(()=>{
        this.tokenStorageService.signOut();
        this.router.navigate(['home']);
        });
      }
    })
  }

  addPet(){
    const dialogAddPet = this.dialog.open (AddPetDialogWrapperComponent, {
      width: '900px',
      data: null,
      autoFocus: false,
    });
    dialogAddPet.afterClosed().subscribe(()=>{
      this.petService.getAllPets().subscribe(data=>{
        this.pets= data;
        this.filterPets = data;
        this.filterPet('');
      });
    });
  };
  updatePet(pet:Pet){
    const dialogEditPet = this.dialog.open(EditPetDialogWrapperComponent,{
      width: '900px',
      data: pet,
      autoFocus: false,
    })
    dialogEditPet.afterClosed().subscribe(()=>{
      this.petService.getAllPets().subscribe(data=>{
        this.pets= data;
        this.filterPets = data;
        this.filterPet('');
      })
    })
  }
  listRequest(pet:Pet){
    const dialogListRequest = this.dialog.open (ListRequestDialogComponent, {
      width: '800px',
      data:pet,
      autoFocus: false,
    });
    dialogListRequest.afterClosed().subscribe(()=>{
      this.petService.getAllPets().subscribe(data=>{
        this.pets= data;
        this.filterPets = data;
        this.filterPet('');
      })
    })
  }
  deletePet(id: number){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этого питомца?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        this.petService.deletePet(id).subscribe(()=>{
          this.petService.getAllPets().subscribe(data=>{
            this.pets= data;
            this.filterPets = data;
            this.filterPet('');
          })
          });
      }

    })
  }
}
