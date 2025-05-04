export class FilterFields{

  organizationName:string|null = null;
  city:string|null = null;
  gender:string|null = null;
  type:string|null=null;
  name:string|null = null;

  constructor (org:string|null, city:string|null, gender:string|null, type:string|null, name:string|null){
    this.city = city;
    this.gender = gender;
    this.name = name;
    this.organizationName = org;
    this.type = type;
  }
}
