import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { DittiComponent } from 'app/ditti/ditti.component';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Post } from 'app/shared/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  displaySidebar = true;
  index: number;
  dittiName;
  userName;
  constructor(
    private router: Router,
    private mainDitti: DittiComponent,
    private dittiService: DittiService,
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getEmail();
    this.dittiName = this.router.url.split('/')[2];

    this.dittiService.dittiIndex.subscribe((data) => {
      this.index = data;
    });

    this.createPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null),
    });
  }
  onSubmit() {
    console.log(this.index);
    const timestamp = new Date().toISOString();
    console.log(timestamp);
    let newPost: Post = { ...this.createPostForm.value };
    newPost.username = this.authService.getEmail();

    var testDate = new Date();

    var year = testDate.getFullYear();
    var month: string | number = testDate.getMonth() + 1;
    var day: string | number = testDate.getDate();
    var hour: string | number = testDate.getHours();

    var monthO = month.toString().length > 1 ? month : '0' + month;

    var dayO = day.toString().length > 1 ? day : '0' + day;

    var newDate = `${year}-${monthO}-${dayO}`;
    var newH = `${hour}`;
    newPost.datetime = newDate;
    newPost.datetimeHM = newH;
    const postIndex = this.dittiService.addPost(newPost, this.index);
    this.dataService.saveDitti();
    const url = `/ditti/${
      this.dittiName
    }/comments/${postIndex}/${newPost.title.replaceAll(' ', '-')}`;
    this.router.navigateByUrl(url);
    this.dittiService.postIndex.next(postIndex);
    this.dittiService.postContent.next(newPost);
    this.dittiService.dittiIndex.next(this.index);
  }
}
