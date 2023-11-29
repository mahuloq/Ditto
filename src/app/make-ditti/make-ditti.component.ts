import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-ditti',
  templateUrl: './make-ditti.component.html',
  styleUrls: ['./make-ditti.component.css'],
})
export class MakeDittiComponent implements OnInit {
  dittiForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.dittiForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const newDitti = { ...this.dittiForm.value };
  }
}
