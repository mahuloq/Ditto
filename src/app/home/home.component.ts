import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';
import { Post } from 'app/shared/post.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dittis: Ditti[] = [];
  commentSelectedHome = new BehaviorSubject<Post>(null);
  indexSelectedHome = new BehaviorSubject<number>(null);

  constructor(
    private dataStorageService: DataStorageService,
    private dittiService: DittiService,
    private router: Router
  ) {}
  ngOnInit() {
    // this.getDittis();
    this.dittiService.dittiListChanged.subscribe(
      (data) => (this.dittis = data)
    );
  }

  navigate(i, x) {
    let title = this.addDashes(this.dittis[i].posts[x].title);
    this.dittiService.postIndex.next(i);
    this.dittiService.postContent.next(this.dittis[i].posts[x]);
    this.router.navigate(['/ditti', this.dittis[i].name, 'comments', x, title]);
  }
  addDashes(string) {
    return string.replaceAll(' ', '-');
  }
}
