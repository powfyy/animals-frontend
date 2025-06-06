import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogInformationWrapperComponent } from '../../dialog-information-wrapper/dialog-information-wrapper.component';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AnimalDto } from 'src/app/models/animal/AnimalDto';
import { AnimalSaveDto } from 'src/app/models/animal/AnimalSaveDto';
import { AnimalStatusType } from 'src/app/models/type/animal/AnimalStatusType';

@Component({
  selector: 'app-list-request-dialog',
  templateUrl: './list-request-dialog.component.html',
  styleUrls: ['./list-request-dialog.component.scss']
})
export class ListRequestDialogComponent implements OnInit {

  animal: AnimalDto;

  constructor(
    public dialogRef: MatDialogRef<ListRequestDialogComponent>,
    private animalService: AnimalService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: AnimalDto
  ) {
      this.animal = data;
  }

  ngOnInit(): void {

  }

  isThereRequest():boolean{
    if(this.animal.adoptionRequestUsers[0]){
      return true
    }
    this.dialogRef.updateSize("400px")
    return false;
  }

  adoptAnimal(userUsername: string): void {
    const saveDto = this.mapToSaveDto(this.animal)
    saveDto.adoptionRequestUserUsernames = [];
    saveDto.userUsername = userUsername;
    saveDto.status = AnimalStatusType.ADOPTED
    this.animalService.update(saveDto).subscribe(() => {
      const dialogInfo = this.dialog.open(DialogInformationWrapperComponent,{
        width: '400px',
        data: 'Питомец успешно назначен пользователю ' + userUsername,
        autoFocus: false,
      })
      dialogInfo.afterClosed().subscribe(()=>{
        this.dialogRef.close();
      })
    });
  }

  deleteUser(username: string): void {
    const saveDto = this.mapToSaveDto(this.animal)
    saveDto.adoptionRequestUserUsernames = saveDto.adoptionRequestUserUsernames.filter(name => name !== username);
    this.animalService.update(saveDto).subscribe(() => {
      const dialogInfo = this.dialog.open(DialogInformationWrapperComponent, {
        width:'400px',
        data: 'Заявка успешно удалена.',
        autoFocus: false,
      })
      dialogInfo.afterClosed().subscribe(()=>{
        this.animalService.getById(this.animal.id).subscribe(data => {
          this.animal = data;
        })
      })
    })
  }

  goChat(){
    this.dialogRef.close();
    this.router.navigate(["chat"])
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
