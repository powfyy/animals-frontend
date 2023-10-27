
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/models/login-info';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  errorMessageLogin='';
  role: string;
  public loginInfo: LoginInfo = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    if (!this.form.username || !this.form.password) {
      this.errorMessage = "Пожалуйста, заполните поле";
      return;
    }

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.signin(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.role);

        this.role = data.role;
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessageLogin = 'Неверный логин или пароль';
      }
    );
  }

}
