import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DittiComponent } from 'app/ditti/ditti.component';

@Component({
  selector: 'app-ditti-home',
  templateUrl: './ditti-home.component.html',
  styleUrls: ['./ditti-home.component.css'],
})
export class DittiHomeComponent {
  index;
  dittis;
  constructor(
    private mainDitti: DittiComponent,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['type']);
      console.log(params);
    });

    this.mainDitti.dittiIndex.subscribe((data) => {
      this.index = data;

      this.mainDitti.dittiContent.subscribe((data) => {
        this.dittis = data;
        console.log(this.dittis);
      });
    });
  }
}
