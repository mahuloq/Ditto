import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 ditties: Ditti[] = []
  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit(): void {
    this.getDittis();
  }

  private getDittis(): void {
    this.dataStorageService.getDittis().subscribe((data)=>{
console.log (data)
    })
    console.log('Dittis:');
  }
}
