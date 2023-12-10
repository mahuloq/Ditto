import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dittis: Ditti[] = [];
  constructor(
    private dataStorageService: DataStorageService,
    private dittiService: DittiService
  ) {}
  ngOnInit() {
    // this.getDittis();
    this.dittiService.dittiListChanged.subscribe(
      (data) => (this.dittis = data)
    );
  }

  //    getDittis(): void {
  //     this.dataStorageService.getDittis().subscribe((data:Ditti[])=>{
  // this.dittis = data;
  // console.log(data)
  //     })
  //     console.log('Dittis:');
  //   }
}
