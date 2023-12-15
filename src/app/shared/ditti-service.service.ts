import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';

import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';

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

  currentDitti: Ditti = null;

  constructor() {}

  dittiNames = [];
  dittisLoaded: boolean = false;
  allDittis: Ditti[] = [];

  authReturn = new BehaviorSubject<string>(null);

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

  addPost(data: Post, i) {
    if (this.allDittis[i].posts) {
      this.allDittis[i].posts.push(data);
    } else {
      this.allDittis[i].posts = [data];
    }

    console.log(this.allDittis[i]);
    console.log(this.allDittis[i].posts);
  }

  updateIndex() {}

  updateDittiContent() {}
}
