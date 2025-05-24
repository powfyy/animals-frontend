import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupOrgInfo } from 'src/app/models/signupOrg-info';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-org',
  templateUrl: './signup-org.component.html',
  styleUrls: ['./signup-org.component.scss']
})
export class SignupOrgComponent implements OnInit {

  form: any = {};
  signupOrgInfo: SignupOrgInfo = {
    username:"",
    password:'',
    phoneNumber:'',
    name: '',
    city:'',
    passportSeries:'',
    passportNumber:''
  };
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  goRegisterOrganization() {

    this.signupOrgInfo = new SignupOrgInfo(
      this.form.username,
      this.form.password,
      this.form.phoneNumber,
      this.form.nameOrganization,
      this.form.city,
      this.form.passportSeries,
      this.form.passportNumber
      );

    this.authService.signupOrg(this.signupOrgInfo).subscribe(
      () => {
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
