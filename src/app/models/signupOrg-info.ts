export class SignupOrgInfo{
  username:string;
  password:string;
  phoneNumber:string;
  nameOrganization:string;
  passportSeries:string;
  passportNumber:string;

  constructor(username: string, password: string, phoneNumber: string, nameOraginzation: string, passportSeries: string, passportNumber: string) {
    this.username = username;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.nameOrganization = nameOraginzation;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
  }
}
