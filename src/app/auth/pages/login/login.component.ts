import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
