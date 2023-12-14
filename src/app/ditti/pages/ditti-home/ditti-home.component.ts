import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DittiComponent } from 'app/ditti/ditti.component';
import { Ditti } from 'app/shared/ditti.model';
import { Post } from 'app/shared/post.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ditti-home',
  templateUrl: './ditti-home.component.html',
  styleUrls: ['./ditti-home.component.css'],
})
export class DittiHomeComponent {
  index;
  dittis: Ditti;
  commentSelected = new BehaviorSubject<Post>(null);
  indexSelected = new BehaviorSubject<number>(null);

  constructor(
    private mainDitti: DittiComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mainDitti.dittiIndex.subscribe((data) => {
      this.index = data;
    });
    this.mainDitti.dittiContent.subscribe((data) => {
      this.dittis = data;
    });
  }

  navigate(x) {
    let title = this.addDashes(this.dittis.posts[x].title);
    console.log(title);

    this.indexSelected.next(this.index);
    console.log(this.index);
    this.commentSelected.next(this.dittis.posts[x]);
    console.log(this.dittis.posts[x]);
    this.router.navigate(['/ditti', this.dittis.name, 'comments', x, title]);
  }
  addDashes(string) {
    return string.replaceAll(' ', '-');
  }
}
