export class NewPetInfo{
  name:string;
  typePet:string;
  birthDay:string;
  gender:string;
  breed:string|null;
  petPhotos:string[]|null;
  constructor (name: string, typePet:string, birthDay:string, gender:string, breed:string,
               petPhotos:string[]|null){
                this.name=name;
                this.birthDay=birthDay;
                this.gender=gender;
                this.breed=breed;
                this.petPhotos=petPhotos;
               }
}
