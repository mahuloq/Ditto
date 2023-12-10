import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-ditti',
  templateUrl: './ditti.component.html',
  styleUrls: ['./ditti.component.css'],
})
export class DittiComponent implements OnInit {
  public sidebarShow: boolean = true;
  allDittiNames;
  currentDitti: Ditti;

  constructor(
    private dittiService: DittiService,
    private dataService: DataStorageService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.dataService.getDittis();

    setTimeout(() => {
      this.allDittiNames = this.dittiService.dittiNameGetter();
      console.log(this.allDittiNames);
    }, 75);

    setTimeout(() => {
      var tempURL = this.router.url;

      tempURL = tempURL.split('/').pop();
      var length = this.allDittiNames.length;

      console.log(length);

      for (let i = 0; i < length; i++) {
        if (tempURL.toLowerCase() === this.allDittiNames[i].toLowerCase()) {
          this.currentDitti = this.dittiService.dittiInfo(i);
          return console.log(this.currentDitti);
        }
      }
    }, 1000);
  }
  getNames() {}
}
