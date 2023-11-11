export class FilterFields{
  nameOrganization:string|null = null;
  city:string|null = null;
  gender:string|null = null;
  petType:string|null=null;
  name:string|null = null;
  constructor (org:string|null, city:string|null, gender:string|null, type:string|null, name:string|null){
    this.city = city;
    this.gender = gender;
    this.name = name;
    this.nameOrganization = org;
    this.petType = type;
  }
}
