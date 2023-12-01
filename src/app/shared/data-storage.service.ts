// https://ditto-group-default-rtdb.firebaseio.com/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ditti } from './ditti.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  // saveDitti(data: Ditti) {
  //   var title = data.name;
  //   var url = `https://ditto-group-default-rtdb.firebaseio.com/${title}`;

  //   this.http.put(url, data).subscribe((response) => {});
  // }
}
