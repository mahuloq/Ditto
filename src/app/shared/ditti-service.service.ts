import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';

import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';
import { Comments } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class DittiService {
  dittiListChanged = new BehaviorSubject<Ditti[]>(null);
  dittisLoadedChanged = new BehaviorSubject<boolean>(null);

  dittiIndex = new BehaviorSubject<number>(null);
  dittiContent = new BehaviorSubject<Ditti>(null);

  postIndex = new BehaviorSubject<number>(null);
  postContent = new BehaviorSubject<Post>(null);

  // Store Current Ditti Information.
  currentDitti: Ditti = null;
  currentDittiIndex: number;
  currentPostSelected: Post;
  currentPostIndex: number;

  dittiNames = [];
  dittisLoaded: boolean = false;
  allDittis: Ditti[] = [];

  authReturn = new BehaviorSubject<string>(null);

  constructor() {}

  saveDitti(ditti: Ditti) {
    this.allDittis.push(ditti);

    console.log(this.allDittis);
    this.dittiListChanged.next(this.getDittisLocal());
  }

  setDittis(dittis: Ditti[]) {
    if (this.dittisLoaded == false) {
      this.dittisLoaded = true;
      this.dittisLoadedChanged.next(this.dittisLoaded);
      console.log('ditti was loaded first time');
    }

    this.allDittis = dittis;

    this.dittiListChanged.next(this.allDittis);

    console.log(this.allDittis);
  }

  getDittisLocal() {
    return [...this.allDittis];
  }

  dittiNameGetter() {
    for (let i = 0; i < this.allDittis.length; i++) {
      this.dittiNames[i] = this.allDittis[i].name;
    }
    console.log(this.dittiNames);
    return this.dittiNames;
  }

  dittiInfo(i) {
    return this.allDittis[i];
  }

  addPost(data: Post, dittiIndex) {
    if (this.allDittis[dittiIndex].posts) {
      this.allDittis[dittiIndex].posts.push(data);
    } else {
      this.allDittis[dittiIndex].posts = [data];
    }

    console.log(this.allDittis[dittiIndex]);
    console.log(this.allDittis[dittiIndex].posts);
    return this.allDittis[dittiIndex].posts.length;
  }

  addComment(data: Comments, commentIndex?) {
    if (
      this.allDittis[this.currentDittiIndex].posts[this.currentPostIndex]
        .comments
    ) {
      this.allDittis[this.currentDittiIndex].posts[
        this.currentPostIndex
      ].comments.push(data);
    } else {
      this.allDittis[this.currentDittiIndex].posts[
        this.currentPostIndex
      ].comments = [data];
    }
  }
  deleteComment(i) {
    let arr =
      this.allDittis[this.currentDittiIndex].posts[this.currentPostIndex]
        .comments;

    arr.splice(i, 1);
  }

  deletePost() {
    console.log(this.currentDittiIndex);
    console.log(this.currentPostIndex);
    console.log(this.allDittis);
    console.log(this.allDittis[this.currentDittiIndex]);
    console.log(this.allDittis[this.currentDittiIndex].posts);
    console.log(
      this.allDittis[this.currentDittiIndex].posts[this.currentPostIndex]
    );
    let arr = this.allDittis[this.currentDittiIndex].posts;
    console.log(arr);

    arr.splice(this.currentPostIndex, 1);
  }

  saveInfo(data, destination) {
    if (destination == 'currentDitti') {
      this.currentDitti = data;
      console.log(this.currentDitti);
    } else if (destination == 'currentDittiIndex') {
      this.currentDittiIndex = data;
      console.log(this.currentDittiIndex);
    } else if (destination == 'currentPost') {
      this.currentPostSelected = data;
      console.log(this.currentPostSelected);
    } else if (destination == 'currentPostIndex') {
      this.currentPostIndex = data;
      console.log(this.currentPostIndex);
    }
  }
}
