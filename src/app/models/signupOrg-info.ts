export class SignupOrgInfo{
  username:string;
  password:string;
  phoneNumber:string;
  nameOrganization:string;
  city:string
  passportSeries:string;
  passportNumber:string;

  constructor(username: string, password: string, phoneNumber: string, nameOraginzation: string,city:string, passportSeries: string, passportNumber: string) {
    this.username = username;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.nameOrganization = nameOraginzation;
    this.city=city;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
  }
}
