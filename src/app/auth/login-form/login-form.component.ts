import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isLoading=false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }




  onLogin(loginForm: FormGroup) {
    if (!loginForm.valid) {
      return;
    }
  const email=loginForm.value.email;
  const password=loginForm.value.password;

  this.isLoading=true;

  this.authService.login(email,password).subscribe(resData=> {
    console.log(resData);
    this.isLoading=false;
  },
  error => {
    console.log(error);
    this.isLoading=false
  });
    loginForm.reset();
}
  }

