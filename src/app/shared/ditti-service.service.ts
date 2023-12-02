import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DittiService {
  dittiListChanged = new Subject<Ditti[]>();

  constructor() {}

  dittiNames = [];
  allDittis: Ditti[] = [];

  saveDitti(ditti: Ditti) {
    this.allDittis.push(ditti);
    console.log(this.allDittis);
    this.dittiListChanged.next(this.getDittis());
  }

  setDittis(dittis: Ditti[]) {
    this.allDittis = dittis;
    this.dittiListChanged.next(this.allDittis);
    console.log(this.allDittis);
  }

  getDittis() {
    return [...this.allDittis];
  }
}
