import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FindAgeAnimalService } from 'src/app/services/find-age-animal.service';
import { MinioService } from 'src/app/services/minio.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { AddPetDialogWrapperComponent } from '../add-pet-dialog-wrapper/add-pet-dialog-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AnimalDto } from 'src/app/models/animal/AnimalDto';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { OrganizationShortDto } from 'src/app/models/organization/OrganizationShortDto';
import { AnimalTypeService } from 'src/app/services/animal/animaType.service';
import { AnimalTypeDto } from 'src/app/models/animal/AnimalType';
import { AnimalFilterDto } from 'src/app/models/animal/AnimalFilterDto';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cities:Set<String>= new Set<string>();
  orgs:OrganizationShortDto[] = [];
  animals:AnimalDto[] = [];
  animalTypes: AnimalTypeDto[] = [];
  images:{animalName:string, url:SafeUrl|null}[]=[];
  filterFields: AnimalFilterDto = new AnimalFilterDto();
  pageSize:number=15;
  pageIndex:number=0;
  pageLength:number=0;

  constructor(private findAgeAnimal:FindAgeAnimalService,
  private minioService:MinioService,
  private sanitizer:DomSanitizer,
  private animalService:AnimalService,
  private organizationService:OrganizationService,
  private router:Router, private dialog:MatDialog,
  private tokenStorageService:TokenStorageService,
  private animalTypeService: AnimalTypeService
) { }

  ngOnInit(): void {
    this.search();
    this.organizationService.getAll().subscribe((data)=>{
      this.orgs = data;
      this.orgs.forEach((org)=>{
        this.cities.add(org.city);
      })
    })
    this.animalTypeService.getAll(0, 1000).subscribe((types) => {
      this.animalTypes = types.content;
    })
  }

  search(){
    this.animalService.search(this.filterFields, this.pageIndex, this.pageSize).subscribe((data)=>{
      this.animals = data.content;
      this.pageLength = data.totalElements;
      this.animals.forEach((animal)=>{
        if(animal.photoRefs.length>0){
          this.minioService.getImage(animal.id, animal.photoRefs[0]).subscribe((blob)=>{
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
           this.images.push({animalName:animal.name, url:safeUrl});
          });
        }
      })
    });
  };

  SearchInputKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  getImageUrl(animalName:string):SafeUrl|null{
    const image = this.images.find(image => image.animalName === animalName);
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
    return breed;
  }

  getGender(gender:string):string{
    if(gender==='M') return 'Мальчик'
    return 'Девочка'
  }

  goPetPage(petId:number){
    this.router.navigate(['home',petId]);
  }

  addPet(){
    const dialogAddPet = this.dialog.open(AddPetDialogWrapperComponent, {
      width: '85vw',
      height: '90vh',
      data: new AnimalDto(),
      autoFocus: false,
    });
    dialogAddPet.afterClosed().subscribe(()=>{
      this.search();
    });
  }

  changePage(event: PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.search();
  }
}
