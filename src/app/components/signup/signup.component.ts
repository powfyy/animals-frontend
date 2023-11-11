import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupUserInfo } from 'src/app/models/signupUser-info';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: any = {};
  signupUserInfo: SignupUserInfo = {
    username:"",
    password:'',
    name:'',
    lastname:'',
    phoneNumber:'',
  };
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  goRegisterUser() {

    this.signupUserInfo = new SignupUserInfo(
      this.form.username,
      this.form.password,
      this.form.name,
      this.form.lastname,
      this.form.phoneNumber,
      this.form.nameOrganization,
      this.form.passportSeries,
      this.form.passportNumber,
      );

    this.authService.signupUser(this.signupUserInfo).subscribe(
      data => {
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
