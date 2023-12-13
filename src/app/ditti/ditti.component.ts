import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ditti',
  templateUrl: './ditti.component.html',
  styleUrls: ['./ditti.component.css'],
})
export class DittiComponent implements OnInit {
  public sidebarShow: boolean = true;

  dittiWasFound = new BehaviorSubject<boolean>(null);
  dittiIndex = new BehaviorSubject<number>(null);
  dittiContent = new BehaviorSubject<Ditti>(null);
  currentDitti: Ditti = null;
  index: number;

  allDittiNames;
  dittiFound;

  namesRan = false;
  displaySidebar = true;

  constructor(
    private dittiService: DittiService,
    private dataService: DataStorageService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {}

  ngOnInit(): void {
    // this.dataService.getDittis();

    this.route.params.subscribe((params: Params) => {
      console.log(params['type']);
    });

    this.dittiWasFound.subscribe((data) => {
      if (data == false) {
        this.router.navigate(['/404'], {
          skipLocationChange: true,

          state: {
            source: 'ditti',
          },
        });
      }
    });

    setTimeout(() => {
      this.allDittiNames = this.dittiService.dittiNameGetter();
      console.log(this.allDittiNames);
    }, 75);

    setTimeout(() => {
      var tempURL = this.router.url;
      console.log(tempURL);
      tempURL = tempURL.split('/')[2];

      var length = this.allDittiNames.length;
      console.log(tempURL);
      for (let i = 0; i < length; i++) {
        if (tempURL.toLowerCase() === this.allDittiNames[i].toLowerCase()) {
          this.dittiIndex.next(i);

          this.currentDitti = this.dittiService.dittiInfo(i);
          return this.dittiContent.next(this.currentDitti);
        } else {
          if (i == length - 1) {
            console.log('404 Test');
            this.dittiWasFound.next(false);
          }
        }
        if (this.router.url.includes('/createPost')) {
          this.displaySidebar = false;
        }
      }
    }, 100);
  }

  checkURL() {
    setTimeout(() => {
      if (this.router.url.includes('/createPost')) {
        this.displaySidebar = false;
      }
    }, 50);
  }
}
