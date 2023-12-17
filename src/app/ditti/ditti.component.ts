import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RoutesRecognized,
} from '@angular/router';
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
  // displayComment = false;

  constructor(
    private dittiService: DittiService,
    private dataService: DataStorageService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof RoutesRecognized) {
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
              this.dittiService.dittiIndex.next(i);
              this.dittiService.saveInfo(i, 'currentDittiIndex');

              this.currentDitti = this.dittiService.dittiInfo(i);
              this.dittiService.saveInfo(this.currentDitti, 'currentDitti');
              return this.dittiService.dittiContent.next(this.currentDitti);
            } else {
              if (i == length - 1) {
                console.log('404 Test');
                this.dittiWasFound.next(false);
              }
            }
            if (this.router.url.includes('/createPost')) {
              this.displaySidebar = false;
            } else {
              this.displaySidebar = true;
            }
          }
        }, 100);
      }
    });

    //checks to see if data exists to navigate to, if not 404, unless its auth

    this.dittiWasFound.subscribe((data) => {
      if (this.router.url.includes('/auth')) {
        var urlReturn = this.router.url.split('/')[2];
        this.dittiService.authReturn.next(urlReturn);
        return;
      } else if (data == false) {
        this.router.navigate(['/404'], {
          skipLocationChange: true,

          state: {
            source: 'ditti',
          },
        });
      }
    });

    // gets a list of ditti names for the check if Ditti Exists
    setTimeout(() => {
      this.allDittiNames = this.dittiService.dittiNameGetter();
      console.log(this.allDittiNames);
    }, 75);

    // Goes through the ditti names and checks if ditti Exits. If not, then runs redirect to 404, if it does, than navigates to page

    setTimeout(() => {
      var tempURL = this.router.url;
      console.log(tempURL);
      tempURL = tempURL.split('/')[2];

      var length = this.allDittiNames.length;
      console.log(tempURL);

      for (let i = 0; i < length; i++) {
        if (tempURL.toLowerCase() === this.allDittiNames[i].toLowerCase()) {
          this.dittiService.dittiIndex.next(i);
          this.dittiService.saveInfo(i, 'currentDittiIndex');

          this.currentDitti = this.dittiService.dittiInfo(i);
          this.dittiService.saveInfo(this.currentDitti, 'currentDitti');
          return this.dittiService.dittiContent.next(this.currentDitti);
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

    // setTimeout(() => {
    //   if (this.router.url.includes('/comments')) {
    //     this.displayComment = true;
    //   }
    // }, 50);
  }
}
