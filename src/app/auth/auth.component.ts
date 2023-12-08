import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;
  isLoading=false;

  constructor(private authService: AuthService) {}

ngOnInit(): void {
  this.signupForm= new FormGroup({
    'name':new FormControl('',Validators.required),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',[Validators.required,Validators.minLength(6)]),
    'confirmPassword':new FormControl('',[Validators.required,Validators.minLength(6)]),
    'terms':new FormControl('',Validators.required)
  });
}

  // constructor(private fb: FormBuilder) {
  //   this.signupForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required],
  //     terms: [false, Validators.requiredTrue]
  //   });
  // }
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
      },
      errorRes => {
        console.log(errorRes);

        // this.error='An error occurred!';
        this.isLoading = false;
      }
    );
    signupForm.reset();
  }
}
