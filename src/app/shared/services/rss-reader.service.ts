import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { xml2js } from 'xml-js';
import { of, Observable } from 'rxjs';
import { IPodcastFeed } from '../models/podcast.model';
@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient) {}

  public readFeed(url: string): Observable<IPodcastFeed | undefined> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(resp => xml2js(resp)),
      map(xml => ({
        episodes: xml.elements
      } as IPodcastFeed)),
      catchError(err => of(undefined))
    );
  }
}
