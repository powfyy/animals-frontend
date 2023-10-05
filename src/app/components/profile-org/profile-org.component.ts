import { FindAgeAnimalService } from './../../services/find-age-animal.service';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from 'src/app/models/pet';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import {AddPetDialogWrapperComponent} from '../add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';

@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.scss']
})
export class ProfileOrgComponent implements OnInit {
  userInfo:any={
    name:'Имя',
    lastname:'Фамилия',
    phoneNumber: '79999999999',
    role: 'ORG',
    login:'username',
    nameOrg:'Priюt',
    passportSeries:"2014",
    passportNumber:"012321"
  }

  pets:Pet[];
  filterPets:Pet[];
  frozenPets:boolean = false;
  activePets:boolean = true;
  adoptedPets:boolean = false;
  users:any[];

  constructor(public dialog: MatDialog, public findAgeAnimal:FindAgeAnimalService) {
    this.pets=[
      {id:0, name:"Буся",typeAnimal:"DOG",birthdate:'2019-06-01',gender:"W",breed:'Шпиц',status:'active'},
      {id:1,name:'Шарик',typeAnimal:'DOG',birthdate:'2023-07-04',gender:'M',breed:'Лайка',status:'active'},
      {id:2,name:'Маня',typeAnimal:'CAT',birthdate:'2021-08-01',gender:'W',breed:'Британский',status:'active'},
      {id:3,name:'Киса',typeAnimal:'CAT',birthdate:'2020-10-08',gender:'W',breed:'Сиамский',status:'active'},
      {id:4,name:'Леша',typeAnimal:'DOG',birthdate:'2019-01-16',gender:'M',breed:'Шпиц',status:'active'},
      {id:5,name:'Борис',typeAnimal:'CAT',birthdate:'2022-02-11',gender:'M',breed:null,status:'active'},
      {id:6,name:'Бакс',typeAnimal:'DOG',birthdate:'2022-04-14',gender:'M',breed:'Лайка',status:'active'},
      {id:7,name:'Феликс',typeAnimal:'CAT',birthdate:'2021-06-23',gender:'M',breed:null,status:'active'},
      {id:8,name:'Мымра',typeAnimal:'CAT',birthdate:'2020-12-11',gender:'W',breed:'Сфинкс',status:'active'},
     ]
    this.filterPets=this.pets;
    this.users = [
      {id:1, name:"Alex"},
      {id:2, name:"Bob"},
      {id:3, name:'Sansa'},
      {id:4, name:'Lera'},
    ]
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){

  }

  searchFilterPets(text:string) {
    if (!text) {
      this.filterPets=this.pets;
      return;
    }
    this.filterPets = this.pets.filter(pet =>
      pet?.name.toLowerCase().includes(text.toLowerCase())
    );
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
  getPetBreed(breed:string|null):string{
    if(breed===null){
      return "Нет породы";
    }
    return breed;
  }
  editInfo(){
    const dialogEdit = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: this.userInfo
    });
  }
  deleteAccount(){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этот аккаунт?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        console.log("delete account");
      }
      else{

      }
    })
  }
  deletePet(){
    const dialogDelete = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: "Вы действительно хотите удалить этого питомца?",
      autoFocus: false,
    });
    dialogDelete.afterClosed().subscribe(result=>{
      if(result===true){
        console.log("delete account");
      }
      else{

      }
    })
  }
  addPet(){
    const dialogAddPet = this.dialog.open (AddPetDialogWrapperComponent, {
      width: '400px',
      data: null,
      autoFocus: false,
    });
    dialogAddPet.afterClosed().subscribe(result=>{
      if(result===true){
        console.log("delete account");
      }
      else{

      }
    })
  }
  goToDialog(){

  }
  givePet(){

  }
}
