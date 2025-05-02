import { FilterFields } from './../../models/filter-fields';
import { Organization } from './../../models/organization';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pet';
import { FindAgeAnimalService } from 'src/app/services/find-age-animal.service';
import { MinioService } from 'src/app/services/minio.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PetService } from 'src/app/services/pet.service';
import { AddPetDialogWrapperComponent } from '../add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cities:Set<String>= new Set<string>();
  orgs:Organization[] = [];
  pets:Pet[] = [];
  images:{petName:string, url:SafeUrl|null}[]=[];
  filterFields:FilterFields = new FilterFields(null,null,null,null,null);
  pageSize:number=15;
  pageIndex:number=0;
  pageLength:number=0;

  constructor(private findAgeAnimal:FindAgeAnimalService,
  private minioService:MinioService,
  private sanitizer:DomSanitizer,
  private petService:PetService,
  private organizationService:OrganizationService,
  private router:Router, private dialog:MatDialog,
  private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.loadData();
    this.organizationService.getAllOrganization().subscribe((data)=>{
      this.orgs = data;
      this.orgs.forEach((org)=>{
        this.cities.add(org.city);
      })
    })
  }

  loadData(){
    this.petService.getFilteredPets(this.filterFields, this.pageIndex, this.pageSize).subscribe((data)=>{
      this.pets = data.content;
      this.pageLength = data.totalElements;
      this.pets.forEach((pet)=>{
        if(pet.photoRefs.length>0){
          this.minioService.getImage(pet.id, pet.photoRefs[0]).subscribe((blob)=>{
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
           this.images.push({petName:pet.name, url:safeUrl});
          });
        }
      })
    });
  };

  SearchInputKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.loadData();
    }
  }

  getImageUrl(petName:string):SafeUrl|null{
    const image = this.images.find(image => image.petName === petName);
    return image ? image.url : null;
  }

  isOrg():boolean{
    if(this.tokenStorageService.getAuthorities()==='ORG'){
      return true;
    }
    return false;
  }

  getPetAge(date:string):string{
    return this.findAgeAnimal.getAge(date);
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

  goPetPage(petId:number){
    this.router.navigate(['home',petId]);
  }

  addPet(){
    const dialogAddPet = this.dialog.open (AddPetDialogWrapperComponent, {
      width: '900px',
      data: null,
      autoFocus: false,
    });
    dialogAddPet.afterClosed().subscribe(()=>{
      this.loadData();
    });
  }

  changePage(event: PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
