export class SignupUserInfo{
  username:string;
  password:string;
  name:string;
  lastname: string;
  phoneNumber:string;

  constructor(username: string, password: string, name: string, lastname: string, phoneNumber: string, nameOraginzation: string, passportSeries: string, passportNumber: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
  }
}
