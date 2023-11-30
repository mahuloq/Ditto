import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-make-ditti',
  templateUrl: './make-ditti.component.html',
  styleUrls: ['./make-ditti.component.css'],
})
export class MakeDittiComponent implements OnInit {
  dittiForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dittiForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      topics: new FormControl(null, Validators.required),
      restriction: new FormControl(null, Validators.required),
      adultContent: new FormControl(null),
    });
  }

  onSubmit() {
    const newDitti: Ditti = { ...this.dittiForm.value };
    var tempTopics = { ...newDitti.topics };
    var newTemp = tempTopics;
    console.log(tempTopics);
    console.log(newTemp);
    console.log(newDitti);
    // this.router.navigate(['home']);
  }
}
