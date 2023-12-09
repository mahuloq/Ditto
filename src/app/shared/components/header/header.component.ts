import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dittis: Ditti[] = [];
  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit() {
    this.getDittis();
  }

  getDittis(): void {
    this.dataStorageService.getDittis().subscribe((data: Ditti[]) => {
      this.dittis = data;
      console.log(data);
    });
    console.log('Dittis:');
  }
}
