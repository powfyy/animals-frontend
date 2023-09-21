import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupInfo } from 'src/app/models/signup-info';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: any = {};
  signupInfo: SignupInfo = {
    login:"",
    password:'',
    name:'',
    lastname:'',
    phoneNumber:'',
    nameOrganization: '',
    passportSeries:'',
    passportNumber:'',
    role:''
  };
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  goRegisterUser() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.login,
      this.form.password,
      this.form.name,
      this.form.lastname,
      this.form.phoneNumber,
      this.form.nameOrganization,
      this.form.passportSeries,
      this.form.passportNumber,
      this.form.role = "USER",
      );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.router.navigate(['/login']);
  }
}
