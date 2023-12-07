import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DittiService {
  dittiListChanged = new Subject<Ditti[]>();
  dittisLoadedChanged = new Subject<boolean>();
  constructor() {}

  dittiNames = [];
  dittisLoaded: boolean = false;
  allDittis: Ditti[] = [];

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
    const listOfDittis = this.allDittis;
    for (let i = 0; i < listOfDittis.length; i++) {
      this.dittiNames[i] = listOfDittis[i].name;
    }
    console.log(this.dittiNames);
  }
}
