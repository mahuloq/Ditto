// https://ditto-group-default-rtdb.firebaseio.com/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { DittiService } from './ditti-service.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private dittiService: DittiService) {}

  saveDitti(data: Ditti) {
    var title = data.name;

    var url = `https://ditto-group-default-rtdb.firebaseio.com/dittis/${title}.json`;

    this.http.put(url, data).subscribe((response) => {
      console.log(response);
    });
  }

  getDittis() {
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
