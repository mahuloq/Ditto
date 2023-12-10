// https://ditto-group-default-rtdb.firebaseio.com/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { DittiService } from './ditti-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // private dittiSubject = new BehaviorSubject<Ditti[]>();
  // ditti$: Observable<Ditti[]>=this.dittiSubject.asObservable();

  constructor(private http: HttpClient, private dittiService: DittiService) {}

  saveDitti() {
    const test = this.dittiService.getDittisLocal();

    var url = `https://ditto-group-default-rtdb.firebaseio.com/dittis.json`;
    // `https://ditto-group-default-rtdb.firebaseio.com/dittis.json`
    this.http.put(url, test).subscribe((response) => {
      console.log(response);
    });
  }

  getDittis() {
    console.log('Get Dittis Data Service Ran');
    return this.http
      .get<Ditti[]>(
        `https://ditto-group-default-rtdb.firebaseio.com/dittis.json`
      )
      .pipe(
        map((dittis) => {
          return dittis.map((ditti) => {
            return {
              ...ditti,
            };
          });
        }),
        tap((dittis) => {
          this.dittiService.setDittis(dittis);
        })
      )
      .subscribe();
  }
}
