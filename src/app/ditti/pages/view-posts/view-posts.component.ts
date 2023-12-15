import { Component, OnInit } from '@angular/core';

import { HomeComponent } from 'app/home/home.component';
import { DittiHomeComponent } from '../ditti-home/ditti-home.component';
import { Post } from 'app/shared/post.model';
import { DittiService } from 'app/shared/ditti-service.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Ditti } from 'app/shared/ditti.model';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent implements OnInit {
  post: Post;
  postIndex: number = null;

  dittiIndex: number = null;
  dittiContent: Ditti;

  constructor(private dittiService: DittiService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dittiService.postIndex.subscribe((data) => {
        this.postIndex = data;
      });
      this.dittiService.postContent.subscribe((data) => {
        this.post = data;
      });
      this.dittiService.dittiIndex.subscribe((data) => {
        this.dittiIndex = data;
      });
      this.dittiService.dittiContent.subscribe((data) => {
        this.dittiContent = data;
      });

      if (this.postIndex == null && this.dittiIndex !== null) {
        console.log('View Post Test For Direct URL');

        this.postIndex = +this.router.url.split('/')[4];

        this.post = this.dittiContent.posts[this.postIndex];
      }
    }, 150);

    this.dittiService.postIndex.subscribe((data) => {
      this.postIndex = data;
    });
    this.dittiService.postContent.subscribe((data) => {
      this.post = data;
    });
    this.dittiService.dittiIndex.subscribe((data) => {
      this.dittiIndex = data;
    });
    this.dittiService.dittiContent.subscribe((data) => {
      this.dittiContent = data;
    });
  }
}
