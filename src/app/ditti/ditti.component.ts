import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit(): void {
    // this.dataService.getDittis();
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

          return (this.currentDitti = this.dittiService.dittiInfo(i));
        } else {
          if (i == length - 1) {
            console.log('404 Test');
            this.dittiWasFound.next(false);
          }
        }
      }
    }, 100);

    if (this.router.url.includes('/createPost')) {
      this.displaySidebar = false;
    }
  }
  getNames() {}
}
