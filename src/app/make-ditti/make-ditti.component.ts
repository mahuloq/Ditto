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
  dittisLoaded = false;
  test = true;

  constructor(
    private router: Router,
    private dataService: DataStorageService,
    private dittiService: DittiService
  ) {}

  ngOnInit(): void {
    this.dittiService.dittisLoadedChanged.subscribe(
      (data) => (this.dittisLoaded = data)
    );

    this.dittiForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      topics: new FormControl(null, Validators.required),
      restriction: new FormControl(null, Validators.required),
      adultContent: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.dittisLoaded == false) {
      this.dataService.getDittis();
      this.dittisLoaded = true;
      console.log('Skipped Get');
    }

    setTimeout(() => {
      if (this.nameCheck() === true) {
        alert('There is a subreddit already named that.');
        return;
      } else {
        var topics = this.dittiForm.value.topics;
        topics = topics.split(/[ ,]+/);
        topics = topics.filter((item) => item);
        const newDitti: Ditti = { ...this.dittiForm.value };
        newDitti.topics = topics;
        newDitti.lowercaseName = newDitti.name.toLowerCase();
        this.dittiService.saveDitti(newDitti);
        this.dataService.saveDitti();
        this.dittiForm.reset();
      }
    }, 1000);

    // this.router.navigate(['home']);
  }

  testGet() {
    this.dataService.getDittis();
  }

  nameCheck() {
    console.log('NameCheck');
    if ((this.test = true)) {
      var dittis = this.dittiService.getDittisLocal();

      setTimeout(() => {});
      var length = dittis.length;

      for (let i = 0; i < length; i++) {
        if (
          this.dittiForm.value.name.toLowerCase() === dittis[i].lowercaseName
        ) {
          return true;
        } else {
          console.log(dittis[i].lowercaseName);
          console.log(this.dittiForm.value.name.toLowerCase);
        }
      }
    }
  }
}
