import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { xml2js } from 'xml-js';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient) {}

  public readFeed(url: string) {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(resp => xml2js(resp)),
      catchError(err => of({}))
    );
  }
}
