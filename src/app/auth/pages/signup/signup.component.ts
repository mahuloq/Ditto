import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { passwordMatchValidator } from 'app/auth/confirm-password.validator';
import { DittiService } from 'app/shared/ditti-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  error: string = null;
  authReturn = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dittiService: DittiService
  ) {}

  ngOnInit(): void {
    this.dittiService.authReturn.subscribe((data) => {
      this.authReturn = data;
    });

    this.signupForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        terms: new FormControl('', Validators.required),
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  onSignup(signupForm: FormGroup) {
    if (!signupForm.valid) {
      return;
    }
    const email = signupForm.value.email;
    const password = signupForm.value.password;

    this.isLoading = true;

    this.authService.signup(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['home']);

        // if (this.authReturn == null) {
        //   this.router.navigate(['home']);
        // } else {
        //   this.router.navigate(['/ditti', this.authReturn]);
        // }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        // this.error='An error occurred!';
        this.isLoading = false;
      }
    );
    signupForm.reset();
  }
}
