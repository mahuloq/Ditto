import { Component, OnInit } from '@angular/core';

import { HomeComponent } from 'app/home/home.component';
import { DittiHomeComponent } from '../ditti-home/ditti-home.component';
import { Post } from 'app/shared/post.model';
import { DittiService } from 'app/shared/ditti-service.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Ditti } from 'app/shared/ditti.model';
import { AuthService } from 'app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comments } from 'app/shared/posts.model';
import { DataStorageService } from 'app/shared/data-storage.service';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent implements OnInit {
  createCommentForm: FormGroup;

  post: Post;
  postIndex: number = null;

  dittiIndex: number = null;
  dittiContent: Ditti;

  commentUserName;
  collapsed = false;

  constructor(
    private dittiService: DittiService,
    private router: Router,
    private authService: AuthService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.commentUserName = this.authService.getEmail();
    this.createCommentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
      username: new FormControl(null),
    });

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
        this.dittiService.saveInfo(this.postIndex, 'currentPostIndex');

        this.post = this.dittiContent.posts[this.postIndex];
        this.dittiService.saveInfo(this.post, 'currentPost');
      }
    }, 250);

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

    this.postIndex = +this.router.url.split('/')[4];
    this.dittiService.saveInfo(this.postIndex, 'currentPostIndex');

    this.post = this.dittiContent.posts[this.postIndex];
    this.dittiService.saveInfo(this.post, 'currentPost');
  }

  onSubmit() {
    var newComment: Comments = { ...this.createCommentForm.value };
    console.log(newComment);
    newComment.username = this.commentUserName;
    console.log(this.commentUserName);
    this.dittiService.addComment(newComment);
    this.dataService.saveDitti();
    this.createCommentForm.reset();
  }

  deleteComment(i) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.dittiService.deleteComment(i);
      this.dataService.saveDitti();
    } else {
      return;
    }
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this Post?')) {
      this.dittiService.deletePost();
      this.dataService.saveDitti();
      this.router.navigate(['/ditti', this.dittiService.currentDitti.name]);
    } else {
      return;
    }
  }

  switchComment(i) {
    const test = document.getElementById(i);
    const btn = document.getElementById(i + 'button');
    if (test.style.display == 'none') {
      test.style.display = 'block';
      btn.innerHTML = '[-]';
    } else {
      test.style.display = 'none';
      btn.innerHTML = '[+]';
    }
  }
}
