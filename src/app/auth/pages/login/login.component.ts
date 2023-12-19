import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { DittiService } from 'app/shared/ditti-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;
  reset = this.authService.reset;

  authReturn;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dittiService: DittiService
  ) {}

  ngOnInit(): void {
    this.dittiService.authReturn.subscribe((data) => {
      this.authReturn = data;
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLogin(loginForm: FormGroup) {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['home']);
        // if (this.authReturn == null) {
        //   this.router.navigate(['home']);
        // } else {
        //   this.router.navigate(['/ditti', this.authReturn]);
        //   this.authReturn = null;
        // }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        // this.error='An error occurred!';
        this.isLoading = false;
      }
    );
    loginForm.reset();
  }
}
