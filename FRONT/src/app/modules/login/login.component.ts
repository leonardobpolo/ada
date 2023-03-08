import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './_services/login.service';
import { LoginData } from './_types/loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  loading = false;

  authForm = new FormGroup({
    user: new FormControl('letscode', Validators.required),
    password: new FormControl('lets@123', Validators.required),
  });

  ngOnInit(): void {
  }

  login(): void {
    const loginData: LoginData = {
      login: this.authForm.get('user')!.value || '',
      senha: this.authForm.get('password')!.value || '',
    }

    this.loginService.login(loginData)
      .subscribe(
        (res) => {
          if (res) {
            localStorage.setItem('token', res);
            
            this.router.navigateByUrl('/');
          }

        }
      );
  }
}