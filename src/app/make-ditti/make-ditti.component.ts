import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-make-ditti',
  templateUrl: './make-ditti.component.html',
  styleUrls: ['./make-ditti.component.css'],
})
export class MakeDittiComponent implements OnInit {
  dittiForm: FormGroup;

  constructor(
    private router: Router,
    private dataService: DataStorageService,
    private dittiService: DittiService
  ) {}

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
    var topics = this.dittiForm.value.topics;
    topics = topics.split(/[ ,]+/);
    topics = topics.filter((item) => item);
    const newDitti: Ditti = { ...this.dittiForm.value };
    newDitti.topics = topics;
    this.dittiService.saveDitti(newDitti);
    this.dataService.saveDitti(newDitti);

    // this.router.navigate(['home']);
  }

  testGet() {
    this.dataService.getDittis();
  }
}
