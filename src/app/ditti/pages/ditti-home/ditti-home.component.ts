import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DittiComponent } from 'app/ditti/ditti.component';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
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
    private dataService: DataStorageService,
    private router: Router,
    private dittiService: DittiService
  ) {}

  ngOnInit(): void {
    this.dittiService.dittiIndex.subscribe((data) => {
      this.index = data;
    });
    this.dittiService.dittiContent.subscribe((data) => {
      this.dittis = data;
    });
  }

  navigate(x) {
    let title = this.addDashes(this.dittis.posts[x].title);
    console.log(title);

    this.dittiService.postIndex.next(this.index);
    console.log(this.index);
    this.dittiService.saveInfo(this.index, 'currentPostIndex');
    this.dittiService.postContent.next(this.dittis.posts[x]);
    this.dittiService.saveInfo(this.dittis.posts[x], 'currentPost');
    console.log(this.dittis.posts[x]);
    this.router.navigate(['/ditti', this.dittis.name, 'comments', x, title]);
  }
  addDashes(string) {
    return string.replaceAll(' ', '-');
  }
}
