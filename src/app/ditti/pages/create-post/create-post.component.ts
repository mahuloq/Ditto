import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private mainDitti: DittiComponent,
    private dittiService: DittiService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.mainDitti.dittiIndex.subscribe((data) => {
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
    const newPost: Post = { ...this.createPostForm.value };
    console.log(newPost);
    this.dittiService.addPost(newPost, this.index);
    this.dataService.saveDitti();
  }
}
