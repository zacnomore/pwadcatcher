import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { xml2js } from 'xml-js';
import { of, Observable } from 'rxjs';
import { IPodcastFeed } from '../models/podcast.model';
import { EnvironmentService } from 'src/app/environments/environment.service';
@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public readFeed(collectionId: number): Observable<IPodcastFeed | undefined> {
    return this.http.get(`${this.env.env.feedReadUrl}?collectionId=${collectionId}`).pipe(
      tap(console.log)
    );
    // this.http.get(url, { responseType: 'text' }).pipe(
    //   map(resp => xml2js(resp)),
    //   map(xml => ({
    //     episodes: xml.elements
    //   } as IPodcastFeed)),
    //   catchError(err => of(undefined))
    // );
  }
}
