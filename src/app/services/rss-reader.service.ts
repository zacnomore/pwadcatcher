import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { parseStringPromise } from 'xml2js';
@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient) {}

  public readFeed(url: string) {
    return this.http.get(url, { responseType: 'text' }).pipe(
      switchMap(resp => parseStringPromise(resp))
    );
  }
}
