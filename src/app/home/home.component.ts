import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private dataStorageService:DataStorageService) {}
ngOnInit(): void {
    this.getDittis();
}

private getDittis(): void {
this.dataStorageService.getDittis()
console.log('Dittis:', )
}
}
