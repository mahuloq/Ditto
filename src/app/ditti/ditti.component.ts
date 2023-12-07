import { Component } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';

@Component({
  selector: 'app-ditti',
  templateUrl: './ditti.component.html',
  styleUrls: ['./ditti.component.css'],
})
export class DittiComponent {
  public sidebarShow: boolean = true;
  allDittiNames;
  constructor(
    private dittiService: DittiService,
    private dataService: DataStorageService
  ) {}

  getNames() {
    this.dataService.getDittis();

    setTimeout(() => {
      this.allDittiNames = this.dittiService.dittiNameGetter();
    }, 75);
  }
}
