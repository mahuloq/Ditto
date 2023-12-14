import { Component, OnInit } from '@angular/core';

import { HomeComponent } from 'app/home/home.component';
import { DittiHomeComponent } from '../ditti-home/ditti-home.component';
import { Post } from 'app/shared/post.model';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent implements OnInit {
  post: Post;
  dittiIndex;

  constructor() // public dittiHome: DittiHomeComponent // public home: HomeComponent,
  {}

  ngOnInit(): void {
    // this.home.commentSelectedHome.subscribe((data) => {
    //   this.post = data;
    // });
    // this.home.indexSelectedHome.subscribe((data) => {
    //   this.dittiIndex = data;
    // });
    // this.dittiHome.commentSelected.subscribe((data) => {
    //   this.post = data;
    // });
    // this.dittiHome.indexSelected.subscribe((data) => {
    //   this.dittiIndex = data;
    // });
  }
}
