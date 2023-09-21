export class SignupInfo{
  login:string;
  password:string;
  name:string;
  lastname: string;
  phoneNumber:string;
  nameOrganization:string;
  passportSeries:string;
  passportNumber:string;
  role:string;

  constructor(login: string, password: string, name: string, lastname: string, phoneNumber: string, nameOraginzation: string, passportSeries: string, passportNumber: string, role: string) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.nameOrganization = nameOraginzation;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
    this.role = role;
  }
}
