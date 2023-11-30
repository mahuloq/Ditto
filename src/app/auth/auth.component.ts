import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;


ngOnInit(): void {
  this.signupForm= new FormGroup({
    'name':new FormControl('John Smith'),
    'email':new FormControl(null),
    'password': new FormControl(null),
    'confirmPassword':new FormControl(null),
    'terms':new FormControl(null)
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
onSignup(signupForm:FormGroup) {
console.log(signupForm.value)
}
}
