export class NewPetInfo{
  name:string;
  typePet:string;
  birthDay:string;
  gender:string;
  breed:string|null;
  description:string|null;
  petPhotos:File[];
  constructor (name: string, typePet:string, birthDay:string, gender:string, breed:string,
              description:string|null, petPhotos:File[]){
                this.name=name;
                this.birthDay=birthDay;
                this.gender=gender;
                this.breed=breed;
                this.description=description;
                this.petPhotos=petPhotos;
               }
}
